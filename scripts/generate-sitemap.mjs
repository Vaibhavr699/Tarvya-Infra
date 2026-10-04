// Writes public/sitemap.xml and public/robots.txt before each build.
// Property URLs come from Supabase when configured, otherwise from the static data files
// (mirrors the fallback in src/lib/content.js).
import { readFileSync, writeFileSync } from 'node:fs';
import { loadEnv } from 'vite';

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const SITE_URL = (env.VITE_SITE_URL || 'https://tarvyainfra.com').replace(/\/$/, '');

const STATIC_ROUTES = [
  ['/', '1.0', 'weekly'],
  ['/properties', '0.9', 'daily'],
  ['/properties/office', '0.8', 'daily'],
  ['/properties/retail', '0.8', 'daily'],
  ['/properties/industrial', '0.8', 'daily'],
  ['/interior', '0.7', 'monthly'],
  ['/about', '0.6', 'monthly'],
  ['/testimonials', '0.6', 'monthly'],
  ['/contact', '0.6', 'yearly'],
  ['/privacy-policy', '0.2', 'yearly'],
  ['/terms', '0.2', 'yearly'],
];

const staticPropertyIds = () =>
  ['src/data/properties.js', 'src/data/featuredProperties.js'].flatMap((file) =>
    [...readFileSync(file, 'utf8').matchAll(/^\s{4,6}id:\s*['"]([^'"]+)['"]/gm)].map((m) => m[1])
  );

const supabasePropertyIds = async () => {
  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) return [];
  try {
    const res = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/properties?select=slug&published=eq.true`, {
      headers: { apikey: env.VITE_SUPABASE_ANON_KEY, Authorization: `Bearer ${env.VITE_SUPABASE_ANON_KEY}` },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()).map((row) => row.slug);
  } catch (error) {
    console.warn(`[sitemap] Could not load properties from Supabase (${error.message}); using static data.`);
    return [];
  }
};

const fromSupabase = await supabasePropertyIds();
const propertyIds = [...new Set(fromSupabase.length ? fromSupabase : staticPropertyIds())];

const today = new Date().toISOString().slice(0, 10);
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const entry = (path, priority, changefreq) =>
  `  <url><loc>${escape(SITE_URL + path)}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...STATIC_ROUTES.map(([path, priority, freq]) => entry(path, priority, freq)),
  ...propertyIds.map((id) => entry(`/property/${encodeURIComponent(id)}`, '0.8', 'weekly')),
  '</urlset>',
  '',
].join('\n');

writeFileSync('public/sitemap.xml', xml);
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`[sitemap] Wrote ${STATIC_ROUTES.length + propertyIds.length} URLs (${propertyIds.length} properties) for ${SITE_URL}`);

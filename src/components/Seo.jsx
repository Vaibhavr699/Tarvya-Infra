export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://tarvyainfra.com").replace(/\/$/, "");
export const SITE_NAME = "Tarvya Infra Pvt Ltd";
const DEFAULT_DESCRIPTION =
  "Tarvya Infra helps businesses find premium office, retail, and industrial spaces across Noida and Delhi NCR — from shortlisting to hand-over.";
const DEFAULT_IMAGE = "/logo.png";

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  telephone: "+91-8929356475",
  email: "contact@tarvyainfra.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1420, 14th Floor, Supernova Astralis, Sector 94",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  areaServed: ["Noida", "Greater Noida", "Delhi NCR"],
};

export const absoluteUrl = (url) => !url ? SITE_URL : (/^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`);

const Seo = ({ title, description = DEFAULT_DESCRIPTION, path = "", image = DEFAULT_IMAGE, type = "website", jsonLd, noindex }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Commercial Real Estate in Noida`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      )}
    </>
  );
};

export default Seo;

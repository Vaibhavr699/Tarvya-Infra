import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { properties as staticProperties } from '../data/properties';
import { featuredProperties as staticFeatured } from '../data/featuredProperties';
import { team as staticTeam } from '../data/team';
import { interiorProjects as staticInteriorProjects } from '../data/interiorProjects';

export const TABLES = {
  properties: 'properties',
  team: 'team_members',
  testimonials: 'testimonials',
  interior: 'interior_projects',
};

export const toProperty = (row) => ({
  id: row.slug,
  title: row.title,
  location: row.location || '',
  type: row.type || 'office',
  price: row.price || '',
  area: row.area || '',
  parkings: row.parkings,
  description: row.description || '',
  image: row.cover_image,
  gallery: row.gallery || [],
  floorPlans: row.floor_plans || [],
  video: row.video_url,
  tourUrl: row.tour_url,
  brochure: row.brochure_url,
  details: row.details || {},
  units: row.units || [],
  amenities: row.amenities || [],
  rating: row.rating,
  isNew: row.is_new,
  featured: row.featured,
  status: row.status || 'available',
});

export const toTeamMember = (row) => ({
  name: row.name,
  position: row.position,
  description: row.description,
  image: row.photo,
  imagePosition: row.image_position,
  imageScale: row.image_scale,
  imageOrigin: row.image_origin,
});

export const toTestimonial = (row) => ({
  name: row.name,
  role: row.role,
  quote: row.quote,
  rating: row.rating,
  image: row.photo,
  video: row.video_url,
});

export const toInteriorProject = (row) => ({
  title: row.title,
  location: row.location,
  area: row.area,
  duration: row.duration,
  image: row.image,
});

const normalizeType = (type = '') => {
  const t = type.toLowerCase();
  if (t.includes('retail')) return 'retail';
  if (t.includes('industrial')) return 'industrial';
  return 'office';
};

export const staticContent = {
  properties: () => [
    ...staticProperties.map((p) => ({ ...p, featured: false, status: 'available' })),
    ...staticFeatured.map((p) => ({ ...p, type: normalizeType(p.type), featured: true, status: 'available' })),
  ],
  team: () => staticTeam,
  testimonials: () => [],
  interior: () => staticInteriorProjects,
};

const mappers = {
  properties: toProperty,
  team: toTeamMember,
  testimonials: toTestimonial,
  interior: toInteriorProject,
};

const fetchPublished = async (key) => {
  const { data, error } = await supabase
    .from(TABLES[key])
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  if (!data.length) return staticContent[key]();
  return data.map(mappers[key]);
};

const cache = new Map();

const loadResource = (key) => {
  if (!cache.has(key)) {
    cache.set(
      key,
      fetchPublished(key).catch((error) => {
        console.error(`Failed to load ${key} from Supabase`, error);
        cache.delete(key);
        return staticContent[key]();
      })
    );
  }
  return cache.get(key);
};

export const useContent = (key) => {
  const [state, setState] = useState(() =>
    isSupabaseConfigured
      ? { data: [], loading: true }
      : { data: staticContent[key](), loading: false }
  );

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let active = true;
    loadResource(key).then((data) => {
      if (active) setState({ data, loading: false });
    });
    return () => {
      active = false;
    };
  }, [key]);

  return state;
};

import { supabase } from '../lib/supabase';
import { TABLES, staticContent } from '../lib/content';
import { uploadImageFromUrl } from './upload';

const isEmpty = async (table) => {
  const { count, error } = await supabase.from(table).select('id', { count: 'exact', head: true });
  if (error) throw error;
  return count === 0;
};

export const importExistingContent = async (onProgress = () => {}) => {
  const summary = [];

  const properties = staticContent.properties();
  const propertyRows = [];
  for (const [index, p] of properties.entries()) {
    onProgress(`Uploading property images (${index + 1}/${properties.length})…`);
    propertyRows.push({
      slug: p.id,
      title: p.title,
      location: p.location,
      type: p.type,
      price: p.price || null,
      area: p.area || null,
      parkings: p.parkings ?? null,
      description: p.description,
      cover_image: await uploadImageFromUrl(p.image, 'properties'),
      details: p.details || {},
      units: p.units || [],
      amenities: p.amenities || [],
      rating: p.rating ?? null,
      is_new: Boolean(p.isNew),
      featured: p.featured,
      status: 'available',
      sort_order: index,
    });
  }
  const { error: propertyError } = await supabase.from(TABLES.properties).upsert(propertyRows, { onConflict: 'slug' });
  if (propertyError) throw propertyError;
  summary.push(`${propertyRows.length} properties`);

  if (await isEmpty(TABLES.team)) {
    const team = staticContent.team();
    const rows = [];
    for (const [index, m] of team.entries()) {
      onProgress(`Uploading team photos (${index + 1}/${team.length})…`);
      rows.push({
        name: m.name,
        position: m.position,
        description: m.description,
        photo: await uploadImageFromUrl(m.image, 'team'),
        image_position: m.imagePosition || null,
        image_scale: m.imageScale || null,
        image_origin: m.imageOrigin || null,
        sort_order: index,
      });
    }
    const { error } = await supabase.from(TABLES.team).insert(rows);
    if (error) throw error;
    summary.push(`${rows.length} team members`);
  }

  if (await isEmpty(TABLES.interior)) {
    const projects = staticContent.interior();
    const rows = [];
    for (const [index, project] of projects.entries()) {
      onProgress(`Uploading interior images (${index + 1}/${projects.length})…`);
      rows.push({
        title: project.title,
        location: project.location,
        area: project.area,
        duration: project.duration,
        image: await uploadImageFromUrl(project.image, 'interior'),
        sort_order: index,
      });
    }
    const { error } = await supabase.from(TABLES.interior).insert(rows);
    if (error) throw error;
    summary.push(`${rows.length} interior projects`);
  }

  return summary;
};

import { supabase, MEDIA_BUCKET } from '../lib/supabase';

const MAX_DIMENSION = 1920;
const RESIZABLE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const compressImage = async (file) => {
  if (!RESIZABLE_TYPES.includes(file.type)) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.85));
  return blob && blob.size < file.size ? blob : file;
};

const extensionFor = (blob, fallbackName) => {
  if (blob.type === 'image/webp') return 'webp';
  const fromName = fallbackName?.split('.').pop()?.toLowerCase();
  return fromName && fromName.length <= 5 ? fromName : 'jpg';
};

export const uploadImage = async (file, folder) => {
  const blob = await compressImage(file);
  const path = `${folder}/${crypto.randomUUID()}.${extensionFor(blob, file.name)}`;

  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, blob, { contentType: blob.type || file.type, cacheControl: '31536000' });
  if (error) throw error;

  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
};

export const uploadImageFromUrl = async (url, folder) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const name = url.split('/').pop()?.split('?')[0] || 'image.jpg';
    return await uploadImage(new File([blob], name, { type: blob.type }), folder);
  } catch (error) {
    console.warn(`Kept original image URL for ${url}`, error);
    return url;
  }
};

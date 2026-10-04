export const getSector = (location) =>
  (location || '')
    .split(',')
    .map((s) => s.trim())
    .find((part) => /sector/i.test(part)) || '';

export const getArea = (location) => {
  const sector = getSector(location);
  return sector ? `${sector}, Noida` : 'Noida, Uttar Pradesh';
};

const toNumber = (value = '') => Number(String(value).replace(/[^\d.]/g, '')) || 0;

export const parsePrice = (price) => toNumber(price);

export const getUnitSizes = (property) => {
  const sizes = (property.units || []).map((u) => toNumber(u.area)).filter(Boolean);
  const own = toNumber(property.area);
  if (own) sizes.push(own);
  return sizes;
};

export const SIZE_RANGES = [
  { value: 'upto-10k', label: 'Up to 10,000 sq ft', min: 0, max: 10000 },
  { value: '10k-20k', label: '10,000 – 20,000 sq ft', min: 10000, max: 20000 },
  { value: '20k-35k', label: '20,000 – 35,000 sq ft', min: 20000, max: 35000 },
  { value: '35k-plus', label: '35,000+ sq ft', min: 35000, max: Infinity },
];

export const SORT_OPTIONS = [
  { value: '', label: 'Recommended' },
  { value: 'size-desc', label: 'Size: Largest first' },
  { value: 'size-asc', label: 'Size: Smallest first' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
];

const matchesSize = (property, rangeValue) => {
  const range = SIZE_RANGES.find((r) => r.value === rangeValue);
  if (!range) return true;
  return getUnitSizes(property).some((s) => s >= range.min && s < range.max);
};

const matchesQuery = (property, query) => {
  if (!query) return true;
  const haystack = [property.title, property.location, property.description, ...(property.amenities || [])]
    .join(' ')
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
};

const maxSize = (p) => Math.max(0, ...getUnitSizes(p));

// Properties without a price always sort after priced ones.
const byPrice = (direction) => (a, b) => {
  const pa = parsePrice(a.price);
  const pb = parsePrice(b.price);
  if (!pa || !pb) return (pb ? 1 : 0) - (pa ? 1 : 0);
  return direction * (pa - pb);
};

const sorters = {
  'size-desc': (a, b) => maxSize(b) - maxSize(a),
  'size-asc': (a, b) => maxSize(a) - maxSize(b),
  'price-asc': byPrice(1),
  'price-desc': byPrice(-1),
};

export const filterProperties = (properties, { type, q, sector, size, sort }) => {
  const result = properties.filter(
    (p) =>
      (!type || p.type === type) &&
      (!sector || getSector(p.location) === sector) &&
      matchesSize(p, size) &&
      matchesQuery(p, q)
  );
  return sorters[sort] ? [...result].sort(sorters[sort]) : result;
};

export const listSectors = (properties) =>
  [...new Set(properties.map((p) => getSector(p.location)).filter(Boolean))].sort(
    (a, b) => toNumber(a) - toNumber(b)
  );

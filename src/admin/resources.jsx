import { TABLES } from '../lib/content';

const propertyDetailKeys = [
  { key: 'totalBuiltUpArea', label: 'Total built-up area' },
  { key: 'typicalFloorPlate', label: 'Typical floor plate' },
  { key: 'totalFloors', label: 'Total floors' },
  { key: 'parking', label: 'Parking' },
  { key: 'certification', label: 'Certification' },
  { key: 'nearestAirport', label: 'Nearest airport' },
  { key: 'nearestMetro', label: 'Nearest metro' },
  { key: 'landmark', label: 'Landmark' },
];

const publishingFields = [
  { name: 'published', label: 'Show on website', type: 'checkbox', default: true },
  { name: 'sort_order', label: 'Display order', type: 'number', help: 'Lower numbers appear first.', default: 0 },
];

const TeamPhotoPreview = ({ values }) => (
  <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-100 ring-4 ring-brand-50">
    {values.photo && (
      <img
        src={values.photo}
        alt=""
        className="w-full h-full object-cover"
        style={{
          ...(values.image_position ? { objectPosition: values.image_position } : {}),
          ...(values.image_scale
            ? { transform: `scale(${values.image_scale})`, transformOrigin: values.image_origin || 'center center' }
            : {}),
        }}
      />
    )}
  </div>
);

export const resources = {
  properties: {
    table: TABLES.properties,
    title: 'Properties',
    singular: 'property',
    folder: 'properties',
    image: 'cover_image',
    primary: 'title',
    secondary: (row) => [row.type, row.price].filter(Boolean).join(' · '),
    badges: (row) => [
      row.status === 'completed' ? { label: 'Completed', tone: 'green' } : { label: 'Available', tone: 'blue' },
      row.featured && { label: 'Featured', tone: 'amber' },
      row.is_new && { label: 'New', tone: 'blue' },
    ].filter(Boolean),
    filters: [
      { label: 'All', test: () => true },
      { label: 'Available', test: (row) => row.status === 'available' },
      { label: 'Featured', test: (row) => row.featured },
      { label: 'Completed', test: (row) => row.status === 'completed' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'URL slug', type: 'text', help: 'Leave blank to generate from the title. Used in /property/<slug>.' },
      {
        name: 'type',
        label: 'Type',
        type: 'select',
        options: [
          { value: 'office', label: 'Office' },
          { value: 'retail', label: 'Retail' },
          { value: 'industrial', label: 'Industrial' },
        ],
        default: 'office',
      },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'available', label: 'Available' },
          { value: 'completed', label: 'Completed project' },
        ],
        default: 'available',
      },
      { name: 'price', label: 'Price', type: 'text', placeholder: '₹ 20,00,00,000' },
      { name: 'area', label: 'Area', type: 'text', placeholder: '5,000 sq ft' },
      { name: 'parkings', label: 'Parking spaces', type: 'number' },
      { name: 'rating', label: 'Rating (0–5)', type: 'number', step: '0.1' },
      { name: 'location', label: 'Full address', type: 'textarea', rows: 2 },
      { name: 'description', label: 'Description', type: 'textarea', rows: 4 },
      { name: 'cover_image', label: 'Cover image', type: 'image', required: true },
      { name: 'gallery', label: 'Gallery', type: 'images', default: [] },
      { name: 'floor_plans', label: 'Floor plans', type: 'images', default: [] },
      { name: 'video_url', label: 'Walkthrough video (optional)', type: 'video' },
      {
        name: 'tour_url',
        label: 'YouTube or virtual tour link (optional)',
        type: 'text',
        placeholder: 'https://www.youtube.com/watch?v=…',
        help: 'YouTube links play on the page; other links (e.g. Matterport) open in a new tab.',
      },
      {
        name: 'brochure_url',
        label: 'Brochure PDF (optional)',
        type: 'file',
        help: 'Visitors enter their name and phone to download it — each download is emailed to you as a lead.',
      },
      { name: 'amenities', label: 'Amenities', type: 'list', placeholder: 'e.g. Power Back Up', default: [] },
      { name: 'units', label: 'Available units', type: 'units', default: [] },
      { name: 'details', label: 'Building details', type: 'details', keys: propertyDetailKeys, default: {} },
      { name: 'featured', label: 'Show in Featured Properties on the home page', type: 'checkbox', default: false },
      { name: 'is_new', label: 'Mark as New', type: 'checkbox', default: false },
      ...publishingFields,
    ],
  },

  testimonials: {
    table: TABLES.testimonials,
    title: 'Testimonials',
    singular: 'testimonial',
    folder: 'testimonials',
    image: 'photo',
    primary: 'name',
    secondary: (row) => row.role || '',
    badges: (row) => (row.video_url ? [{ label: 'Video', tone: 'blue' }] : []),
    fields: [
      { name: 'name', label: 'Client name', type: 'text', required: true },
      { name: 'role', label: 'Role / company', type: 'text', placeholder: 'Director, Acme Pvt Ltd' },
      { name: 'quote', label: 'Testimonial', type: 'textarea', rows: 4, required: true },
      {
        name: 'rating',
        label: 'Rating',
        type: 'select',
        options: [5, 4, 3, 2, 1].map((n) => ({ value: n, label: `${n} star${n > 1 ? 's' : ''}` })),
        default: 5,
        numeric: true,
      },
      { name: 'photo', label: 'Photo (optional)', type: 'image', help: 'Also used as the cover image before the video plays.' },
      { name: 'video_url', label: 'Video (optional)', type: 'video' },
      ...publishingFields,
    ],
  },

  team: {
    table: TABLES.team,
    title: 'Team',
    singular: 'team member',
    folder: 'team',
    image: 'photo',
    imageShape: 'circle',
    primary: 'name',
    secondary: (row) => row.position || '',
    preview: TeamPhotoPreview,
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'position', label: 'Role', type: 'text' },
      { name: 'description', label: 'Short description', type: 'textarea', rows: 2 },
      { name: 'photo', label: 'Photo', type: 'image' },
      { name: 'image_scale', label: 'Photo zoom', type: 'number', step: '0.05', help: '1 = no zoom, 1.7 = zoomed in.' },
      { name: 'image_origin', label: 'Zoom focus point', type: 'text', placeholder: '50% 30%', help: 'Horizontal and vertical position of the face.' },
      { name: 'image_position', label: 'Photo position (without zoom)', type: 'text', placeholder: 'center 20%' },
      ...publishingFields,
    ],
  },

  interior: {
    table: TABLES.interior,
    title: 'Interior Projects',
    singular: 'interior project',
    folder: 'interior',
    image: 'image',
    primary: 'title',
    secondary: (row) => [row.location, row.area].filter(Boolean).join(' · '),
    fields: [
      { name: 'title', label: 'Project title', type: 'text', required: true },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'Sector 62, Noida' },
      { name: 'area', label: 'Area', type: 'text', placeholder: '1200 sq ft' },
      { name: 'duration', label: 'Duration', type: 'text', placeholder: '45 days' },
      { name: 'image', label: 'Image', type: 'image', required: true },
      ...publishingFields,
    ],
  },
};

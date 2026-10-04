import React, { useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Building2,
  ArrowLeft,
  ArrowUpRight,
  Star,
  CheckCircle2,
  Car,
  Train,
  Plane,
  ParkingCircle,
  Maximize2,
  Layers,
  Award,
  Images,
  FileText,
  Phone,
  PlayCircle,
  ExternalLink,
  CalendarCheck,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useContent } from '../lib/content';
import { getArea, getUnitSizes, parsePrice } from '../lib/propertyFilters';
import Lightbox from '../components/Lightbox';
import { BrochureModal, SiteVisitForm } from '../components/PropertyLeadForms';
import Seo, { SITE_URL, absoluteUrl } from '../components/Seo';

const PHONE = '+918929356475';
const PHONE_DISPLAY = '+91 8929356475';

const youtubeId = (url) => {
  const match = (url || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : null;
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

const Section = ({ title, children, action }) => (
  <motion.section {...fadeUp} className="card p-7 md:p-8">
    <div className="flex items-center justify-between gap-4 mb-6">
      <h2 className="font-display text-2xl font-bold text-gray-900">{title}</h2>
      {action}
    </div>
    {children}
  </motion.section>
);

const buildJsonLd = (property, images) => {
  const url = `${SITE_URL}/property/${property.id}`;
  const price = parsePrice(property.price);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateListing',
        name: property.title,
        description: property.description,
        url,
        image: images.map(absoluteUrl),
        contentLocation: {
          '@type': 'Place',
          name: property.title,
          address: {
            '@type': 'PostalAddress',
            streetAddress: property.location,
            addressLocality: 'Noida',
            addressRegion: 'Uttar Pradesh',
            addressCountry: 'IN',
          },
        },
        ...(price ? { offers: { '@type': 'Offer', price, priceCurrency: 'INR' } } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Properties', item: `${SITE_URL}/properties` },
          { '@type': 'ListItem', position: 3, name: property.title, item: url },
        ],
      },
    ],
  };
};

const DetailsSkeleton = () => (
  <div className="min-h-screen bg-gray-50 animate-pulse">
    <div className="h-[58vh] min-h-[460px] bg-gray-200" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="h-64 rounded-3xl bg-gray-200" />
        <div className="h-48 rounded-3xl bg-gray-200" />
      </div>
      <div className="h-96 rounded-3xl bg-gray-200" />
    </div>
  </div>
);

const PropertyDetails = () => {
  const { id } = useParams();
  const { data: properties, loading } = useContent('properties');
  const property = properties.find((p) => p.id === id);

  const [viewer, setViewer] = useState({ images: [], index: null });
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [visitMessage, setVisitMessage] = useState('');
  const visitRef = useRef(null);

  const similar = useMemo(
    () =>
      property
        ? properties
            .filter((p) => p.id !== property.id && p.status === 'available' && p.type === property.type)
            .slice(0, 3)
        : [],
    [properties, property]
  );

  if (loading) return <DetailsSkeleton />;

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Seo title="Property Not Found" noindex />
        <div className="card max-w-md w-full p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Property Not Found</h2>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/properties" className="btn-primary">
            Browse Properties
          </Link>
        </div>
      </div>
    );
  }

  const details = property.details || {};
  const photos = [property.image, ...(property.gallery || [])].filter(Boolean);
  const floorPlans = property.floorPlans || [];
  const ytId = youtubeId(property.tourUrl);
  const hasMedia = property.video || ytId || property.tourUrl;
  const sizes = getUnitSizes(property);
  const isCompleted = property.status === 'completed';

  const openViewer = (images, index) => setViewer({ images, index });

  const inquireUnit = (unit) => {
    setVisitMessage(`I'm interested in the ${unit.area} unit${unit.seats ? ` (${unit.seats} seats)` : ''}.`);
    visitRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const whatsappLink = `https://wa.me/${PHONE.replace('+', '')}?text=${encodeURIComponent(
    `Hi, I'm interested in ${property.title}. ${typeof window !== 'undefined' ? window.location.href : ''}`
  )}`;

  const overview = [
    { icon: <Maximize2 className="w-5 h-5" />, label: 'Total Area', value: details.totalBuiltUpArea },
    { icon: <Layers className="w-5 h-5" />, label: 'Floor Plate', value: details.typicalFloorPlate },
    { icon: <Building2 className="w-5 h-5" />, label: 'Total Floors', value: details.totalFloors },
    { icon: <Award className="w-5 h-5" />, label: 'Certification', value: details.certification },
  ].filter((o) => o.value);

  const connectivity = [
    { icon: <Plane className="w-5 h-5" />, label: 'Nearest Airport', value: details.nearestAirport },
    { icon: <Train className="w-5 h-5" />, label: 'Nearest Metro', value: details.nearestMetro },
    { icon: <Car className="w-5 h-5" />, label: 'Landmark', value: details.landmark },
    { icon: <ParkingCircle className="w-5 h-5" />, label: 'Parking', value: details.parking },
  ].filter((c) => c.value);

  const galleryPreview = photos.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      <Seo
        title={`${property.title} — ${getArea(property.location)}`}
        description={(property.description || '').slice(0, 155)}
        path={`/property/${property.id}`}
        image={property.image}
        type="article"
        jsonLd={buildJsonLd(property, photos)}
      />

      {/* Hero */}
      <div className="relative h-[58vh] min-h-[460px]">
        <img src={property.image} alt={property.title} className="w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/55 to-brand-950/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Properties
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-white/25 backdrop-blur-sm capitalize">
                  {property.type}
                </span>
                {isCompleted && (
                  <span className="inline-flex items-center rounded-full bg-green-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    Completed
                  </span>
                )}
                {property.rating && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold ring-1 ring-white/25 backdrop-blur-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {property.rating}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
                {property.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/85">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 shrink-0" />
                  {property.location}
                </span>
                {property.price && (
                  <span className="text-lg font-bold text-white">{property.price}</span>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {photos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => openViewer(photos, 0)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <Images className="w-4 h-4" />
                    View all {photos.length} photos
                  </button>
                )}
                {hasMedia && (
                  <a
                    href="#walkthrough"
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-sm hover:bg-white/25 transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Watch walkthrough
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <Section title="Property Overview">
              <p className="text-gray-600 leading-relaxed mb-8">{property.description}</p>
              {overview.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {overview.map((o) => (
                    <div key={o.label} className="rounded-2xl bg-gray-50 ring-1 ring-gray-900/5 p-4">
                      <div className="icon-chip h-10 w-10 mb-3">{o.icon}</div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{o.label}</p>
                      <p className="text-base font-bold text-gray-900 mt-0.5">{o.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            {photos.length > 1 && (
              <Section
                title="Gallery"
                action={
                  <button
                    type="button"
                    onClick={() => openViewer(photos, 0)}
                    className="text-sm font-semibold text-brand-700 hover:text-brand-900"
                  >
                    View all
                  </button>
                }
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {galleryPreview.map((src, i) => {
                    const remaining = photos.length - galleryPreview.length;
                    const isLast = i === galleryPreview.length - 1 && remaining > 0;
                    return (
                      <button
                        key={src}
                        type="button"
                        onClick={() => openViewer(photos, i)}
                        className="group relative block overflow-hidden rounded-xl"
                      >
                        <img
                          src={src}
                          alt={`${property.title} photo ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {isLast && (
                          <span className="absolute inset-0 grid place-items-center bg-black/55 text-white text-lg font-semibold">
                            +{remaining} more
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Section>
            )}

            {hasMedia && (
              <div id="walkthrough" className="scroll-mt-28">
                <Section title="Walkthrough">
                  <div className="space-y-4">
                    {property.video && (
                      <video
                        src={property.video}
                        poster={property.image}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full rounded-2xl bg-black aspect-video"
                      />
                    )}
                    {ytId && (
                      <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-video">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`}
                          title={`${property.title} walkthrough`}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full"
                        />
                      </div>
                    )}
                    {property.tourUrl && !ytId && (
                      <a href={property.tourUrl} target="_blank" rel="noreferrer" className="btn-outline">
                        <ExternalLink className="w-5 h-5" />
                        Open virtual tour
                      </a>
                    )}
                  </div>
                </Section>
              </div>
            )}

            {floorPlans.length > 0 && (
              <Section title="Floor Plans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {floorPlans.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => openViewer(floorPlans, i)}
                      className="group block overflow-hidden rounded-xl bg-white ring-1 ring-gray-200"
                    >
                      <img
                        src={src}
                        alt={`${property.title} floor plan ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-[4/3] object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </Section>
            )}

            {property.units?.length > 0 && (
              <Section title="Available Units">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {property.units.map((unit, index) => (
                    <div key={index} className="rounded-2xl bg-gray-50 ring-1 ring-gray-900/5 p-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{unit.area}</h3>
                        {!isCompleted && (
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Available
                          </span>
                        )}
                      </div>
                      {unit.seats && <p className="text-gray-500 text-sm mb-5">Capacity: {unit.seats} seats</p>}
                      <button
                        type="button"
                        onClick={() => inquireUnit(unit)}
                        className="block w-full bg-brand-800 text-white py-2.5 rounded-xl font-semibold hover:bg-brand-900 transition-colors text-center"
                      >
                        Inquire Now
                      </button>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {property.amenities?.length > 0 && (
              <Section title="Amenities">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-700 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            <Section title="Location & Connectivity">
              {connectivity.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  {connectivity.map((c) => (
                    <div key={c.label} className="flex items-start gap-4">
                      <div className="icon-chip h-11 w-11 shrink-0">{c.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-0.5">{c.label}</h3>
                        <p className="text-gray-600 text-sm">{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {property.location && (
                <div className="overflow-hidden rounded-2xl ring-1 ring-gray-200">
                  <iframe
                    title={`Map of ${property.title}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-72 md:h-80 border-0"
                  />
                </div>
              )}
            </Section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-7 sticky top-28 space-y-6">
              {(property.price || sizes.length > 0) && (
                <div className="pb-6 border-b border-gray-100">
                  {property.price && <p className="font-display text-3xl font-bold text-gray-900">{property.price}</p>}
                  {sizes.length > 0 && (
                    <p className="mt-1 text-sm text-gray-500">
                      Spaces from {Math.min(...sizes).toLocaleString('en-IN')} sq ft
                    </p>
                  )}
                </div>
              )}

              <SiteVisitForm ref={visitRef} property={property} presetMessage={visitMessage} />

              <div className="space-y-3 pt-6 border-t border-gray-100">
                {property.brochure && (
                  <button type="button" onClick={() => setBrochureOpen(true)} className="btn-outline w-full">
                    <FileText className="w-5 h-5" />
                    Download Brochure
                  </button>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <a href={`tel:${PHONE}`} className="btn-outline w-full px-3">
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 py-3 font-semibold text-white hover:bg-[#1ebe5b] transition-colors"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
                <p className="text-center text-xs text-gray-500">{PHONE_DISPLAY}</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <span className="eyebrow mb-2">Keep exploring</span>
                <h2 className="font-display text-3xl font-bold text-gray-900">Similar Properties</h2>
              </div>
              <Link to={`/properties/${property.type}`} className="hidden sm:inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <Link key={p.id} to={`/property/${p.id}`} className="group block">
                  <div className="overflow-hidden rounded-2xl ring-1 ring-gray-900/[0.06] shadow-sm">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-brand-700 transition-colors">{p.title}</h3>
                      <p className="mt-0.5 text-sm text-gray-500 truncate">{getArea(p.location)}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-brand-700 transition-colors shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile action bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 flex gap-3">
        <a href={`tel:${PHONE}`} className="btn-outline flex-1 px-3 py-3" aria-label="Call">
          <Phone className="w-4 h-4" />
          Call
        </a>
        <button
          type="button"
          onClick={() => visitRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="btn-primary flex-[2] px-3 py-3"
        >
          <CalendarCheck className="w-4 h-4" />
          Schedule Visit
        </button>
      </div>

      <Lightbox
        images={viewer.images}
        index={viewer.index}
        alt={property.title}
        onClose={() => setViewer((v) => ({ ...v, index: null }))}
        onChange={(index) => setViewer((v) => ({ ...v, index }))}
      />
      <BrochureModal property={property} open={brochureOpen} onClose={() => setBrochureOpen(false)} />
    </div>
  );
};

export default PropertyDetails;

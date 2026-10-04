import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ArrowUpRight, Search, X, Maximize2, SlidersHorizontal } from "lucide-react";
import { useContent } from "../lib/content";
import {
  filterProperties,
  getArea,
  getUnitSizes,
  listSectors,
  SIZE_RANGES,
  SORT_OPTIONS,
} from "../lib/propertyFilters";
import Seo from "./Seo";

const filters = [
  { label: "All Properties", path: "/properties", value: undefined },
  { label: "Office", path: "/properties/office", value: "office" },
  { label: "Retail", path: "/properties/retail", value: "retail" },
  { label: "Industrial", path: "/properties/industrial", value: "industrial" },
];

const titles = {
  office: "Office Spaces",
  retail: "Retail Properties",
  industrial: "Industrial Units",
};

const descriptions = {
  office: "Grade-A office spaces for lease and sale across Noida's top business sectors.",
  retail: "High-footfall retail and showroom spaces in prime Noida locations.",
  industrial: "Modern industrial and warehousing units across Noida and Delhi NCR.",
};

const formatSqft = (n) => n.toLocaleString("en-IN");

const sizeLabel = (property) => {
  const sizes = getUnitSizes(property);
  if (!sizes.length) return "";
  const min = Math.min(...sizes);
  const max = Math.max(...sizes);
  return min === max ? `${formatSqft(min)} sq ft` : `${formatSqft(min)} – ${formatSqft(max)} sq ft`;
};

const selectClass =
  "w-full appearance-none rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-700 ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-600 cursor-pointer";

const PropertyCard = ({ property, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
  >
    <Link to={`/property/${property.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-900/[0.06] shadow-sm">
        <img
          loading="lazy"
          decoding="async"
          src={property.image}
          alt={property.title}
          className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {property.featured && (
            <span className="rounded-full bg-accent-600 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 shadow-sm">
              Featured
            </span>
          )}
          {property.isNew && (
            <span className="rounded-full bg-brand-800 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 shadow-sm">
              New
            </span>
          )}
        </div>
        {property.price && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-sm font-bold text-brand-800 shadow-sm">
            {property.price}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 transition-colors group-hover:text-brand-700">
            {property.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate">{getArea(property.location)}</span>
          </p>
          {sizeLabel(property) && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <Maximize2 className="w-4 h-4 shrink-0" />
              <span className="truncate">{sizeLabel(property)}</span>
            </p>
          )}
        </div>
        <span className="grid place-items-center h-11 w-11 shrink-0 rounded-2xl bg-white text-gray-700 ring-1 ring-gray-200 shadow-sm transition-all duration-300 group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-700 group-hover:-translate-y-0.5">
          <ArrowUpRight className="w-5 h-5" />
        </span>
      </div>
    </Link>
  </motion.div>
);

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="w-full aspect-[4/3] rounded-2xl bg-gray-200" />
    <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />
    <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
  </div>
);

const PropertyList = ({ type }) => {
  const { data: allProperties, loading } = useContent("properties");
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const sector = params.get("sector") || "";
  const size = params.get("size") || "";
  const sort = params.get("sort") || "";

  const available = useMemo(
    () => allProperties.filter((p) => p.status === "available"),
    [allProperties]
  );
  const sectors = useMemo(
    () => listSectors(type ? available.filter((p) => p.type === type) : available),
    [available, type]
  );
  const results = useMemo(
    () => filterProperties(available, { type, q, sector, size, sort }),
    [available, type, q, sector, size, sort]
  );

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const hasFilters = Boolean(q || sector || size);
  const clearFilters = () => {
    const next = new URLSearchParams();
    if (sort) next.set("sort", sort);
    setParams(next, { replace: true });
  };

  const queryString = params.toString() ? `?${params.toString()}` : "";
  const title = type ? titles[type] || "Properties" : "All Properties";

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title={`${title} in Noida`}
        description={
          descriptions[type] ||
          "Browse verified Grade-A office, retail, and industrial properties across Noida and Delhi NCR."
        }
        path={type ? `/properties/${type}` : "/properties"}
      />

      {/* Header */}
      <section className="bg-white pt-28 md:pt-32 pb-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow mb-4">Our Portfolio</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Browse our curated portfolio of verified Grade-A commercial properties
              across Noida and Delhi NCR.
            </p>

            {/* Type chips */}
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((f) => {
                const active = type === f.value || (!type && !f.value);
                return (
                  <Link
                    key={f.label}
                    to={`${f.path}${queryString}`}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                      active
                        ? "bg-brand-800 text-white shadow-brand-glow"
                        : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:text-brand-700"
                    }`}
                  >
                    {f.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="md:sticky md:top-[5.5rem] z-30 bg-gray-50/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <label className="relative md:col-span-5">
              <span className="sr-only">Search properties</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                value={q}
                onChange={(e) => setParam("q", e.target.value)}
                placeholder="Search by name, sector, or amenity"
                className="w-full rounded-xl bg-white pl-11 pr-4 py-3 text-sm text-gray-800 ring-1 ring-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
            </label>
            <label className="md:col-span-2">
              <span className="sr-only">Sector</span>
              <select value={sector} onChange={(e) => setParam("sector", e.target.value)} className={selectClass}>
                <option value="">All sectors</option>
                {sectors.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="md:col-span-3">
              <span className="sr-only">Space size</span>
              <select value={size} onChange={(e) => setParam("size", e.target.value)} className={selectClass}>
                <option value="">Any size</option>
                {SIZE_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </label>
            <label className="md:col-span-2">
              <span className="sr-only">Sort by</span>
              <select value={sort} onChange={(e) => setParam("sort", e.target.value)} className={selectClass}>
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!loading && (
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <SlidersHorizontal className="w-4 h-4" />
                <span>
                  <strong className="text-gray-900">{results.length}</strong>{" "}
                  {results.length === 1 ? "property" : "properties"} found
                </span>
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
                >
                  <X className="w-4 h-4" />
                  Clear filters
                </button>
              )}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {Array.from({ length: 6 }, (_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="card mx-auto max-w-lg p-10 text-center">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                No matching properties
              </h2>
              <p className="text-gray-600 mb-6">
                Try widening your filters, or tell us what you're looking for and
                we'll source it for you.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {hasFilters && (
                  <button type="button" onClick={clearFilters} className="btn-outline">
                    Clear filters
                  </button>
                )}
                <Link to="/contact" className="btn-primary">
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {results.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          )}

          {/* CTA */}
          {!loading && results.length > 0 && (
            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-5">
                Can't find the right space? Our team will help you find it.
              </p>
              <Link to="/contact" className="btn-primary">
                Get Expert Advice
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PropertyList;

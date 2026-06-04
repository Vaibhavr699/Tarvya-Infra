import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import { properties } from "../data/properties";

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

const getArea = (loc = "") => {
  const sector = loc
    .split(",")
    .map((s) => s.trim())
    .find((p) => /sector/i.test(p));
  return sector ? `${sector}, Noida` : "Noida, Uttar Pradesh";
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PropertyList = ({ type }) => {
  const filtered = type ? properties.filter((p) => p.type === type) : properties;
  const title = type ? titles[type] || "Properties" : "All Properties";

  return (
    <div className="min-h-screen bg-gray-50">
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

            {/* Filter chips */}
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((f) => {
                const active = type === f.value || (!type && !f.value);
                return (
                  <Link
                    key={f.label}
                    to={f.path}
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

      {/* Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="card mx-auto max-w-lg p-10 text-center">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                No properties here yet
              </h2>
              <p className="text-gray-600 mb-6">
                We don't have listings in this category right now. Tell us what you're
                looking for and we'll source it for you.
              </p>
              <Link to="/contact" className="btn-primary">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
            >
              {filtered.map((property) => (
                <motion.div key={property.id} variants={cardVariants}>
                  <Link to={`/property/${property.id}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-900/[0.06] shadow-sm">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/600x450?text=Property";
                        }}
                      />
                      {property.isNew && (
                        <span className="absolute top-3 left-3 rounded-full bg-brand-800 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 shadow-sm">
                          New
                        </span>
                      )}
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
                      </div>
                      <span className="grid place-items-center h-11 w-11 shrink-0 rounded-2xl bg-white text-gray-700 ring-1 ring-gray-200 shadow-sm transition-all duration-300 group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-700 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="w-5 h-5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CTA */}
          {filtered.length > 0 && (
            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-5">
                Can't find the right space? Our team will help you find it.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {type && (
                  <Link to="/properties" className="btn-outline">
                    View All Properties
                  </Link>
                )}
                <Link to="/contact" className="btn-primary">
                  Get Expert Advice
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PropertyList;

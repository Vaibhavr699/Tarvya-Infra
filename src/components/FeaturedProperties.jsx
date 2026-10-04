// src/components/FeaturedProperties.jsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useContent } from "../lib/content";

// Featured Properties Component
const FeaturedProperties = () => {
  const { data: properties } = useContent("properties");
  const featuredProperties = properties.filter((p) => p.featured && p.status === "available");
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="eyebrow mb-4">Handpicked Listings</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Featured <span className="accent-underline text-brand-800">Properties</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of commercial properties, each
            offering unique advantages for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {featuredProperties.map((property, index) => {
            const sector = property.location
              .split(",")
              .map((s) => s.trim())
              .find((p) => /sector/i.test(p));
            const area = sector ? `${sector}, Noida` : "Noida, Uttar Pradesh";

            return (
              <motion.div
                key={property.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <Link to={`/property/${property.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-900/[0.06] shadow-sm">
                    <img loading="lazy" decoding="async"
                      src={property.image}
                      alt={property.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate transition-colors group-hover:text-brand-700">
                        {property.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-500 truncate">{area}</p>
                    </div>
                    <span className="grid place-items-center h-11 w-11 shrink-0 rounded-2xl bg-white text-gray-700 ring-1 ring-gray-200 shadow-sm transition-all duration-300 group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-700 group-hover:-translate-y-0.5">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Properties Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link to="/properties" className="btn-primary">
            View All Properties
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

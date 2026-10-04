import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2 } from "lucide-react";
import { useContent } from "../lib/content";

const getArea = (loc = "") => {
  const sector = loc
    .split(",")
    .map((s) => s.trim())
    .find((p) => /sector/i.test(p));
  return sector ? `${sector}, Noida` : loc;
};

const CompletedProjects = () => {
  const { data: properties } = useContent("properties");
  const completed = properties.filter((p) => p.status === "completed");

  if (!completed.length) return null;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="eyebrow mb-4">Our Track Record</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Completed <span className="accent-underline text-brand-800">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Spaces we have successfully closed for businesses across Noida and Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {completed.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Link to={`/property/${property.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-900/[0.06] shadow-sm">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-green-600 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900 line-clamp-1 transition-colors group-hover:text-brand-700">
                  {property.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">{getArea(property.location)}</span>
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;

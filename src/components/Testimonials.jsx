import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Quote, Star, ArrowRight } from "lucide-react";
import { useContent } from "../lib/content";

export const TestimonialCard = ({ testimonial: t, index = 0 }) => (
  <motion.figure
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    viewport={{ once: true }}
    className="card overflow-hidden flex flex-col"
  >
    {t.video && (
      <video
        src={t.video}
        poster={t.image || undefined}
        controls
        playsInline
        preload="metadata"
        className="w-full aspect-video bg-black object-cover"
      />
    )}
    <div className="p-7 flex flex-col flex-grow">
      {!t.video && <Quote className="w-8 h-8 text-brand-200 mb-4" />}
      {t.rating > 0 && (
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      )}
      <blockquote className="text-gray-700 leading-relaxed flex-grow">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {t.image ? (
          <img loading="lazy" decoding="async" src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-50" />
        ) : (
          <span className="grid place-items-center w-12 h-12 rounded-full bg-brand-50 text-brand-800 font-bold">
            {t.name.charAt(0)}
          </span>
        )}
        <div>
          <p className="font-semibold text-gray-900">{t.name}</p>
          {t.role && <p className="text-sm text-gray-500">{t.role}</p>}
        </div>
      </figcaption>
    </div>
  </motion.figure>
);

const HOME_PREVIEW_COUNT = 3;

const Testimonials = () => {
  const { data: testimonials } = useContent("testimonials");

  if (!testimonials.length) return null;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="eyebrow mb-4">Client Stories</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            What Our <span className="accent-underline text-brand-800">Clients Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {testimonials.slice(0, HOME_PREVIEW_COUNT).map((t, index) => (
            <TestimonialCard key={t.name + index} testimonial={t} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/testimonials" className="btn-primary">
            View All Testimonials
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

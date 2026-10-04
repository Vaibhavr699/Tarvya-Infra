import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContent } from "../lib/content";
import { TestimonialCard } from "../components/Testimonials";

const TestimonialsPage = () => {
  const { data: testimonials, loading } = useContent("testimonials");
  const videos = testimonials.filter((t) => t.video);
  const written = testimonials.filter((t) => !t.video);

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo title="Client Testimonials" path="/testimonials" description="Hear from businesses that found their office and retail spaces in Noida with Tarvya Infra." />
      <section className="bg-white pt-28 md:pt-32 pb-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="eyebrow mb-4">Client Stories</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">Testimonials</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from the businesses we have helped find the right commercial space across Noida and Delhi NCR.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {loading ? (
            <p className="text-center text-gray-500">Loading testimonials…</p>
          ) : testimonials.length === 0 ? (
            <div className="card mx-auto max-w-lg p-10 text-center">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Testimonials coming soon</h2>
              <p className="text-gray-600">We are collecting stories from our clients. Check back shortly.</p>
            </div>
          ) : (
            <>
              {videos.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">Video Stories</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    {videos.map((t, index) => (
                      <TestimonialCard key={t.name + index} testimonial={t} index={index} />
                    ))}
                  </div>
                </div>
              )}
              {written.length > 0 && (
                <div>
                  {videos.length > 0 && (
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">What Clients Say</h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    {written.map((t, index) => (
                      <TestimonialCard key={t.name + index} testimonial={t} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="text-center">
            <p className="text-gray-600 mb-5">Ready to find your next commercial space?</p>
            <Link to="/contact" className="btn-primary">
              Talk to Our Team
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;

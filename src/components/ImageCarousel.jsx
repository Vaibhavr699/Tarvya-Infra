import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2, CalendarCheck } from "lucide-react";
import heroImage from "../assets/hero image.png";
import assotech from "../assets/Assotech.jpg";
import atstower from "../assets/atstower.jpg";
import atsb from "../assets/atsb.jpg";
import opus from "../assets/opus.webp";
import maxSquare from "../assets/max.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";

// Images cycled in the hero frame — add or reorder freely.
const heroImages = [heroImage, assotech, atstower, atsb, opus, maxSquare, img6, img7];

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);

  // Auto-advance the hero image every 4 seconds (no controls, just a crossfade).
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const current = heroImages[index];

  return (
    <section className="relative bg-white">
      {/* Faint top-left tint */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50/70 via-white to-white" />

      {/* Right bleed image (desktop) */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2 xl:w-[52%]">
        <AnimatePresence>
          <motion.img
            key={index}
            src={current}
            alt="Premium commercial building"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-brand-950/5" />
        {/* White curved divider on the left edge of the image */}
        <svg
          className="absolute inset-y-0 -left-px h-full w-[16%] min-w-[90px] text-white"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M100,0 C42,20 42,80 100,100 L0,100 L0,0 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center lg:min-h-[calc(100vh_-_12rem)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-gray-900">
              Your Trusted Partner in{" "}
              <span className="relative inline-block text-brand-700">
                Commercial Real Estate
                <svg
                  className="absolute -bottom-2 left-0 w-full text-brand-500"
                  height="12"
                  viewBox="0 0 320 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8.5C70 3 250 2.5 317 6"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Paragraph with accent bar */}
            <p className="mt-8 border-l-4 border-brand-600 pl-5 text-lg text-gray-600 leading-relaxed">
              We deliver premium commercial spaces that empower businesses to grow.
              Discover office, retail, and industrial properties in prime locations,
              designed for your success.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/properties" className="btn-primary">
                <Building2 className="w-5 h-5" />
                Explore Properties
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-outline">
                <CalendarCheck className="w-5 h-5" />
                Book Consultation
              </Link>
            </div>
          </motion.div>

          {/* Mobile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="lg:hidden"
          >
            <div className="relative h-[280px] sm:h-[380px] rounded-2xl overflow-hidden shadow-elevated ring-1 ring-gray-900/5">
              <AnimatePresence>
                <motion.img
                  key={index}
                  src={current}
                  alt="Premium commercial building"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;

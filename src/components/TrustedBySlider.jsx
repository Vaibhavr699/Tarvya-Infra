import React, { useRef } from "react";
import Marquee from "react-fast-marquee";
import { motion, useScroll, useTransform } from "framer-motion";
import "./TrustedBySlider.css";

// Import logos (you should replace these with actual company logos)
import logo2 from "../assets/advant.png";
import logo3 from "../assets/abc.png";
import logo4 from "../assets/ats.png";
import logo5 from "../assets/max.png";
import logo6 from "../assets/supernova.png";
import logo7 from "../assets/urbtech.png";
import logo8 from "../assets/bhutani.png";


const logos = [
  { src: logo2, alt: "Company 2" },
  { src: logo3, alt: "Company 3" },
  { src: logo4, alt: "Company 4" },
  { src: logo5, alt: "Company 5" },
  { src: logo6, alt: "Company 6" },
  { src: logo7, alt: "Company 7" },
  { src: logo8, alt: "Company 8" },

];

const TrustedBySlider = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={containerRef} className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 overflow-hidden">
      <motion.div 
        style={{ y, opacity, scale }}
        className="max-w-7xl mx-auto px-4"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Trusted By Leading Brands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We're proud to serve some of the most respected companies in the industry. 
            Our commitment to excellence has earned us the trust of businesses across various sectors.
          </p>
          <div className="w-24 h-1 bg-[#1E3A8A] mx-auto rounded-full"></div>
        </motion.div>

        {/* Logo Slider Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          ></motion.div>
          <motion.div 
            className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          ></motion.div>

          {/* Marquee Slider */}
          <div className="py-8">
            <Marquee
              gradient={false}
              speed={40}
              direction="left"
              pauseOnHover={true}
              className="trusted-logos"
            >
              {logos.map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="mx-8 md:mx-12"
                >
                  <motion.div 
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      y: -10
                    }}
                  >
                    <div className="w-32 h-16 md:w-40 md:h-20 flex items-center justify-center">
                      <motion.img
                        src={logo.src}
                        alt={logo.alt}
                        className="max-h-full max-w-full object-contain transition-all duration-300"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </Marquee>
          </div>

          {/* Second Marquee (Reverse Direction) */}
          <div className="py-8">
            <Marquee
              gradient={false}
              speed={40}
              direction="right"
              pauseOnHover={true}
              className="trusted-logos"
            >
              {logos.map((logo, index) => (
                <motion.div
                  key={`reverse-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, 5, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="mx-8 md:mx-12"
                >
                  <motion.div 
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      y: -10
                    }}
                  >
                    <div className="w-32 h-16 md:w-40 md:h-20 flex items-center justify-center">
                      <motion.img
                        src={logo.src}
                        alt={logo.alt}
                        className="max-h-full max-w-full object-contain transition-all duration-300"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center"
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-sm"
            whileHover={{ 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              scale: 1.05
            }}
          >
            <motion.span 
              className="text-red-600 font-semibold"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >✓</motion.span>
            <span className="text-gray-700 font-medium">
              Trusted by 100+ Companies
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TrustedBySlider;

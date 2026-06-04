import React from "react";
import Marquee from "react-fast-marquee";

import logo2 from "../assets/advant.png";
import logo3 from "../assets/abc.png";
import logo4 from "../assets/ats.png";
import logo5 from "../assets/max.png";
import logo6 from "../assets/supernova.png";
import logo7 from "../assets/urbtech.png";
import logo8 from "../assets/bhutani.png";

const logos = [
  { src: logo2, alt: "Advant" },
  { src: logo3, alt: "Assotech Business Cresterra" },
  { src: logo4, alt: "ATS" },
  { src: logo5, alt: "Max Estates" },
  { src: logo6, alt: "Supernova" },
  { src: logo7, alt: "UrbTech" },
  { src: logo8, alt: "Bhutani" },
];

const TrustedBySlider = () => {
  return (
    <section className="bg-white py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="eyebrow mb-3">Our Partners</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted By Leading Brands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're proud to serve some of the most respected companies across the industry.
          </p>
        </div>

        {/* Single logo marquee — no hover effects, no entrance animations */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

          <Marquee gradient={false} speed={40} pauseOnHover={false} autoFill>
            {logos.map((logo, index) => (
              <div
                key={index}
                className="mx-8 sm:mx-12 flex h-16 w-36 items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySlider;

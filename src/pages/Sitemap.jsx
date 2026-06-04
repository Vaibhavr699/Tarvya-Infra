import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import pageBg from "../assets/building bg1.png";

const SITE_MAP = [
  {
    group: "Main Pages",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Interior Work", to: "/interior" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    group: "Properties",
    links: [
      { label: "All Properties", to: "/properties" },
      { label: "Office Spaces", to: "/properties/office" },
      { label: "Retail Properties", to: "/properties/retail" },
      { label: "Industrial Properties", to: "/properties/industrial" },
    ],
  },
  {
    group: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Sitemap", to: "/sitemap" },
    ],
  },
];

const Sitemap = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 bg-brand-950 text-white overflow-hidden">
        {/* Building wireframe background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${pageBg})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/75 to-brand-950/90"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-brand-200 mb-4">
            Navigate
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
            Sitemap
          </h1>
          <p className="text-lg md:text-xl text-brand-100 max-w-3xl mx-auto">
            A complete overview of the pages on the Tarvya Infra website.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SITE_MAP.map((section) => (
              <div
                key={section.group}
                className="bg-white rounded-2xl shadow-card p-8"
              >
                <h2 className="font-display text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                  {section.group}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="group flex items-center text-gray-600 hover:text-brand-700 transition-colors duration-300"
                      >
                        <FaArrowRight className="mr-2 text-xs text-brand-400 group-hover:translate-x-1 transition-transform duration-300" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sitemap;

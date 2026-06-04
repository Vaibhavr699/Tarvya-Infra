import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Logo from "../assets/logo.png";
import footerBg from "../assets/building bg2.png";
import { sendFormData, formatNewsletterData } from '../utils/formspree';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // No initialization needed for Formspree

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = formatNewsletterData(email);
      const result = await sendFormData(formData);

      if (result.success) {
        toast.success("Successfully subscribed to newsletter!");
        setEmail("");
      } else {
        toast.error(result.message || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-gray-300 bg-brand-950 overflow-hidden">
      {/* Building wireframe background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${footerBg})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-brand-950/75 via-brand-950/80 to-brand-950/92"
        aria-hidden="true"
      />

      {/* Foreground */}
      <div className="relative z-10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src={Logo}
                alt="Tarvya Infra Logo"
                className="h-12 w-12 object-cover"
              />
              <div className="text-white font-bold text-lg">
                TARVYA INFRA
                <span className="block text-xs text-gray-400 font-normal">
                  PVT LTD
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted partner in premium commercial real estate solutions.
              We deliver excellence through innovation, integrity, and customer
              satisfaction.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-brand-700 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white text-lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-brand-700 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white text-lg" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-brand-700 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-white text-lg" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-brand-700 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="text-white text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-brand-300 transition-colors duration-300 flex items-center"
                >
                  <FaArrowRight className="mr-2 text-xs" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-brand-300 transition-colors duration-300 flex items-center"
                >
                  <FaArrowRight className="mr-2 text-xs" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-gray-400 hover:text-brand-300 transition-colors duration-300 flex items-center"
                >
                  <FaArrowRight className="mr-2 text-xs" />
                  All Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/properties/office"
                  className="text-gray-400 hover:text-brand-300 transition-colors duration-300 flex items-center"
                >
                  <FaArrowRight className="mr-2 text-xs" />
                  Office Spaces
                </Link>
              </li>
              <li>
                <Link
                  to="/properties/retail"
                  className="text-gray-400 hover:text-brand-300 transition-colors duration-300 flex items-center"
                >
                  <FaArrowRight className="mr-2 text-xs" />
                  Retail Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-brand-300 transition-colors duration-300 flex items-center"
                >
                  <FaArrowRight className="mr-2 text-xs" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-brand-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  1420, 14th Floor, Supernova Astralis, Sector 94, Noida,
                  Uttar Pradesh, India - 201301
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-brand-400 flex-shrink-0" />
                <a
                  href="tel:+918929356475"
                  className="text-gray-400 hover:text-brand-300 transition-colors duration-300"
                >
                  +91 8929356475
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-brand-400 flex-shrink-0" />
                <a
                  href="mailto:contact@tarvyainfra.com"
                  className="text-gray-400 hover:text-brand-300 transition-colors duration-300"
                >
                  contact@tarvyainfra.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates on properties
              and real estate news.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-brand-500 text-white placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-brand-800 text-white py-3 px-6 rounded-lg hover:bg-brand-700 transition-colors duration-300 font-medium ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm md:text-base text-center md:text-left">
              © {currentYear} All rights reserved by{" "}
              <a
                href="#"
                className="text-white hover:text-blue-400 hover:underline transition duration-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tarvya Infra Pvt Ltd
              </a>
              .
            </p>

            <p className="text-gray-500 text-sm">
              Developed by{" "}
              <a
                href="https://vaibhav-pf-sand.vercel.app/"
                className="text-gray-300 hover:text-brand-300 hover:underline transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vaibhav Raj
              </a>
            </p>

            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-brand-300 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-brand-300 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-400 hover:text-brand-300 transition-colors duration-300"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;

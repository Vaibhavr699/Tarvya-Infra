import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";
import {
  Menu,
  X,
  PhoneCall,
  ChevronDown,
  Building2,
  ShoppingBag,
  Home,
  Info,
  Mail,
  Sofa,
} from "lucide-react";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const propertiesRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (propertiesRef.current && !propertiesRef.current.contains(event.target)) {
        setPropertiesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setPropertiesOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProperties = () => setPropertiesOpen(!propertiesOpen);

  const handlePropertyClick = (path) => {
    setPropertiesOpen(false);
    setMenuOpen(false);
    navigate(path);
  };

  const propertyTypes = [
    { icon: <Building2 className="w-5 h-5" />, label: "Office Spaces", path: "/properties/office" },
    { icon: <ShoppingBag className="w-5 h-5" />, label: "Retail Properties", path: "/properties/retail" },
  ];

  const navLinks = [
    { icon: <Home className="w-5 h-5" />, label: "HOME", path: "/" },
    { icon: <Info className="w-5 h-5" />, label: "ABOUT", path: "/about" },
    { icon: <Sofa className="w-5 h-5" />, label: "INTERIOR", path: "/interior" },
    { icon: <Mail className="w-5 h-5" />, label: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4">
      <div
        className={`max-w-7xl mx-auto rounded-3xl bg-white/95 backdrop-blur-md ring-1 ring-gray-900/[0.06] transition-shadow duration-300 ${
          scrolled ? "shadow-xl" : "shadow-lg"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 h-[60px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.img
              src={Logo}
              alt="Tarvya Infra Logo"
              className="h-10 w-10 rounded-xl object-cover ring-1 ring-brand-800/10"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <div className="leading-none">
              <div className="font-display font-extrabold text-[15px] text-gray-900 tracking-tight">
                TARVYA INFRA
              </div>
              <span className="block text-[9px] text-gray-400 font-bold tracking-[0.22em] uppercase mt-1">
                Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                    active ? "text-brand-700" : "text-gray-600 hover:text-brand-700"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-brand-600"
                    />
                  )}
                </Link>
              );
            })}

            {/* Properties dropdown */}
            <div className="relative" ref={propertiesRef}>
              <button
                onClick={toggleProperties}
                className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                  propertiesOpen ? "text-brand-700" : "text-gray-600 hover:text-brand-700"
                }`}
              >
                <span>PROPERTIES</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${propertiesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {propertiesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-elevated ring-1 ring-gray-900/5 w-60 overflow-hidden p-1.5"
                  >
                    {propertyTypes.map((type) => (
                      <button
                        key={type.path}
                        onClick={() => handlePropertyClick(type.path)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                      >
                        <span className="text-brand-600">{type.icon}</span>
                        <span className="font-medium text-sm">{type.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA / mobile toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:+918929356475"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-700 text-white px-5 py-2.5 text-sm font-bold shadow-md shadow-brand-700/25 hover:bg-brand-800 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 animate-zoom" />
              +91 8929356475
            </a>

            <button
              onClick={toggleMenu}
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-gray-100"
            >
              <nav className="p-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors ${
                      location.pathname === link.path ? "bg-brand-50 text-brand-700" : ""
                    }`}
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}

                <div className="mt-1 border-t border-gray-100 pt-1">
                  <button
                    onClick={toggleProperties}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5" />
                      <span className="font-medium">PROPERTIES</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${propertiesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {propertiesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {propertyTypes.map((type) => (
                          <button
                            key={type.path}
                            onClick={() => handlePropertyClick(type.path)}
                            className="w-full flex items-center gap-3 pl-10 pr-4 py-3 rounded-xl text-gray-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                          >
                            <span className="text-brand-600">{type.icon}</span>
                            <span>{type.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href="tel:+918929356475"
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-700 text-white px-5 py-3 text-sm font-bold"
                >
                  <PhoneCall className="w-4 h-4" />
                  +91 8929356475
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;

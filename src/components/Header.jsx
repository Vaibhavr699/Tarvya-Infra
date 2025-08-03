import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png"; // Update path if needed
import { 
  Menu, 
  X, 
  PhoneCall, 
  ChevronDown, 
  Building2,
  ShoppingBag,
  Factory,
  Home,
  Info,
  Mail,
  Sofa
} from "lucide-react";
import "./Header.css"; // Custom CSS for animation

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const propertiesRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (propertiesRef.current && !propertiesRef.current.contains(event.target)) {
        setPropertiesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu and scroll to top when route changes
  useEffect(() => {
    setMenuOpen(false);
    setPropertiesOpen(false);
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProperties = () => setPropertiesOpen(!propertiesOpen);

  const handlePropertyClick = (path) => {
    setPropertiesOpen(false);
    setMenuOpen(false);
    
    // Navigate to the property list page with the specific type
    navigate(path);
  };

  const propertyTypes = [
    { icon: <Building2 className="w-5 h-5" />, label: "Office Spaces", path: "/properties/office" },
    { icon: <ShoppingBag className="w-5 h-5" />, label: "Retail Properties", path: "/properties/retail" },
    
  ];

  const navLinks = [
    { icon: <Home className="w-5 h-5" />, label: "HOME", path: "/" },
    { icon: <Info className="w-5 h-5" />, label: "ABOUT US", path: "/about" },
    { icon: <Sofa className="w-5 h-5" />, label: "INTERIOR WORK", path: "/interior" },
    { icon: <Mail className="w-5 h-5" />, label: "CONTACT US", path: "/contact" }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-lg py-2" 
          : "bg-gray-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and Site Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.img
              src={Logo}
              alt="Logo"
              className="h-12 w-12 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <div className="text-[#1E3A8A] font-extrabold text-lg leading-tight group-hover:text-[#1E3A8A] transition-colors">
              TARVYA INFRA <br />
              <span className="text-xs text-gray-600 font-medium tracking-wide">
                PVT LTD
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 text-sm font-semibold tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? "text-[#1E3A8A]"
                    : "text-gray-700 hover:text-[#1E3A8A]"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Properties Dropdown */}
            <div className="relative" ref={propertiesRef}>
              <button
                onClick={toggleProperties}
                className={`flex items-center space-x-1 text-sm font-semibold tracking-wide transition-colors ${
                  propertiesOpen ? "text-[#1E3A8A]" : "text-gray-700 hover:text-[#1E3A8A]"
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>PROPERTIES</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    propertiesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {propertiesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 bg-white rounded-xl shadow-lg w-64 overflow-hidden"
                  >
                    {propertyTypes.map((type) => (
                      <button
                        key={type.path}
                        onClick={() => handlePropertyClick(type.path)}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#1E3A8A] transition-colors"
                      >
                        {type.icon}
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Call to Action */}
            <div className="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow whitespace-nowrap animate-phone-ring">
              <PhoneCall className="text-green-600 w-5 h-5 animate-zoom" />
              <a 
                href="tel:+918929356475"
                className="text-[#1E3A8A] font-bold text-base hover:text-[#1E3A8A] transition-colors whitespace-nowrap"
              >
                +91 8929356475
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-[#1E3A8A] transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <nav className="py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#1E3A8A] transition-colors ${
                      location.pathname === link.path ? "bg-gray-50 text-[#1E3A8A]" : ""
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}

                {/* Mobile Properties Menu */}
                <div className="border-t border-gray-100">
                  <button
                    onClick={toggleProperties}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#1E3A8A] transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5" />
                      <span>PROPERTIES</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        propertiesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {propertiesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-50"
                      >
                        {propertyTypes.map((type) => (
                          <button
                            key={type.path}
                            onClick={() => handlePropertyClick(type.path)}
                            className="w-full flex items-center space-x-3 px-8 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#1E3A8A] transition-colors"
                          >
                            {type.icon}
                            <span>{type.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Call to Action */}
                <div className="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 shadow mx-4 my-2 whitespace-nowrap animate-phone-ring">
                  <PhoneCall className="text-green-600 w-5 h-5 animate-zoom" />
                  <a 
                    href="tel:+918929356475"
                    className="text-[#1E3A8A] font-bold text-base hover:text-[#1E3A8A] transition-colors whitespace-nowrap"
                  >
                    +91 8929356475
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Extra Small Screen Call to Action */}
        {/* <div className="sm:hidden flex justify-end mt-2 px-4">
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
            <PhoneCall className="text-green-600 w-5 h-5" />
            <div className="text-xs text-gray-800">
              <a 
                href="tel:+918929356475"
                className="text-[#1E3A8A] font-bold hover:text-[#1E3A8A] transition-colors"
              >
                +91 8929356475
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Header;

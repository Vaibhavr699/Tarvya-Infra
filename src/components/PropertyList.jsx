import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Building2, ShoppingBag, Factory, Star } from "lucide-react";
import { motion } from "framer-motion";
import { properties } from '../data/properties';

// Import all images from assets
import img1 from '../assets/wave-one.jpg';
import img2 from '../assets/ithum.jpg';
import img3 from '../assets/corenthum.jpg';
import img5 from '../assets/atsb.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';

const getItemsPerPage = () => {
  if (window.innerWidth < 768) return 1; // small screens
  return 4; // medium and large screens
};

const PropertyList = ({ type }) => {
  const [index, setIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setIndex(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProperties = type 
    ? properties.filter(property => property.type === type)
    : properties;

  const getPropertyIcon = (type) => {
    switch (type) {
      case 'office':
        return <Building2 className="w-8 h-8 text-[#1E3A8A]" />;
      case 'retail':
        return <ShoppingBag className="w-8 h-8 text-[#1E3A8A]" />;
      case 'industrial':
        return <Factory className="w-8 h-8 text-[#1E3A8A]" />;
      default:
        return <Building2 className="w-8 h-8 text-[#1E3A8A]" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'office':
        return 'Office Spaces';
      case 'retail':
        return 'Retail Properties';
      case 'industrial':
        return 'Industrial Units';
      default:
        return 'All Properties';
    }
  };

  const nextSlide = () => {
    if (index + itemsPerPage < filteredProperties.length) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section id="property-list" className="bg-gradient-to-b from-gray-50 to-gray-100 w-full pt-20 md:pt-24 pb-10 px-2 sm:px-4 md:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-poppins text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            {getTitle()} <span className="text-[#1E3A8A] relative inline-block">
              Available
              <div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-[#1E3A8A]"
              ></div>
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            {getPropertyIcon(type)}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-roboto text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover premium commercial properties designed to fuel your business growth. 
            Find the perfect space that matches your requirements and budget.
          </motion.p>
          
          {/* Contact Us Button - Show when not filtered */}
          {!type && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors duration-300 font-medium"
              >
                Contact Us for Inquiries
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          )}
          
          {/* View All Properties Button - Only show when filtered */}
          {type && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 flex justify-center space-x-4"
            >
              <Link
                to="/properties"
                className="inline-flex items-center px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors duration-300 font-medium"
              >
                View All Properties
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 font-medium"
              >
                Contact Us
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Property Cards */}
        <div className="relative overflow-hidden mt-2">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * (100 / itemsPerPage)}%)` }}
          >
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`px-2 ${itemsPerPage === 1 ? 'min-w-full' : 'min-w-[25%]'}`}
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300
                  transform hover:-translate-y-1 border border-gray-100 h-[450px] flex flex-col">
                  {/* Image Container with Fixed Height and Proper Aspect Ratio */}
                  <div className="relative h-52 flex-shrink-0 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=Property+Image';
                      }}
                    />
                    {property.isNew && (
                      <span className="absolute top-3 left-3 bg-[#1E3A8A] text-white text-sm font-semibold px-3 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    {property.featured && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                    {property.isNew && !property.featured && (
                      <span className="absolute top-3 left-3 bg-[#1E3A8A] text-white text-sm font-semibold px-3 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    
                    {/* Rating Display */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{property.rating}</span>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="flex justify-between text-white text-sm">
                        <span>☆</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      
                      <h4 className="font-semibold text-gray-800 line-clamp-2 mb-2">{property.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-1 mb-4">
                        {property.location}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {property.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-[#1E3A8A]">📐</span>
                        <span>{property.area}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#1E3A8A]">🚗</span>
                        <span>{property.parkings}</span>
                      </div>
                    </div>
                  </div>

                  {/* Link overlay */}
                  <Link 
                    to={`/property/${property.id}`} 
                    className="absolute inset-0 z-10"
                    aria-label={`View details for ${property.title}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 shadow-lg hover:bg-[#1E3A8A] hover:text-white transition-all duration-300 rounded-full p-3 backdrop-blur-md border border-gray-200 z-20 ${
              index === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={index === 0}
            aria-label="Previous properties"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 shadow-lg hover:bg-[#1E3A8A] hover:text-white transition-all duration-300 rounded-full p-3 backdrop-blur-md border border-gray-200 z-20 ${
              index + itemsPerPage >= filteredProperties.length ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={index + itemsPerPage >= filteredProperties.length}
            aria-label="Next properties"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyList;

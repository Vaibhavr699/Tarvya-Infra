import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PropertySection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 w-full py-20 px-4 md:px-10 lg:px-24">
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
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            Commercial <span className="text-[#1E3A8A] relative inline-block">
              Properties
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-[#1E3A8A]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-roboto text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From premium office spaces to strategic retail locations, we provide expert guidance 
            and tailored solutions to help your business thrive in the perfect commercial space.
          </motion.p>
        </motion.div>

        {/* Property Categories with Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Office Spaces",
              description: "Premium office locations for businesses of all sizes"
            },
            {
              title: "Retail Properties",
              description: "Strategic retail locations for maximum visibility"
            },
            {
              title: "Industrial Units",
              description: "Modern industrial spaces for manufacturing"
            }
          ].map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300
                transform hover:-translate-y-1 border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800 text-center">{category.title}</h3>
              <p className="text-gray-600 text-center">{category.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/properties"
              className="inline-flex items-center px-8 py-4 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors duration-300 font-semibold text-lg"
            >
              View All Properties
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-[#1E3A8A] rounded-lg border-2 border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-colors duration-300 font-semibold text-lg"
            >
              Get Expert Advice
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertySection;

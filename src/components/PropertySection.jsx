import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ShoppingBag, Factory } from 'lucide-react';

const categories = [
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Office Spaces",
    description: "Premium office locations for businesses of all sizes",
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "Retail Properties",
    description: "Strategic retail locations for maximum visibility",
  },
  {
    icon: <Factory className="w-6 h-6" />,
    title: "Industrial Units",
    description: "Modern industrial spaces for manufacturing",
  },
];

const PropertySection = () => {
  return (
    <section className="bg-white w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="eyebrow mb-4">What We Offer</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 text-gray-900">
            Commercial <span className="accent-underline text-brand-800">Properties</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From premium office spaces to strategic retail locations, we provide expert guidance
            and tailored solutions to help your business thrive in the perfect commercial space.
          </p>
        </motion.div>

        {/* Property Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card card-hover group p-8 text-center"
            >
              <div className="icon-chip mx-auto mb-5 group-hover:bg-brand-800 group-hover:text-white">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{category.title}</h3>
              <p className="text-gray-500 leading-relaxed">{category.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link to="/properties" className="btn-primary">
            View All Properties
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/contact" className="btn-outline">
            Get Expert Advice
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertySection;

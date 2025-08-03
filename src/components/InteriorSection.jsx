import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sofa, Bed, Table, Armchair } from 'lucide-react';

const InteriorSection = () => {
  const services = [
    {
      icon: <Sofa className="w-8 h-8" />,
      title: "Living Room Design",
      description: "Transform your living space with custom furniture"
    },
    {
      icon: <Bed className="w-8 h-8" />,
      title: "Bedroom Solutions",
      description: "Create your perfect sanctuary with our collection"
    },
    {
      icon: <Table className="w-8 h-8" />,
      title: "Dining & Kitchen",
      description: "Functional and stylish dining solutions"
    },
    {
      icon: <Armchair className="w-8 h-8" />,
      title: "Office Furniture",
      description: "Professional workspace solutions"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-red-50 to-red-100 w-full py-20 px-4 md:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
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
            Interior Design & <span className="text-red-800 relative inline-block">
              Furniture
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-red-800"
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
            className="font-roboto text-lg md:text-xl text-red-700 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your space with our premium interior design services and custom furniture solutions. 
            From concept to completion, we bring your vision to life.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300
                transform hover:-translate-y-1 border border-red-100 text-center"
            >
              <div className="text-red-600 mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-3 text-red-900">{service.title}</h3>
              <p className="text-red-700 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/interior"
              className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 font-semibold text-lg"
            >
              Explore Interior Services
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 font-semibold text-lg"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteriorSection; 
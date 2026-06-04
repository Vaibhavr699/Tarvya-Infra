import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sofa, Bed, Table, Armchair } from 'lucide-react';

const InteriorSection = () => {
  const services = [
    {
      icon: <Sofa className="w-7 h-7" />,
      title: "Living Room Design",
      description: "Transform your living space with custom furniture",
    },
    {
      icon: <Bed className="w-7 h-7" />,
      title: "Bedroom Solutions",
      description: "Create your perfect sanctuary with our collection",
    },
    {
      icon: <Table className="w-7 h-7" />,
      title: "Dining & Kitchen",
      description: "Functional and stylish dining solutions",
    },
    {
      icon: <Armchair className="w-7 h-7" />,
      title: "Office Furniture",
      description: "Professional workspace solutions",
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accent-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="eyebrow-accent mb-4">Interiors & Furniture</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 text-gray-900">
            Interior Design &{" "}
            <span className="relative inline-block text-accent-600">
              Furniture
              <span className="absolute -bottom-1.5 left-0 h-[3px] w-full rounded-full bg-accent-500/80" />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your space with our premium interior design services and custom furniture
            solutions. From concept to completion, we bring your vision to life.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-14">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card card-hover group p-6 text-center"
            >
              <div className="icon-chip-accent mx-auto mb-5 group-hover:bg-accent-600 group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link to="/interior" className="btn-accent">
            Explore Interior Services
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/contact" className="btn-accent-outline">
            Get Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InteriorSection;

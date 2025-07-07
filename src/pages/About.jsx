import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Award, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Aniket from '../assets/Aniket.jpg';
import Vaibhav from '../assets/Vaibhav.jpg';
import Ankit from '../assets/Ankit.jpg';

const About = () => {
  const stats = [
    { number: "5+", label: "Years Experience", icon: <Award className="w-6 h-6" /> },
    { number: "300+", label: "Properties Sold", icon: <Building2 className="w-6 h-6" /> },
    { number: "300+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Tarvya Infra</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your trusted partner in premium commercial real estate solutions, delivering excellence through innovation and integrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-[#1E3A8A] mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                To provide exceptional commercial real estate solutions that empower businesses 
                to thrive and grow. We are committed to delivering transparent, reliable, and 
                innovative property services that exceed client expectations.
              </p>
              <Link
                to="/properties"
                className="inline-block px-6 py-3 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:bg-[#1E3A8A] transition-colors"
              >
                Explore Our Properties
              </Link>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                To be the leading commercial real estate partner, recognized for our integrity, 
                innovation, and commitment to client success. We envision a future where every 
                business has access to the perfect commercial space to achieve their goals.
              </p>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:bg-[#1E3A8A] transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals who drive our success and ensure 
              exceptional service delivery to our clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ankit Ojha",
                position: "PR and Marketing Head",
                description: "5+ years of experience in real estate development",
                image: Ankit
              },
              {
                name: "Aniket Ojha",
                position: "Managing Director",
                description: "Expert in commercial property management",
                image: Aniket
              },
              {
                name: "Vaibhav Raj",
                position: "Business Development",
                description: "Specialist in strategic property investments",
                image: Vaibhav
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-gray-600">{member.name.charAt(0)}</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <div className="text-[#1E3A8A] mb-2">{member.position}</div>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1E3A8A] to-[#1E3A8A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Space?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us help you discover the ideal commercial property for your business needs.
            </p>
            <Link
              to="/inquire"
              className="inline-block px-8 py-4 bg-white text-[#1E3A8A] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 
import { motion } from "framer-motion";
import WelcomeImage from "../assets/wlcm-comp.jpg";
import { Building2, Award, Clock, Shield, Sofa } from "lucide-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Premium Properties",
      description: "Exclusive commercial spaces in prime locations",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expert Guidance",
      description: "Professional real estate consultation",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Timely Delivery",
      description: "Commitment to project timelines",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trusted Partner",
      description: "Reliable and transparent service",
    },
    {
      icon: <Sofa className="w-6 h-6" />,
      title: "Interior Design",
      description: "Custom furniture and interior solutions",
    },
  ];

  return (
    <section className="relative min-h-[80vh] bg-gray-100 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${WelcomeImage})`,
          opacity: 0.1,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-32">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-left space-y-8"
          >
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#1E3A8A] font-semibold text-lg tracking-wider uppercase"
              >
                Welcome to Excellence
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800"
              >
                Your Trusted Partner in{" "}
                <span className="text-[#1E3A8A]">Commercial Real Estate</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="font-roboto text-lg text-gray-600 leading-relaxed">
                Tarvya Infra offers prime commercial spaces designed to fuel your
                business growth with transparency and timely delivery.
              </p>
              <p className="font-roboto text-lg text-gray-600 leading-relaxed">
                Discover trusted office, retail, and industrial properties
                tailored to your goals — unlocking your next commercial
                investment with confidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/properties"
                className="px-8 py-3 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:bg-[#1E3A8A] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Properties
              </Link>
              <Link
                to="/interior"
                className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Interior Work
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-[#1E3A8A] rounded-lg font-semibold border-2 border-[#1E3A8A] hover:bg-[#1E3A8A] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="text-[#1E3A8A] mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[#1E3A8A]">1000+</div>
            <div className="text-gray-600">Properties Listed</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[#1E3A8A]">500+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[#1E3A8A]">5+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[#1E3A8A]">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Welcome;

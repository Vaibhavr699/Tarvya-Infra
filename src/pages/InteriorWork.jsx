import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sofa, 
  Bed, 
  Table, 
  Armchair, 
  Lamp, 
  Palette, 
  Ruler, 
  Users,
  Star,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const InteriorWork = () => {
  const services = [
    {
      icon: <Sofa className="w-8 h-8" />,
      title: "Living Room Design",
      description: "Transform your living space with custom furniture and elegant designs",
      features: ["Custom Sofa Sets", "TV Units", "Coffee Tables", "Accent Chairs"]
    },
    {
      icon: <Bed className="w-8 h-8" />,
      title: "Bedroom Solutions",
      description: "Create your perfect sanctuary with our bedroom furniture collection",
      features: ["Bed Frames", "Wardrobes", "Dressers", "Nightstands"]
    },
    {
      icon: <Table className="w-8 h-8" />,
      title: "Dining & Kitchen",
      description: "Functional and stylish dining solutions for your home",
      features: ["Dining Tables", "Kitchen Cabinets", "Bar Stools", "Storage Units"]
    },
    {
      icon: <Armchair className="w-8 h-8" />,
      title: "Office Furniture",
      description: "Professional workspace solutions for productivity and comfort",
      features: ["Office Desks", "Ergonomic Chairs", "Storage Cabinets", "Conference Tables"]
    }
  ];

  const projects = [
    {
      title: "Modern Apartment Interior",
      location: "Sector 62, Noida",
      area: "1200 sq ft",
      duration: "45 days",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"
    },
    {
      title: "Luxury Villa Design",
      location: "Sector 140, Noida",
      area: "3500 sq ft",
      duration: "90 days",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500"
    },
    {
      title: "Corporate Office Interior",
      location: "Sector 18, Noida",
      area: "5000 sq ft",
      duration: "60 days",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Interior Design & 
              <span className="text-red-200"> Furniture</span>
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
              Transform your space with our premium interior design services and custom furniture solutions. 
              From concept to completion, we bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                Get Free Consultation
              </button>
              <button className="border border-red-300 hover:bg-red-800 px-8 py-3 rounded-lg font-semibold transition-colors">
                View Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-red-900 mb-4">Our Services</h2>
            <p className="text-lg text-red-700 max-w-2xl mx-auto">
              Comprehensive interior design and furniture solutions for every space
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-red-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">{service.title}</h3>
                <p className="text-red-700 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-red-600 flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-red-900 mb-4">Recent Projects</h2>
            <p className="text-lg text-red-700 max-w-2xl mx-auto">
              Explore our latest interior design projects and furniture installations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-red-200 relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {project.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-red-900 mb-2">{project.title}</h3>
                  <div className="space-y-2 text-sm text-red-700">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Ruler className="w-4 h-4 mr-2" />
                      {project.area}
                    </div>
                  </div>
                  <button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-red-900 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Tarvya Interior?</h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              We combine creativity with functionality to deliver exceptional interior solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
              <p className="text-red-100">
                Our experienced designers and craftsmen ensure quality and attention to detail
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Design</h3>
              <p className="text-red-100">
                Personalized solutions tailored to your style, space, and requirements
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
              <p className="text-red-100">
                Premium materials and craftsmanship guaranteed for lasting beauty
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-red-900 mb-4">Ready to Transform Your Space?</h2>
            <p className="text-lg text-red-700 max-w-2xl mx-auto">
              Get in touch with our interior design experts for a free consultation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-red-50 rounded-xl p-8"
            >
              <h3 className="text-2xl font-semibold text-red-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-red-700">+91 8929356475</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-red-700">interior@tarvya.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-red-700">Noida, Uttar Pradesh, India</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-red-50 rounded-xl p-8"
            >
                             <h3 className="text-2xl font-semibold text-red-900 mb-6">Quick Contact Form</h3>
                               <form 
                  action="https://formspree.io/f/2795633490048057258" 
                  method="POST"
                  className="space-y-4"
                >
                 <input
                   type="text"
                   name="name"
                   placeholder="Your Name"
                   className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:border-red-500"
                   required
                 />
                 <input
                   type="email"
                   name="email"
                   placeholder="Your Email"
                   className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:border-red-500"
                   required
                 />
                 <select
                   name="project_type"
                   className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:border-red-500"
                 >
                   <option value="">Select Project Type</option>
                   <option value="Living Room Design">Living Room Design</option>
                   <option value="Bedroom Solutions">Bedroom Solutions</option>
                   <option value="Dining & Kitchen">Dining & Kitchen</option>
                   <option value="Office Furniture">Office Furniture</option>
                 </select>
                 <textarea
                   name="message"
                   placeholder="Tell us about your project"
                   rows="4"
                   className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:border-red-500"
                   required
                 ></textarea>
                 <button
                   type="submit"
                   className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
                 >
                   Send Message
                 </button>
               </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InteriorWork; 
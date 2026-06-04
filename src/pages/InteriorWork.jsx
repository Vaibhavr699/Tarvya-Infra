import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { sendFormData, formatInteriorInquiryData } from '../utils/formspree';
import {
  Sofa,
  Bed,
  Table,
  Armchair,
  Palette,
  Ruler,
  Users,
  Star,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

const InteriorWork = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData(e.target);
    const result = await sendFormData(
      formatInteriorInquiryData({
        name: fd.get("name"),
        email: fd.get("email"),
        projectType: fd.get("project_type"),
        message: fd.get("message"),
        botcheck: fd.get("botcheck"),
      })
    );
    if (result.success) {
      toast.success(result.message);
      e.target.reset();
    } else {
      toast.error(result.message);
    }
    setIsSubmitting(false);
  };

  const services = [
    {
      icon: <Sofa className="w-7 h-7" />,
      title: "Living Room Design",
      description: "Transform your living space with custom furniture and elegant designs",
      features: ["Custom Sofa Sets", "TV Units", "Coffee Tables", "Accent Chairs"],
    },
    {
      icon: <Bed className="w-7 h-7" />,
      title: "Bedroom Solutions",
      description: "Create your perfect sanctuary with our bedroom furniture collection",
      features: ["Bed Frames", "Wardrobes", "Dressers", "Nightstands"],
    },
    {
      icon: <Table className="w-7 h-7" />,
      title: "Dining & Kitchen",
      description: "Functional and stylish dining solutions for your home",
      features: ["Dining Tables", "Kitchen Cabinets", "Bar Stools", "Storage Units"],
    },
    {
      icon: <Armchair className="w-7 h-7" />,
      title: "Office Furniture",
      description: "Professional workspace solutions for productivity and comfort",
      features: ["Office Desks", "Ergonomic Chairs", "Storage Cabinets", "Conference Tables"],
    },
  ];

  const projects = [
    {
      title: "Modern Apartment Interior",
      location: "Sector 62, Noida",
      area: "1200 sq ft",
      duration: "45 days",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    },
    {
      title: "Luxury Villa Design",
      location: "Sector 140, Noida",
      area: "3500 sq ft",
      duration: "90 days",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500",
    },
    {
      title: "Corporate Office Interior",
      location: "Sector 18, Noida",
      area: "5000 sq ft",
      duration: "60 days",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500",
    },
  ];

  const whyChoose = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Expert Team",
      description: "Our experienced designers and craftsmen ensure quality and attention to detail",
    },
    {
      icon: <Palette className="w-7 h-7" />,
      title: "Custom Design",
      description: "Personalized solutions tailored to your style, space, and requirements",
    },
    {
      icon: <Star className="w-7 h-7" />,
      title: "Quality Assurance",
      description: "Premium materials and craftsmanship guaranteed for lasting beauty",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 bg-accent-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(255,255,255,0.14),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent-100 mb-4">
              Tarvya Interior
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Interior Design & <span className="text-accent-100">Furniture</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Transform your space with our premium interior design services and custom furniture
              solutions. From concept to completion, we bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3 font-semibold text-accent-700 shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-50"
              >
                Get Free Consultation
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                View Portfolio
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-accent-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="eyebrow-accent mb-4">What We Do</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive interior design and furniture solutions for every space
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card card-hover group p-6"
              >
                <div className="icon-chip-accent mb-5 group-hover:bg-accent-600 group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-2.5 flex-shrink-0" />
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
      <section id="projects" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="eyebrow-accent mb-4">Portfolio</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">Recent Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                className="card card-hover group overflow-hidden"
              >
                <div className="h-52 bg-accent-100 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-accent-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm">
                    {project.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-accent-600" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Ruler className="w-4 h-4 mr-2 text-accent-600" />
                      {project.area}
                    </div>
                  </div>
                  <button className="btn-accent w-full mt-5 text-sm py-2.5">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-accent-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Why Choose Tarvya Interior?</h2>
            <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto">
              We combine creativity with functionality to deliver exceptional interior solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChoose.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white/10 ring-1 ring-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 backdrop-blur-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/85">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="eyebrow-accent mb-4">Let's Talk</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with our interior design experts for a free consultation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="icon-chip-accent h-11 w-11">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-gray-700">+91 8929356475</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="icon-chip-accent h-11 w-11">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-gray-700">interior@tarvya.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="icon-chip-accent h-11 w-11">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-gray-700">Noida, Uttar Pradesh, India</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Quick Contact Form</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Your Name" className="field" required />
                <input type="email" name="email" placeholder="Your Email" className="field" required />
                <select name="project_type" className="field">
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
                  className="field resize-none"
                  required
                ></textarea>
                {/* Honeypot anti-spam field — hidden from users */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex="-1"
                  autoComplete="off"
                />
                <button type="submit" disabled={isSubmitting} className="btn-accent w-full">
                  {isSubmitting ? "Sending..." : "Send Message"}
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

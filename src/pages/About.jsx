import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2, Award, Users,
  ShieldCheck, Eye, Handshake, Sparkles,
  MessageSquare, Search, MapPin, FileSignature, KeyRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Aniket from '../assets/Aniket.jpg';
import Vaibhav from '../assets/Vaibhav.jpg';
import Ankit from '../assets/Ankit.jpg';
import aboutBg from '../assets/building bg1.png';
import storyImg from '../assets/Assotech.jpg';

const About = () => {
  const stats = [
    { number: "5+", label: "Years Experience", icon: <Award className="w-6 h-6" /> },
    { number: "300+", label: "Properties Sold", icon: <Building2 className="w-6 h-6" /> },
    { number: "300+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> }
  ];

  const coreValues = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Integrity",
      description: "Honest advice you can rely on — even when it means telling you to wait.",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Transparency",
      description: "Clear pricing, verified listings, and no hidden surprises along the way.",
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      title: "Client-First",
      description: "Your goals lead every recommendation and every negotiation we make.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Excellence",
      description: "Grade-A properties and meticulous attention to every detail.",
    },
  ];

  const processSteps = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Consultation",
      description: "We start by understanding your business, budget, and space requirements.",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Curated Shortlist",
      description: "We hand-pick verified options that genuinely fit your needs.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Site Visits",
      description: "Tour the spaces that matter, scheduled around your calendar.",
    },
    {
      icon: <FileSignature className="w-6 h-6" />,
      title: "Negotiation & Paperwork",
      description: "We negotiate the best terms and manage all the documentation.",
    },
    {
      icon: <KeyRound className="w-6 h-6" />,
      title: "Handover",
      description: "Move in smoothly, with every detail in order and ready to go.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 bg-brand-950 text-white overflow-hidden">
        {/* Building wireframe background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutBg})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/75 to-brand-950/90"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-brand-200 mb-4">
              Who We Are
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">About Tarvya Infra</h1>
            <p className="text-lg md:text-xl text-brand-100 max-w-3xl mx-auto">
              Your trusted partner in premium commercial real estate solutions, delivering excellence through innovation and integrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-14 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 text-center"
              >
                <div className="icon-chip mx-auto mb-4">{stat.icon}</div>
                <div className="font-display text-4xl font-bold mb-1 text-gray-900">{stat.number}</div>
                <div className="text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-brand-50" />
              <img
                src={storyImg}
                alt="Tarvya Infra commercial project in Noida"
                className="w-full h-[300px] sm:h-[420px] object-cover rounded-3xl shadow-elevated ring-1 ring-gray-900/5"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="eyebrow mb-4">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                A local partner built on honesty and deep market insight
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Tarvya Infra Pvt Ltd was founded on a simple belief — that finding the
                  right commercial space shouldn't be confusing, opaque, or stressful.
                  Headquartered in Noida, we set out to be an honest, expert partner for
                  businesses seeking office, retail, and industrial space across Delhi NCR.
                </p>
                <p>
                  Over the years we've built close relationships with the region's leading
                  developers and an intimate understanding of its micro-markets — from the
                  Noida Expressway corridor to the established hubs of Sectors 62, 94, and
                  132. That local insight lets us match every client with space that fits
                  their budget, growth plans, and brand.
                </p>
                <p>
                  From the first conversation to the final handover, our team manages site
                  visits, negotiations, and documentation end to end — so you can stay
                  focused on your business while we handle the property.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
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
              <Link to="/properties" className="btn-primary">
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
              <Link to="/contact" className="btn-primary">
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="eyebrow mb-4">What We Stand For</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              Values that guide every deal
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="card card-hover group p-7"
              >
                <div className="icon-chip mb-5 group-hover:bg-brand-700 group-hover:text-white">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="eyebrow mb-4">Our Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              A clear path from search to handover
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white ring-1 ring-gray-900/5 shadow-sm p-6"
              >
                <span className="font-display text-5xl font-extrabold text-brand-100 leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="icon-chip mt-3 mb-4">{step.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
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
                className="card card-hover p-8 text-center"
              >
                <div className="w-36 h-36 bg-gray-100 rounded-full mx-auto mb-5 flex items-center justify-center overflow-hidden ring-4 ring-brand-50">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-gray-600">{member.name.charAt(0)}</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <div className="text-brand-800 mb-2">{member.position}</div>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 
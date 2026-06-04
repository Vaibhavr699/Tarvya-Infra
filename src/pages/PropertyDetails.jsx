import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Building2,
  ArrowLeft,
  Star,
  CheckCircle2,
  Car,
  Train,
  Plane,
  ParkingCircle,
  Maximize2,
  Layers,
  Award,
} from 'lucide-react';
import { featuredProperties } from '../components/FeaturedProperties';
import { properties } from '../data/properties';

const PropertyDetails = () => {
  const { id } = useParams();
  let property = properties.find((p) => p.id === id);
  if (!property) {
    property = featuredProperties.find((p) => p.id === id);
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="card max-w-md w-full p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Property Not Found</h2>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/properties" className="btn-primary">
            Browse Properties
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const overview = [
    { icon: <Maximize2 className="w-5 h-5" />, label: "Total Area", value: property.details.totalBuiltUpArea },
    { icon: <Layers className="w-5 h-5" />, label: "Floor Plate", value: property.details.typicalFloorPlate },
    { icon: <Building2 className="w-5 h-5" />, label: "Total Floors", value: property.details.totalFloors },
    { icon: <Award className="w-5 h-5" />, label: "Certification", value: property.details.certification },
  ];

  const connectivity = [
    { icon: <Plane className="w-5 h-5" />, label: "Nearest Airport", value: property.details.nearestAirport },
    { icon: <Train className="w-5 h-5" />, label: "Nearest Metro", value: property.details.nearestMetro },
    { icon: <Car className="w-5 h-5" />, label: "Landmark", value: property.details.landmark },
    { icon: <ParkingCircle className="w-5 h-5" />, label: "Parking", value: property.details.parking },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero */}
      <div className="relative h-[58vh] min-h-[460px]">
        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/55 to-brand-950/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
            <motion.div variants={itemVariants} className="text-white">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Properties
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-white/25 backdrop-blur-sm capitalize">
                  {property.type}
                </span>
                {property.rating && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold ring-1 ring-white/25 backdrop-blur-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {property.rating}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
                {property.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/85">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {property.location}
                </span>
                {property.price && (
                  <span className="text-lg font-bold text-white">{property.price}</span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="card p-7 md:p-8">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Property Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{property.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {overview.map((o) => (
                  <div key={o.label} className="rounded-2xl bg-gray-50 ring-1 ring-gray-900/5 p-4">
                    <div className="icon-chip h-10 w-10 mb-3">{o.icon}</div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{o.label}</p>
                    <p className="text-base font-bold text-gray-900 mt-0.5">{o.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Units */}
            <div className="card p-7 md:p-8">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Available Units</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {property.units.map((unit, index) => (
                  <div key={index} className="rounded-2xl bg-gray-50 ring-1 ring-gray-900/5 p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{unit.area}</h3>
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-5">Capacity: {unit.seats} seats</p>
                    <Link
                      to="/contact"
                      className="block w-full bg-brand-800 text-white py-2.5 rounded-xl font-semibold hover:bg-brand-900 transition-colors text-center"
                    >
                      Inquire Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Connectivity */}
            <div className="card p-7 md:p-8">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Location & Connectivity</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {connectivity.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="icon-chip h-11 w-11 shrink-0">{c.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-0.5">{c.label}</h3>
                      <p className="text-gray-600 text-sm">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="card p-7 md:p-8 sticky top-24">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-1 gap-3.5">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-700 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Interested in this property?</h3>
                <Link to="/contact" className="btn-primary w-full mb-3">
                  Schedule a Visit
                </Link>
                <Link to="/contact" className="btn-outline w-full">
                  Contact Agent
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;

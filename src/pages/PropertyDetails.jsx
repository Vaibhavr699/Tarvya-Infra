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
  Wifi,
  Shield,
  Coffee,
  Users,
  Power,
  ParkingCircle
} from 'lucide-react';
import { featuredProperties } from '../components/FeaturedProperties';
import { properties } from '../data/properties';

// Import PropertyList properties
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import abc from '../assets/abc.png';
import max from '../assets/max.png';
import supernova from '../assets/supernova.png';
import urbtech from '../assets/urbtech.png';
import bhutani from '../assets/bhutani.png';
import ats from '../assets/ats.png';
import advant from '../assets/advant.png';
import vivo1 from '../assets/vivo1.png';

const PropertyDetails = () => {
  const { id } = useParams();
  let property = properties.find(p => p.id === id);
  if (!property) {
    property = featuredProperties.find(p => p.id === id);
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <Link to="/" className="text-[#1E3A8A] hover:text-[#1E3A8A]">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px]">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 pb-16">
            <motion.div variants={itemVariants} className="text-white">
              <Link 
                to="/"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{property.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <span>{property.type}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{property.rating}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{property.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Total Area</h3>
                  <p className="text-lg font-bold text-gray-900">{property.details.totalBuiltUpArea}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Floor Plate</h3>
                  <p className="text-lg font-bold text-gray-900">{property.details.typicalFloorPlate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Total Floors</h3>
                  <p className="text-lg font-bold text-gray-900">{property.details.totalFloors}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Certification</h3>
                  <p className="text-lg font-bold text-gray-900">{property.details.certification}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Units</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.units.map((unit, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{unit.area}</h3>
                      <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">Capacity: {unit.seats} seats</p>
                    <Link 
                      to="/contact"
                      className="block w-full bg-[#1E3A8A] text-white py-2 rounded-lg hover:bg-[#1E3A8A] transition-colors text-center"
                    >
                      Inquire Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Connectivity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <Plane className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Nearest Airport</h3>
                    <p className="text-gray-600">{property.details.nearestAirport}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Train className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Nearest Metro</h3>
                    <p className="text-gray-600">{property.details.nearestMetro}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Car className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Landmark</h3>
                    <p className="text-gray-600">{property.details.landmark}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ParkingCircle className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Parking</h3>
                    <p className="text-gray-600">{property.details.parking}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-1 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested in this property?</h3>
                <Link 
                  to="/contact"
                  className="block w-full bg-[#1E3A8A] text-white py-3 rounded-lg hover:bg-[#1E3A8A] transition-colors mb-4 text-center"
                >
                  Schedule a Visit
                </Link>
                <Link 
                  to="/contact"
                  className="block w-full bg-white border-2 border-[#1E3A8A] text-[#1E3A8A] py-3 rounded-lg hover:bg-[#1E3A8A] hover:text-white transition-colors text-center"
                >
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
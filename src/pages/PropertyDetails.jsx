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

// PropertyList properties data
const propertyListProperties = [
  {
    id: 'commercial-office-sector-18',
    image: img1,
    price: "₹ 20,00,00,000",
    title: "Commercial Office Space in Sector 18, Noida",
    location: "Sector 18, Noida, Uttar Pradesh, India",
    area: "5,000 sq ft",
    parkings: 10,
    isNew: true,
    imagesCount: 8,
    type: "Office Building",
    description: "Premium office space in the heart of Sector 18 with modern amenities, 24/7 security, and excellent connectivity to major business hubs.",
    details: {
      totalBuiltUpArea: '5,00,000 sq.ft',
      typicalFloorPlate: '25,000 sq.ft',
      totalFloors: '8',
      parking: '2 Level Basement',
      certification: 'Gold Certified',
      nearestAirport: 'IGI Delhi',
      nearestMetro: 'Sector 18 Metro Station',
      landmark: 'Near City Center'
    },
    units: [
      { area: '25000 sq.ft', seats: '250' },
      { area: '15000 sq.ft', seats: '150' }
    ],
    amenities: [
      'Power Back Up',
      'Air Conditioned',
      'Lift',
      'Reserved Parking',
      'Internet / Wi-Fi',
      '24x7 Security',
      'Cafeteria',
      'Conference Room'
    ],
    rating: 4.6,
    featured: false
  },
  {
    id: 'retail-space-sector-63',
    image: img2,
    price: "₹ 35,00,00,000",
    title: "Retail Space in Sector 63, Noida",
    location: "Sector 63, Noida, Uttar Pradesh, India",
    area: "8,000 sq ft",
    parkings: 20,
    isNew: false,
    imagesCount: 12,
    type: "Retail Building",
    description: "High-footfall retail space in a prime commercial area, perfect for retail brands, showrooms, and commercial establishments.",
    details: {
      totalBuiltUpArea: '8,00,000 sq.ft',
      typicalFloorPlate: '40,000 sq.ft',
      totalFloors: '4',
      parking: '3 Level Basement',
      certification: 'Green Building',
      nearestAirport: 'IGI Delhi',
      nearestMetro: 'Sector 63 Metro Station',
      landmark: 'Near Mall'
    },
    units: [
      { area: '40000 sq.ft', seats: '400' },
      { area: '20000 sq.ft', seats: '200' }
    ],
    amenities: [
      'High Footfall Location',
      'Power Back Up',
      'Air Conditioned',
      'Lift',
      'Reserved Parking',
      'Internet / Wi-Fi',
      '24x7 Security',
      'Food Court'
    ],
    rating: 4.5,
    featured: false
  },
  {
    id: 'mixed-use-sector-62',
    image: img3,
    price: "₹ 50,00,00,000",
    title: "Mixed-Use Commercial Building in Sector 62, Noida",
    location: "Sector 62, Noida, Uttar Pradesh, India",
    area: "10,000 sq ft",
    parkings: 25,
    isNew: true,
    imagesCount: 15,
    type: "Industrial Building",
    description: "Versatile commercial space suitable for both office and retail use, featuring modern infrastructure and ample parking facilities.",
    details: {
      totalBuiltUpArea: '10,00,000 sq.ft',
      typicalFloorPlate: '50,000 sq.ft',
      totalFloors: '6',
      parking: '3 Level Basement',
      certification: 'LEED Gold',
      nearestAirport: 'IGI Delhi',
      nearestMetro: 'Sector 62 Metro Station',
      landmark: 'Near Industrial Zone'
    },
    units: [
      { area: '50000 sq.ft', seats: '500' },
      { area: '30000 sq.ft', seats: '300' }
    ],
    amenities: [
      'Mixed Use Zoning',
      'Power Back Up',
      'Air Conditioned',
      'Lift',
      'Reserved Parking',
      'Internet / Wi-Fi',
      '24x7 Security',
      'Cafeteria',
      'Conference Room'
    ],
    rating: 4.7,
    featured: true
  },
  {
    id: 'commercial-complex-sector-18',
    image: img4,
    price: "₹ 45,00,00,000",
    title: "Commercial Complex in Sector 18, Noida",
    location: "Sector 18, Noida, Uttar Pradesh, India",
    area: "7,500 sq ft",
    parkings: 15,
    isNew: true,
    imagesCount: 10,
    type: "Office Building",
    description: "State-of-the-art commercial complex with premium office spaces, meeting rooms, and world-class amenities for modern businesses.",
    details: {
      totalBuiltUpArea: '7,50,000 sq.ft',
      typicalFloorPlate: '35,000 sq.ft',
      totalFloors: '12',
      parking: '2 Level Basement',
      certification: 'Platinum Certified',
      nearestAirport: 'IGI Delhi',
      nearestMetro: 'Sector 18 Metro Station',
      landmark: 'Near Business District'
    },
    units: [
      { area: '35000 sq.ft', seats: '350' },
      { area: '25000 sq.ft', seats: '250' }
    ],
    amenities: [
      'Premium Office Spaces',
      'Power Back Up',
      'Air Conditioned',
      'Lift',
      'Reserved Parking',
      'Gym',
      'Internet / Wi-Fi',
      '24x7 Security',
      'Cafeteria',
      'Conference Room'
    ],
    rating: 4.8,
    featured: true
  },
  {
    id: 'office-space-sector-132',
    image: img5,
    price: "₹ 28,00,00,000",
    title: "Office Space in Sector 132, Noida",
    location: "Sector 132, Noida, Uttar Pradesh, India",
    area: "6,000 sq ft",
    parkings: 12,
    isNew: true,
    imagesCount: 9,
    type: "Office Building",
    description: "Contemporary office space in a prime location, offering flexible layouts and modern facilities for growing businesses.",
    details: {
      totalBuiltUpArea: '6,00,000 sq.ft',
      typicalFloorPlate: '30,000 sq.ft',
      totalFloors: '10',
      parking: '2 Level Basement',
      certification: 'Gold Certified',
      nearestAirport: 'IGI Delhi',
      nearestMetro: 'Sector 132 Metro Station',
      landmark: 'Near Expressway'
    },
    units: [
      { area: '30000 sq.ft', seats: '300' },
      { area: '20000 sq.ft', seats: '200' }
    ],
    amenities: [
      'Flexible Layouts',
      'Power Back Up',
      'Air Conditioned',
      'Lift',
      'Reserved Parking',
      'Internet / Wi-Fi',
      '24x7 Security',
      'Cafeteria',
      'Conference Room'
    ],
    rating: 4.6,
    featured: false
  },
  {
    id: 'retail-space-sector-140',
    image: img6,
    price: "₹ 40,00,00,000",
    title: "Retail Space in Sector 140, Noida",
    location: "Sector 140, Noida, Uttar Pradesh, India",
    area: "9,500 sq ft",
    parkings: 18,
    isNew: false,
    imagesCount: 14,
    type: "Retail Building",
    description: "Strategic retail location with high visibility, perfect for flagship stores, showrooms, and commercial establishments.",
    details: {
      totalBuiltUpArea: '9,50,000 sq.ft',
      typicalFloorPlate: '45,000 sq.ft',
      totalFloors: '5',
      parking: '3 Level Basement',
      certification: 'Green Building',
      nearestAirport: 'IGI Delhi',
      nearestMetro: 'Sector 140 Metro Station',
      landmark: 'Near Highway'
    },
    units: [
      { area: '45000 sq.ft', seats: '450' },
      { area: '25000 sq.ft', seats: '250' }
    ],
    amenities: [
      'High Visibility Location',
      'Power Back Up',
      'Air Conditioned',
      'Lift',
      'Reserved Parking',
      'Internet / Wi-Fi',
      '24x7 Security',
      'Food Court',
      'Parking'
    ],
    rating: 4.5,
    featured: false
  },
  {
    id: 'commercial-building-sector-150',
    image: img7,
    price: "₹ 60,00,00,000",
    title: "Commercial Building in Sector 150, Noida",
    location: "Sector 150, Noida, Uttar Pradesh, India",
    area: "15,000 sq ft",
    parkings: 30,
    isNew: true,
    imagesCount: 20,
    type: "Industrial Building",
    description: "Large-scale industrial space with modern facilities, heavy power backup, and excellent connectivity for manufacturing units.",
    details: {
      totalBuiltUpArea: '15,00,000 sq.ft',
      typicalFloorPlate: '75,000 sq.ft',
      totalFloors: '8',
      parking: '4 Level Basement',
      certification: 'LEED Platinum',
      nearestAirport: 'IGI Delhi',
      nearestMetro: 'Sector 150 Metro Station',
      landmark: 'Near Industrial Hub'
    },
    units: [
      { area: '75000 sq.ft', seats: '750' },
      { area: '50000 sq.ft', seats: '500' }
    ],
    amenities: [
      'Heavy Power Backup',
      'Industrial Facilities',
      'Air Conditioned',
      'Lift',
      'Reserved Parking',
      'Internet / Wi-Fi',
      '24x7 Security',
      'Cafeteria',
      'Conference Room',
      'Loading Dock'
    ],
    rating: 4.9,
    featured: true
  },
  {
    id: 'office-building-sector-125',
    image: img8,
    price: "₹ 38,00,00,000",
    title: "Office Building in Sector 125, Noida",
    location: "Sector 125, Noida, Uttar Pradesh, India",
    area: "12,000 sq ft",
    parkings: 22,
    isNew: false,
    imagesCount: 18,
    type: "Office Building",
    description: "Premium office building with modern architecture, featuring smart workspaces and advanced security systems.",
    details: {
      totalBuiltUpArea: '12,00,000 sq.ft',
      typicalFloorPlate: '60,000 sq.ft',
      totalFloors: '15',
      parking: '3 Level Basement',
      certification: 'Smart Building Certified',
      nearestAirport: 'IGI Delhi',
      nearestMetro: 'Sector 125 Metro Station',
      landmark: 'Near Tech Park'
    },
    units: [
      { area: '60000 sq.ft', seats: '600' },
      { area: '40000 sq.ft', seats: '400' }
    ],
    amenities: [
      'Smart Building Technology',
      'Power Back Up',
      'Air Conditioned',
      'Lift',
      'Reserved Parking',
      'Gym',
      'Internet / Wi-Fi',
      '24x7 Security',
      'Cafeteria',
      'Conference Room',
      'Advanced Security'
    ],
    rating: 4.7,
    featured: false
  },
];

// Combine all properties
const allProperties = [...featuredProperties, ...propertyListProperties];

const PropertyDetails = () => {
  const { id } = useParams();
  const property = allProperties.find(p => p.id === id);

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
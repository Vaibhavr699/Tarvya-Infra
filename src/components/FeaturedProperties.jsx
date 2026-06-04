// src/components/FeaturedProperties.jsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Import images from assets
import assotech from "../assets/abc.jpg";
import opus from "../assets/opus.png";
import max from "../assets/max.jpg";
import supernova from "../assets/img2.jpg";
import urbtech from "../assets/urbtech.jpg";
import btower from "../assets/img3.jpg";
import innovation from "../assets/innovation.png";
import atsTower from "../assets/atstower.jpg";

// Property Data
export const featuredProperties = [
  {
    id: "assotech-business-cresterra",
    title: "Assotech Business Cresterra",
    location:
      "Assotech Business Cresterra, Sector 135, Noida, Uttar Pradesh, India - 201304",
    type: "Office Building",
    image: assotech,
    description:
      "Assotech Business Cresterra is a modern commercial office space with top-notch infrastructure, located in the prime IT hub of Noida Expressway. It's a LEED Platinum certified building designed to support sustainable business environments.",
    details: {
      totalBuiltUpArea: "4,50,000 sq.ft",
      typicalFloorPlate: "25,000 sq.ft",
      totalFloors: "16",
      parking: "2 Level Basement",
      certification: "Platinum Certified",
      nearestAirport: "IGI Delhi",
      nearestMetro: "Noida Sector 137 Metro Station",
      landmark: "Near Expressway",
    },
    units: [
      { area: "32000 sq.ft", seats: "320" },
      { area: "18000 sq.ft", seats: "180" },
      { area: "12000 sq.ft", seats: "120" },
    ],
    amenities: [
      "Private Terrace/ Garden",
      "Power Back Up",
      "Vaastu Compliant",
      "Air Conditioned",
      "Rain Water Harvesting",
      "Lift",
      "Swimming Pool",
      "Reserved Parking",
      "Gym",
      "Service/Goods Lift",
      "Inhouse Auditorium",
      "Internet / Wi-Fi",
      "24x7 Security",
      "Cafeteria/Food Court",
      "Conference Room",
      "Restaurant / Bar",
    ],
    rating: 4.8,
    featured: true,
  },
  {
    id: "opus-132",
    title: "The Opus 132",
    location: "The Opus 132, Sector 132, Noida, Uttar Pradesh, India - 201304",
    type: "Office Building",
    image: opus,
    description:
      "The Opus 132 is a futuristic commercial office tower in Noida with premium workspace solutions for IT/ITES companies, startups, and corporates. It offers world-class facilities and exceptional design aesthetics.",
    details: {
      totalBuiltUpArea: "3,80,000 sq.ft",
      typicalFloorPlate: "22,000 sq.ft",
      totalFloors: "14",
      parking: "3 Level Basement",
      certification: "Gold Rated",
      nearestAirport: "IGI Delhi",
      nearestMetro: "Okhla Bird Sanctuary Metro Station",
      landmark: "Near Jaypee Hospital",
    },
    units: [
      { area: "22000 sq.ft", seats: "220" },
      { area: "16000 sq.ft", seats: "160" },
    ],
    amenities: [
      "Power Back Up",
      "Air Conditioned",
      "Lift",
      "Reserved Parking",
      "Internet / Wi-Fi",
      "24x7 Security",
      "Cafeteria/Food Court",
      "Conference Room",
    ],
    rating: 4.7,
    featured: true,
  },
  {
    id: "max-square",
    title: "Max Square",
    location: "Max Square, Sector 129, Noida, Uttar Pradesh, India - 201304",
    type: "Office Building",
    image: max,
    description:
      "Max Square offers efficient office spaces with contemporary design and sustainable architecture. It's ideally located for businesses looking to operate in Noida's thriving commercial zone.",
    details: {
      totalBuiltUpArea: "3,00,000 sq.ft",
      typicalFloorPlate: "20,000 sq.ft",
      totalFloors: "12",
      parking: "2 Level Basement",
      certification: "Gold Certified",
      nearestAirport: "IGI Delhi",
      nearestMetro: "Noida Sector 137 Metro Station",
      landmark: "Near HCL Campus",
    },
    units: [
      { area: "20000 sq.ft", seats: "200" },
      { area: "15000 sq.ft", seats: "150" },
    ],
    amenities: [
      "Power Back Up",
      "Vaastu Compliant",
      "Air Conditioned",
      "Lift",
      "Internet / Wi-Fi",
      "24x7 Security",
      "Cafeteria/Food Court",
    ],
    rating: 4.6,
    featured: true,
  },

  {
    id: "supernova",
    title: "Supernova",
    location:
      "Supernova, Plot No. 5, Sector 94, Noida, Uttar Pradesh, India - 201301",
    type: "Office Building",
    image: supernova,
    description:
      "Supernova Plaza is a state-of-the-art commercial complex offering premium office spaces with cutting-edge technology infrastructure and modern amenities.",
    details: {
      totalBuiltUpArea: "3,20,000 sq.ft",
      typicalFloorPlate: "21,000 sq.ft",
      totalFloors: "15",
      parking: "3 Level Basement",
      certification: "LEED Gold",
      nearestAirport: "IGI Delhi",
      nearestMetro: "Noida Sector 62 Metro Station",
      landmark: "Near DLF Mall",
    },
    units: [
      { area: "21000 sq.ft", seats: "210" },
      { area: "14000 sq.ft", seats: "140" },
    ],
    amenities: [
      "Smart Building Technology",
      "Power Back Up",
      "Air Conditioned",
      "Lift",
      "Reserved Parking",
      "Gym",
      "Internet / Wi-Fi",
      "24x7 Security",
      "Cafeteria",
      "Conference Room",
    ],
    rating: 4.8,
    featured: true,
  },
  {
    id: "urbtech-center",
    title: "UrbTech Center",
    location:
      "UrbTech Center, Sector 132, Noida, Uttar Pradesh, India - 201304",
    type: "Office Building",
    image: urbtech,
    description:
      "UrbTech Center is a modern commercial hub designed for technology companies, offering flexible workspaces and advanced infrastructure.",
    details: {
      totalBuiltUpArea: "2,90,000 sq.ft",
      typicalFloorPlate: "19,000 sq.ft",
      totalFloors: "13",
      parking: "2 Level Basement",
      certification: "Green Building",
      nearestAirport: "IGI Delhi",
      nearestMetro: "Noida Sector 144 Metro Station",
      landmark: "Near Tech Zone",
    },
    units: [
      { area: "19000 sq.ft", seats: "190" },
      { area: "12000 sq.ft", seats: "120" },
    ],
    amenities: [
      "High-Speed Internet",
      "Power Back Up",
      "Air Conditioned",
      "Lift",
      "Reserved Parking",
      "Internet / Wi-Fi",
      "24x7 Security",
      "Cafeteria",
    ],
    rating: 4.6,
    featured: true,
  },
  {
    id: "business-hub",
    title: "Business Hub Tower",
    location:
      "Business Hub Tower, Sector 126, Noida, Uttar Pradesh, India - 201304",
    type: "Office Building",
    image: btower,
    description:
      "Business Hub Tower offers premium office spaces with world-class amenities and strategic location for corporate businesses.",
    details: {
      totalBuiltUpArea: "3,50,000 sq.ft",
      typicalFloorPlate: "23,000 sq.ft",
      totalFloors: "17",
      parking: "3 Level Basement",
      certification: "LEED Platinum",
      nearestAirport: "IGI Delhi",
      nearestMetro: "Noida Sector 126 Metro Station",
      landmark: "Near Golf Course",
    },
    units: [
      { area: "23000 sq.ft", seats: "230" },
      { area: "16000 sq.ft", seats: "160" },
    ],
    amenities: [
      "Executive Lounge",
      "Power Back Up",
      "Air Conditioned",
      "Lift",
      "Reserved Parking",
      "Gym",
      "Internet / Wi-Fi",
      "24x7 Security",
      "Cafeteria",
      "Conference Room",
    ],
    rating: 4.9,
    featured: true,
  },
  {
    id: "innovation-center",
    title: "Innovation Center",
    location:
      "Innovation Center, Sector 142, Noida, Uttar Pradesh, India - 201304",
    type: "Office Building",
    image: innovation,
    description:
      "Innovation Center is a modern workspace designed for creative and technology-driven companies, featuring collaborative spaces and advanced facilities.",
    details: {
      totalBuiltUpArea: "2,80,000 sq.ft",
      typicalFloorPlate: "20,000 sq.ft",
      totalFloors: "14",
      parking: "2 Level Basement",
      certification: "LEED Gold",
      nearestAirport: "IGI Delhi",
      nearestMetro: "Noida Sector 142 Metro Station",
      landmark: "Near Tech Park",
    },
    units: [
      { area: "20000 sq.ft", seats: "200" },
      { area: "15000 sq.ft", seats: "150" },
    ],
    amenities: [
      "Innovation Lab",
      "Power Back Up",
      "Air Conditioned",
      "Lift",
      "Reserved Parking",
      "Internet / Wi-Fi",
      "24x7 Security",
      "Cafeteria",
      "Conference Room",
    ],
    rating: 4.7,
    featured: true,
  },
  {
    id: "ats-noida",
    title: "ATS Tower",
    location: "ATS Tower, Sector 132, Noida, Uttar Pradesh, India - 201304",
    type: "Office Building",
    image: atsTower, // Make sure you have imported or defined this image
    description:
      "ATS Tower is a premium commercial building in Noida's prime business district, offering modern office spaces with world-class amenities and seamless connectivity.",
    details: {
      totalBuiltUpArea: "3,50,000 sq.ft",
      typicalFloorPlate: "22,000 sq.ft",
      totalFloors: "15",
      parking: "3 Level Basement",
      certification: "LEED Certified",
      nearestAirport: "IGI Delhi",
      nearestMetro: "Noida Sector 137 Metro Station",
      landmark: "Opposite Jaypee Hospital",
    },
    units: [
      { area: "22000 sq.ft", seats: "220" },
      { area: "15000 sq.ft", seats: "150" },
      { area: "10000 sq.ft", seats: "100" },
    ],
    amenities: [
      "High-Speed Internet",
      "Power Back Up",
      "Central Air Conditioning",
      "Multiple Elevators",
      "Ample Parking",
      "Wi-Fi Enabled Campus",
      "24x7 Manned Security",
      "Food Court / Cafeteria",
      "Fire Safety Systems",
    ],
    rating: 4.7,
    featured: true,
  },
];

// Featured Properties Component
const FeaturedProperties = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="eyebrow mb-4">Handpicked Listings</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Featured <span className="accent-underline text-brand-800">Properties</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of commercial properties, each
            offering unique advantages for your business needs.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProperties.map((property) => {
            const sector = property.location
              .split(",")
              .map((s) => s.trim())
              .find((p) => /sector/i.test(p));
            const area = sector ? `${sector}, Noida` : "Noida, Uttar Pradesh";

            return (
              <motion.div key={property.id} variants={itemVariants}>
                <Link to={`/property/${property.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-900/[0.06] shadow-sm">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate transition-colors group-hover:text-brand-700">
                        {property.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-500 truncate">{area}</p>
                    </div>
                    <span className="grid place-items-center h-11 w-11 shrink-0 rounded-2xl bg-white text-gray-700 ring-1 ring-gray-200 shadow-sm transition-all duration-300 group-hover:bg-brand-700 group-hover:text-white group-hover:ring-brand-700 group-hover:-translate-y-0.5">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Properties Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link to="/properties" className="btn-primary">
            View All Properties
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

import { useParams } from 'react-router-dom';
import { featuredProperties } from '../data/featuredProperties';

const PropertyDetails = () => {
  const { id } = useParams();
  const property = featuredProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="text-center text-[#1E3A8A] py-20 text-xl">
        Property not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-[400px] object-cover rounded-xl shadow-md mb-6"
      />
      <p className="text-lg text-gray-700 mb-6">{property.description}</p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Overview */}
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <ul className="space-y-2 text-gray-800">
            {Object.entries(property.details).map(([key, value]) => (
              <li key={key}>
                <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong> {value}
              </li>
            ))}
          </ul>
        </div>

        {/* Available Units */}
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Available Units</h2>
          {property.units?.length ? (
            <ul className="space-y-3 text-gray-800">
              {property.units.map((unit, index) => (
                <li key={index} className="flex justify-between border-b pb-2">
                  <span><strong>Area:</strong> {unit.area}</span>
                  <span><strong>Seats:</strong> {unit.seats}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No units available.</p>
          )}
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
        {property.amenities?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-gray-800">
            {property.amenities.map((amenity, index) => (
              <span
                key={index}
                className="bg-white px-3 py-1 border rounded-full text-sm shadow-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        ) : (
          <p>No amenities listed.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;

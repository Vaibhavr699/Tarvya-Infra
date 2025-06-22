import React from "react";
import { useParams, Link } from "react-router-dom";

// Same sample property data here, ideally fetch from API or global store
const properties = [
  { id: "1", name: "Luxury Villa", location: "Beverly Hills", description: "A beautiful luxury villa with pool and garden." },
  { id: "2", name: "Downtown Apartment", location: "New York", description: "Modern apartment located in the heart of NYC." },
  { id: "3", name: "Beachside Condo", location: "Miami", description: "Condo with stunning ocean views and beach access." },
];

function PropertyDetail() {
  const { id } = useParams();

  // Find the property with matching id
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div>
        <h2>Property not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{property.name}</h1>
      <p><strong>Location:</strong> {property.location}</p>
      <p>{property.description}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default PropertyDetail;

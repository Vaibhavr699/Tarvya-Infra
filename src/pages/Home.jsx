import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import Welcome from '../components/Welcome';
import PropertyList from '../components/PropertyList';
import PropertySection from '../components/PropertySection';
import Contact from '../components/Contact';
import FeaturedProperties from '../components/FeaturedProperties';
import TrustedBySlider from '../components/TrustedBySlider';

const Home = () => {
  return (
    <div>
      <ImageCarousel />
      <Welcome/>
      <PropertySection/>
      <FeaturedProperties/>
      <TrustedBySlider/>
    </div>
  );
};

export default Home;

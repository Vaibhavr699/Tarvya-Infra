import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import Welcome from '../components/Welcome';
import PropertyList from '../components/PropertyList';
import PropertySection from '../components/PropertySection';
import InteriorSection from '../components/InteriorSection';
import Contact from '../components/Contact';
import FeaturedProperties from '../components/FeaturedProperties';
import TrustedBySlider from '../components/TrustedBySlider';
import StatsBar from '../components/StatsBar';

const Home = () => {
  return (
    <div>
      <ImageCarousel />
      <TrustedBySlider/>
      <Welcome/>
      <PropertySection/>
      <FeaturedProperties/>
      <InteriorSection/>
      <StatsBar/>
    </div>
  );
};

export default Home;

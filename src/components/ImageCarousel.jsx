import React, { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";

const slides = [
  {
    image: img1,
    title: "Premium Office Spaces",
    subtitle: "Find your perfect business location"
  },
  {
    image: img2,
    title: "Strategic Retail Locations",
    subtitle: "Maximize your business visibility"
  },
  {
    image: img3,
    title: "Modern Industrial Units",
    subtitle: "State-of-the-art facilities for your operations"
  },
  {
    image: img4,
    title: "Prime Commercial Properties",
    subtitle: "Invest in prime real estate locations"
  },
  {
    image: img5,
    title: "Flexible Workspace Solutions",
    subtitle: "Adaptable spaces for growing businesses"
  },
  {
    image: img6,
    title: "Exclusive Business Centers",
    subtitle: "Premium locations for established enterprises"
  },
  {
    image: img7,
    title: "Innovative Commercial Hubs",
    subtitle: "Be part of the next business district"
  },
  {
    image: img8,
    title: "Future-Ready Properties",
    subtitle: "Spaces designed for tomorrow's businesses"
  }
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 4000); // Increased to 4 seconds for slower transitions
    
    return () => clearInterval(interval);
  }, [goToNext, isAutoPlaying, isTransitioning]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isTransitioning) {
        setIsAutoPlaying(false);
        goToNext();
      }
    },
    onSwipedRight: () => {
      if (!isTransitioning) {
        setIsAutoPlaying(false);
        goToPrev();
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "tween", duration: 0.8, ease: "easeInOut" },
        opacity: { duration: 0.4 }
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 0.8, ease: "easeInOut" },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "tween", duration: 0.8, ease: "easeInOut" },
        opacity: { duration: 0.4 }
      }
    })
  };

  const textVariants = {
    enter: {
      opacity: 0,
      y: 30,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.6, ease: "easeIn" }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.6)" }
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-black">
      <div className="absolute inset-0" {...handlers}>
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={slides[currentIndex].image}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Animated Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60">
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="max-w-4xl"
                  >
                    <motion.h1 
                      className="text-3xl sm:text-5xl md:text-[80px] font-bold text-white drop-shadow-lg mb-4"
                    >
                      {slides[currentIndex].title}
                    </motion.h1>
                    <motion.p 
                      className="text-xl md:text-2xl text-white/90 font-light drop-shadow-md"
                    >
                      {slides[currentIndex].subtitle}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons - Keep the same but add disabled state */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover={!isTransitioning ? "hover" : {}}
          onClick={() => !isTransitioning && goToPrev()}
          className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full 
            backdrop-blur-sm transition-all duration-300 z-10 hover:bg-black/60 focus:outline-none
            ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover={!isTransitioning ? "hover" : {}}
          onClick={() => !isTransitioning && goToNext()}
          className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full 
            backdrop-blur-sm transition-all duration-300 z-10 hover:bg-black/60 focus:outline-none
            ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Dots Navigation - Keep the same but add disabled state */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => !isTransitioning && goToSlide(index)}
              whileHover={!isTransitioning ? { scale: 1.2 } : {}}
              whileTap={!isTransitioning ? { scale: 0.9 } : {}}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-white scale-125" 
                  : "bg-white/50 hover:bg-white/75"
              } ${isTransitioning ? 'cursor-not-allowed' : ''}`}
              disabled={isTransitioning}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Indicator - Keep the same */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full 
            backdrop-blur-sm transition-all duration-300 z-10 hover:bg-black/60"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ImageCarousel;

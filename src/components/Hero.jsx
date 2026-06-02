import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Framer Motion Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// --- 4 Luxury Background Images ---
const backgroundImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-play timer for the background images (changes every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // 6000ms = 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] bg-brand-black flex items-center overflow-hidden font-sans pt-24 pb-16 lg:py-0">
      
      {/* --- CINEMATIC BACKGROUND SLIDER --- */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-brand-black">
        <AnimatePresence>
          <motion.div 
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }} // Starts slightly zoomed out
            animate={{ opacity: 1, scale: 1.15 }} // Smoothly fades in and zooms
            exit={{ opacity: 0 }} // Smoothly fades out
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" }, // 1.5s crossfade
              scale: { duration: 8, ease: "linear" } // 8s slow continuous zoom
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center origin-center"
            style={{ backgroundImage: `url('${backgroundImages[currentImage]}')` }}
          />
        </AnimatePresence>
        
        {/* 1. Universal Base Overlay */}
        <div className="absolute inset-0 bg-brand-black/40 md:bg-brand-black/50 mix-blend-multiply z-10" />
        
        {/* 2. DESKTOP ONLY: Heavy Left-to-Right Gradient */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/85 to-transparent w-full lg:w-3/4 z-10" />
        
        {/* 3. MOBILE ONLY: Smooth Bottom-to-Top Gradient */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/60 to-brand-black/40 z-10" />

        {/* 4. DESKTOP ONLY: Subtle bottom fade */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-90 z-10" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-20 h-full flex flex-col justify-center">
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="w-full lg:w-[90%] xl:w-[80%] 2xl:w-[75%]"
        >
          {/* Main Headline */}
          <motion.h1 
            variants={fadeUp}
            className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-6xl 2xl:text-7xl font-medium mb-4 md:mb-6 text-white tracking-tight mt-10 md:mt-0"
          >
            Find Out If We Can<br className="hidden sm:block" />
            <span className="text-brand-gold italic pr-1 md:pr-2"> Guarantee</span> Your Rent<br />
            In Minutes.
          </motion.h1>
          
          {/* Subtext */}
          <motion.p 
            variants={fadeUp}
            className="text-gray-300 text-sm sm:text-base md:text-lg 2xl:text-xl mb-8 md:mb-10 max-w-xl 2xl:max-w-2xl leading-relaxed font-light"
          >
           Fill in your property details. Our system instantly checks if your property matches our current requirements for long-term guaranteed income.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div variants={fadeUp}>
            <button className="group relative flex items-center gap-3 md:gap-4 bg-brand-gold text-brand-black pl-6 md:pl-8 pr-1.5 md:pr-2 py-1.5 md:py-2 rounded-full text-base md:text-lg font-medium hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(196,164,124,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <span className="tracking-wide">Get a Free Assessment</span>
              <span className="bg-brand-black text-brand-gold p-2 md:p-3 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#111] group-hover:text-white group-hover:rotate-45">
                <ArrowUpRight size={18} className="md:w-5 md:h-5" strokeWidth={2.5} />
              </span>
            </button>
          </motion.div>

          {/* --- CLEAN STATS ROW --- */}
          <motion.div 
            variants={fadeUp}
            className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-3 gap-2 sm:gap-8 md:gap-12 max-w-4xl w-full"
          >
            {/* Stat 1 */}
            <div>
              <div className="text-[1.35rem] sm:text-3xl md:text-4xl 2xl:text-5xl font-medium text-white mb-0.5 md:mb-2 flex items-baseline tracking-tight">
                £1.8M<span className="text-brand-gold text-sm sm:text-lg md:text-xl 2xl:text-2xl ml-0.5 md:ml-1">+</span>
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm 2xl:text-base text-gray-400 font-light sm:pr-4">Paid to landlords in 2024</div>
            </div>
            
            {/* Stat 2 */}
            <div>
              <div className="text-[1.35rem] sm:text-3xl md:text-4xl 2xl:text-5xl font-medium text-white mb-0.5 md:mb-2 flex items-baseline tracking-tight">
                100<span className="text-brand-gold text-sm sm:text-lg md:text-xl 2xl:text-2xl ml-0.5 md:ml-1">+</span>
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm 2xl:text-base text-gray-400 font-light sm:pr-4">Properties managed</div>
            </div>
            
            {/* Stat 3 */}
            <div>
              <div className="text-[1.35rem] sm:text-3xl md:text-4xl 2xl:text-5xl font-medium text-white mb-0.5 md:mb-2 tracking-tight">
                3-5 <span className="text-sm sm:text-xl md:text-2xl 2xl:text-3xl font-normal ml-0.5 text-gray-300">Yrs</span>
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm 2xl:text-base text-gray-400 font-light sm:pr-4">Long-term leases</div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
import React from "react";
import { motion } from "framer-motion";
import brandConfig from '../config/brand';
import TrustStrip from './TrustStrip';
import LeadForm from './LeadForm';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero = () => {
  const heroCopy = brandConfig.copy.hero;

  return (
    <section id="hero" className="relative w-full bg-[#050505] flex flex-col font-sans z-10">
      {/* Hero 100vh Wrapper (only contains main content, not desktop trust strip) */}
      <div className="relative w-full min-h-[100dvh] flex flex-col">
        {/* Background glow to anchor the layout */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Top Logo */}
        <div className="absolute top-6 left-0 w-full flex justify-center sm:top-8 sm:left-10 sm:w-auto sm:block lg:top-8 lg:left-10 z-30">
          <a href="https://almassestates.co.uk/" target="_blank" rel="noopener noreferrer">
            <img src="/images/logo.png" alt="Almass Estates" className="h-16 sm:h-16 lg:h-20 opacity-95 object-contain drop-shadow-[0_0_15px_rgba(200,169,110,0.15)]" />
          </a>
        </div>

        {/* Main Hero Content */}
        <div className="flex-grow flex flex-col lg:flex-row items-center justify-center w-full max-w-[1300px] mx-auto gap-8 lg:gap-12 xl:gap-20 pt-28 lg:pt-0 pb-8 lg:pb-0 px-4 sm:px-10 relative">
          {/* Left: Copy & Value Prop */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left lg:mt-16"
          >
            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4.5rem] 2xl:text-[5rem] font-medium 2xl:font-semibold leading-[1.1] mb-3 lg:mb-4 xl:mb-6 text-white tracking-tight">
              <span className="block text-gradient-gold italic pr-1.5 text-[0.85em] mb-1 sm:mb-2 leading-tight">{heroCopy.heading1}</span>
              {heroCopy.heading2} <br /> {heroCopy.heading3}
            </h1>

            <p className="text-gray-400 text-sm sm:text-lg mb-4 lg:mb-6 xl:mb-10 max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
              {heroCopy.subheading}
            </p>
          </motion.div>

          {/* Right: The High-Trust Form Component */}
          <LeadForm />
        </div>
        
        {/* Mobile TrustStrip (Inside 100vh Wrapper) */}
        <div className="mt-auto w-full flex flex-col sm:hidden">
          <TrustStrip />
        </div>
      </div> {/* End 100vh Wrapper */}

      {/* Desktop TrustStrip (After 100vh) */}
      <div className="hidden sm:flex w-full flex-col bg-[#050505]">
        <TrustStrip />
        <div className="w-full py-3 sm:py-4 text-center px-4">
          <p className="text-gray-400 text-[10px] sm:text-xs font-light tracking-widest uppercase">
            Currently accepting properties across North West, North, West and Central London — <span className="text-brand-gold font-medium">limited availability</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

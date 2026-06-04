import React from 'react';
import { motion } from 'framer-motion';
import brandConfig from '../config/brand';

const TrustStrip = () => {
  const items = brandConfig.copy.trustStrip.items;

  // We duplicate the items so the scroll loops seamlessly without a gap
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="w-full bg-brand-card border-y border-brand-border py-5 relative z-30 flex items-center overflow-hidden">
      
      {/* Subtle fade masks on the left and right edges so text fades out nicely */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-brand-card to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-brand-card to-transparent z-10 pointer-events-none" />

      {/* The scrolling container */}
      <motion.div
        className="flex w-max items-center gap-8 md:gap-16 pr-8 md:pr-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8 md:gap-16 shrink-0">
            <span className="text-gray-300 text-sm md:text-base font-light tracking-widest uppercase whitespace-nowrap">
              {item}
            </span>
            {/* Elegant Diamond/Star Separator */}
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-gold">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
            </svg>
          </div>
        ))}
      </motion.div>
      
    </div>
  );
};

export default TrustStrip;
import React from 'react';
import brandConfig from '../config/brand';

const TrustStrip = () => {
  const items = brandConfig.copy.trustStrip.items;

  return (
    <div className="w-full bg-brand-card border-y border-brand-border py-5 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-16">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-x-8 md:gap-x-16">
              <span className="text-gray-300 text-sm md:text-base font-light tracking-widest uppercase text-center">
                {item}
              </span>
              {/* Elegant Diamond/Star Separator, skip for the last item */}
              {index < items.length - 1 && (
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-gold hidden md:block">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
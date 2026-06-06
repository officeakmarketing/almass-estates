import React from 'react';
import brandConfig from '../config/brand';

const TrustStrip = () => {
  const items = brandConfig.copy.trustStrip.items;

  const renderPremiumText = (text) => {
    // Matches the stat part at the beginning: "£1.8M+", "100+", "3–5" or "3-5"
    const match = text.match(/^(£\d+(?:\.\d+)?[A-Z]*\+|\d+\+|\d+[–-]\d+)(.*)$/);
    if (match) {
      return (
        <>
          <span className="text-gradient-gold font-medium text-base md:text-lg block sm:inline sm:leading-normal">{match[1]}</span>
          <span className="opacity-70 block sm:inline sm:ml-1.5 mt-0.5 sm:mt-0">{match[2]}</span>
        </>
      );
    }
    return text;
  };

  return (
    <div className="w-full bg-gradient-to-r from-black via-[#111] to-black border-y border-white/5 py-4 sm:py-8 relative z-30 shadow-[0_0_50px_rgba(200,169,110,0.03)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-3 md:flex md:flex-wrap justify-center items-start md:items-center gap-x-1 sm:gap-x-2 gap-y-3 md:gap-x-16">
          {items.map((item, index) => (
            <div key={index} className="flex items-start md:items-center justify-center gap-x-8 md:gap-x-16 h-full">
              <span className="text-gray-300 text-[9px] sm:text-[11px] md:text-base font-light tracking-widest uppercase text-center px-0.5 md:px-0">
                {renderPremiumText(item)}
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
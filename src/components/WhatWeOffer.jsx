import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Banknote, UserCog, CalendarClock, ArrowLeft, ArrowDown } from 'lucide-react';

const slides = [
  {
    id: 1,
    num: "01",
    shortTitle: "GUARANTEED RENT",
    title: "Guaranteed Rent",
    desc: "Your rent lands on the same date every month. Occupied or empty, it makes no difference to your income.",
    icon: Banknote,
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 2,
    num: "02",
    shortTitle: "FULL MANAGEMENT",
    title: "Full Management",
    desc: "We handle tenants, bills, repairs and compliance. You will never receive a 2am call about a broken boiler again.",
    icon: UserCog,
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 3,
    num: "03",
    shortTitle: "LONG-TERM LEASES",
    title: "Long-Term Leases",
    desc: "Lock in your security with long-term corporate leases. No constant finding of new tenants or paying letting fees.",
    icon: CalendarClock,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  }
];

const WhatWeOffer = () => {
  const [activeIdx, setActiveIdx] = useState(1);

  return (
    <section 
      className="w-full min-h-screen bg-[#0D0D0D] py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 2xl:px-32 flex flex-col font-sans selection:bg-[#C8A96E] selection:text-[#0D0D0D] overflow-hidden"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      
      {/* --- HEADER --- */}
      <div className="max-w-[1600px] mx-auto w-full mb-10 md:mb-16">
        <span className="bg-[#F0EDE8] text-[#0D0D0D] px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium tracking-wide mb-4 md:mb-6 inline-block">
          What We Offer
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif text-[#F0EDE8] mb-4 md:mb-6 tracking-wide leading-tight">
          YOU OWN IT. WE RUN IT. YOU GET PAID.
        </h2>
        <p className="text-[#C8C4BC] text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-light">
          No tenant headaches. No maintenance calls. No void periods. Just a fixed payment in your account every single month.
        </p>
      </div>

      {/* --- EXPANDING SLIDER LAYOUT --- */}
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-8 lg:gap-12 h-auto lg:h-[550px] 2xl:h-[650px]">
        
        {/* LEFT COLUMN: Active Text Details */}
        <div className="w-full lg:w-[320px] 2xl:w-[400px] flex flex-col justify-end shrink-0 min-h-[140px] lg:min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }} // Sped up the text transition
              className="mb-0 lg:mb-12"
            >
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg border border-white/20 flex items-center justify-center bg-white/5 shrink-0">
                  {React.createElement(slides[activeIdx].icon, { size: 22, className: "text-[#F0EDE8]", strokeWidth: 1.5 })}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#F0EDE8]">
                  {slides[activeIdx].title}
                </h3>
              </div>
              <p className="text-[#C8C4BC] text-sm md:text-base leading-relaxed font-light">
                {slides[activeIdx].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Interactive Expanding Cards */}
        <div className="flex-grow flex flex-col lg:flex-row gap-3 md:gap-4 h-[500px] sm:h-[600px] lg:h-full w-full">
          {slides.map((slide, idx) => {
            const isActive = activeIdx === idx;

            return (
              <motion.div
                layout
                key={slide.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                // Snappier, tighter spring physics to eliminate "lag" feeling
                transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                className={`relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group transform-gpu ${
                  isActive 
                    ? 'flex-grow shadow-2xl' 
                    : 'h-16 lg:h-auto lg:w-20 xl:w-24 2xl:w-28'
                }`}
              >
                
                {/* 1. BASE IMAGE (Always rendered to prevent loading lag. Parent overflow clips it.) */}
                <img 
                  src={slide.img} 
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* 2. DARK OVERLAY (Fades in ONLY when inactive to create the dark tab look) */}
                <div 
                  className={`absolute inset-0 bg-[#1A1A1A] transition-opacity duration-300 ease-in-out ${
                    isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-90'
                  }`}
                />
                  
                {/* 3. ACTIVE STATE: Seamless White Cutout Box */}
                <div 
                  className={`absolute bottom-0 right-0 w-40 md:w-48 lg:w-56 h-20 md:h-24 lg:h-28 bg-[#F0EDE8] rounded-tl-2xl md:rounded-tl-3xl flex flex-col justify-center px-4 md:px-6 lg:px-8 z-10 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="absolute bottom-0 right-full w-6 h-6 bg-transparent rounded-br-3xl shadow-[12px_12px_0_0_#F0EDE8]"></div>
                  <div className="absolute bottom-full right-0 w-6 h-6 bg-transparent rounded-br-3xl shadow-[12px_12px_0_0_#F0EDE8]"></div>
                  
                  <div className="text-[#0D0D0D] flex flex-col">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-light leading-none mb-0.5 md:mb-1 tracking-tight">
                      {slide.num}
                    </span>
                    <span className="text-[11px] md:text-xs lg:text-sm font-semibold tracking-wide">
                      {slide.title}
                    </span>
                  </div>
                </div>

                {/* 4. INACTIVE STATE: Compressed Text Tab */}
                <div 
                  className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                    !isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {/* DESKTOP (lg+): Vertical Text Tab */}
                  <div className="hidden lg:flex flex-col items-center justify-between w-full h-full py-8">
                    <ArrowLeft size={20} className="text-[#C8C4BC] group-hover:text-[#C8A96E] transition-colors duration-300" strokeWidth={1.5} />
                    <div 
                      className="flex items-center gap-4 text-[#C8C4BC] group-hover:text-[#C8A96E] transition-colors duration-300 whitespace-nowrap"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      <span className="text-3xl font-light tracking-tight opacity-70">{slide.num}</span>
                      <span className="text-[13px] tracking-[0.2em] font-medium uppercase">{slide.shortTitle}</span>
                    </div>
                  </div>

                  {/* MOBILE/TABLET (<lg): Horizontal Text Bar */}
                  <div className="flex lg:hidden items-center justify-between w-full h-full px-6">
                    <div className="flex items-center gap-4 text-[#C8C4BC] group-hover:text-[#C8A96E] transition-colors duration-300 whitespace-nowrap">
                      <span className="text-2xl font-light tracking-tight opacity-70">{slide.num}</span>
                      <span className="text-xs sm:text-sm tracking-[0.15em] font-medium uppercase">{slide.shortTitle}</span>
                    </div>
                    <ArrowDown size={18} className="text-[#C8C4BC] group-hover:text-[#C8A96E] transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhatWeOffer;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MessageCircle, X } from 'lucide-react';

// --- Framer Motion Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
  const [showChatPopup, setShowChatPopup] = useState(false);

  return (
    // Outer section: No padding by default (mobile to laptop). 
    // Adds padding (2xl:p-8) ONLY on massive screens.
    <section className="h-[100dvh] min-h-[600px] w-full bg-[#111111] p-0 2xl:p-8 flex items-center justify-center font-sans overflow-hidden">
      
      {/* Inner Card: No rounded borders by default. 
          Adds rounded borders (2xl:rounded-[2.5rem]) ONLY on massive screens. */}
      <div className="relative w-full max-w-[1920px] h-full rounded-none 2xl:rounded-[2.5rem] overflow-hidden shadow-2xl bg-black">
        
        {/* Background Image — matches preloaded URL in index.html (1400px/q75) */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          fetchPriority="high"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=75')" 
          }}
        />
        
        {/* Gradients / Overlays */}
        <div className="absolute inset-0 bg-[#0a1526]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1526]/95 via-[#0a1526]/80 to-transparent w-full lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1526]/90 via-transparent to-transparent opacity-80 lg:opacity-60" />

        {/* --- MAIN CONTENT --- */}
        <motion.div 
          // Padding X dynamically scales. 2xl gets massive padding to match the scaled-up content.
          className="relative h-full flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 2xl:px-32 w-full lg:w-[85%] 2xl:w-[80%]"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          
          <motion.h1 
            variants={fadeUp}
            className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[3.25rem] xl:text-[3.75rem] 2xl:text-[4.5rem] leading-[1.1] md:leading-[1.05] 2xl:leading-[1.05] mb-3 md:mb-4 2xl:mb-8 tracking-wide text-white drop-shadow-lg"
          >
            Find Out If We Can<br className="hidden sm:block" />
            Guarantee Your Rent<br className="hidden sm:block" />
            In Minutes.
          </motion.h1>
          
          {/* Subheadline: Scales up on 2xl */}
          <motion.p 
            variants={fadeUp}
            className="text-gray-200 text-sm sm:text-base md:text-[15px] lg:text-base 2xl:text-xl mb-5 md:mb-6 2xl:mb-12 max-w-xl 2xl:max-w-3xl leading-relaxed drop-shadow-md"
          >
           Fill in your property details. Our system instantly checks <br className="hidden md:block"/> 
           if your property matches our current requirements.
          </motion.p>
          
          {/* CTA Button: Gets larger padding, text, and icon on 2xl */}
          <motion.div variants={fadeUp}>
            <button className="group flex w-max items-center gap-3 md:gap-4 2xl:gap-6 bg-[#d8c29d] text-[#111111] pl-5 md:pl-6 2xl:pl-8 pr-1.5 2xl:pr-2 py-1.5 2xl:py-2 rounded-full text-sm md:text-[15px] 2xl:text-lg font-medium hover:bg-[#eaddc5] transition-all duration-300 mb-6 md:mb-8 2xl:mb-16">
              Get a Free Assessment
              <span className="bg-[#111111] text-[#d8c29d] p-2 md:p-2.5 2xl:p-3 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={16} className="2xl:w-6 2xl:h-6" strokeWidth={2.5} />
              </span>
            </button>
          </motion.div>

          {/* Statistics Row: Gaps and font sizes scale up massively on 2xl */}
          <motion.div 
            variants={fadeUp}
            className="flex flex-wrap lg:flex-nowrap gap-5 sm:gap-8 md:gap-10 lg:gap-12 2xl:gap-24 mt-4"
          >
            {/* Stat 1 */}
            <div className="w-[40%] lg:w-auto">
              <div className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl 2xl:text-[3rem] font-light mb-0.5 2xl:mb-2 text-white flex items-start tracking-tight">
                £1.8M<span className="text-xl sm:text-2xl lg:text-2xl 2xl:text-4xl font-normal mt-0.5 2xl:mt-1 ml-0.5">+</span>
              </div>
              <div className="text-xs sm:text-sm lg:text-[16px] 2xl:text-lg text-gray-300 font-light">Paid to landlords in 2025</div>
            </div>
            
            {/* Stat 2 */}
            <div className="w-[40%] lg:w-auto">
              <div className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl 2xl:text-[3rem] font-light mb-0.5 2xl:mb-2 text-white flex items-start tracking-tight">
                100<span className="text-xl sm:text-2xl lg:text-2xl 2xl:text-4xl font-normal mt-0.5 2xl:mt-1 ml-0.5">+</span>
              </div>
              <div className="text-xs sm:text-sm lg:text-[16px] 2xl:text-lg text-gray-300 font-light">Properties managed</div>
            </div>
            
            {/* Stat 3 */}
            <div className="w-full lg:w-auto mt-1 lg:mt-0">
              <div className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl 2xl:text-[3rem] font-light mb-0.5 2xl:mb-2 text-white tracking-tight">
                3-5 Years
              </div>
              <div className="text-xs sm:text-sm lg:text-[16px] 2xl:text-lg text-gray-300 font-light">Long-term leases</div>
            </div>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
};

export default Hero;
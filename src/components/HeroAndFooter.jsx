import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Framer Motion Animations ---
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

const HeroAndFooter = () => {
  return (
    <div 
      className="min-h-screen bg-[#0D0D0D] text-[#F0EDE8] antialiased selection:bg-[#C8A96E] selection:text-[#0D0D0D]"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      
      {/* =========================================
          1. HERO SECTION
          ========================================= */}
      <section className="p-3 md:p-6 lg:p-8 flex items-center justify-center overflow-hidden">
        
        {/* Main Hero Card Container */}
        <div className="relative w-full max-w-[1600px] h-[85vh] min-h-[700px] max-h-[900px] rounded-[2rem] overflow-hidden shadow-2xl shadow-black">
          
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')" 
            }}
          />
          
          {/* Gradients to match the deep slate/black tint in the image */}
          <div className="absolute inset-0 bg-[#08121c]/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/95 via-[#0D0D0D]/70 to-transparent w-full md:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-90" />

          {/* Hero Content */}
          <motion.div 
            className="relative h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 w-full lg:w-[85%]"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Headline */}
            <motion.h1 
              variants={fadeUp}
              className="text-[#F0EDE8] text-4xl sm:text-5xl md:text-6xl lg:text-[5.2rem] font-medium leading-[1.1] mb-6 tracking-tight drop-shadow-lg"
            >
              Find Out If We Can<br />
              Guarantee Your Rent<br />
              In Minutes.
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              variants={fadeUp}
              className="text-[#F0EDE8] text-sm md:text-base lg:text-lg mb-10 max-w-[500px] leading-relaxed drop-shadow-md font-light"
            >
              Fill in your property details. Our system instantly checks<br className="hidden md:block"/>
              if your property matches our current requirements.
            </motion.p>
            
            {/* CTA Button - Gold Pill with dark nested circle */}
            <motion.div variants={fadeUp}>
              <button className="group flex items-center gap-4 bg-[#C8A96E] text-[#0D0D0D] pl-6 pr-1.5 py-1.5 rounded-full text-[15px] font-medium hover:bg-[#d6b980] transition-all duration-300 mb-16 shadow-lg">
                Get a Free Assessment
                <span className="bg-[#0D0D0D] text-[#C8A96E] p-2.5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </span>
              </button>
            </motion.div>

            {/* Statistics Row */}
            <motion.div 
              variants={fadeUp}
              className="flex flex-wrap gap-10 sm:gap-16 lg:gap-24"
            >
              {/* Stat 1 */}
              <div>
                <div className="text-4xl sm:text-5xl font-medium mb-1 text-[#F0EDE8] flex items-start tracking-tight">
                  £1.8M<span className="text-2xl sm:text-3xl font-medium mt-0.5 ml-0.5">+</span>
                </div>
                <div className="text-xs md:text-sm text-[#C8C4BC] font-light">Paid to landlords in 2025</div>
              </div>
              
              {/* Stat 2 */}
              <div>
                <div className="text-4xl sm:text-5xl font-medium mb-1 text-[#F0EDE8] flex items-start tracking-tight">
                  100<span className="text-2xl sm:text-3xl font-medium mt-0.5 ml-0.5">+</span>
                </div>
                <div className="text-xs md:text-sm text-[#C8C4BC] font-light">Properties managed</div>
              </div>
              
              {/* Stat 3 */}
              <div>
                <div className="text-4xl sm:text-5xl font-medium mb-1 text-[#F0EDE8] tracking-tight">
                  3-5 Years
                </div>
                <div className="text-xs md:text-sm text-[#C8C4BC] font-light">Long-term leases</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>


      {/* =========================================
          2. FOOTER / CTA SECTION
          ========================================= */}
      <section className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden bg-[#050505]">
        
        {/* Subtle Starry/Dotted Background Effect (Pure CSS) */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at center, #ffffff 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            backgroundPosition: '0 0, 24px 24px'
          }}
        />
        
        {/* Center radial glow to make text pop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.03)_0%,transparent_50%)] pointer-events-none" />

        <motion.div 
          className="relative z-10 flex flex-col items-center text-center px-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          
          {/* Top Label with horizontal lines */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 md:w-16 bg-[#333333]"></div>
            <span className="text-[#C8C4BC] italic font-light text-sm md:text-base tracking-wide">
              Get started
            </span>
            <div className="h-[1px] w-8 md:w-16 bg-[#333333]"></div>
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#F0EDE8] leading-[1.2] mb-6 tracking-tight"
          >
            Your property. Our responsibility.<br />
            Your guaranteed income.
          </motion.h2>

          {/* Subheadline */}
          <motion.p 
            variants={fadeUp}
            className="text-[#C8C4BC] font-light text-base md:text-lg mb-12"
          >
            Join over 100 London landlords who never chase rent again.
          </motion.p>

          {/* Footer CTA Button - White Pill with black nested circle */}
          <motion.div variants={fadeUp}>
            <button className="group flex items-center gap-4 bg-[#F0EDE8] text-[#0D0D0D] pl-7 pr-1.5 py-1.5 rounded-full text-[15px] font-medium hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Get in touch
              <span className="bg-[#0D0D0D] text-[#F0EDE8] p-2.5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </span>
            </button>
          </motion.div>

        </motion.div>

      </section>

    </div>
  );
};

export default HeroAndFooter;
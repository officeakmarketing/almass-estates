import React from 'react';
import { motion } from 'framer-motion';
import { Banknote, HeartHandshake, Key, LineChart, Scale, Settings } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Banknote,
    title: "Guaranteed rent paid monthly",
    desc: "The same amount. The same date. Every month. Whether your property has a tenant or not."
  },
  {
    id: 2,
    icon: HeartHandshake, // Matches the 'care/handshake' vibe from the image
    title: "All bills and maintenance covered",
    desc: "We assume full responsibility for utility bills and maintenance costs. Your rent comes with no deductions."
  },
  {
    id: 3,
    icon: Key,
    title: "Long-term security",
    desc: "The Renters Rights Bill removes your ability to evict bad tenants easily. Our commercial lease means it does not apply to you."
  },
  {
    id: 4,
    icon: LineChart,
    title: "All property types",
    desc: "Flats, houses, HMOs, blocks, social housing, serviced accommodation. If it is in London, we will manage it."
  },
  {
    id: 5,
    icon: Scale,
    title: "North West & Central London",
    desc: "Deep roots across North West, North, West and Central London. We know these markets better than anyone."
  },
  {
    id: 6,
    icon: Settings,
    title: "£1.8M+ paid in 2025",
    desc: "We do not just promise guaranteed rent. We have proved it. Over £1.8 million paid to our landlords last year."
  }
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  }
};

const WhyChooseUs = () => {
  return (
    <section 
      className="relative w-full min-h-screen bg-[#0D0D0D] py-24 px-6 md:px-12 lg:px-20 2xl:px-32 flex flex-col items-center justify-center font-sans selection:bg-[#C8A96E] selection:text-[#0D0D0D] overflow-hidden"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      {/* Subtle Background Glow to break up the flat black */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mb-16 md:mb-24">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#F0EDE8] text-[#0D0D0D] px-5 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wide mb-6 inline-block"
        >
          Why Choose Us
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-[#F0EDE8] tracking-wide leading-[1.2]"
        >
          EVERYTHING A LANDLORD<br />
          WANTS. NOTHING THEY DON'T.
        </motion.h2>
      </div>

      {/* --- GRID --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }} // Triggers animation slightly before scrolling fully into view
        className="relative z-10 w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <motion.div 
              key={feature.id}
              variants={cardVariants}
              className="group bg-[#141414] border border-[#222222] rounded-[2rem] p-8 md:p-10 flex flex-col hover:bg-[#1A1A1A] hover:border-[#C8A96E]/40 hover:shadow-[0_10px_40px_rgba(200,169,110,0.05)] transition-all duration-500 cursor-default"
            >
              {/* Icon in White Circle */}
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F0EDE8] rounded-full flex items-center justify-center text-[#0D0D0D] mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 ease-out shadow-lg">
                <Icon size={24} strokeWidth={2} className="md:w-7 md:h-7" />
              </div>

              {/* Text Content */}
              <h3 className="text-xl md:text-2xl font-medium text-[#F0EDE8] mb-3 md:mb-4 tracking-tight group-hover:text-[#C8A96E] transition-colors duration-500">
                {feature.title}
              </h3>
              
              <p className="text-[#C8C4BC] text-sm md:text-base leading-relaxed font-light">
                {feature.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
};

export default WhyChooseUs;
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const processSteps = [
  {
    id: "01",
    tab: "STEP 1",
    title: "Property Assessment",
    description: "We conduct a thorough, no-obligation valuation of your property. We analyze the market and present you with a competitive, guaranteed rent offer within 24 hours.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "02",
    tab: "STEP 2",
    title: "Agreement & Setup",
    description: "Once accepted, we handle all the paperwork. We sign a long-term agreement (typically 3-5 years) ensuring your income is locked in, regardless of market fluctuations.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "03",
    tab: "STEP 3",
    title: "We take over completely",
    description: "Keys handed. We manage everything from day one—tenant sourcing, maintenance, and compliance. Your only job is checking your bank account.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeStep]);

  const contentVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      y: -15, 
      transition: { duration: 0.3, ease: "easeIn" } 
    },
  };

  return (
    <section className="bg-brand-black text-white py-24 px-0 md:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16 px-6 md:px-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white text-brand-black px-5 py-1.5 rounded-full text-sm font-medium tracking-wide mb-6"
          >
            Process
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-sans font-medium mb-4"
          >
            How guaranteed rent works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Three steps to guaranteed income and complete peace of mind.
          </motion.p>
        </div>

        {/* Main Card Container - Removed shadow on mobile to fix the blurry texture bug! */}
        <div className="bg-brand-card border-y md:border border-brand-border rounded-none md:rounded-2xl p-5 py-10 md:p-8 shadow-none md:shadow-2xl">
          
          {/* --- Crisp, Optimized Sliding Tabs --- */}
          <div className="max-w-3xl mx-auto mb-10 md:mb-16">
            {/* Removed inner shadow, changed to solid clean background */}
            <div className="grid grid-cols-3 bg-[#111111] p-1.5 md:p-2 rounded-full border border-white/5">
              {processSteps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`relative py-3 md:py-4 px-2 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                      isActive ? "text-brand-black" : "text-gray-500 hover:text-brand-gold"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeProcessTab"
                        // Removed the glowing shadow here to keep it perfectly sharp
                        className="absolute inset-0 bg-brand-gold rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                      <span className="md:hidden font-bold">Step {index + 1}</span>
                      <span className="hidden md:inline">{step.tab}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="relative min-h-[400px] md:min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden border border-brand-border/50 bg-black">
                  <img 
                    src={processSteps[activeStep].image} 
                    alt={processSteps[activeStep].title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent pointer-events-none"></div>
                </div>

                {/* Text Section */}
                <div className="flex flex-col justify-center px-2 pb-6 lg:pb-0 lg:px-0">
                  <span className="text-brand-gold text-2xl font-bold mb-4 font-sans">
                    {processSteps[activeStep].id}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-medium text-white mb-6 leading-tight">
                    {processSteps[activeStep].title}
                  </h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                    {processSteps[activeStep].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
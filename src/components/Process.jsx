import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const processSteps = [
  {
    id: "01",
    tab: "STEP 1",
    title: "Property Assessment",
    description: "We conduct a thorough, no-obligation valuation of your property. We analyze the market and present you with a competitive, guaranteed rent offer within 24 hours.",
    // Using high-end real estate placeholders - replace with your actual assets
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

  // Auto-play logic: Changes every 5 seconds
  // Adding `activeStep` to the dependency array means if the user clicks a tab, 
  // the 5-second timer restarts, preventing sudden jumps right after a click!
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeStep]);

  // Framer Motion variants for smooth crossfading without jumps
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
    <section className="bg-brand-black text-white py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
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

        {/* Main Card Container */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-2 md:p-8 shadow-2xl">
          
          {/* Tabs Navigation */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-8">
            {processSteps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`flex-1 py-4 px-6 rounded-lg font-medium text-sm md:text-base tracking-widest transition-all duration-300 ${
                    isActive 
                      ? "bg-brand-gold text-brand-black shadow-[0_0_20px_rgba(196,164,124,0.3)]" 
                      : "bg-[#2a241c] text-brand-gold/60 hover:bg-[#382f23] hover:text-brand-gold"
                  }`}
                >
                  {step.tab}
                </button>
              );
            })}
          </div>

          {/* Content Area - mode="wait" ensures old content leaves before new enters (NO JUMPS) */}
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
                <div className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden border border-brand-border/50">
                  <img 
                    src={processSteps[activeStep].image} 
                    alt={processSteps[activeStep].title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay to blend image with dark theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent pointer-events-none"></div>
                </div>

                {/* Text Section */}
                <div className="flex flex-col justify-center px-4 pb-6 lg:pb-0 lg:px-0">
                  <span className="text-brand-gold text-2xl font-bold mb-4 font-sans">
                    {processSteps[activeStep].id}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-medium text-white mb-6 leading-tight">
                    {processSteps[activeStep].title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
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
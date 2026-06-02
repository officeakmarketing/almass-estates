import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const processSteps = [
  {
    step: 1,
    title: "We assess your property",
    desc: "One call. We visit, assess and make you a guaranteed rent offer within 72 hours. No obligation.",
    img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    step: 2,
    title: "We sign the agreement",
    desc: "Once accepted, we handle all the paperwork and sign a commercial lease, giving you absolute financial security.",
    img: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    step: 3,
    title: "You start getting paid",
    desc: "Rent hits your bank account on the exact same day every month for the next 3 to 5 years, completely stress-free.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const Process = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="w-full bg-[#0D0D0D] font-sans text-[#F0EDE8] selection:bg-[#C8A96E] selection:text-[#0D0D0D]" style={{ fontFamily: "'Jost', sans-serif" }}>
      
      {/* --- SECTION: PROCESS TABS --- */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto border-t border-[#333333]">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="bg-[#F0EDE8] text-[#0D0D0D] px-5 py-1.5 rounded-full text-sm font-semibold mb-6 inline-block">
            Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#F0EDE8] mb-4">
            How guaranteed rent works
          </h2>
          <p className="text-[#C8C4BC] text-base md:text-lg">
            Three steps to guaranteed income and complete peace of mind.
          </p>
        </div>

        {/* Outer Dark Container */}
        <div className="bg-[#111111] border border-[#222222] rounded-[16px] p-4 md:p-8 lg:p-12 shadow-2xl">
          
          {/* Tab Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-10">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`flex-1 py-4 text-sm font-bold tracking-wide uppercase rounded-[8px] transition-all duration-300 border ${
                  activeStep === step 
                    ? 'bg-[#C8A96E] text-[#0D0D0D] border-[#C8A96E] shadow-lg' 
                    : 'bg-[#1A1A1A] text-[#C8C4BC] border-[#333333] hover:bg-[#222222]'
                }`}
              >
                Step {step}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="relative overflow-hidden min-h-[400px] md:min-h-[450px]">
            <AnimatePresence mode="wait">
              {processSteps.map((item) => (
                item.step === activeStep && (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center absolute inset-0"
                  >
                    {/* Image */}
                    <div className="w-full h-[300px] md:h-full rounded-[8px] overflow-hidden order-2 md:order-1">
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Text Details */}
                    <div className="flex flex-col justify-center order-1 md:order-2 px-2 md:px-8">
                      <span className="text-4xl md:text-5xl font-bold text-[#C8A96E] mb-4">
                        0{item.step}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#F0EDE8] mb-4">
                        {item.title}
                      </h3>
                      <p className="text-[#C8C4BC] text-base md:text-lg leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Process;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import brandConfig from '../config/brand';

const faqs = brandConfig.copy.faq.items;

export default function FAQ() {
  const [openId, setOpenId] = useState("Q1"); // First one open by default

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-brand-black py-24 px-3 sm:px-10 font-sans border-t border-white/5 relative">
      <div className="max-w-[800px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-brand-gold" />
            <span className="text-brand-gold text-xs tracking-widest uppercase font-medium">{brandConfig.copy.faq.tag}</span>
            <div className="w-8 h-[1px] bg-brand-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight">
            {brandConfig.copy.faq.heading}
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden transition-colors duration-300 hover:border-brand-gold/30"
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-8 text-left bg-transparent cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-brand-gold/50 font-light text-xl w-8 shrink-0">{faq.id}</span>
                    <h3 className={`text-lg sm:text-xl font-medium transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`ml-6 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 shrink-0 ${isOpen ? 'border-brand-gold bg-brand-gold/10' : 'border-white/10 bg-[#111]'}`}>
                    {isOpen ? (
                      <Minus size={16} className="text-brand-gold" />
                    ) : (
                      <Plus size={16} className="text-gray-400" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-4 sm:px-8 pb-6 sm:pb-8 pt-0 pl-[3.5rem] sm:pl-[5.5rem]">
                        <p className="text-gray-400 text-base leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

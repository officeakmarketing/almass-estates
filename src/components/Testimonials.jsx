import React from "react";
import { motion } from "framer-motion";
import brandConfig from '../config/brand';

const testimonials = brandConfig.copy.testimonials.items;

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#050505] py-24 px-5 sm:px-10 font-sans border-t border-white/5 relative overflow-hidden">
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-brand-gold" />
            <span className="text-brand-gold text-xs tracking-widest uppercase font-medium">{brandConfig.copy.testimonials.tag}</span>
            <div className="w-8 h-[1px] bg-brand-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium text-white tracking-tight mb-6 leading-[1.1]">
            {brandConfig.copy.testimonials.heading}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            {brandConfig.copy.testimonials.subheading}
          </p>
        </div>

        {/* Proof Strip */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mb-16 max-w-5xl mx-auto">
          {brandConfig.copy.testimonials.proofStrip.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center">
                <span className="text-[#d8c08a] text-sm sm:text-base font-medium tracking-wide">
                  {item}
                </span>
              </div>
              {index < brandConfig.copy.testimonials.proofStrip.length - 1 && (
                <div className="hidden sm:flex items-center">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-gold/50">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Masonry or Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-[#0f0f0f] rounded-xl p-6 sm:p-7 border border-[#1a1a1a] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex flex-col items-start gap-1 mb-5">
                <h3 className="text-white text-[13px] sm:text-[14px] font-bold tracking-[0.1em] uppercase">
                  {t.name}
                </h3>
                <p className="text-[#888] text-[13px] sm:text-[14px] mt-0.5">
                  {t.title}
                </p>
                
                {/* Verified Tag */}
                <div className="mt-2 border border-brand-gold/30 bg-transparent px-2.5 py-1 rounded-full flex items-center gap-2">
                  <svg className="w-3 h-3 text-[#C8A96E]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#C8A96E] text-[10px] font-bold tracking-widest uppercase mt-[1px]">
                    {t.verifiedText}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div className="mb-6 flex-1">
                <p className="text-[#e2e2e2] text-[17px] sm:text-[19px] lg:text-[21px] leading-[1.5] font-serif italic">
                  "{t.text}"
                </p>
              </div>

              {/* Data Boxes */}
              <div className="flex flex-col gap-3 mb-6">
                {/* Gold Stat Box */}
                <div className="border border-[#382f1b] bg-[#14120e] rounded-lg p-3 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] shrink-0" />
                  <span className="text-[#d8c08a] font-medium text-[13px]">
                    {t.statBoxText}
                  </span>
                </div>
                
                {/* Grey Address Boxes */}
                {t.propertyTags && t.propertyTags.map((tag, tagIdx) => {
                  const parts = tag.split('·').map(p => p.trim());
                  return (
                    <div key={tagIdx} className="border border-[#222] bg-[#111] rounded-lg p-2.5 px-3 inline-flex w-max max-w-full overflow-hidden">
                      <span className="text-[#888] text-[12px] truncate">
                        {parts.map((part, idx) => (
                          <React.Fragment key={idx}>
                            {idx > 0 && <> &middot; </>}
                            {idx === 1 ? <span className="text-white font-medium">{part}</span> : part}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Bar */}
              <div className="pt-4 border-t border-[#222] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] shrink-0" />
                  <span className="text-[#C8A96E] font-medium text-[12px]">
                    {t.bottomBarLeft}
                  </span>
                </div>
                <span className="text-[#555] text-[11px] font-bold tracking-[0.15em] uppercase">
                  {t.bottomBarRight}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Risk Reversal Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center flex flex-col items-center px-4"
        >
          <p className="text-white text-lg sm:text-xl md:text-2xl font-medium tracking-wide max-w-3xl mb-4 leading-relaxed">
            {brandConfig.copy.testimonials.riskReversal.text}
          </p>
          <p className="text-[#888] text-xs sm:text-sm tracking-widest uppercase font-bold">
            {brandConfig.copy.testimonials.riskReversal.subtext}
          </p>
        </motion.div>

      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import brandConfig from '../config/brand';

const painPoints = brandConfig.copy.painPoints.items;

const PainPoints = () => {
  return (
    <section className="w-full bg-[#050505] py-20 lg:py-28 px-5 sm:px-10 font-sans">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Centered Header */}
        <div className="text-center mb-20 md:mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-brand-gold" />
            <span className="text-brand-gold text-xs tracking-widest uppercase font-medium">{brandConfig.copy.painPoints.tag}</span>
            <div className="w-8 h-[1px] bg-brand-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#F5F5F5] tracking-tight mb-6">
            {brandConfig.copy.painPoints.heading1}<span className="text-brand-gold italic font-medium">{brandConfig.copy.painPoints.headingHighlight}</span>
          </h2>
          <p className="text-[#888] text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {brandConfig.copy.painPoints.subheading}
          </p>
        </div>

        {/* 2x2 Typography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-24 lg:gap-y-20">
          {painPoints.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className="flex flex-col group"
            >
              {/* Top border that expands on hover */}
              <div className="w-full h-[1px] bg-[#222] mb-6 relative">
                <div className="absolute top-0 left-0 h-full bg-brand-gold w-0 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
              
              <span className="text-brand-gold text-sm tracking-widest font-medium mb-4">{point.num}</span>
              <h3 className="text-2xl lg:text-3xl font-medium text-[#EAEAEA] mb-4 tracking-wide leading-tight">
                {point.title}
              </h3>
              <p className="text-[#888] text-base lg:text-lg leading-relaxed font-light">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PainPoints;
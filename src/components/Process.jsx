import { motion } from "framer-motion";
import brandConfig from '../config/brand';

const processSteps = brandConfig.copy.process.items;

export default function Process() {
  return (
    <section className="bg-brand-black py-24 px-5 sm:px-10 font-sans border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 lg:mb-28">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-brand-gold" />
            <span className="text-brand-gold text-xs tracking-widest uppercase font-medium">{brandConfig.copy.process.tag}</span>
            <div className="w-8 h-[1px] bg-brand-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium text-white tracking-tight mb-6 leading-[1.1]">
            {brandConfig.copy.process.heading}
          </h2>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="flex flex-col pt-8 border-t border-white/10 relative"
            >
              {/* Subtle Gold Accent Line */}
              <div className="absolute top-[-1px] left-0 w-16 h-[2px] bg-brand-gold" />

              {/* Huge Number */}
              <div className="text-5xl lg:text-6xl font-light text-brand-gold mb-6 tracking-tighter">
                {step.id}
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-medium text-white tracking-wide mb-5">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-[#a1a1aa] text-lg lg:text-xl leading-relaxed font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
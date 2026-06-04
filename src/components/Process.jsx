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

        {/* 3 Column Open Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col cursor-pointer"
            >
              {/* Portrait Image (No borders) */}
              <div className="w-full aspect-[4/5] overflow-hidden rounded-xl mb-8 relative">
                <div className="absolute inset-0  mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-700" />
<img 
  src={step.image} 
  alt={step.title}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
  style={step.id === "02" ? { objectPosition: "30% 0%" } : { objectPosition: "center" }}
/>
              </div>

              {/* Minimalist Typography */}
              <div className="flex gap-4 items-start mb-4">
                <span className="text-brand-gold text-xl font-light mt-0.5">{step.id}</span>
                <h3 className="text-2xl lg:text-3xl font-medium text-[#EAEAEA] tracking-wide group-hover:text-white transition-colors duration-500">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-400 text-base leading-relaxed font-light pl-9">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
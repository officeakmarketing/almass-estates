import { motion } from "framer-motion";

const processSteps = [
  {
    id: "01",
    title: "Step 1",
    description: "Submit your property details. Takes less than 60 seconds. Our system instantly checks your property across North West, North, West and Central London.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "02",
    title: "Step 2",
    description: "Receive your result by email within minutes. Match found we confirm interest and next steps. No match we add you to our priority waiting list.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "03",
    title: "Step 3",
    description: "A member of our team visits your property, assesses its value and makes you a guaranteed rent offer within 72 hours. No obligation. Completely free.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
  }
];

export default function Process() {
  return (
    <section className="bg-brand-black py-24 px-5 sm:px-10 font-sans border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 lg:mb-28">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-brand-gold" />
            <span className="text-brand-gold text-xs tracking-widest uppercase font-medium">How It Works — 3 Steps</span>
            <div className="w-8 h-[1px] bg-brand-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium text-white tracking-tight mb-6 leading-[1.1]">
            From submission to guaranteed income.
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
                <div className="absolute inset-0 bg-brand-black/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-700" />
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
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
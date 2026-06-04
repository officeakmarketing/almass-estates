import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "IMF PROPERTY INVESTMENTS LTD",
    title: "Mohammed Imran — Director",
    text: "Almass Estates has never missed a payment, with all rents paid on or before the due date without exception. The property has been kept in excellent condition with no complaints from neighbours or third parties.",
    statBoxText: "£4,000/month guaranteed since Dec 2024",
    addressBoxText: (
      <>
        60 Sturgess Avenue &middot; <span className="text-white font-medium">5-bed house</span> &middot; £4,000/mo
      </>
    ),
    bottomBarLeft: "Zero missed payments since Dec 2024",
    bottomBarRight: "FORMAL LETTER",
    verifiedText: "VERIFIED REFERENCE"
  },
  {
    id: 2,
    name: "LISA MATTHEWS",
    title: "Landlord — Barnet",
    text: "Totally impressed with Almass Estates, particularly Coen. Such a professional service I completely felt in safe hands. He found a tenant that moved in within 9 days.",
    statBoxText: "Tenant secured and moved in within 9 days",
    addressBoxText: (
      <>
        Barnet &middot; <span className="text-white font-medium">Residential Property</span> &middot; Fast Let
      </>
    ),
    bottomBarLeft: "Zero void periods",
    bottomBarRight: "GOOGLE REVIEW",
    verifiedText: "VERIFIED REFERENCE"
  },
  {
    id: 3,
    name: "FASIHULLAH QAZI",
    title: "Repeat Client",
    text: "Have worked with Coen over a year. Very professional, amazing communication. Have closed many deals looking forward to more.",
    statBoxText: "Multiple successful deals closed over 1+ years",
    addressBoxText: (
      <>
        Portfolio Landlord &middot; <span className="text-white font-medium">Multiple Properties</span>
      </>
    ),
    bottomBarLeft: "Consistent performance",
    bottomBarRight: "GOOGLE REVIEW",
    verifiedText: "VERIFIED CLIENT"
  },
  {
    id: 4,
    name: "EBILA B",
    title: "Verified Client",
    text: "It was an absolute pleasure working with Almass Estates. Communication was brilliant and I was regularly reassured throughout the whole process.",
    statBoxText: "Seamless communication and complete reassurance",
    addressBoxText: (
      <>
        London &middot; <span className="text-white font-medium">Guaranteed Rent</span>
      </>
    ),
    bottomBarLeft: "100% Peace of mind",
    bottomBarRight: "TRUSTPILOT",
    verifiedText: "VERIFIED CLIENT"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#050505] py-24 px-5 sm:px-10 font-sans border-t border-white/5 relative overflow-hidden">
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-brand-gold" />
            <span className="text-brand-gold text-xs tracking-widest uppercase font-medium">Testimonials</span>
            <div className="w-8 h-[1px] bg-brand-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium text-white tracking-tight mb-6 leading-[1.1]">
            London landlords who stopped worrying.
          </h2>
        </div>

        {/* Masonry or Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
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
                <div className="mt-2 border border-[#233a2a] bg-transparent px-2.5 py-1 rounded-full flex items-center gap-2">
                  <svg className="w-3 h-3 text-[#5bb98b]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#5bb98b] text-[10px] font-bold tracking-widest uppercase mt-[1px]">
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
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5bb98b] shrink-0" />
                  <span className="text-[#d8c08a] font-medium text-[13px]">
                    {t.statBoxText}
                  </span>
                </div>
                
                {/* Grey Address Box */}
                <div className="border border-[#222] bg-[#111] rounded-lg p-2.5 px-3 inline-flex w-max max-w-full overflow-hidden">
                  <span className="text-[#888] text-[12px] truncate">
                    {t.addressBoxText}
                  </span>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-4 border-t border-[#222] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5bb98b] shrink-0" />
                  <span className="text-[#5bb98b] font-medium text-[12px]">
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

      </div>
    </section>
  );
}

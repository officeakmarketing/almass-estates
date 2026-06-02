import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle, ArrowUpRight } from 'lucide-react';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reduced from 40 → 15 particles; positions are stable (useMemo)
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 15 + 10}s`,
      delay: `${Math.random() * 5}s`
    }));
  }, []);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // Premium input styling class
  const inputClass = "w-full bg-[#050505] text-[#F0EDE8] placeholder-[#666666] border border-[#222222] rounded-2xl p-4 focus:outline-none focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E]/30 transition-all duration-300 font-light text-base shadow-inner";

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-[#030303] selection:bg-[#C8A96E] selection:text-[#0D0D0D] antialiased overflow-hidden z-20"
      style={{ fontFamily: "'Jost', sans-serif" }}
    >
      {/* --- BACKGROUND: cheap radial-gradient orb (replaces expensive blur-[100px]) --- */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)'
        }}
      />

      {/* --- FLOATING PARTICLES (15, GPU-composited via will-change) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute bg-white/80 rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              willChange: 'transform, opacity',
              animation: `float-particle ${p.duration} infinite linear ${p.delay}`
            }}
          />
        ))}
      </div>

      {/* --- MAIN FORM CARD --- */}
      <div className="relative z-10 w-full max-w-[800px]">

        {/* Glassmorphism Card */}
        <div className="bg-[#0D0D0D]/90 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-black border border-white/10 relative overflow-hidden">

          {/* Subtle top highlight line for depth */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 md:p-12"
              >
                {/* HEADINGS */}
                <div className="text-center mb-10">
                  <h2 className="text-[#F0EDE8] text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] mb-5 tracking-tight">
                    Find Out If We Can<br className="hidden md:block"/> Guarantee Your Rent.
                  </h2>
                  <p className="text-[#C8C4BC] text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                    Fill in your property details. Our system instantly checks if your property matches our current requirements.
                  </p>
                </div>

                {/* TRUST STRIP */}
                <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 mb-12 text-[13px] md:text-sm font-light text-[#C8C4BC] bg-[#050505] py-4 px-6 rounded-2xl border border-white/5 shadow-inner">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <ShieldCheck size={18} className="text-[#C8A96E]" />
                    100+ Landlords
                  </span>
                  <div className="hidden md:block w-px h-4 bg-[#333333]"></div>

                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <ShieldCheck size={18} className="text-[#C8A96E]" />
                    £1.8M paid in 2025
                  </span>
                  <div className="hidden lg:block w-px h-4 bg-[#333333]"></div>

                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <ShieldCheck size={18} className="text-[#C8A96E]" />
                    3-5 year leases
                  </span>
                  <div className="hidden md:block w-px h-4 bg-[#333333]"></div>

                  <span className="flex items-center gap-2 whitespace-nowrap text-[#C8A96E] font-medium">
                    Instant response
                  </span>
                </div>

                {/* FORM FIELDS */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" required placeholder="First Name" className={inputClass} />
                    <input type="text" required placeholder="Last Name" className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="email" required placeholder="Email Address" className={inputClass} />
                    <input type="tel" required placeholder="Phone Number" className={inputClass} />
                  </div>

                  <input type="text" required placeholder="Property Postcode" className={inputClass} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative group">
                      <select required className={`${inputClass} appearance-none cursor-pointer`} defaultValue="">
                        <option value="" disabled className="text-[#666666]">Property Type</option>
                        <option value="flat" className="bg-[#111111] text-[#F0EDE8]">Flat / Apartment</option>
                        <option value="house" className="bg-[#111111] text-[#F0EDE8]">House</option>
                        <option value="hmo" className="bg-[#111111] text-[#F0EDE8]">HMO</option>
                        <option value="block" className="bg-[#111111] text-[#F0EDE8]">Block of Flats</option>
                      </select>
                    </div>

                    <div className="relative group">
                      <select required className={`${inputClass} appearance-none cursor-pointer`} defaultValue="">
                        <option value="" disabled className="text-[#666666]">Number of Bedrooms</option>
                        <option value="1" className="bg-[#111111] text-[#F0EDE8]">1 Bedroom</option>
                        <option value="2" className="bg-[#111111] text-[#F0EDE8]">2 Bedrooms</option>
                        <option value="3" className="bg-[#111111] text-[#F0EDE8]">3 Bedrooms</option>
                        <option value="4+" className="bg-[#111111] text-[#F0EDE8]">4+ Bedrooms</option>
                      </select>
                    </div>
                  </div>

                  {/* GDPR Checkbox */}
                  <div className="flex items-start gap-3.5 mt-8 mb-10">
                    <div className="relative flex items-center pt-0.5">
                      <input
                        type="checkbox"
                        required
                        id="gdpr"
                        className="peer w-5 h-5 cursor-pointer appearance-none rounded-md border border-[#444] hover:border-[#C8A96E] bg-[#050505] checked:border-[#C8A96E] checked:bg-[#C8A96E] transition-all shrink-0"
                      />
                      <svg className="absolute w-5 h-5 p-[3px] text-[#0D0D0D] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <label htmlFor="gdpr" className="text-[13px] md:text-sm text-[#C8C4BC] leading-relaxed cursor-pointer select-none font-light">
                      I consent to my data being processed in accordance with the{' '}
                      <a href="https://almassestates.co.uk/privacy" target="_blank" rel="noreferrer" className="text-[#C8A96E] hover:text-[#e3c58b] hover:underline underline-offset-4 transition-all font-medium">
                        Privacy Policy
                      </a>.
                    </label>
                  </div>

                  {/* CTA BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full flex items-center justify-between md:justify-center md:gap-4 bg-[#C8A96E] text-[#0D0D0D] pl-6 pr-2 py-2 rounded-full text-lg font-medium hover:bg-[#d6b980] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:active:scale-100 shadow-[0_0_30px_rgba(200,169,110,0.1)]"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse tracking-wide mr-4">Checking Requirements...</span>
                    ) : (
                      <span className="tracking-wide">Check My Property Now</span>
                    )}

                    <span className="bg-[#0D0D0D] text-[#C8A96E] p-3 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shrink-0">
                      <ArrowUpRight size={22} strokeWidth={2.5} />
                    </span>
                  </button>
                </form>
              </motion.div>
            ) : (
              /* ON-SUBMIT SUCCESS MESSAGE */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="p-8 md:p-16 flex flex-col items-center justify-center text-center min-h-[500px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                >
                  <div className="w-24 h-24 rounded-full bg-[#C8A96E]/10 flex items-center justify-center mb-8 border border-[#C8A96E]/20 shadow-[0_0_30px_rgba(200,169,110,0.15)]">
                    <CheckCircle size={48} className="text-[#C8A96E]" strokeWidth={2} />
                  </div>
                </motion.div>
                <h2 className="text-[#F0EDE8] text-3xl md:text-4xl font-medium mb-4 tracking-tight">
                  Checking your property now.
                </h2>
                <p className="text-[#C8C4BC] text-lg md:text-xl max-w-md font-light leading-relaxed">
                  You will receive an email from our team within the next few minutes.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Form;
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Lock,
  ArrowDown,
} from "lucide-react";
import brandConfig from '../config/brand';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "Flat",
    bedrooms: "Studio",
    currentSituation: "Empty",
    gdpr: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.gdpr) return;
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      propertyAddress: "",
      propertyType: "Flat",
      bedrooms: "Studio",
      currentSituation: "Empty",
      gdpr: false,
    });
  };

  const heroCopy = brandConfig.copy.hero;

  return (
    <section id="hero" className="relative w-full min-h-[100dvh] bg-[#050505] flex items-center justify-center py-6  sm:px-10 font-sans z-10">
      {/* Background glow to anchor the layout */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative w-full max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-24 pt-12 lg:pt-0">
        {/* Left: Copy & Value Prop */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="w-full lg:w-[55%] flex flex-col pt-10 lg:pt-0 px-3"
        >
          <h1 className="text-[2.5rem] sm:text-5xl lg:text-[4.5rem] font-medium leading-[1.1] mb-5 lg:mb-6 text-white tracking-tight">
            <span className="text-brand-gold italic pr-1.5">{heroCopy.heading1}</span><br className="hidden sm:block" />{" "}
            {heroCopy.heading2} <br /> {heroCopy.heading3}
          </h1>

          <p className="text-gray-400 text-base sm:text-lg mb-8 lg:mb-10 max-w-lg leading-relaxed font-light">
            {heroCopy.subheading}
          </p>

          {/* Option 4: Subtle Glow Rectangle */}
          <motion.div variants={fadeUp}>
            <a
              href="#testimonials"
              className="group relative flex items-center gap-4 px-7 py-3.5 border border-brand-gold/40 rounded-xl bg-[#0a0a0a] transition-all duration-300 w-max overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 text-[14px] text-brand-gold font-medium tracking-wide transition-colors">
                {heroCopy.ctaButton}
              </span>
              <div className="relative z-10 w-[1px] h-4 bg-[#333] group-hover:bg-brand-gold/30 transition-colors" />
              <ArrowDown size={16} className="relative z-10 text-brand-gold transition-all" strokeWidth={2} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right: The High-Trust Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-[45%] bg-[#0a0a0a] sm:rounded-[2rem] p-4 sm:p-10 border border-white/5 shadow-2xl relative"
        >
          {isSubmitted ? (
            /* Success State */
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 border border-brand-gold/20">
                <CheckCircle2 className="text-brand-gold w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                {heroCopy.successHeading}
              </h3>
              <p className="text-gray-400 text-base font-light mb-8 max-w-sm mx-auto">
                {heroCopy.successMessage}
              </p>
              <button
                onClick={resetForm}
                className="text-brand-gold hover:text-white transition-colors text-sm uppercase tracking-widest font-medium"
              >
                {heroCopy.submitAnother}
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl text-white font-medium mb-2">
                {heroCopy.formHeading}
              </h3>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all text-sm"
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full sm:w-1/2 bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="Flat">Flat</option>
                  <option value="House">House</option>
                  <option value="HMO">HMO</option>
                  <option value="Block">Block</option>
                  <option value="Other">Other</option>
                </select>
                <select
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full sm:w-1/2 bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="Studio">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5+">5+ Bedrooms</option>
                </select>
              </div>

              <select
                name="currentSituation"
                value={formData.currentSituation}
                onChange={handleChange}
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all text-sm appearance-none cursor-pointer"
              >
                <option value="Empty">Empty</option>
                <option value="Self managing">Self managing</option>
                <option value="With agent">With agent</option>
                <option value="Other">Other</option>
              </select>

              <input
                required
                type="text"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
                placeholder="Property Address"
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all text-sm"
              />

              <label className="flex items-start gap-3 mt-3 cursor-pointer group">
                <div className="relative flex items-center justify-center shrink-0">
                  <input
                    required
                    type="checkbox"
                    name="gdpr"
                    checked={formData.gdpr}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border border-white/20 rounded bg-[#111] peer-checked:bg-brand-gold peer-checked:border-brand-gold transition-colors"></div>
                  <CheckCircle2
                    className="absolute w-4 h-4 text-brand-black opacity-0 peer-checked:opacity-100 transition-opacity"
                    strokeWidth={3}
                  />
                </div>
                <span className="text-xs text-gray-400 leading-relaxed font-light">
                  I agree to the processing of my data in accordance with the{' '}
                  <a href={heroCopy.gdprLink} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">
                    privacy policy
                  </a>.
                </span>
              </label>

              <button
                type="submit"
                className="w-full group bg-brand-gold text-brand-black py-3 rounded-xl text-base font-medium hover:bg-white transition-all shadow-[0_0_20px_rgba(196,164,124,0.15)] mt-2 flex items-center justify-center gap-2"
              >
                {heroCopy.submitButton}{" "}
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

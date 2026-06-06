import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Lock,
  ArrowDown,
  ArrowRight
} from "lucide-react";
import brandConfig from '../config/brand';
import TrustStrip from './TrustStrip';

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
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing again
    if (formError) setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.gdpr) {
      setFormError("Please accept the privacy policy to continue.");
      return;
    }
    setFormError("");
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
    setStep(1);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        setFormError("Please fill in all fields to continue.");
        return;
      }
      setFormError("");
      setStep(2);
    }
  };

  const heroCopy = brandConfig.copy.hero;

  return (
    <section id="hero" className="relative w-full bg-[#050505] flex flex-col font-sans z-10">
      {/* Hero 100vh Wrapper (only contains main content, not desktop trust strip) */}
      <div className="relative w-full min-h-[100dvh] flex flex-col">
        {/* Background glow to anchor the layout */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Top Logo */}
      <div className="absolute top-6 left-0 w-full flex justify-center sm:top-8 sm:left-10 sm:w-auto sm:block lg:top-8 lg:left-10 z-30">
        <img src="/images/logo.png" alt="Almass Estates" className="h-16 sm:h-16 lg:h-20 opacity-95 object-contain drop-shadow-[0_0_15px_rgba(200,169,110,0.15)]" />
      </div>

      {/* Main Hero Content */}
      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center w-full max-w-[1300px] mx-auto gap-8 lg:gap-12 xl:gap-20 pt-28 lg:pt-0 pb-8 lg:pb-0 px-4 sm:px-10 relative">
        {/* Left: Copy & Value Prop */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left lg:mt-16"
        >
          <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4.5rem] 2xl:text-[5rem] font-medium 2xl:font-semibold leading-[1.1] mb-3 lg:mb-4 xl:mb-6 text-white tracking-tight">
            <span className="hidden sm:inline">
              <span className="text-gradient-gold italic pr-1.5">{heroCopy.heading1}</span><br />
              {heroCopy.heading2} <br /> {heroCopy.heading3}
            </span>
            <span className="inline sm:hidden">
              <span className="text-gradient-gold italic pr-1.5">Guaranteed rent</span><br />
              Stop Managing <br /> Start Collecting
            </span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-lg mb-4 lg:mb-6 xl:mb-10 max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
            {heroCopy.subheading}
          </p>

         
        </motion.div>

        {/* Right: The High-Trust Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-[45%] sleek-card px-4 py-6 sm:p-8 lg:p-6 xl:px-8 xl:py-4 relative h-auto"
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-2 relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg sm:text-2xl text-white font-medium">
                  {isMobile ? (step === 1 ? "About You" : "Property Details") : heroCopy.formHeading}
                </h3>
                {isMobile && (
                  <div className="flex flex-col items-end gap-1.5 mt-1 sm:mt-0">
                    <div className="text-brand-gold text-xs font-medium leading-none">Step {step} of 2</div>
                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-gold transition-all duration-300" 
                        style={{ width: step === 1 ? '50%' : '100%' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {formError && (
                <div className="text-red-400 text-xs sm:text-sm font-medium px-3 py-2 bg-red-400/10 rounded border border-red-400/20">
                  {formError}
                </div>
              )}

              {/* Step 1: About Information */}
              {(!isMobile || step === 1) && (
                <div className="flex flex-col gap-2 sm:gap-4 lg:gap-3 xl:gap-4 pt-2 sm:pt-0">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                  <input
                    required={!isMobile || step === 1}
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white placeholder-gray-500 text-sm"
                  />
                </div>

                <div className="flex flex-row gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                  <input
                    required={!isMobile || step === 1}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="sleek-input w-1/2 px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white placeholder-gray-500 text-sm"
                  />
                  <input
                    required={!isMobile || step === 1}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="sleek-input w-1/2 px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white placeholder-gray-500 text-sm"
                  />
                </div>

                {isMobile && step === 1 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="sleek-btn w-full flex items-center justify-center gap-2 group py-3 text-sm font-medium mt-2"
                  >
                    Next Step <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
              )}

              {/* Step 2: Property Information */}
              {(!isMobile || step === 2) && (
                <div className="flex flex-col gap-2 sm:gap-4 lg:gap-3 xl:gap-4">
                  <div className="flex flex-row gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="sleek-input w-1/2 px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
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
                    className="sleek-input w-1/2 px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
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
                  className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
                >
                  <option value="Empty">Empty</option>
                  <option value="Self managing">Self managing</option>
                  <option value="With agent">With agent</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  required={!isMobile || step === 2}
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  placeholder="Property Address"
                  className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white placeholder-gray-500 text-sm"
                />

                <label className="flex items-start gap-3 mt-1 sm:mt-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center shrink-0">
                    <input
                      required={!isMobile || step === 2}
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
                  <span className="text-[11px] sm:text-xs text-gray-400 leading-tight font-light">
                    I agree to the processing of my data in accordance with the{' '}
                    <a href={heroCopy.gdprLink} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">
                      privacy policy
                    </a>.
                  </span>
                </label>

                <div className="flex flex-col gap-1 sm:gap-2 mt-2 sm:mt-4">
                  {heroCopy.submitButtonTopMicro && (
                    <div className="text-center text-[11px] sm:text-xs font-medium text-brand-gold/90 uppercase tracking-widest">
                      {heroCopy.submitButtonTopMicro}
                    </div>
                  )}
                  <div className="flex gap-2 w-full">
                    {isMobile && step === 2 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="sleek-btn w-1/3 flex items-center justify-center bg-transparent border border-white/10 hover:bg-white/5 py-3 text-sm font-medium"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="submit"
                      className={`sleek-btn flex items-center justify-center gap-2 group py-2.5 sm:py-3 text-sm sm:text-base font-medium ${isMobile && step === 2 ? 'w-2/3' : 'w-full'}`}
                    >
                      {heroCopy.submitButton}{" "}
                      <ArrowUpRight
                        size={18}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </button>
                  </div>
                  {heroCopy.submitButtonBottomMicro && (
                    <div className="text-center text-[11px] sm:text-xs text-gray-400 font-light mt-0.5 sm:mt-1">
                      {heroCopy.submitButtonBottomMicro}
                    </div>
                  )}
                  <div className="text-center text-[11px] sm:text-xs text-brand-gold font-medium mt-1 sm:mt-1.5">
                    Join 100+ London landlords already on the programme
                  </div>
                </div>
              </div>
              )}
            </form>
          )}
        </motion.div>
      </div>
      
        {/* Mobile TrustStrip (Inside 100vh Wrapper) */}
        <div className={`mt-auto w-full flex flex-col sm:hidden ${isMobile && step === 2 && !isSubmitted ? 'pt-12' : ''}`}>
          <TrustStrip />
          {step !== 1 && (
            <div className="w-full py-3 sm:py-4 text-center px-4">
              <p className="text-gray-400 text-[10px] sm:text-xs font-light tracking-widest uppercase">
                Currently accepting properties across North West, North, West and Central London — <span className="text-brand-gold font-medium">limited availability</span>
              </p>
            </div>
          )}
        </div>
      </div> {/* End 100vh Wrapper */}

      {/* Desktop TrustStrip (After 100vh) */}
      <div className="hidden sm:flex w-full flex-col bg-[#050505]">
        <TrustStrip />
        <div className="w-full py-3 sm:py-4 text-center px-4">
          <p className="text-gray-400 text-[10px] sm:text-xs font-light tracking-widest uppercase">
            Currently accepting properties across North West, North, West and Central London — <span className="text-brand-gold font-medium">limited availability</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import brandConfig from '../config/brand';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "Flat",
    bedrooms: "Studio",
    propertyArea: "North",
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
    if (formError) setFormError("");
  };

  const validateContactInfo = () => {
    const { fullName, email, phone } = formData;
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      return "Please fill in all contact fields.";
    }
    if (fullName.trim().length < 2 || !/^[A-Za-z\s\-']+$/.test(fullName.trim())) {
      return "Please enter a valid full name (letters only).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    
    const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
    const isUKLocal = /^0\d{9,10}$/.test(phoneClean);
    const isInternational = /^\+?[1-9]\d{6,14}$/.test(phoneClean);
    
    if (!isUKLocal && !isInternational) {
      return "Please enter a valid, realistic phone number (e.g., 07123456789 or +44...).";
    }
    
    return "";
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      const error = validateContactInfo();
      if (error) {
        setFormError(error);
        return;
      }
      setFormError("");
      setStep(2);
    }
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
      propertyArea: "North",
      currentSituation: "Empty",
      gdpr: false,
    });
    setStep(1);
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const contactError = validateContactInfo();
    if (contactError) {
      setFormError(contactError);
      return;
    }

    if (!formData.propertyType || formData.propertyType.trim() === "") {
      setFormError("Please select a property type.");
      return;
    }

    if (!formData.bedrooms || formData.bedrooms.trim() === "") {
      setFormError("Please select the number of bedrooms.");
      return;
    }

    if (!formData.currentSituation || formData.currentSituation.trim() === "") {
      setFormError("Please select your current situation.");
      return;
    }

    if (!formData.propertyArea || formData.propertyArea.trim() === "") {
      setFormError("Please select a property area.");
      return;
    }

    if (!formData.propertyAddress.trim() || formData.propertyAddress.trim().length < 5) {
      setFormError("Please enter a valid and complete property address.");
      return;
    }

    if (!formData.gdpr) {
      setFormError("Please accept the privacy policy to continue.");
      return;
    }

    setFormError("");
    
    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      property_type: formData.propertyType,
      bedrooms: formData.bedrooms,
      current_situation: formData.currentSituation,
      property_area: formData.propertyArea,
      property_address: formData.propertyAddress
    };
  
    try {                         
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("API submission failed.");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission Error:", error);
      setFormError("There was a problem submitting your request. Please try again.");
    }
  };

  const heroCopy = brandConfig.copy.hero;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full lg:w-[45%] sleek-card px-4 py-6 sm:p-8 lg:p-6 xl:px-8 xl:py-4 relative h-auto"
    >
      {isSubmitted ? (
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

            <select
              name="propertyArea"
              value={formData.propertyArea}
              onChange={handleChange}
              className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
              required={!isMobile || step === 2}
            >
              <option value="North West">North West</option>
              <option value="North">North</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
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
  );
};

export default LeadForm;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import brandConfig from "../config/brand";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "Flat",
    bedrooms: "1",
    bathrooms: "1",
    enSuite: "No",
    wcs: "0",
    livingRooms: "1",
    furnishedState: "Furnished",
    parking: "No",
    garden: "No",
    licenceType: "None",
    // Flat only
    balcony: "No",
    floor: "1",
    lift: "No",
    gdpr: false,
  });

  const [submissionState, setSubmissionState] = useState("idle"); // "idle", "loading", "success", "error"
  const [quoteData, setQuoteData] = useState({ 
    minRent: null, 
    maxRent: null,
    annualIncome: null,
    marketRentLow: null,
    marketRentHigh: null,
    confidenceScore: null,
    confidenceReason: null
  });
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
    if (
      fullName.trim().length < 2 ||
      !/^[A-Za-z\s\-']+$/.test(fullName.trim())
    ) {
      return "Please enter a valid full name (letters only).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Please enter a valid email address.";
    }

    const phoneClean = phone.replace(/[\s\-\(\)]/g, "");
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
    setSubmissionState("idle");
    setQuoteData({
      minRent: null, 
      maxRent: null,
      annualIncome: null,
      marketRentLow: null,
      marketRentHigh: null,
      confidenceScore: null,
      confidenceReason: null
    });
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      propertyAddress: "",
      propertyType: "Flat",
      bedrooms: "1",
      bathrooms: "1",
      enSuite: "No",
      wcs: "0",
      livingRooms: "1",
      furnishedState: "Furnished",
      parking: "No",
      garden: "No",
      licenceType: "None",
      balcony: "No",
      floor: "1",
      lift: "No",
      gdpr: false,
    });
    setStep(1);
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.propertyAddress.trim()) {
      setFormError("Please enter your full property address.");
      return;
    }
    
    if (formData.bedrooms !== "Studio" && formData.bedrooms !== "6+" && (isNaN(parseInt(formData.bedrooms)) || parseInt(formData.bedrooms) < 1)) {
      setFormError("Please enter a valid number of bedrooms.");
      return;
    }
    
    if (isNaN(parseInt(formData.bathrooms)) || parseInt(formData.bathrooms) < 1) {
      setFormError("Please enter a valid number of bathrooms.");
      return;
    }
    
    if (isNaN(parseInt(formData.livingRooms)) || parseInt(formData.livingRooms) < 0) {
      setFormError("Please enter a valid number of living rooms.");
      return;
    }
    
    if (isNaN(parseInt(formData.wcs)) || parseInt(formData.wcs) < 0) {
      setFormError("Please enter a valid number of WCs.");
      return;
    }

    if (formData.propertyType === "Flat") {
      if (formData.floor === "" || isNaN(parseInt(formData.floor))) {
        setFormError("Please enter a valid floor level.");
        return;
      }
    }

    if (!formData.gdpr) {
      setFormError("Please accept the privacy policy to continue.");
      return;
    }

    setFormError("");
    setSubmissionState("loading");

    const payload = { ...formData };
    if (payload.propertyType !== "Flat") {
      payload.floor = null;
    }

    try {
      const response = await fetch(
        "/api/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("API submission failed.");
      }
      
      const data = await response.json().catch(() => ({}));
      
      if (data && data.success) {
        setQuoteData({ 
          minRent: data.minRent,
          maxRent: data.maxRent,
          annualIncome: data.annualIncome,
          marketRentLow: data.marketRentLow,
          marketRentHigh: data.marketRentHigh,
          confidenceScore: data.confidenceScore,
          confidenceReason: data.confidenceReason
        });
        setSubmissionState("success");
      } else {
        setSubmissionState("error");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmissionState("error");
    }
  };

  const handleMouseEnter = () => {
    document.body.style.overflow = 'hidden';
  };

  const handleMouseLeave = () => {
    document.body.style.overflow = '';
  };

  // Ensure body scroll is restored if the component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const heroCopy = brandConfig.copy.hero;
  const isFlat = formData.propertyType === "Flat";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={(e) => {
        // Prevent scroll events from bubbling up to the window
        e.stopPropagation();
      }}
      className="w-full lg:w-[45%] sleek-card px-4 py-6 sm:p-8 lg:p-6 xl:px-8 xl:py-4 relative h-auto"
    >

      {submissionState === "loading" ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-brand-gold/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-brand-gold rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-brand-gold/20 rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-gold rounded-sm"></div>
              </div>
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-medium text-white mb-3">
            Analysing your property...
          </h3>
          <p className="text-gray-400 text-sm font-light max-w-sm mx-auto">
            Please wait while we generate your estimated offer based on live market data.
          </p>
        </div>
      ) : submissionState === "success" ? (
        <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12">
          <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-4 border border-brand-gold/20">
            <CheckCircle2 className="text-brand-gold w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-medium text-white mb-6">
            Your Estimated Offer
          </h3>
          
          <div className="w-full space-y-4 mb-8">
            {/* Guaranteed Rent Offer */}
            <div className="p-5 bg-brand-gold/10 rounded-lg border border-brand-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.15)] flex flex-col sm:flex-row justify-between items-center">
              <div className="text-brand-gold text-sm uppercase tracking-widest font-medium mb-1 sm:mb-0">Guaranteed Rent Offer</div>
              <div className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                {quoteData.minRent && quoteData.maxRent ? `£${Number(quoteData.minRent).toLocaleString()} - £${Number(quoteData.maxRent).toLocaleString()}` : "£---"} <span className="text-sm text-gray-400 font-light lowercase">/ month</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Annual Income */}
              <div className="p-4 bg-[#111] rounded-lg border border-white/10 flex flex-col justify-center">
                <div className="text-gray-400 text-xs uppercase tracking-widest font-medium mb-1">Est. Annual Income</div>
                <div className="text-xl font-light text-white tracking-tight">
                  {quoteData.annualIncome ? `£${Number(quoteData.annualIncome).toLocaleString()}` : "£---"} <span className="text-xs text-gray-500 font-light lowercase">/ year</span>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="p-4 bg-[#111] rounded-lg border border-white/10 flex flex-col justify-center">
                <div className="text-gray-400 text-xs uppercase tracking-widest font-medium mb-1">Confidence Score</div>
                <div className="text-xl font-light text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
                  <div className={`w-2 h-2 rounded-full ${quoteData.confidenceScore === 'High' ? 'bg-green-500' : quoteData.confidenceScore === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                  {quoteData.confidenceScore || "---"}
                </div>
              </div>
            </div>

            {/* Open Market Range */}
            <div className="p-4 bg-[#111] rounded-lg border border-white/10 flex flex-col sm:flex-row justify-between items-center">
              <div className="text-gray-400 text-xs uppercase tracking-widest font-medium mb-1 sm:mb-0">Est. Open Market Rent</div>
              <div className="text-lg font-light text-white tracking-tight">
                {quoteData.marketRentLow && quoteData.marketRentHigh ? `£${Number(quoteData.marketRentLow).toLocaleString()} - £${Number(quoteData.marketRentHigh).toLocaleString()}` : "£---,---"} <span className="text-xs text-gray-500 font-light lowercase">/ month</span>
              </div>
            </div>

            {/* Confidence Reason */}
            {quoteData.confidenceReason && (
              <div className="p-4 bg-[#111] rounded-lg border border-white/10 flex flex-col text-left">
                <div className="text-gray-400 text-xs uppercase tracking-widest font-medium mb-2">Analysis Detail</div>
                <div 
                  className="text-sm font-light text-gray-300 leading-relaxed max-h-[120px] overflow-y-auto pr-2 custom-scrollbar"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(212, 175, 55, 0.5) transparent'
                  }}
                >
                  {quoteData.confidenceReason}
                </div>
              </div>
            )}
          </div>
          
          <a
            href="https://wa.me/447429026727"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white py-3 sm:py-4 rounded font-medium transition-colors mb-6 shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle size={20} /> Speak to Our Team
          </a>

          <p className="text-gray-400 text-[10px] sm:text-xs font-light leading-relaxed border-l-2 border-brand-gold/30 pl-3 text-left">
            This estimate is generated automatically based on the information provided and our knowledge of the local rental market. It is for guidance purposes only and does not constitute a formal valuation or guaranteed offer. A final offer will only be confirmed following a full assessment by our team.
          </p>
        </div>
      ) : submissionState === "error" ? (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <div className="w-20 h-20 bg-[#111] rounded-full flex items-center justify-center mb-6 border border-white/10">
            <CheckCircle2 className="text-brand-gold w-10 h-10" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
            Thank You
          </h3>
          <p className="text-gray-300 text-base sm:text-lg font-light mb-8 max-w-md mx-auto">
            Our team will be in touch within 72 hours to discuss your property and confirm an offer.
          </p>
          <button
            onClick={resetForm}
            className="text-brand-gold hover:text-white transition-colors text-sm uppercase tracking-widest font-medium"
          >
            Return to form
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 sm:gap-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg sm:text-2xl text-white font-medium">
              {step === 1 ? "About You" : "Property Details"}
            </h3>
            <div className="flex flex-col items-end gap-1.5 mt-1 sm:mt-0">
              <div className="text-brand-gold text-xs font-medium leading-none">
                Step {step} of 2
              </div>
              <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-gold transition-all duration-300"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                />
              </div>
            </div>
          </div>

          {formError && (
            <div className="text-red-400 text-xs sm:text-sm font-medium px-3 py-2 bg-red-400/10 rounded border border-red-400/20">
              {formError}
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-2 sm:gap-4 lg:gap-3 xl:gap-4 pt-2 sm:pt-0">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                <input
                  required={step === 1}
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
                  required={step === 1}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="sleek-input w-1/2 px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white placeholder-gray-500 text-sm"
                />
                <input
                  required={step === 1}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="sleek-input w-1/2 px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white placeholder-gray-500 text-sm"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              <style>
                {`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(212, 175, 55, 0.4);
                    border-radius: 10px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(212, 175, 55, 0.7);
                  }
                `}
              </style>
              <div 
                className="flex flex-col gap-2 sm:gap-4 lg:gap-3 xl:gap-4 max-h-[35vh] sm:max-h-[260px] overflow-y-auto pr-3 pb-2 custom-scrollbar overscroll-contain"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(212, 175, 55, 0.5) transparent'
                }}
              >
              {/* Full property address */}
              <input
                required={step === 2}
                type="text"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
                placeholder="Full Property Address"
                className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white placeholder-gray-500 text-sm"
              />

              {/* Property Type & Furnished */}
              <div className="flex flex-row gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                <div className="w-1/2 flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
                  >
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                    <option value="Hmo">Hmo</option>
                  </select>
                </div>
                <div className="w-1/2 flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Furnished State</label>
                  <select
                    name="furnishedState"
                    value={formData.furnishedState}
                    onChange={handleChange}
                    className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
                  >
                    <option value="Furnished">Furnished</option>
                    <option value="Part Furnished">Part Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>

              {/* Rooms Row 1 */}
              <div className="flex flex-row gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                <div className="w-1/3 flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Bedrooms</label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
                  >
                    <option value="Studio">Studio</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6+">6+</option>
                  </select>
                </div>
                <div className="w-1/3 flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Bathrooms</label>
                  <input
                    type="number"
                    min="1"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white placeholder-gray-500 text-sm"
                  />
                </div>
                <div className="w-1/3 flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Living Rooms</label>
                  <input
                    type="number"
                    min="0"
                    name="livingRooms"
                    value={formData.livingRooms}
                    onChange={handleChange}
                    className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white placeholder-gray-500 text-sm"
                  />
                </div>
              </div>

              {/* Rooms Row 2 & En-suite */}
              <div className="flex flex-row gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                <div className="w-1/2 flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">WCs</label>
                  <input
                    type="number"
                    min="0"
                    name="wcs"
                    value={formData.wcs}
                    onChange={handleChange}
                    className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white placeholder-gray-500 text-sm"
                  />
                </div>
                <div className="w-1/2 flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Any En-suites?</label>
                  <select
                    name="enSuite"
                    value={formData.enSuite}
                    onChange={handleChange}
                    className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              {/* Parking & Garden */}
              <div className="flex flex-row gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                <div className="w-1/2 flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Parking</label>
                  <select
                    name="parking"
                    value={formData.parking}
                    onChange={handleChange}
                    className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="w-1/2 flex flex-col gap-1">
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Garden</label>
                  <select
                    name="garden"
                    value={formData.garden}
                    onChange={handleChange}
                    className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              {/* Flat specific fields */}
              {isFlat && (
                <div className="flex flex-col gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                  <div className="flex flex-row gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                    <div className="w-1/2 flex flex-col gap-1">
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Balcony / Outdoor Space</label>
                      <select
                        name="balcony"
                        value={formData.balcony}
                        onChange={handleChange}
                        className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                    <div className="w-1/2 flex flex-col gap-1">
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Floor Level</label>
                      <input
                        type="number"
                        name="floor"
                        value={formData.floor}
                        onChange={handleChange}
                        className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white placeholder-gray-500 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                    <div className="w-1/2 flex flex-col gap-1">
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Lift Available</label>
                      <select
                        name="lift"
                        value={formData.lift}
                        onChange={handleChange}
                        className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                    {/* Placeholder div to keep layout consistent */}
                    <div className="w-1/2"></div>
                  </div>
                </div>
              )}

              {/* Licence Type - Always Last */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest pl-1">Licence Type</label>
                <select
                  name="licenceType"
                  value={formData.licenceType}
                  onChange={handleChange}
                  className="sleek-input w-full px-4 py-2.5 sm:py-3 lg:py-2.5 xl:py-3 text-white text-sm appearance-none cursor-pointer"
                >
                  <option value="None">None</option>
                  <option value="Hmo">Hmo</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                  <option value="C4">C4</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <label className="flex items-start gap-3 mt-2 sm:mt-3 cursor-pointer group">
                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                  <input
                    required={step === 2}
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
                <span className="text-[11px] sm:text-xs text-gray-400 leading-tight font-light pt-0.5">
                  I agree to the processing of my data in accordance with the{" "}
                  <a
                    href={heroCopy.gdprLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold hover:underline"
                  >
                    privacy policy
                  </a>
                  .
                </span>
              </label>
            </div>
            </>
          )}

          <div className="flex flex-col gap-1 sm:gap-2 mt-2 sm:mt-4 border-t border-white/5 pt-4">
            {heroCopy.submitButtonTopMicro && (
              <div className={`text-center text-[11px] sm:text-xs font-medium text-brand-gold/90 uppercase tracking-widest ${step === 1 ? "max-sm:hidden" : ""}`}>
                {heroCopy.submitButtonTopMicro}
              </div>
            )}
            <div className="flex gap-2 w-full">
              {step === 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="sleek-btn w-full flex items-center justify-center gap-2 group py-3 text-sm font-medium"
                >
                  Next Step{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="sleek-btn w-1/3 flex items-center justify-center bg-transparent border border-white/10 hover:bg-white/5 py-3 text-sm font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="sleek-btn flex items-center justify-center gap-2 group py-2.5 sm:py-3 text-sm sm:text-base font-medium w-2/3"
                  >
                    {heroCopy.submitButton}{" "}
                    <ArrowUpRight
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </button>
                </>
              )}
            </div>
            {heroCopy.submitButtonBottomMicro && (
              <div className={`text-center text-[11px] sm:text-xs text-gray-400 font-light mt-0.5 sm:mt-1 ${step === 1 ? "max-sm:hidden" : ""}`}>
                {heroCopy.submitButtonBottomMicro}
              </div>
            )}
            <div className={`text-center text-[11px] sm:text-xs text-brand-gold font-medium mt-1 sm:mt-1.5 ${step === 1 ? "max-sm:hidden" : ""}`}>
              Join 100+ London landlords already in the programme
            </div>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default LeadForm;

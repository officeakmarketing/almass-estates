import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import brandConfig from '../config/brand';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('almass-cookie-consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('almass-cookie-consent', 'all');
    setIsVisible(false);
  };

  const handleEssential = () => {
    localStorage.setItem('almass-cookie-consent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[99999]"
        >
          <div className="glass-dark sleek-card p-5 sm:p-6 border border-white/10 rounded-lg shadow-2xl relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#C8A96E]/10 rounded-full blur-[50px] pointer-events-none" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="mt-1 p-2 bg-[#0D0D0D] border border-[#C8A96E]/30 rounded-full text-[#C8A96E] shrink-0">
                <ShieldCheck size={24} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-[#F0EDE8] font-medium text-lg mb-2">
                  Securing your data like we secure your rent.
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 font-light">
                  Just as we guarantee your rental income, we guarantee your privacy. 
                  We use cookies to ensure our site runs smoothly, analyse performance, 
                  and deliver the best experience for our landlords.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleAcceptAll}
                    className="sleek-btn flex-1 py-2.5 px-4 text-sm font-medium text-center rounded transition-all cursor-pointer"
                  >
                    Accept All
                  </button>
                  <button 
                    onClick={handleEssential}
                    className="flex-1 py-2.5 px-4 text-sm font-medium text-[#C8C4BC] bg-transparent border border-white/10 hover:border-[#C8A96E]/50 hover:text-[#F0EDE8] transition-all rounded text-center cursor-pointer"
                  >
                    Essential Only
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleEssential} 
                className="absolute -top-2 -right-2 p-2 text-gray-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

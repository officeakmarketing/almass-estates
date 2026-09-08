import React, { useEffect, useRef, useState } from "react";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import PainPoints from "./components/PainPoints";
import PreFooterCTA from "./components/PreFooterCTA";
import useSmoothScroll from "./hooks/useSmoothScroll";

import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";

import Footer from "./components/Footer";
import ConfidenceScore from "./components/ConfidenceScore";

import brandConfig from "./config/brand";

// Thin gold progress bar that fills as the user scrolls
function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "2px",
        background: `linear-gradient(90deg, ${brandConfig.colors.gold}, ${brandConfig.colors.primary})`,
        transformOrigin: "left center",
        transform: "scaleX(0)",
        zIndex: 9999,
        pointerEvents: "none",
        boxShadow: `0 0 8px ${brandConfig.colors.gold}99`,
      }}
    />
  );
}

export default function App() {
  useSmoothScroll(0.09);

  // State to hold the confidence score from your webhook.
  // Replace 85 with null or 0 in production until the webhook fires.
  const [webhookScore, setWebhookScore] = useState(85);

  return (
    <div className="font-sans antialiased bg-black min-h-screen">
      <ScrollProgressBar />
      
      {/* Display the score if it exists */}
      <ConfidenceScore score={webhookScore} />
    
      <Hero />
      <PainPoints />
      <Process/>   
      <Testimonials />
      <FAQ />
      <PreFooterCTA />
      <Footer />
    </div>
  );
}


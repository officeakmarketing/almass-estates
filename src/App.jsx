import React, { useEffect, useRef } from "react";
import Hero from "./components/Hero";
import PreFooterCTA from "./components/PreFooterCTA";
import useSmoothScroll from "./hooks/useSmoothScroll";
import Form from "./components/Form";
import Chat from "./components/Chat";
import WhatWeOffer from "./components/WhatWeOffer";
import WhyChooseUs from "./components/WhyChooseUs";
import Process from "./components/Process";
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
        background: "linear-gradient(90deg, #c4a47c, #e8d5b0)",
        transformOrigin: "left center",
        transform: "scaleX(0)",
        zIndex: 9999,
        pointerEvents: "none",
        boxShadow: "0 0 8px rgba(196, 164, 124, 0.6)",
      }}
    />
  );
}

export default function App() {
  useSmoothScroll(0.09);

  return (
    <div className="font-sans antialiased bg-black min-h-screen">
      <ScrollProgressBar />

      <Hero />
      <WhatWeOffer/>
      <WhyChooseUs/>
      <Process/>     <Form/>  
      <PreFooterCTA />
      <Chat/>

        </div>
  );
}

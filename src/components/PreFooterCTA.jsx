import React, { useMemo } from 'react';
import Reveal from './Reveal';

export default function PreFooterCTA() {
  // Reduced from 40 → 15 particles; GPU-composited with will-change
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 15 + 8}s`,
      delay: `${Math.random() * 5}s`
    }));
  }, []);

  return (
    <section className="relative w-full py-40 flex flex-col items-center justify-center bg-[#030303] border-t border-white/5 overflow-hidden z-20">
      {/* Cheap radial-gradient orb — replaces the expensive blur-[100px] */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)'
        }}
      />

      {/* 15 GPU-composited particles */}
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

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <Reveal className="flex items-center gap-4 mb-6">
          <div className="w-10 md:w-16 h-[1px] bg-white/20"></div>
          <span className="text-xs md:text-sm italic text-brand-muted font-light tracking-wide">Get started</span>
          <div className="w-10 md:w-16 h-[1px] bg-white/20"></div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-4">
            Your property. Our responsibility.<br />Your guaranteed income.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-sm md:text-base text-brand-muted font-light mb-10">
Join over 100 London landlords who never chase rent again. Check if your property qualifies in under 60 seconds.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <a href="#hero" className="group flex items-center gap-4 bg-white hover:bg-gray-200 text-black pl-6 pr-1.5 py-1.5 rounded-full font-sans font-medium transition-all duration-300 hover:scale-105">
            <span className="text-sm tracking-wide">Check My Property Now</span>
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19L19 5M19 5v10M19 5H9"></path></svg>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
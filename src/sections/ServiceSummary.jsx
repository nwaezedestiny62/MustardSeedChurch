import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Smooth Horizontal Scrolling for the large background text
      gsap.to(".scrolling-text-1", {
        xPercent: 30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      gsap.to(".scrolling-text-2", {
        xPercent: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Reveal animation for the central content
      gsap.from(".summary-content", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden py-32 sm:py-56 flex items-center justify-center"
    >
      {/* 🌳 STATIC TREE BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <img
          src="/tree.png"
          alt="Mustard Seed Tree"
          className="w-[800px] md:w-[1200px] lg:w-[1400px] object-contain"
        />
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)] z-10" />

      {/* 🌪️ SCROLLING TEXT LAYERS (Background) */}
      <div className="absolute inset-0 flex flex-col justify-center gap-20 sm:gap-32 opacity-5 pointer-events-none z-0">
        <div className="scrolling-text-1 whitespace-nowrap text-[120px] sm:text-[250px] font-black italic uppercase tracking-tighter leading-none">
          Worship Prayer Word Fellowship Impact Worship Prayer Word Fellowship Impact
        </div>
        <div className="scrolling-text-2 whitespace-nowrap text-[120px] sm:text-[250px] font-black italic uppercase tracking-tighter leading-none">
          Growth Vision Faith Purpose Power Growth Vision Faith Purpose Power
        </div>
      </div>

      {/* 🎯 MAIN CONTENT (High Contrast) */}
      <div className="summary-content relative z-20 text-center max-w-4xl px-6 space-y-12">
        <div className="space-y-4">
          <span className="text-emerald-400 text-[10px] sm:text-[12px] tracking-[8px] sm:tracking-[10px] uppercase font-black block">The Core Pillars</span>
          <h2 className="text-5xl sm:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] text-white">
            Worship. Word. <br/> <span className="text-white/40">Impact.</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-emerald-500/50" />
            <p className="text-xl sm:text-2xl font-black text-white italic uppercase tracking-tighter">Prayer</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-emerald-500/50" />
            <p className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-emerald-400">Fellowship</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-emerald-500/50" />
            <p className="text-xl sm:text-2xl font-black text-white italic uppercase tracking-tighter">Growth</p>
          </div>
        </div>

        <p className="text-white/40 text-base sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          We are more than a ministry; we are a movement dedicated to raising a generation that is unashamed of the Gospel.
        </p>
      </div>
    </section>
  );
};

export default ServiceSummary;

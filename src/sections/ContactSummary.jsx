import React, { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Calendar, Zap, Globe, Users, Share2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const logoRef = useRef(null);

  const marqueeItems = [
    "Find Your People",
    "Share Your Story",
    "Join The Club",
    "Belong Anywhere",
    "January 2027",
  ];

  const marqueeItems2 = [
    "Launching December",
    "The New Era of Social",
    "Identity + Community",
    "Find Your People",
    "Opalfeed",
  ];

  useGSAP(() => {
    // Reveal animation for the central content
    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "center center",
        scrub: 1,
      },
      opacity: 0,
      scale: 0.9,
      y: 50,
      filter: "blur(20px)",
    });

    // Logo floating animation
    gsap.to(logoRef.current, {
      y: -15,
      rotationY: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-between py-16 sm:py-24"
      id="opalfeed"
    >
      {/* 🎬 FUTURISTIC VIDEO BACKGROUND (LOCAL FILE) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1)_0%,transparent_70%)] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.05)_0%,transparent_50%)] z-10" />
        
        {/* REPLACE "your-video-file.mp4" WITH YOUR ACTUAL VIDEO PATH LATER */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover grayscale contrast-125 opacity-30"
          src="/videos/opalfeed-bg.mp4" 
          onError={(e) => {
            // Fallback to a placeholder if video is missing
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* TOP MARQUEE (CYAN ACCENT) */}
      <div className="relative z-20 w-full opacity-40 hover:opacity-100 transition-opacity duration-700">
        <Marquee 
          items={marqueeItems} 
          className="text-cyan-400/40 font-black italic uppercase tracking-[12px] text-[9px]"
        />
      </div>

      {/* 🎯 MAIN BRANDING AREA */}
      <div 
        ref={contentRef}
        className="relative z-20 flex flex-col mt-[-110px] items-center text-center px-6 max-w-5xl"
      >
        {/* LAUNCH BADGE (PURPLE) */}
        <div className="mb-8 flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 px-6 py-2 rounded-full backdrop-blur-xl">
          <Calendar size={12} className="text-cyan-400" />
          <span className="text-[8px] font-black uppercase tracking-[4px] text-white/60">Launching January 2027</span>
        </div>

        {/* 🖼️ LOGO IMAGE PLACEHOLDER (REPLACE SRC LATER) */}
        <div 
          ref={logoRef}
          className="relative w-48 h-48 sm:w-72 sm:h-72 mb-10 group"
        >
          {/* Neon Glows */}
          <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-[80px] group-hover:bg-purple-600/40 transition-all duration-1000" />
          <div className="absolute -inset-4 bg-cyan-400/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-1000" />
          
          <div className="relative w-full h-full rounded-[60px] border border-white/10 bg-zinc-900/40 backdrop-blur-3xl flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.2)]">
            {/* THIS IS WHERE YOU PUT YOUR LOGO IMAGE */}
            <img 
              src="/assets/opalfeed-logo.png" 
              alt="Opalfeed Logo" 
              src="/assets/opalfeed-logo.png" 
  alt="Opalfeed Logo" 
  className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-1000"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback Icon */}
            <div className="hidden absolute inset-0 items-center justify-center">
              <Sparkles size={80} className="text-cyan-400 animate-pulse" />
            </div>
            
            {/* Futuristic Scan Line (Cyan) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,1)] animate-scan" />
          </div>
        </div>

        {/* FUTURISTIC SLOGAN (PURPLE & CYAN) */}
        <div className="space-y-6">
          <p className="text-2xl sm:text-4xl font-light text-white/90 leading-tight italic max-w-3xl">
            "Where you share your <span className="text-purple-400 font-black not-italic border-b-2 border-purple-500/50">story</span> <br className="hidden sm:block" />
            and find your <span className="text-cyan-400 font-black not-italic border-b-2 border-cyan-500/50">people</span>"
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-purple-500" />
            <span className="text-[9px] sm:text-[10px] text-white/30 uppercase tracking-[8px] font-black">The Next Era</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500" />
          </div>
        </div>

        {/* MINI FEATURE PILLS */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {[
            { icon: <Globe size={12} />, label: "Clubs", color: "text-purple-400" },
            { icon: <Users size={12} />, label: "Community", color: "text-cyan-400" },
            { icon: <Zap size={12} />, label: "Reels | Feeds", color: "text-purple-400" },
            { icon: <Share2 size={12} />, label: "Identity", color: "text-cyan-400" },
          ].map((pill, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full hover:border-white/20 transition-all duration-500"
            >
              <span className={pill.color}>{pill.icon}</span>
              <span className="text-[7px] font-black uppercase tracking-[2px] text-white/40">{pill.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM MARQUEE (PURPLE ACCENT) */}
      <div className="relative z-20 w-full opacity-40 hover:opacity-100 transition-opacity duration-700">
        <Marquee 
          items={marqueeItems2} 
          reverse={true}
          className="text-purple-400/40 font-black italic uppercase tracking-[12px] text-[9px] border-y border-white/5 py-6"
        />
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ServiceSummary;

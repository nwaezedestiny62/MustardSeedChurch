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
    "MustardX",
  ];

  useGSAP(() => {
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
      id="mustardx"
    >
      {/* 🎬 BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.18)_0%,transparent_65%)] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(245,158,11,0.12)_0%,transparent_60%)] z-10" />
        
<video
  autoPlay
  muted
  loop
  playsInline
  onLoadedMetadata={(e) => {
    e.target.playbackRate = 3;
  }}
  className="w-full h-full object-cover"
  src="/videos/opalfeed-bg.mp4"
/>
      </div>

      {/* TOP MARQUEE */}
      <div className="relative z-20 w-full opacity-60 hover:opacity-100 transition-opacity duration-700">
        <Marquee 
          items={marqueeItems} 
          className="text-amber-400/70 font-black italic uppercase tracking-[12px] text-[9px]"
        />
      </div>

      {/* MAIN BRANDING AREA */}
      <div 
        ref={contentRef}
        className="relative z-20 flex flex-col mt-[-120px] items-center text-center px-6 max-w-5xl"
      >
        {/* LAUNCH BADGE */}
        <div className="mb-8 flex items-center gap-3 bg-amber-500/10 border border-amber-400/30 px-6 py-2 rounded-full backdrop-blur-xl">
          <Calendar size={12} className="text-white" />
          <span className="text-[8px] font-black uppercase tracking-[4px] text-white/70">Launching January 2027</span>
        </div>

        {/* LOGO CONTAINER - Improved Glass Effect */}
        <div 
          ref={logoRef}
          className="relative w-52 h-52 sm:w-80 sm:h-80 mb-10 group"
        >
          {/* Stronger Gold Glows */}
          <div className="absolute inset-0 bg-amber-500/40 rounded-full blur-[90px] group-hover:bg-amber-400/60 transition-all duration-1000" />
          <div className="absolute -inset-6 bg-yellow-300/25 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-all duration-1000" />
          
          <div className="relative w-full h-full rounded-[60px] border border-amber-400/40 bg-zinc-900/50 backdrop-blur-3xl flex items-center justify-center overflow-hidden shadow-[0_0_70px_rgba(234,179,8,0.45)]">
            <img 
              src="/assets/mustardx-logo.png" 
              alt="MustardX Logo" 
              className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-1000"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden absolute inset-0 items-center justify-center">
              <Sparkles size={90} className="text-amber-400 animate-pulse" />
            </div>
            
            {/* Scan Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_20px_rgba(234,179,8,1)] animate-scan" />
          </div>
        </div>

        {/* SLOGAN */}
        <div className="space-y-6">
          <p className="text-2xl sm:text-4xl font-light text-white leading-tight italic max-w-3xl">
            "Where you share your <span className="text-amber-400 font-black not-italic border-b-2 border-amber-400">story</span> <br className="hidden sm:block" />
            and find your <span className="text-yellow-300 font-black not-italic border-b-2 border-yellow-300">people</span>"
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
            <span className="text-[10px] text-white/60 uppercase tracking-[8px] font-black">THE NEXT ERA</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-yellow-300" />
          </div>
        </div>

        {/* FEATURE PILLS - Better Visibility */}
       <div className="flex flex-wrap justify-center gap-3 mt-10">
  {[
    { icon: <Globe size={12} />, label: "Clubs", color: "text-amber-400" },
    { icon: <Users size={12} />, label: "Lounges", color: "text-yellow-300" },
    { icon: <Zap size={12} />, label: "Feeds | Chills", color: "text-amber-400" },
    { icon: <Share2 size={12} />, label: "Identity", color: "text-yellow-300" },
  ].map((pill, idx) => (
    <div 
      key={idx}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-amber-400/20 hover:border-amber-400/50 backdrop-blur-md rounded-full transition-all duration-500 hover:scale-105 text-sm"
    >
      <span className={pill.color}>{pill.icon}</span>
      <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{pill.label}</span>
    </div>
  ))}
</div>
      </div>

      {/* BOTTOM MARQUEE */}
      <div className="relative z-20 w-full opacity-60 hover:opacity-100 transition-opacity duration-700">
        <Marquee 
          items={marqueeItems2} 
          reverse={true}
          className="text-amber-400/70 font-black italic uppercase tracking-[12px] text-[9px] border-y border-amber-400/20 py-6"
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
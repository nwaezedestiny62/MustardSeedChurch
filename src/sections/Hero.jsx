import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Initial State
      gsap.set(".hero-element", { opacity: 0, y: 20 });
      gsap.set(".hero-title", { opacity: 0, y: 30, skewY: 2 });

      tl.to(".hero-title", {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out"
      })
      .to(".hero-element", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=1");
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white flex flex-col justify-center items-center px-6 sm:px-12"
    >
      {/* 🎬 VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40 grayscale contrast-125 brightness-75"
        >
          <source src="/videos/program.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto space-y-10">
        <div className="hero-element inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl mb-6">
          <Sparkles size={12} className="text-emerald-400" />
          <span className="text-[9px] font-black uppercase tracking-[6px] text-white/70">Teens Arm of AG Ikeja</span>
        </div>

        <h1 className="hero-title font-black italic uppercase tracking-[-0.02em] leading-[0.9] text-5xl sm:text-7xl md:text-[100px] lg:text-[120px]">
          Mustard <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">Seed Church</span>
        </h1>

        <div className="hero-element flex flex-col items-center gap-12 pt-12">
          <div className="space-y-4 max-w-2xl mt-[-50px]">
            <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-emerald-400 leading-none">
              Where Small Seeds Become Mighty Giants.
            </h2>
            <p className="text-white/40 text-sm sm:text-md font-light leading-relaxed">
              Experience explosive worship and deep word in a community designed for the next generation of Kingdom leaders.
            </p>
          </div>

          <div className="flex flex-col items-center mt-[-24px] gap-8 w-full">
            <a
              href="#services"
              className="group relative flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-black text-[10px] tracking-[5px] uppercase hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              Enter The Encounter
              <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
            </a>
            
            <div className="flex items-center mt-13 gap-6 text-white/20 text-[9px] font-black uppercase tracking-[4px]">
              <span>Ikeja, Lagos</span>
              <div className="w-8 h-[1px] bg-white/10" />
              <span>Assemblies of God</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-element absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/20">
        <span className="text-[8px] font-black uppercase tracking-[5px]">Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;

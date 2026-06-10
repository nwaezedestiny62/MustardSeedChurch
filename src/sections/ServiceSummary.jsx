import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  useGSAP(() => {
    const scrubSpeed = 14;

    gsap.to("#title-service-1", {
      xPercent: 20,
      scrollTrigger: {
        trigger: "#title-service-1",
        scrub: scrubSpeed,
      },
    });

    gsap.to("#title-service-2", {
      xPercent: -30,
      scrollTrigger: {
        trigger: "#title-service-2",
        scrub: scrubSpeed,
      },
    });

    gsap.to("#title-service-3", {
      xPercent: 100,
      scrollTrigger: {
        trigger: "#title-service-3",
        scrub: scrubSpeed,
      },
    });

    gsap.to("#title-service-4", {
      xPercent: -100,
      scrollTrigger: {
        trigger: "#title-service-4",
        scrub: scrubSpeed,
      },
    });
  });

  return (
    <section className="relative w-full bg-black overflow-hidden pb-6">
      {/* 🌑 STATIC BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-b-[30px] lg:rounded-b-[40px]">
        {/* Main Dark Black Background */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Noise Overlay with Bottom Border Radius */}
        <div
          className="absolute inset-0 opacity-50 mix-blend-overlay rounded-b-[30px] lg:rounded-b-[40px]"
          style={{
            backgroundImage: "url('/bg-texture.png')",
            backgroundSize: "cover",
          }}
        />

        {/* Second Noise Layer */}
        <div
          className="absolute inset-0 rounded-b-[60px] lg:rounded-b-[30px]"
          style={{
            backgroundImage: "url('/bg-texture.png')",
          }}
        />

        {/* 🌳 CENTER TREE - Symbol of Mustard Seed Growth */}
        <div className="absolute inset-0 hidden lg:flex items-center justify-center">
          <img
            src="/tree.png"
            alt="Mustard Seed Tree of Faith"
            className="absolute left-1/2 -top-[26.5%] -translate-x-1/2 -translate-y-1/2
                       w-[900px] md:w-[1200px] lg:w-[650px] object-contain pointer-events-none"
          />
        </div>
      </div>

      {/* 🔥 CONTENT - Church Themed */}
      <div className="relative z-10 mt-20 mb-42 overflow-hidden font-light leading-snug text-center contact-text-responsive text-white">
        <div id="title-service-1">
          <p>Worship</p>
        </div>

        <div id="title-service-2" className="flex items-center justify-center gap-3 translate-x-16">
          <p className="font-normal">Prayer</p>
          <div className="w-10 h-1 md:w-32 bg-gold" />
          <p>Word</p>
        </div>

        <div id="title-service-3" className="flex items-center justify-center gap-3 -translate-x-48">
          <p>Fellowship</p>
          <div className="w-10 h-1 md:w-32 bg-gold" />
          <p className="italic">Evangelism</p>
          <div className="w-10 h-1 md:w-32 bg-gold" />
          <p>Discipleship</p>
        </div>

        <div id="title-service-4" className="translate-x-48">
          <p>Impact</p>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummary;
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Users, BookOpen, Shield, Star, Zap, Anchor } from "lucide-react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const pillarsRef = useRef(null);
  const orbitContainerRef = useRef(null);
  const orbitRefs = useRef([]);

  const items = [
    "Mustard Seed Church",
    "Assemblies of God Ikeja",
    "Teens Arm",
    "Faith Grows Here",
    "Join Us",
    "You're Welcome",
  ];
  const orbitImages = [
    "/images/orbit1.jpg",
    "/images/orbit2.jpg",
    "/images/orbit3.jpg",
    "/images/orbit4.jpg",
    "/images/orbit5.jpg",
    "/images/orbit6.jpg",
    "/images/orbit7.jpg",
    "/images/orbit8.jpg",
  ];

  const pillars = [
    { icon: Flame, title: "Anointed Worship", desc: "...", color: "text-orange-500" },
    { icon: BookOpen, title: "The Uncompromised Word", desc: "...", color: "text-emerald-500" },
    { icon: Users, title: "Radical Fellowship", desc: "...", color: "text-blue-500" },
    { icon: Zap, title: "Purposeful Living", desc: "...", color: "text-yellow-500" },
  ];


  // Orbit Animation - Responsive
  useGSAP(() => {
    const updateOrbit = () => {
      const isMobile = window.innerWidth < 640;
      const radius = isMobile ? 130 : 210;   // Smaller on mobile

      orbitRefs.current.forEach((circle, i) => {
        if (!circle) return;

        const angle = (i * (360 / 8));

        gsap.set(circle, {
          left: "50%",
          top: "50%",
          x: Math.cos((angle * Math.PI) / 180) * radius - (isMobile ? 38 : 50),
          y: Math.sin((angle * Math.PI) / 180) * radius - (isMobile ? 38 : 50),
        });
      });
    };

    // Initial setup
    updateOrbit();

    // Update on resize
    window.addEventListener("resize", updateOrbit);

    // Rotation animation
    orbitRefs.current.forEach((circle, i) => {
      if (!circle) return;
      gsap.to(circle, {
        rotation: 360,
        duration: 28 + i * 2,
        repeat: -1,
        ease: "none",
      });
    });

    return () => window.removeEventListener("resize", updateOrbit);
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white font-sans overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section id="about" className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="section-reveal opacity-100">
            <AnimatedHeaderSection
              subTitle="The Teens Arm of Assemblies of God Ikeja"
              title="Our Journey"
              text="From a small gathering to a global encounter. This is our story."
              textColor="text-white"
              withScrollTrigger
            />
          </div>

          <div className="mt-20 grid lg:grid-cols-2 gap-16 items-center">
            
            {/* ANIMATED ORBIT SECTION */}
            {/* ANIMATED ORBIT SECTION - RESPONSIVE */}
            <div className="relative flex justify-center section-reveal">
              <div 
                className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px]" 
                ref={orbitContainerRef}
              >
                {/* Central Image */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 sm:border-[12px] border-white/20 shadow-2xl z-20">
                  <img 
                    src="/images/man.jpg" 
                    alt="MSC Leadership" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70 rounded-full" />
                </div>

                {/* Orbiting Images */}
                {orbitImages.map((src, i) => (
                  <div
                    key={i}
                    ref={(el) => { if (el) orbitRefs.current[i] = el; }}
                    className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-xl"
                  >
                    <img 
                      src={src} 
                      alt={`Member ${i}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-10">
              <h3 className="text-5xl sm:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-white/90 section-reveal">
                It Started as a <br/> <span className="text-emerald-400">Gathering...</span>
              </h3>
              <div className="space-y-8 text-xl sm:text-2xl text-white/50 font-light leading-relaxed">
                <p className="story-para opacity-100">
                  In the heart of Ikeja, a small group of teenagers began to meet. They were looking for more than just a Sunday routine; they were looking for a home, a purpose, and a real connection with God.
                </p>
<p className="story-para opacity-100">
  What began as a simple gathering of seeds soon blossomed into an <strong>Explosive Encounter</strong>. Under the leadership of the <strong>Late Barrister Ben Ukadike</strong>, alongside faithful pioneers such as <strong>Reverend Emma Ossai</strong>, Pastor James and Mrs. Chichi Okereke, Deacon Patrick Ajah and Deaconess Cynthia Ajah, Mrs Stella Chamberlain, Mr. and Mrs. Omobare, and Mr. and Mrs. John Obasi Kalu, among many others, <strong>The Mustard Seed Church (MSC)</strong> was birthed with a singular, burning vision: <em>to sow seeds of faith and raise giants for the Kingdom of God.</em>
</p>
                <p className="story-para opacity-100">
                  Today, MSC stands as a vibrant beacon of hope within Assemblies of God Ikeja. We are a generation that refuses to be silent, a movement that is rewriting the narrative of what it means to be a Christian teenager in the modern world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* --- THE MISSION DEEP DIVE --- */}
      <section className="relative py-24 px-6 sm:px-10 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <div className="space-y-6 section-reveal">
            <span className="text-emerald-400 text-[10px] tracking-[8px] uppercase font-black block">The Core Mission</span>
            <h2 className="text-6xl sm:text-8xl font-black italic uppercase tracking-tighter leading-none">
              Sowing Seeds. <br/> Raising <span className="text-white/20">Giants.</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/5 p-10 rounded-[48px] border border-white/10 hover:border-emerald-500/30 transition-all group section-reveal">
              <Shield className="text-emerald-400 mb-8 group-hover:scale-110 transition-transform" size={40} />
              <h4 className="text-3xl font-black italic uppercase tracking-tighter mb-6">Our Vision</h4>
              <p className="text-lg text-white/50 font-light leading-relaxed">
                To see every teenager saturated with the Gospel of Jesus Christ, transformed by His grace, and launched into their God-given destiny as world-changers.
              </p>
            </div>
            <div className="bg-white/5 p-10 rounded-[48px] border border-white/10 hover:border-blue-500/30 transition-all group section-reveal">
              <Star className="text-blue-400 mb-8 group-hover:scale-110 transition-transform" size={40} />
              <h4 className="text-3xl font-black italic uppercase tracking-tighter mb-6">Our Mandate</h4>
              <p className="text-lg text-white/50 font-light leading-relaxed">
                To provide a sanctuary where teens can grow spiritually, intellectually, and socially. Through radical discipleship and excellence in all things.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE BIG STORY --- */}
      <section className="py-24 px-6 sm:px-10 bg-white text-black rounded-[60px] sm:rounded-[100px] mt-12">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-6 section-reveal">
            <h2 className="text-6xl sm:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-8">
              Beyond the <br/> <span className="text-black/20">Walls.</span>
            </h2>
            <div className="h-1 w-16 bg-black mx-auto" />
          </div>

          <div className="columns-1 md:columns-2 gap-12 space-y-10 text-xl sm:text-2xl font-light leading-relaxed text-black/80 section-reveal">
            <p className="first-letter:text-8xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:leading-[0.8] first-letter:italic">
              Mustard Seed Church is more than just a name; it is a prophetic statement. We believe that no matter how small a teenager feels, when they are planted in the presence of God, they become an unstoppable force. 
            </p>
            <p>
              Our history at Assemblies of God Ikeja is rich with stories of transformation. We have seen teens who were once shy and uncertain become bold leaders, talented musicians, and academic giants. This is the "MSC Effect."
            </p>
            <p>
              Every year, we host the <strong>National Teens Day</strong>, a massive gathering where thousands of teenagers across the nation converge to lift up the name of Jesus. It is a time of revival, where the fire of the Holy Spirit is ignited in the hearts of the youth.
            </p>
            <p>
              But our impact doesn't stop at large events. It's in the small, weekly Bible studies where we tackle the tough questions about identity, peer pressure, and mental health. It's in the <strong>Love Feasts</strong> where we break bread together and build bonds that last a lifetime.
            </p>
            <p>
              We are a generation that is unashamed of the Gospel. We are tech-savvy, creative, and full of energy, but our anchor remains firmly in the ancient truths of the Word of God. We are the bridge between the heritage of the Assemblies of God and the future of the global church.
            </p>
            <p className="font-black italic uppercase tracking-tight text-3xl sm:text-4xl mt-10 block">
              "We are not just the church of tomorrow; we are the church of TODAY."
            </p>
          </div>

          <div className="pt-16 flex flex-col items-center gap-8 section-reveal">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-16 h-16 rounded-full border-4 border-white bg-zinc-200 overflow-hidden shadow-xl">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Member" className="w-full h-full object-cover grayscale" />
                </div>
              ))}
            </div>
            <p className="text-[9px] font-black uppercase tracking-[4px] text-black/40">Join 500+ Teens Raising Giants</p>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6 sm:px-10 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="relative inline-block section-reveal">
            <Anchor className="text-emerald-400 absolute -top-10 -left-10 rotate-[-20deg] float-item" size={40} />
            <h2 className="text-7xl sm:text-9xl font-black italic uppercase tracking-tighter leading-none">
              Become a <br/> <span className="text-emerald-400">Giant.</span>
            </h2>
          </div>
          <p className="text-xl sm:text-2xl text-white/40 font-light max-w-2xl mx-auto section-reveal">
            Your story is just beginning. Whether you're looking for answers or looking for a home, there's a place for you at MSC.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8 section-reveal">
            <a href="#contact" className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-black text-xs tracking-[4px] uppercase hover:scale-105 transition-all shadow-2xl">
              Join the Family
            </a>
            <a href="#weekly buzz" className="w-full sm:w-auto border border-white/10 px-10 py-5 rounded-full font-black text-xs tracking-[4px] uppercase hover:bg-white/5 transition-all">
              Our Programs
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
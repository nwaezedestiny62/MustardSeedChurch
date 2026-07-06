import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Users, BookOpen, Heart, Shield, Star, Zap, Anchor } from "lucide-react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const pillarsRef = useRef(null);

  const items = [
    "Mustard Seed Church",
    "Assemblies of God Ikeja",
    "Teens Arm",
    "Faith Grows Here",
    "Join Us",
    "You're Welcome",
  ];

  const pillars = [
    { 
      icon: Flame, 
      title: "Anointed Worship", 
      desc: "We believe worship is not just music; it's an encounter. Our atmosphere is charged with the presence of God, where teens find freedom to express their love for the Father.",
      color: "text-orange-500"
    },
    { 
      icon: BookOpen, 
      title: "The Uncompromised Word", 
      desc: "We dig deep into the scriptures, teaching the Bible in a way that is relevant, practical, and life-transforming for the 21st-century teenager.",
      color: "text-emerald-500"
    },
    { 
      icon: Users, 
      title: "Radical Fellowship", 
      desc: "Nobody walks alone. We are a family of believers where accountability, friendship, and genuine love form the foundation of our community.",
      color: "text-blue-500"
    },
    { 
      icon: Zap, 
      title: "Purposeful Living", 
      desc: "We don't just gather; we are sent. We empower teens to discover their God-given talents and use them to shine as lights in their schools and homes.",
      color: "text-yellow-500"
    },
  ];

  useGSAP(
    () => {
      // 1. Smooth Section Reveal
      gsap.from(".section-reveal", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".section-reveal",
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });

      // 2. Story Paragraphs Reveal
      gsap.utils.toArray(".story-para").forEach((para) => {
        gsap.from(para, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          scrollTrigger: {
            trigger: para,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      });

      // 3. Pillar Cards - Force Visibility & Stable Animation
      gsap.from(".pillar-card", {
        scale: 0.9,
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: pillarsRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          onEnter: () => {
            // Force final state just in case
            gsap.to(".pillar-card", { opacity: 1, y: 0, scale: 1, stagger: 0.1 });
          }
        }
      });

      // 4. Image Mask Animation
      gsap.from(".image-mask", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".image-mask",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // 5. Floating Elements
      gsap.to(".float-item", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="bg-black text-white font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
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
            <div className="relative group section-reveal">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[60px] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
              <div className="relative image-mask aspect-[4/5] rounded-[60px] overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/man.jpg" alt="MSC Leadership" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <p className="text-[10px] font-black uppercase tracking-[5px] text-emerald-400 mb-2">The Founder's Vision</p>
                  <h4 className="text-3xl font-black italic uppercase tracking-tighter">Late Prince Barrister Ben Ukadike</h4>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <h3 className="text-5xl sm:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-white/90 section-reveal">
                It Started as a <br/> <span className="text-emerald-400">Gathering...</span>
              </h3>
              <div className="space-y-8 text-xl sm:text-2xl text-white/50 font-light leading-relaxed">
                <p className="story-para opacity-100">
                  In the heart of Ikeja, a small group of teenagers began to meet. They were looking for more than just a Sunday routine; they were looking for a home, a purpose, and a real connection with God.
                </p>
<p className="story-para opacity-100">
  What began as a simple gathering of seeds soon blossomed into an <strong>Explosive Encounter</strong>. Under the leadership of the Late Barrister Ben Ukadike, alongside faithful pioneers such as Reverend Emma Ossai, Pastor James and Mrs. Chichi Okereke, Deacon Patrick Ajah and Deaconess Cynthia Ajah, Mr. and Mrs. Omobare, and Mr. and Mrs. John Obasi Kalu, among many others, <strong>The Mustard Seed Church (MSC)</strong> was birthed with a singular, burning vision: <em>to sow seeds of faith and raise giants for the Kingdom of God.</em>
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
            <a href="#services" className="w-full sm:w-auto border border-white/10 px-10 py-5 rounded-full font-black text-xs tracking-[4px] uppercase hover:bg-white/5 transition-all">
              Our Programs
            </a>
          </div>
        </div>
      </section>

      {/* Footer-like Marquee */}
      <Marquee items={items} className="text-white/10 bg-transparent border-t border-white/5 py-16" />
    </div>
  );
};

export default About;

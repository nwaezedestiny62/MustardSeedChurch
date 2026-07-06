import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, Share2, Globe, MessageSquare } from "lucide-react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const items = [
    "Mustard Seed Church",
    "Assemblies of God Ikeja",
    "Teens Arm",
    "Faith Grows Here",
    "Join Us",
    "You're Welcome",
  ];

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  useGSAP(
    () => {
      gsap.from(".animate-in", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        e.target.reset();
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col pt-16 sm:pt-24"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="pb-12 sm:pb-20 px-4 sm:px-10">
        <AnimatedHeaderSection
          subTitle="Connect with the Family"
          title="Get In Touch"
          text="Have a question, prayer request, or just want to say hello? We're excited to hear from you."
          textColor="text-white"
          withScrollTrigger
        />
      </div>

      <div className="flex-1 px-4 sm:px-10 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="relative group">
            {/* Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-[30px] sm:rounded-[50px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            
            <div className="relative bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[30px] sm:rounded-[50px] overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                
                {/* Contact Sidebar */}
                <div className="lg:col-span-2 p-8 sm:p-12 md:p-16 bg-white/5 border-b lg:border-b-0 lg:border-r border-white/5 space-y-10 sm:space-y-16">
                  <div className="animate-in">
                    <span className="text-emerald-400 text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[5px] uppercase font-black mb-3 sm:mb-4 block">Information</span>
                    <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter leading-none mb-4 sm:mb-6">Let's <br className="hidden sm:block"/>Connect</h2>
                    <p className="text-white/40 text-base sm:text-lg font-light leading-relaxed">
                      Our doors and hearts are always open. Reach out anytime.
                    </p>
                  </div>

                  <div className="space-y-8 sm:space-y-10">
                    <div className="animate-in flex gap-4 sm:gap-6 group/item">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover/item:text-white group-hover/item:bg-white/10 transition-all duration-500">
                        <Mail size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="uppercase text-[8px] tracking-[2px] text-white/30 font-black mb-1 sm:mb-2">Email Us</div>
                        <a href="mailto:mustardseedchurch@gmail.com" className="text-base sm:text-lg font-bold hover:text-emerald-400 transition-colors break-words">
                          mustardseedchurch25@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="animate-in flex gap-4 sm:gap-6 group/item">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover/item:text-white group-hover/item:bg-white/10 transition-all duration-500">
                        <Phone size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="uppercase text-[8px] tracking-[2px] text-white/30 font-black mb-1 sm:mb-2">Call / WhatsApp</div>
                        <a href="tel:+2348123456789" className="text-base sm:text-lg font-bold hover:text-emerald-400 transition-colors">
                          +234 701 093 0763
                        </a>
                      </div>
                    </div>

                    <div className="animate-in flex gap-4 sm:gap-6 group/item">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover/item:text-white group-hover/item:bg-white/10 transition-all duration-500">
                        <MapPin size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="uppercase text-[8px] tracking-[2px] text-white/30 font-black mb-1 sm:mb-2">Visit Us</div>
                        <p className="text-base sm:text-lg font-bold leading-tight">
                          Assemblies of God Ikeja<br />
                          <span className="text-white/40 text-xs sm:text-sm font-medium">Off Toyin St, Allen Ave, Lagos</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="animate-in pt-6 sm:pt-10 flex gap-3 sm:gap-4">
                    {[Share2, Globe, MessageSquare].map((Icon, i) => (
                      <a key={i} href="https://www.instagram.com/mustardseedchurch/" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all duration-500">
                        <Icon size={18} className="sm:w-5 sm:h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Main Form Area */}
                <div className="lg:col-span-3 p-8 sm:p-12 md:p-16 relative">
                  <div className="animate-in">
                    <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter mb-8 sm:mb-10">Send a Message</h3>

                    {submitted ? (
                      <div className="min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center text-center animate-in">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                          <CheckCircle2 size={40} className="sm:w-12 sm:h-12" strokeWidth={3} />
                        </div>
                        <h4 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter mb-3 sm:mb-4">God Bless You!</h4>
                        <p className="text-white/40 text-base sm:text-lg font-light max-w-sm">We've received your message and will get back to you shortly.</p>
                      </div>
                    ) : (
                      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                        <input type="hidden" name="access_key" value={accessKey} />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                          <div className="space-y-2">
                            <label className="text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase font-black text-white/30 ml-2">Full Name</label>
                            <input
                              type="text"
                              name="name"
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base text-white focus:border-white outline-none transition-all placeholder:text-white/20 font-medium"
                              placeholder="Destiny Nwaeze"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase font-black text-white/30 ml-2">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base text-white focus:border-white outline-none transition-all placeholder:text-white/20 font-medium"
                              placeholder="destiny@example.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase font-black text-white/30 ml-2">Your Message</label>
                          <textarea
                            name="message"
                            rows={5}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-[24px] sm:rounded-[32px] px-5 sm:px-6 py-5 sm:py-6 text-sm sm:text-base text-white focus:border-white outline-none transition-all placeholder:text-white/20 font-medium resize-none"
                            placeholder="Write your prayer request or message here..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-white text-black py-5 sm:py-6 rounded-[24px] sm:rounded-[32px] font-black text-xs sm:text-sm tracking-[3px] sm:tracking-[5px] uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3 sm:gap-4 disabled:opacity-50 group"
                        >
                          {isSubmitting ? (
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          ) : (
                            <>
                              Send Message
                              <ArrowRight size={16} className="sm:w-5 sm:h-5" strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Marquee items={items} className="text-white/20 bg-transparent border-t border-white/5 py-8 sm:py-10" />
    </section>
  );
};

export default Contact;

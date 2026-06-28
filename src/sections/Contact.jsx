import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";

const Contact = () => {
  const containerRef = useRef(null);

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
        y: 60,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff08_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="pt-20 pb-16">
        <AnimatedHeaderSection
          subTitle="Teens Arm of Assemblies of God Ikeja"
          title="Get In Touch"
          text="Have a question, prayer request, or want to join us? We'd love to hear from you."
          textColor="text-white"
          withScrollTrigger
        />
      </div>

      <div className="flex-1 px-6 md:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-14 backdrop-blur-md">
            <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div className="md:col-span-2 space-y-10 animate-in">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
                  <p className="text-white/70 leading-relaxed">
                    Our doors and hearts are always open. Reach out anytime.
                  </p>
                </div>

                <div className="space-y-8 text-lg">
                  <div className="animate-in flex gap-5">
                    <span className="text-2xl mt-1">✉️</span>
                    <div>
                      <div className="text-sm uppercase tracking-widest text-white/50 mb-1">
                        Email
                      </div>
                      <a
                        href="mailto:mustardseedchurch@gmail.com"
                        className="hover:text-amber-400 transition-colors"
                      >
                        mustardseedchurch@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="animate-in flex gap-5">
                    <span className="text-2xl mt-1">📞</span>
                    <div>
                      <div className="text-sm uppercase tracking-widest text-white/50 mb-1">
                        Phone / WhatsApp
                      </div>
                      <a
                        href="tel:+234XXXXXXXXXX"
                        className="hover:text-amber-400 transition-colors"
                      >
                        +234 __________ {/* Replace with real number */}
                      </a>
                    </div>
                  </div>

                  <div className="animate-in flex gap-5">
                    <span className="text-2xl mt-1">📍</span>
                    <div>
                      <div className="text-sm uppercase tracking-widest text-white/50 mb-1">
                        Location
                      </div>
                      <p className="leading-relaxed">
                        Assemblies of God Ikeja
                        <br />
                        Off Toyin Street, Allen Avenue
                        <br />
                        Ikeja, Lagos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="md:col-span-3 animate-in">
                <h3 className="text-2xl font-semibold mb-8">Send a Message</h3>

                <form
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  className="space-y-6"
                >
                  <input 
                    type="hidden" 
                    name="access_key" 
                    value={accessKey} 
                  />
                  <input type="hidden" name="subject" value="New Contact Form Submission" />
                  <input type="hidden" name="from_name" value="Teens Arm Contact Form" />
                  <input type="hidden" name="redirect" value="https://web3forms.com/success" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full bg-transparent border border-white/20 rounded-2xl px-6 py-4 focus:border-white outline-none transition-all placeholder:text-white/40"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-transparent border border-white/20 rounded-2xl px-6 py-4 focus:border-white outline-none transition-all placeholder:text-white/40"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (optional)"
                    className="w-full bg-transparent border border-white/20 rounded-2xl px-6 py-4 focus:border-white outline-none transition-all placeholder:text-white/40"
                  />

                  <textarea
                    name="message"
                    rows={7}
                    placeholder="Write your message, prayer request, or question here..."
                    required
                    className="w-full bg-transparent border border-white/20 rounded-3xl px-6 py-4 focus:border-white outline-none transition-all placeholder:text-white/40 resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full mt-4 bg-white hover:bg-amber-400 text-black font-semibold py-4 rounded-2xl text-lg transition-all active:scale-[0.985]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
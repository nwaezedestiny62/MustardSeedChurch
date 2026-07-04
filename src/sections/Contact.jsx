import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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
        y: 50,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
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
        setTimeout(() => setSubmitted(false), 5000);
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
      className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff0a_0%,transparent_60%)] pointer-events-none" />

      {/* Header */}
      <div className="pt-20 pb-16 px-6">
        <AnimatedHeaderSection
          subTitle="Teens Arm of Assemblies of God Ikeja"
          title="Get In Touch"
          text="Have a question, prayer request, or just want to say hello? We're excited to hear from you."
          textColor="text-white"
          withScrollTrigger
        />
      </div>

      <div className="flex-1 px-6 md:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-xl shadow-2xl">
            <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div className="md:col-span-2 space-y-12 animate-in">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight mb-3">
                    Let's Connect
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Our doors and hearts are always open. Reach out anytime.
                  </p>
                </div>

                <div className="space-y-10">
                  <div className="animate-in flex gap-5 group">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-2xl group-hover:bg-amber-400/20 transition-colors">
                      ✉️
                    </div>
                    <div>
                      <div className="uppercase text-xs tracking-[2px] text-white/50 mb-1.5">Email</div>
                      <a
                        href="mailto:mustardseedchurch@gmail.com"
                        className="text-lg hover:text-amber-400 transition-colors"
                      >
                        mustardseedchurch@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="animate-in flex gap-5 group">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-2xl group-hover:bg-amber-400/20 transition-colors">
                      📞
                    </div>
                    <div>
                      <div className="uppercase text-xs tracking-[2px] text-white/50 mb-1.5">Phone / WhatsApp</div>
                      <a
                        href="tel:+234XXXXXXXXXX"
                        className="text-lg hover:text-amber-400 transition-colors"
                      >
                        +234 __________ {/* ← Replace with real number */}
                      </a>
                    </div>
                  </div>

                  <div className="animate-in flex gap-5 group">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-2xl group-hover:bg-amber-400/20 transition-colors">
                      📍
                    </div>
                    <div>
                      <div className="uppercase text-xs tracking-[2px] text-white/50 mb-1.5">Location</div>
                      <p className="text-lg leading-relaxed">
                        Assemblies of God Ikeja<br />
                        Off Toyin Street, Allen Avenue<br />
                        Ikeja, Lagos
                      </p>
                    </div>
                  </div>
                </div>

                {/* Optional: Add social icons here later */}
              </div>

              {/* Form */}
              <div className="md:col-span-3 animate-in">
                <h3 className="text-3xl font-semibold mb-8">Send Us a Message</h3>

                {submitted ? (
                  <div className="h-[420px] flex items-center justify-center text-center">
                    <div>
                      <div className="text-6xl mb-6">🙏</div>
                      <h4 className="text-2xl font-medium mb-2">Thank You!</h4>
                      <p className="text-white/70">We've received your message. God bless you.</p>
                    </div>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <input type="hidden" name="access_key" value={accessKey} />
                    <input type="hidden" name="subject" value="New Contact Form - Teens Arm" />
                    <input type="hidden" name="from_name" value="Teens Arm Contact" />

                    <div className="space-y-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="w-full bg-transparent border border-white/20 rounded-2xl px-6 py-4 text-lg focus:border-amber-400 outline-none transition-all placeholder:text-white/40"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          required
                          className="w-full bg-transparent border border-white/20 rounded-2xl px-6 py-4 text-lg focus:border-amber-400 outline-none transition-all placeholder:text-white/40"
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          className="w-full bg-transparent border border-white/20 rounded-2xl px-6 py-4 text-lg focus:border-amber-400 outline-none transition-all placeholder:text-white/40"
                        />
                      </div>

                      <textarea
                        name="message"
                        rows={7}
                        placeholder="Write your message, prayer request, or any question here..."
                        required
                        className="w-full bg-transparent border border-white/20 rounded-3xl px-6 py-4 text-lg focus:border-amber-400 outline-none transition-all placeholder:text-white/40 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-6 bg-white hover:bg-amber-400 active:bg-amber-500 text-black font-semibold py-4 rounded-2xl text-lg transition-all active:scale-[0.985] disabled:opacity-70 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>Sending<span className="animate-pulse">...</span></>
                      ) : (
                        "Send Message"
                      )}
                    </button>

                    <p className="text-center text-xs text-white/40 pt-2">
                      We respect your privacy. You'll get a reply soon.
                    </p>
                  </form>
                )}
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
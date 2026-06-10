import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";

const Contact = () => {
  const [result, setResult] = useState("");
  const containerRef = useRef(null);

  const items = ["Mustard Seed Church", "Assemblies of God Ikeja", "Teens Arm", "Faith Grows Here", "Join Us"];

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("✅ Form Submitted Successfully! We will reply soon.");
        event.target.reset();
      } else {
        setResult("❌ " + (data.message || "Something went wrong"));
      }
    } catch (error) {
      setResult("❌ Network error. Please try again.");
    }
  };

  useGSAP(() => {
    gsap.from(".contact-item", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });
  }, { scope: containerRef });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="flex flex-col justify-between min-h-screen bg-black text-white"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"Teens Arm of Assemblies of God Ikeja"}
          title="Get In Touch"
          text="Have a question? Want to join us? Need prayer? We’d love to hear from you."
          textColor="text-white"
          withScrollTrigger
        />

        <div className="flex px-6 md:px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">

            {/* Contact Info */}
            <div className="contact-item">
              <h2 className="flex items-center gap-3">Send us a message</h2>
              <div className="w-full h-px my-4 bg-white/30" />
              <p className="text-white/70 text-lg leading-relaxed">
                We are excited to connect with you! Whether you want to join Mustard Seed Church, 
                have a prayer request, or just want to know more — feel free to reach out.
              </p>
            </div>

            <div className="contact-item">
              <h2>Email</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl">mustardseedchurch@gmail.com</p>
            </div>

            <div className="contact-item">
              <h2>Phone / WhatsApp</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl">+234 __________</p>
            </div>

            <div className="contact-item">
              <h2>Location</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl">
                Assemblies of God Ikeja<br />
                Off Toyin Street, Allen Avenue, Ikeja, Lagos
              </p>
            </div>

            {/* Form */}
            <div className="contact-item">
              <h2>Send Message / Prayer Request / Join Us</h2>
              <div className="w-full h-px my-4 bg-white/30" />

              <form onSubmit={onSubmit} className="flex flex-col gap-6 mt-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  required
                  className="bg-transparent border border-white/30 p-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="bg-transparent border border-white/30 p-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                />

                <textarea
                  name="message"
                  rows={6}
                  placeholder="Write your message or prayer request here..."
                  required
                  className="bg-transparent border border-white/30 p-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                />

                <button
                  type="submit"
                  className="border border-white px-8 py-4 hover:bg-white hover:text-black transition font-medium"
                >
                  Send Message
                </button>
              </form>

              {result && <p className="mt-4 text-center">{result}</p>}
            </div>

          </div>
        </div>
      </div>

      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
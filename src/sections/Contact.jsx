import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";

const Contact = () => {
  const containerRef = useRef(null);

  const [status, setStatus] = useState("");
  const items = Array(5).fill("just imagine, I code");

  useGSAP(
    () => {
      gsap.from(".social-link", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary local test
    setStatus("Form received successfully.");
    e.target.reset();

    console.log("Form submitted locally.");
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle="You Dream It, I Code It"
          title="Contact"
          text="Got a question or project idea? We'd love to hear from you."
          textColor="text-white"
          withScrollTrigger
        />

        <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2>Email</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl lowercase">
                johndoe@gmail.com
              </p>
            </div>

            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl">
                +33 7 12 12 32 12
              </p>
            </div>

            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />

              <div className="flex flex-wrap gap-2">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm hover:text-white/70 transition"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>

            <div className="social-link">
              <h2>Message</h2>
              <div className="w-full h-px my-2 bg-white/30" />

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="bg-transparent border border-white/30 p-2 text-white"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  required
                  className="bg-transparent border border-white/30 p-2 text-white"
                />

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Write your message"
                  required
                  className="bg-transparent border border-white/30 p-2 text-white"
                />

                <button
                  type="submit"
                  className="border border-white px-4 py-2 hover:bg-white hover:text-black transition"
                >
                  Send Message
                </button>

                {status && (
                  <p className="text-sm opacity-80">
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Marquee
        items={items}
        className="text-white bg-transparent"
      />
    </section>
  );
};

export default Contact;
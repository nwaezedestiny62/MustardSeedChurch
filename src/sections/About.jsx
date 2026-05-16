import { useRef, useState, useEffect } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `Passionate about clean architecture
    I build scalable, high-performance solutions
    from prototype to production`;

  const aboutText = `Obsessed with building fast, intuitive apps—from pixel-perfect React UIs to bulletproof serverless backends. Every line of code is a promise: quality that users feel.
  When I’m not shipping:
⚡️ Open-sourcing my latest experiment (or hacking on yours)
🎥 Teaching devs on Twitch/YouTube—because rising tides lift all ships
🧗 Rock climbing (problem-solving with real stakes)
🎸 Strumming chords while CI pipelines pass (multitasking at its finest)`;

  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Make sure the cover stays when video exits fullscreen
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        videoEl.pause();
        setPlaying(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen?.();
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl px-4 sm:px-6 lg:px-10">
      <AnimatedHeaderSection
        subTitle={"Cod with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pb-16">
        {/* Video with play button */}
        <div
          className="relative w-full sm:w-4/5 md:w-2/3 lg:w-1/2 rounded-3xl overflow-hidden cursor-pointer"
          onClick={handlePlay}
        >
          {!playing && (
            <img
              ref={imgRef}
              src="/images/man.jpg"
              alt="Video cover"
              className="w-full h-auto object-cover rounded-3xl"
            />
          )}

          <video
            ref={videoRef}
            src="/videos/about.mp4"
            className="w-full h-auto rounded-3xl"
            style={{ display: playing ? "block" : "none" }}
            controls
          />

          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/30 hover:bg-white/50 rounded-full p-6">
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* About text */}
        <AnimatedTextLines
          text={aboutText}
          className="w-full lg:w-1/2 text-base sm:text-lg md:text-xl lg:text-2xl text-white/60"
        />
      </div>
    </section>
  );
};

export default About;
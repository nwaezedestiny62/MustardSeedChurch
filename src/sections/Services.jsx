import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Services = () => {
  const sectionRefs = useRef([]);

  useGSAP(() => {
    sectionRefs.current.forEach((el) => {
      if (!el) return;

      const divider = el.querySelector(".divider");

      gsap.from(el, {
        y: 150,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });

      if (divider) {
        gsap.to(divider, {
          width: "100%",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        });
      }
    });
  }, []);

  return (
    <section id="services" className="bg-black text-white">

      <AnimatedHeaderSection
        subTitle={"Dive into our moments"}
        title={"Weekly Buzz"}
        text={`Stay connected, inspired, and uplifted through every section below.`}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      {servicesData.map((service, index) => {
        const baseClass = "border-t border-white/30 px-6 sm:px-10 py-12 sm:py-16 min-h-screen";

        // 🔹 SPLIT / ANNOUNCEMENT
        if (service.type === "split") {
          return (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className={`${baseClass} flex flex-col md:flex-row items-center gap-8 md:gap-10`}
            >
              <div className="flex-1">
                <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-4 sm:mb-6">{service.title}</h2>
                <p className="text-base sm:text-lg text-white/70">{service.description}</p>
              </div>

              <div className="flex-1 w-full h-auto">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        }

        // 🔹 FULL / FLASHBACKS
        if (service.type === "full") {
          const imagesRef = useRef([]);
          const currentIndex = useRef(0);

          useGSAP(() => {
            const images = imagesRef.current;
            if (!images || images.length === 0) return;

            gsap.set(images, { opacity: 0, scale: 1.2, x: 0 });
            gsap.set(images[0], { opacity: 1, scale: 1 });

            const animateSlide = () => {
              const current = currentIndex.current;
              const next = (current + 1) % images.length;

              gsap.timeline()
                .to(images[current], { scale: 1.1, duration: 2, ease: "power2.inOut" })
                .to(images[current], { x: -100, opacity: 0, duration: 1, ease: "power2.inOut" })
                .set(images[next], { x: 100, scale: 1.2 })
                .to(images[next], { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" });

              currentIndex.current = next;
            };

            const interval = setInterval(animateSlide, 4000);
            return () => clearInterval(interval);
          }, []);

          return (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className={`${baseClass} relative h-screen w-full overflow-hidden flex items-center justify-center`}
            >
              <div className="absolute inset-0">
                {service.images?.map((img, i) => (
                  <div
                    key={i}
                    ref={(el) => (imagesRef.current[i] = el)}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                ))}
              </div>

              <div className="absolute inset-0 bg-black/50" />

              <h2 className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-bold bg-black/60 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-center">
                {service.title}
              </h2>

              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10 overflow-x-auto">
                {service.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-12 sm:w-16 h-8 sm:h-10 object-cover rounded-md opacity-70 hover:opacity-100 transition"
                  />
                ))}
              </div>
            </div>
          );
        }

        // 🔹 VERSE
        if (service.type === "verse") {
          return (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className={`${baseClass} relative flex flex-col justify-center items-center text-center overflow-hidden px-4 sm:px-6`}
            >
              <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-white/5 blur-3xl rounded-full animate-pulse" />
              <div className="relative z-10 max-w-xl sm:max-w-3xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8 tracking-wide">{service.title}</h2>
                <p className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed text-white/90 italic">
                  “{service.verse.split("—")[0]}”
                </p>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/60 tracking-widest">
                  — {service.verse.split("—")[1]}
                </p>
              </div>
            </div>
          );
        }

        // 🔹 VIDEO
        if (service.type === "video") {
          return (
            <div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className={`${baseClass} flex flex-col md:flex-row items-center gap-6 sm:gap-10`}
            >
              <div className="flex-1 w-full">
                <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-4 sm:mb-6">{service.title}</h2>
                <p className="text-base sm:text-lg text-white/70">{service.description}</p>
              </div>

              <div className="flex-1 w-full">
                <video
                  src={service.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                />
              </div>
            </div>
          );
        }

        return null;
      })}
    </section>
  );
};

export default Services;
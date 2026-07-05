import { useRef, useState, useEffect } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { supabase } from "../lib/supabase";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// 🔹 Sub-component for the Full Gallery to avoid Hook violations in loops
const FullGallery = ({ service, baseClass }) => {
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
  }, [service.images]);

  return (
    <div className={`${baseClass} relative h-screen w-full overflow-hidden flex items-center justify-center`}>
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
};

const Services = () => {
  const sectionRefs = useRef([]);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStream, setCurrentStream] = useState({ url: "", title: "" });

  // Fetch services from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('order');

        if (error) throw error;
        setServicesData(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServicesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const openStream = (url, title) => {
    let finalUrl = url;

    if (url.includes("youtube.com")) {
      finalUrl = url.includes("?")
        ? `${url}&autoplay=1&modestbranding=1&rel=0`
        : `${url}?autoplay=1&modestbranding=1&rel=0`;
    } else if (url.includes("facebook.com")) {
      finalUrl = url.includes("?")
        ? `${url}&autoplay=true&show_text=false`
        : `${url}?autoplay=true&show_text=false`;
    }

    setCurrentStream({ url: finalUrl, title });
    setModalOpen(true);
  };

  // GSAP Animations for sections
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
  }, [servicesData]);

  if (loading) {
    return (
      <section id="weekly-buzz" className="bg-black text-white">
        <AnimatedHeaderSection
          subTitle="Teens Arm of Assemblies of God Ikeja"
          title="MSC Moments"
          text="Stay connected, inspired, and on fire for God through powerful worship, Word, and fellowship."
          textColor="text-white"
          withScrollTrigger={true}
        />
        <div className="border-t border-white/30 px-6 sm:px-10 py-12 sm:py-16 min-h-screen flex items-center justify-center">
          <p className="text-white/70">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="weekly-buzz" className="bg-black text-white">
      <AnimatedHeaderSection
        subTitle="Teens Arm of Assemblies of God Ikeja"
        title="MSC Moments"
        text="Stay connected, inspired, and on fire for God through powerful worship, Word, and fellowship."
        textColor="text-white"
        withScrollTrigger={true}
      />

      {servicesData.map((service, index) => {
        const baseClass = "border-t border-white/30 px-6 sm:px-10 py-12 sm:py-16 min-h-screen";

        // 🔹 SPLIT / ANNOUNCEMENTS
        if (service.type === "split") {
          return (
            <div
              key={service.id || index}
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
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
          );
        }

        // 🔹 FULL / FLASHBACKS
        if (service.type === "full") {
          return (
            <div key={service.id || index} ref={(el) => (sectionRefs.current[index] = el)}>
              <FullGallery service={service} baseClass={baseClass} />
            </div>
          );
        }

        // 🔹 VERSE OF THE WEEK
        if (service.type === "verse") {
          return (
            <div
              key={service.id || index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className={`${baseClass} relative flex flex-col justify-center items-center text-center overflow-hidden px-4 sm:px-6`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url('${service.image || '/images/paradox.jpg'}')`,
                  filter: "brightness(0.65) contrast(1.15)"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
              <div className="relative z-10 max-w-3xl px-4 py-8">
                <div className="mb-8">
                  <span className="inline-block px-4 py-1 bg-white/10 text-xs tracking-[2px] rounded-full border border-white/30">
                    VERSE OF THE WEEK
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-8 tracking-wide text-white">
                  {service.title}
                </h2>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-10 text-left">
                  <p className="text-xl sm:text-2xl leading-relaxed text-white/90 italic">
                    "{service.verse}"
                  </p>
                </div>
                <p className="mt-8 text-white/70 text-sm sm:text-base max-w-lg mx-auto">
                  {service.description}
                </p>
              </div>
            </div>
          );
        }

        // 🔹 VIDEO / PROGRAMS - LIVE STREAM SECTION
        if (service.type === "video") {
          return (
            <div
              key={service.id || index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className={`${baseClass} relative min-h-screen w-full overflow-hidden flex items-center justify-center py-12 md:py-16`}
            >
              <video
                src={service.video || "/videos/program.mp4"}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_1px)] bg-[length:30px_30px] md:bg-[length:40px_40px] opacity-5 pointer-events-none" />
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
                <div className="text-center mb-10 md:mb-16">
                  <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-3xl mb-6">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-emerald-300 text-xs sm:text-sm font-medium tracking-[3px] uppercase">LIVE EVENTS</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 px-2">
                    {service.title}
                  </h2>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto px-2">
                    {service.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
                  {service.live_streams?.map((stream, streamIdx) => {
                    const isYoutube = !!stream.youtube_id;
                    const embedUrl = isYoutube 
                      ? `https://www.youtube.com/embed/${stream.youtube_id}`
                      : stream.facebook_url;
                    const thumbnail = isYoutube
                      ? `https://img.youtube.com/vi/${stream.youtube_id}/maxresdefault.jpg`
                      : "https://picsum.photos/id/1015/1280/720";
                    const badgeColor = isYoutube ? "bg-red-600" : "bg-sky-600";

                    return (
                      <div
                        key={streamIdx}
                        onClick={() => openStream(embedUrl, stream.title)}
                        className="group relative cursor-pointer active:scale-95 transition-transform"
                      >
                        <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl opacity-30 group-hover:opacity-70 blur-xl transition-all duration-700" />
                        <div className="relative bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl overflow-hidden shadow-2xl">
                          <div className="aspect-video bg-black/80 relative overflow-hidden">
                            <img
                              src={thumbnail}
                              alt={stream.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            {stream.is_live && (
                              <div className={`absolute top-4 left-4 ${badgeColor} text-white text-xs font-bold px-4 py-1.5 rounded-2xl flex items-center gap-2 shadow-lg`}>
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                LIVE
                              </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
                              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-black ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 4.01V8" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="p-5 md:p-6">
                            <h3 className="font-semibold text-lg md:text-xl mb-1">{stream.title}</h3>
                            <p className="text-white/60 text-sm md:text-base">{stream.schedule}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {service.discover_more_link && (
                  <a
                    href={service.discover_more_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 md:mt-16 group inline-flex items-center gap-3 bg-white text-black font-semibold px-8 sm:px-10 py-4 rounded-2xl hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 text-base sm:text-lg w-full sm:w-auto justify-center"
                  >
                    Discover More of Our Content
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
              <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="w-2 h-0.5 bg-white/40 rounded-full" />
                ))}
              </div>
            </div>
          );
        }

        return null;
      })}

      {/* ==================== LIVE STREAM MODAL ==================== */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6"
          onClick={() => setModalOpen(false)}
        >
          <div className="relative w-full max-w-5xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white pr-4 line-clamp-1">
                {currentStream.title}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-4xl leading-none text-white/70 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <iframe
                src={currentStream.url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                title={currentStream.title}
              />
            </div>
            <p className="text-center text-white/50 text-sm mt-6">
              Tap outside or press ESC to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;

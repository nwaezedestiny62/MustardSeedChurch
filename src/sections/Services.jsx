import { useRef, useState, useEffect } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import MediaFrame from "../components/MediaFrame";
import { supabase } from "../lib/supabase";
import { servicesData as originalData } from "../constants";
import { isVideoUrl } from "../lib/media";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const HorizontalGallery = ({ service, onOpen }) => {
  const scrollRef = useRef(null);
  const items = service.images || [];

  if (items.length === 0) return null;

  return (
    <div className="bg-black overflow-hidden flex flex-col">
      <div className="px-6 sm:px-10 py-10">
        <span className="text-white/30 text-[10px] tracking-[6px] uppercase font-black mb-2 block">
          Archive
        </span>
        <h2 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-white">
          {service.title}
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 sm:px-10 pb-20 cursor-grab active:cursor-grabbing"
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map((item, i) => {
          const video = isVideoUrl(item);
          return (
            <button
              type="button"
              key={i}
              onClick={() => onOpen?.(item, service.title)}
              className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] aspect-[4/5] sm:aspect-[3/4] rounded-[40px] overflow-hidden snap-center group relative text-left"
            >
              <MediaFrame
                src={item}
                className="w-full h-full"
                autoPlay={video}
                muted
                loop
                controls={false}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <span className="text-white text-[10px] tracking-[4px] uppercase font-black bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
                  {video ? "Play Video" : "View Image"}
                </span>
              </div>
              {video && (
                <div className="absolute top-6 right-6 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-xl pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
        <div className="flex-shrink-0 w-[10vw]" />
      </div>
    </div>
  );
};

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStream, setCurrentStream] = useState({ url: "", title: "", native: false });
  const lenis = useLenis();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase.from("services").select("*").order("order");

        if (error) throw error;

        if (data && data.length > 0) {
          setServicesData(data);
        } else {
          setServicesData(originalData);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServicesData(originalData);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        if (lenis) lenis.resize();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading, servicesData, lenis]);

  const openMedia = (url, title = "") => {
    if (!url) return;
    if (isVideoUrl(url)) {
      setCurrentStream({ url, title, native: true });
      setModalOpen(true);
      return;
    }
    setCurrentStream({ url, title, native: false, image: true });
    setModalOpen(true);
  };

  const openStream = (stream) => {
    if (stream.video_url) {
      setCurrentStream({ url: stream.video_url, title: stream.title, native: true });
      setModalOpen(true);
      return;
    }

    const isYoutube = !!stream.youtube_id;
    let finalUrl = isYoutube
      ? `https://www.youtube.com/embed/${stream.youtube_id}`
      : stream.facebook_url || "";

    if (!finalUrl) return;

    if (finalUrl.includes("youtube.com")) {
      finalUrl = finalUrl.includes("?") ? `${finalUrl}&autoplay=1` : `${finalUrl}?autoplay=1`;
    } else if (finalUrl.includes("facebook.com")) {
      finalUrl = finalUrl.includes("?") ? `${finalUrl}&autoplay=true` : `${finalUrl}?autoplay=true`;
    }

    setCurrentStream({ url: finalUrl, title: stream.title, native: false });
    setModalOpen(true);
  };

  if (loading) {
    return (
      <section id="services" className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section id="weekly buzz" className="bg-black text-white w-full">
      <AnimatedHeaderSection
        subTitle="Teens Arm of Assemblies of God Ikeja"
        title="MSC Moments"
        text="Stay connected, inspired, and on fire for God through powerful worship, Word, and fellowship."
        textColor="text-white"
        withScrollTrigger={true}
      />

      <div className="flex flex-col w-full">
        {servicesData.map((service, index) => {
          const baseClass =
            "border-t border-white/10 px-6 sm:px-10 py-20 min-h-[60vh] relative w-full";

          if (service.type === "split") {
            const media = service.video || service.image;
            return (
              <div
                key={service.id || index}
                className={`${baseClass} flex flex-col md:flex-row items-center gap-12`}
              >
                <div className="flex-1">
                  <h2 className="text-4xl sm:text-5xl font-black mb-6 uppercase italic tracking-tighter">
                    {service.title}
                  </h2>
                  <p className="text-lg text-white/60 leading-relaxed">{service.description}</p>
                </div>
                <div className="flex-1 w-full h-[450px]">
                  <MediaFrame
                    src={media}
                    className="w-full h-full rounded-[32px] shadow-2xl"
                    autoPlay={isVideoUrl(media)}
                    muted
                    loop
                    controls={isVideoUrl(media)}
                    preload="auto"
                  />
                </div>
              </div>
            );
          }

          if (service.type === "full") {
            return (
              <div key={service.id || index} className="w-full border-t border-white/10">
                <HorizontalGallery service={service} onOpen={openMedia} />
              </div>
            );
          }

          if (service.type === "verse") {
            const bg = service.image || service.video;
            return (
              <div
                key={service.id || index}
                className={`${baseClass} relative flex flex-col items-center text-center py-40 w-full overflow-hidden`}
              >
                {isVideoUrl(bg) ? (
                  <MediaFrame
                    src={bg}
                    className="absolute inset-0 w-full h-full opacity-40"
                    autoPlay
                    muted
                    loop
                    controls={false}
                    preload="auto"
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url('${bg || "/images/paradox.jpg"}')` }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black" />
                <div className="relative z-10 max-w-4xl px-6">
                  <span className="inline-block px-6 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] tracking-[4px] uppercase font-black text-white/60 mb-8">
                    Word of God
                  </span>
                  <p className="text-3xl md:text-5xl font-serif italic leading-tight text-white mb-8">
                    "{service.verse}"
                  </p>
                  <p className="text-white/40 text-sm uppercase tracking-widest">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          }

          if (service.type === "video") {
            return (
              <div
                key={service.id || index}
                className={`${baseClass} flex flex-col items-center py-24 w-full`}
              >
                <h2 className="text-5xl sm:text-7xl font-black italic uppercase tracking-tighter mb-16">
                  {service.title}
                </h2>

                {service.video && isVideoUrl(service.video) && (
                  <div className="w-full max-w-5xl mb-16 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                    <MediaFrame
                      src={service.video}
                      className="w-full aspect-video"
                      controls
                      autoPlay={false}
                      muted={false}
                      preload="auto"
                      objectFit="contain"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                  {service.live_streams?.map((stream, sIdx) => {
                    const isYoutube = !!stream.youtube_id;
                    const native = !!stream.video_url;
                    const thumb = stream.cover_image
                      ? stream.cover_image
                      : isYoutube
                        ? `https://img.youtube.com/vi/${stream.youtube_id}/maxresdefault.jpg`
                        : native
                          ? undefined
                          : "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop";

                    return (
                      <div
                        key={sIdx}
                        onClick={() => openStream(stream)}
                        className="group relative cursor-pointer active:scale-95 transition-all duration-300"
                      >
                        <div className="relative bg-zinc-900/50 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
                          <div className="aspect-video relative overflow-hidden">
                            {native && !stream.cover_image ? (
                              <MediaFrame
                                src={stream.video_url}
                                className="w-full h-full"
                                autoPlay
                                muted
                                loop
                                controls={false}
                              />
                            ) : (
                              <img
                                src={thumb}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                alt=""
                              />
                            )}

                            {stream.is_live && (
                              <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full z-10 animate-pulse flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                LIVE
                              </div>
                            )}

                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="p-8">
                            <h4 className="font-bold text-xl mb-1 uppercase tracking-tight">
                              {stream.title}
                            </h4>
                            <p className="text-white/30 text-xs uppercase tracking-[3px] font-medium">
                              {stream.schedule}
                            </p>
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
                    className="mt-20 group inline-flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-black text-xs tracking-[4px] uppercase transition-all hover:scale-105 active:scale-95 shadow-xl"
                  >
                    Explore More
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-5xl aspect-video bg-black rounded-[40px] overflow-hidden border border-white/20 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            {currentStream.native || isVideoUrl(currentStream.url) ? (
              <video
                key={currentStream.url}
                src={currentStream.url}
                className="w-full h-full object-contain bg-black"
                controls
                autoPlay
                playsInline
                preload="auto"
              />
            ) : currentStream.image ? (
              <img src={currentStream.url} alt="" className="w-full h-full object-contain bg-black" />
            ) : (
              <iframe
                src={currentStream.url}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title={currentStream.title || "Stream"}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
import { useEffect, useRef, useState } from "react";
import { guessContentType, isVideoUrl } from "../lib/media";

const MediaFrame = ({
  src,
  alt = "",
  className = "",
  autoPlay = false,
  muted,
  loop = false,
  controls = false,
  poster,
  preload = "metadata",
  objectFit = "cover",
  onClick,
}) => {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  const video = isVideoUrl(src);
  const mute = muted ?? autoPlay;

  useEffect(() => {
    setFailed(false);
    setReady(false);
  }, [src]);

  useEffect(() => {
    const el = videoRef.current;
    const wrap = wrapRef.current;
    if (!el || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (autoPlay) {
            el.play().catch(() => {});
          }
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(wrap || el);
    return () => io.disconnect();
  }, [src, video, autoPlay]);

  if (!src) {
    return (
      <div className={`bg-zinc-900 flex items-center justify-center ${className}`}>
        <span className="text-white/20 text-[10px] uppercase tracking-[3px]">No media</span>
      </div>
    );
  }

  if (!video || failed) {
    return (
      <img
        src={failed && video ? poster : src}
        alt={alt}
        className={className}
        style={{ objectFit }}
        onClick={onClick}
      />
    );
  }

  const type = guessContentType(src);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`} onClick={onClick}>
      {!ready && (
        <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center z-[1]">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full"
        style={{ objectFit }}
        autoPlay={autoPlay}
        muted={mute}
        loop={loop}
        controls={controls}
        playsInline
        webkit-playsinline="true"
        preload={preload}
        poster={poster}
        controlsList="nodownload"
        onLoadedData={() => setReady(true)}
        onCanPlay={() => {
          setReady(true);
          if (autoPlay && videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }}
        onError={() => setFailed(true)}
      >
        {type ? <source src={src} type={type} /> : null}
        <source src={src} />
      </video>
    </div>
  );
};

export default MediaFrame;
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section className="hero-section relative h-dvh w-full overflow-hidden text-white">

      {/* 🔥 BACKGROUND TEXTURE */}
      <div
        className="absolute inset-0 -z-50 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url('/bg-texture.png')",
          filter: "contrast(120%) brightness(90%)",
        }}
      />

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/90 -z-40" />

      {/* 🎯 EXTRA NOISE GRAIN */}
      <div
        className="absolute inset-0 -z-30 pointer-events-none"
        style={{ backgroundImage: "url('/bg-texture.png')" }}
      />

      {/* Leaves */}
      <img
        src="/leaf-left.png"
        alt="leaf"
        className={`absolute w-[180px] sm:w-[220px] md:w-[300px] transition-all duration-500
          ${isMobile 
            ? "-left-12 top-[10%]" 
            : "-left-[3%] top-[60%] -translate-y-1/2 rotate-[20deg]"
          }`}
        loading="eager"
      />

      <img
        src="/leaf-right.png"
        alt="leaf"
        className={`absolute w-[180px] sm:w-[220px] md:w-[300px] opacity-90 transition-all duration-500
          ${isMobile
            ? "-right-12 top-[15%] rotate-[15deg]"
            : "-right-[4%] top-[40%] -translate-y-1/2 -rotate-[35deg] scale-95 opacity-80"
          }`}
        loading="eager"
      />

      {/* Tree Element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-35]">
        <img
          src="/tree.png"
          alt="Mustard Seed Tree"
          className={`
            absolute left-1/2 -translate-x-1/2 
            object-contain pointer-events-none
            ${isMobile 
              ? "top-[56%] w-[380px] -translate-y-1/2"     
              : "top-[70%] -translate-y-1/2 w-[900px] md:w-[1200px] lg:w-[650px]"
            }
          `}
          loading="eager"
        />
      </div>

      {/* BIG TITLE */}
      <h1
        className="
          font-[Bodoni_Moda]
          absolute top-[32%] sm:top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 
          text-[42px] sm:text-[52px] md:text-[88px] lg:text-[89px]
          font-black
          tracking-[0.30em]
          text-center
          px-4
          bg-gradient-to-b from-white via-white to-gray-400
          bg-clip-text text-transparent
          leading-[0.95]
        "
      >
        MUSTARD SEED<br />CHURCH
      </h1>

      {/* Left Text - Church Version */}
      <div className="absolute left-4 md:left-6 bottom-8 md:bottom-24 max-w-[240px] md:max-w-[250px]">
        <p className="text-sm text-white/70 mb-2">A Place of Faith & Growth</p>
        <h2 className="text-[22px] md:text-4xl font-serif leading-tight text-[#e6d3a3]">
          Small Beginnings,<br />Great Harvest
        </h2>
      </div>

      {/* Right Text - Church Version */}
      <div className="absolute right-4 md:right-6 bottom-16 md:bottom-24 max-w-[240px] md:max-w-[260px] text-right">
        <p className="text-sm text-white/70 mb-5 leading-relaxed">
          Where faith is planted, nurtured, and multiplied.
        </p>
        <a 
          href="#services" 
          className="text-white underline underline-offset-4 hover:opacity-80 transition"
        >
          Explore Ministries
        </a>
      </div>

    </section>
  );
};

export default Hero;
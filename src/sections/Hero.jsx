import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
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
      <div className="absolute inset-0 bg-black/100 -z-40" />

      {/* 🎯 EXTRA NOISE GRAIN */}
      <div
        className="absolute inset-0 -z-30 pointer-events-none"
        style={{ backgroundImage: "url('/bg-texture.png')" }}
      />

      <img
  src="/leaf-left.png"
  alt="leaf"
  className={`absolute w-[180px] sm:w-[220px] md:w-[300px] transition-all duration-500
    ${isMobile 
      ? "-left-12 top-[10%]" 
      : "-left-[3%] top-[60%] -translate-y-1/2 rotate-[20deg]"
    }`}
/>

      <img
  src="/leaf-right.png"
  alt="leaf"
  className={`absolute w-[180px] sm:w-[220px] md:w-[300px] opacity-90 transition-all duration-500
    ${isMobile
      ? "-right-12 top-[15%] rotate-[15deg]"
      : "-right-[4%] top-[40%] -translate-y-1/2 -rotate-[35deg] scale-95 opacity-80"
    }`}
/>

      {/* 🍸 CENTER GLASS - Now visible on ALL devices, smaller & moved up on mobile */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-35]">
        <img
          src="/tree.png"
          alt="glass"
          className={`
            absolute left-1/2 -translate-x-1/2 
            object-contain pointer-events-none
            ${isMobile 
              ? "top-[56%] w-[380px] -translate-y-1/2"     // smaller + moved up on mobile
              : "top-[70%] -translate-y-1/2 w-[900px] md:w-[1200px] lg:w-[650px]"
            }
          `}
        />
      </div>

      {/* 🔥 BIG TITLE - Fully responsive */}
<h1
  className="
    font-[Bodoni_Moda]
    absolute top-[32%] sm:top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 
    text-[42px] sm:text-[52px] md:text-[88px] lg:text-[89px]
    font-black
    tracking-[0.30em]
    text-center
    px-4
    font-bold
    bg-gradient-to-b from-white via-white to-gray-400
    bg-clip-text text-transparent
    leading-[0.95]
  "
>
  MUSTARD SEED<br />CHURCH
</h1>

      {/* 🟡 LEFT TEXT */}
      <div className="absolute left-4 md:left-6 bottom-16 md:bottom-24 max-w-[240px] md:max-w-[250px]">
        <p className="text-sm text-white/70 mb-2">
          Cool. Crisp. Classic.
        </p>
        <h2 className="text-[22px] md:text-4xl font-serif leading-tight text-[#e6d3a3]">
          Sip the Spirit <br /> of Summer
        </h2>
      </div>

      {/* ⚪ RIGHT TEXT */}
      <div className="absolute right-4 md:right-6 bottom-16 md:bottom-24 max-w-[240px] md:max-w-[260px] text-right">
        <p className="text-sm text-white/70 mb-5 leading-relaxed">
          Every cocktail on our menu is a blend of premium ingredients,
          creative flair, and timeless recipes — designed to delight your senses.
        </p>
        <button className="text-white underline underline-offset-4 hover:opacity-80 transition">
          View cocktails
        </button>
      </div>

      {/* Canvas (hidden) */}
      <figure className="absolute inset-0 -z-50 opacity-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}>
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer form="circle" intensity={2} position={[0, 5, -9]} scale={10} />
              <Lightformer form="circle" intensity={2} position={[0, 3, 1]} scale={10} />
              <Lightformer form="circle" intensity={2} position={[-5, -1, -1]} scale={10} />
              <Lightformer form="circle" intensity={2} position={[10, 1, 0]} scale={16} />
            </group>
          </Environment>
        </Canvas>
      </figure>

    </section>
  );
};

export default Hero;
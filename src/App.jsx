import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ← Add this

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";

import Admin from "./pages/Admin"; // ← Import Admin

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router> {/* Wrap everything with Router */}
      <ReactLenis root className="relative w-screen min-h-screen overflow-x-hidden">
        {!isReady && (
          <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
            <p className="mb-4 text-xl tracking-widest animate-pulse">Loading...</p>
            <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
              <div className="absolute top-0 left-0 h-full w-[100%] transition-all duration-700 bg-[#e6d3a3]"></div>
            </div>
          </div>
        )}

        <div className={`${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}>
          <Routes>
            {/* Public Website */}
            <Route path="/" element={
              <>
                <Navbar />
                <Hero />
                <ServiceSummary />
                <Services />
                <About />
                <Works />
                <ContactSummary />
                <Contact />
              </>
            } />

            {/* Admin CMS */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </ReactLenis>
    </Router>
  );
};

export default App;
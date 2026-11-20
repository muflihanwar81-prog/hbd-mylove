"use client";

import { motion } from "framer-motion";
import { openingData } from "@/lib/data-konten";

export default function OpeningSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const imageSrc = openingData.polaroidPhoto || "/images/couple-main.jpg";

  return (
    <section
      id="home"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none bg-[#120207]"
    >
      {/* ── Background Photo (User's Photo - Fullscreen 100vh) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={imageSrc}
          alt="Couple Background"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />

        {/* Cinematic Dark Overlay for Crisp Contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(18, 2, 7, 0.45) 0%, rgba(18, 2, 7, 0.25) 30%, rgba(18, 2, 7, 0.35) 70%, rgba(18, 2, 7, 0.75) 100%)",
          }}
        />

        {/* Warm Cinematic Edge Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow:
              "inset 0 0 160px rgba(18, 2, 7, 0.7), inset 0 0 70px rgba(36, 5, 14, 0.4)",
          }}
        />
      </div>

      {/* ── Center Typography (Exact Match to Reference: Pure White Text) ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pointer-events-none">
        {/* HAPPY BIRTHDAY — Elegant High-Contrast Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.08em] text-white leading-none uppercase"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow:
              "0 4px 30px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.6)",
          }}
        >
          HAPPY BIRTHDAY
        </motion.h1>

        {/* to my favorite person — Delicate Flowing Script Font in Pure White */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white -mt-2 sm:-mt-4 md:-mt-6 tracking-normal"
          style={{
            fontFamily: "'Alex Brush', 'Dancing Script', cursive",
            textShadow:
              "0 2px 20px rgba(0, 0, 0, 0.8), 0 1px 6px rgba(0, 0, 0, 0.5)",
          }}
        >
          to my favorite person
        </motion.p>
      </div>

      {/* ── Scroll to Explore — Bottom Center ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() => scrollTo("memories")}
        className="absolute bottom-6 sm:bottom-10 z-20 flex flex-col items-center cursor-pointer select-none group pointer-events-auto"
      >
        <div className="w-5 h-8 rounded-full border border-white/40 group-hover:border-white/80 transition-colors flex justify-center pt-1.5 backdrop-blur-[2px]">
          <motion.div
            animate={{ y: [0, 9, 0], opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-white/80 rounded-full"
          />
        </div>
        <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.28em] text-white/60 group-hover:text-white/95 uppercase mt-2.5 transition-colors">
          Scroll to Explore
        </p>
      </motion.div>
    </section>
  );
}

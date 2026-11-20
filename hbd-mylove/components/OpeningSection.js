"use client";

import { motion } from "framer-motion";
import { openingData } from "@/lib/data-konten";

export default function OpeningSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* ── Full-Screen Background Photo ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={openingData.polaroidPhoto || "/images/couple-main.svg"}
          alt="Couple Background"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 35%" }}
        />

        {/* Soft Warm Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(168, 50, 80, 0.25) 0%, rgba(74, 16, 33, 0.4) 60%, transparent 80%)",
          }}
        />

        {/* Dark Cinematic Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(18, 2, 7, 0.5) 0%, rgba(18, 2, 7, 0.25) 35%, rgba(18, 2, 7, 0.35) 65%, rgba(18, 2, 7, 0.8) 100%)",
          }}
        />

        {/* Warm Cinematic Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow:
              "inset 0 0 160px rgba(18, 2, 7, 0.75), inset 0 0 70px rgba(53, 11, 25, 0.35)",
          }}
        />
      </div>

      {/* ── Centered Aesthetic Romantic Typography ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        {/* HAPPY BIRTHDAY — Elegant Bold Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.06em] text-white leading-tight uppercase"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow:
              "0 4px 35px rgba(0, 0, 0, 0.7), 0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          HAPPY BIRTHDAY
        </motion.h1>

        {/* to my favorite person — Delicate Handwritten / Script Font in Soft Lavender */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide mt-2 sm:mt-4 capitalize"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: "#E2D4F0",
            textShadow:
              "0 2px 25px rgba(226, 212, 240, 0.4), 0 2px 15px rgba(0, 0, 0, 0.7)",
          }}
        >
          to my favorite person
        </motion.p>
      </div>

      {/* ── Scroll to Explore — Bottom Center ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        onClick={() => scrollTo("memories")}
        className="absolute bottom-7 sm:bottom-10 z-10 flex flex-col items-center cursor-pointer select-none group"
      >
        {/* Animated Mouse Capsule Indicator */}
        <div className="w-5 h-8 rounded-full border border-white/40 group-hover:border-white/80 transition-colors flex justify-center pt-1.5 backdrop-blur-[2px]">
          <motion.div
            animate={{ y: [0, 9, 0], opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-white/80 rounded-full"
          />
        </div>

        {/* Label */}
        <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-white/60 group-hover:text-white/90 uppercase mt-2.5 transition-colors">
          Scroll to Explore
        </p>
      </motion.div>
    </section>
  );
}

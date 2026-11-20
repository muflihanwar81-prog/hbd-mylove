"use client";

import { motion } from "framer-motion";
import { openingData } from "@/lib/data-konten";

export default function OpeningSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const imageSrc = openingData.polaroidPhoto || "/images/couple-surface.jpg";

  return (
    <section
      id="home"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none bg-[#120207]"
    >
      {/* ── Ambient Blurred Background (Cinematic Fill for All Aspect Ratios) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover blur-3xl opacity-35 scale-125"
        />
        {/* Deep wine dark backdrop gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(74, 16, 33, 0.3) 0%, rgba(36, 5, 14, 0.6) 60%, rgba(18, 2, 7, 0.95) 100%)",
          }}
        />
      </div>

      {/* ── Main Full-Screen Hero Photo Composition ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <img
          src={imageSrc}
          alt="Happy Birthday to my favorite person"
          className="w-full h-full object-contain sm:object-cover"
          style={{ objectPosition: "center center" }}
        />

        {/* Soft Vignette Overlay around edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow:
              "inset 0 0 120px rgba(18, 2, 7, 0.65), inset 0 0 60px rgba(53, 11, 25, 0.3)",
          }}
        />

        {/* Accessible Heading for Screen Readers */}
        <h1 className="sr-only">HAPPY BIRTHDAY to my favorite person</h1>
      </motion.div>

      {/* ── Bottom Animated Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() => scrollTo("memories")}
        className="absolute bottom-6 sm:bottom-10 z-20 flex flex-col items-center cursor-pointer select-none group"
      >
        {/* Animated Mouse Capsule */}
        <div className="w-5 h-8 rounded-full border border-white/40 group-hover:border-white/80 transition-colors flex justify-center pt-1.5 backdrop-blur-[2px]">
          <motion.div
            animate={{ y: [0, 9, 0], opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-white/80 rounded-full"
          />
        </div>

        {/* Label */}
        <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.28em] text-white/60 group-hover:text-white/95 uppercase mt-2.5 transition-colors">
          Scroll to Explore
        </p>
      </motion.div>
    </section>
  );
}

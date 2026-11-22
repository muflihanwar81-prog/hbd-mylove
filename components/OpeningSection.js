"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, Gift, Sparkles, X, Heart } from "lucide-react";
import { openingData, coupleData } from "@/lib/data-konten";

export default function OpeningSection() {
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const imageSrc = openingData.polaroidPhoto || "/images/couple-main.jpg";

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-end overflow-hidden select-none bg-[#26040D]"
    >
      {/* ── 1. Full-Screen Cinematic Backdrop Photo ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          src={imageSrc}
          alt="Our Story Cinematic Background"
          className="w-full h-full object-cover object-[center_20%] md:object-[25%_25%]"
        />

        {/* Cinematic Translucent Dark Overlay */}
        <div className="absolute inset-0 bg-[#26040D]/50 pointer-events-none" />

        {/* Multi-Directional Film Gradients (Dark burgundy from Left, Right, Top and Bottom) */}
        {/* Left Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#26040D]/90 via-[#26040D]/40 to-transparent pointer-events-none md:w-3/5" />
        {/* Right Dark Gradient (Darker on Right side where information sits) */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#26040D]/95 via-[#26040D]/75 to-transparent pointer-events-none md:w-3/4 md:left-auto" />
        {/* Top Gradient for Header contrast */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#26040D]/90 via-[#26040D]/40 to-transparent pointer-events-none" />
        {/* Bottom Fade to blend seamlessly with next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#4A0714] via-[#350710]/80 to-transparent pointer-events-none" />
      </div>

      {/* ── 2. Information & Story Content Area (Right-Aligned / Cinematic Movie Hero) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 pt-28 sm:pt-32 pb-16 sm:pb-20 flex justify-center md:justify-end">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl md:max-w-2xl lg:max-w-xl flex flex-col items-start text-left"
        >
          {/* Badge / Category: FOR MY FAVORITE PERSON */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 border border-[#B08A52]/40 backdrop-blur-md mb-3 sm:mb-4 shadow-sm">
            <Sparkles size={13} className="text-[#FFF5E8]" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] text-[#FFF5E8] uppercase">
              Untuk orang favoritku
            </span>
          </div>

          {/* Small Meta Info: A SPECIAL DAY • MADE WITH LOVE */}
          <p className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-[#B08A52] uppercase mb-1.5 sm:mb-2 font-semibold">
            HARI YANG DITUNGGU TUNGGU
          </p>

          {/* Big Cinematic Movie Title: 19 */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#FFF5E8] tracking-tight uppercase leading-[0.95] mb-2"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
            19
          </h1>

          {/* Subtitle: HAPPY BIRTHDAY */}
          <h2
            className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[#FFF5E8] tracking-wider uppercase mb-4 sm:mb-5"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.8)",
            }}
          >
            HAPPY BIRTHDAY
          </h2>

          {/* Romantic & Personal Story Description */}
          <p className="text-xs sm:text-base md:text-lg text-[#FFF5E8]/90 font-normal leading-relaxed mb-6 sm:mb-8 max-w-lg">
            Selamat ulang tahun sayang, Semoga panjang umur sehat selalu, selalu dalam lindungan Allah SWT, dan dimudahkan rezekinya, aminn 
          </p>

          {/* ── 3. Three Interactive Buttons ── */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 w-full">
            {/* 1. Buka Surat (White Clean Button with Play Icon) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("letter")}
              className="flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl cursor-pointer bg-[#FFF5E8] text-[#26040D] hover:bg-white"
              style={{
                boxShadow: "0 6px 25px rgba(255, 245, 232, 0.25)",
              }}
            >
              <Play size={15} className="fill-[#26040D] text-[#26040D]" />
              <span>Buka Suratnya</span>
            </motion.button>

            {/* 2. Our Story (Dark Charcoal Button with Info Icon) */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.18)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("memories")}
              className="flex items-center justify-center gap-2 px-4.5 sm:px-6 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase text-[#FFF5E8] transition-all backdrop-blur-md cursor-pointer"
              style={{
                background: "rgba(59, 7, 21, 0.85)",
                border: "1px solid rgba(176, 138, 82, 0.4)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
              }}
            >
              <Info size={15} />
              <span>Gallery</span>
            </motion.button>

            {/* 3. Surprise (Dark Background Gift Icon Button) */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSurpriseModal(true)}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md text-[#FFF5E8] hover:bg-white/10"
              style={{
                background: "rgba(38, 4, 13, 0.9)",
                border: "1px solid rgba(176, 138, 82, 0.5)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
              }}
              title="Surprise Box"
              aria-label="Surprise Box"
            >
              <Gift size={18} className="animate-pulse text-[#B08A52]" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ── Modal: Selengkapnya (Synopsis & Cast) ── */}
      <AnimatePresence>
        {showStoryModal && (
          <div
            onClick={() => setShowStoryModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0F1422] border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl text-white"
            >
              <button
                onClick={() => setShowStoryModal(false)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
              <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
                PRODUCTION ARCHIVE • 2026
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                Behind Our Story
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Sebuah film kehidupan nyata yang disutradarai oleh takdir, dibintangi oleh dua hati yang saling mencintai. Tidak ada naskah yang sempurna, tapi setiap detiknya selalu istimewa saat dilalui bersamamu.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-mono">
                <span>Starring: {coupleData.partnerName} & You</span>
                <span>Rating: 10/10 ★</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

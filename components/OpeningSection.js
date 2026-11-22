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

  const imageSrc = openingData.polaroidPhoto || "/images/home-hero.jpg";

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden select-none bg-[#26040D]"
    >
      {/* ── 1. Background Photo & 270deg Maroon Gradient (Split Hero Concept) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src={imageSrc}
          alt="Home Hero Photo"
          className="w-full h-full object-cover object-[center_12%] md:object-[15%_center]"
        />

        {/* Desktop Split Gradient: linear-gradient(270deg, Dark Burgundy 95% on Right -> Burgundy 70% in Middle -> 0% Transparent on Left Photo) */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, rgba(38, 4, 13, 0.95) 0%, rgba(38, 4, 13, 0.95) 45%, rgba(74, 11, 28, 0.70) 65%, rgba(38, 4, 13, 0) 100%)",
          }}
        />

        {/* Mobile Gradient: Top Photo remains clear, bottom overlay ensures text readability */}
        <div
          className="md:hidden absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(38, 4, 13, 0) 0%, rgba(38, 4, 13, 0.25) 30%, rgba(74, 11, 28, 0.85) 60%, rgba(38, 4, 13, 0.98) 85%, #26040D 100%)",
          }}
        />

        {/* Seamless bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-[#26040D] to-transparent pointer-events-none" />
      </div>

      {/* ── 2. Split Hero Content Container (55% Left Photo Space / 45% Right Text Area) ── */}
      <div className="relative z-10 w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-16 sm:pb-20 flex flex-col md:flex-row items-center justify-between">
        {/* Left Area (55% width on desktop: left open and clear for the hero photo) */}
        <div className="hidden md:block md:w-[52%] lg:w-[55%] pointer-events-none" />

        {/* Right Area (45% width: birthday texts, greetings, and action buttons) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-[48%] lg:w-[45%] flex flex-col items-start text-left mt-auto md:mt-0"
        >
          {/* Badge: UNTUK ORANG FAVORITKU */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B0715]/60 border border-[#C5A46D]/60 backdrop-blur-md mb-3 sm:mb-4 shadow-sm">
            <Sparkles size={13} className="text-[#C5A46D]" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] text-[#FFF5E8] uppercase">
              UNTUK ORANG FAVORITKU
            </span>
          </div>

          {/* Meta Info: HARI YANG DITUNGGU TUNGGU */}
          <p className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-[#C5A46D] uppercase mb-1.5 sm:mb-2 font-semibold">
            HARI YANG DITUNGGU TUNGGU
          </p>

          {/* Age Number: 19 */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#FFF5E8] tracking-tight uppercase leading-[0.95] mb-2"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
            19
          </h1>

          {/* Title: HAPPY BIRTHDAY */}
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFF5E8] tracking-wider uppercase mb-4 sm:mb-5"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.8)",
            }}
          >
            HAPPY BIRTHDAY
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-base md:text-lg text-[#F2E6D5] font-normal leading-relaxed mb-6 sm:mb-8 max-w-lg">
            Selamat ulang tahun sayang, Semoga panjang umur sehat selalu, selalu dalam lindungan Allah SWT, dan dimudahkan rezekinya, aminn
          </p>

          {/* ── 3. Action Buttons ── */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full">
            {/* Primary Button: Buka Suratnya (Cream background, Dark Burgundy text) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("letter")}
              className="flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl cursor-pointer bg-[#FFF5E8] hover:bg-[#F2E6D5] text-[#26040D]"
              style={{
                boxShadow: "0 6px 25px rgba(255, 245, 232, 0.25)",
              }}
            >
              <Play size={15} className="fill-[#26040D] text-[#26040D]" />
              <span>BUKA SURATNYA</span>
            </motion.button>

            {/* Secondary Button: Gallery (Dark Burgundy background, Antique Gold border, Warm Ivory text) */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 7, 21, 0.95)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("memories")}
              className="flex items-center justify-center gap-2 px-4.5 sm:px-6 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase text-[#FFF5E8] transition-all backdrop-blur-md cursor-pointer bg-[#26040D] border border-[#C5A46D] shadow-lg hover:border-[#FFF5E8]"
            >
              <Info size={15} className="text-[#C5A46D]" />
              <span>GALLERY</span>
            </motion.button>

            {/* Surprise Gift Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSurpriseModal(true)}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md bg-[#26040D] border border-[#C5A46D] hover:border-[#FFF5E8] text-[#C5A46D] shadow-md"
              title="Surprise Box"
              aria-label="Surprise Box"
            >
              <Gift size={18} className="animate-pulse text-[#C5A46D]" />
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

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
      className="relative w-full min-h-screen flex items-center justify-end overflow-hidden select-none bg-[#080B12]"
    >
      {/* ── 1. Full-Screen Cinematic Backdrop Photo ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          src={imageSrc}
          alt="Our Story Cinematic Background"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 35%" }}
        />

        {/* Cinematic Translucent Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Multi-Directional Film Gradients (Dark from Left and Right, plus Top and Bottom) */}
        {/* Left Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none md:w-3/5" />
        {/* Right Dark Gradient (Darker on Right side where information sits) */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#080B12]/95 via-[#080B12]/75 to-transparent pointer-events-none md:w-3/4 md:left-auto" />
        {/* Top Gradient for Header contrast */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
        {/* Bottom Fade to blend seamlessly with next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#080B12] via-[#080B12]/70 to-transparent pointer-events-none" />
      </div>

      {/* ── 2. Information & Story Content Area (Right-Aligned / Cinematic Movie Hero) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-32 pb-20 flex justify-end">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl md:max-w-2xl lg:max-w-xl flex flex-col items-start text-left"
        >
          {/* Badge / Category: FOR MY FAVORITE PERSON */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/10 border border-white/20 backdrop-blur-md mb-4 shadow-sm">
            <Sparkles size={13} className="text-white" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-white uppercase">
              Untuk orang favoritku
            </span>
          </div>

          {/* Small Meta Info: A SPECIAL DAY • MADE WITH LOVE */}
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-white/70 uppercase mb-2">
            HARI YANG DITUNGGU TUNGGU
          </p>

          {/* Big Cinematic Movie Title: OUR STORY */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.95] mb-2"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
            19
          </h1>

          {/* Subtitle: EVERY MOMENT WITH YOU */}
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wider uppercase mb-5"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.8)",
            }}
          >
            HAPPY BIRTHDAY
          </h2>

          {/* Romantic & Personal Story Description */}
          <p className="text-sm sm:text-base md:text-lg text-white/85 font-normal leading-relaxed mb-8 max-w-lg">
            Selamat ulang tahun sayang, Semoga panjang umur sehat selalu, selalu dalam lindungan Allah SWT, dan dimudahkan rezekinya, aminn 
          </p>

          {/* ── 3. Three Interactive Buttons ── */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full">
            {/* 1. Buka Surat (White Clean Button with Play Icon) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("letter")}
              className="flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl cursor-pointer bg-white text-[#080B12] hover:bg-white/90"
              style={{
                boxShadow: "0 6px 25px rgba(255, 255, 255, 0.25)",
              }}
            >
              <Play size={16} className="fill-[#080B12] text-[#080B12]" />
              <span>Buka Suratnya</span>
            </motion.button>

            {/* 2. Our Story (Dark Charcoal Button with Info Icon) */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.18)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("memories")}
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase text-white transition-all backdrop-blur-md cursor-pointer"
              style={{
                background: "rgba(28, 32, 45, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
              }}
            >
              <Info size={16} />
              <span>Gallery</span>
            </motion.button>

            {/* 3. Surprise (Dark Background Gift Icon Button) */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSurpriseModal(true)}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md text-white hover:bg-white/10"
              style={{
                background: "rgba(18, 22, 34, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
              }}
              title="Surprise Box"
              aria-label="Surprise Box"
            >
              <Gift size={20} className="animate-pulse" />
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

      {/* ── Modal: Surprise Gift ── */}
      <AnimatePresence>
        {showSurpriseModal && (
          <div
            onClick={() => setShowSurpriseModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-gradient-to-b from-[#141A2E] to-[#0A0D17] border border-white/20 p-8 rounded-3xl shadow-2xl text-center text-white"
            >
              <button
                onClick={() => setShowSurpriseModal(false)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
              <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center text-white mb-4">
                <Heart size={32} className="fill-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                A Surprise For You ✨
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                Terima kasih sudah menjadi bagian terindah dalam hidupku. Surat cinta spesial dan kumpulan memori kita menantimu di bawah.
              </p>
              <button
                onClick={() => {
                  setShowSurpriseModal(false);
                  scrollTo("letter");
                }}
                className="w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider text-[#0A0D14] bg-white hover:bg-white/90 hover:scale-102 transition-transform cursor-pointer"
              >
                Baca Surat Spesial Sekarang →
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

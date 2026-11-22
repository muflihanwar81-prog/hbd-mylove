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
      className="relative w-full min-h-screen overflow-hidden select-none bg-black flex items-center justify-end"
    >
      {/* ── 1. Full Background Photo (100vw x 100vh, Cover, Natural Focus on Faces) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src={imageSrc}
          alt="Home Hero Background"
          className="w-full h-full object-cover object-[15%_25%] sm:object-[18%_30%] md:object-[12%_35%]"
        />

        {/* ── 2. Transparent Black Gradient Overlay ── */}
        {/* Desktop 270deg Gradient: Sisi Kanan 90% -> Tengah 40-75% -> Sisi Kiri 10% (Sesuai Spesifikasi) */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none z-10 backdrop-blur-[1px]"
          style={{
            background:
              "linear-gradient(270deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.40) 65%, rgba(0,0,0,0.10) 100%)",
          }}
        />

        {/* Mobile Gradient: Top photo remains natural, bottom overlay provides high contrast for text */}
        <div
          className="md:hidden absolute inset-0 pointer-events-none z-10 backdrop-blur-[1px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.30) 30%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.95) 90%)",
          }}
        />

        {/* Seamless bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </div>

      {/* ── 3. Content Container (Right-Aligned, Text Content with High Contrast) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 pt-28 sm:pt-32 pb-16 sm:pb-20 flex justify-center md:justify-end">
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg md:max-w-xl lg:max-w-xl flex flex-col items-start text-left mt-auto md:mt-0"
        >
          {/* Badge: UNTUK ORANG FAVORITKU */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151515]/90 border border-[#C5A46D]/60 backdrop-blur-md mb-3 sm:mb-4 shadow-sm">
            <Sparkles size={13} className="text-[#C5A46D]" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] text-[#FFF5E8] uppercase">
              UNTUK ORANG FAVORITKU
            </span>
          </div>

          {/* Meta Info: HARI YANG DITUNGGU TUNGGU */}
          <p className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-[#C5A46D] uppercase mb-1.5 sm:mb-2 font-semibold">
            HARI YANG DITUNGGU TUNGGU
          </p>

          {/* Big Age Number: 19 */}
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#FFF5E8] tracking-tight uppercase leading-[0.92] mb-2"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              textShadow: "0 4px 35px rgba(0, 0, 0, 0.95), 0 0 30px rgba(197, 164, 109, 0.15)",
            }}
          >
            19
          </h1>

          {/* Title: HAPPY BIRTHDAY */}
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#FFF5E8] tracking-wider uppercase mb-4 sm:mb-5"
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.9)",
            }}
          >
            HAPPY BIRTHDAY
          </h2>

          {/* Soft Cream Description */}
          <p className="text-xs sm:text-base md:text-lg text-[#F2E6D5] font-normal leading-relaxed mb-6 sm:mb-8 max-w-lg">
            Selamat ulang tahun sayang, Semoga panjang umur sehat selalu, selalu dalam lindungan Allah SWT, dan dimudahkan rezekinya, aminn
          </p>

          {/* ── Action Buttons ── */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full">
            {/* Primary Button: BUKA SURATNYA (Cream background, Black text) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("letter")}
              className="flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl cursor-pointer bg-[#FFF5E8] hover:bg-[#F2E6D5] text-black"
              style={{
                boxShadow: "0 6px 25px rgba(255, 245, 232, 0.25)",
              }}
            >
              <Play size={15} className="fill-black text-black" />
              <span>BUKA SURATNYA</span>
            </motion.button>

            {/* Secondary Button: GALLERY (Black transparent background, Antique Gold border, Warm Ivory text) */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 0, 0, 0.85)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("memories")}
              className="flex items-center justify-center gap-2 px-4.5 sm:px-6 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase text-[#FFF5E8] transition-all backdrop-blur-md cursor-pointer bg-black/60 border border-[#C5A46D] shadow-lg hover:border-[#FFF5E8]"
            >
              <Info size={15} className="text-[#C5A46D]" />
              <span>GALLERY</span>
            </motion.button>

            {/* Surprise Gift Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSurpriseModal(true)}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md bg-black/60 border border-[#C5A46D] hover:border-[#FFF5E8] text-[#C5A46D] shadow-md hover:bg-black/80"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#151515] border border-[#C5A46D]/40 p-6 sm:p-8 rounded-2xl shadow-2xl text-[#FFF5E8]"
            >
              <button
                onClick={() => setShowStoryModal(false)}
                className="absolute top-4 right-4 p-2 text-[#FFF5E8]/60 hover:text-[#FFF5E8]"
              >
                <X size={20} />
              </button>
              <span className="text-[11px] font-mono tracking-widest text-[#C5A46D] uppercase font-semibold">
                PRODUCTION ARCHIVE • 2026
              </span>
              <h3 className="text-2xl font-bold text-[#FFF5E8] mt-1 mb-3">
                Behind Our Story
              </h3>
              <p className="text-sm text-[#F2E6D5] leading-relaxed mb-4">
                Sebuah film kehidupan nyata yang disutradarai oleh takdir, dibintangi oleh dua hati yang saling mencintai. Tidak ada naskah yang sempurna, tapi setiap detiknya selalu istimewa saat dilalui bersamamu.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FFF5E8]/60 font-mono">
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
              className="relative w-full max-w-md bg-[#151515] border border-[#C5A46D]/50 p-8 rounded-3xl shadow-2xl text-center text-[#FFF5E8]"
            >
              <button
                onClick={() => setShowSurpriseModal(false)}
                className="absolute top-4 right-4 p-2 text-[#FFF5E8]/60 hover:text-[#FFF5E8]"
              >
                <X size={20} />
              </button>
              <div className="w-16 h-16 mx-auto rounded-full bg-[#202020] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D] mb-4">
                <Heart size={32} className="fill-[#C5A46D]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FFF5E8] mb-2">
                A Surprise For You ✨
              </h3>
              <p className="text-sm text-[#F2E6D5] leading-relaxed mb-6">
                Terima kasih sudah menjadi bagian terindah dalam hidupku. Surat cinta spesial dan kumpulan memori kita menantimu di bawah.
              </p>
              <button
                onClick={() => {
                  setShowSurpriseModal(false);
                  scrollTo("letter");
                }}
                className="w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider text-[#080808] bg-[#FFF5E8] hover:bg-[#F2E6D5] hover:scale-102 transition-transform cursor-pointer"
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

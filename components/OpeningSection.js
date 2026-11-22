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
      className="relative w-full min-h-screen overflow-hidden select-none bg-[#080808] flex items-center"
    >
      {/* ── Soft Ambient Lighting (Gold Ambient Glow & Charcoal Depth) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 75% 35%, rgba(197, 164, 109, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 25% 60%, rgba(32, 32, 32, 0.5) 0%, transparent 70%)",
        }}
      />

      {/* ── Background Photo Layer (Enlarged below header, Left ~52-54%, Contained so full body & face are clear) ── */}
      <div className="absolute top-20 sm:top-24 bottom-0 left-0 w-full md:w-[52%] lg:w-[54%] flex items-end md:items-center justify-center md:justify-start px-2 sm:px-4 md:pl-8 lg:pl-14 pb-2 md:pb-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full h-[calc(100vh-95px)] max-h-[880px] flex items-center justify-center md:justify-start"
        >
          <img
            src={imageSrc}
            alt="Home Hero Photo"
            className="w-auto h-full max-w-full object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]"
            style={{
              objectPosition: "center bottom md:left bottom",
            }}
          />
        </motion.div>
      </div>

      {/* ── Horizontal Black Gradient: linear-gradient(270deg, #080808 0%, rgba(8,8,8,0.95) 40%, rgba(8,8,8,0.65) 70%, transparent 100%) ── */}
      {/* Desktop Gradient: Exact User Formula */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none z-5"
        style={{
          background:
            "linear-gradient(270deg, #080808 0%, rgba(8, 8, 8, 0.95) 40%, rgba(8, 8, 8, 0.65) 70%, transparent 100%)",
        }}
      />

      {/* Mobile Gradient: Top photo clear, bottom overlay ensures text readability */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none z-5"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(8, 8, 8, 0.25) 25%, rgba(8, 8, 8, 0.88) 55%, #080808 85%)",
        }}
      />

      {/* Subtle bottom fade to blend smoothly with next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-5" />

      {/* ── Content Container (Split Hero: Left Photo space, Right 45-50% for Text) ── */}
      <div className="relative z-10 w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-16 sm:pb-20 flex flex-col md:flex-row items-center justify-between">
        {/* Left Column Spacer (50-52% width on desktop to let enlarged photo shine unobstructed) */}
        <div className="hidden md:block md:w-[50%] lg:w-[52%] pointer-events-none" />

        {/* Right Column (48-50% width: Elegant Black Birthday Content Area) */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-[50%] lg:w-[48%] flex flex-col items-start text-left mt-auto md:mt-0"
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
            {/* Primary Button: BUKA SURATNYA (Warm Ivory background, Deep Black text) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("letter")}
              className="flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl cursor-pointer bg-[#FFF5E8] hover:bg-[#F2E6D5] text-[#080808]"
              style={{
                boxShadow: "0 6px 25px rgba(255, 245, 232, 0.2)",
              }}
            >
              <Play size={15} className="fill-[#080808] text-[#080808]" />
              <span>BUKA SURATNYA</span>
            </motion.button>

            {/* Secondary Button: GALLERY (Soft Black background, Antique Gold border, Warm Ivory text) */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#202020" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("memories")}
              className="flex items-center justify-center gap-2 px-4.5 sm:px-6 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase text-[#FFF5E8] transition-all backdrop-blur-md cursor-pointer bg-[#151515] border border-[#C5A46D] shadow-lg hover:border-[#FFF5E8]"
            >
              <Info size={15} className="text-[#C5A46D]" />
              <span>GALLERY</span>
            </motion.button>

            {/* Surprise Gift Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSurpriseModal(true)}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md bg-[#151515] border border-[#C5A46D] hover:border-[#FFF5E8] text-[#C5A46D] shadow-md hover:bg-[#202020]"
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

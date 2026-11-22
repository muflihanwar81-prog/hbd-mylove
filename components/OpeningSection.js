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
      {/* ── Layer 1: Fullscreen Background Photo (Cover, Center Position) ── */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Layer 2: Overlay Gradasi Hitam Terpisah Kiri & Kanan (Tengah Tetap Terang & Wajah Utuh) ── */}
      <div
        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.55) 20%, transparent 42%, transparent 58%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Vignette atas halus agar menu navigasi transparan tetap terbaca jelas */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
        }}
      />

      {/* Gradasi Bawah: Opacity ringan agar transisi ke section berikutnya seamless */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 md:h-36 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(0deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.25) 50%, transparent 100%)",
        }}
      />

      {/* Mobile Gradient: Wajah atas terlihat, bagian bawah kontras untuk teks */}
      <div
        className="md:hidden absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 25%, rgba(0,0,0,0.78) 55%, rgba(0,0,0,0.98) 90%)",
        }}
      />

      {/* ── Layer 4: Content Container (Dua Kolom Berjauhan, Sisakan Tengah Kosong) ── */}
      <div className="relative z-20 w-full min-h-screen max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 pt-24 sm:pt-28 pb-12 sm:pb-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6 my-auto"
        >
          {/* ── KOLOM KIRI (Sekitar 30% Lebar Layar, Digeser Lebih Dekat ke Kiri) ── */}
          <div className="w-full md:w-[34%] lg:w-[30%] flex flex-col items-start text-left">
            {/* Label: UNTUK ORANG FAVORITKU */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/40 backdrop-blur-md mb-3 sm:mb-4 shadow-sm">
              <Sparkles size={13} className="text-white" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.22em] text-white uppercase">
                UNTUK ORANG FAVORITKU
              </span>
            </div>

            {/* Teks kecil: HARI YANG DITUNGGU TUNGGU */}
            <p className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-white uppercase mb-1.5 sm:mb-2 font-semibold">
              HARI YANG DITUNGGU TUNGGU
            </p>

            {/* Angka 19 dengan ukuran besar */}
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight uppercase leading-[0.92] mb-2"
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                textShadow: "0 4px 35px rgba(0, 0, 0, 0.95), 0 0 25px rgba(255, 255, 255, 0.2)",
              }}
            >
              19
            </h1>

            {/* Judul: HAPPY BIRTHDAY */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-wider uppercase"
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                textShadow: "0 2px 20px rgba(0, 0, 0, 0.95)",
              }}
            >
              HAPPY BIRTHDAY
            </h2>
          </div>

          {/* ── AREA TENGAH TERBUKA (Bebas dari teks agar wajah orang di tengah terlihat jelas) ── */}
          <div className="hidden md:block md:w-[26%] lg:w-[34%] pointer-events-none" />

          {/* ── KOLOM KANAN (Sekitar 30% Lebar Layar, Digeser Lebih Dekat ke Kanan) ── */}
          <div className="w-full md:w-[36%] lg:w-[30%] flex flex-col items-start text-left">
            {/* Ucapan selamat ulang tahun */}
            <p className="text-sm sm:text-base md:text-lg text-white font-normal leading-relaxed mb-6 sm:mb-8 max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              Selamat ulang tahun sayang, Semoga panjang umur sehat selalu, selalu dalam lindungan Allah SWT, dan dimudahkan rezekinya, aminn
            </p>

            {/* Tombol: BUKA SURATNYA, GALLERY, dan Tombol Hadiah */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full">
              {/* Primary Button: BUKA SURATNYA (Putih dengan teks hitam) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo("letter")}
                className="flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl cursor-pointer bg-white hover:bg-white/90 text-black"
                style={{
                  boxShadow: "0 6px 25px rgba(255, 255, 255, 0.25)",
                }}
              >
                <Play size={15} className="fill-black text-black" />
                <span>BUKA SURATNYA</span>
              </motion.button>

              {/* Secondary Button: GALLERY (Transparan hitam dengan border putih) */}
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo("memories")}
                className="flex items-center justify-center gap-2 px-4.5 sm:px-6 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm tracking-wider uppercase text-white transition-all backdrop-blur-md cursor-pointer bg-black/50 border border-white/60 shadow-lg hover:border-white"
              >
                <Info size={15} className="text-white" />
                <span>GALLERY</span>
              </motion.button>

              {/* Surprise Gift Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 6 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSurpriseModal(true)}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md bg-black/50 border border-white/60 hover:border-white text-white shadow-md hover:bg-black/75"
                title="Surprise Box"
                aria-label="Surprise Box"
              >
                <Gift size={18} className="animate-pulse text-white" />
              </motion.button>
            </div>
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
              className="relative w-full max-w-lg bg-[#151515] border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl text-white"
            >
              <button
                onClick={() => setShowStoryModal(false)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
              <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase font-semibold">
                PRODUCTION ARCHIVE • 2026
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                Behind Our Story
              </h3>
              <p className="text-sm text-white/90 leading-relaxed mb-4">
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
              className="relative w-full max-w-md bg-[#151515] border border-white/30 p-8 rounded-3xl shadow-2xl text-center text-white"
            >
              <button
                onClick={() => setShowSurpriseModal(false)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
              <div className="w-16 h-16 mx-auto rounded-full bg-[#202020] border border-white/30 flex items-center justify-center text-white mb-4">
                <Heart size={32} className="fill-white text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                A Surprise For You ✨
              </h3>
              <p className="text-sm text-white/90 leading-relaxed mb-6">
                Terima kasih sudah menjadi bagian terindah dalam hidupku. Surat cinta spesial dan kumpulan memori kita menantimu di bawah.
              </p>
              <button
                onClick={() => {
                  setShowSurpriseModal(false);
                  scrollTo("letter");
                }}
                className="w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider text-black bg-white hover:bg-white/90 hover:scale-102 transition-transform cursor-pointer"
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

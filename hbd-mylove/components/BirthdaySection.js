"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, PartyPopper } from "lucide-react";
import Countdown from "@/components/Countdown";
import Confetti from "@/components/Confetti";
import { birthdayData, coupleData } from "@/lib/data-konten";

export default function BirthdaySection() {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <section
      id="birthday"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center"
    >
      <Confetti active={showConfetti} />

      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
        {/* Confetti Trigger Badge */}
        <motion.button
          onClick={triggerConfetti}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100/70 backdrop-blur-md border border-pink-200 text-pink-700 text-sm font-semibold mb-6 shadow-sm hover:bg-pink-200/70 transition-colors"
        >
          <PartyPopper size={18} className="text-pink-600" />
          <span>Klik untuk Rayakan! 🎊</span>
        </motion.button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xl md:text-2xl font-bold tracking-widest text-pink-500 uppercase block mb-1">
            {birthdayData.mainText}
          </span>
          <h2 className="text-4xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 leading-tight">
            {coupleData.name || birthdayData.nameText}
          </h2>
        </motion.div>

        {/* Frame Foto Pasangan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative my-8"
        >
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 blur-lg opacity-40 animate-pulse" />
          <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full p-2 bg-white/70 backdrop-blur-md border-2 border-pink-300 shadow-2xl overflow-hidden flex items-center justify-center">
            {birthdayData.photoSrc ? (
              <img
                src={birthdayData.photoSrc}
                alt={birthdayData.photoAlt}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-full h-full rounded-full bg-gradient-to-tr from-pink-300 via-rose-200 to-amber-100 flex flex-col items-center justify-center text-rose-600 p-4"
              style={{ display: birthdayData.photoSrc ? "none" : "flex" }}
            >
              <Heart className="w-16 h-16 fill-rose-400 text-rose-500 mb-2 animate-bounce" />
              <span className="font-bold text-sm">{coupleData.name}</span>
            </div>
          </div>
        </motion.div>

        {/* Subtitle & Caption */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-gray-700 italic max-w-xl mb-6 font-serif"
        >
          &ldquo;{birthdayData.photoCaption}&rdquo;
        </motion.p>

        {/* Age & Birthday date pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <div className="px-5 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm text-pink-700 font-semibold text-sm">
            🎂 Usia: {coupleData.age || birthdayData.ageDisplay} Tahun
          </div>
          <div className="px-5 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm text-pink-700 font-semibold text-sm">
            ✨ {birthdayData.dateDisplay}
          </div>
        </motion.div>

        {/* Countdown */}
        <div className="w-full max-w-lg">
          <Countdown />
        </div>
      </div>
    </section>
  );
}

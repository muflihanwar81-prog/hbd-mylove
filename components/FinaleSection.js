"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import Confetti from "@/components/Confetti";
import { finalData, coupleData } from "@/lib/data-konten";

export default function FinaleSection({ onRestart }) {
  const [celebrate, setCelebrate] = useState(true);

  return (
    <section id="finale" className="relative min-h-screen px-4 py-24 flex flex-col justify-center items-center text-center overflow-hidden">
      <Confetti active={celebrate} />

      <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center">
        {/* Heart icon pulse */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/50 backdrop-blur-md border border-white/80 shadow-xl flex items-center justify-center mb-6"
        >
          <Heart className="w-10 h-10 md:w-12 md:h-12 text-rose-500 fill-rose-400 animate-pulse" />
        </motion.div>

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl font-medium text-pink-600 mb-2"
        >
          {finalData.title}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 mb-6 leading-tight"
        >
          {finalData.mainText} <br />
          <span className="font-serif italic font-normal text-rose-500">
            {coupleData.name || finalData.nameText}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-gray-700 max-w-lg mb-10 leading-relaxed font-sans"
        >
          {finalData.message}
        </motion.p>

        {/* Restart Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCelebrate(true);
            if (onRestart) onRestart();
          }}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-base shadow-xl shadow-rose-300/50 border border-pink-300/50 hover:shadow-2xl transition-all"
        >
          <RotateCcw size={18} />
          <span>{finalData.restartText}</span>
        </motion.button>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-pink-200/50 w-full text-xs md:text-sm text-pink-600/70 flex items-center justify-center gap-1.5">
          <span>{finalData.footerText}</span>
          <Sparkles size={14} className="text-amber-500" />
        </div>
      </div>
    </section>
  );
}

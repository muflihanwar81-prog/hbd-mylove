"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, RotateCcw, Sparkles } from "lucide-react";
import Confetti from "@/components/Confetti";
import Countdown from "@/components/Countdown";
import { finalData, coupleData } from "@/lib/data-konten";

export default function FinaleSection({ onRestart }) {
  const [celebrate, setCelebrate] = useState(true);

  return (
    <section id="finale" className="relative min-h-screen px-4 py-24 flex flex-col justify-center items-center text-center overflow-hidden section-navy">
      <Confetti active={celebrate} />

      <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center">
        {/* Star icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6 shadow-xl"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(169, 199, 234, 0.3)",
          }}
        >
          <Star className="w-10 h-10 md:w-12 md:h-12 text-[#A9C7EA] fill-[#A9C7EA]/40 animate-pulse" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm md:text-base font-semibold tracking-widest text-[#A9C7EA] mb-2 uppercase"
        >
          {finalData.title}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-white font-heading"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {finalData.mainText} <br />
          <span style={{ fontFamily: "'Dancing Script', cursive" }} className="gradient-text-blue text-3xl md:text-5xl font-normal block mt-2">
            {coupleData.name || finalData.nameText}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-[#A9C7EA]/85 max-w-lg mb-8 leading-relaxed font-light"
        >
          {finalData.message}
        </motion.p>

        {/* Countdown Timer */}
        <div className="w-full max-w-md mb-10">
          <Countdown />
        </div>

        {/* Restart Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(169, 199, 234, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCelebrate(true);
            if (onRestart) onRestart();
          }}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base shadow-xl transition-all cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #A9C7EA, #DCE5F5, #F8F8FF)",
            color: "#102B5C",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <RotateCcw size={18} />
          <span>{finalData.restartText}</span>
        </motion.button>

        {/* Footer */}
        <div
          className="mt-16 pt-8 w-full text-xs md:text-sm text-[#A9C7EA]/50 flex items-center justify-center gap-1.5"
          style={{ borderTop: "1px solid rgba(169, 199, 234, 0.15)" }}
        >
          <span>{finalData.footerText}</span>
          <Sparkles size={14} className="text-[#A9C7EA]" />
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Gift, Heart, Sparkles } from "lucide-react";
import { openingData } from "@/lib/data-konten";

export default function OpeningSection({ onOpen, isOpened }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden text-center"
    >
      <div className="relative z-20 max-w-xl mx-auto flex flex-col items-center">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-pink-600 text-xs md:text-sm font-semibold mb-6 shadow-sm"
        >
          <Sparkles size={16} className="text-amber-500 animate-spin" style={{ animationDuration: "6s" }} />
          <span>Ada Pesan Rahasia Buat Kamu</span>
          <Sparkles size={16} className="text-amber-500 animate-spin" style={{ animationDuration: "6s" }} />
        </motion.div>

        {/* Big Greeting */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-800 leading-tight mb-4"
        >
          {openingData.greeting.split("❤️")[0]}
          <span className="text-rose-500 inline-block animate-bounce">❤️</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 font-medium max-w-md mb-8"
        >
          {openingData.subGreeting}
        </motion.p>

        {/* Gift Box Icon with Pulse Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
          className="relative mb-10 cursor-pointer group"
          onClick={onOpen}
        >
          <div className="absolute inset-0 rounded-3xl bg-pink-400/30 blur-2xl group-hover:bg-pink-500/40 transition-all duration-500" />
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-tr from-pink-400 via-rose-400 to-pink-300 p-0.5 shadow-2xl flex items-center justify-center"
          >
            <div className="w-full h-full bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/50">
              <Gift className="w-14 h-14 md:w-18 md:h-18 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
            </div>
          </motion.div>
        </motion.div>

        {/* Surprise Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -10px rgba(244, 63, 94, 0.4)" }}
          whileTap={{ scale: 0.96 }}
          onClick={onOpen}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-base md:text-lg shadow-xl shadow-rose-300/50 flex items-center gap-3 border border-pink-300/50 transition-all"
        >
          <span>{openingData.buttonText}</span>
          <Heart size={20} className="fill-white animate-pulse" />
        </motion.button>
      </div>
    </section>
  );
}

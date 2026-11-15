"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-tr from-pink-200 via-rose-100 to-amber-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex items-center justify-center">
        {/* Glowing pulse rings */}
        <motion.div
          className="absolute w-28 h-28 rounded-full bg-pink-400/20"
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-36 h-36 rounded-full bg-rose-400/15"
          animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Beating Heart */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1, 1.2, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 p-5 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-pink-300/50"
        >
          <Heart className="w-12 h-12 text-rose-500 fill-rose-400 drop-shadow-md" />
        </motion.div>
      </div>

      <motion.p
        className="mt-8 text-lg font-medium text-pink-700/80 tracking-wide font-sans"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Mempersiapkan kejutan spesial untukmu... ✨
      </motion.p>
    </motion.div>
  );
}

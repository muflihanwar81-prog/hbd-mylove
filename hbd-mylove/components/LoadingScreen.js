"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #4A1021 0%, #350B19 50%, #1D040E 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute w-28 h-28 rounded-full"
          style={{ background: "rgba(214, 165, 109, 0.2)" }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-36 h-36 rounded-full"
          style={{ background: "rgba(128, 31, 58, 0.25)" }}
          animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 p-5 rounded-full"
          style={{
            background: "rgba(53, 11, 25, 0.8)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(214, 165, 109, 0.4)",
            boxShadow: "0 0 35px rgba(214, 165, 109, 0.35)",
          }}
        >
          <Heart className="w-12 h-12 text-[#D6A56D] fill-[#801F3A]/70" />
        </motion.div>
      </div>

      <motion.p
        className="mt-8 text-base sm:text-lg font-medium text-[#FFF5ED]/90 tracking-wider font-light"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        Preparing something special for you... ✨
      </motion.p>
    </motion.div>
  );
}

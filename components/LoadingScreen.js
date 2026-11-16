"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => { if (onComplete) onComplete(); }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, #1A030C 0%, #260814 50%, #3B0B1E 100%)" }}
      initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
      <div className="relative flex items-center justify-center">
        <motion.div className="absolute w-28 h-28 rounded-full" style={{ background: "rgba(217,43,107,0.2)" }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute w-36 h-36 rounded-full" style={{ background: "rgba(226,125,155,0.12)" }}
          animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
        <motion.div animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 p-5 rounded-full"
          style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", border: "1px solid rgba(226,125,155,0.3)", boxShadow: "0 0 35px rgba(217,43,107,0.4)" }}>
          <Heart className="w-12 h-12 text-[#E27D9B] fill-[#D92B6B]/60" />
        </motion.div>
      </div>
      <motion.p className="mt-8 text-lg font-medium text-[#F7C2CF]/90 tracking-wide"
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
        Preparing something special for you... ✨
      </motion.p>
    </motion.div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCountdown, padZero } from "@/lib/format";
import { coupleData } from "@/lib/data-konten";

export default function CountdownGateSection({ onTimeReached }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    const updateCountdown = () => {
      const cd = getCountdown(coupleData.birthday);
      setTimeLeft(cd);

      // Hanya bisa masuk otomatis saat countdown tepat mencapai 00:00:00.00 (isPassed: true)
      if (cd && cd.isPassed && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        try {
          const audioEl = document.getElementById("bg-music-player");
          if (audioEl && audioEl.paused) {
            audioEl.play().catch(() => {});
          }
        } catch {}
        setTimeout(() => {
          if (onTimeReached) onTimeReached();
        }, 800);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [onTimeReached]);

  if (!mounted) return null;

  const d = padZero(timeLeft?.days ?? 0);
  const h = padZero(timeLeft?.hours ?? 0);
  const m = padZero(timeLeft?.minutes ?? 0);
  const s = padZero(timeLeft?.seconds ?? 0);

  const handleScreenClick = () => {
    // Sebelum jam 00:00:00:00, TIDAK BISA masuk ke beranda
    if (!timeLeft?.isPassed) {
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 3000);
      return;
    }

    // Jika sudah lewat jam 00:00:00:00
    if (onTimeReached) {
      try {
        const audioEl = document.getElementById("bg-music-player");
        if (audioEl && audioEl.paused) audioEl.play().catch(() => {});
      } catch {}
      onTimeReached();
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden select-none cursor-default"
      onClick={handleScreenClick}
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #4A1021 0%, #350B19 45%, #24050E 80%, #150207 100%)",
      }}
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 150px rgba(21, 2, 7, 0.95), inset 0 0 60px rgba(36, 5, 14, 0.7)",
        }}
      />

      {/* Countdown Numbers */}
      <div
        className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 tabular-nums font-extrabold tracking-tight leading-none"
        style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
          color: "#FFF5ED",
          textShadow: "0 0 40px rgba(168, 50, 80, 0.5), 0 4px 20px rgba(0,0,0,0.7)",
          fontSize: "clamp(3.5rem, 14vw, 14rem)",
        }}
      >
        <span>{d}</span>
        <span className="opacity-30 mx-[-0.05em]">:</span>
        <span>{h}</span>
        <span className="opacity-30 mx-[-0.05em]">:</span>
        <span>{m}</span>
        <span className="opacity-30 mx-[-0.05em]">:</span>
        <span>{s}</span>
      </div>

      {/* Pesan gembok jika diklik sebelum jam 00:00:00 */}
      <AnimatePresence>
        {showNotice && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-10 sm:bottom-16 px-5 py-2.5 rounded-full backdrop-blur-md z-20 flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide shadow-2xl pointer-events-none border border-white/20"
            style={{
              background: "rgba(20, 2, 8, 0.88)",
              color: "#FFF5ED",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
            }}
          >
            <span className="text-sm">🔒</span>
            <span>Belum jam 00:00:00, tunggu countdown ya sayang ✨</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

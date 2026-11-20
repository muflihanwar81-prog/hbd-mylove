"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CountdownGateSection({ onTimeReached, onPreviewUnlock }) {
  // Countdown sequence: 3 -> 2 -> 1 -> 0
  const [count, setCount] = useState(3);
  const [isFinished, setIsFinished] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Trigger background audio automatically
  useEffect(() => {
    try {
      const audioEl = document.getElementById("bg-music-player");
      if (audioEl && audioEl.paused) {
        audioEl.play().catch((e) => console.log("Audio play caught:", e));
      }
    } catch (e) {
      console.log("Audio trigger error:", e);
    }
  }, []);

  // Automatic countdown timer: 3, 2, 1, 0 -> auto transition
  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 0 && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      // Show 0 briefly, then trigger smooth transition
      const endTimer = setTimeout(() => {
        setIsFinished(true);
        setTimeout(() => {
          if (onPreviewUnlock) onPreviewUnlock();
          else if (onTimeReached) onTimeReached();
        }, 700);
      }, 900);
      return () => clearTimeout(endTimer);
    }
  }, [count, onPreviewUnlock, onTimeReached]);

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #4A1021 0%, #350B19 45%, #24050E 80%, #150207 100%)",
      }}
    >
      {/* ── Soft Ambient Cinematic Glow ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(214, 165, 109, 0.22) 0%, rgba(128, 31, 58, 0.3) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Velvet Vignette Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 120px rgba(21, 2, 7, 0.9), inset 0 0 60px rgba(36, 5, 14, 0.7)",
        }}
      />

      {/* ── Main Countdown Container ── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {/* Minimalist Top Tagline */}
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm md:text-base font-mono font-medium tracking-[0.35em] text-[#D6A56D]/85 uppercase mb-4 sm:mb-8"
        >
          {count === 0 ? "HERE WE GO ✨" : "COUNTDOWN TO CELEBRATION"}
        </motion.p>

        {/* Big Bold Modern Animated Number (3, 2, 1, 0) */}
        <div className="relative flex items-center justify-center min-h-[160px] sm:min-h-[240px] md:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              initial={{ opacity: 0, scale: 0.55, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.45, filter: "blur(12px)" }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-8xl sm:text-9xl md:text-[13rem] lg:text-[17rem] font-extrabold tabular-nums select-none tracking-tight leading-none"
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
                color: "#FFF5ED",
                textShadow: "0 0 45px rgba(214, 165, 109, 0.55), 0 0 90px rgba(168, 50, 80, 0.35), 0 4px 20px rgba(0, 0, 0, 0.8)",
              }}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimalist Subtle Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[11px] sm:text-xs md:text-sm font-light tracking-[0.25em] text-[#FFF5ED]/65 uppercase mt-4 sm:mt-8"
        >
          {count === 0 ? "Opening your special surprise..." : "A special surprise is about to begin"}
        </motion.p>
      </div>

      {/* ── Smooth Golden Bloom Flash on Completion ── */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255, 245, 237, 1) 0%, rgba(214, 165, 109, 0.95) 45%, rgba(128, 31, 58, 0.98) 100%)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

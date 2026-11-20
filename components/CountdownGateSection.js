"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getCountdown, padZero } from "@/lib/format";
import { coupleData, countdownGateData } from "@/lib/data-konten";

export default function CountdownGateSection({ onTimeReached, onPreviewUnlock }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [mounted, setMounted] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    const updateCountdown = () => {
      const cd = getCountdown(coupleData.birthday);
      setTimeLeft(cd);

      if (cd && cd.isPassed && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        // Trigger audio
        try {
          const audioEl = document.getElementById("bg-music-player");
          if (audioEl && audioEl.paused) {
            audioEl.play().catch((e) => console.log("Audio play caught:", e));
          }
        } catch (e) {
          console.log("Audio trigger error:", e);
        }
        // Transition to birthday page
        setTimeout(() => {
          if (onPreviewUnlock) onPreviewUnlock();
          else if (onTimeReached) onTimeReached();
        }, 1200);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [onPreviewUnlock, onTimeReached]);

  if (!mounted) return null;

  const units = timeLeft
    ? [
        { label: "Hari", value: timeLeft.days },
        { label: "Jam", value: timeLeft.hours },
        { label: "Menit", value: timeLeft.minutes },
        { label: "Detik", value: timeLeft.seconds },
      ]
    : [
        { label: "Hari", value: 0 },
        { label: "Jam", value: 0 },
        { label: "Menit", value: 0 },
        { label: "Detik", value: 0 },
      ];

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #4A1021 0%, #350B19 45%, #24050E 80%, #150207 100%)",
      }}
    >
      {/* ── Soft Ambient Glow ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(168, 50, 80, 0.35) 0%, rgba(100, 21, 45, 0.25) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Velvet Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 120px rgba(21, 2, 7, 0.9), inset 0 0 60px rgba(36, 5, 14, 0.7)",
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center max-w-3xl mx-auto">

        {/* Top Badge */}
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.3em] text-[#D6A56D]/80 uppercase mb-6 sm:mb-10"
        >
          {countdownGateData.badge}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF5ED] mb-3 tracking-tight leading-tight"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow: "0 2px 20px rgba(0,0,0,0.6)",
          }}
        >
          {coupleData.partnerName
            ? `Countdown to ${coupleData.partnerName.split(" ")[0]}'s Birthday`
            : "A Special Surprise For You"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[11px] sm:text-xs text-[#FFF5ED]/60 max-w-sm mx-auto mb-8 sm:mb-12 font-light tracking-wide leading-relaxed"
        >
          {countdownGateData.subtitle}
        </motion.p>

        {/* Countdown Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5"
        >
          {units.map((unit, i) => (
            <div key={unit.label} className="flex flex-col items-center">
              <div
                className="flex items-center justify-center w-[62px] sm:w-[78px] md:w-[90px] h-[72px] sm:h-[88px] md:h-[100px] rounded-2xl backdrop-blur-md shadow-2xl"
                style={{
                  background: "rgba(53, 11, 25, 0.7)",
                  border: "1px solid rgba(168, 50, 80, 0.35)",
                  boxShadow: "0 8px 32px rgba(21, 2, 7, 0.6), inset 0 1px 0 rgba(255, 245, 237, 0.06)",
                }}
              >
                <span
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tabular-nums tracking-tight"
                  style={{
                    color: "#FFF5ED",
                    textShadow: "0 0 20px rgba(168, 50, 80, 0.4), 0 2px 10px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {padZero(unit.value)}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-[#FFF5ED]/50 uppercase mt-2.5">
                {unit.label}
              </span>

              {/* Separator colon between cards (except last) */}
              {i < units.length - 1 && (
                <span
                  className="absolute text-xl sm:text-2xl font-bold text-[#FFF5ED]/25 select-none hidden"
                  aria-hidden="true"
                >
                  :
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Target Date Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#FFF5ED]/40 uppercase mt-6 sm:mt-10"
        >
          {countdownGateData.targetDateLabel} — 24 November
        </motion.p>

        {/* Preview Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={() => {
            try {
              const audioEl = document.getElementById("bg-music-player");
              if (audioEl && audioEl.paused) {
                audioEl.play().catch(() => {});
              }
            } catch {}
            if (onPreviewUnlock) onPreviewUnlock();
            else if (onTimeReached) onTimeReached();
          }}
          className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs font-semibold tracking-[0.18em] uppercase transition-all cursor-pointer hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #801F3A 0%, #64152D 50%, #4A1021 100%)",
            color: "#FFF5ED",
            border: "1px solid rgba(168, 50, 80, 0.5)",
            boxShadow: "0 8px 30px rgba(128, 31, 58, 0.4)",
          }}
        >
          {countdownGateData.previewButtonText}
        </motion.button>
      </div>
    </div>
  );
}

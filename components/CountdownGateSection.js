"use client";

import { useState, useEffect, useRef } from "react";
import { getCountdown, padZero } from "@/lib/format";
import { coupleData } from "@/lib/data-konten";

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
        try {
          const audioEl = document.getElementById("bg-music-player");
          if (audioEl && audioEl.paused) {
            audioEl.play().catch(() => {});
          }
        } catch {}
        setTimeout(() => {
          if (onPreviewUnlock) onPreviewUnlock();
          else if (onTimeReached) onTimeReached();
        }, 800);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [onPreviewUnlock, onTimeReached]);

  if (!mounted) return null;

  const d = padZero(timeLeft?.days ?? 0);
  const h = padZero(timeLeft?.hours ?? 0);
  const m = padZero(timeLeft?.minutes ?? 0);
  const s = padZero(timeLeft?.seconds ?? 0);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden select-none cursor-pointer"
      onClick={() => {
        try {
          const audioEl = document.getElementById("bg-music-player");
          if (audioEl && audioEl.paused) audioEl.play().catch(() => {});
        } catch {}
        if (onPreviewUnlock) onPreviewUnlock();
        else if (onTimeReached) onTimeReached();
      }}
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
    </div>
  );
}

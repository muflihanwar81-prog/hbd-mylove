"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCountdown, padZero } from "@/lib/format";
import { coupleData } from "@/lib/data-konten";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getCountdown(coupleData.birthday));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getCountdown(coupleData.birthday));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  if (timeLeft.isPassed) {
    return (
      <div className="text-center py-4">
        <motion.p
          className="text-2xl md:text-3xl font-bold text-pink-600 animate-pulse"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          🎉 Today is your special day! Happy Birthday! 🎉
        </motion.p>
      </div>
    );
  }

  const timeUnits = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 my-6">
      {timeUnits.map((unit, idx) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          className="flex flex-col items-center justify-center p-3 md:p-5 min-w-[70px] md:min-w-[95px] rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-lg shadow-pink-200/40"
        >
          <span className="text-2xl md:text-4xl font-extrabold text-pink-600 tabular-nums">
            {padZero(unit.value)}
          </span>
          <span className="text-xs md:text-sm font-medium text-pink-500/80 mt-1 uppercase tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

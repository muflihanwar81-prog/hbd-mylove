"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCountdown, padZero } from "@/lib/format";
import { coupleData } from "@/lib/data-konten";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getCountdown(coupleData.birthday));
    const timer = setInterval(() => {
      setTimeLeft(getCountdown(coupleData.birthday));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !timeLeft) return null;

  if (timeLeft.isPassed) {
    return (
      <div className="text-center py-4">
        <motion.p
          className="text-2xl md:text-3xl font-bold text-[#D6A56D] animate-pulse"
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
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 my-6">
      {timeUnits.map((unit, idx) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          className="flex flex-col items-center justify-center p-3 md:p-5 min-w-[70px] md:min-w-[95px] rounded-2xl"
          style={{
            background: "rgba(53, 11, 25, 0.75)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(214, 165, 109, 0.3)",
            boxShadow: "0 6px 20px rgba(18, 2, 7, 0.4)",
          }}
        >
          <span className="text-2xl md:text-4xl font-extrabold text-[#D6A56D] tabular-nums">
            {padZero(unit.value)}
          </span>
          <span className="text-xs md:text-sm font-medium text-[#FFF5ED]/70 mt-1 uppercase tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

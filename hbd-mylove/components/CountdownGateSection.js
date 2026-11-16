"use client";

import { useState, useEffect } from "react";
import { parseDate } from "@/lib/format";
import { coupleData } from "@/lib/data-konten";

function formatTimeNow(date) {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes}:${seconds} ${ampm}`;
}

function formatDateNow(date) {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNum = date.getDate();
  const year = date.getFullYear();
  return `${dayName} - ${monthName} ${dayNum}, ${year}`;
}

export default function CountdownGateSection({ onTimeReached, onPreviewUnlock }) {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setTimeStr(formatTimeNow(now));
    setDateStr(formatDateNow(now));

    const checkBirthday = (currentNow) => {
      const birthday = parseDate(coupleData.birthday);
      birthday.setHours(0, 0, 0, 0);
      birthday.setFullYear(currentNow.getFullYear());

      // If today is the birthday (at or past 00:00:00)
      const isBirthdayDay =
        currentNow.getDate() === birthday.getDate() &&
        currentNow.getMonth() === birthday.getMonth();

      if (isBirthdayDay && currentNow >= birthday) {
        if (onTimeReached) onTimeReached();
        return true;
      }
      return false;
    };

    // Check on mount
    checkBirthday(now);

    const timer = setInterval(() => {
      const tickDate = new Date();
      setTimeStr(formatTimeNow(tickDate));
      setDateStr(formatDateNow(tickDate));

      if (checkBirthday(tickDate)) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeReached]);

  if (!mounted || !timeStr) return null;

  return (
    <div
      onClick={onPreviewUnlock}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center cursor-pointer select-none px-4 text-center"
      style={{
        backgroundColor: "#260814", // Merah maron / red wine solid tanpa gradasi
      }}
      title="Klik untuk membuka beranda (mode preview)"
    >
      {/* Label Atas: Time Now */}
      <p
        className="text-lg sm:text-2xl md:text-3xl font-normal text-white/90 mb-2 sm:mb-4 tracking-normal"
        style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        }}
      >
        Time Now
      </p>

      {/* Jam Utama Besar (Contoh: 5:16:40 PM) */}
      <h1
        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight my-1 sm:my-3 tabular-nums"
        style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
          color: "#FFFFFF",
          lineHeight: "1.1",
        }}
      >
        {timeStr}
      </h1>

      {/* Tanggal Bawah (Contoh: SUN - JUN 1, 2025) */}
      <p
        className="text-sm sm:text-xl md:text-2xl font-medium text-white/80 mt-2 sm:mt-4 tracking-wider uppercase"
        style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        }}
      >
        {dateStr}
      </p>
    </div>
  );
}

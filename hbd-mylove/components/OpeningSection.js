"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, Sparkles, ArrowDown } from "lucide-react";
import { openingData, musicData, coupleData } from "@/lib/data-konten";

export default function OpeningSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressInterval = useRef(null);

  // Sync with audio element
  useEffect(() => {
    const audioEl = document.getElementById("bg-music-player");
    if (!audioEl) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      setCurrentTime(audioEl.currentTime);
      if (audioEl.duration && !isNaN(audioEl.duration)) {
        setDuration(audioEl.duration);
      }
    };

    audioEl.addEventListener("play", handlePlay);
    audioEl.addEventListener("pause", handlePause);
    audioEl.addEventListener("timeupdate", handleTimeUpdate);

    // Initial check
    if (!audioEl.paused) {
      setIsPlaying(true);
    }

    return () => {
      audioEl.removeEventListener("play", handlePlay);
      audioEl.removeEventListener("pause", handlePause);
      audioEl.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    const audioEl = document.getElementById("bg-music-player");
    if (!audioEl) return;

    if (isPlaying) {
      audioEl.pause();
    } else {
      audioEl.play().catch((err) => console.log("Play error:", err));
    }
  };

  const handleSeek = (e) => {
    const audioEl = document.getElementById("bg-music-player");
    if (!audioEl || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioEl.currentTime = pos * duration;
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-12 pt-28 pb-12 overflow-hidden">
      {/* Background Red Wine / Maroon Soft Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#581124]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#3B0B1E]/60 blur-3xl pointer-events-none" />

      {/* Main Two-Column Content (Left: Music Card, Right: Text & Actions) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-14">
        
        {/* LEFT COLUMN: Spotify-style Music Player Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-5/12 lg:w-4/12 flex justify-center shrink-0"
        >
          <div
            className="w-full max-w-[280px] sm:max-w-[320px] rounded-3xl p-4 sm:p-5 shadow-2xl transition-all duration-300 group hover:shadow-rose-950/40"
            style={{
              background: "rgba(38, 8, 20, 0.75)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(226, 125, 155, 0.22)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            }}
          >
            {/* Album Art Image */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#1A030C] shadow-inner mb-4">
              <img
                src={openingData.polaroidPhoto || "/images/couple-main.svg"}
                alt="Album Cover"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle gradient vignette over album art */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Song Title & Artist */}
            <div className="mb-3">
              <h3 className="text-white font-bold text-base sm:text-lg truncate tracking-tight">
                {musicData.title || "Teman Hidup"}
              </h3>
              <p className="text-xs sm:text-sm text-[#F7C2CF]/80 font-semibold uppercase tracking-wider mt-0.5 truncate">
                {musicData.artist || "TULUS"}
              </p>
            </div>

            {/* Timeline Progress Bar */}
            <div className="space-y-1.5 mb-4">
              <div
                onClick={handleSeek}
                className="relative h-1.5 w-full bg-white/15 rounded-full overflow-hidden cursor-pointer group/bar"
              >
                <div
                  className="h-full rounded-full transition-all duration-150"
                  style={{
                    width: `${progressPercent}%`,
                    background: "linear-gradient(90deg, #D92B6B 0%, #FFF5F7 100%)",
                  }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#F7C2CF]/70 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : "3:58"}</span>
              </div>
            </div>

            {/* Playback Controls Row */}
            <div className="flex items-center justify-between px-2">
              <button
                onClick={() => {
                  const audioEl = document.getElementById("bg-music-player");
                  if (audioEl) audioEl.currentTime = 0;
                }}
                className="text-[#F7C2CF]/70 hover:text-white transition-colors cursor-pointer p-1.5"
                title="Restart"
              >
                <SkipBack size={18} />
              </button>

              {/* Main Play/Pause Circle Button */}
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                style={{
                  background: isPlaying
                    ? "linear-gradient(135deg, #D92B6B, #F7C2CF, #FFF5F7)"
                    : "linear-gradient(135deg, #D92B6B, #F7C2CF)",
                  color: "#260814",
                  boxShadow: "0 0 20px rgba(217, 43, 107, 0.45)",
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} fill="#260814" /> : <Play size={20} fill="#260814" className="ml-0.5" />}
              </button>

              {/* Next / Wave Animation */}
              <div className="flex items-center gap-1 p-1.5">
                {isPlaying ? (
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-1 bg-[#D92B6B] rounded-full animate-pulse" style={{ height: "60%" }} />
                    <span className="w-1 bg-[#FFF5F7] rounded-full animate-pulse" style={{ height: "100%", animationDelay: "0.2s" }} />
                    <span className="w-1 bg-[#D92B6B] rounded-full animate-pulse" style={{ height: "40%", animationDelay: "0.4s" }} />
                  </div>
                ) : (
                  <Volume2 size={18} className="text-[#F7C2CF]/50" />
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Typography, Description & Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-7/12 lg:w-8/12 text-center md:text-left flex flex-col items-center md:items-start"
        >
          {/* Eyebrow / Small Upper Tagline */}
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#E8A2B5] uppercase mb-4 opacity-90">
            {openingData.badge || "A MESSAGE CARRIED IN ON THE TIDE, FOR YOU"}
          </p>

          {/* Big Headline */}
          <h1 className="mb-4">
            <span
              className="block text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight font-heading"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {openingData.greeting || "Happy Birthday,"}
            </span>
            <span
              className="block text-3xl sm:text-5xl lg:text-6xl font-normal italic gradient-text-wine leading-tight mt-1"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                textShadow: "0 0 35px rgba(217, 43, 107, 0.4)",
              }}
            >
              {openingData.nameGreeting || "My Favorite Person"}
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-sm sm:text-base lg:text-lg text-[#F7C2CF]/85 font-light leading-relaxed max-w-xl mb-8">
            {openingData.subGreeting ||
              "Somewhere past the breakers, ada a letter yang udah lama waiting for this day. Scroll down, the tide is coming in, dan ternyata dia bawa something special just for you."}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Primary Filled Pill Button in Magenta / Red Wine */}
            <motion.button
              onClick={() => scrollTo("memories")}
              whileHover={{ scale: 1.04, boxShadow: "0 10px 35px rgba(217, 43, 107, 0.55)" }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-all"
              style={{
                background: "linear-gradient(135deg, #D92B6B 0%, #B81B52 50%, #8F123C 100%)",
                color: "#FFFFFF",
                border: "1px solid rgba(255, 255, 255, 0.4)",
              }}
            >
              <span>{openingData.buttonPrimary || "Begin the Descent ↓"}</span>
            </motion.button>

            {/* Secondary Outline Pill Button */}
            <motion.button
              onClick={() => scrollTo("letter")}
              whileHover={{ scale: 1.04, background: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-all"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                color: "#FFF5F7",
                border: "1px solid rgba(226, 125, 155, 0.4)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span>{openingData.buttonSecondary || "Jump Straight to the Letter"}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM: Animated Scroll to Dive In Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center mt-8 cursor-pointer select-none"
        onClick={() => scrollTo("memories")}
      >
        {/* Mouse Capsule Icon with bouncing dot */}
        <div
          className="w-6 h-10 rounded-full border-2 border-[#E8A2B5]/60 flex justify-center pt-2 p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2 bg-[#D92B6B] rounded-full"
          />
        </div>
        <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#E8A2B5]/80 uppercase mt-2">
          {openingData.scrollText || "SCROLL TO DIVE IN"}
        </p>
      </motion.div>
    </section>
  );
}

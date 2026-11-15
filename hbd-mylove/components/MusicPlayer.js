"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { musicData } from "@/lib/data-konten";

function MusicIcon({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function DiscIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M6 12c0-3.3 2.7-6 6-6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export default function MusicPlayer({ autoPlayTrigger = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Play audio immediately when autoPlayTrigger turns true
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Auto-play was prevented by browser policy until direct click:", err);
          });
      }
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play notice:", err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Native HTML5 Audio Tag */}
      <audio
        ref={audioRef}
        id="bg-music-player"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/music/teman-hidup.mp3" type="audio/mpeg" />
        <source src="/music/tulus-teman-hidup.mp3" type="audio/mpeg" />
        <source src="/music/birthday-song.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        onClick={togglePlay}
        className="w-14 h-14 rounded-full flex items-center justify-center
                   bg-white/80 backdrop-blur-xl border border-white/90 shadow-2xl shadow-pink-300/60
                   hover:bg-white transition-all duration-300 group relative cursor-pointer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Jeda Lagu" : "Putar Lagu"}
      >
        {isPlaying ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <DiscIcon size={26} className="text-rose-600" />
          </motion.div>
        ) : (
          <MusicIcon size={24} className="text-pink-600 animate-bounce" />
        )}

        <span className="absolute bottom-full mb-2.5 px-3 py-1.5 text-xs rounded-xl
                         bg-gray-900/85 text-white whitespace-nowrap opacity-0
                         group-hover:opacity-100 transition-opacity duration-200
                         pointer-events-none backdrop-blur-sm shadow-md">
          {isPlaying ? `Jeda: ${musicData.title} - ${musicData.artist}` : `Putar: ${musicData.title} - ${musicData.artist} ♫`}
        </span>

        {isPlaying && (
          <motion.div
            className="absolute -inset-1.5 rounded-full border-2 border-rose-400 pointer-events-none"
            animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </div>
  );
}

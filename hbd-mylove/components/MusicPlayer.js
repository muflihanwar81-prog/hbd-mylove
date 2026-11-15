"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { musicData } from "@/lib/data-konten";

function MusicIcon({ size = 22, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function DiscIcon({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M6 12c0-3.3 2.7-6 6-6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// Possible song sources in order of fallback
const AUDIO_SOURCES = [
  musicData.src,
  "/music/tulus-monokrom.mp3",
  "/music/TULUS_-_Teman_Hidup__Official_Music_Video_.mp3",
  "/music/birthday-song.mp3",
];

export default function MusicPlayer({ autoPlayTrigger = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);
  const sourceIndexRef = useRef(0);

  const initAudio = (srcIndex = 0) => {
    if (srcIndex >= AUDIO_SOURCES.length) {
      setHasError(true);
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(AUDIO_SOURCES[srcIndex]);
    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = "auto";

    audio.addEventListener("error", () => {
      console.warn(`Failed loading audio source: ${AUDIO_SOURCES[srcIndex]}, trying next...`);
      sourceIndexRef.current = srcIndex + 1;
      initAudio(sourceIndexRef.current);
    });

    audio.addEventListener("playing", () => {
      setIsPlaying(true);
      setHasError(false);
    });

    audio.addEventListener("pause", () => {
      setIsPlaying(false);
    });

    audioRef.current = audio;
  };

  useEffect(() => {
    initAudio(0);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // When user opens the surprise box, trigger play automatically
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Autoplay blocked by browser policy:", e));
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) {
      initAudio(0);
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setHasError(false);
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio play error:", err);
          // Try next source if this one failed
          sourceIndexRef.current += 1;
          initAudio(sourceIndexRef.current);
          if (audioRef.current) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
          } else {
            setHasError(true);
          }
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Toast Notification when file not found */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-rose-300 text-xs font-semibold text-rose-700 shadow-xl"
          >
            <span>Format file musik tidak dapat dimuat 🎵</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Player Button */}
      <motion.button
        onClick={togglePlay}
        className="w-14 h-14 rounded-full flex items-center justify-center
                   bg-white/70 backdrop-blur-xl border border-white/80 shadow-2xl shadow-pink-300/60
                   hover:bg-white/90 transition-colors duration-300 group relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Jeda Lagu" : "Putar Lagu"}
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <DiscIcon size={26} className="text-rose-600" />
          </motion.div>
        ) : (
          <MusicIcon size={24} className="text-pink-600 animate-bounce" />
        )}

        {/* Floating Tooltip */}
        <span className="absolute bottom-full mb-2.5 px-3 py-1.5 text-xs rounded-xl
                         bg-gray-900/85 text-white whitespace-nowrap opacity-0
                         group-hover:opacity-100 transition-opacity duration-200
                         pointer-events-none backdrop-blur-sm shadow-md">
          {isPlaying ? `Jeda Musik ♫` : `Putar Musik ♫`}
        </span>

        {/* Pulse Ring effect while playing */}
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

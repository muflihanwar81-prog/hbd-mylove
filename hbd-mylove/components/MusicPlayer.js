"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Disc3 } from "lucide-react";
import { musicData } from "@/lib/data-konten";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(musicData.src);
    audio.loop = true;
    audio.volume = 0.5;

    audio.addEventListener("error", () => {
      setHasError(true);
      setIsPlaying(false);
    });

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
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
          console.warn("Audio playback notice:", err);
          setHasError(true);
          setIsPlaying(false);
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
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-pink-200 text-xs font-medium text-pink-700 shadow-lg"
          >
            <span>Letakkan file <b>tulus-monokrom.mp3</b> di folder <code>public/music/</code> ya! 🎵</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Player Button */}
      <motion.button
        onClick={togglePlay}
        className="w-14 h-14 rounded-full flex items-center justify-center
                   bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl shadow-pink-200/50
                   hover:bg-white/60 transition-colors duration-300 group relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Jeda Lagu" : "Putar Lagu"}
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Disc3 size={24} className="text-rose-600" />
          </motion.div>
        ) : (
          <Music size={22} className="text-pink-600" />
        )}

        {/* Floating Tooltip */}
        <span className="absolute bottom-full mb-2.5 px-3 py-1.5 text-xs rounded-xl
                         bg-gray-900/80 text-white whitespace-nowrap opacity-0
                         group-hover:opacity-100 transition-opacity duration-200
                         pointer-events-none backdrop-blur-sm shadow-md">
          {isPlaying ? `Jeda: ${musicData.title} - ${musicData.artist || 'Tulus'}` : `Putar: ${musicData.title} - ${musicData.artist || 'Tulus'} ♫`}
        </span>

        {/* Pulse Ring effect while playing */}
        {isPlaying && (
          <motion.div
            className="absolute -inset-1 rounded-full border-2 border-rose-400 pointer-events-none"
            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </div>
  );
}

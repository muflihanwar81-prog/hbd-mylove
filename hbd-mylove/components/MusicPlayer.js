"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { musicData } from "@/lib/data-konten";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(musicData.src);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Audio play failed, likely no user interaction yet
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center
                 bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg
                 hover:bg-white/30 transition-colors duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "Pause Music" : "Play Music"}
    >
      {isPlaying ? (
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Music size={22} className="text-pink-600" />
        </motion.div>
      ) : (
        <VolumeX size={22} className="text-pink-400" />
      )}

      {/* Tooltip */}
      <span className="absolute bottom-full mb-2 px-3 py-1 text-xs rounded-lg
                       bg-pink-600 text-white whitespace-nowrap opacity-0
                       group-hover:opacity-100 transition-opacity duration-200
                       pointer-events-none">
        {isPlaying ? "Pause Music" : "Play Music"}
      </span>

      {/* Pulse ring when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink-400"
          animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}

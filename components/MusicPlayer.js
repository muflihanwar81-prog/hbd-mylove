"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function MusicPlayer({ autoPlayTrigger = false, visible = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay caught:", err));
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Audio error:", err));
    }
  };

  return (
    <>
      {/* Hidden audio tag always in DOM ready for immediate user playback */}
      <audio
        ref={audioRef}
        id="bg-music-player"
        src={musicData.src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Button visible only when unlocked */}
      <AnimatePresence>
        {visible && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
            <motion.button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group relative cursor-pointer"
              style={{
                background: "rgba(16, 43, 92, 0.9)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(169, 199, 234, 0.4)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(169, 199, 234, 0.2)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? "Pause Music" : "Play Music"}
            >
              {isPlaying ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                  <DiscIcon size={26} className="text-[#A9C7EA]" />
                </motion.div>
              ) : (
                <MusicIcon size={24} className="text-[#A9C7EA] animate-bounce" />
              )}

              {/* Tooltip on hover */}
              <span
                className="absolute bottom-full mb-2.5 px-3 py-1.5 text-xs rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-[#A9C7EA]/20"
                style={{ background: "rgba(16, 43, 92, 0.95)", color: "#F8F8FF" }}
              >
                {isPlaying ? `Pause: ${musicData.title} - ${musicData.artist}` : `Play: ${musicData.title} - ${musicData.artist} ♫`}
              </span>

              {/* Glowing Pulse Ring while playing */}
              {isPlaying && (
                <motion.div
                  className="absolute -inset-1.5 rounded-full border-2 border-[#A9C7EA] pointer-events-none"
                  animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

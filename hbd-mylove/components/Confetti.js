"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  "#f472b6", "#ec4899", "#e11d48", "#fbbf24", "#f59e0b",
  "#ffffff", "#fda4af", "#fb7185", "#fde68a", "#a855f7",
];

export default function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (active) {
      const generated = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 8,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        rotation: Math.random() * 720 - 360,
        isCircle: Math.random() > 0.5,
        drift: (Math.random() - 0.5) * 200,
      }));
      setPieces(generated);
    } else {
      setPieces([]);
    }
  }, [active]);

  return (
    <AnimatePresence>
      {active && pieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{
                left: `${piece.x}%`,
                top: "-2%",
                width: piece.size,
                height: piece.isCircle ? piece.size : piece.size * 1.5,
                backgroundColor: piece.color,
                borderRadius: piece.isCircle ? "50%" : "2px",
              }}
              initial={{ y: 0, opacity: 1, rotate: 0, x: 0 }}
              animate={{
                y: [0, typeof window !== "undefined" ? window.innerHeight + 100 : 1200],
                opacity: [1, 1, 0],
                rotate: [0, piece.rotation],
                x: [0, piece.drift],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "easeIn",
              }}
              exit={{ opacity: 0 }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

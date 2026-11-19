"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  "#D6A56D", "#64152D", "#801F3A", "#A83250", "#4A1021", "#FFF5ED", "#C4925A",
];

export default function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (active) {
      const generated = Array.from({ length: 65 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 8,
        delay: Math.random() * 0.5,
        duration: 2.2 + Math.random() * 2,
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
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: "-2%",
                width: p.size,
                height: p.isCircle ? p.size : p.size * 1.5,
                backgroundColor: p.color,
                borderRadius: p.isCircle ? "50%" : "2px",
              }}
              initial={{ y: 0, opacity: 1, rotate: 0, x: 0 }}
              animate={{
                y: [0, typeof window !== "undefined" ? window.innerHeight + 100 : 1200],
                opacity: [1, 1, 0],
                rotate: [0, p.rotation],
                x: [0, p.drift],
              }}
              transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
              exit={{ opacity: 0 }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

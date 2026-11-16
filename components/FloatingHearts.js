"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const colors = ["#D92B6B", "#E27D9B", "#F7C2CF", "#B81B52"];
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i * 17 + 5) % 100,
      size: 14 + (i % 4) * 5,
      delay: (i % 6) * 0.8,
      duration: 7 + (i % 5) * 1.5,
      opacity: 0.15 + (i % 3) * 0.08,
      color: colors[i % colors.length],
    }));
    setPetals(generated);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: `${petal.x}%`, bottom: "-5%" }}
          animate={{
            y: [0, typeof window !== "undefined" ? -window.innerHeight - 100 : -1200],
            x: [0, Math.sin(petal.id) * 35, 0],
            rotate: [0, petal.id % 2 === 0 ? 360 : -360],
          }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
        >
          <Heart
            size={petal.size}
            style={{ color: petal.color, fill: `${petal.color}40`, opacity: petal.opacity }}
          />
        </motion.div>
      ))}
    </div>
  );
}

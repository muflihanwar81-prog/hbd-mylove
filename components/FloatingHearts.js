"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const colors = ["#FFFFFF", "#F8FAFC", "#E2E8F0", "#CBD5E1", "#FFFFFF"];
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: (i * 17 + 5) % 100,
      size: 12 + (i % 4) * 4,
      delay: (i % 6) * 0.9,
      duration: 8 + (i % 5) * 1.8,
      opacity: 0.18 + (i % 3) * 0.08,
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
            x: [0, Math.sin(petal.id) * 30, 0],
            rotate: [0, petal.id % 2 === 0 ? 360 : -360],
          }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
        >
          <Heart
            size={petal.size}
            style={{ color: petal.color, fill: `${petal.color}45`, opacity: petal.opacity }}
          />
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function FloatingHearts() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 12 + Math.random() * 20,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 8,
      opacity: 0.05 + Math.random() * 0.1,
    }));
    setPetals(generated);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div key={petal.id} className="absolute"
          style={{ left: `${petal.x}%`, bottom: "-5%" }}
          animate={{
            y: [0, typeof window !== "undefined" ? -window.innerHeight - 100 : -1200],
            x: [0, Math.sin(petal.id) * 30, 0],
            rotate: [0, petal.id % 2 === 0 ? 360 : -360],
          }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}>
          <Star size={petal.size} className="text-[#A9C7EA] fill-[#A9C7EA]/20" style={{ opacity: petal.opacity }} />
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SparkleStars() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: (i * 37 + 11) % 100,
      y: (i * 53 + 7) % 100,
      size: 2 + (i % 3),
      delay: (i % 5) * 0.7,
      duration: 2.2 + (i % 3) * 0.8,
    }));
    setStars(generated);
  }, []);

  if (stars.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background:
              star.id % 2 === 0
                ? "rgba(255, 245, 237, 0.95)"
                : "rgba(214, 165, 109, 0.85)",
            boxShadow:
              star.id % 2 === 0
                ? "0 0 8px rgba(255, 245, 237, 0.8)"
                : "0 0 10px rgba(214, 165, 109, 0.8)",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

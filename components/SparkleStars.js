"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SparkleStars() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 4,
      duration: 1.5 + Math.random() * 3,
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
              star.id % 3 === 0
                ? "rgba(255, 255, 255, 0.9)"
                : star.id % 3 === 1
                ? "rgba(253, 230, 138, 0.8)"
                : "rgba(251, 207, 232, 0.8)",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

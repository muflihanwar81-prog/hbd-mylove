"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 12 + Math.random() * 20,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 8,
      opacity: 0.08 + Math.random() * 0.15,
    }));
    setHearts(generated);
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: "-5%",
          }}
          animate={{
            y: [0, -window?.innerHeight ? -window.innerHeight - 100 : -1200],
            x: [0, Math.sin(heart.id) * 30, 0],
            rotate: [0, heart.id % 2 === 0 ? 360 : -360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart
            size={heart.size}
            className="text-pink-400 fill-pink-300"
            style={{ opacity: heart.opacity }}
          />
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { reasonsData } from "@/lib/data-konten";

export default function ReasonsSection() {
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <section id="reasons" className="relative min-h-screen px-4 py-20 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/60 border border-pink-200 text-pink-600 text-sm font-semibold mb-3"
          >
            <Heart size={16} className="fill-pink-500" />
            <span>Alasan Mengapa Kamu Begitu Berarti</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
          >
            {reasonsData.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-md mx-auto mt-2 text-sm md:text-base"
          >
            {reasonsData.subtitle}
          </motion.p>
        </div>

        {/* Reasons Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasonsData.reasons.map((item, idx) => {
            const isSelected = activeCard === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => toggleCard(item.id)}
                className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-br from-pink-500/90 to-rose-600/90 text-white shadow-xl shadow-rose-300/50 border-rose-400"
                    : "bg-white/50 backdrop-blur-md hover:bg-white/80 text-gray-800 shadow-lg shadow-pink-100/40 border-white/80"
                }`}
              >
                <div>
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      isSelected ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isSelected ? "text-pink-100" : "text-gray-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-current/15 text-xs opacity-75">
                  <span>Alasan #{item.id}</span>
                  <Heart size={14} className={isSelected ? "fill-white" : "fill-pink-400 text-pink-400"} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

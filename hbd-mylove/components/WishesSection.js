"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Gift, Sparkles, Heart } from "lucide-react";
import { wishesData } from "@/lib/data-konten";

export default function WishesSection() {
  const [showSurprise, setShowSurprise] = useState(false);

  return (
    <section id="wishes" className="relative min-h-screen px-4 py-20 flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/60 border border-pink-200 text-pink-600 text-sm font-semibold mb-3"
          >
            <Star size={16} className="text-amber-500 fill-amber-400" />
            <span>Doa & Harapan</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
          >
            {wishesData.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-md mx-auto mt-2 text-sm md:text-base"
          >
            {wishesData.subtitle}
          </motion.p>
        </div>

        {/* Wishes List */}
        <div className="space-y-4 mb-10">
          {wishesData.wishes.map((wish, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 md:p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-md shadow-pink-100/50 flex items-center gap-4"
            >
              <div className="w-10 h-10 shrink-0 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                <Sparkles size={18} />
              </div>
              <p className="text-base md:text-lg font-medium text-gray-800">{wish}</p>
            </motion.div>
          ))}
        </div>

        {/* Surprise Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSurprise(!showSurprise)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm md:text-base shadow-lg shadow-pink-300/50 hover:opacity-95 transition-all"
          >
            <Gift size={18} />
            <span>{showSurprise ? "Sembunyikan Pesan Rahasia" : "Buka Pesan Kejutan Rahasia 🎁"}</span>
          </motion.button>
        </div>

        {/* Surprise Message Modal/Card */}
        <AnimatePresence>
          {showSurprise && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-6 md:p-8 rounded-3xl bg-gradient-to-tr from-pink-100/90 via-rose-50/90 to-amber-50/90 backdrop-blur-xl border border-pink-200/80 shadow-2xl text-center relative overflow-hidden"
            >
              <Heart className="w-12 h-12 text-rose-500 fill-rose-400 mx-auto mb-3 animate-pulse" />
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Pesan Khusus Untukmu
              </h3>
              <p className="text-base md:text-lg text-gray-700 font-sans max-w-xl mx-auto leading-relaxed">
                {wishesData.surpriseMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

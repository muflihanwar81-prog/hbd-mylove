"use client";

import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { wishesData } from "@/lib/data-konten";

export default function WishesSection() {
  return (
    <section id="wishes" className="relative min-h-screen px-4 py-20 flex flex-col justify-center items-center section-white">
      {/* Decorative flowers */}
      <div className="absolute top-10 left-10 w-40 h-40 opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none"><circle cx="100" cy="60" r="40" fill="#102B5C"/><circle cx="60" cy="100" r="35" fill="#173B73"/><circle cx="140" cy="100" r="35" fill="#102B5C"/></svg>
      </div>
      <div className="absolute bottom-10 right-10 w-36 h-36 opacity-[0.05] pointer-events-none rotate-180">
        <svg viewBox="0 0 200 200" fill="none"><circle cx="100" cy="60" r="40" fill="#102B5C"/><circle cx="60" cy="100" r="35" fill="#173B73"/></svg>
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
            style={{ background: "rgba(16,43,92,0.08)", border: "1px solid rgba(16,43,92,0.12)", color: "#102B5C" }}>
            <Star size={16} className="text-[#A9C7EA] fill-[#A9C7EA]" />
            <span>Doa & Harapan</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#102B5C" }}>
            {wishesData.title}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }} className="text-[#173B73]/60 max-w-md mx-auto mt-2 text-sm md:text-base">
            {wishesData.subtitle}
          </motion.p>
        </div>

        {/* Wishes */}
        <div className="space-y-4 mb-12">
          {wishesData.wishes.map((wish, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 md:p-5 rounded-2xl flex items-center gap-4 shadow-md transition-all"
              style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(16,43,92,0.08)", boxShadow: "0 4px 15px rgba(16,43,92,0.06)" }}>
              <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                style={{ background: "rgba(169,199,234,0.2)" }}>
                <Sparkles size={18} className="text-[#102B5C]" />
              </div>
              <p className="text-base md:text-lg font-medium text-[#102B5C]">{wish}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing message */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center p-8 rounded-3xl"
          style={{ background: "linear-gradient(135deg, rgba(16,43,92,0.05), rgba(169,199,234,0.1))", border: "1px solid rgba(16,43,92,0.08)" }}>
          <Star className="w-8 h-8 text-[#A9C7EA] fill-[#A9C7EA]/40 mx-auto mb-3" />
          <p className="text-base md:text-lg text-[#173B73] italic leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            "{wishesData.closingMessage}"
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Camera, Calendar, Star } from "lucide-react";
import { memoriesData } from "@/lib/data-konten";

export default function MemoriesSection({ onPhotoClick }) {
  return (
    <section id="memories" className="relative min-h-screen px-4 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
            style={{ background: "rgba(169,199,234,0.15)", border: "1px solid rgba(169,199,234,0.25)", color: "#A9C7EA" }}>
            <Camera size={16} />
            <span>Koleksi Kenangan</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#F8F8FF" }}>
            {memoriesData.title}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }} className="text-[#A9C7EA]/70 max-w-lg mx-auto mt-3 text-sm md:text-base">
            {memoriesData.subtitle}
          </motion.p>
        </div>

        {/* Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {memoriesData.photos.map((item, idx) => {
            const rotation = idx % 2 === 0 ? (idx % 4 === 0 ? "-rotate-1" : "rotate-1") : "-rotate-2";
            return (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onPhotoClick && onPhotoClick(item)}
                className={`relative group cursor-pointer p-4 rounded-3xl shadow-xl transition-all duration-300 ${rotation} hover:rotate-0 hover:z-20`}
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)" }}>
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-sm -rotate-2 pointer-events-none"
                  style={{ background: "rgba(169,199,234,0.2)", borderTop: "1px dashed rgba(169,199,234,0.4)", borderBottom: "1px dashed rgba(169,199,234,0.4)" }} />

                {/* Photo */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(16,43,92,0.5), rgba(23,59,115,0.5))" }}>
                  {item.src && (
                    <img src={item.src} alt={item.alt || item.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                  )}
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#A9C7EA] p-4 text-center"
                    style={{ display: item.src ? "none" : "flex" }}>
                    <Star className="w-10 h-10 text-[#A9C7EA] fill-[#A9C7EA]/30 mb-1" />
                    <span className="text-xs font-semibold">{item.caption}</span>
                  </div>
                  <div className="absolute inset-0 bg-[#102B5C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/90 text-[#102B5C] font-bold text-xs shadow-md">
                      Lihat Foto ✨
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-4 px-1">
                  {item.date && (
                    <div className="flex items-center gap-1.5 text-xs text-[#A9C7EA]/70 font-medium mb-1">
                      <Calendar size={12} /><span>{item.date}</span>
                    </div>
                  )}
                  <h4 className="text-white font-bold text-base group-hover:text-[#A9C7EA] transition-colors">
                    {item.caption}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Camera, Calendar, Heart } from "lucide-react";
import { memoriesData } from "@/lib/data-konten";

export default function MemoriesSection({ onPhotoClick }) {
  return (
    <section id="memories" className="relative min-h-screen px-4 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/60 border border-pink-200 text-pink-600 text-sm font-semibold mb-3"
          >
            <Camera size={16} />
            <span>Koleksi Kenangan</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
          >
            {memoriesData.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-lg mx-auto mt-3 text-sm md:text-base"
          >
            {memoriesData.subtitle}
          </motion.p>
        </div>

        {/* Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {memoriesData.photos.map((item, idx) => {
            // Give scrapbook slight rotations
            const rotation = idx % 2 === 0 ? (idx % 4 === 0 ? "-rotate-1" : "rotate-1") : "-rotate-2";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onPhotoClick && onPhotoClick(item)}
                className={`relative group cursor-pointer bg-white/60 backdrop-blur-md p-4 rounded-3xl shadow-xl shadow-pink-100/50 border border-white/80 transition-all duration-300 ${rotation} hover:rotate-0 hover:z-20`}
              >
                {/* Washi Tape Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-200/70 backdrop-blur-sm rounded-sm -rotate-2 border-dashed border-t border-b border-pink-300/60 pointer-events-none" />

                {/* Photo Image Frame */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-pink-200 via-rose-100 to-amber-100 flex items-center justify-center">
                  {item.src ? (
                    <img
                      src={item.src}
                      alt={item.alt || item.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full flex flex-col items-center justify-center text-pink-500 p-4 text-center"
                    style={{ display: item.src ? "none" : "flex" }}
                  >
                    <Heart className="w-10 h-10 text-pink-400 fill-pink-300 mb-1" />
                    <span className="text-xs font-semibold">{item.caption}</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-pink-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/90 text-pink-600 font-bold text-xs shadow-md">
                      Lihat Foto ✨
                    </span>
                  </div>
                </div>

                {/* Caption Area */}
                <div className="mt-4 px-1">
                  {item.date && (
                    <div className="flex items-center gap-1.5 text-xs text-pink-500 font-medium mb-1">
                      <Calendar size={12} />
                      <span>{item.date}</span>
                    </div>
                  )}
                  <h4 className="text-gray-800 font-bold text-base group-hover:text-pink-600 transition-colors">
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

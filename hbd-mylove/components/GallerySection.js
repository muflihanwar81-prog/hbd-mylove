"use client";

import { motion } from "framer-motion";
import { Image, Star } from "lucide-react";
import { galleryData } from "@/lib/data-konten";

export default function GallerySection({ onPhotoClick }) {
  return (
    <section id="gallery" className="relative min-h-screen px-4 py-20 overflow-hidden section-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-3"
            style={{ background: "rgba(217,43,107,0.12)", border: "1px solid rgba(217,43,107,0.25)", color: "#8F123C" }}>
            <Image size={16} />
            <span>Our Little Moments</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#260814" }}>
            {galleryData.title}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }} className="text-[#3B0B1E]/70 max-w-lg mx-auto mt-3 text-sm md:text-base">
            {galleryData.subtitle}
          </motion.p>
        </div>

        {/* Masonry-like grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {galleryData.photos.map((item, idx) => {
            const heights = ["aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square"];
            return (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => onPhotoClick && onPhotoClick(item)}
                className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{ background: "white", padding: "8px", border: "1px solid rgba(143,18,60,0.12)" }}>
                <div className={`relative ${heights[idx % 6]} w-full rounded-xl overflow-hidden`}
                  style={{ background: "linear-gradient(135deg, #FCE8EE, #F7C2CF)" }}>
                  {item.src && (
                    <img src={item.src} alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                  )}
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#260814] p-4 text-center"
                    style={{ display: item.src ? "none" : "flex" }}>
                    <Star className="w-8 h-8 text-[#D92B6B] mb-2" />
                    <span className="text-xs font-semibold text-[#581124]">Photo Placeholder</span>
                  </div>
                  <div className="absolute inset-0 bg-[#260814]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                    <span className="px-4 py-2 rounded-full bg-white/95 text-[#260814] font-bold text-xs shadow-md">
                      View Photo
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-3 tracking-widest uppercase"
            style={{ background: "rgba(53,11,25,0.85)", border: "1px solid rgba(214,165,109,0.35)", color: "#D6A56D" }}>
            <Image size={16} />
            <span>Our Little Moments</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#350B19" }}>
            {galleryData.title}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }} className="text-[#4A1021]/80 max-w-lg mx-auto mt-3 text-sm md:text-base font-light">
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
                style={{ background: "#FFFDF9", padding: "8px", border: "1px solid rgba(214,165,109,0.25)" }}>
                <div className={`relative ${heights[idx % 6]} w-full rounded-xl overflow-hidden`}
                  style={{ background: "linear-gradient(135deg, #4A1021, #350B19)" }}>
                  {item.src && (
                    <img src={item.src} alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                  )}
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#FFF5ED] p-4 text-center"
                    style={{ display: item.src ? "none" : "flex" }}>
                    <Star className="w-8 h-8 text-[#D6A56D] mb-2" />
                    <span className="text-xs font-semibold text-[#D6A56D]">Photo Placeholder</span>
                  </div>
                  <div className="absolute inset-0 bg-[#350B19]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                    <span className="px-4 py-2 rounded-full bg-[#FFF5ED] text-[#350B19] font-bold text-xs shadow-md">
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

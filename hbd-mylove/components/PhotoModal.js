"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Star } from "lucide-react";

export default function PhotoModal({ photo, isOpen, onClose }) {
  if (!isOpen || !photo) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(10,30,61,0.85)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div className="relative max-w-2xl w-full rounded-3xl p-4 md:p-6 shadow-2xl overflow-hidden"
          style={{ background: "rgba(248,248,255,0.95)", border: "1px solid rgba(169,199,234,0.3)" }}
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}>

          <button onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors shadow-md"
            style={{ background: "rgba(255,255,255,0.9)", color: "#102B5C" }}
            aria-label="Close">
            <X size={20} />
          </button>

          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8E9FA, #DCE5F5)" }}>
            {photo.src && (
              <img src={photo.src} alt={photo.alt || "Memory photo"} className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
            )}
            <div className="absolute inset-0 hidden flex-col items-center justify-center p-6 text-center"
              style={{ display: photo.src ? "none" : "flex", color: "#102B5C", background: "rgba(232,233,250,0.8)" }}>
              <Star className="w-12 h-12 text-[#A9C7EA] mb-2" />
              <p className="font-semibold text-lg">{photo.caption || "Kenangan Indah"}</p>
            </div>
          </div>

          <div className="mt-4 px-2">
            {photo.date && (
              <div className="flex items-center gap-1.5 text-xs md:text-sm font-medium mb-1" style={{ color: "#A9C7EA" }}>
                <Calendar size={14} /><span>{photo.date}</span>
              </div>
            )}
            <h3 className="text-lg md:text-xl font-bold" style={{ color: "#102B5C" }}>
              {photo.caption}
            </h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

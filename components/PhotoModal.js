"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import Image from "next/image";

export default function PhotoModal({ photo, isOpen, onClose }) {
  if (!isOpen || !photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-2xl w-full bg-white/90 backdrop-blur-xl rounded-3xl p-4 md:p-6 shadow-2xl border border-white/50 overflow-hidden"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-pink-100 text-pink-600 transition-colors shadow-md"
            aria-label="Tutup"
          >
            <X size={20} />
          </button>

          {/* Image container */}
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-tr from-pink-200 via-rose-100 to-amber-100 flex items-center justify-center">
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.alt || "Memory photo"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="absolute inset-0 hidden flex-col items-center justify-center p-6 text-center text-pink-700 bg-pink-100/80"
              style={{ display: photo.src ? "none" : "flex" }}
            >
              <span className="text-4xl mb-2">📸</span>
              <p className="font-semibold text-lg">{photo.caption || "Kenangan Indah"}</p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-4 px-2">
            {photo.date && (
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-pink-500 font-medium mb-1">
                <Calendar size={14} />
                <span>{photo.date}</span>
              </div>
            )}
            <h3 className="text-lg md:text-xl font-bold text-gray-800">
              {photo.caption}
            </h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

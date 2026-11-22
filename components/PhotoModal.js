"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Star } from "lucide-react";

export default function PhotoModal({ photo, isOpen, onClose }) {
  if (!isOpen || !photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(21, 2, 7, 0.88)", backdropFilter: "blur(16px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-2xl w-full max-h-[90dvh] overflow-y-auto rounded-3xl p-4 md:p-6 shadow-2xl"
          style={{ background: "#FFF8F2", border: "1px solid rgba(214, 165, 109, 0.45)" }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors shadow-md cursor-pointer"
            style={{ background: "rgba(53, 11, 25, 0.85)", color: "#FFF5ED" }}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div
            className="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #4A1021, #350B19)" }}
          >
            {photo.src && (
              <img
                src={photo.src}
                alt={photo.alt || "Memory photo"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            )}
            <div
              className="absolute inset-0 hidden flex-col items-center justify-center p-6 text-center"
              style={{ display: photo.src ? "none" : "flex", color: "#FFF5ED", background: "rgba(53, 11, 25, 0.95)" }}
            >
              <Star className="w-12 h-12 text-[#D6A56D] mb-2" />
              <p className="font-semibold text-lg">{photo.caption || "Kenangan Indah"}</p>
            </div>
          </div>

          <div className="mt-4 px-2">
            {photo.date && (
              <div className="flex items-center gap-1.5 text-xs md:text-sm font-medium mb-1 text-[#801F3A]">
                <Calendar size={14} className="text-[#D6A56D]" />
                <span>{photo.date}</span>
              </div>
            )}
            <h3 className="text-lg md:text-xl font-bold text-[#350B19]">
              {photo.caption}
            </h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

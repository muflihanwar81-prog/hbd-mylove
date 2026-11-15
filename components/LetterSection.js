"use client";

import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import TypewriterText from "@/components/TypewriterText";
import { letterData } from "@/lib/data-konten";

export default function LetterSection() {
  return (
    <section id="letter" className="relative min-h-screen px-4 py-20 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/60 border border-pink-200 text-pink-600 text-sm font-semibold mb-3"
          >
            <Mail size={16} />
            <span>Surat Spesial</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
          >
            {letterData.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-md mx-auto mt-2 text-sm md:text-base"
          >
            {letterData.subtitle}
          </motion.p>
        </div>

        {/* Paper Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative bg-amber-50/90 paper-texture p-6 sm:p-10 md:p-14 rounded-3xl shadow-2xl border border-amber-200/60 text-gray-800 leading-relaxed font-serif"
        >
          {/* Subtle Stamp or Seal */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 w-14 h-14 rounded-full border-2 border-dashed border-rose-300/80 flex items-center justify-center -rotate-12 bg-white/40">
            <Heart size={20} className="text-rose-400 fill-rose-300" />
          </div>

          {/* Salutation */}
          <h3 className="text-xl md:text-2xl font-bold text-pink-700 italic mb-6">
            <TypewriterText text={letterData.opening} speed={50} delay={400} />
          </h3>

          {/* Body Paragraphs */}
          <div className="space-y-4 text-base md:text-lg text-gray-700 font-sans">
            {letterData.paragraphs.map((p, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Sign-off */}
          <div className="mt-10 pt-6 border-t border-amber-200/80 flex flex-col items-end">
            <p className="italic text-gray-600 font-serif text-sm md:text-base">
              {letterData.closing}
            </p>
            <p className="font-bold text-lg md:text-xl text-rose-600 mt-1">
              {letterData.signature}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

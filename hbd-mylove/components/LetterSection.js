"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Star, Heart, Sparkles } from "lucide-react";
import TypewriterText from "@/components/TypewriterText";
import { letterData } from "@/lib/data-konten";

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section id="letter" className="relative min-h-screen px-4 py-24 flex flex-col items-center justify-center section-navy overflow-hidden">
      {/* Decorative Blue Flowers & Roses Top Corner */}
      <div className="absolute top-8 right-8 w-64 h-64 opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none">
          {/* Blue hydrangea / rose blossom */}
          <circle cx="120" cy="60" r="32" fill="#A9C7EA" />
          <circle cx="80" cy="80" r="28" fill="#DCE5F5" />
          <circle cx="150" cy="95" r="26" fill="#173B73" />
          <circle cx="110" cy="115" r="30" fill="#A9C7EA" />
          <circle cx="65" cy="125" r="22" fill="#E8E9FA" />
          {/* Petal details */}
          <path d="M120 40 Q135 60 120 80 Q105 60 120 40" fill="#F8F8FF" opacity="0.6" />
        </svg>
      </div>

      {/* Decorative White Rose Illustration in Bottom Left Corner */}
      <div className="absolute bottom-8 left-8 w-60 h-60 pointer-events-none opacity-20">
        <svg viewBox="0 0 200 200" fill="none">
          {/* White Rose Petals */}
          <circle cx="100" cy="100" r="45" fill="#F8F8FF" />
          <path d="M70 100 C70 70, 130 70, 130 100 C130 130, 70 130, 70 100" fill="#E8E9FA" opacity="0.8" />
          <path d="M85 100 C85 85, 115 85, 115 100 C115 115, 85 115, 85 100" fill="#DCE5F5" />
          <circle cx="100" cy="100" r="14" fill="#F8F8FF" />
          {/* Leaves */}
          <path d="M60 125 Q40 145 35 170 Q60 165 75 140 Z" fill="#A9C7EA" opacity="0.6" />
          <path d="M140 125 Q160 145 165 170 Q140 165 125 140 Z" fill="#A9C7EA" opacity="0.6" />
        </svg>
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-3 tracking-widest uppercase"
            style={{
              background: "rgba(169,199,234,0.15)",
              border: "1px solid rgba(169,199,234,0.3)",
              color: "#A9C7EA",
            }}
          >
            <Mail size={16} />
            <span>Digital Love Letter</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {letterData.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-[#A9C7EA]/75"
          >
            {letterData.subtitle}
          </motion.p>
        </div>

        {/* Letter Container with Stacked Paper Effect and Side Polaroid */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-8">
          
          {/* Polaroid Photo on the Left */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -8 }}
            whileInView={{ opacity: 1, x: 0, rotate: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="polaroid shrink-0 cursor-pointer shadow-2xl transition-all duration-300 w-48 sm:w-56 md:w-52 md:-mr-6 z-20 self-center md:self-start md:mt-16"
          >
            <div className="aspect-[4/3] w-full rounded overflow-hidden bg-[#102B5C]">
              <img
                src={letterData.polaroidPhoto || "/images/couple-main.svg"}
                alt="Love memory"
                className="w-full h-full object-cover"
              />
            </div>
            <p
              className="text-center mt-3 text-xs md:text-sm text-[#102B5C] font-semibold"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: "16px" }}
            >
              {letterData.polaroidCaption || "You & Me ♡"}
            </p>
          </motion.div>

          {/* Stacked Paper Container */}
          <div className="relative w-full max-w-2xl flex-1">
            {/* Sheet 3 (Bottom) */}
            <div
              className="absolute -bottom-3 left-4 right-4 h-full rounded-3xl"
              style={{
                background: "rgba(248, 248, 255, 0.4)",
                transform: "rotate(2deg)",
                filter: "blur(1px)",
              }}
            />
            {/* Sheet 2 (Middle) */}
            <div
              className="absolute -bottom-1.5 left-2 right-2 h-full rounded-3xl"
              style={{
                background: "rgba(248, 248, 255, 0.7)",
                transform: "rotate(-1deg)",
              }}
            />

            {/* Main Letter Paper (Top) with unfolding animation */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative p-6 sm:p-10 md:p-12 rounded-3xl shadow-2xl paper-texture overflow-hidden"
              style={{
                background: "#F8F8FF",
                color: "#173B73",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(169,199,234,0.3)",
              }}
            >
              {/* Top corner soft blue floral accent inside paper */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none">
                  <circle cx="80" cy="20" r="25" fill="#102B5C" />
                  <circle cx="60" cy="40" r="20" fill="#173B73" />
                  <circle cx="90" cy="50" r="15" fill="#A9C7EA" />
                </svg>
              </div>

              {/* Decorative Wax Seal stamp in top-right */}
              <div
                className="absolute top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center -rotate-12 shadow-sm"
                style={{
                  border: "2px dashed rgba(16, 43, 92, 0.4)",
                  background: "rgba(169, 199, 234, 0.2)",
                }}
              >
                <Sparkles size={18} className="text-[#102B5C]" />
              </div>

              {/* Salutation / Opening */}
              <h3
                className="text-2xl md:text-3xl font-bold mb-6 text-[#102B5C]"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                <TypewriterText text={letterData.opening} speed={45} delay={300} />
              </h3>

              {/* Letter Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#1e2d4a] font-normal">
                {letterData.paragraphs.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.12 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {/* Closing & Signature */}
              <div
                className="mt-8 pt-6 flex flex-col items-end"
                style={{ borderTop: "1px solid rgba(16, 43, 92, 0.15)" }}
              >
                <p
                  className="italic text-base md:text-lg text-[#173B73]"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {letterData.closing}
                </p>
                <p
                  className="font-bold text-2xl md:text-3xl mt-1 text-[#102B5C]"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {letterData.signature}
                </p>
              </div>

              {/* Bottom White Rose corner accent inside paper */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="30" fill="#102B5C" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

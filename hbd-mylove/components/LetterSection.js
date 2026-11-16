"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Star, Heart, Sparkles } from "lucide-react";
import TypewriterText from "@/components/TypewriterText";
import { letterData } from "@/lib/data-konten";

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section id="letter" className="relative min-h-screen px-4 py-24 flex flex-col items-center justify-center section-wine overflow-hidden">
      {/* Decorative Red Wine / Rose Corner Flowers */}
      <div className="absolute top-8 right-8 w-64 h-64 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="120" cy="60" r="32" fill="#D92B6B" />
          <circle cx="80" cy="80" r="28" fill="#E27D9B" />
          <circle cx="150" cy="95" r="26" fill="#8F123C" />
          <circle cx="110" cy="115" r="30" fill="#D92B6B" />
          <circle cx="65" cy="125" r="22" fill="#F7C2CF" />
          <path d="M120 40 Q135 60 120 80 Q105 60 120 40" fill="#FFF5F7" opacity="0.6" />
        </svg>
      </div>

      {/* Decorative Corner Accent in Bottom Left Corner */}
      <div className="absolute bottom-8 left-8 w-60 h-60 pointer-events-none opacity-20">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="45" fill="#FFF5F7" />
          <path d="M70 100 C70 70, 130 70, 130 100 C130 130, 70 130, 70 100" fill="#F7C2CF" opacity="0.8" />
          <circle cx="100" cy="100" r="14" fill="#E27D9B" />
          <path d="M60 125 Q40 145 35 170 Q60 165 75 140 Z" fill="#D92B6B" opacity="0.6" />
          <path d="M140 125 Q160 145 165 170 Q140 165 125 140 Z" fill="#D92B6B" opacity="0.6" />
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
              background: "rgba(226, 125, 155, 0.15)",
              border: "1px solid rgba(226, 125, 155, 0.3)",
              color: "#F7C2CF",
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
            className="text-sm md:text-base text-[#F7C2CF]/80"
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
            <div className="aspect-[4/3] w-full rounded overflow-hidden bg-[#1D040E]">
              <img
                src={letterData.polaroidPhoto || "/images/couple-main.svg"}
                alt="Love memory"
                className="w-full h-full object-cover"
              />
            </div>
            <p
              className="text-center mt-3 text-xs md:text-sm text-[#260814] font-semibold"
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
                background: "rgba(255, 245, 248, 0.4)",
                transform: "rotate(2deg)",
                filter: "blur(1px)",
              }}
            />
            {/* Sheet 2 (Middle) */}
            <div
              className="absolute -bottom-1.5 left-2 right-2 h-full rounded-3xl"
              style={{
                background: "rgba(255, 245, 248, 0.7)",
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
                background: "#FFF7F9",
                color: "#260814",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(226,125,155,0.3)",
              }}
            >
              {/* Top corner floral accent inside paper */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none">
                  <circle cx="80" cy="20" r="25" fill="#D92B6B" />
                  <circle cx="60" cy="40" r="20" fill="#8F123C" />
                  <circle cx="90" cy="50" r="15" fill="#E27D9B" />
                </svg>
              </div>

              {/* Decorative Wax Seal stamp in top-right */}
              <div
                className="absolute top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center -rotate-12 shadow-sm"
                style={{
                  border: "2px dashed rgba(143, 18, 60, 0.4)",
                  background: "rgba(217, 43, 107, 0.15)",
                }}
              >
                <Sparkles size={18} className="text-[#8F123C]" />
              </div>

              {/* Salutation / Opening */}
              <h3
                className="text-2xl md:text-3xl font-bold mb-6 text-[#260814]"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                <TypewriterText text={letterData.opening} speed={45} delay={300} />
              </h3>

              {/* Letter Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#3B0B1E] font-normal">
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
                style={{ borderTop: "1px solid rgba(143, 18, 60, 0.15)" }}
              >
                <p
                  className="italic text-base md:text-lg text-[#581124]"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {letterData.closing}
                </p>
                <p
                  className="font-bold text-2xl md:text-3xl mt-1 text-[#8F123C]"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {letterData.signature}
                </p>
              </div>

              {/* Bottom corner accent inside paper */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="30" fill="#D92B6B" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

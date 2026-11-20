"use client";

import { motion } from "framer-motion";

export default function LetterSection() {
  return (
    <section
      id="letter"
      className="relative min-h-screen w-full flex items-center justify-center px-4 py-16 md:py-24 overflow-hidden select-none"
      style={{
        background: "#0c245d",
      }}
    >
      {/* ── 1. Corner Decoration: White Rose Line-Art (Bottom Left) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.95, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute bottom-0 left-0 pointer-events-none z-10 w-44 sm:w-64 md:w-80 lg:w-96 select-none"
      >
        <img
          src="/images/letter-roses-bottom-left.png"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* ── 2. Corner Decoration: Blue Lilies (Bottom Right) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute bottom-0 right-0 pointer-events-none z-30 w-36 sm:w-52 md:w-64 lg:w-72 select-none"
      >
        <img
          src="/images/letter-flowers-bottom-right.png"
          alt=""
          aria-hidden="true"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* ── Main Composition Container (1:1 Reference Layout) ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-6 px-2 sm:px-6">

        {/* ── LEFT COLUMN: Two Polaroid Photos + Blue Button + Stars ── */}
        <div className="relative shrink-0 flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm lg:w-[320px] lg:self-start lg:pt-6">

          {/* Top Polaroid (Photo 1) - Tilted Counter-Clockwise */}
          <motion.div
            initial={{ opacity: 0, y: -30, rotate: -15, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotate: -7, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: -2, scale: 1.04 }}
            className="relative z-20 bg-white p-2.5 sm:p-3 pb-8 sm:pb-10 shadow-2xl rounded-sm transition-transform duration-300 w-44 sm:w-52"
            style={{
              boxShadow:
                "0 20px 40px rgba(0, 0, 0, 0.5), 0 6px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="aspect-square w-full overflow-hidden bg-neutral-900 rounded-[1px]">
              <img
                src="/images/letter-photo-1.jpg"
                alt="Us moment 1"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Bottom Polaroid (Photo 2) - Tilted Clockwise */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 12, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotate: 5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 1, scale: 1.04 }}
            className="relative z-10 bg-white p-2.5 sm:p-3 pb-8 sm:pb-10 shadow-2xl rounded-sm transition-transform duration-300 w-44 sm:w-52 -mt-10 sm:-mt-12 ml-14 sm:ml-20"
            style={{
              boxShadow:
                "0 22px 45px rgba(0, 0, 0, 0.55), 0 8px 20px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="aspect-square w-full overflow-hidden bg-neutral-900 rounded-[1px]">
              <img
                src="/images/letter-photo-2.jpg"
                alt="Us moment 2"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Blue Button Ornament (On Left of Bottom Polaroid) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute left-2 sm:left-4 top-[58%] -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 pointer-events-none drop-shadow-lg"
          >
            <img
              src="/images/letter-blue-button.png"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Sparkling Stars Cluster (To the Right of Bottom Polaroid) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute right-0 sm:right-2 top-[54%] z-25 flex flex-col items-center gap-1.5 pointer-events-none"
          >
            <span className="text-white text-xs sm:text-sm drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse">
              ✦
            </span>
            <span className="text-white/90 text-sm sm:text-base drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] ml-2">
              ★
            </span>
            <span className="text-white/80 text-[10px] sm:text-xs drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] -ml-1">
              ✦
            </span>
            <span className="text-white/90 text-xs sm:text-sm drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] ml-1">
              ★
            </span>
            <span className="text-white/70 text-[11px] drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
              ✦
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: Stacked Paper Letter Sheets ── */}
        <div className="relative flex-1 w-full max-w-2xl lg:max-w-3xl">

          {/* Top-Left Blue Flower Overlap Accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute -top-10 sm:-top-16 -left-6 sm:-left-12 z-35 w-32 sm:w-44 md:w-52 pointer-events-none select-none drop-shadow-xl"
          >
            <img
              src="/images/letter-flowers-top-left.png"
              alt=""
              aria-hidden="true"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Layer 3: Deepest Background Paper Sheet (Slightly Angled) */}
          <div
            className="absolute -bottom-3 -right-2 sm:-right-4 left-3 top-4 rounded-sm bg-[#EEF2F7] pointer-events-none"
            style={{
              transform: "rotate(1.8deg)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
            }}
          />

          {/* Layer 2: Middle Paper Sheet (Slightly Angled Opposite) */}
          <div
            className="absolute -bottom-1.5 -left-1 sm:-left-2 right-1 top-2 rounded-sm bg-[#F8FAFC] pointer-events-none"
            style={{
              transform: "rotate(-0.8deg)",
              boxShadow: "0 18px 40px rgba(0, 0, 0, 0.28)",
            }}
          />

          {/* Layer 1: Main Top Paper Sheet (The Letter) */}
          <motion.div
            initial={{ opacity: 0, y: 35, rotate: -4, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 bg-white rounded-sm px-6 sm:px-12 md:px-16 py-10 sm:py-14 md:py-16 transition-shadow duration-300"
            style={{
              boxShadow:
                "0 25px 60px rgba(0, 0, 0, 0.4), 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Letter Title: "A letter for you" in Signature Elegant Calligraphy */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center text-[#11244A] tracking-normal mb-2 sm:mb-3 font-normal"
              style={{
                fontFamily: "'Alex Brush', 'Dancing Script', cursive",
                textShadow: "0 2px 8px rgba(17, 36, 74, 0.15)",
              }}
            >
              A letter for you
            </motion.h2>

            {/* Subtitle / Salutation: "happy birthday, love 🤍" */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="text-center text-xs sm:text-sm md:text-base font-normal text-[#4A5568] tracking-wide mb-6 sm:mb-8"
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              happy birthday, love 🤍
            </motion.p>

            {/* Letter Content: Centered, Delicate, Charcoal Gray */}
            <div className="space-y-4 sm:space-y-6 text-center text-[#2D3748] text-xs sm:text-sm md:text-[15px] lg:text-base leading-relaxed sm:leading-loose font-normal max-w-xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.55 }}
              >
                today is all about you and the happiness you bring into other people&apos;s lives. i hope your day is filled with genuine smiles, peaceful moments, and everything that makes your heart feel light. thank you for being someone so comforting, loving, and special to me.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                i&apos;m really grateful for your existence and for all the little moments we share together. no matter what happens, i&apos;ll always be cheering for you and wishing the best for you. enjoy your day, honey. you deserve all the love in the world
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

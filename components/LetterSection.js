"use client";

import { motion } from "framer-motion";
import { letterData } from "@/lib/data-konten";

/* ── Custom Polaroid Frame with White Inner Area ── */
function PolaroidFrame({ photo, alt = "Memory", className = "", style = {} }) {
  return (
    <div className={`relative select-none ${className}`} style={style}>
      {/* 1. Inner Photo Window (Inner frame is pure white background) */}
      <div
        className="absolute bg-white overflow-hidden shadow-inner flex items-center justify-center"
        style={{
          left: "17.5%",
          top: "13.5%",
          width: "70.5%",
          height: "61%",
          transform: "rotate(-2.53deg)",
          transformOrigin: "center center",
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white" />
        )}
      </div>

      {/* 2. Vintage Polaroid Frame Overlay with wax seal & stars */}
      <img
        src="/images/letter-stickers/polaroid-frame-cutout.png"
        alt="Vintage Polaroid Frame"
        className="relative z-10 w-full h-auto pointer-events-none drop-shadow-2xl"
      />
    </div>
  );
}

export default function LetterSection() {
  const photo1 = letterData.polaroidPhoto1 || letterData.polaroidPhoto || "/images/couple-main.jpg";
  const photo2 = letterData.polaroidPhoto2 || "/images/couple-surface.jpg";

  return (
    <section
      id="letter"
      className="relative min-h-screen w-full flex items-center justify-center px-4 py-16 sm:py-20 md:py-28 overflow-hidden select-none"
      style={{
        background: "#0c245d", // Solid Deep Navy Blue matching reference
      }}
    >
      {/* ── Background Sticker: Snoopy Holding Roses (Bottom-Left) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: -30 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 z-20 w-36 sm:w-48 md:w-56 lg:w-64 pointer-events-none select-none drop-shadow-2xl"
      >
        <img
          src="/images/letter-stickers/snoopy-flowers.png"
          alt="Snoopy with Roses"
          className="w-full h-auto"
        />
      </motion.div>

      {/* ── Background Sticker: Cute Chibi Spiderman (Bottom-Right) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-3 right-3 sm:bottom-6 sm:right-8 z-30 w-32 sm:w-44 md:w-52 lg:w-60 pointer-events-none select-none drop-shadow-2xl"
      >
        <img
          src="/images/letter-stickers/spiderman.png"
          alt="Cute Spiderman"
          className="w-full h-auto"
        />
      </motion.div>

      {/* ── Main Composition: Polaroids on Left + Stacked Letter on Right ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-8 px-2 sm:px-6">

        {/* ── LEFT COLUMN: Two Vintage Polaroid Frames + Vinyl + Stars ── */}
        <div className="relative shrink-0 flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm lg:w-[350px] lg:self-start lg:pt-6">

          {/* Vinyl Record Peeking Behind Top Polaroid */}
          <motion.div
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="absolute -top-10 sm:-top-14 -left-6 sm:-left-10 z-0 w-36 sm:w-44 md:w-48 pointer-events-none select-none drop-shadow-2xl"
          >
            <motion.img
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              src="/images/letter-stickers/vinyl-record.png"
              alt="Vinyl Record"
              className="w-full h-auto"
            />
          </motion.div>

          {/* Top Polaroid (Photo 1) */}
          <motion.div
            initial={{ opacity: 0, y: -30, rotate: -12, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotate: -6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: -2, scale: 1.03 }}
            className="relative z-20 transition-transform duration-300 w-48 sm:w-56 md:w-60"
          >
            <PolaroidFrame photo={photo1} alt="Memory 1" />
          </motion.div>

          {/* Bottom Polaroid (Photo 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 12, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotate: 6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 2, scale: 1.03 }}
            className="relative z-10 transition-transform duration-300 w-48 sm:w-56 md:w-60 -mt-16 sm:-mt-20 ml-16 sm:ml-24"
          >
            <PolaroidFrame photo={photo2} alt="Memory 2" />
          </motion.div>

          {/* Embroidered Red Stars Patch (Near bottom polaroid) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute left-1 sm:left-2 top-[62%] -translate-y-1/2 z-30 w-16 sm:w-20 md:w-24 pointer-events-none drop-shadow-xl select-none"
          >
            <img
              src="/images/letter-stickers/red-stars.png"
              alt="Red Stars"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: Stacked Paper Letter Sheets ── */}
        <div className="relative flex-1 w-full max-w-2xl lg:max-w-3xl">

          {/* Sticker: Cute Cat with Rose Bouquet (Top-Left of Paper) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="absolute -top-12 sm:-top-16 -left-6 sm:-left-10 z-35 w-28 sm:w-36 md:w-44 pointer-events-none select-none drop-shadow-2xl"
          >
            <img
              src="/images/letter-stickers/cat-flowers.png"
              alt="Cute Cat with Roses"
              className="w-full h-auto"
            />
          </motion.div>

          {/* Sticker: Pixel Cat on Cake (Top-Right of Paper) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="absolute -top-14 sm:-top-18 -right-4 sm:-right-8 z-35 w-24 sm:w-32 md:w-36 pointer-events-none select-none drop-shadow-2xl"
          >
            <img
              src="/images/letter-stickers/pixel-cat-cake.png"
              alt="Pixel Cat Birthday"
              className="w-full h-auto"
            />
          </motion.div>

          {/* Layer 3: Deepest Background Paper Sheet */}
          <div
            className="absolute -bottom-3 -right-2 sm:-right-4 left-3 top-4 rounded-[2px] bg-[#EEF2F7] pointer-events-none"
            style={{
              transform: "rotate(1.8deg)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
            }}
          />

          {/* Layer 2: Middle Paper Sheet */}
          <div
            className="absolute -bottom-1.5 -left-1 sm:-left-2 right-1 top-2 rounded-[2px] bg-[#F8FAFC] pointer-events-none"
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
            className="relative z-20 bg-white rounded-[2px] px-6 sm:px-12 md:px-16 py-10 sm:py-14 md:py-16 transition-shadow duration-300"
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

            {/* Sticker: Watercolor Birthday Cake (Bottom-Right of Paper) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-8 sm:-bottom-12 -right-4 sm:-right-8 z-30 w-24 sm:w-32 md:w-36 pointer-events-none select-none drop-shadow-xl"
            >
              <img
                src="/images/letter-stickers/birthday-cake.png"
                alt="Birthday Cake"
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

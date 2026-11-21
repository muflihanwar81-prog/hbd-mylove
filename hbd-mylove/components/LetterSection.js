"use client";

import { motion } from "framer-motion";
import { letterData } from "@/lib/data-konten";

/* ── 1. Botanical White Rose Line-Art (Bottom Left) ── */
function WhiteRoseLineArt() {
  return (
    <svg
      viewBox="0 0 360 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <g stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
        {/* Large Main Rose */}
        {/* Center swirl */}
        <path d="M125 190 C122 185, 127 180, 132 181 C138 182, 139 190, 134 194 C128 198, 120 193, 122 186 C124 178, 135 174, 143 178 C150 182, 150 193, 142 199" />
        {/* Inner petals */}
        <path d="M128 178 C135 170, 148 170, 154 177 C159 184, 158 195, 150 202" />
        <path d="M116 186 C110 195, 114 206, 123 210 C132 214, 145 212, 152 205" />
        <path d="M140 172 C152 165, 166 172, 168 184 C170 196, 162 208, 150 213" />
        <path d="M112 180 C105 172, 118 160, 132 162 C142 163, 148 168, 152 172" />
        {/* Middle petals */}
        <path d="M100 195 C96 208, 106 222, 120 226 C134 230, 152 226, 162 216 C172 206, 178 192, 174 178 C170 164, 156 155, 142 154" />
        <path d="M92 182 C88 170, 100 152, 118 150 C132 148, 146 152, 156 158" />
        <path d="M158 160 C172 162, 186 174, 188 188 C190 202, 180 218, 166 226 C152 234, 132 236, 118 232" />
        {/* Outer petals */}
        <path d="M82 194 C76 214, 90 234, 110 242 C130 250, 156 246, 172 234 C188 222, 198 202, 196 182 C194 162, 178 146, 158 144 C140 142, 122 146, 108 156" />
        <path d="M78 178 C72 160, 88 138, 110 134 C128 130, 148 134, 164 142" />
        <path d="M70 200 C62 222, 78 248, 102 258 C126 268, 158 264, 178 250 C198 236, 210 212, 208 186 C206 160, 188 140, 164 136" />
        {/* Base calyx and leaves */}
        <path d="M50 220 C40 235, 48 255, 68 262 C88 268, 105 260, 112 250" />
        <path d="M60 242 C70 245, 80 250, 88 256" />
        <path d="M182 252 C195 262, 215 262, 228 252 C240 242, 240 225, 230 214" />
        <path d="M205 240 C215 242, 225 242, 232 238" />

        {/* Second Rose (Left/Foreground) */}
        <path d="M48 240 C46 235, 52 230, 56 232 C61 234, 60 242, 55 245 C50 247, 44 242, 47 236 C50 228, 60 226, 66 230 C72 234, 70 244, 64 248" />
        <path d="M40 232 C34 240, 38 252, 48 258 C58 262, 72 260, 78 252" />
        <path d="M32 242 C24 256, 34 274, 52 280 C70 286, 90 280, 98 268" />
        <path d="M58 228 C68 222, 80 228, 84 238 C88 248, 82 260, 74 266" />
        <path d="M22 250 C14 268, 26 290, 48 296 C70 302, 94 294, 104 278" />

        {/* Third Rose Bud (Top of cluster) */}
        <path d="M190 140 C186 135, 192 128, 198 130 C204 132, 204 140, 198 144 C192 147, 185 142, 188 134 C191 126, 202 122, 210 126 C218 130, 218 142, 208 148" />
        <path d="M182 134 C176 142, 180 154, 190 160 C200 164, 214 162, 220 154" />
        <path d="M174 144 C166 158, 176 176, 194 182 C212 188, 232 182, 240 170" />
        <path d="M200 130 C210 124, 222 130, 226 140 C230 150, 224 162, 216 168" />
        {/* Rose leaves with delicate veins */}
        <path d="M140 120 C145 105, 160 95, 175 100 C185 105, 190 115, 188 128 C175 130, 155 128, 140 120 Z" />
        <path d="M152 114 L175 100" />
        <path d="M162 108 L168 116" />
        <path d="M230 160 C248 152, 268 156, 276 170 C280 180, 276 194, 262 200 C250 195, 238 180, 230 160 Z" />
        <path d="M242 172 L276 170" />
        <path d="M255 168 L262 180" />
      </g>
    </svg>
  );
}

/* ── 2. Top-Left Blue Floral Bouquet (Overlapping paper corner) ── */
function BlueFlowersTopLeft() {
  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-xl"
    >
      <defs>
        {/* Royal Blue Gradients */}
        <radialGradient id="bluePetal1" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="35%" stopColor="#3B82F6" />
          <stop offset="75%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#0F2A66" />
        </radialGradient>
        <radialGradient id="bluePetal2" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#BFDBFE" />
          <stop offset="40%" stopColor="#60A5FA" />
          <stop offset="80%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
        <radialGradient id="darkCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B132B" />
          <stop offset="60%" stopColor="#1C2541" />
          <stop offset="100%" stopColor="#3A506B" />
        </radialGradient>
      </defs>

      {/* Flower 1: Upper Left (Anemone) */}
      <g transform="translate(60, 45)">
        {/* Outer petals */}
        <path d="M0 -36 C18 -42, 34 -30, 28 -14 C24 -2, 8 0, 0 0 C-8 0, -24 -2, -28 -14 C-34 -30, -18 -42, 0 -36 Z" fill="url(#bluePetal1)" opacity="0.95" />
        <path d="M34 -12 C46 2, 42 20, 26 24 C14 26, 4 12, 0 0 C4 12, 14 26, 26 24 Z" fill="url(#bluePetal2)" opacity="0.9" />
        <path d="M22 24 C14 38, -6 42, -20 32 C-28 22, -18 8, 0 0 Z" fill="url(#bluePetal1)" opacity="0.95" />
        <path d="M-22 28 C-36 20, -42 2, -32 -10 C-22 -18, -10 -6, 0 0 Z" fill="url(#bluePetal2)" opacity="0.9" />
        <path d="M-28 -16 C-32 -32, -16 -44, 2 -36 C12 -28, 6 -12, 0 0 Z" fill="url(#bluePetal1)" opacity="0.92" />
        {/* Inner petals layer */}
        <circle cx="0" cy="0" r="16" fill="url(#bluePetal2)" />
        {/* Dark flower center */}
        <circle cx="0" cy="0" r="8" fill="url(#darkCenter)" />
        {/* Stamens */}
        <circle cx="0" cy="-11" r="1.5" fill="#E2E8F0" opacity="0.9" />
        <circle cx="8" cy="-8" r="1.5" fill="#E2E8F0" opacity="0.9" />
        <circle cx="11" cy="0" r="1.5" fill="#E2E8F0" opacity="0.9" />
        <circle cx="8" cy="8" r="1.5" fill="#E2E8F0" opacity="0.9" />
        <circle cx="0" cy="11" r="1.5" fill="#E2E8F0" opacity="0.9" />
        <circle cx="-8" cy="8" r="1.5" fill="#E2E8F0" opacity="0.9" />
        <circle cx="-11" cy="0" r="1.5" fill="#E2E8F0" opacity="0.9" />
        <circle cx="-8" cy="-8" r="1.5" fill="#E2E8F0" opacity="0.9" />
      </g>

      {/* Flower 2: Center Main Blooming Flower */}
      <g transform="translate(115, 110) scale(1.35) rotate(-15)">
        {/* Large ruffled petals */}
        <path d="M0 -42 C22 -48, 42 -32, 34 -12 C28 2, 10 0, 0 0 C-10 0, -28 2, -34 -12 C-42 -32, -22 -48, 0 -42 Z" fill="url(#bluePetal1)" />
        <path d="M42 -10 C56 6, 50 30, 30 36 C16 38, 5 16, 0 0 Z" fill="url(#bluePetal2)" opacity="0.95" />
        <path d="M28 32 C18 50, -8 54, -26 40 C-36 28, -22 10, 0 0 Z" fill="url(#bluePetal1)" />
        <path d="M-30 32 C-48 22, -54 0, -40 -14 C-28 -24, -12 -8, 0 0 Z" fill="url(#bluePetal2)" opacity="0.95" />
        <path d="M-36 -18 C-42 -38, -20 -52, 4 -42 C16 -34, 8 -14, 0 0 Z" fill="url(#bluePetal1)" />
        {/* Intermediate petals */}
        <path d="M-15 -25 C0 -36, 20 -30, 20 -15 C20 0, 0 0, 0 0 Z" fill="url(#bluePetal2)" opacity="0.9" />
        <path d="M25 -5 C32 10, 20 25, 5 20 C0 10, 0 0, 0 0 Z" fill="url(#bluePetal1)" opacity="0.85" />
        <path d="M-5 25 C-20 25, -25 10, -18 -2 C-10 0, 0 0, 0 0 Z" fill="url(#bluePetal2)" opacity="0.9" />
        {/* Center disk */}
        <circle cx="0" cy="0" r="11" fill="url(#darkCenter)" />
        {/* Ring of stamen dots */}
        <circle cx="0" cy="-14" r="1.8" fill="#F8FAFC" />
        <circle cx="10" cy="-10" r="1.8" fill="#F8FAFC" />
        <circle cx="14" cy="0" r="1.8" fill="#F8FAFC" />
        <circle cx="10" cy="10" r="1.8" fill="#F8FAFC" />
        <circle cx="0" cy="14" r="1.8" fill="#F8FAFC" />
        <circle cx="-10" cy="10" r="1.8" fill="#F8FAFC" />
        <circle cx="-14" cy="0" r="1.8" fill="#F8FAFC" />
        <circle cx="-10" cy="-10" r="1.8" fill="#F8FAFC" />
        <circle cx="0" cy="0" r="5" fill="#0F172A" />
      </g>

      {/* Flower 3: Smaller Accent Flower Right */}
      <g transform="translate(170, 75) scale(0.9) rotate(35)">
        <path d="M0 -30 C15 -35, 28 -24, 22 -10 C18 0, 6 0, 0 0 C-6 0, -18 0, -22 -10 C-28 -24, -15 -35, 0 -30 Z" fill="url(#bluePetal2)" />
        <path d="M26 -8 C35 4, 30 20, 18 24 C10 25, 4 10, 0 0 Z" fill="url(#bluePetal1)" />
        <path d="M18 20 C10 32, -6 34, -18 24 C-24 16, -14 6, 0 0 Z" fill="url(#bluePetal2)" />
        <path d="M-18 22 C-30 15, -34 0, -25 -8 C-18 -14, -8 -4, 0 0 Z" fill="url(#bluePetal1)" />
        <circle cx="0" cy="0" r="7" fill="url(#darkCenter)" />
        <circle cx="0" cy="-9" r="1.4" fill="#F1F5F9" />
        <circle cx="7" cy="0" r="1.4" fill="#F1F5F9" />
        <circle cx="0" cy="9" r="1.4" fill="#F1F5F9" />
        <circle cx="-7" cy="0" r="1.4" fill="#F1F5F9" />
      </g>
    </svg>
  );
}

/* ── 3. Bottom-Right Blue Lilies ── */
function BlueLiliesBottomRight() {
  return (
    <svg
      viewBox="0 0 240 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-2xl"
    >
      <defs>
        <radialGradient id="lilyBlue1" cx="40%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="25%" stopColor="#93C5FD" />
          <stop offset="60%" stopColor="#3B82F6" />
          <stop offset="85%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#0B1E47" />
        </radialGradient>
        <radialGradient id="lilyBlue2" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="30%" stopColor="#60A5FA" />
          <stop offset="70%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#172554" />
        </radialGradient>
      </defs>

      {/* Lily 1: Main Facing Lily */}
      <g transform="translate(145, 125) rotate(-15)">
        {/* 6 Elegant Star Petals */}
        {/* Top Petal */}
        <path d="M0 0 C-15 -35, -20 -75, 0 -95 C20 -75, 15 -35, 0 0 Z" fill="url(#lilyBlue1)" />
        <path d="M0 0 L0 -85" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
        {/* Top-Right Petal */}
        <path d="M0 0 C15 -30, 55 -55, 82 -50 C80 -25, 45 -5, 0 0 Z" fill="url(#lilyBlue2)" />
        <path d="M0 0 L72 -42" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
        {/* Bottom-Right Petal */}
        <path d="M0 0 C25 5, 65 25, 78 52 C55 60, 25 35, 0 0 Z" fill="url(#lilyBlue1)" />
        <path d="M0 0 L68 45" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
        {/* Bottom Petal */}
        <path d="M0 0 C5 25, 8 65, -8 82 C-22 65, -15 25, 0 0 Z" fill="url(#lilyBlue2)" />
        <path d="M0 0 L-6 72" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
        {/* Bottom-Left Petal */}
        <path d="M0 0 C-20 15, -55 35, -75 25 C-72 0, -40 -12, 0 0 Z" fill="url(#lilyBlue1)" />
        <path d="M0 0 L-65 20" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
        {/* Top-Left Petal */}
        <path d="M0 0 C-25 -10, -65 -30, -72 -58 C-50 -62, -22 -35, 0 0 Z" fill="url(#lilyBlue2)" />
        <path d="M0 0 L-62 -48" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />

        {/* Center Stamen & Pistils */}
        <g stroke="#F8FAFC" strokeWidth="1.6" strokeLinecap="round">
          <path d="M0 0 Q-10 -20 -15 -38" />
          <circle cx="-15" cy="-38" r="2.5" fill="#FACC15" stroke="none" />

          <path d="M0 0 Q10 -20 18 -36" />
          <circle cx="18" cy="-36" r="2.5" fill="#FACC15" stroke="none" />

          <path d="M0 0 Q22 -5 35 -10" />
          <circle cx="35" cy="-10" r="2.5" fill="#FACC15" stroke="none" />

          <path d="M0 0 Q15 15 26 28" />
          <circle cx="26" cy="28" r="2.5" fill="#FACC15" stroke="none" />

          <path d="M0 0 Q-15 12 -25 22" />
          <circle cx="-25" cy="22" r="2.5" fill="#FACC15" stroke="none" />

          <path d="M0 0 Q-22 -8 -34 -15" />
          <circle cx="-34" cy="-15" r="2.5" fill="#FACC15" stroke="none" />
        </g>
        <circle cx="0" cy="0" r="6" fill="#1E293B" />
      </g>

      {/* Lily 2: Smaller Side Lily */}
      <g transform="translate(60, 160) scale(0.68) rotate(40)">
        <path d="M0 0 C-15 -35, -20 -75, 0 -95 C20 -75, 15 -35, 0 0 Z" fill="url(#lilyBlue2)" />
        <path d="M0 0 C15 -30, 55 -55, 82 -50 C80 -25, 45 -5, 0 0 Z" fill="url(#lilyBlue1)" />
        <path d="M0 0 C25 5, 65 25, 78 52 C55 60, 25 35, 0 0 Z" fill="url(#lilyBlue2)" />
        <path d="M0 0 C5 25, 8 65, -8 82 C-22 65, -15 25, 0 0 Z" fill="url(#lilyBlue1)" />
        <path d="M0 0 C-20 15, -55 35, -75 25 C-72 0, -40 -12, 0 0 Z" fill="url(#lilyBlue2)" />
        <path d="M0 0 C-25 -10, -65 -30, -72 -58 C-50 -62, -22 -35, 0 0 Z" fill="url(#lilyBlue1)" />
        <circle cx="0" cy="0" r="5" fill="#1E293B" />
      </g>
    </svg>
  );
}

/* ── 4. Blue Sewing Button with Cross-Stitch Thread ── */
function BlueButton() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <radialGradient id="btnGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="45%" stopColor="#2563EB" />
          <stop offset="85%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
      </defs>
      {/* Outer Button Rim */}
      <circle cx="24" cy="24" r="22" fill="url(#btnGrad)" stroke="#93C5FD" strokeWidth="1.5" />
      {/* Depressed Inner Ring */}
      <circle cx="24" cy="24" r="14" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="1.2" />
      {/* 4 Thread Holes */}
      <circle cx="19" cy="19" r="2.2" fill="#0F172A" />
      <circle cx="29" cy="19" r="2.2" fill="#0F172A" />
      <circle cx="19" cy="29" r="2.2" fill="#0F172A" />
      <circle cx="29" cy="29" r="2.2" fill="#0F172A" />
      {/* White Cross-Stitch Thread */}
      <line x1="19" y1="19" x2="29" y2="29" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="29" y1="19" x2="19" y2="29" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── 5. Sparkling Stars ── */
function SparklingStars() {
  return (
    <div className="flex flex-col items-center gap-2 pointer-events-none">
      <span className="text-white text-base drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse">
        ✦
      </span>
      <span className="text-white/90 text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] ml-3">
        ★
      </span>
      <span className="text-white/80 text-xs drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] -ml-2">
        ✦
      </span>
      <span className="text-white/95 text-base drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] ml-2">
        ★
      </span>
      <span className="text-white/75 text-sm drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
        ✦
      </span>
    </div>
  );
}

/* ── Main Component: Recreating Exact Birthday Letter Layout ── */
export default function LetterSection() {
  // Configurable photos from data-konten (allows user to easily insert own photos)
  const photo1 = letterData.polaroidPhoto1 || letterData.polaroidPhoto || "/images/couple-main.jpg";
  const photo2 = letterData.polaroidPhoto2 || "/images/couple-surface.jpg";

  return (
    <section
      id="letter"
      className="relative min-h-screen w-full flex items-center justify-center px-4 py-16 sm:py-20 md:py-28 overflow-hidden select-none"
      style={{
        background: "#0c245d", // Solid Deep Navy Blue matching reference exactly
      }}
    >
      {/* ── Corner Decoration: Pure SVG White Rose Line-Art (Bottom Left) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute bottom-0 left-0 pointer-events-none z-10 w-52 sm:w-72 md:w-88 lg:w-[420px] select-none"
      >
        <WhiteRoseLineArt />
      </motion.div>

      {/* ── Corner Decoration: Pure SVG Blue Lilies (Bottom Right) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute bottom-0 right-0 pointer-events-none z-30 w-44 sm:w-56 md:w-68 lg:w-80 select-none"
      >
        <BlueLiliesBottomRight />
      </motion.div>

      {/* ── Main Composition: Polaroids on Left + Stacked Letter on Right ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-8 px-2 sm:px-6">

        {/* ── LEFT COLUMN: Two Clean Polaroid Frames + Blue Button + Stars ── */}
        <div className="relative shrink-0 flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm lg:w-[320px] lg:self-start lg:pt-8">

          {/* Top Polaroid (Photo 1) - Tilted Counter-Clockwise */}
          <motion.div
            initial={{ opacity: 0, y: -30, rotate: -15, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotate: -7, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: -2, scale: 1.03 }}
            className="relative z-20 bg-white p-2.5 sm:p-3 pb-8 sm:pb-10 shadow-2xl rounded-[2px] transition-transform duration-300 w-44 sm:w-52"
            style={{
              boxShadow:
                "0 20px 40px rgba(0, 0, 0, 0.5), 0 6px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="aspect-square w-full overflow-hidden bg-neutral-100 rounded-[1px]">
              <img
                src={photo1}
                alt="Memory 1"
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
            whileHover={{ rotate: 1, scale: 1.03 }}
            className="relative z-10 bg-white p-2.5 sm:p-3 pb-8 sm:pb-10 shadow-2xl rounded-[2px] transition-transform duration-300 w-44 sm:w-52 -mt-10 sm:-mt-12 ml-14 sm:ml-20"
            style={{
              boxShadow:
                "0 22px 45px rgba(0, 0, 0, 0.55), 0 8px 20px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="aspect-square w-full overflow-hidden bg-neutral-100 rounded-[1px]">
              <img
                src={photo2}
                alt="Memory 2"
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
            className="absolute left-2 sm:left-4 top-[60%] -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 pointer-events-none"
          >
            <BlueButton />
          </motion.div>

          {/* Sparkling Stars Cluster (To the Right of Bottom Polaroid) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute right-0 sm:right-2 top-[55%] z-25 pointer-events-none"
          >
            <SparklingStars />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: Stacked Paper Letter Sheets ── */}
        <div className="relative flex-1 w-full max-w-2xl lg:max-w-3xl">

          {/* Pure SVG Blue Floral Bouquet Overlap (Top-Left of Paper) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute -top-10 sm:-top-16 -left-6 sm:-left-12 z-35 w-32 sm:w-44 md:w-52 pointer-events-none select-none"
          >
            <BlueFlowersTopLeft />
          </motion.div>

          {/* Layer 3: Deepest Background Paper Sheet (Crisp Clean CSS) */}
          <div
            className="absolute -bottom-3 -right-2 sm:-right-4 left-3 top-4 rounded-[2px] bg-[#EEF2F7] pointer-events-none"
            style={{
              transform: "rotate(1.8deg)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
            }}
          />

          {/* Layer 2: Middle Paper Sheet (Crisp Clean CSS) */}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

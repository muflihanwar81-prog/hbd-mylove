"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── 8-BIT RETRO PIXEL ART SPRITES (Pure crisp SVG) ── */

// 1. Pixel Heart (Classic 11x10 grid)
function PixelHeart({ color = "#E9A0AA", outline = "#1A0307", size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 10"
      className={className}
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
    >
      {/* Outline */}
      <rect x="2" y="0" width="2" height="1" fill={outline} />
      <rect x="7" y="0" width="2" height="1" fill={outline} />
      <rect x="1" y="1" width="1" height="1" fill={outline} />
      <rect x="4" y="1" width="1" height="1" fill={outline} />
      <rect x="6" y="1" width="1" height="1" fill={outline} />
      <rect x="9" y="1" width="1" height="1" fill={outline} />
      <rect x="0" y="2" width="1" height="3" fill={outline} />
      <rect x="10" y="2" width="1" height="3" fill={outline} />
      <rect x="1" y="5" width="1" height="1" fill={outline} />
      <rect x="9" y="5" width="1" height="1" fill={outline} />
      <rect x="2" y="6" width="1" height="1" fill={outline} />
      <rect x="8" y="6" width="1" height="1" fill={outline} />
      <rect x="3" y="7" width="1" height="1" fill={outline} />
      <rect x="7" y="7" width="1" height="1" fill={outline} />
      <rect x="4" y="8" width="1" height="1" fill={outline} />
      <rect x="6" y="8" width="1" height="1" fill={outline} />
      <rect x="5" y="9" width="1" height="1" fill={outline} />

      {/* Main Fill */}
      <rect x="2" y="1" width="2" height="1" fill={color} />
      <rect x="7" y="1" width="2" height="1" fill={color} />
      <rect x="1" y="2" width="9" height="3" fill={color} />
      <rect x="2" y="5" width="7" height="1" fill={color} />
      <rect x="3" y="6" width="5" height="1" fill={color} />
      <rect x="4" y="7" width="3" height="1" fill={color} />
      <rect x="5" y="8" width="1" height="1" fill={color} />

      {/* Highlight Glint (Top-left white sparkle) */}
      <rect x="2" y="2" width="1" height="1" fill="#FFFFFF" />
      <rect x="3" y="2" width="1" height="1" fill="#FFFFFF" />
      <rect x="2" y="3" width="1" height="1" fill="#FFFFFF" />
    </svg>
  );
}

// 2. Pixel Bucket / Basket (Classic 16x14 grid)
function PixelBucket({ size = 72 }) {
  return (
    <svg
      width={size}
      height={(size * 14) / 16}
      viewBox="0 0 16 14"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
    >
      {/* Handle */}
      <rect x="4" y="0" width="8" height="1" fill="#1A0307" />
      <rect x="3" y="1" width="1" height="3" fill="#1A0307" />
      <rect x="12" y="1" width="1" height="3" fill="#1A0307" />
      <rect x="4" y="1" width="8" height="1" fill="#E9A0AA" />

      {/* Top Rim */}
      <rect x="1" y="4" width="14" height="2" fill="#1A0307" />
      <rect x="2" y="4" width="12" height="1" fill="#8B2635" />
      <rect x="2" y="5" width="12" height="1" fill="#641526" />

      {/* Bucket Body Outline */}
      <rect x="2" y="6" width="1" height="6" fill="#1A0307" />
      <rect x="13" y="6" width="1" height="6" fill="#1A0307" />
      <rect x="3" y="12" width="10" height="2" fill="#1A0307" />

      {/* Bucket Body Fill */}
      <rect x="3" y="6" width="10" height="6" fill="#8B2635" />
      <rect x="4" y="12" width="8" height="1" fill="#641526" />

      {/* Wooden / Texture Planks */}
      <rect x="3" y="6" width="2" height="6" fill="#A83250" />
      <rect x="6" y="6" width="1" height="6" fill="#641526" />
      <rect x="10" y="6" width="1" height="6" fill="#641526" />

      {/* Center Heart Badge on Bucket */}
      <rect x="7" y="8" width="1" height="1" fill="#FFF9F0" />
      <rect x="9" y="8" width="1" height="1" fill="#FFF9F0" />
      <rect x="6" y="9" width="5" height="1" fill="#FFF9F0" />
      <rect x="7" y="10" width="3" height="1" fill="#FFF9F0" />
      <rect x="8" y="11" width="1" height="1" fill="#FFF9F0" />
    </svg>
  );
}

// 3. Pixel Star (8-bit blinking star)
function PixelStar({ size = 22, color = "#FFF9F0" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 9 9"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
    >
      <rect x="4" y="0" width="1" height="9" fill={color} />
      <rect x="0" y="4" width="9" height="1" fill={color} />
      <rect x="3" y="2" width="3" height="5" fill={color} />
      <rect x="2" y="3" width="5" height="3" fill={color} />
      <rect x="4" y="4" width="1" height="1" fill="#FFFFFF" />
    </svg>
  );
}

// 4. Pixel Flower (8-bit romantic rose)
function PixelFlower({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
    >
      {/* Stem & Leaves */}
      <rect x="5" y="7" width="2" height="5" fill="#2E7D32" />
      <rect x="3" y="8" width="2" height="2" fill="#4CAF50" />
      <rect x="7" y="9" width="2" height="2" fill="#4CAF50" />
      {/* Petals */}
      <rect x="3" y="2" width="6" height="5" fill="#1A0307" />
      <rect x="4" y="1" width="4" height="6" fill="#8B2635" />
      <rect x="3" y="3" width="6" height="3" fill="#E9A0AA" />
      <rect x="5" y="3" width="2" height="2" fill="#FFF9F0" />
    </svg>
  );
}

// 5. Pixel Gift Box (8-bit gift)
function PixelGiftBox({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
    >
      <rect x="1" y="4" width="10" height="7" fill="#1A0307" />
      <rect x="2" y="5" width="8" height="6" fill="#8B2635" />
      <rect x="0" y="3" width="12" height="2" fill="#1A0307" />
      <rect x="1" y="3" width="10" height="1" fill="#E9A0AA" />
      {/* Ribbon */}
      <rect x="5" y="3" width="2" height="8" fill="#FFF9F0" />
      <rect x="3" y="1" width="6" height="2" fill="#FFF9F0" />
      <rect x="5" y="1" width="2" height="1" fill="#1A0307" />
    </svg>
  );
}

// 6. Pixel Envelope (8-bit wine envelope with heart seal)
function PixelEnvelope({ size = 180, isOpen = false }) {
  return (
    <svg
      width={size}
      height={(size * 12) / 16}
      viewBox="0 0 16 12"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
      className="drop-shadow-2xl"
    >
      {/* Envelope Outer Border */}
      <rect x="0" y="0" width="16" height="12" fill="#1A0307" />
      <rect x="1" y="1" width="14" height="10" fill="#641526" />

      {/* Interior / Flap */}
      {isOpen ? (
        <>
          {/* Open Flap facing up */}
          <rect x="2" y="1" width="12" height="3" fill="#8B2635" />
          <rect x="3" y="0" width="10" height="1" fill="#1A0307" />
          {/* White Letter peeking inside */}
          <rect x="3" y="2" width="10" height="6" fill="#FFF9F0" />
          <rect x="4" y="3" width="8" height="1" fill="#521321" />
          <rect x="4" y="5" width="6" height="1" fill="#521321" />
        </>
      ) : (
        <>
          {/* Closed Flap V-shape */}
          <rect x="2" y="1" width="12" height="1" fill="#8B2635" />
          <rect x="3" y="2" width="10" height="1" fill="#8B2635" />
          <rect x="4" y="3" width="8" height="1" fill="#8B2635" />
          <rect x="5" y="4" width="6" height="1" fill="#8B2635" />
          <rect x="6" y="5" width="4" height="1" fill="#8B2635" />
          <rect x="7" y="6" width="2" height="1" fill="#8B2635" />
          {/* Pixel Heart Wax Seal */}
          <rect x="6" y="5" width="4" height="3" fill="#E9A0AA" />
          <rect x="7" y="7" width="2" height="1" fill="#E9A0AA" />
          <rect x="7" y="5" width="2" height="1" fill="#FFF9F0" />
        </>
      )}
    </svg>
  );
}

export default function CatchMyHeartsSection() {
  // Game states: "intro" | "playing" | "victory" | "surprise"
  const [gameState, setGameState] = useState("intro");
  const [score, setScore] = useState(0);

  // Bucket & game loop refs
  const gameAreaRef = useRef(null);
  const [bucketX, setBucketX] = useState(50); // percentage 0 - 100
  const bucketXRef = useRef(50);
  const heartsRef = useRef([]);
  const scoreRef = useRef(0);
  const [hearts, setHearts] = useState([]);
  const [isCatching, setIsCatching] = useState(false);
  const [catchBurst, setCatchBurst] = useState(null);

  // Typewriter effect state for letter
  const [typedText, setTypedText] = useState("");
  const fullLetterText = `*Untuk Kamu, Sayang

Jika kamu sedang membaca surat ini, berarti kamu sudah berhasil menemukan kejutan kecil dariku.

Aku hanya ingin kamu tahu bahwa kamu adalah seseorang yang benar-benar istimewa bagiku. Aku harap permainan kecil tadi berhasil membuatmu tersenyum, meskipun hanya sedikit.

Kamu pantas mendapatkan kebahagiaan, cinta, dan semua hal indah yang ada di dunia ini.

Terima kasih sudah menjadi dirimu sendiri. Terima kasih sudah hadir dan memberikan banyak warna dalam hidupku.

Oh iya, masih ada satu kejutan lagi untukmu. Jangan berhenti sampai di sini, ya. Coba keluar sebentar dan lihat ke depan rumah. Karena ada hadiah kecil yang sudah menunggumu.*`;

  // Update bucket helper
  const updateBucketX = (val) => {
    const clamped = Math.max(8, Math.min(92, val));
    bucketXRef.current = clamped;
    setBucketX(clamped);
  };

  // ── Keyboard Controls (Arrow Left/Right, A/D) ──
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        updateBucketX(bucketXRef.current - 7);
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        updateBucketX(bucketXRef.current + 7);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  // ── Mouse / Touch Drag Controls ──
  const handlePointerMove = (e) => {
    if (gameState !== "playing" || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0]?.clientX : e.clientX;
    if (clientX !== undefined) {
      const relX = ((clientX - rect.left) / rect.width) * 100;
      updateBucketX(relX);
    }
  };

  // ── 8-bit Game Loop: Spawning & Falling Hearts ──
  useEffect(() => {
    if (gameState !== "playing") return;

    heartsRef.current = [];
    scoreRef.current = 0;
    setScore(0);
    setHearts([]);

    let animationFrameId;
    let lastSpawnTime = Date.now();

    const gameLoop = () => {
      const now = Date.now();

      // Spawn a new pixel heart every ~850ms
      if (now - lastSpawnTime > 850) {
        lastSpawnTime = now;
        const newHeart = {
          id: Math.random().toString(36).substr(2, 9),
          x: Math.random() * 80 + 10,
          y: -5,
          speed: Math.random() * 0.35 + 0.8,
          color: Math.random() > 0.4 ? "#E9A0AA" : "#FF4D6D",
        };
        heartsRef.current.push(newHeart);
      }

      // Update positions & collision check
      const currentBucketX = bucketXRef.current;
      const nextHearts = [];

      for (let h of heartsRef.current) {
        h.y += h.speed;

        // Bucket collision boundary (bucket top is at y ~76% - 90%)
        const isNearBottom = h.y >= 75 && h.y <= 90;
        const isHorizontallyAligned = Math.abs(h.x - currentBucketX) <= 12;

        if (isNearBottom && isHorizontallyAligned) {
          // Heart caught!
          setIsCatching(true);
          setCatchBurst({ x: currentBucketX, y: h.y });
          setTimeout(() => setIsCatching(false), 180);
          setTimeout(() => setCatchBurst(null), 350);

          scoreRef.current += 1;
          const currentScore = scoreRef.current;
          setScore(currentScore);

          if (currentScore >= 10) {
            setTimeout(() => setGameState("victory"), 350);
          }
          continue;
        }

        if (h.y <= 105) {
          nextHearts.push(h);
        }
      }

      heartsRef.current = nextHearts;
      setHearts([...nextHearts]);

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState]);

  // ── Typewriter effect for Part 5 Surprise ──
  useEffect(() => {
    if (gameState === "surprise") {
      setTypedText("");
      let i = 0;
      const timer = setInterval(() => {
        i++;
        setTypedText(fullLetterText.slice(0, i));
        if (i >= fullLetterText.length) {
          clearInterval(timer);
        }
      }, 28);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  // Restart handler
  const handleRestart = () => {
    setScore(0);
    setHearts([]);
    setGameState("intro");
  };

  return (
    <section
      id="game"
      className="relative min-h-[100dvh] w-full flex items-center justify-center px-3 py-[clamp(1rem,3dvh,2.5rem)] overflow-hidden select-none"
      style={{
        backgroundColor: "#350710", // Dark Burgundy 8-bit Background
        backgroundImage: `
          radial-gradient(#4A0714 15%, transparent 16%),
          radial-gradient(#2A050D 15%, transparent 16%)
        `,
        backgroundSize: "24px 24px",
      }}
    >
      {/* ── Twinkling Background 8-Bit Pixel Stars ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-12 left-10 animate-pulse">
          <PixelStar size={18} color="#E9A0AA" />
        </div>
        <div className="absolute top-28 right-16 animate-pulse" style={{ animationDelay: "0.5s" }}>
          <PixelStar size={24} color="#FFF9F0" />
        </div>
        <div className="absolute bottom-20 left-16 animate-pulse" style={{ animationDelay: "1s" }}>
          <PixelStar size={20} color="#FF6B8B" />
        </div>
        <div className="absolute bottom-28 right-24 animate-pulse" style={{ animationDelay: "1.5s" }}>
          <PixelStar size={16} color="#E9A0AA" />
        </div>
        <div className="absolute top-1/2 left-8 animate-pulse" style={{ animationDelay: "0.8s" }}>
          <PixelStar size={14} color="#FFF9F0" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          2. HALAMAN AWAL GAME (Retro 8-Bit Intro)
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {gameState === "intro" && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative z-20 w-full max-w-lg mx-auto text-center px-1"
          >
            {/* Pixel Art Decorative Sprites Floating Around Intro Card */}
            {/* Floating Pixel Hearts */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-2 sm:-left-6 z-30 pointer-events-none"
            >
              <PixelHeart size={32} color="#FF4D6D" />
            </motion.div>

            {/* Pixel Flower */}
            <motion.div
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-2 sm:-right-6 z-30 pointer-events-none"
            >
              <PixelFlower size={34} />
            </motion.div>

            {/* Pixel Envelope */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-2 sm:-left-6 z-30 pointer-events-none"
            >
              <PixelEnvelope size={48} isOpen={false} />
            </motion.div>

            {/* Pixel Gift Box */}
            <motion.div
              animate={{ rotate: [5, -5, 5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-2 sm:-right-6 z-30 pointer-events-none"
            >
              <PixelGiftBox size={34} />
            </motion.div>

            {/* Retro 8-Bit Ivory Card Container */}
            <div
              className="relative z-20 rounded-none px-4 sm:px-8 py-[clamp(1.5rem,3.5dvh,2.75rem)] text-center border-4 border-[#1A0307]"
              style={{
                backgroundColor: "#FFF9F0",
                boxShadow: "6px 6px 0px #1A0307, 0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              {/* Category Badge */}
              <div className="inline-block px-2.5 sm:px-3 py-1 bg-[#641526] text-[#FFF9F0] border-2 border-[#1A0307] mb-4 sm:mb-6">
                <span
                  className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  ★ 8-BIT RETRO GAME ★
                </span>
              </div>

              {/* Title: A Little Game for You ♡ */}
              <h2
                className="text-sm sm:text-xl md:text-2xl text-[#521321] leading-relaxed mb-4 sm:mb-6"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow: "2px 2px 0px #E9A0AA",
                }}
              >
                A Little Game for You ♡
              </h2>

              {/* Description */}
              <p
                className="text-[11px] sm:text-xs md:text-sm leading-relaxed mb-6 sm:mb-8 max-w-sm mx-auto text-[#641526]"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  lineHeight: "1.8",
                }}
              >
                Sebelum kamu tutup sayang, Aku punya sedikit game, ada kejutannya di akhir.
              </p>

              {/* Button: LET'S PLAY! ♡ */}
              <button
                onClick={() => {
                  setScore(0);
                  setHearts([]);
                  setGameState("playing");
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#8B2635] hover:bg-[#A83250] text-[#FFF9F0] border-4 border-[#1A0307] font-bold text-[11px] sm:text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-[4px_4px_0px_#1A0307] active:translate-x-1 active:translate-y-1 active:shadow-none inline-flex items-center justify-center gap-2.5"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                <PixelHeart size={16} color="#FFF9F0" outline="#1A0307" />
                <span>Ayo mulai</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            3. GAMEPLAY – CATCH MY HEARTS (8-Bit Retro)
        ══════════════════════════════════════════════════════════════ */}
        {gameState === "playing" && (
          <motion.div
            key="game-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-20 w-full max-w-lg mx-auto flex flex-col items-center"
          >
            {/* Top Score HUD */}
            <div
              className="w-full flex items-center justify-between px-5 py-3 mb-3 bg-[#FFF9F0] border-4 border-[#1A0307]"
              style={{
                boxShadow: "4px 4px 0px #1A0307",
                fontFamily: "'Press Start 2P', monospace",
              }}
            >
              <div className="flex items-center gap-2">
                <PixelHeart size={16} color="#FF4D6D" outline="#1A0307" />
                <span className="text-[10px] sm:text-xs text-[#521321] font-bold">
                  HEARTS
                </span>
              </div>
              <div className="text-[11px] sm:text-sm text-[#8B2635] font-bold">
                {score}/10 HEARTS
              </div>
            </div>

            {/* Stepped Pixel Progress Bar */}
            <div className="w-full h-4 bg-[#1A0307] border-2 border-[#1A0307] mb-3 flex p-0.5 gap-1">
              {Array.from({ length: 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`flex-1 h-full transition-all duration-300 ${
                    idx < score ? "bg-[#FF4D6D]" : "bg-[#4A0714]"
                  }`}
                />
              ))}
            </div>

            {/* Retro 8-Bit Canvas Screen */}
            <div
              ref={gameAreaRef}
              onMouseMove={handlePointerMove}
              onTouchMove={handlePointerMove}
              className="relative w-full h-[clamp(250px,46dvh,420px)] border-4 border-[#1A0307] overflow-hidden cursor-ew-resize select-none"
              style={{
                backgroundColor: "#2A050D",
                boxShadow: "8px 8px 0px #1A0307, inset 0 0 40px rgba(0,0,0,0.8)",
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            >
              {/* Instructions banner at top */}
              <div className="absolute top-3 inset-x-0 text-center pointer-events-none">
                <p
                  className="text-[9px] text-[#E9A0AA] tracking-wider uppercase"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  ← MOVE BUCKET TO CATCH →
                </p>
              </div>

              {/* Falling Pixel Hearts */}
              {hearts.map((h) => (
                <div
                  key={h.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${h.x}%`,
                    top: `${h.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <PixelHeart size={28} color={h.color} outline="#1A0307" />
                </div>
              ))}

              {/* Catch "+1" Pixel Feedback */}
              {catchBurst && (
                <motion.div
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -35, scale: 1.2 }}
                  transition={{ duration: 0.35 }}
                  className="absolute pointer-events-none -translate-x-1/2 text-xs font-bold text-[#FFF9F0] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  style={{
                    left: `${catchBurst.x}%`,
                    top: `${catchBurst.y}%`,
                    fontFamily: "'Press Start 2P', monospace",
                  }}
                >
                  +1 ♡
                </motion.div>
              )}

              {/* 8-Bit Pixel Bucket */}
              <div
                className="absolute bottom-4 -translate-x-1/2 pointer-events-none transition-transform"
                style={{
                  left: `${bucketX}%`,
                  transform: `translateX(-50%) ${isCatching ? "scale(1.15)" : "scale(1)"}`,
                }}
              >
                <PixelBucket size={68} />
              </div>
            </div>

            {/* Mobile / Tablet Touch Button Helpers */}
            <div className="md:hidden flex items-center justify-between w-full mt-3 px-1 gap-3">
              <button
                onClick={() => updateBucketX(bucketXRef.current - 14)}
                className="flex-1 py-3.5 bg-[#FFF9F0] border-4 border-[#1A0307] text-[#521321] font-bold text-xs active:bg-[#E9A0AA] uppercase tracking-wider shadow-[3px_3px_0px_#1A0307] active:translate-x-0.5 active:translate-y-0.5"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                ◀ LEFT
              </button>
              <button
                onClick={() => updateBucketX(bucketXRef.current + 14)}
                className="flex-1 py-3.5 bg-[#FFF9F0] border-4 border-[#1A0307] text-[#521321] font-bold text-xs active:bg-[#E9A0AA] uppercase tracking-wider shadow-[3px_3px_0px_#1A0307] active:translate-x-0.5 active:translate-y-0.5"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                RIGHT ▶
              </button>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            4. HALAMAN KEMENANGAN (Victory Screen)
        ══════════════════════════════════════════════════════════════ */}
        {gameState === "victory" && (
          <motion.div
            key="victory-screen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative z-20 w-full max-w-md mx-auto text-center px-1"
          >
            {/* Victory Pixel Card */}
            <div
              className="relative z-20 rounded-none px-4 sm:px-8 py-[clamp(1.5rem,3.5dvh,2.75rem)] text-center border-4 border-[#1A0307]"
              style={{
                backgroundColor: "#FFF9F0",
                boxShadow: "6px 6px 0px #1A0307, 0 20px 40px rgba(0,0,0,0.6)",
              }}
            >
              {/* Victory Big Pixel Heart Icon */}
              <div className="flex justify-center mb-5 sm:mb-6">
                <PixelHeart size={54} color="#FF4D6D" outline="#1A0307" className="animate-bounce" />
              </div>

              {/* Title 1: YAY! YOU DID IT! */}
              <h2
                className="text-sm sm:text-lg md:text-xl text-[#521321] mb-3 sm:mb-4"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow: "2px 2px 0px #E9A0AA",
                }}
              >
                YEAY KAMU BERHASIL SAYANG
              </h2>

              {/* Title 2: You collected all my hearts! */}
              <p
                className="text-[11px] sm:text-xs md:text-sm text-[#8B2635] mb-6 sm:mb-8 leading-relaxed font-bold"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  lineHeight: "1.8",
                }}
              >
                Kamu berhasil mengambil semua hatiku
              </p>

              {/* Button: CLAIM YOUR SURPRISE ♡ */}
              <button
                onClick={() => setGameState("surprise")}
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 bg-[#8B2635] hover:bg-[#A83250] text-[#FFF9F0] border-4 border-[#1A0307] font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[4px_4px_0px_#1A0307] active:translate-x-1 active:translate-y-1 active:shadow-none inline-flex items-center justify-center gap-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                <PixelGiftBox size={18} />
                <span>CLAIM YOUR SURPRISE </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            5. HADIAH SURAT (Pixel Envelope & Typewriter Letter)
        ══════════════════════════════════════════════════════════════ */}
        {gameState === "surprise" && (
          <motion.div
            key="surprise-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center text-center px-1"
          >
            {/* Retro Pixel Envelope Visual */}
            <div className="mb-4 sm:mb-6 flex justify-center">
              <PixelEnvelope size={88} isOpen={true} />
            </div>

            {/* Typewriter Retro Letter Card */}
            <div
              className="w-full text-left p-[clamp(1rem,2.8dvh,2.5rem)] border-4 border-[#1A0307] max-h-[82dvh] overflow-y-auto"
              style={{
                backgroundColor: "#FFF9F0",
                boxShadow: "6px 6px 0px #1A0307, 0 25px 60px rgba(0,0,0,0.6)",
              }}
            >
              {/* Card Header Stamp */}
              <div className="flex items-center justify-between pb-2.5 mb-4 border-b-2 border-[#1A0307]">
                <span
                  className="text-[8px] sm:text-[10px] text-[#8B2635] uppercase font-bold"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  SECRET BIRTHDAY LETTER
                </span>
                <PixelHeart size={14} color="#FF4D6D" outline="#1A0307" />
              </div>

              {/* Typewriter Body Content */}
              <div
                className="text-sm sm:text-lg md:text-xl text-[#350710] leading-relaxed whitespace-pre-line font-medium min-h-[180px] sm:min-h-[220px]"
                style={{
                  fontFamily: "'VT323', monospace",
                  lineHeight: "1.6",
                }}
              >
                {typedText}
                <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-[#8B2635] ml-1 animate-pulse align-middle" />
              </div>

              {/* Replay Button at Bottom */}
              <div className="pt-4 mt-5 border-t-2 border-[#1A0307] flex items-center justify-between gap-2">
                <button
                  onClick={handleRestart}
                  className="px-3 sm:px-4 py-2 bg-[#641526] hover:bg-[#8B2635] text-[#FFF9F0] border-2 border-[#1A0307] text-[9px] sm:text-[10px] font-bold uppercase cursor-pointer shadow-[2px_2px_0px_#1A0307] active:translate-x-0.5 active:translate-y-0.5"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  ↺ PLAY AGAIN
                </button>
                <span
                  className="text-[8px] sm:text-[9px] text-[#8B2635]"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  WITH LOVE ♡
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

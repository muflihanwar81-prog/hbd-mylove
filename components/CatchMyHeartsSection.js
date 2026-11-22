"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Play, Gift, ArrowRight, RotateCcw } from "lucide-react";
import Confetti from "@/components/Confetti";

/* ── Smooth Easing ── */
const easeSoft = [0.22, 1, 0.36, 1];
const easePop = [0.34, 1.56, 0.64, 1];

export default function CatchMyHeartsSection() {
  // Game states: "intro" | "playing" | "victory" | "surprise"
  const [gameState, setGameState] = useState("intro");
  const [score, setScore] = useState(0);

  // Game canvas & bucket ref
  const gameAreaRef = useRef(null);
  const [bucketX, setBucketX] = useState(50); // percentage 0 - 100
  const bucketXRef = useRef(50);
  const heartsRef = useRef([]);
  const scoreRef = useRef(0);
  const [hearts, setHearts] = useState([]);
  const [isCatching, setIsCatching] = useState(false);
  const [catchBurst, setCatchBurst] = useState(null);

  // Envelope state for Part 4
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Helper to update bucket position safely without restarting game loop
  const updateBucketX = (val) => {
    const clamped = Math.max(8, Math.min(92, val));
    bucketXRef.current = clamped;
    setBucketX(clamped);
  };

  // ── Keyboard Controls for Desktop ──
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

  // ── Pointer / Drag Controls for Touch & Mouse ──
  const handlePointerMove = (e) => {
    if (gameState !== "playing" || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0]?.clientX : e.clientX;
    if (clientX !== undefined) {
      const relX = ((clientX - rect.left) / rect.width) * 100;
      updateBucketX(relX);
    }
  };

  // ── Game Loop: Spawning & Falling Hearts ──
  useEffect(() => {
    if (gameState !== "playing") return;

    // Reset game counters
    heartsRef.current = [];
    scoreRef.current = 0;
    setScore(0);
    setHearts([]);

    let animationFrameId;
    let lastSpawnTime = Date.now();

    const gameLoop = () => {
      const now = Date.now();

      // Spawn a new heart every ~800ms
      if (now - lastSpawnTime > 800) {
        lastSpawnTime = now;
        const newHeart = {
          id: Math.random().toString(36).substr(2, 9),
          x: Math.random() * 80 + 10, // 10% to 90%
          y: -5,
          speed: Math.random() * 0.4 + 0.85, // gentle falling speed
          size: Math.random() * 8 + 26, // 26px - 34px
          color: Math.random() > 0.4 ? "#E9A0AA" : "#FFFFFF",
        };
        heartsRef.current.push(newHeart);
      }

      // Update positions & check collisions against current bucket position
      const currentBucketX = bucketXRef.current;
      const nextHearts = [];

      for (let h of heartsRef.current) {
        h.y += h.speed;

        // Collision check with bucket (bucket rim is at y ~76% - 90%)
        const isNearBottom = h.y >= 75 && h.y <= 90;
        const isHorizontallyAligned = Math.abs(h.x - currentBucketX) <= 12;

        if (isNearBottom && isHorizontallyAligned) {
          // Heart caught!
          setIsCatching(true);
          setCatchBurst({ x: currentBucketX, y: h.y });
          setTimeout(() => setIsCatching(false), 200);
          setTimeout(() => setCatchBurst(null), 400);

          scoreRef.current += 1;
          const currentScore = scoreRef.current;
          setScore(currentScore);

          if (currentScore >= 10) {
            setTimeout(() => setGameState("victory"), 350);
          }
          // Do not re-add caught heart
          continue;
        }

        // If heart fell past bottom without being caught, it continues offscreen safely
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
  }, [gameState]); // ONLY depends on gameState, NEVER restarts when moving bucket!

  // Restart game
  const handleRestart = () => {
    setScore(0);
    setHearts([]);
    setIsEnvelopeOpen(false);
    setGameState("intro");
  };

  return (
    <section
      id="game"
      className="relative min-h-screen w-full flex items-center justify-center px-4 py-16 sm:py-20 md:py-24 overflow-hidden select-none"
      style={{
        backgroundColor: "#4A0714",
        backgroundImage: "radial-gradient(circle at 50% 40%, #641526 0%, #4A0714 65%, #350710 100%)",
      }}
    >
      {/* ── Background Subtle Scrapbook Ambience ── */}
      <Confetti active={gameState === "victory"} />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#8B2635]/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#350710]/50 rounded-full blur-3xl" />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BAGIAN 1 — GAME INTRO
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {gameState === "intro" && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: easeSoft }}
            className="relative z-20 w-full max-w-xl mx-auto text-center"
          >
            {/* Scrapbook Decorative Stickers Around Intro */}
            {/* 1. Wax Seal Sticker (Top Left) */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: easePop }}
              whileHover={{ scale: 1.15, rotate: 8 }}
              className="absolute -top-10 -left-6 sm:-left-10 z-30 w-16 sm:w-20 pointer-events-auto select-none drop-shadow-xl cursor-pointer"
            >
              <img
                src="/images/letter-stickers/wax-seal.png"
                alt="Wax Seal"
                className="w-full h-auto"
              />
            </motion.div>

            {/* 2. Red Embroidered Stars (Top Right) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.45, duration: 0.6, ease: easePop }}
              whileHover={{ scale: 1.15, rotate: -10 }}
              className="absolute -top-12 -right-6 sm:-right-10 z-30 w-18 sm:w-22 pointer-events-auto select-none drop-shadow-xl cursor-pointer"
            >
              <img
                src="/images/letter-stickers/red-stars.png"
                alt="Red Stars"
                className="w-full h-auto"
              />
            </motion.div>

            {/* 3. Pixel Hearts (Bottom Center / Floating) */}
            <motion.div
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: easePop }}
              whileHover={{ scale: 1.1 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 w-32 sm:w-38 pointer-events-auto select-none drop-shadow-lg cursor-pointer"
            >
              <img
                src="/images/letter-stickers/pixel-hearts.png"
                alt="Hearts"
                className="w-full h-auto"
              />
            </motion.div>

            {/* Layer 2: Decorative Shadow Paper */}
            <div
              className="absolute -bottom-2 -right-2 left-2 top-2 rounded-2xl pointer-events-none"
              style={{
                backgroundColor: "#EBDAC5",
                transform: "rotate(1.2deg)",
                boxShadow: "0 15px 35px rgba(53, 7, 16, 0.45)",
              }}
            />

            {/* Layer 1: Main Ivory Scrapbook Card */}
            <div
              className="relative z-20 rounded-2xl px-6 sm:px-12 py-12 sm:py-16 border border-[#E9A0AA]/30 shadow-2xl"
              style={{
                backgroundColor: "#FFF9F0",
                boxShadow: "0 25px 60px rgba(53, 7, 16, 0.6), 0 0 0 1px rgba(233, 160, 170, 0.2)",
              }}
            >
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#641526]/10 border border-[#641526]/20 mb-4">
                <Sparkles size={13} className="text-[#8B2635]" />
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#8B2635] uppercase">
                  MINI SCRAPBOOK GAME
                </span>
              </div>

              {/* Title: A Little Game for You ♡ */}
              <h2
                className="text-4xl sm:text-5xl md:text-6xl text-[#521321] font-normal mb-4 tracking-normal"
                style={{
                  fontFamily: "'Alex Brush', 'Dancing Script', cursive",
                  textShadow: "0 2px 6px rgba(82, 19, 33, 0.15)",
                }}
              >
                A Little Game for You ♡
              </h2>

              {/* Description */}
              <p
                className="text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto mb-8 font-normal"
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  color: "#641526",
                }}
              >
                Before you leave, I have one little game for you. Don&apos;t worry, there&apos;s a special surprise waiting at the end.
              </p>

              {/* Button: Let's Play! ♡ */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setScore(0);
                  setHearts([]);
                  setGameState("playing");
                }}
                className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl cursor-pointer text-[#FFF9F0]"
                style={{
                  backgroundColor: "#8B2635",
                  backgroundImage: "linear-gradient(135deg, #8B2635 0%, #641526 100%)",
                  boxShadow: "0 8px 25px rgba(100, 21, 38, 0.45)",
                }}
              >
                <Heart size={16} className="fill-[#FFF9F0]" />
                <span>Let&apos;s Play! ♡</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            BAGIAN 2 — THE GAME (Catch My Hearts)
        ══════════════════════════════════════════════════════════════ */}
        {gameState === "playing" && (
          <motion.div
            key="game-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: easeSoft }}
            className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center"
          >
            {/* Game Card Header & Score Progress */}
            <div className="w-full flex items-center justify-between px-6 py-3 mb-3 bg-[#FFF9F0] rounded-xl border border-[#E9A0AA]/30 shadow-md">
              <div className="flex items-center gap-2">
                <Heart size={18} className="fill-[#8B2635] text-[#8B2635]" />
                <span className="font-bold text-xs sm:text-sm text-[#521321] uppercase tracking-wider">
                  Hearts Collected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base sm:text-lg text-[#8B2635]">
                  {score} / 10
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-[#350710]/40 rounded-full mb-3 overflow-hidden border border-[#E9A0AA]/20">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E9A0AA] to-[#8B2635]"
                initial={{ width: "0%" }}
                animate={{ width: `${(score / 10) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Interactive Game Canvas / Area */}
            <div
              ref={gameAreaRef}
              onMouseMove={handlePointerMove}
              onTouchMove={handlePointerMove}
              className="relative w-full h-[400px] sm:h-[450px] rounded-2xl overflow-hidden border border-[#E9A0AA]/30 shadow-2xl cursor-ew-resize select-none"
              style={{
                backgroundColor: "#2A050D",
                backgroundImage: "radial-gradient(circle at 50% 50%, #4A0714 0%, #2A050D 100%)",
              }}
            >
              {/* Instructions banner on top */}
              <div className="absolute top-3 inset-x-0 text-center pointer-events-none">
                <p className="text-[11px] sm:text-xs text-white/60 tracking-wider font-mono uppercase">
                  ← Geser ember / tombol panah untuk menangkap hati →
                </p>
              </div>

              {/* Falling Hearts */}
              {hearts.map((h) => (
                <div
                  key={h.id}
                  className="absolute pointer-events-none transition-transform"
                  style={{
                    left: `${h.x}%`,
                    top: `${h.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Heart
                    size={h.size}
                    className="drop-shadow-[0_0_8px_rgba(233,160,170,0.8)] animate-pulse"
                    style={{
                      fill: h.color,
                      color: h.color,
                    }}
                  />
                </div>
              ))}

              {/* Catch Burst Floating Feedback */}
              {catchBurst && (
                <motion.div
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -30, scale: 1.3 }}
                  transition={{ duration: 0.4 }}
                  className="absolute pointer-events-none -translate-x-1/2 font-bold text-sm text-[#FFF9F0] drop-shadow-[0_0_8px_rgba(233,160,170,0.9)]"
                  style={{
                    left: `${catchBurst.x}%`,
                    top: `${catchBurst.y}%`,
                  }}
                >
                  +1 ♡
                </motion.div>
              )}

              {/* Player Bucket / Basket */}
              <motion.div
                animate={{
                  scale: isCatching ? 1.18 : 1,
                  y: isCatching ? -8 : 0,
                }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-5 -translate-x-1/2 pointer-events-none flex flex-col items-center"
                style={{
                  left: `${bucketX}%`,
                }}
              >
                {/* Wicker / Romantic Heart Basket Graphic */}
                <div className="relative w-16 sm:w-20 h-12 sm:h-14 bg-gradient-to-b from-[#8B2635] to-[#4A0714] rounded-b-2xl border-2 border-[#E9A0AA] shadow-2xl flex items-center justify-center">
                  <div className="absolute -top-3 w-10 sm:w-12 h-6 border-2 border-[#E9A0AA] rounded-t-full pointer-events-none" />
                  <Heart size={18} className="fill-[#FFF9F0] text-[#FFF9F0]" />
                </div>
              </motion.div>
            </div>

            {/* Mobile Controls Helpers */}
            <div className="md:hidden flex items-center justify-between w-full mt-3 px-2 gap-3">
              <button
                onClick={() => updateBucketX(bucketXRef.current - 14)}
                className="flex-1 py-3 bg-[#FFF9F0] rounded-xl text-[#521321] font-bold text-xs shadow-md active:bg-[#E9A0AA]/40 uppercase tracking-wider"
              >
                ← Kiri
              </button>
              <button
                onClick={() => updateBucketX(bucketXRef.current + 14)}
                className="flex-1 py-3 bg-[#FFF9F0] rounded-xl text-[#521321] font-bold text-xs shadow-md active:bg-[#E9A0AA]/40 uppercase tracking-wider"
              >
                Kanan →
              </button>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            BAGIAN 3 — VICTORY SCREEN
        ══════════════════════════════════════════════════════════════ */}
        {gameState === "victory" && (
          <motion.div
            key="victory-screen"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: easePop }}
            className="relative z-20 w-full max-w-lg mx-auto text-center"
          >
            {/* Scrapbook Victory Card */}
            <div
              className="relative z-20 rounded-2xl px-6 sm:px-12 py-12 sm:py-16 border border-[#E9A0AA]/40 shadow-2xl"
              style={{
                backgroundColor: "#FFF9F0",
                boxShadow: "0 25px 60px rgba(53, 7, 16, 0.65)",
              }}
            >
              {/* Victory Heart Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.25, 1] }}
                transition={{ duration: 0.6, ease: easePop }}
                className="w-20 h-20 mx-auto rounded-full bg-[#8B2635]/15 border border-[#8B2635]/30 flex items-center justify-center text-[#8B2635] mb-5"
              >
                <Heart size={40} className="fill-[#8B2635]" />
              </motion.div>

              {/* Victory Headlines */}
              <h2
                className="text-4xl sm:text-5xl text-[#521321] font-normal mb-2 tracking-normal"
                style={{
                  fontFamily: "'Alex Brush', 'Dancing Script', cursive",
                  textShadow: "0 2px 8px rgba(82, 19, 33, 0.15)",
                }}
              >
                YAY! YOU DID IT!
              </h2>

              <p
                className="text-base sm:text-xl font-bold tracking-wide uppercase mb-8"
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  color: "#8B2635",
                }}
              >
                You collected all my hearts!
              </p>

              {/* Button: Claim Your Surprise ♡ */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameState("surprise")}
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl cursor-pointer text-[#FFF9F0]"
                style={{
                  backgroundColor: "#8B2635",
                  backgroundImage: "linear-gradient(135deg, #8B2635 0%, #641526 100%)",
                  boxShadow: "0 8px 30px rgba(100, 21, 38, 0.5)",
                }}
              >
                <Gift size={18} />
                <span>Claim Your Surprise ♡</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            BAGIAN 4 — SURPRISE ENVELOPE & SECRET LETTER
        ══════════════════════════════════════════════════════════════ */}
        {gameState === "surprise" && (
          <motion.div
            key="surprise-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: easeSoft }}
            className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center text-center"
          >
            {/* The Maroon Envelope with Heart Wax Seal */}
            <div className="relative w-full max-w-md">

              {/* Envelope Body */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-700"
                style={{
                  backgroundColor: "#4A0714",
                  border: "2px solid rgba(233, 160, 170, 0.4)",
                  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
                }}
              >
                {/* Envelope Flap Header */}
                <div
                  className="px-6 py-6 text-center border-b border-[#E9A0AA]/20"
                  style={{
                    backgroundColor: "#641526",
                  }}
                >
                  <p className="text-xs uppercase font-mono tracking-widest text-[#E9A0AA]">
                    CONFIDENTIAL & SPECIAL FOR YOU
                  </p>
                </div>

                {/* Wax Seal Toggle Button */}
                {!isEnvelopeOpen && (
                  <div className="py-12 sm:py-16 flex flex-col items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEnvelopeOpen(true)}
                      className="w-24 h-24 rounded-full bg-[#8B2635] border-2 border-[#E9A0AA] shadow-2xl flex items-center justify-center cursor-pointer select-none group"
                    >
                      <img
                        src="/images/letter-stickers/wax-seal.png"
                        alt="Heart Wax Seal"
                        className="w-20 h-20 transition-transform group-hover:scale-110 drop-shadow-md"
                      />
                    </motion.div>
                    <p className="mt-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FFF9F0]/80">
                      Klik Segel Lilin Untuk Membuka 💌
                    </p>
                  </div>
                )}

                {/* Secret Letter Slides Out Slowly */}
                <AnimatePresence>
                  {isEnvelopeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 60, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 1, ease: easeSoft }}
                      className="px-6 sm:px-10 py-10 sm:py-12 m-4 rounded-xl border border-[#E9A0AA]/30 text-left shadow-inner"
                      style={{
                        backgroundColor: "#FFF9F0",
                      }}
                    >
                      {/* Letter Top Stamp */}
                      <div className="flex items-center justify-between mb-4 border-b border-[#641526]/15 pb-3">
                        <span className="text-[11px] font-mono tracking-widest text-[#8B2635] uppercase">
                          FROM THE DEEPEST OF MY HEART
                        </span>
                        <Heart size={16} className="fill-[#8B2635] text-[#8B2635]" />
                      </div>

                      {/* Letter Title */}
                      <h3
                        className="text-3xl sm:text-4xl text-[#521321] font-normal mb-4"
                        style={{
                          fontFamily: "'Alex Brush', 'Dancing Script', cursive",
                        }}
                      >
                        A Special Secret For You ♡
                      </h3>

                      {/* Romantic Content */}
                      <p
                        className="text-xs sm:text-sm md:text-base leading-relaxed text-[#521321] mb-6 font-normal"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                        }}
                      >
                        Kamu berhasil mengumpulkan semua hatiku di mini game ini... tapi sebenarnya, seluruh hatiku sudah menjadi milikmu seutuhnya sejak hari pertama kita bersama.
                        <br /><br />
                        Terima kasih sudah selalu menjadi alasan di balik senyumku, tempat pulang ternyamanku, dan kado terindah yang pernah Tuhan hadirkan dalam hidupku.
                        <br /><br />
                        I love you more than words could ever say, happy birthday my favorite person in the whole universe! 🤍
                      </p>

                      {/* Footer / Replay Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#641526]/15">
                        <button
                          onClick={handleRestart}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B2635] hover:text-[#521321] cursor-pointer"
                        >
                          <RotateCcw size={14} />
                          <span>Main Lagi ↺</span>
                        </button>

                        <span className="text-xs font-mono text-[#8B2635]">
                          Forever & Always ♡
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

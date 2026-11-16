"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Sparkles } from "lucide-react";
import { secretCodeData, siteConfig } from "@/lib/data-konten";

export default function SecretCodeSection({ onUnlock }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [stars, setStars] = useState([]);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Generate background stars deterministically after mount
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (i * 37 + 13) % 100,
      y: (i * 53 + 7) % 100,
      size: 2 + (i % 3),
      delay: (i % 5) * 0.7,
      duration: 2.5 + (i % 3) * 0.8,
    }));
    setStars(generated);

    // Auto-focus first input box
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const triggerAudioPlay = () => {
    try {
      const audioEl = document.getElementById("bg-music-player");
      if (audioEl) {
        audioEl.currentTime = 0;
        const playPromise = audioEl.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => console.log("Audio notice:", e));
        }
      }
    } catch (e) {
      console.log("Audio trigger error:", e);
    }
  };

  const checkAndSubmit = useCallback((codeArray) => {
    const entered = (codeArray || code).join("").trim();
    if (entered.length !== 6) return;

    const target = String(siteConfig.secretCode || "241107").trim();

    // Accept target code or 241107
    if (entered === target || entered === "241107") {
      // Correct password!
      setError(false);
      setIsUnlocking(true);
      triggerAudioPlay();

      // Trigger main site reveal
      setTimeout(() => {
        if (onUnlock) onUnlock();
      }, 500);
    } else {
      // Wrong password
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => {
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }, 700);
    }
  }, [code, onUnlock]);

  const handleChange = (index, value) => {
    const cleanDigits = value.replace(/\D/g, "");

    // If multiple digits pasted or autofilled into one box
    if (cleanDigits.length > 1) {
      const digits = cleanDigits.slice(0, 6).split("");
      const newCode = [...code];
      for (let i = 0; i < digits.length; i++) {
        if (index + i < 6) {
          newCode[index + i] = digits[i];
        }
      }
      setCode(newCode);
      setError(false);

      if (newCode.every((d) => d !== "")) {
        checkAndSubmit(newCode);
      } else {
        const nextIdx = Math.min(index + digits.length, 5);
        inputRefs.current[nextIdx]?.focus();
      }
      return;
    }

    const newCode = [...code];
    newCode[index] = cleanDigits.slice(-1);
    setCode(newCode);
    setError(false);

    // Auto move to next input
    if (cleanDigits && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit immediately when all 6 digits are filled
    if (newCode.every((d) => d !== "")) {
      checkAndSubmit(newCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      }
    } else if (e.key === "Enter") {
      checkAndSubmit(code);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length > 0) {
      const newCode = ["", "", "", "", "", ""];
      for (let i = 0; i < 6; i++) {
        newCode[i] = pasted[i] || "";
      }
      setCode(newCode);
      setError(false);

      if (pasted.length === 6) {
        checkAndSubmit(newCode);
      } else {
        inputRefs.current[Math.min(pasted.length, 5)]?.focus();
      }
    }
  };

  const isComplete = code.every((d) => d !== "");

  return (
    <motion.div
      key="secret-gate-root"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isUnlocking ? "pointer-events-none" : ""
      }`}
      style={{
        background: "linear-gradient(135deg, #1A030C 0%, #260814 30%, #3B0B1E 60%, #260814 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background:
                s.id % 3 === 0
                  ? "rgba(255,255,255,0.9)"
                  : s.id % 3 === 1
                  ? "rgba(169,199,234,0.7)"
                  : "rgba(220,229,245,0.6)",
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Decorative Flowers */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.08] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="60" r="40" fill="#A9C7EA" />
          <circle cx="60" cy="100" r="35" fill="#DCE5F5" />
          <circle cx="140" cy="100" r="35" fill="#A9C7EA" />
          <circle cx="80" cy="140" r="30" fill="#DCE5F5" />
          <circle cx="120" cy="140" r="30" fill="#A9C7EA" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.08] pointer-events-none rotate-180">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="60" r="40" fill="#A9C7EA" />
          <circle cx="60" cy="100" r="35" fill="#DCE5F5" />
          <circle cx="140" cy="100" r="35" fill="#A9C7EA" />
        </svg>
      </div>

      {/* Glassmorphic White/Navy Card */}
      <motion.div
        className={`relative z-10 w-full max-w-[440px] mx-auto p-6 sm:p-8 rounded-3xl ${
          shaking ? "shake" : ""
        }`}
        style={{
          background: "rgba(45, 10, 24, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(226, 125, 155, 0.25)",
          boxShadow: "0 15px 45px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Lock Icon Header */}
        <motion.div
          className="flex justify-center mb-5"
          animate={isUnlocking ? { rotate: [0, -10, 10, 0], scale: [1, 1.25, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
            style={{
              background: isUnlocking
                ? "linear-gradient(135deg, rgba(217, 43, 107, 0.7), rgba(247, 194, 207, 0.4))"
                : "linear-gradient(135deg, rgba(217, 43, 107, 0.35), rgba(163, 24, 70, 0.2))",
              border: "1px solid rgba(226, 125, 155, 0.35)",
            }}
          >
            {isUnlocking ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Unlock size={26} className="text-[#FFF5F7]" />
              </motion.div>
            ) : (
              <Lock size={26} className="text-[#F7C2CF]" />
            )}
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-center text-white mb-2 font-heading"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {secretCodeData.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xs sm:text-sm text-center text-[#A9C7EA] mb-6 font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {secretCodeData.subtitle}
        </motion.p>

        {/* 6 Digit Input Boxes - Perfect Square Boxes Centered Inside Card */}
        <motion.div
          className="flex justify-center items-center gap-2 sm:gap-2.5 w-full my-6 px-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              disabled={isUnlocking}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={`shrink-0 text-center font-bold rounded-xl outline-none transition-all duration-300 text-xl sm:text-2xl ${
                error
                  ? "text-red-300 bg-red-500/15"
                  : isUnlocking
                  ? "text-[#F8F8FF] bg-blue-400/20"
                  : digit
                  ? "text-white bg-white/15"
                  : "text-white bg-white/5"
              }`}
              style={{
                width: "48px",
                height: "48px",
                maxWidth: "50px",
                maxHeight: "50px",
                minWidth: "38px",
                minHeight: "38px",
                aspectRatio: "1 / 1",
                padding: "0",
                border: `2px solid ${
                  error
                    ? "rgba(248, 113, 113, 0.7)"
                    : isUnlocking
                    ? "rgba(217, 43, 107, 0.9)"
                    : digit
                    ? "rgba(226, 125, 155, 0.85)"
                    : "rgba(255, 255, 255, 0.2)"
                }`,
                boxShadow: digit ? "0 0 15px rgba(217, 43, 107, 0.35)" : "none",
              }}
            />
          ))}
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              className="text-center text-red-300 text-xs sm:text-sm mb-4 font-medium"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {secretCodeData.wrongCodeMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Unlock Button */}
        <motion.button
          onClick={() => checkAndSubmit(code)}
          disabled={!isComplete || isUnlocking}
          className={`w-full py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
            isComplete && !isUnlocking
              ? "text-white cursor-pointer shadow-lg"
              : isUnlocking
              ? "text-white"
              : "text-white/40 cursor-not-allowed"
          }`}
          style={{
            background:
              isComplete || isUnlocking
                ? "linear-gradient(135deg, #D92B6B 0%, #B81B52 50%, #8F123C 100%)"
                : "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(226, 125, 155, 0.35)",
            boxShadow:
              isComplete || isUnlocking ? "0 10px 30px rgba(217, 43, 107, 0.45)" : "none",
          }}
          whileHover={isComplete && !isUnlocking ? { scale: 1.02 } : {}}
          whileTap={isComplete && !isUnlocking ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {isUnlocking ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Sparkles size={18} />
              </motion.div>
              <span>Opening your surprise... 🎵</span>
            </>
          ) : (
            <>
              <Lock size={16} />
              <span>{secretCodeData.buttonText}</span>
            </>
          )}
        </motion.button>

        {/* Decorative indicator dots */}
        <div className="flex justify-center gap-2 mt-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#A9C7EA]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>

      {/* Ripple ring effect on unlock */}
      <AnimatePresence>
        {isUnlocking && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-40 h-40 rounded-full border-2 border-[#A9C7EA]"
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: [0.2, 3, 6], opacity: [1, 0.6, 0] }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

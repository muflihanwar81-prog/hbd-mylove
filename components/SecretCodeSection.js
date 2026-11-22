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

  const checkAndSubmit = useCallback((codeArray) => {
    const entered = (codeArray || code).join("").trim();
    if (entered.length !== 6) return;

    const target = String(siteConfig.secretCode || "241107").trim();

    // Accept target code or 241107
    if (entered === target || entered === "241107") {
      // Correct password!
      setError(false);
      setIsUnlocking(true);

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
        background: "radial-gradient(ellipse at 50% 50%, #4A1021 0%, #350B19 45%, #24050E 80%, #150207 100%)",
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
                  ? "rgba(255, 245, 237, 0.95)"
                  : s.id % 3 === 1
                  ? "rgba(214, 165, 109, 0.85)"
                  : "rgba(168, 50, 80, 0.7)",
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Decorative Warm Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.07] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="60" r="40" fill="#D6A56D" />
          <circle cx="60" cy="100" r="35" fill="#801F3A" />
          <circle cx="140" cy="100" r="35" fill="#D6A56D" />
          <circle cx="80" cy="140" r="30" fill="#64152D" />
          <circle cx="120" cy="140" r="30" fill="#D6A56D" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.07] pointer-events-none rotate-180">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="60" r="40" fill="#D6A56D" />
          <circle cx="60" cy="100" r="35" fill="#801F3A" />
          <circle cx="140" cy="100" r="35" fill="#D6A56D" />
        </svg>
      </div>

      {/* Glassmorphic Luxury Maroon/Wine Card */}
      <motion.div
        className={`relative z-10 w-full max-w-[440px] mx-auto p-6 sm:p-8 rounded-3xl ${
          shaking ? "shake" : ""
        }`}
        style={{
          background: "rgba(53, 11, 25, 0.82)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(214, 165, 109, 0.3)",
          boxShadow: "0 20px 50px rgba(18, 2, 7, 0.6), inset 0 1px 0 rgba(255, 245, 237, 0.15)",
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
                ? "linear-gradient(135deg, rgba(214, 165, 109, 0.7), rgba(128, 31, 58, 0.5))"
                : "linear-gradient(135deg, rgba(128, 31, 58, 0.45), rgba(74, 16, 33, 0.3))",
              border: "1px solid rgba(214, 165, 109, 0.4)",
            }}
          >
            {isUnlocking ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Unlock size={26} className="text-[#FFF5ED]" />
              </motion.div>
            ) : (
              <Lock size={26} className="text-[#D6A56D]" />
            )}
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-center text-[#FFF5ED] mb-2 font-heading"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {secretCodeData.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xs sm:text-sm text-center text-[#D6A56D]/85 mb-6 font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {secretCodeData.subtitle}
        </motion.p>

        {/* 6 Digit Input Boxes */}
        <motion.div
          className="flex justify-center items-center gap-1.5 sm:gap-2.5 w-full my-5 sm:my-6 px-1"
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
              className={`shrink-0 text-center font-bold rounded-xl outline-none transition-all duration-300 text-lg sm:text-2xl w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 ${
                error
                  ? "text-red-300 bg-red-500/15"
                  : isUnlocking
                  ? "text-[#FFF5ED] bg-[#D6A56D]/20"
                  : digit
                  ? "text-[#FFF5ED] bg-white/15"
                  : "text-[#FFF5ED] bg-white/5"
              }`}
              style={{
                aspectRatio: "1 / 1",
                padding: "0",
                border: `2px solid ${
                  error
                    ? "rgba(248, 113, 113, 0.7)"
                    : isUnlocking
                    ? "rgba(214, 165, 109, 0.9)"
                    : digit
                    ? "rgba(214, 165, 109, 0.85)"
                    : "rgba(214, 165, 109, 0.25)"
                }`,
                boxShadow: digit ? "0 0 15px rgba(214, 165, 109, 0.35)" : "none",
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
              ? "text-[#FFF5ED] cursor-pointer shadow-lg"
              : isUnlocking
              ? "text-[#FFF5ED]"
              : "text-[#FFF5ED]/40 cursor-not-allowed"
          }`}
          style={{
            background:
              isComplete || isUnlocking
                ? "linear-gradient(135deg, #801F3A 0%, #64152D 50%, #4A1021 100%)"
                : "rgba(53, 11, 25, 0.45)",
            border: "1px solid rgba(214, 165, 109, 0.4)",
            boxShadow:
              isComplete || isUnlocking ? "0 10px 30px rgba(128, 31, 58, 0.45), 0 0 20px rgba(214, 165, 109, 0.25)" : "none",
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
                <Sparkles size={18} className="text-[#D6A56D]" />
              </motion.div>
              <span>Opening your surprise... 🎵</span>
            </>
          ) : (
            <>
              <Lock size={16} className="text-[#D6A56D]" />
              <span>{secretCodeData.buttonText}</span>
            </>
          )}
        </motion.button>

        {/* Decorative indicator dots */}
        <div className="flex justify-center gap-2 mt-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#D6A56D]"
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
              className="w-40 h-40 rounded-full border-2 border-[#D6A56D]"
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

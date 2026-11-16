"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown, Mail, Heart } from "lucide-react";
import { openingData } from "@/lib/data-konten";

export default function OpeningSection() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden text-center">
      {/* Decorative floral elements */}
      <div className="absolute top-8 right-8 w-56 h-56 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="50" r="35" fill="#A9C7EA" />
          <circle cx="55" cy="90" r="30" fill="#DCE5F5" />
          <circle cx="145" cy="90" r="30" fill="#A9C7EA" />
          <circle cx="70" cy="135" r="28" fill="#DCE5F5" />
          <circle cx="130" cy="135" r="28" fill="#A9C7EA" />
          <circle cx="100" cy="170" r="20" fill="#F8F8FF" />
        </svg>
      </div>
      <div className="absolute bottom-8 left-8 w-48 h-48 opacity-10 pointer-events-none rotate-180">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="50" r="35" fill="#DCE5F5" />
          <circle cx="55" cy="90" r="30" fill="#A9C7EA" />
          <circle cx="145" cy="90" r="30" fill="#DCE5F5" />
          <circle cx="100" cy="140" r="25" fill="#A9C7EA" />
        </svg>
      </div>

      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-semibold mb-6 tracking-widest uppercase"
          style={{
            background: "rgba(169,199,234,0.15)",
            border: "1px solid rgba(169,199,234,0.3)",
            color: "#A9C7EA",
            boxShadow: "0 0 20px rgba(169,199,234,0.15)",
          }}
        >
          <Sparkles size={14} className="animate-spin text-[#A9C7EA]" style={{ animationDuration: "6s" }} />
          <span>{openingData.badge}</span>
          <Sparkles size={14} className="animate-spin text-[#A9C7EA]" style={{ animationDuration: "6s" }} />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {openingData.greeting}
          </h1>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mt-1 gradient-text-blue"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {openingData.nameGreeting}
          </h2>
        </motion.div>

        {/* Polaroid Memory Photo in Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          className="my-6 polaroid cursor-pointer group transition-all duration-300"
          style={{ maxWidth: "240px" }}
        >
          <div className="aspect-[4/3] w-full rounded overflow-hidden bg-[#102B5C] relative">
            <img
              src={openingData.polaroidPhoto}
              alt="Memory"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <p
            className="text-center mt-3 text-xs md:text-sm text-[#102B5C] font-semibold"
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: "16px" }}
          >
            {openingData.polaroidCaption}
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-[#A9C7EA]/90 font-light max-w-lg mb-8 leading-relaxed"
        >
          {openingData.subGreeting}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <motion.button
            onClick={() => scrollTo("memories")}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -10px rgba(169,199,234,0.4)" }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-4 rounded-full font-bold text-base shadow-xl flex items-center justify-center gap-3 transition-all cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #A9C7EA 0%, #DCE5F5 50%, #F8F8FF 100%)",
              color: "#102B5C",
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            <span>{openingData.buttonPrimary}</span>
            <ArrowDown size={18} />
          </motion.button>

          <motion.button
            onClick={() => scrollTo("letter")}
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-3 transition-all cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#F8F8FF",
              border: "1px solid rgba(169,199,234,0.4)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Mail size={18} className="text-[#A9C7EA]" />
            <span>{openingData.buttonSecondary}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

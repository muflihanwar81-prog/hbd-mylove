"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { openingData, coupleData } from "@/lib/data-konten";

export default function OpeningSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Full-Screen Background Photo ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={openingData.polaroidPhoto || "/images/couple-main.svg"}
          alt="Us"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />

        {/* Dark cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(21,2,7,0.45) 0%, rgba(21,2,7,0.25) 35%, rgba(21,2,7,0.35) 65%, rgba(21,2,7,0.75) 100%)",
          }}
        />

        {/* Soft warm vignette */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 0 0 180px rgba(21,2,7,0.6), inset 0 0 80px rgba(53,11,25,0.3)",
          }}
        />
      </div>

      {/* ── Centered Text ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* HAPPY BIRTHDAY — large elegant serif */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wide text-white leading-none"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow: "0 4px 30px rgba(0,0,0,0.6), 0 1px 5px rgba(0,0,0,0.4)",
          }}
        >
          HAPPY BIRTHDAY
        </motion.h1>

        {/* to my favorite person — script/italic subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-2xl md:text-3xl italic font-light mt-3 sm:mt-5"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "rgba(230, 210, 230, 0.9)",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          to my favorite person
        </motion.p>
      </div>

      {/* ── Scroll to Explore — bottom center ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        onClick={() => scrollTo("memories")}
        className="absolute bottom-8 sm:bottom-12 z-10 flex flex-col items-center cursor-pointer select-none group"
      >
        {/* Mouse scroll icon */}
        <div className="w-5 h-8 rounded-full border-2 border-white/50 flex justify-center pt-1.5 group-hover:border-white/80 transition-colors">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-white/80 rounded-full"
          />
        </div>
        <p className="text-[9px] sm:text-[10px] font-medium tracking-[0.3em] text-white/60 uppercase mt-2 group-hover:text-white/90 transition-colors">
          Scroll to Explore
        </p>
      </motion.div>
    </section>
  );
}

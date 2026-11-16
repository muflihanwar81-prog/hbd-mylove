"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import { navItems, coupleData } from "@/lib/data-konten";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const brandName = coupleData.partnerName
    ? `${coupleData.partnerName.split(" ")[0]}'s Birthday`
    : "Novria's Birthday";

  return (
    <>
      {/* Desktop / Tablet Navigation Bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 sm:py-5"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div
          className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3 rounded-full"
          style={{
            background: "rgba(38, 8, 20, 0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(226, 125, 155, 0.22)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
          }}
        >
          {/* Brand Logo / Title on Left */}
          <div
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Sparkles size={16} className="text-[#E27D9B] group-hover:rotate-12 transition-transform" />
            <span
              className="text-white font-semibold text-sm sm:text-base tracking-wide"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {brandName}
            </span>
          </div>

          {/* Navigation Links in Center/Right (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive ? "text-white font-semibold" : "text-[#F7C2CF]/75 hover:text-white"
                  }`}
                >
                  <span>{item.label === "Home" ? "Surface" : item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#D92B6B] to-[#F7C2CF] rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-[#E27D9B] hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden flex items-center justify-center p-6"
            style={{
              background: "rgba(38, 8, 20, 0.96)",
              backdropFilter: "blur(24px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center gap-4 w-full max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-[#E27D9B]" />
                <span
                  className="text-xl text-white font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {brandName}
                </span>
              </div>

              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full py-3 px-6 rounded-2xl text-center text-base font-semibold transition-all ${
                      isActive
                        ? "bg-[#D92B6B]/30 text-white border border-[#E27D9B]/50"
                        : "text-[#F7C2CF]/80 hover:bg-white/5"
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    {item.label === "Home" ? "Surface" : item.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

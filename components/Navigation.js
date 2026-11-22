"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "letter", label: "Messeges" },
    { id: "memories", label: "Gallery" },
    { id: "game", label: "Mini Game" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["home", "letter", "memories", "game"];
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#26040D]/90 backdrop-blur-md py-3.5 sm:py-4 shadow-lg border-b border-[#B08A52]/20"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 flex items-center justify-center relative">
        {/* Desktop Links: Pure Text Centered */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10 text-xs sm:text-sm tracking-widest uppercase font-medium">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`transition-colors cursor-pointer select-none ${
                  isActive
                    ? "text-[#FFF5E8] font-bold underline underline-offset-4 decoration-[#B08A52]"
                    : "text-[#FFF5E8]/75 hover:text-[#B08A52]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center justify-end w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#FFF5E8] hover:text-[#B08A52] cursor-pointer rounded-lg bg-[#3B0715]/40 border border-[#B08A52]/25"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu: Pure Text */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#26040D]/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-4 text-center border-t border-[#B08A52]/20 shadow-2xl"
          >
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`py-2 text-xs sm:text-sm uppercase tracking-widest font-medium transition-colors cursor-pointer text-[#FFF5E8]/85 hover:text-[#B08A52] active:text-[#B08A52]`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center select-none ${
        scrolled
          ? "h-[70px] bg-black/80 backdrop-blur-md border-b border-[#C5A46D]/20 shadow-lg"
          : "h-[70px] sm:h-[80px] bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 flex items-center justify-center relative w-full">
        {/* Desktop Links: Pure Text Centered */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10 text-xs sm:text-sm tracking-widest uppercase font-medium">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`transition-colors cursor-pointer select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
                  isActive
                    ? "text-[#FFF5E8] font-bold underline underline-offset-4 decoration-[#C5A46D]"
                    : "text-[#FFF5E8]/90 hover:text-[#C5A46D]"
                }`}
                style={{
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.95)",
                }}
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
            className="p-2 text-[#FFF5E8] hover:text-[#C5A46D] cursor-pointer rounded-lg bg-black/60 backdrop-blur-md border border-[#C5A46D]/40 shadow-md"
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
            className="md:hidden absolute top-[70px] left-0 right-0 bg-[#080808]/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-4 text-center border-t border-[#C5A46D]/20 shadow-2xl"
          >
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`py-2 text-xs sm:text-sm uppercase tracking-widest font-medium transition-colors cursor-pointer text-[#FFF5E8] hover:text-[#C5A46D] active:text-[#C5A46D]`}
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

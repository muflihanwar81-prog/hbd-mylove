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
    { id: "memories", label: "Our Story" },
    { id: "gallery", label: "Gallery" },
    { id: "wishes", label: "About Us" },
    { id: "letter", label: "Open Letter" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["home", "memories", "gallery", "wishes", "letter"];
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
          ? "bg-[#080B12]/80 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        {/* Brand: Pure Text Only */}
        <div
          onClick={() => scrollTo("home")}
          className="cursor-pointer select-none"
        >
          <span
            className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-[#D6A56D] transition-colors"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            For You
          </span>
        </div>

        {/* Desktop Links: Pure Text Only */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs sm:text-sm tracking-widest uppercase font-medium">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            const isLetter = item.id === "letter";
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`transition-colors cursor-pointer select-none ${
                  isActive
                    ? "text-[#D6A56D] font-bold"
                    : isLetter
                    ? "text-[#D6A56D]/90 hover:text-[#F3E5AB] font-semibold"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger: Text Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-white/90 hover:text-white cursor-pointer"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
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
            className="md:hidden bg-[#080B12]/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-4 text-center border-t border-white/5"
          >
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`py-1 text-sm uppercase tracking-widest font-medium transition-colors cursor-pointer ${
                  item.id === "letter"
                    ? "text-[#D6A56D] font-bold"
                    : "text-white/80 hover:text-white"
                }`}
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

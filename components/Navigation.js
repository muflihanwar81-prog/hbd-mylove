"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X, Mail } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "memories", label: "Our Story" },
    { id: "gallery", label: "Gallery" },
    { id: "wishes", label: "About Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ["home", "memories", "gallery", "letter", "wishes"];
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0D14]/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[2px] py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Brand Logo on Left: Heart icon + "For You" */}
        <div
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D6A56D] to-[#F3E5AB] flex items-center justify-center shadow-lg shadow-[#D6A56D]/20 group-hover:scale-110 transition-transform">
            <Heart size={16} className="text-[#0A0D14] fill-[#0A0D14]" />
          </div>
          <span
            className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#D6A56D] transition-colors"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            For You
          </span>
        </div>

        {/* Desktop Navigation Links + Open Letter Button on Right */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative py-1 transition-colors cursor-pointer select-none tracking-wide ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A56D] rounded-full shadow-[0_0_8px_#D6A56D]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Yellow/Golden CTA Button: "Open Letter" */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo("letter")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer shadow-lg transition-all"
            style={{
              background: "linear-gradient(135deg, #F3E5AB 0%, #D6A56D 50%, #B8860B 100%)",
              color: "#0A0D14",
              boxShadow: "0 4px 20px rgba(214, 165, 109, 0.4)",
            }}
          >
            <Mail size={15} />
            <span>Open Letter</span>
          </motion.button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => scrollTo("letter")}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#0A0D14] bg-[#D6A56D]"
          >
            Letter
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white/90 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0D14]/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex flex-col gap-4"
          >
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-base font-medium text-white/80 hover:text-[#D6A56D] py-1 cursor-pointer transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("letter")}
              className="w-full mt-2 py-2.5 rounded-full text-center text-xs font-bold uppercase tracking-wider text-[#0A0D14] bg-gradient-to-r from-[#F3E5AB] to-[#D6A56D]"
            >
              Open Letter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

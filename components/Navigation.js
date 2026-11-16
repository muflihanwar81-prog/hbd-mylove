"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Camera, Image, Mail, Star, Menu, X } from "lucide-react";
import { navItems } from "@/lib/data-konten";

const iconMap = { Home, Camera, Image, Mail, Star };

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
          if (rect.top <= 150) { setActiveSection(sections[i]); break; }
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

  return (
    <>
      {/* Desktop */}
      <motion.nav className="fixed top-0 left-0 right-0 z-40 hidden md:block"
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
        <div className="mx-auto max-w-5xl mt-4 px-4">
          <div className="flex items-center justify-center gap-1 px-4 py-2 rounded-full"
            style={{ background: "rgba(16,43,92,0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(169,199,234,0.2)" }}>
            {navItems.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <button key={item.id} onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all duration-300
                    ${activeSection === item.id
                      ? "bg-[#A9C7EA]/30 text-white font-medium"
                      : "text-[#A9C7EA]/70 hover:bg-[#A9C7EA]/10 hover:text-[#A9C7EA]"}`}>
                  {Icon && <Icon size={16} />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile hamburger */}
      <motion.button className="fixed top-4 right-4 z-50 md:hidden w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "rgba(16,43,92,0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(169,199,234,0.2)" }}
        onClick={() => setIsOpen(!isOpen)} initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }} whileTap={{ scale: 0.9 }}>
        {isOpen ? <X size={22} className="text-[#A9C7EA]" /> : <Menu size={22} className="text-[#A9C7EA]" />}
      </motion.button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-40 md:hidden flex items-center justify-center"
            style={{ background: "linear-gradient(180deg, rgba(16,43,92,0.97) 0%, rgba(23,59,115,0.97) 100%)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <motion.div className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: 0.1 }}>
              {navItems.map((item, idx) => {
                const Icon = iconMap[item.icon];
                return (
                  <motion.button key={item.id} onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 px-8 py-3 rounded-2xl text-lg transition-all duration-300 w-56 justify-start
                      ${activeSection === item.id
                        ? "bg-[#A9C7EA]/25 text-white font-semibold"
                        : "text-[#A9C7EA]/80 hover:bg-[#A9C7EA]/10"}`}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + idx * 0.05 }}>
                    {Icon && <Icon size={22} />}
                    <span>{item.label}</span>
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

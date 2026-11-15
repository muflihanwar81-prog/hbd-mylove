"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Cake, Camera, Mail, Heart, Star, Gift, Menu, X } from "lucide-react";
import { navItems } from "@/lib/data-konten";

const iconMap = {
  Home, Cake, Camera, Mail, Heart, Star, Gift,
};

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
          if (rect.top <= 150) {
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

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 hidden md:block"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="mx-auto max-w-5xl mt-4 px-4">
          <div className="flex items-center justify-center gap-1 px-4 py-2 rounded-full
                          bg-white/15 backdrop-blur-xl border border-white/25 shadow-lg">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm
                             transition-all duration-300 ${
                               activeSection === item.id
                                 ? "bg-pink-500/30 text-pink-700 font-medium"
                                 : "text-pink-600/70 hover:bg-pink-500/10 hover:text-pink-600"
                             }`}
                >
                  {Icon && <Icon size={16} />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Hamburger Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 md:hidden w-12 h-12 rounded-full
                   flex items-center justify-center
                   bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X size={22} className="text-pink-600" />
        ) : (
          <Menu size={22} className="text-pink-600" />
        )}
      </motion.button>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex items-center justify-center
                       bg-gradient-to-b from-pink-100/95 via-rose-50/95 to-amber-50/95
                       backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, idx) => {
                const Icon = iconMap[item.icon];
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 px-8 py-3 rounded-2xl text-lg
                               transition-all duration-300 w-56 justify-start ${
                                 activeSection === item.id
                                   ? "bg-pink-500/25 text-pink-700 font-semibold"
                                   : "text-pink-600/80 hover:bg-pink-500/10"
                               }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
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

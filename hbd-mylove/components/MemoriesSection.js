"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Calendar, Star, Sparkles, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { memoriesData } from "@/lib/data-konten";

export default function MemoriesSection({ onPhotoClick }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const animationFrameRef = useRef(null);
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [isSlowed, setIsSlowed] = useState(false);
  const [activePhotoCaption, setActivePhotoCaption] = useState("");

  // Repeat photos 3x to ensure an infinite seamless wrap across all screen widths
  const basePhotos = memoriesData.photos || [];
  const loopedPhotos = [...basePhotos, ...basePhotos, ...basePhotos];
  const totalItems = loopedPhotos.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let lastTime = performance.now();
    // Default gliding speed: moving to the right (positive offset increment)
    // ~60px per second when normal, ~20px when hovered/slowed
    const normalSpeed = 1.1; 
    const slowSpeed = 0.35;

    const animate = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 16.666, 2.5);
      lastTime = currentTime;

      const container = containerRef.current;
      if (!container) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const containerWidth = container.offsetWidth;
      const isMobile = containerWidth < 640;
      const cardWidth = isMobile ? 240 : 300;
      const slotWidth = isMobile ? 280 : 350;
      const totalTrackWidth = totalItems * slotWidth;

      // Only auto-advance offset when user is not manually dragging
      if (!isDraggingRef.current) {
        const currentSpeed = isSlowed ? slowSpeed : normalSpeed;
        // Moving to the right: increment offset
        offsetRef.current = (offsetRef.current + currentSpeed * delta) % totalTrackWidth;
      }

      const centerX = containerWidth / 2;
      const maxDist = slotWidth * 1.8;

      let closestDist = Infinity;
      let closestItem = null;

      // Position each card directly via hardware-accelerated transforms
      itemRefs.current.forEach((el, index) => {
        if (!el) return;

        const baseX = index * slotWidth;
        const rawX = (baseX + offsetRef.current) % totalTrackWidth;

        // Calculate shortest wrapped distance to container center
        let diffX = (rawX - centerX) % totalTrackWidth;
        if (diffX < -totalTrackWidth / 2) diffX += totalTrackWidth;
        if (diffX > totalTrackWidth / 2) diffX -= totalTrackWidth;

        const dist = Math.abs(diffX);
        const itemX = centerX + diffX - cardWidth / 2;

        // Center magnification calculation:
        // When dist is 0 (exact center), factor is 1 -> scale max
        // When dist >= maxDist, factor is 0 -> scale min
        const normDist = Math.min(dist / maxDist, 1);
        // Cosine curve gives ultra-smooth organic magnification
        const factor = Math.cos(normDist * Math.PI * 0.5);

        const scale = (isMobile ? 0.82 : 0.84) + factor * (isMobile ? 0.32 : 0.38); // up to ~1.22x
        const opacity = 0.5 + factor * 0.5; // from 0.5 at sides to 1.0 at center
        const zIndex = Math.round(10 + factor * 40); // center card floats above others

        el.style.transform = `translate3d(${itemX}px, -50%, 0) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;

        // Visual enhancement for center card
        if (dist < closestDist) {
          closestDist = dist;
          closestItem = loopedPhotos[index];
        }

        // Active border glow toggle
        const isNearCenter = dist < slotWidth * 0.45;
        if (isNearCenter) {
          el.setAttribute("data-center", "true");
        } else {
          el.removeAttribute("data-center");
        }
      });

      if (closestItem && closestItem.caption !== activePhotoCaption) {
        setActivePhotoCaption(closestItem.caption);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, isSlowed, totalItems]);

  // Touch and Mouse Drag Handlers
  const handleDragStart = (clientX) => {
    isDraggingRef.current = true;
    dragStartXRef.current = clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handleDragMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current + deltaX;
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  const handleManualNudge = (direction) => {
    // direction: +1 for right, -1 for left
    const slot = typeof window !== "undefined" && window.innerWidth < 640 ? 280 : 350;
    offsetRef.current += direction * slot;
  };

  return (
    <section id="memories" className="relative min-h-screen px-4 py-20 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-[#173B73]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-[#102B5C]/60 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3"
            style={{
              background: "rgba(169, 199, 234, 0.12)",
              border: "1px solid rgba(169, 199, 234, 0.3)",
              color: "#A9C7EA",
            }}
          >
            <Camera size={15} />
            <span>Koleksi Kenangan Manis</span>
            <Sparkles size={14} className="text-[#A9C7EA]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#F8F8FF" }}
          >
            {memoriesData.title || "Our Memories"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#A9C7EA]/80 max-w-lg mx-auto mt-3 text-xs sm:text-sm md:text-base font-light"
          >
            {memoriesData.subtitle || "Setiap memori bersamamu selalu terukir indah tanpa henti"}
          </motion.p>
        </div>
      </div>

      {/* Infinite Gliding Carousel Container */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsSlowed(true)}
        onMouseLeave={() => {
          setIsSlowed(false);
          handleDragEnd();
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        className="relative w-full h-[470px] sm:h-[550px] md:h-[580px] overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Left & Right Edge Vignette Gradient Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 md:w-52 bg-gradient-to-r from-[#102B5C] via-[#102B5C]/80 to-transparent z-40 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 md:w-52 bg-gradient-to-l from-[#102B5C] via-[#102B5C]/80 to-transparent z-40 pointer-events-none" />

        {/* Carousel Track with Absolute Scaled Cards */}
        <div ref={trackRef} className="absolute inset-0 w-full h-full">
          {loopedPhotos.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              ref={(el) => (itemRefs.current[idx] = el)}
              onClick={() => onPhotoClick && onPhotoClick(item)}
              className="absolute top-1/2 left-0 w-[240px] sm:w-[300px] will-change-transform rounded-3xl p-3.5 sm:p-4.5 cursor-pointer transition-shadow duration-300 group"
              style={{
                background: "rgba(16, 43, 92, 0.7)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(169, 199, 234, 0.25)",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.45)",
              }}
            >
              {/* Cute Washi Tape at top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-6 rounded-sm -rotate-2 pointer-events-none z-10"
                style={{
                  background: "rgba(169, 199, 234, 0.3)",
                  borderTop: "1px dashed rgba(255, 255, 255, 0.6)",
                  borderBottom: "1px dashed rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(4px)",
                }}
              />

              {/* Photo Frame */}
              <div
                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden flex items-center justify-center bg-[#0a1c3d] shadow-inner mb-3.5"
              >
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.alt || item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    onError={(e) => {
                      e.target.style.display = "none";
                      if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}

                {/* Fallback Icon Box */}
                <div
                  className="w-full h-full flex flex-col items-center justify-center text-[#A9C7EA] p-4 text-center"
                  style={{ display: item.src ? "none" : "flex" }}
                >
                  <Star className="w-10 h-10 text-[#A9C7EA] fill-[#A9C7EA]/30 mb-1" />
                  <span className="text-xs font-semibold">{item.caption}</span>
                </div>

                {/* Hover / Center Overlay */}
                <div className="absolute inset-0 bg-[#102B5C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#102B5C] font-bold text-xs shadow-lg flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition-transform">
                    <Eye size={13} />
                    Lihat Foto
                  </span>
                </div>
              </div>

              {/* Card Meta & Caption */}
              <div className="px-1 text-left">
                {item.date && (
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#A9C7EA] font-medium mb-1">
                    <Calendar size={12} className="text-[#A9C7EA]/80 shrink-0" />
                    <span>{item.date}</span>
                  </div>
                )}
                <h4 className="text-white font-bold text-sm sm:text-base tracking-tight truncate group-hover:text-[#A9C7EA] transition-colors">
                  {item.caption}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Control Navigation & Auto-gliding Notice */}
      <div className="max-w-md mx-auto flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => handleManualNudge(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-[#A9C7EA] hover:text-white transition-all cursor-pointer border border-white/15 active:scale-95 shadow-md"
          title="Geser ke kiri"
          aria-label="Geser ke kiri"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-xs font-medium text-[#A9C7EA]/70 tracking-wider uppercase px-2 text-center">
          ✦ Terus Berputar ke Kanan ✦
        </span>

        <button
          onClick={() => handleManualNudge(1)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-[#A9C7EA] hover:text-white transition-all cursor-pointer border border-white/15 active:scale-95 shadow-md"
          title="Geser ke kanan"
          aria-label="Geser ke kanan"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Custom Styling for the Center Spotlight Photo */}
      <style jsx>{`
        [data-center="true"] {
          border: 2px solid rgba(169, 199, 234, 0.85) !important;
          box-shadow: 0 25px 60px rgba(16, 43, 92, 0.8),
                      0 0 35px rgba(169, 199, 234, 0.45) !important;
        }
      `}</style>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Calendar, Star, Sparkles, ChevronLeft, ChevronRight, Eye, Heart } from "lucide-react";
import { memoriesData, coupleData } from "@/lib/data-konten";

export default function MemoriesSection({ onPhotoClick }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const animationFrameRef = useRef(null);
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [isSlowed, setIsSlowed] = useState(false);

  // Group photos into authentic 3-photo vertical photostrips
  const basePhotos = memoriesData.photos || [];
  
  const generatePhotoStrips = () => {
    if (!basePhotos.length) return [];
    
    // Curated combinations so each strip tells a cute mini-story
    const stripConfigs = [
      {
        id: "strip-1",
        title: "SWEET BEGINNINGS",
        edition: "VOL. 01",
        photos: [basePhotos[0] || basePhotos[0], basePhotos[1] || basePhotos[0], basePhotos[2] || basePhotos[0]],
      },
      {
        id: "strip-2",
        title: "ENDLESS ADVENTURES",
        edition: "VOL. 02",
        photos: [basePhotos[3] || basePhotos[1], basePhotos[4] || basePhotos[2], basePhotos[5] || basePhotos[0]],
      },
      {
        id: "strip-3",
        title: "GOLDEN MOMENTS",
        edition: "VOL. 03",
        photos: [basePhotos[1] || basePhotos[0], basePhotos[2] || basePhotos[1], basePhotos[4] || basePhotos[2]],
      },
      {
        id: "strip-4",
        title: "PURE HAPPINESS",
        edition: "VOL. 04",
        photos: [basePhotos[0] || basePhotos[0], basePhotos[3] || basePhotos[1], basePhotos[5] || basePhotos[2]],
      },
      {
        id: "strip-5",
        title: "LAUGHTER & LOVE",
        edition: "VOL. 05",
        photos: [basePhotos[2] || basePhotos[0], basePhotos[5] || basePhotos[1], basePhotos[1] || basePhotos[2]],
      },
      {
        id: "strip-6",
        title: "FOREVER & ALWAYS",
        edition: "VOL. 06",
        photos: [basePhotos[4] || basePhotos[0], basePhotos[0] || basePhotos[1], basePhotos[3] || basePhotos[2]],
      },
    ];

    // Repeat 2x (total 12 strips) to guarantee infinite continuous loop
    return [...stripConfigs, ...stripConfigs];
  };

  const photoStrips = generatePhotoStrips();
  const totalStrips = photoStrips.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || totalStrips === 0) return;

    let lastTime = performance.now();
    // Gliding speed: moves steadily to the right (offset increments)
    const normalSpeed = 1.05;
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
      const stripWidth = isMobile ? 180 : 210;
      const slotWidth = isMobile ? 220 : 265;
      const totalTrackWidth = totalStrips * slotWidth;

      // Auto-advance offset continuously to the right
      if (!isDraggingRef.current) {
        const currentSpeed = isSlowed ? slowSpeed : normalSpeed;
        offsetRef.current = (offsetRef.current + currentSpeed * delta) % totalTrackWidth;
      }

      const centerX = containerWidth / 2;
      const maxDist = slotWidth * 1.8;

      // Position each photostrip via hardware-accelerated transforms
      itemRefs.current.forEach((el, index) => {
        if (!el) return;

        const baseX = index * slotWidth;
        const rawX = (baseX + offsetRef.current) % totalTrackWidth;

        // Toroidal wrapping to find shortest distance to container center
        let diffX = (rawX - centerX) % totalTrackWidth;
        if (diffX < -totalTrackWidth / 2) diffX += totalTrackWidth;
        if (diffX > totalTrackWidth / 2) diffX -= totalTrackWidth;

        const dist = Math.abs(diffX);
        const itemX = centerX + diffX - stripWidth / 2;

        // Dynamic center magnification:
        // As a photostrip approaches the center, it gets larger smoothly
        const normDist = Math.min(dist / maxDist, 1);
        const factor = Math.cos(normDist * Math.PI * 0.5);

        const scale = (isMobile ? 0.82 : 0.85) + factor * (isMobile ? 0.26 : 0.30);
        const opacity = 0.55 + factor * 0.45;
        const zIndex = Math.round(10 + factor * 40);

        el.style.transform = `translate3d(${itemX}px, -50%, 0) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;

        // Center spotlight styling toggle
        if (dist < slotWidth * 0.45) {
          el.setAttribute("data-center", "true");
        } else {
          el.removeAttribute("data-center");
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, isSlowed, totalStrips]);

  // Drag and Swipe Handlers
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
    const slot = typeof window !== "undefined" && window.innerWidth < 640 ? 220 : 265;
    offsetRef.current += direction * slot;
  };

  return (
    <section id="memories" className="relative min-h-screen px-4 py-20 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-[#581124]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-[#3B0B1E]/60 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3"
            style={{
              background: "rgba(226, 125, 155, 0.15)",
              border: "1px solid rgba(226, 125, 155, 0.3)",
              color: "#F7C2CF",
            }}
          >
            <Camera size={15} />
            <span>Photobooth Memory Strips</span>
            <Sparkles size={14} className="text-[#E27D9B]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#FFF5F7" }}
          >
            {memoriesData.title || "Our Memories"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#F7C2CF]/80 max-w-lg mx-auto mt-2 text-xs sm:text-sm md:text-base font-light"
          >
            Setiap lembar strip foto membawa kenangan manis yang terus berjalan indah
          </motion.p>
        </div>
      </div>

      {/* Infinite Gliding Photo Strip Carousel (Generous height to prevent top/bottom clipping) */}
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
        className="relative w-full h-[580px] sm:h-[660px] md:h-[700px] overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Left & Right Edge Vignette Gradient Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 md:w-56 bg-gradient-to-r from-[#260814] via-[#260814]/85 to-transparent z-40 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 md:w-56 bg-gradient-to-l from-[#260814] via-[#260814]/85 to-transparent z-40 pointer-events-none" />

        {/* Carousel Track with Absolute Photo Strips */}
        <div className="absolute inset-0 w-full h-full">
          {photoStrips.map((strip, idx) => (
            <div
              key={`${strip.id}-${idx}`}
              ref={(el) => (itemRefs.current[idx] = el)}
              className="absolute top-1/2 left-0 w-[180px] sm:w-[210px] will-change-transform rounded-none p-2.5 sm:p-3 shadow-2xl transition-shadow duration-300 group photostrip-card"
              style={{
                background: "#FAF9F6", // Classic Korean photobooth ivory paper
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Top Washi Tape Sticker (Siku-siku) */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-4 sm:h-5 rounded-none -rotate-2 pointer-events-none z-20"
                style={{
                  background: "rgba(16, 43, 92, 0.25)",
                  borderTop: "1px dashed rgba(255, 255, 255, 0.8)",
                  borderBottom: "1px dashed rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(4px)",
                }}
              />

              {/* Strip Header */}
              <div className="text-center pt-0.5 pb-1.5 border-b border-[#260814]/15 mb-2">
                <div className="flex items-center justify-between px-1 text-[8px] sm:text-[9px] font-mono tracking-wider text-[#260814]/70 font-bold uppercase">
                  <span>✦ BOOTH</span>
                  <span>{strip.edition} ✦</span>
                </div>
                <h4
                  className="text-[10px] sm:text-[11px] font-bold text-[#260814] tracking-wide mt-0.5 truncate"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {strip.title}
                </h4>
              </div>

              {/* Stacked 3 Photo Frames inside the Strip (Siku-siku) */}
              <div className="space-y-1.5">
                {strip.photos.map((photo, pIdx) => (
                  <div
                    key={`${photo.id}-${pIdx}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onPhotoClick) onPhotoClick(photo);
                    }}
                    className="relative aspect-[16/11] w-full rounded-none overflow-hidden bg-[#1D040E] shadow-inner cursor-pointer group/photo border border-black/10"
                  >
                    {photo.src ? (
                      <img
                        src={photo.src}
                        alt={photo.alt || photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-108"
                        onError={(e) => {
                          e.target.style.display = "none";
                          if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}

                    {/* Fallback Icon */}
                    <div
                      className="w-full h-full flex flex-col items-center justify-center text-[#F7C2CF] p-1.5 text-center"
                      style={{ display: photo.src ? "none" : "flex" }}
                    >
                      <Star className="w-4 h-4 text-[#E27D9B] fill-[#E27D9B]/30 mb-0.5 shrink-0" />
                      <span className="text-[8px] sm:text-[9px] font-medium text-white/90 line-clamp-1 leading-tight">{photo.caption}</span>
                    </div>

                    {/* Frame Number Tag (Siku-siku) */}
                    <div className="absolute top-1 left-1 px-1 py-0.2 rounded-none bg-black/60 backdrop-blur-sm text-[7px] font-mono text-white/90 font-bold">
                      0{pIdx + 1}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#260814]/50 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="px-2 py-0.5 rounded-none bg-white text-[#260814] font-bold text-[9px] shadow flex items-center gap-1">
                        <Eye size={10} />
                        Buka
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strip Footer: Barcode & Couple Branding */}
              <div className="pt-2 mt-1.5 border-t border-[#260814]/15 text-[#260814] flex flex-col items-center justify-center">
                {/* Simulated Barcode */}
                <div className="flex items-center justify-center gap-[1.5px] h-3.5 mb-1 opacity-70">
                  {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6].map((w, bIdx) => (
                    <div
                      key={bIdx}
                      className="bg-[#260814]"
                      style={{
                        width: `${(w % 2.5) + 0.8}px`,
                        height: "100%",
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-1 text-[8px] sm:text-[9px] font-bold tracking-wider uppercase text-[#260814]/90">
                  <span>NOVRIA & MUFLIH</span>
                  <Heart size={8} className="text-[#8B1E2E] fill-[#8B1E2E]" />
                  <span>24.11.2007</span>
                </div>
                <p className="text-[7px] text-[#260814]/60 font-mono tracking-widest mt-0.5">
                  MEMORIES ARCHIVE · KEEP FOREVER
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Control Navigation & Continuous Ticker Notice */}
      <div className="max-w-md mx-auto flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => handleManualNudge(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-[#F7C2CF] hover:text-white transition-all cursor-pointer border border-white/15 active:scale-95 shadow-md"
          title="Geser ke kiri"
          aria-label="Geser ke kiri"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-xs font-medium text-[#F7C2CF]/80 tracking-wider uppercase px-2 text-center">
          ✦ Photo Strips Gliding Right ✦
        </span>

        <button
          onClick={() => handleManualNudge(1)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-[#F7C2CF] hover:text-white transition-all cursor-pointer border border-white/15 active:scale-95 shadow-md"
          title="Geser ke kanan"
          aria-label="Geser ke kanan"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Custom Center Magnification & Glow Styling */}
      <style jsx>{`
        [data-center="true"] {
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.75),
                      0 0 45px rgba(217, 43, 107, 0.55) !important;
          border: 2px solid rgba(226, 125, 155, 0.95) !important;
        }
      `}</style>
    </section>
  );
}

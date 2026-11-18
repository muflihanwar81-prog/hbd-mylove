"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { memoriesData } from "@/lib/data-konten";

// ─── Museum data ─────────────────────────────────────────────────────────────
// Each artwork is placed along the corridor.
// wall: "left" | "right"  — which wall it hangs on
// posZ: 0 → 1  — how deep along the corridor (0 = entrance, 1 = end)
// frame: portrait | landscape | square
const buildArtworks = (photos) => {
  const walls = ["left", "right", "left", "right", "left", "right"];
  const frames = ["portrait", "landscape", "portrait", "landscape", "portrait", "landscape"];
  return photos.map((photo, i) => ({
    ...photo,
    wall: walls[i % walls.length],
    posZ: (i + 0.7) / (photos.length + 0.4),
    frame: frames[i % frames.length],
    artworkNumber: String(i + 1).padStart(2, "0"),
  }));
};

// ─── Artwork Modal ─────────────────────────────────────────────────────────────
function ArtworkModal({ artwork, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!artwork) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(5, 8, 20, 0.95)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        className="relative mx-4 max-w-3xl w-full"
        style={{
          background: "linear-gradient(160deg, #f8f6f1 0%, #ede9e0 100%)",
          borderRadius: "2px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(200,190,170,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Museum spotlight top bar */}
        <div
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #c8a84b, #e8c96a, #c8a84b)",
            borderRadius: "2px 2px 0 0",
          }}
        />

        <div className="p-6 md:p-10">
          <div className="flex gap-6 md:gap-10 flex-col md:flex-row">
            {/* Artwork image */}
            <div
              className="flex-shrink-0 relative"
              style={{
                width: "100%",
                maxWidth: "340px",
                alignSelf: "flex-start",
              }}
            >
              {/* Outer frame */}
              <div
                style={{
                  padding: "14px",
                  background: "linear-gradient(145deg, #3a2c1a 0%, #5a4228 40%, #3a2c1a 100%)",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.6), 6px 6px 20px rgba(0,0,0,0.5)",
                  borderRadius: "1px",
                }}
              >
                {/* Inner mat */}
                <div
                  style={{
                    padding: "10px",
                    background: "#f0ebe0",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                    {artwork.src && (
                      <img
                        src={artwork.src}
                        alt={artwork.alt || artwork.caption}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    )}
                    {/* Spotlight glare */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Frame shadow */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-12px",
                  left: "8px",
                  right: "8px",
                  height: "20px",
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
                  filter: "blur(6px)",
                }}
              />
            </div>

            {/* Info panel */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
              {/* Artwork number */}
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "#8a7a60",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                ARTWORK {artwork.artworkNumber} · PERSONAL COLLECTION
              </p>

              {/* Title */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.3rem, 3vw, 2rem)",
                  fontWeight: 700,
                  color: "#1a1208",
                  lineHeight: 1.2,
                  marginBottom: "12px",
                }}
              >
                {artwork.caption}
              </h2>

              {/* Divider */}
              <div
                style={{
                  width: "48px",
                  height: "2px",
                  background: "linear-gradient(90deg, #c8a84b, transparent)",
                  marginBottom: "16px",
                }}
              />

              {/* Date */}
              {artwork.date && (
                <div
                  className="flex items-center gap-2 mb-4"
                  style={{ color: "#8a7a60", fontSize: "13px" }}
                >
                  <Calendar size={13} />
                  <span
                    style={{ fontFamily: "monospace", letterSpacing: "0.08em" }}
                  >
                    {artwork.date}
                  </span>
                </div>
              )}

              {/* Description / alt text as memory */}
              {artwork.alt && (
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "15px",
                    color: "#3a2c1a",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                    borderLeft: "3px solid rgba(200,168,75,0.4)",
                    paddingLeft: "14px",
                  }}
                >
                  "{artwork.alt}"
                </p>
              )}

              {/* Close */}
              <button
                onClick={onClose}
                className="mt-8 self-start flex items-center gap-2 text-sm"
                style={{
                  background: "rgba(26,18,8,0.08)",
                  border: "1px solid rgba(26,18,8,0.2)",
                  color: "#3a2c1a",
                  padding: "10px 20px",
                  borderRadius: "1px",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(26,18,8,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(26,18,8,0.08)";
                }}
              >
                <X size={13} /> Close Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Framed Artwork on Wall ───────────────────────────────────────────────────
function FramedArtwork({ artwork, cameraZ, onOpen }) {
  const [hovered, setHovered] = useState(false);

  // posZ is 0→1 along corridor.
  // We map cameraZ (0→1) to a "relative depth" so we can position in perspective.
  // The corridor is rendered as a fixed viewport; artworks move as camera moves.
  const relZ = artwork.posZ - cameraZ; // negative = behind camera, positive = ahead

  // ─ Perspective projection ─
  // We use a simple perspective: the further away, the smaller and closer to vanishing point.
  // Visible range: relZ in (-0.15, 1.2)
  const fov = 1.1; // perspective strength
  if (relZ < -0.08 || relZ > 1.3) return null; // cull

  const perspective = fov / Math.max(relZ + fov, 0.05);
  const scale = perspective * 0.55;
  const opacity = relZ < 0.05
    ? Math.max(0, relZ / 0.05)
    : relZ > 1.0
    ? Math.max(0, (1.3 - relZ) / 0.3)
    : 1;

  // Vertical position: closer artwork appears lower (perspective)
  const baseY = 50; // % from top (vertically centred in corridor)
  const yShift = (perspective - 0.5) * 10; // small vertical shift for depth

  // Horizontal position: left wall vs right wall
  // Centre of corridor = 50%. Left artworks shift towards left edge, right towards right edge.
  const wallSide = artwork.wall === "left" ? 1 : -1; // left = positive offset from center
  const xBase = artwork.wall === "left" ? 20 : 80; // % from left
  const xPerspective = 50 + (xBase - 50) * Math.min(perspective, 2.5);

  // Frame aspect
  const aspectRatios = { portrait: "3/4", landscape: "4/3", square: "1/1" };
  const aspect = aspectRatios[artwork.frame] || "4/3";

  // Depth shadow & brightness
  const brightness = 0.5 + Math.min(scale, 1) * 0.65;
  const shadowBlur = Math.round(relZ * 40 + 8);
  const shadowOpacity = Math.min(0.8, 0.2 + scale * 0.6);

  return (
    <div
      style={{
        position: "absolute",
        left: `${xPerspective}%`,
        top: `${baseY + yShift}%`,
        transform: `translate(-50%, -50%) scale(${Math.max(scale, 0.01)})`,
        opacity,
        cursor: "pointer",
        zIndex: Math.round(scale * 100),
        willChange: "transform, opacity",
        transition: hovered ? "none" : "none",
      }}
      onClick={() => onOpen(artwork)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer ornate frame */}
      <div
        style={{
          position: "relative",
          padding: hovered ? "14px" : "12px",
          background: hovered
            ? "linear-gradient(145deg, #4a3820 0%, #7a6240 40%, #4a3820 100%)"
            : "linear-gradient(145deg, #2e2010 0%, #5a4228 40%, #2e2010 100%)",
          boxShadow: hovered
            ? `0 0 0 1px rgba(220,190,100,0.6), 0 0 30px rgba(220,190,100,0.25), 0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0,0,0,${shadowOpacity})`
            : `0 0 0 1px rgba(180,150,80,0.3), 0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0,0,0,${shadowOpacity})`,
          transition: "all 0.3s ease",
          minWidth: "180px",
          maxWidth: artwork.frame === "portrait" ? "220px" : "280px",
        }}
      >
        {/* Inner frame bevel */}
        <div
          style={{
            padding: "4px",
            background: hovered
              ? "linear-gradient(145deg, #c8a84b22, #e8c96a11)"
              : "transparent",
            border: "1px solid rgba(200,168,75,0.2)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Artwork image */}
          <div
            style={{
              position: "relative",
              aspectRatio: aspect,
              width: "100%",
              overflow: "hidden",
              background: "#1a1208",
              filter: `brightness(${brightness})`,
              transition: "filter 0.3s ease",
            }}
          >
            {artwork.src && (
              <img
                src={artwork.src}
                alt={artwork.alt || artwork.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transform: hovered ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.5s ease",
                }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            )}
            {/* Museum spotlight glare */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 35% 15%, rgba(255,255,255,0.18) 0%, transparent 55%)",
                pointerEvents: "none",
                opacity: hovered ? 0.6 : 0.9,
                transition: "opacity 0.3s",
              }}
            />
            {/* Hover overlay */}
            {hovered && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(10,8,4,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: "#e8d8a0",
                    textTransform: "uppercase",
                    border: "1px solid rgba(232,216,160,0.6)",
                    padding: "6px 14px",
                    background: "rgba(10,8,4,0.6)",
                  }}
                >
                  View Artwork
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Title plate */}
        <div
          style={{
            marginTop: "8px",
            padding: "6px 10px",
            background: "rgba(10,8,4,0.6)",
            border: "1px solid rgba(200,168,75,0.2)",
            textAlign: "center",
            opacity: hovered ? 1 : 0.85,
            transition: "opacity 0.3s",
          }}
        >
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "9px",
              letterSpacing: "0.18em",
              color: "rgba(200,168,75,0.7)",
              textTransform: "uppercase",
              marginBottom: "2px",
            }}
          >
            {artwork.artworkNumber}
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "11px",
              color: "#e8d8a0",
              lineHeight: 1.3,
              maxWidth: "180px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {artwork.caption}
          </p>
        </div>
      </div>

      {/* Floor shadow */}
      <div
        style={{
          position: "absolute",
          bottom: "-18px",
          left: "10%",
          right: "10%",
          height: "16px",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)",
          filter: `blur(${Math.round(4 + relZ * 6)}px)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function MemoriesSection({ onPhotoClick }) {
  const photos = memoriesData.photos || [];
  const artworks = buildArtworks(photos);
  const totalArtworks = artworks.length;

  // cameraZ: 0 = at entrance, 1 = at end of corridor
  const [cameraZ, setCameraZ] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const targetZRef = useRef(0);
  const currentZRef = useRef(0);
  const rafRef = useRef(null);
  const sectionRef = useRef(null);

  const minZ = 0;
  const maxZ = 1;

  // Smooth interpolation loop
  const startRaf = useCallback(() => {
    if (rafRef.current) return;
    const loop = () => {
      const diff = targetZRef.current - currentZRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentZRef.current += diff * 0.08; // lerp factor
        setCameraZ(currentZRef.current);
        rafRef.current = requestAnimationFrame(loop);
      } else {
        currentZRef.current = targetZRef.current;
        setCameraZ(targetZRef.current);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const advanceCamera = useCallback((delta) => {
    // delta is a signed scroll amount normalised to our 0-1 range
    targetZRef.current = Math.max(minZ, Math.min(maxZ, targetZRef.current + delta));
    startRaf();
  }, [startRaf]);

  // ── Wheel handler ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e) => {
      // Only intercept if the mouse is over the museum section
      const rect = section.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) return;

      e.preventDefault();
      e.stopPropagation();

      const step = 0.004;
      advanceCamera(e.deltaY * step);
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, [advanceCamera]);

  // ── Touch handler ──
  const touchStartYRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      if (touchStartYRef.current === null) return;
      const dy = touchStartYRef.current - e.touches[0].clientY;
      touchStartYRef.current = e.touches[0].clientY;
      e.preventDefault();
      advanceCamera(dy * 0.0025);
    };
    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    section.addEventListener("touchstart", handleTouchStart, { passive: true });
    section.addEventListener("touchmove", handleTouchMove, { passive: false });
    section.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchmove", handleTouchMove);
      section.removeEventListener("touchend", handleTouchEnd);
    };
  }, [advanceCamera]);

  // ── Keyboard fallback ──
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        advanceCamera(0.12);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        advanceCamera(-0.12);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [advanceCamera]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const progressPct = Math.round(cameraZ * 100);

  return (
    <section
      id="memories"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        userSelect: "none",
        touchAction: "none",
        cursor: "default",
      }}
    >
      {/* ── Museum Corridor Background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #0a0c14 0%, #0d1020 40%, #111428 100%)",
        }}
      />

      {/* ── Ceiling ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "30%",
          background:
            "linear-gradient(180deg, #f2f0ea 0%, #d8d4c8 60%, #a0a098 100%)",
          transformOrigin: "top center",
        }}
      />

      {/* ── Floor ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background:
            "linear-gradient(0deg, #8a8070 0%, #b0aa9a 50%, #c8c2b0 100%)",
        }}
      />

      {/* Floor specular reflection */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "25%",
          right: "25%",
          height: "35%",
          background:
            "linear-gradient(0deg, rgba(255,255,255,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Left Wall ── */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          bottom: "35%",
          left: 0,
          width: "18%",
          background: "linear-gradient(90deg, #c0bdb0 0%, #e8e4d8 70%, #d0ccbf 100%)",
          borderRight: "1px solid rgba(180,170,150,0.4)",
        }}
      />
      {/* Left wall subtle blue accent stripe */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          bottom: "35%",
          left: 0,
          width: "3px",
          background: "linear-gradient(180deg, transparent, rgba(100,140,200,0.4), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* ── Right Wall ── */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          bottom: "35%",
          right: 0,
          width: "18%",
          background: "linear-gradient(270deg, #c0bdb0 0%, #e8e4d8 70%, #d0ccbf 100%)",
          borderLeft: "1px solid rgba(180,170,150,0.4)",
        }}
      />
      {/* Right wall subtle blue accent stripe */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          bottom: "35%",
          right: 0,
          width: "3px",
          background: "linear-gradient(180deg, transparent, rgba(100,140,200,0.4), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* ── Centre corridor ── */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          bottom: "35%",
          left: "18%",
          right: "18%",
          background: "linear-gradient(180deg, #f0ede6 0%, #e8e4dc 100%)",
        }}
      />

      {/* Corridor vanishing-point perspective lines */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ceiling-wall left */}
        <line x1="0" y1="30%" x2="50%" y2="50%" stroke="rgba(160,155,145,0.5)" strokeWidth="1" />
        {/* Ceiling-wall right */}
        <line x1="100%" y1="30%" x2="50%" y2="50%" stroke="rgba(160,155,145,0.5)" strokeWidth="1" />
        {/* Floor-wall left */}
        <line x1="0" y1="65%" x2="50%" y2="50%" stroke="rgba(120,115,105,0.4)" strokeWidth="1" />
        {/* Floor-wall right */}
        <line x1="100%" y1="65%" x2="50%" y2="50%" stroke="rgba(120,115,105,0.4)" strokeWidth="1" />
      </svg>

      {/* ── Ceiling Track Spotlights ── */}
      {[20, 35, 50, 65, 80].map((x, i) => (
        <div key={i}>
          {/* Light track */}
          <div
            style={{
              position: "absolute",
              top: "2%",
              left: `${x}%`,
              width: "1px",
              height: "5%",
              background: "rgba(220,215,200,0.6)",
              pointerEvents: "none",
            }}
          />
          {/* Spotlight cone */}
          <div
            style={{
              position: "absolute",
              top: "7%",
              left: `${x}%`,
              width: "0",
              height: "0",
              borderLeft: "30px solid transparent",
              borderRight: "30px solid transparent",
              borderTop: `${25 + i * 2}px solid rgba(255,248,220,0.07)`,
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          />
        </div>
      ))}

      {/* Warm overhead light wash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,245,200,0.12) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Artworks Layer ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {artworks.map((artwork) => (
          <FramedArtwork
            key={artwork.id}
            artwork={artwork}
            cameraZ={cameraZ}
            onOpen={setSelectedArtwork}
          />
        ))}
      </div>

      {/* ── Entrance Vignette ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,8,20,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── UI Overlay ── */}

      {/* Top banner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(180deg, rgba(5,8,20,0.85) 0%, transparent 100%)",
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "9px",
              letterSpacing: "0.25em",
              color: "rgba(200,168,75,0.7)",
              textTransform: "uppercase",
              marginBottom: "2px",
            }}
          >
            Photography Exhibition
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              color: "#f0ebe0",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            {memoriesData.title || "Our Memories"}
          </h2>
        </div>

        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "rgba(200,168,75,0.6)",
              textTransform: "uppercase",
              marginBottom: "2px",
            }}
          >
            {totalArtworks} Works
          </p>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              color: "rgba(240,235,224,0.5)",
            }}
          >
            Personal Collection
          </p>
        </div>
      </div>

      {/* Progress bar + scroll hint (bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 24px 20px",
          background: "linear-gradient(0deg, rgba(5,8,20,0.85) 0%, transparent 100%)",
          zIndex: 50,
        }}
      >
        {/* Exhibition progress */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: "rgba(200,168,75,0.6)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Entrance
          </span>
          <div
            style={{
              flex: 1,
              height: "2px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "1px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #c8a84b, #e8c96a)",
                borderRadius: "1px",
                transition: "width 0.1s linear",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: "rgba(200,168,75,0.6)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            End
          </span>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <button
            onClick={() => advanceCamera(-0.15)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(240,235,224,0.7)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,168,75,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            aria-label="Move backward"
          >
            <ChevronUp size={16} />
          </button>

          <span
            style={{
              fontFamily: "monospace",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "rgba(200,168,75,0.55)",
              textTransform: "uppercase",
            }}
          >
            Scroll or use ↑↓ to explore
          </span>

          <button
            onClick={() => advanceCamera(0.15)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(240,235,224,0.7)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,168,75,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            aria-label="Move forward"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Blue accent pilasters on walls */}
      {["18%", "82%"].map((left, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "30%",
            bottom: "35%",
            left,
            width: "2px",
            background: "linear-gradient(180deg, transparent 0%, rgba(100,140,220,0.5) 50%, transparent 100%)",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Artwork Modal ── */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </section>
  );
}

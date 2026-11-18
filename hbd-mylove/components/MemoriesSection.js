"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Calendar } from "lucide-react";
import { memoriesData } from "@/lib/data-konten";

const RADIUS = 1050;    // cylinder radius — controls how "wrapped" the wall feels
const ANGLE_STEP = 17;  // degrees between artworks

// ─── Artwork detail modal ────────────────────────────────────────────────────
function ArtworkModal({ artwork, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(5,5,8,0.94)",
        backdropFilter: "blur(18px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          maxWidth: 660, width: "100%",
          position: "relative",
          boxShadow: "0 50px 120px rgba(0,0,0,0.9)",
        }}
      >
        {/* Gold top bar */}
        <div style={{ height: 3, background: "linear-gradient(90deg, #c8a84b, #f0d878, #c8a84b)" }} />

        <div style={{ padding: "clamp(20px, 5vw, 44px)" }}>
          {/* Image */}
          <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#e8e4dc", marginBottom: 24 }}>
            {artwork.src && (
              <img
                src={artwork.src}
                alt={artwork.alt || artwork.caption}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            )}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 30% 12%, rgba(255,255,255,0.14) 0%, transparent 55%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Info */}
          <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", color: "#aaa", textTransform: "uppercase", marginBottom: 8 }}>
            {artwork.artworkNumber} · Personal Collection
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
            color: "#1a1a1f",
            lineHeight: 1.2,
            marginBottom: 12,
          }}>
            {artwork.caption}
          </h2>
          <div style={{ width: 42, height: 2, background: "linear-gradient(90deg, #c8a84b, transparent)", marginBottom: 16 }} />

          {artwork.date && (
            <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#888", fontSize: 12, fontFamily: "monospace", marginBottom: 14 }}>
              <Calendar size={12} /> {artwork.date}
            </div>
          )}
          {artwork.alt && (
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 14, color: "#555", fontStyle: "italic", lineHeight: 1.8,
              borderLeft: "3px solid rgba(200,168,75,0.4)", paddingLeft: 14,
            }}>
              "{artwork.alt}"
            </p>
          )}

          <button
            onClick={onClose}
            style={{
              marginTop: 24, padding: "10px 24px",
              background: "#1a1a1f", color: "#fff",
              border: "none", cursor: "pointer",
              fontFamily: "monospace", fontSize: 10,
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#333"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#1a1a1f"; }}
          >
            ← Back to Exhibition
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(0,0,0,0.07)", border: "none",
            borderRadius: "50%", width: 34, height: 34,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            color: "#666",
          }}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MemoriesSection() {
  const photos = memoriesData.photos || [];
  const artworks = photos.map((p, i) => ({
    ...p,
    artworkNumber: String(i + 1).padStart(2, "0"),
    angle: i * ANGLE_STEP,
  }));

  const [cameraAngle, setCameraAngle] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(null);
  const sectionRef = useRef(null);
  const dragXRef = useRef(null);
  const dragBaseRef = useRef(0);
  const touchXRef = useRef(null);

  const minAngle = 0;
  const maxAngle = (artworks.length - 1) * ANGLE_STEP;

  const startLerp = useCallback(() => {
    if (rafRef.current) return;
    const loop = () => {
      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) > 0.04) {
        currentRef.current += diff * 0.075;
        setCameraAngle(currentRef.current);
        const idx = Math.max(0, Math.min(artworks.length - 1, Math.round(currentRef.current / ANGLE_STEP)));
        setActiveIdx(idx);
        rafRef.current = requestAnimationFrame(loop);
      } else {
        currentRef.current = targetRef.current;
        setCameraAngle(targetRef.current);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [artworks.length]);

  const move = useCallback((delta) => {
    targetRef.current = Math.max(minAngle, Math.min(maxAngle, targetRef.current + delta));
    startLerp();
  }, [startLerp, minAngle, maxAngle]);

  // Wheel
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const fn = (e) => {
      e.preventDefault();
      move((e.deltaY + e.deltaX) * 0.022);
    };
    el.addEventListener("wheel", fn, { passive: false });
    return () => el.removeEventListener("wheel", fn);
  }, [move]);

  // Touch
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onStart = (e) => { touchXRef.current = e.touches[0].clientX; };
    const onMove = (e) => {
      if (touchXRef.current === null) return;
      const dx = touchXRef.current - e.touches[0].clientX;
      touchXRef.current = e.touches[0].clientX;
      e.preventDefault();
      move(dx * 0.065);
    };
    const onEnd = () => { touchXRef.current = null; };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [move]);

  // Keyboard
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowRight") move(ANGLE_STEP);
      if (e.key === "ArrowLeft") move(-ANGLE_STEP);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [move]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const onMouseDown = (e) => {
    dragXRef.current = e.clientX;
    dragBaseRef.current = targetRef.current;
    setIsDragging(true);
  };
  const onMouseMove = (e) => {
    if (dragXRef.current === null) return;
    const dx = dragXRef.current - e.clientX;
    targetRef.current = Math.max(minAngle, Math.min(maxAngle, dragBaseRef.current + dx * 0.09));
    startLerp();
  };
  const onMouseUp = () => {
    dragXRef.current = null;
    setIsDragging(false);
  };

  const activeArtwork = artworks[activeIdx];

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
        cursor: isDragging ? "grabbing" : "grab",
        background: "#16161b",
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >

      {/* ── Curved white museum wall ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-18%",
          right: "-18%",
          height: "67%",
          background: "linear-gradient(180deg, #f6f4ef 0%, #eceae2 65%, #cac7bc 100%)",
          borderRadius: "0 0 55% 55%",
        }}
      />

      {/* Wall edge darkening — depth cue left */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: "35%", width: "13%",
        background: "linear-gradient(90deg, rgba(16,16,20,0.72) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 8,
      }} />
      {/* Wall edge darkening — depth cue right */}
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: "35%", width: "13%",
        background: "linear-gradient(270deg, rgba(16,16,20,0.72) 0%, transparent 100%)",
        pointerEvents: "none", zIndex: 8,
      }} />

      {/* ── Dark floor ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "37%",
        background: "linear-gradient(0deg, #0c0c0f 0%, #18181e 55%, #242430 100%)",
      }} />

      {/* Floor specular gloss */}
      <div style={{
        position: "absolute", bottom: 0, left: "28%", right: "28%", height: "37%",
        background: "linear-gradient(0deg, rgba(255,255,255,0.025) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Floor–wall seam */}
      <div style={{
        position: "absolute",
        top: "58%", left: 0, right: 0, height: "90px",
        background: "linear-gradient(180deg, transparent 0%, rgba(16,16,20,0.95) 100%)",
        pointerEvents: "none",
      }} />

      {/* ── 3D Carousel ── */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          bottom: "36%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "880px",
          perspectiveOrigin: "50% 58%",
          zIndex: 5,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 0, height: 0,
            transformStyle: "preserve-3d",
            transform: `rotateY(${-cameraAngle}deg)`,
          }}
        >
          {artworks.map((artwork) => {
            const angleRad = (artwork.angle * Math.PI) / 180;
            const x = Math.sin(angleRad) * RADIUS;
            const z = -(RADIUS - Math.cos(angleRad) * RADIUS);
            const relAngle = artwork.angle - cameraAngle;
            const isHovered = hoveredId === artwork.id;

            if (Math.abs(relAngle) > 78) return null;

            return (
              <div
                key={artwork.id}
                style={{
                  position: "absolute",
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${-artwork.angle}deg)`,
                  transformOrigin: "center center",
                  cursor: "pointer",
                  willChange: "transform",
                }}
                onMouseEnter={(e) => { e.stopPropagation(); setHoveredId(artwork.id); }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => { e.stopPropagation(); setSelectedArtwork(artwork); }}
              >
                {/* Spotlight cone */}
                <div style={{
                  position: "absolute",
                  bottom: "calc(100% - 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0, height: 0,
                  borderLeft: "58px solid transparent",
                  borderRight: "58px solid transparent",
                  borderBottom: "160px solid rgba(255,248,210,0.085)",
                  pointerEvents: "none",
                  zIndex: -1,
                }} />

                {/* Artwork card */}
                <div
                  style={{
                    width: "240px",
                    background: "#fff",
                    transform: `translateY(${isHovered ? "-10px" : "0px"})`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: isHovered
                      ? "0 28px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(200,168,75,0.5)"
                      : "0 12px 44px rgba(0,0,0,0.42), 0 0 0 1px rgba(0,0,0,0.07)",
                  }}
                >
                  {/* Photo */}
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#d8d4cc" }}>
                    {artwork.src && (
                      <img
                        src={artwork.src}
                        alt={artwork.alt || artwork.caption}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover", display: "block",
                          transform: isHovered ? "scale(1.06)" : "scale(1)",
                          transition: "transform 0.5s ease",
                        }}
                        draggable={false}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    )}
                    {/* Spotlight glare */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "radial-gradient(ellipse at 35% 10%, rgba(255,255,255,0.18) 0%, transparent 55%)",
                      pointerEvents: "none",
                    }} />
                    {/* Hover tint */}
                    {isHovered && (
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "rgba(0,0,0,0.12)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{
                          fontFamily: "monospace", fontSize: 9, letterSpacing: "0.18em",
                          color: "#fff", textTransform: "uppercase",
                          border: "1px solid rgba(255,255,255,0.6)",
                          padding: "5px 14px",
                          background: "rgba(0,0,0,0.4)",
                        }}>
                          View Memory
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Caption label */}
                  <div style={{ padding: "9px 13px 11px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                    <p style={{
                      fontFamily: "monospace", fontSize: 9,
                      letterSpacing: "0.14em", color: "#c0bbb0",
                      textTransform: "uppercase", marginBottom: 3,
                    }}>
                      {artwork.artworkNumber}
                    </p>
                    <p style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 12, color: "#1a1a1f", lineHeight: 1.3,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {artwork.caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom centre overlay ── */}
      <div style={{
        position: "absolute",
        bottom: "15%",
        left: 0, right: 0,
        textAlign: "center",
        pointerEvents: "none",
        zIndex: 20,
      }}>
        <p style={{
          fontFamily: "monospace", fontSize: 10,
          letterSpacing: "0.26em", color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase", marginBottom: 7,
        }}>
          YOU ARE WALKING PAST
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(1.3rem, 2.4vw, 2rem)",
          color: "#fff", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.07em",
          marginBottom: 11,
          textShadow: "0 2px 24px rgba(0,0,0,0.6)",
        }}>
          {activeArtwork?.caption || memoriesData.title}
        </h2>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "monospace", fontSize: 10,
            letterSpacing: "0.18em", color: "rgba(255,255,255,0.38)",
            textTransform: "uppercase",
            cursor: "pointer", pointerEvents: "auto",
            borderBottom: "1px solid rgba(255,255,255,0.14)",
            paddingBottom: 2,
            transition: "color 0.2s",
          }}
          onClick={() => activeArtwork && setSelectedArtwork(activeArtwork)}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.38)"; }}
        >
          ENTER THE COLLECTION →
        </div>
      </div>

      {/* ── Bottom right hint ── */}
      <div style={{
        position: "absolute", bottom: 20, right: 24,
        textAlign: "right", pointerEvents: "none", zIndex: 20,
      }}>
        <p style={{
          fontFamily: "monospace", fontSize: 9,
          letterSpacing: "0.12em", color: "rgba(255,255,255,0.22)",
          textTransform: "uppercase", lineHeight: 2,
        }}>
          SCROLL OR DRAG TO WALK ROUND<br />
          CLICK A PAINTING TO LOOK CLOSER
        </p>
      </div>

      {/* ── Top left label ── */}
      <div style={{ position: "absolute", top: 20, left: 24, zIndex: 20, pointerEvents: "none" }}>
        <p style={{
          fontFamily: "monospace", fontSize: 9,
          letterSpacing: "0.22em", color: "rgba(255,255,255,0.28)",
          textTransform: "uppercase", marginBottom: 2,
        }}>
          Photography Exhibition
        </p>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "1rem", color: "#fff", fontWeight: 700,
        }}>
          {memoriesData.title || "Our Memories"}
        </h3>
      </div>

      {/* ── Top right counter ── */}
      <div style={{ position: "absolute", top: 20, right: 24, zIndex: 20, pointerEvents: "none", textAlign: "right" }}>
        <p style={{
          fontFamily: "monospace", fontSize: 10,
          color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em",
        }}>
          {String(activeIdx + 1).padStart(2, "0")} / {String(artworks.length).padStart(2, "0")}
        </p>
      </div>

      {/* ── Prev / Next arrow buttons ── */}
      {activeIdx > 0 && (
        <button
          onClick={() => move(-ANGLE_STEP)}
          style={{
            position: "absolute", left: 18, top: "44%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50%", width: 42, height: 42,
            cursor: "pointer", color: "#fff", fontSize: 24,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 20, transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,168,75,0.22)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          aria-label="Previous artwork"
        >‹</button>
      )}
      {activeIdx < artworks.length - 1 && (
        <button
          onClick={() => move(ANGLE_STEP)}
          style={{
            position: "absolute", right: 18, top: "44%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50%", width: 42, height: 42,
            cursor: "pointer", color: "#fff", fontSize: 24,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 20, transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,168,75,0.22)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          aria-label="Next artwork"
        >›</button>
      )}

      {/* ── Artwork Modal ── */}
      {selectedArtwork && (
        <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
      )}
    </section>
  );
}

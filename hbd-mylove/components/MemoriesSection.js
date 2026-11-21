"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { X, Calendar } from "lucide-react";
import { memoriesData } from "@/lib/data-konten";

// ─── Reference Palette & Architectural Constants ──────────────────────────────
const COLOR_WALL = "#FAF8F2";       // Bright radiant warm ivory / off-white
const COLOR_FLOOR = "#29292C";      // Dark charcoal floor
const COLOR_VOID = "#111521";       // Deep midnight navy void/ceiling

const R_OUTER_WALL = 19.5;          // Outer curved wall radius (Right side)
const R_INNER_WALL = 14.3;          // Inner curved wall radius (Left side - dimajukan agar foto jelas terlihat)
const R_CAM = 16.0;                 // Camera circular walking path radius
const WALL_HEIGHT = 4.8;            // Wall height from floor to top edge
const EYE_HEIGHT = 1.68;            // Natural human eye level
const LOOK_AHEAD_RAD = 0.28;        // Look-ahead angle along the sweeping curve

// ─── Infinite Seamless 360° Circular Artwork Distribution ─────────────────────
// Total slots around full 2*PI circle: 33 slots
// DELTA_ANGLE = 2 * PI / 33 = ~0.1904 rad (~10.9°)
// DINDING KANAN (Outer Wall): Penuh di setiap slot TANPA KOSONG sama sekali!
// DINDING KIRI (Inner Wall): Ditempatkan foto dengan jeda ("jarak beberapa foto" setiap 3 slot).
const TOTAL_SLOTS = 33;
const DELTA_ANGLE = (Math.PI * 2) / TOTAL_SLOTS;

const buildEndlessCircularArtworks = (basePhotos) => {
  if (!basePhotos || basePhotos.length === 0) return [];
  const count = basePhotos.length;

  const landscapeDims = [
    { w: 3.1, h: 2.1 },
    { w: 2.8, h: 2.0 },
    { w: 2.5, h: 2.1 },
    { w: 2.6, h: 2.0 },
    { w: 2.9, h: 2.0 },
  ];
  const portraitDims = [
    { w: 1.8, h: 2.4 },
    { w: 2.2, h: 2.2 },
    { w: 1.9, h: 2.4 },
  ];

  const artworkList = [];

  // 1. DINDING KANAN (Outer Wall): Penuh di SELURUH 33 slot tanpa ada yang kosong!
  for (let slot = 0; slot < TOTAL_SLOTS; slot++) {
    const angle = slot * DELTA_ANGLE;
    const photo = basePhotos[slot % count];
    const dim = (slot % 3 === 0)
      ? portraitDims[slot % portraitDims.length]
      : landscapeDims[slot % landscapeDims.length];

    artworkList.push({
      ...photo,
      uniqueId: `art-right-${slot}`,
      artworkNumber: String(photo.id || (slot % count) + 1).padStart(2, "0"),
      angle,
      isLeftWall: false,
      w: dim.w,
      h: dim.h,
      viewAngle: angle - 0.12,
    });
  }

  // 2. DINDING KIRI (Inner Wall): Diberi jeda ("jarak beberapa foto" setiap 3 slot)
  // Dimensi foto diperbesar agar jelas terlihat dari sudut pandang kamera
  for (let slot = 0; slot < TOTAL_SLOTS; slot += 3) {
    const angle = slot * DELTA_ANGLE;
    const photo = basePhotos[(slot + 2) % count];
    const dim = (slot % 2 === 0) ? { w: 2.7, h: 2.1 } : { w: 2.2, h: 2.5 };

    artworkList.push({
      ...photo,
      uniqueId: `art-left-${slot}`,
      artworkNumber: String(photo.id || ((slot + 2) % count) + 1).padStart(2, "0"),
      angle,
      isLeftWall: true,
      w: dim.w,
      h: dim.h,
      viewAngle: angle - 0.12,
    });
  }

  return artworkList;
};

// ─── Helper: Create High-Resolution Photo Texture ─────────────────────────────
function createPhotoTexture(src) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 850;
  const ctx = canvas.getContext("2d");

  // Warm ivory placeholder gradient
  const grad = ctx.createLinearGradient(0, 0, 1200, 850);
  grad.addColorStop(0, "#1A253D");
  grad.addColorStop(1, "#10192A");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 850);

  ctx.fillStyle = "#A9C7EA";
  ctx.font = "bold 34px 'Playfair Display', serif";
  ctx.textAlign = "center";
  ctx.fillText("Exhibition Artwork", 600, 425);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  if (typeof window !== "undefined" && src) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.clearRect(0, 0, 1200, 850);
      ctx.drawImage(img, 0, 0, 1200, 850);
      texture.needsUpdate = true;
    };
    img.src = src;
  }

  return texture;
}

// ─── Helper: Create Reference Gallery Label Card Texture ──────────────────────
function createLabelCardTexture(artwork) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  // Clean white card background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 512, 256);

  // Subtle border line
  ctx.strokeStyle = "rgba(0,0,0,0.08)";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 510, 254);

  // Artwork Number & Date
  ctx.fillStyle = "#6B7280";
  ctx.font = "bold 20px monospace";
  ctx.fillText(`${artwork.artworkNumber}  •  ${artwork.date || "ARCHIVE"}`, 32, 54);

  // Title / Caption
  ctx.fillStyle = "#111827";
  ctx.font = "bold 28px 'Playfair Display', Georgia, serif";
  const title = artwork.caption || "Untitled Memory";
  const truncated = title.length > 28 ? title.substring(0, 26) + "..." : title;
  ctx.fillText(truncated, 32, 105);

  // Subtitle / Description
  ctx.fillStyle = "#4B5563";
  ctx.font = "italic 20px 'Playfair Display', Georgia, serif";
  const desc = artwork.alt || "Personal Collection";
  const truncDesc = desc.length > 34 ? desc.substring(0, 32) + "..." : desc;
  ctx.fillText(`"${truncDesc}"`, 32, 155);

  // Bottom catalog indicator
  ctx.fillStyle = "#9CA3AF";
  ctx.font = "16px monospace";
  ctx.fillText("CURATED MEMORY • PERMANENT COLLECTION", 32, 215);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// ─── Helper: Create Soft Circular Spotlight Wall Glow Texture ─────────────────
function createSpotlightHaloTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Radiant museum warm white light pool
  const grad = ctx.createRadialGradient(256, 256, 15, 256, 256, 250);
  grad.addColorStop(0, "rgba(255, 255, 248, 0.72)");
  grad.addColorStop(0.35, "rgba(255, 252, 242, 0.48)");
  grad.addColorStop(0.70, "rgba(255, 250, 236, 0.18)");
  grad.addColorStop(1, "rgba(255, 250, 236, 0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ─── Artwork Inspection Modal (Full Resolution View) ──────────────────────────
function ArtworkModal({ artwork, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!artwork) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
      style={{
        background: "rgba(10, 14, 24, 0.96)",
        backdropFilter: "blur(18px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.85)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-black/5 hover:bg-black/10 text-neutral-800 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Artwork Canvas */}
        <div className="w-full md:w-3/5 bg-[#16181E] p-6 md:p-10 flex items-center justify-center relative">
          <div
            className="p-3 bg-[#111216] shadow-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="relative aspect-[4/3] w-full min-w-[260px] max-w-[480px] overflow-hidden bg-black/20">
              {artwork.src && (
                <img
                  src={artwork.src}
                  alt={artwork.alt || artwork.caption}
                  className="w-full h-full object-cover select-none"
                />
              )}
            </div>
          </div>
        </div>

        {/* Museum Plaque Details */}
        <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col justify-between bg-[#FCFBF8] text-[#111827]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-900 bg-neutral-200">
                {artwork.artworkNumber}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {artwork.isLeftWall ? "Inner Gallery" : "Main Exhibition Wall"}
              </span>
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold tracking-tight text-[#0F172A] mb-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {artwork.caption}
            </h3>

            {artwork.date && (
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-4">
                <Calendar size={13} />
                <span>{artwork.date}</span>
              </div>
            )}

            <div className="w-12 h-0.5 bg-neutral-300 mb-5" />

            {artwork.alt && (
              <p className="text-sm md:text-base text-neutral-700 font-serif italic leading-relaxed pl-3 border-l-2 border-neutral-400">
                "{artwork.alt}"
              </p>
            )}
          </div>

          <div className="pt-8 border-t border-neutral-200 flex items-center justify-between mt-6">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              Circular Museum Archive
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-white bg-[#1A1A1F] hover:bg-[#33333A] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main 3D Museum Component ─────────────────────────────────────────────────
export default function MemoriesSection({ onPhotoClick }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const artworks = useRef(buildEndlessCircularArtworks(memoriesData.photos || [])).current;

  // Camera walkthrough state (Endless float angle)
  const targetAngleRef = useRef(0.20);
  const currentAngleRef = useRef(0.20);
  const [activeArtwork, setActiveArtwork] = useState(artworks[0] || null);
  const [hoveredArtwork, setHoveredArtwork] = useState(null);
  const [inspectModalArtwork, setInspectModalArtwork] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isAutoPlayingRef = useRef(true);

  // Smooth lerp & interaction tracking
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const modalOpenRef = useRef(false);
  const lastPointerPosRef = useRef({ x: 0, y: 0 });
  const touchStartYRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseCoordsRef = useRef(new THREE.Vector2(-999, -999));
  const artworkMeshesRef = useRef([]);

  // Three.js internal objects
  const threeStateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    animId: null,
  });

  // Endless Step Navigation: Moves smoothly by 1 slot (~10.9°)
  const stepWalk = useCallback((direction) => {
    targetAngleRef.current += direction * DELTA_ANGLE;
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => {
      const next = !prev;
      isAutoPlayingRef.current = next;
      return next;
    });
  }, []);

  // ─── Three.js Scene Setup ───────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene with Reference Midnight Navy void
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLOR_VOID);
    scene.fog = new THREE.FogExp2(COLOR_VOID, 0.016);

    // 2. Camera: Wide cinematic perspective matching the reference
    // FOV 64° menangkap lukisan di dinding kiri dan sapuan dinding kanan secara seimbang
    const camera = new THREE.PerspectiveCamera(64, width / height, 0.1, 100);
    camera.position.set(0, EYE_HEIGHT, R_CAM);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.32; // Bright, luminous museum lighting

    threeStateRef.current = { scene, camera, renderer, animId: null };

    // ─── Reference Lighting Setup ─────────────────────────────────────────────
    // Bright, soft, radiant warm white museum lighting
    const ambientLight = new THREE.AmbientLight("#FFFDF5", 1.25);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight("#FFFFFF", "#2A2E3D", 0.68);
    scene.add(hemiLight);

    // ─── Materials ────────────────────────────────────────────────────────────
    // Clean bright warm ivory wall plaster
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: COLOR_WALL,
      roughness: 0.65,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });

    // Dark charcoal floor (#29292C) with subtle satin sheen
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: COLOR_FLOOR,
      roughness: 0.38,
      metalness: 0.20,
      side: THREE.DoubleSide,
    });

    // ─── Seamless 360° Circular Architecture ──────────────────────────────────
    // 1. OUTER CURVED WALL (Right Wall at R_OUTER_WALL = 19.5m)
    const outerWallGeo = new THREE.CylinderGeometry(
      R_OUTER_WALL,
      R_OUTER_WALL,
      WALL_HEIGHT,
      128,
      1,
      true
    );
    const outerWallMesh = new THREE.Mesh(outerWallGeo, wallMaterial);
    outerWallMesh.position.y = WALL_HEIGHT / 2;
    outerWallMesh.receiveShadow = true;
    scene.add(outerWallMesh);

    // 2. INNER CURVED WALL (Left Wall at R_INNER_WALL = 13.5m)
    const innerWallGeo = new THREE.CylinderGeometry(
      R_INNER_WALL,
      R_INNER_WALL,
      WALL_HEIGHT,
      128,
      1,
      true
    );
    const innerWallMesh = new THREE.Mesh(innerWallGeo, wallMaterial);
    innerWallMesh.position.y = WALL_HEIGHT / 2;
    innerWallMesh.receiveShadow = true;
    scene.add(innerWallMesh);

    // 3. CURVED CHARCOAL FLOOR (#29292C)
    const floorGeo = new THREE.RingGeometry(R_INNER_WALL - 0.2, R_OUTER_WALL + 0.2, 128);
    const floorMesh = new THREE.Mesh(floorGeo, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0.001;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Shared spotlight halo texture for wall light pools
    const haloTexture = createSpotlightHaloTexture();

    // ─── Mount Artworks on Right and Left Curved Walls ────────────────────────
    const meshInteractiveList = [];

    artworks.forEach((artwork) => {
      const { angle, w, h, isLeftWall } = artwork;

      // Position flush against the respective wall
      const wallRadius = isLeftWall ? R_INNER_WALL + 0.04 : R_OUTER_WALL - 0.04;
      const x = Math.sin(angle) * wallRadius;
      const z = Math.cos(angle) * wallRadius;
      const y = 2.22; // Natural eye level

      const artworkGroup = new THREE.Group();
      artworkGroup.position.set(x, y, z);

      // Tangent rotation:
      // Outer wall looks inward toward camera: angle + PI
      // Inner wall looks outward toward camera: angle
      artworkGroup.rotation.y = isLeftWall ? angle : angle + Math.PI;

      // 1. Soft Circular Spotlight Pool on Wall (Reference Light Wash)
      const haloGeo = new THREE.PlaneGeometry(w * 1.65, h * 1.75);
      const haloMat = new THREE.MeshBasicMaterial({
        map: haloTexture,
        transparent: true,
        opacity: 0.98,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.set(0, h * 0.22, -0.015);
      artworkGroup.add(haloMesh);

      // 2. Clean Rectangular Frame (Thin subtle dark border #18181A)
      const borderThickness = 0.035;
      const frameDepth = 0.045;
      const frameGeo = new THREE.BoxGeometry(w + borderThickness * 2, h + borderThickness * 2, frameDepth);
      const frameMat = new THREE.MeshStandardMaterial({
        color: "#18181A",
        roughness: 0.45,
        metalness: 0.15,
      });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      frameMesh.castShadow = true;
      frameMesh.receiveShadow = true;
      artworkGroup.add(frameMesh);

      // 3. Crisp Photograph Canvas Plane
      const photoTexture = createPhotoTexture(artwork.src);
      const photoGeo = new THREE.PlaneGeometry(w, h);
      const photoMat = new THREE.MeshStandardMaterial({
        map: photoTexture,
        roughness: 0.35,
        metalness: 0.02,
      });
      const photoMesh = new THREE.Mesh(photoGeo, photoMat);
      photoMesh.position.z = frameDepth / 2 + 0.004;
      artworkGroup.add(photoMesh);

      // 4. Reference White Gallery Label Card (Underneath Bottom-Left)
      const cardW = 0.62;
      const cardH = 0.31;
      const labelCardGeo = new THREE.PlaneGeometry(cardW, cardH);
      const labelCardTex = createLabelCardTexture(artwork);
      const labelCardMat = new THREE.MeshBasicMaterial({
        map: labelCardTex,
        transparent: false,
      });
      const labelCardMesh = new THREE.Mesh(labelCardGeo, labelCardMat);
      labelCardMesh.position.set(-w / 2 + cardW / 2, -h / 2 - cardH / 2 - 0.12, 0.002);
      artworkGroup.add(labelCardMesh);

      // 5. Hit-Box for Raycasting
      const hitBoxGeo = new THREE.BoxGeometry(w + 0.2, h + 0.5, 0.3);
      const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitBox = new THREE.Mesh(hitBoxGeo, hitBoxMat);
      hitBox.userData = { artwork };
      artworkGroup.add(hitBox);

      scene.add(artworkGroup);
      meshInteractiveList.push(hitBox);
    });

    artworkMeshesRef.current = meshInteractiveList;

    // ─── Render Animation Loop (Seamless Endless Navigation) ──────────────────
    let lastTime = null;

    const animate = (currentTime) => {
      const now = (typeof currentTime === "number" && currentTime > 0) ? currentTime : performance.now();
      if (lastTime === null) lastTime = now;
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0.001), 0.1);
      lastTime = now;

      // MUTER SENDIRI (Continuous Smooth Auto-Rotation / Auto-Walk):
      // Galeri selalu meluncur maju dan berputar sendiri secara anggun dan konstan!
      // Hanya dijeda jika pengunjung sedang aktif menahan drag/sentuh atau membuka modal inspeksi
      if (isAutoPlayingRef.current && !isDraggingRef.current && !modalOpenRef.current) {
        targetAngleRef.current += 0.095 * dt;
      }

      // Smooth continuous camera interpolation (no clamping, infinite walk)
      const diff = targetAngleRef.current - currentAngleRef.current;
      currentAngleRef.current += diff * 0.075;

      const theta = currentAngleRef.current;

      // Camera position along circular corridor (R_CAM = 16.0m)
      const camX = Math.sin(theta) * R_CAM;
      const camZ = Math.cos(theta) * R_CAM;
      camera.position.set(camX, EYE_HEIGHT, camZ);

      // Look-at point: forward along curve (framed to display both left and right walls clearly)
      const lookTheta = theta + LOOK_AHEAD_RAD;
      const lookR = 17.0;
      const lookX = Math.sin(lookTheta) * lookR;
      const lookZ = Math.cos(lookTheta) * lookR;
      camera.lookAt(lookX, EYE_HEIGHT, lookZ);

      // Raycaster check for hovering
      raycasterRef.current.setFromCamera(mouseCoordsRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(artworkMeshesRef.current);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        isHoveredRef.current = true;
        setHoveredArtwork(hit.userData.artwork);
        if (canvas) canvas.style.cursor = "pointer";
      } else {
        isHoveredRef.current = false;
        setHoveredArtwork(null);
        if (canvas) canvas.style.cursor = isDraggingRef.current ? "grabbing" : "grab";
      }

      // Identify nearest artwork using toroidal circular angular distance (modulo 2*PI)
      let closestArt = artworks[0];
      let minAngleDist = 999;
      const twoPi = Math.PI * 2;

      artworks.forEach((art) => {
        // Toroidal shortest angle distance around circle
        let diffA = Math.abs((((art.angle - (theta + 0.08)) % twoPi) + twoPi * 1.5) % twoPi - Math.PI);
        if (diffA < minAngleDist) {
          minAngleDist = diffA;
          closestArt = art;
        }
      });
      setActiveArtwork(closestArt);

      renderer.render(scene, camera);
      threeStateRef.current.animId = requestAnimationFrame(animate);
    };

    threeStateRef.current.animId = requestAnimationFrame(animate);

    // ─── Resize Handler ───────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (threeStateRef.current.animId) {
        cancelAnimationFrame(threeStateRef.current.animId);
      }
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [artworks]);

  // ─── Infinite Scroll & Drag Handlers (No Wall, No Clamping) ────────────────
  const handleWheel = useCallback((e) => {
    // Endless continuous scrolling
    const scrollDelta = e.deltaY * 0.0011;
    targetAngleRef.current += scrollDelta;
  }, []);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    mouseCoordsRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseCoordsRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPointerPosRef.current.x;
    const dy = e.clientY - lastPointerPosRef.current.y;
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };

    const dragDelta = (-dx * 0.0025) + (dy * 0.0025);
    targetAngleRef.current += dragDelta;
  };

  const handleMouseUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Click selection
    const container = containerRef.current;
    const camera = threeStateRef.current.camera;
    if (container && camera) {
      const rect = container.getBoundingClientRect();
      const clickCoords = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycasterRef.current.setFromCamera(clickCoords, camera);
      const intersects = raycasterRef.current.intersectObjects(artworkMeshesRef.current);
      if (intersects.length > 0) {
        const art = intersects[0].object.userData.artwork;
        if (art) {
          modalOpenRef.current = true;
          setInspectModalArtwork(art);
          if (onPhotoClick) onPhotoClick(art);
        }
      }
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      touchStartYRef.current = e.touches[0].clientY;
      lastPointerPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (touchStartYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const dy = touchStartYRef.current - currentY;
    const dx = lastPointerPosRef.current.x - currentX;

    touchStartYRef.current = currentY;
    lastPointerPosRef.current = { x: currentX, y: currentY };

    const touchDelta = (dy * 0.0028) + (dx * 0.0028);
    targetAngleRef.current += touchDelta;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    touchStartYRef.current = null;
  };

  return (
    <section
      id="memories"
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: COLOR_VOID, touchAction: "none" }}
    >
      {/* ── 3D WebGL Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0"
      />

      {/* ── Bottom-Center Display (Exact Reference Typography) ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <p className="text-[10px] md:text-[11px] font-mono tracking-[0.28em] text-neutral-400 uppercase mb-1">
          YOU ARE WALKING PAST
        </p>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wider uppercase mb-2"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          }}
        >
          {activeArtwork?.caption || memoriesData.title || "UNLISTED PAINTINGS"}
        </h2>
        <button
          onClick={() => {
            if (activeArtwork) {
              modalOpenRef.current = true;
              setInspectModalArtwork(activeArtwork);
              if (onPhotoClick) onPhotoClick(activeArtwork);
            }
          }}
          className="pointer-events-auto inline-flex items-center gap-2 text-[10px] md:text-[11px] font-mono tracking-[0.22em] text-neutral-300 hover:text-white uppercase transition-colors border-b border-white/20 pb-0.5"
        >
          <span>ENTER THE COLLECTION</span>
          <span>→</span>
        </button>
      </div>

      {/* ── Bottom-Right Navigation & Instructions (Exact Reference Layout) ── */}
      <div className="absolute bottom-8 right-8 z-20 pointer-events-auto flex flex-col items-end gap-3">
        {/* Stepper Buttons: Left Arrow, Auto-Walk Play/Pause, and Right Arrow */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => stepWalk(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:bg-white/20 active:scale-95"
            style={{
              background: "rgba(35, 38, 48, 0.82)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
            }}
            title="Step backward"
            aria-label="Previous artwork"
          >
            ←
          </button>
          <button
            onClick={toggleAutoPlay}
            className="h-10 px-3.5 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer hover:bg-white/20 active:scale-95"
            style={{
              background: isAutoPlaying ? "rgba(225, 29, 72, 0.22)" : "rgba(35, 38, 48, 0.82)",
              border: isAutoPlaying ? "1px solid rgba(244, 63, 94, 0.55)" : "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
            }}
            title={isAutoPlaying ? "Pause auto-walk" : "Resume auto-walk"}
            aria-label={isAutoPlaying ? "Pause auto-walk" : "Resume auto-walk"}
          >
            <span className="text-xs">{isAutoPlaying ? "⏸" : "▶"}</span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-200">
              {isAutoPlaying ? "Auto Walk" : "Paused"}
            </span>
          </button>
          <button
            onClick={() => stepWalk(1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:bg-white/20 active:scale-95"
            style={{
              background: "rgba(35, 38, 48, 0.82)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
            }}
            title="Step forward"
            aria-label="Next artwork"
          >
            →
          </button>
        </div>

        {/* Small Uppercase Guide Text (Exact wording & style from screenshot) */}
        <div className="text-right pointer-events-none">
          <p className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase leading-relaxed">
            SCROLL OR DRAG TO WALK ROUND
          </p>
          <p className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase leading-relaxed">
            CLICK A PAINTING TO LOOK CLOSER
          </p>
        </div>
      </div>

      {/* ── Hover Tooltip Pill ── */}
      {hoveredArtwork && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
        >
          <span
            className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-white shadow-xl"
            style={{
              background: "rgba(17, 21, 33, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
            }}
          >
            CLICK TO LOOK CLOSER
          </span>
        </div>
      )}

      {/* ── Fullscreen Inspection Modal ── */}
      {inspectModalArtwork && (
        <ArtworkModal
          artwork={inspectModalArtwork}
          onClose={() => {
            modalOpenRef.current = false;
            setInspectModalArtwork(null);
          }}
        />
      )}
    </section>
  );
}

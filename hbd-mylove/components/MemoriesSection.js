"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { X, Calendar, Compass, ArrowRight, ArrowLeft, Maximize2 } from "lucide-react";
import { memoriesData } from "@/lib/data-konten";

// ─── Museum Architectural Parameters ──────────────────────────────────────────
// Narrowed, intimate corridor so walls and large photographs are close to visitor
const R_PATH = 17.0;        // Circular visitor walkway centerline radius
const CORRIDOR_WIDTH = 4.6; // Intimate 4.6m corridor width (visitor is only 2.3m from each wall!)
const R_INNER = R_PATH - CORRIDOR_WIDTH / 2; // 14.7m Inner curved wall radius
const R_OUTER = R_PATH + CORRIDOR_WIDTH / 2; // 19.3m Outer curved wall radius
const WALL_HEIGHT = 5.2;    // Gallery ceiling height
const EYE_HEIGHT = 1.72;    // Natural human eye level in meters
const LOOK_AHEAD_RAD = 0.26;// Forward gaze angle along circular trajectory

// ─── Photograph Placement & Scaling ──────────────────────────────────────────
// Photographs are scaled up ~2.2x (width 4.8m, height 3.3m)
// Placed closely along both walls at comfortable human eye level
const buildCircularArtworks = (photos) => {
  const count = photos.length;
  // Natural angular spacing: for 11 photos, 0.52 rad (~30°) distributes them evenly around ~300° of the circle
  const deltaAngle = count > 8 ? 0.52 : 0.65;
  const startAngle = 0.40;

  return photos.map((photo, i) => {
    const angle = startAngle + i * deltaAngle;
    const isOuter = i % 2 === 0;
    // Positioned physically flush on the curved walls
    const wallRadius = isOuter ? R_OUTER - 0.08 : R_INNER + 0.08;

    return {
      ...photo,
      index: i,
      artworkNumber: String(i + 1).padStart(2, "0"),
      angle,
      isOuter,
      wallRadius,
      // Target viewing angle when visitor stands directly alongside the piece
      viewAngle: angle - 0.16,
    };
  });
};

// ─── Helper: Create Crisp Texture from Image/SVG ──────────────────────────────
function createTextureFromSrc(src) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 850;
  const ctx = canvas.getContext("2d");

  // Initial architectural placeholder gradient
  const grad = ctx.createLinearGradient(0, 0, 1200, 850);
  grad.addColorStop(0, "#102B5C");
  grad.addColorStop(1, "#173B73");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 850);

  ctx.fillStyle = "#A9C7EA";
  ctx.font = "bold 36px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Exhibition Archive", 600, 425);

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
      // Subtle archival vignette
      const vig = ctx.createRadialGradient(600, 425, 360, 600, 425, 720);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.16)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, 1200, 850);

      texture.needsUpdate = true;
    };
    img.src = src;
  }

  return texture;
}

// ─── Minimalist Artwork Inspection Modal ──────────────────────────────────────
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
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8 animate-fadeIn"
      style={{
        background: "rgba(5, 8, 18, 0.94)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full rounded-none overflow-hidden shadow-2xl flex flex-col md:flex-row"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(16, 43, 92, 0.2)",
          boxShadow: "0 35px 80px rgba(0, 0, 0, 0.8), 0 0 100px rgba(16, 43, 92, 0.25)",
        }}
      >
        {/* Top museum cobalt accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-1 z-30"
          style={{ background: "linear-gradient(90deg, #102B5C, #3B82F6, #102B5C)" }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 rounded-full transition-all bg-black/5 hover:bg-black/10 text-neutral-800"
          aria-label="Close artwork"
        >
          <X size={20} />
        </button>

        {/* Artwork Display */}
        <div className="w-full md:w-3/5 bg-[#0D1117] p-6 md:p-10 flex items-center justify-center relative overflow-hidden group">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 40%, rgba(255,235,195,0.12) 0%, transparent 70%)",
            }}
          />

          <div
            className="relative p-3 md:p-4 max-w-full"
            style={{
              background: "#18181B",
              boxShadow: "0 20px 40px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.15)",
            }}
          >
            <div className="p-2 md:p-3 bg-[#F4F1EA] shadow-inner">
              <div className="relative aspect-[4/3] w-full min-w-[240px] max-w-[460px] overflow-hidden bg-black/10">
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
        </div>

        {/* Museum Plaque / Wall Label */}
        <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col justify-between bg-white text-[#111827]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-2.5 py-0.5 text-[10px] font-mono tracking-widest uppercase font-bold text-[#102B5C] bg-[#102B5C]/10 rounded-sm"
              >
                ARTWORK {artwork.artworkNumber}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {artwork.isOuter ? "Outer Wall" : "Inner Wall"}
              </span>
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold tracking-tight text-[#0F172A] mb-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {artwork.caption}
            </h3>

            {artwork.date && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#3B82F6] mb-4">
                <Calendar size={13} />
                <span>{artwork.date}</span>
              </div>
            )}

            <div className="w-12 h-0.5 bg-[#102B5C]/20 mb-5" />

            {artwork.alt && (
              <p
                className="text-sm md:text-base text-neutral-600 font-serif italic leading-relaxed pl-3 border-l-2 border-[#102B5C]/40"
              >
                "{artwork.alt}"
              </p>
            )}
          </div>

          <div className="pt-8 border-t border-neutral-100 flex items-center justify-between mt-6">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              Circular Museum • 2026
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono tracking-wider uppercase text-white bg-[#102B5C] hover:bg-[#173B73] transition-colors rounded-sm"
            >
              Continue Walk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main 3D Circular Museum Component ────────────────────────────────────────
export default function MemoriesSection({ onPhotoClick }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const artworks = useRef(buildCircularArtworks(memoriesData.photos || [])).current;

  // Camera walkthrough state
  const targetAngleRef = useRef(0.20);    // Start position slightly before first artwork
  const currentAngleRef = useRef(0.20);   // Current interpolated camera theta
  const [activeArtwork, setActiveArtwork] = useState(null);
  const [hoveredArtwork, setHoveredArtwork] = useState(null);
  const [inspectModalArtwork, setInspectModalArtwork] = useState(null);
  const [visitorProgress, setVisitorProgress] = useState(0);

  // Smooth lerp & interaction tracking
  const isDraggingRef = useRef(false);
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

  // Navigate directly to an artwork
  const navigateToArtwork = useCallback((idx) => {
    const art = artworks[idx];
    if (art) {
      targetAngleRef.current = art.viewAngle;
    }
  }, [artworks]);

  // Next / Prev step navigation
  const stepWalk = useCallback((direction) => {
    targetAngleRef.current += direction * 0.34;
  }, []);

  // ─── Three.js Scene Setup ───────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0A0D16");
    scene.fog = new THREE.FogExp2("#0A0D16", 0.020);

    // 2. Camera: Centered on the walking path at human eye level
    const camera = new THREE.PerspectiveCamera(62, width / height, 0.1, 100);
    camera.position.set(0, EYE_HEIGHT, R_PATH);

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
    renderer.toneMappingExposure = 1.15;

    threeStateRef.current = { scene, camera, renderer, animId: null };

    // ─── Balanced Gallery Ambient Lighting ────────────────────────────────────
    // Keeps both exhibition walls and large photographs clearly illuminated and visible
    const ambientLight = new THREE.AmbientLight("#FAF7F0", 0.68);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight("#FFF8EE", "#161B26", 0.42);
    scene.add(hemiLight);

    // Central atrium ambient glow (radiating from inner circular rotunda)
    const centralBlueGlow = new THREE.PointLight("#3B82F6", 1.4, 28, 1.2);
    centralBlueGlow.position.set(0, 3.2, 0);
    scene.add(centralBlueGlow);

    // ─── Materials ────────────────────────────────────────────────────────────
    // Elegant curved off-white museum wall plaster
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: "#F7F6F2",
      roughness: 0.82,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    // Dark polished terrazzo/marble floor
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: "#0F121A",
      roughness: 0.24,
      metalness: 0.45,
      side: THREE.DoubleSide,
    });

    // Obsidian baseboard trim
    const trimMaterial = new THREE.MeshStandardMaterial({
      color: "#0B0E17",
      roughness: 0.4,
      metalness: 0.25,
      side: THREE.DoubleSide,
    });

    // Ceiling material
    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: "#ECEAE4",
      roughness: 0.95,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });

    // ─── Architectural Geometry Construction ──────────────────────────────────
    // 1. OUTER CURVED WALL (Radius R_OUTER, height WALL_HEIGHT)
    const outerWallGeo = new THREE.CylinderGeometry(
      R_OUTER,
      R_OUTER,
      WALL_HEIGHT,
      128,
      1,
      true
    );
    const outerWallMesh = new THREE.Mesh(outerWallGeo, wallMaterial);
    outerWallMesh.position.y = WALL_HEIGHT / 2;
    outerWallMesh.receiveShadow = true;
    scene.add(outerWallMesh);

    // Outer wall baseboard trim
    const outerTrimGeo = new THREE.CylinderGeometry(
      R_OUTER - 0.03,
      R_OUTER - 0.03,
      0.22,
      128,
      1,
      true
    );
    const outerTrimMesh = new THREE.Mesh(outerTrimGeo, trimMaterial);
    outerTrimMesh.position.y = 0.11;
    scene.add(outerTrimMesh);

    // Outer wall ceiling cove trim
    const outerCoveGeo = new THREE.CylinderGeometry(
      R_OUTER - 0.03,
      R_OUTER - 0.03,
      0.14,
      128,
      1,
      true
    );
    const outerCoveMesh = new THREE.Mesh(outerCoveGeo, trimMaterial);
    outerCoveMesh.position.y = WALL_HEIGHT - 0.07;
    scene.add(outerCoveMesh);

    // 2. INNER CURVED WALL (Radius R_INNER, height WALL_HEIGHT)
    const innerWallGeo = new THREE.CylinderGeometry(
      R_INNER,
      R_INNER,
      WALL_HEIGHT,
      128,
      1,
      true
    );
    const innerWallMesh = new THREE.Mesh(innerWallGeo, wallMaterial);
    innerWallMesh.position.y = WALL_HEIGHT / 2;
    innerWallMesh.receiveShadow = true;
    scene.add(innerWallMesh);

    // Inner wall baseboard trim
    const innerTrimGeo = new THREE.CylinderGeometry(
      R_INNER + 0.03,
      R_INNER + 0.03,
      0.22,
      128,
      1,
      true
    );
    const innerTrimMesh = new THREE.Mesh(innerTrimGeo, trimMaterial);
    innerTrimMesh.position.y = 0.11;
    scene.add(innerTrimMesh);

    // Inner wall ceiling cove trim
    const innerCoveGeo = new THREE.CylinderGeometry(
      R_INNER + 0.03,
      R_INNER + 0.03,
      0.14,
      128,
      1,
      true
    );
    const innerCoveMesh = new THREE.Mesh(innerCoveGeo, trimMaterial);
    innerCoveMesh.position.y = WALL_HEIGHT - 0.07;
    scene.add(innerCoveMesh);

    // 3. CIRCULAR EXHIBITION CORRIDOR FLOOR (Between R_INNER and R_OUTER)
    const floorGeo = new THREE.RingGeometry(R_INNER - 0.15, R_OUTER + 0.15, 128);
    const floorMesh = new THREE.Mesh(floorGeo, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0.001;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Subtle blue architectural inlay guide along walking centerline
    const guideGeo = new THREE.RingGeometry(R_PATH - 0.05, R_PATH + 0.05, 128);
    const guideMat = new THREE.MeshBasicMaterial({
      color: "#3B82F6",
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const guideMesh = new THREE.Mesh(guideGeo, guideMat);
    guideMesh.rotation.x = -Math.PI / 2;
    guideMesh.position.y = 0.003;
    scene.add(guideMesh);

    // 4. CIRCULAR CORRIDOR CEILING
    const ceilingGeo = new THREE.RingGeometry(R_INNER - 0.15, R_OUTER + 0.15, 128);
    const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMaterial);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.y = WALL_HEIGHT;
    scene.add(ceilingMesh);

    // 5. SPACIOUS CENTRAL ATRIUM
    const atriumFloorGeo = new THREE.CircleGeometry(R_INNER, 64);
    const atriumFloorMat = new THREE.MeshStandardMaterial({
      color: "#080C14",
      roughness: 0.15,
      metalness: 0.85,
    });
    const atriumFloor = new THREE.Mesh(atriumFloorGeo, atriumFloorMat);
    atriumFloor.rotation.x = -Math.PI / 2;
    atriumFloor.position.y = 0;
    scene.add(atriumFloor);

    // Central sculpture installation
    const sculptureGeo = new THREE.TorusKnotGeometry(2.0, 0.42, 128, 32);
    const sculptureMat = new THREE.MeshStandardMaterial({
      color: "#E2E8F0",
      metalness: 0.85,
      roughness: 0.18,
    });
    const sculptureMesh = new THREE.Mesh(sculptureGeo, sculptureMat);
    sculptureMesh.position.set(0, 2.6, 0);
    sculptureMesh.castShadow = true;
    scene.add(sculptureMesh);

    // ─── CENTER-LINE CEILING CORRIDOR LIGHTING (3000K WARM WHITE) ─────────────
    // Distributed evenly along the circular walking centerline (radius R_PATH)
    // Illuminates the floor path and surrounding corridor walls naturally
    const lastArtAngle = artworks[artworks.length - 1]?.angle || Math.PI * 1.8;
    const lightAngleStart = 0.0;
    const lightAngleEnd = lastArtAngle + 0.45;
    const numCenterLights = Math.max(16, artworks.length * 2); // Scales with number of artworks
    const lightStep = (lightAngleEnd - lightAngleStart) / (numCenterLights - 1);

    for (let j = 0; j < numCenterLights; j++) {
      const lAngle = lightAngleStart + j * lightStep;
      const lx = Math.sin(lAngle) * R_PATH;
      const lz = Math.cos(lAngle) * R_PATH;
      const ly = WALL_HEIGHT - 0.08;

      // 1. Recessed Ceiling Architectural Downlight Canister
      const fixtureGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.10, 24);
      const fixtureMat = new THREE.MeshStandardMaterial({
        color: "#161820",
        roughness: 0.4,
        metalness: 0.5,
      });
      const fixtureMesh = new THREE.Mesh(fixtureGeo, fixtureMat);
      fixtureMesh.position.set(lx, ly, lz);
      scene.add(fixtureMesh);

      // 2. Glowing Warm 3000K Emitter Disc
      const emitterGeo = new THREE.CircleGeometry(0.14, 24);
      const emitterMat = new THREE.MeshStandardMaterial({
        color: 0xFFE6C4,
        emissive: 0xFFD89E,
        emissiveIntensity: 1.8,
        roughness: 0.1,
      });
      const emitterMesh = new THREE.Mesh(emitterGeo, emitterMat);
      emitterMesh.rotation.x = Math.PI / 2; // Facing downward
      emitterMesh.position.set(lx, ly - 0.051, lz);
      scene.add(emitterMesh);

      // 3. Wide Downward PointLight illuminating the floor and corridor walls
      const centerLight = new THREE.PointLight(0xFFE8C6, 2.2, 7.5, 1.4);
      centerLight.position.set(lx, ly - 0.15, lz);
      scene.add(centerLight);
    }

    // ─── LARGE FRAMED PHOTOGRAPHS (2–2.5x Scale, Close to Visitor) ───────────
    const meshInteractiveList = [];

    artworks.forEach((artwork) => {
      const { angle, isOuter, wallRadius } = artwork;
      const x = Math.sin(angle) * wallRadius;
      const z = Math.cos(angle) * wallRadius;
      const y = 2.25; // Centered at comfortable human eye level

      const artworkGroup = new THREE.Group();
      artworkGroup.position.set(x, y, z);

      // Tangent rotation so the large frame conforms flush to the curved wall
      // On outer wall: looks toward center (angle + PI)
      // On inner wall: looks outward from center (angle)
      const facingAngle = isOuter ? angle + Math.PI : angle;
      artworkGroup.rotation.y = facingAngle;

      // Grand Museum Frame Dimensions (approx 2.2x larger: 4.8m width x 3.3m height)
      const frameW = 4.8;
      const frameH = 3.3;
      const frameDepth = 0.10;

      // 1. Deep Espresso / Obsidian Museum Frame Box
      const frameBoxGeo = new THREE.BoxGeometry(frameW, frameH, frameDepth);
      const frameBoxMat = new THREE.MeshStandardMaterial({
        color: "#16161A",
        roughness: 0.32,
        metalness: 0.22,
      });
      const frameBox = new THREE.Mesh(frameBoxGeo, frameBoxMat);
      frameBox.castShadow = true;
      frameBox.receiveShadow = true;
      artworkGroup.add(frameBox);

      // Subtle Champagne Brass inner bevel
      const brassTrimGeo = new THREE.BoxGeometry(frameW - 0.18, frameH - 0.18, frameDepth + 0.006);
      const brassTrimMat = new THREE.MeshStandardMaterial({
        color: "#C5A869",
        roughness: 0.28,
        metalness: 0.75,
      });
      const brassTrim = new THREE.Mesh(brassTrimGeo, brassTrimMat);
      artworkGroup.add(brassTrim);

      // 2. Archival White Museum Mat Board
      const matGeo = new THREE.PlaneGeometry(frameW - 0.36, frameH - 0.36);
      const matMat = new THREE.MeshStandardMaterial({
        color: "#FAF8F4",
        roughness: 0.92,
      });
      const matMesh = new THREE.Mesh(matGeo, matMat);
      matMesh.position.z = frameDepth / 2 + 0.004;
      artworkGroup.add(matMesh);

      // 3. Large Photograph Canvas (clearly visible and recognizable while walking)
      const photoTexture = createTextureFromSrc(artwork.src);
      const photoGeo = new THREE.PlaneGeometry(frameW - 0.75, frameH - 0.75);
      const photoMat = new THREE.MeshStandardMaterial({
        map: photoTexture,
        roughness: 0.42,
        metalness: 0.02,
      });
      const photoMesh = new THREE.Mesh(photoGeo, photoMat);
      photoMesh.position.z = frameDepth / 2 + 0.007;
      artworkGroup.add(photoMesh);

      // 4. Subtle Museum Art Glass Reflection
      const glassGeo = new THREE.PlaneGeometry(frameW - 0.36, frameH - 0.36);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: "#FFFFFF",
        transparent: true,
        opacity: 0.045,
        roughness: 0.08,
        transmission: 0.95,
        ior: 1.5,
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.position.z = frameDepth / 2 + 0.010;
      artworkGroup.add(glassMesh);

      // 5. Minimalist Museum Plaque / Wall Label below painting
      const plaqueGeo = new THREE.PlaneGeometry(0.75, 0.28);
      const plaqueMat = new THREE.MeshStandardMaterial({
        color: "#E2E8F0",
        roughness: 0.38,
        metalness: 0.15,
      });
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueMesh.position.set(0, -frameH / 2 - 0.32, frameDepth / 2 + 0.002);
      artworkGroup.add(plaqueMesh);

      // 6. Trackable Hit-Box for Raycaster (sized to the large frame)
      const hitBoxGeo = new THREE.BoxGeometry(frameW + 0.4, frameH + 0.8, 0.5);
      const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitBox = new THREE.Mesh(hitBoxGeo, hitBoxMat);
      hitBox.userData = { artwork, frameBox };
      artworkGroup.add(hitBox);

      scene.add(artworkGroup);
      meshInteractiveList.push(hitBox);
    });

    artworkMeshesRef.current = meshInteractiveList;

    // ─── Render Animation Loop ────────────────────────────────────────────────
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Rotate central atrium sculpture gently
      sculptureMesh.rotation.y += dt * 0.10;
      sculptureMesh.rotation.x += dt * 0.05;

      // Camera Smooth Interpolation along circular path
      const diff = targetAngleRef.current - currentAngleRef.current;
      currentAngleRef.current += diff * 0.075;

      const theta = currentAngleRef.current;

      // Camera stays centered on the walking path (R_PATH)
      const camX = Math.sin(theta) * R_PATH;
      const camZ = Math.cos(theta) * R_PATH;
      camera.position.set(camX, EYE_HEIGHT, camZ);

      // Look along the forward curved trajectory
      const lookTheta = theta + LOOK_AHEAD_RAD;
      const lookX = Math.sin(lookTheta) * R_PATH;
      const lookZ = Math.cos(lookTheta) * R_PATH;
      camera.lookAt(lookX, EYE_HEIGHT, lookZ);

      // Raycaster check for hovering over large artwork
      raycasterRef.current.setFromCamera(mouseCoordsRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(artworkMeshesRef.current);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const art = hit.userData.artwork;
        setHoveredArtwork(art);
        if (canvas) canvas.style.cursor = "pointer";
      } else {
        setHoveredArtwork(null);
        if (canvas) canvas.style.cursor = isDraggingRef.current ? "grabbing" : "grab";
      }

      // Identify nearest artwork being walked past
      let closestArt = null;
      let minAngleDist = 999;
      artworks.forEach((art) => {
        const dist = Math.abs(art.angle - theta);
        if (dist < minAngleDist) {
          minAngleDist = dist;
          closestArt = art;
        }
      });
      if (minAngleDist < 0.40) {
        setActiveArtwork(closestArt);
      } else {
        setActiveArtwork(null);
      }

      // Calculate circular progress percentage
      const startA = artworks[0].angle;
      const endA = artworks[artworks.length - 1].angle;
      const span = endA - startA;
      const normProgress = Math.max(0, Math.min(1, (theta - (startA - 0.2)) / (span + 0.4)));
      setVisitorProgress(normProgress);

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

  // ─── Interaction Handlers (Wheel, Touch, Drag) ──────────────────────────────

  // Dynamic walk limits based on total artwork count
  const maxWalkAngle = (artworks[artworks.length - 1]?.angle || 4.0) + 0.35;

  // Mouse wheel forward/backward along curve
  const handleWheel = useCallback((e) => {
    const scrollDelta = e.deltaY * 0.0014;
    targetAngleRef.current = Math.max(0.1, Math.min(maxWalkAngle, targetAngleRef.current + scrollDelta));
  }, [maxWalkAngle]);

  // Mouse drag forward/backward
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

    const dragDelta = (-dx * 0.003) + (dy * 0.003);
    targetAngleRef.current = Math.max(0.1, Math.min(maxWalkAngle, targetAngleRef.current + dragDelta));
  };

  const handleMouseUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Check if this was a quick click on an artwork
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
          setInspectModalArtwork(art);
          if (onPhotoClick) onPhotoClick(art);
        }
      }
    }
  };

  // Mobile Touch scrolling along circular path
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
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

    const touchDelta = (dy * 0.0032) + (dx * 0.0032);
    targetAngleRef.current = Math.max(0.1, Math.min(maxWalkAngle, targetAngleRef.current + touchDelta));
  };

  const handleTouchEnd = (e) => {
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
      className="relative w-full h-screen overflow-hidden select-none bg-[#080A12] text-[#FFF5F7]"
      style={{ touchAction: "none" }}
    >
      {/* ── 3D WebGL Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0"
      />

      {/* ── Museum Horizon Lighting & Atmospheric Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(6,9,18,0.65) 100%)",
        }}
      />

      {/* ── Top Museum Header Bar ── */}
      <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse"
            style={{ boxShadow: "0 0 14px #3B82F6" }}
          />
          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-[#93C5FD] uppercase">
              Circular Gallery • Walkthrough
            </p>
            <h2
              className="text-xl md:text-2xl font-bold text-white tracking-wide"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {memoriesData.title || "Our Memories"}
            </h2>
          </div>
        </div>

        {/* Circular Radar / Minimap Indicator */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Curved Gallery
            </span>
            <span className="text-xs font-mono text-[#93C5FD]">
              {Math.round(visitorProgress * 100)}% EXPLORED
            </span>
          </div>

          <div
            className="relative w-11 h-11 rounded-full border border-white/20 flex items-center justify-center p-1"
            style={{ background: "rgba(10, 16, 30, 0.65)", backdropFilter: "blur(8px)" }}
          >
            <div className="w-5 h-5 rounded-full border border-blue-400/40" />
            <div
              className="absolute w-2 h-2 rounded-full bg-[#3B82F6]"
              style={{
                top: `${50 - Math.cos((targetAngleRef.current / (Math.PI * 2)) * Math.PI * 2) * 38}%`,
                left: `${50 + Math.sin((targetAngleRef.current / (Math.PI * 2)) * Math.PI * 2) * 38}%`,
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 8px #60A5FA",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Floating Focus Artwork Pill ── */}
      {(hoveredArtwork || activeArtwork) && (
        <div
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 pointer-events-auto transition-all duration-300"
          style={{ maxWidth: "90vw" }}
        >
          <div
            onClick={() => {
              const art = hoveredArtwork || activeArtwork;
              setInspectModalArtwork(art);
              if (onPhotoClick) onPhotoClick(art);
            }}
            className="flex items-center gap-3.5 px-5 py-3 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            style={{
              background: "rgba(10, 15, 28, 0.88)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 20px rgba(59,130,246,0.25)",
            }}
          >
            <span className="px-2 py-0.5 rounded-sm bg-[#3B82F6]/20 text-[#93C5FD] font-mono text-[10px] font-bold">
              {(hoveredArtwork || activeArtwork).artworkNumber}
            </span>
            <div className="text-left">
              <p
                className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate max-w-[200px] sm:max-w-[320px]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {(hoveredArtwork || activeArtwork).caption}
              </p>
              <p className="text-[10px] font-mono text-neutral-400">
                {(hoveredArtwork || activeArtwork).date || "Click to inspect artwork"}
              </p>
            </div>
            <Maximize2 size={14} className="text-[#93C5FD] ml-1 shrink-0" />
          </div>
        </div>
      )}

      {/* ── Bottom Navigation & Curator Controls ── */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 z-20 pointer-events-none">
        <div className="text-left hidden md:block">
          <p className="text-[11px] font-mono tracking-widest text-[#93C5FD]/70 uppercase">
            CONTEMPORARY PHOTOGRAPHY MUSEUM
          </p>
          <p className="text-xs text-neutral-400 font-light">
            Walk along the circular gallery corridor
          </p>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => stepWalk(-1)}
            className="p-2.5 rounded-full border border-white/15 bg-black/40 hover:bg-white/15 text-white transition-colors"
            title="Walk backward along curve"
            aria-label="Walk backward"
          >
            <ArrowLeft size={16} />
          </button>

          <div
            className="px-4 py-2 rounded-full border border-white/15 bg-black/50 text-[11px] font-mono text-neutral-300 tracking-wider uppercase flex items-center gap-2"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <Compass size={13} className="text-[#3B82F6] animate-spin" style={{ animationDuration: "12s" }} />
            <span>Scroll or Drag to Walk Forward</span>
          </div>

          <button
            onClick={() => stepWalk(1)}
            className="p-2.5 rounded-full border border-white/15 bg-black/40 hover:bg-white/15 text-white transition-colors"
            title="Walk forward along curve"
            aria-label="Walk forward"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto flex-wrap justify-end max-w-[280px] sm:max-w-none">
          {artworks.map((art, idx) => {
            const isCurrent = activeArtwork?.id === art.id;
            return (
              <button
                key={art.id}
                onClick={() => navigateToArtwork(idx)}
                className={`w-7 h-7 rounded-sm text-[10px] font-mono transition-all flex items-center justify-center border ${
                  isCurrent
                    ? "bg-[#3B82F6] text-white border-[#60A5FA] scale-110 shadow-[0_0_12px_#3B82F6]"
                    : "bg-black/40 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
                title={`Artwork ${art.artworkNumber}: ${art.caption}`}
              >
                {art.artworkNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Artwork Detail Inspection Modal ── */}
      {inspectModalArtwork && (
        <ArtworkModal
          artwork={inspectModalArtwork}
          onClose={() => setInspectModalArtwork(null)}
        />
      )}
    </section>
  );
}

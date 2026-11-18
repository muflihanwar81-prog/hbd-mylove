"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { X, Calendar, Compass, ArrowRight, ArrowLeft, Maximize2, Sparkles, ChevronDown } from "lucide-react";
import { memoriesData } from "@/lib/data-konten";

// ─── Museum Architectural Parameters ──────────────────────────────────────────
const R_INNER = 13.5;       // Inner curved wall radius (meters)
const R_OUTER = 21.5;       // Outer curved wall radius (meters)
const R_PATH = 17.5;        // Circular visitor walkway centerline radius
const WALL_HEIGHT = 5.8;    // Grand contemporary gallery ceiling height
const EYE_HEIGHT = 1.72;    // Natural human eye level in meters
const LOOK_AHEAD_RAD = 0.28;// Look-ahead angle along the circular trajectory

// Build artwork placement along the circular museum walls
const buildCircularArtworks = (photos) => {
  const count = photos.length;
  // Distribute artworks along the circle
  // We place artworks along an arc or full circle
  // Alternate between outer wall and inner wall so visitor looks both ways
  const angleSpan = Math.PI * 1.85; // Leave space for entrance foyer / rotunda vista
  const startAngle = 0.35;

  return photos.map((photo, i) => {
    const frac = i / (count - 1 || 1);
    const angle = startAngle + frac * angleSpan;
    const isOuter = i % 2 === 0;
    const wallRadius = isOuter ? R_OUTER - 0.12 : R_INNER + 0.12;

    return {
      ...photo,
      index: i,
      artworkNumber: String(i + 1).padStart(2, "0"),
      angle,
      isOuter,
      wallRadius,
      // Target viewing angle when visitor stands directly in front
      viewAngle: angle,
    };
  });
};

// ─── Helper: Create Crisp Texture from Image/SVG ──────────────────────────────
function createTextureFromSrc(src) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");

  // Initial architectural placeholder gradient
  const grad = ctx.createLinearGradient(0, 0, 1024, 768);
  grad.addColorStop(0, "#102B5C");
  grad.addColorStop(1, "#173B73");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 768);

  ctx.fillStyle = "#A9C7EA";
  ctx.font = "bold 32px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Exhibition Archive", 512, 384);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  if (typeof window !== "undefined" && src) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.clearRect(0, 0, 1024, 768);
      ctx.drawImage(img, 0, 0, 1024, 768);
      // Subtle archival vignette
      const vig = ctx.createRadialGradient(512, 384, 300, 512, 384, 600);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.18)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, 1024, 768);

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
          {/* Subtle museum spotlight behind painting */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Picture with realistic frame */}
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
                {artwork.isOuter ? "Outer Gallery" : "Inner Gallery"}
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
  const targetAngleRef = useRef(0.2);     // Target theta along circular path
  const currentAngleRef = useRef(0.2);    // Current interpolated theta
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
    targetAngleRef.current += direction * 0.45;
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
    scene.background = new THREE.Color("#080A12");
    // Deep contemporary atmospheric fog
    scene.fog = new THREE.FogExp2("#080A12", 0.024);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 100);
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
    renderer.toneMappingExposure = 1.05;

    threeStateRef.current = { scene, camera, renderer, animId: null };

    // ─── Lighting Setup ───────────────────────────────────────────────────────
    // Soft architectural ambient light
    const ambientLight = new THREE.AmbientLight("#FAF9F5", 0.45);
    scene.add(ambientLight);

    // Central atrium glow (subtle blue & warm light radiating from inner rotunda)
    const centralBlueGlow = new THREE.PointLight("#3B82F6", 1.8, 30, 1.2);
    centralBlueGlow.position.set(0, 3.5, 0);
    scene.add(centralBlueGlow);

    const centralWarmLight = new THREE.PointLight("#FFF6E5", 1.2, 35, 1.2);
    centralWarmLight.position.set(0, 4.8, 0);
    scene.add(centralWarmLight);

    // ─── Materials ────────────────────────────────────────────────────────────
    // Curved white museum wall material
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: "#F6F5F0",
      roughness: 0.88,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    // Dark polished terrazzo/marble floor
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: "#0F1118",
      roughness: 0.28,
      metalness: 0.45,
      side: THREE.DoubleSide,
    });

    // Elegant baseboard trim material (midnight blue / obsidian)
    const trimMaterial = new THREE.MeshStandardMaterial({
      color: "#0A1224",
      roughness: 0.5,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });

    // Ceiling material
    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: "#ECEAE3",
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

    // Outer wall ceiling cove light rail
    const outerCoveGeo = new THREE.CylinderGeometry(
      R_OUTER - 0.04,
      R_OUTER - 0.04,
      0.15,
      128,
      1,
      true
    );
    const outerCoveMesh = new THREE.Mesh(outerCoveGeo, trimMaterial);
    outerCoveMesh.position.y = WALL_HEIGHT - 0.075;
    scene.add(outerCoveMesh);

    // 2. INNER CURVED WALL (Radius R_INNER, height WALL_HEIGHT)
    // To make it feel like a grand museum rotunda, we create curved wall segments
    // with elegant architectural portals looking into the spacious central atrium!
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

    // 3. CIRCULAR EXHIBITION CORRIDOR FLOOR (Annulus between R_INNER and R_OUTER)
    const floorGeo = new THREE.RingGeometry(R_INNER - 0.2, R_OUTER + 0.2, 128);
    const floorMesh = new THREE.Mesh(floorGeo, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0.001;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Subtle blue architectural inlay guide along centerline of path
    const guideGeo = new THREE.RingGeometry(R_PATH - 0.04, R_PATH + 0.04, 128);
    const guideMat = new THREE.MeshBasicMaterial({
      color: "#2563EB",
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const guideMesh = new THREE.Mesh(guideGeo, guideMat);
    guideMesh.rotation.x = -Math.PI / 2;
    guideMesh.position.y = 0.003;
    scene.add(guideMesh);

    // 4. CIRCULAR CORRIDOR CEILING
    const ceilingGeo = new THREE.RingGeometry(R_INNER - 0.2, R_OUTER + 0.2, 128);
    const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMaterial);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.y = WALL_HEIGHT;
    scene.add(ceilingMesh);

    // 5. SPACIOUS CENTRAL ATRIUM (Interior circular courtyard r < R_INNER)
    // Dark reflective water/granite pond in central atrium
    const atriumFloorGeo = new THREE.CircleGeometry(R_INNER, 64);
    const atriumFloorMat = new THREE.MeshStandardMaterial({
      color: "#070B14",
      roughness: 0.15,
      metalness: 0.85,
    });
    const atriumFloor = new THREE.Mesh(atriumFloorGeo, atriumFloorMat);
    atriumFloor.rotation.x = -Math.PI / 2;
    atriumFloor.position.y = 0;
    scene.add(atriumFloor);

    // Central contemporary sculpture installation
    const sculptureGeo = new THREE.TorusKnotGeometry(2.2, 0.45, 128, 32);
    const sculptureMat = new THREE.MeshStandardMaterial({
      color: "#E2E8F0",
      metalness: 0.85,
      roughness: 0.18,
    });
    const sculptureMesh = new THREE.Mesh(sculptureGeo, sculptureMat);
    sculptureMesh.position.set(0, 2.8, 0);
    sculptureMesh.castShadow = true;
    scene.add(sculptureMesh);

    // Central circular glass Oculus in ceiling letting in soft celestial light
    const oculusLight = new THREE.DirectionalLight("#DDE8FF", 0.65);
    oculusLight.position.set(0, 15, 0);
    scene.add(oculusLight);

    // ─── Mount Framed Artworks Along Curved Walls ─────────────────────────────
    const meshInteractiveList = [];

    artworks.forEach((artwork) => {
      const { angle, isOuter, wallRadius } = artwork;
      const x = Math.sin(angle) * wallRadius;
      const z = Math.cos(angle) * wallRadius;
      const y = 2.15; // Standard museum hanging centerline height

      const artworkGroup = new THREE.Group();
      artworkGroup.position.set(x, y, z);

      // Tangent rotation so the frame conforms precisely to the circular wall
      // On outer wall: looks toward center (angle + PI)
      // On inner wall: looks outward from center (angle)
      const facingAngle = isOuter ? angle + Math.PI : angle;
      artworkGroup.rotation.y = facingAngle;

      // Realistic Museum Frame Dimensions
      const frameW = 2.3;
      const frameH = 1.72;
      const frameDepth = 0.08;

      // 1. Ornate Dark Timber / Obsidian Frame Box
      const frameBoxGeo = new THREE.BoxGeometry(frameW, frameH, frameDepth);
      const frameBoxMat = new THREE.MeshStandardMaterial({
        color: "#18181B",
        roughness: 0.35,
        metalness: 0.25,
      });
      const frameBox = new THREE.Mesh(frameBoxGeo, frameBoxMat);
      frameBox.castShadow = true;
      frameBox.receiveShadow = true;
      artworkGroup.add(frameBox);

      // Subtle Champagne Brass inner trim
      const brassTrimGeo = new THREE.BoxGeometry(frameW - 0.12, frameH - 0.12, frameDepth + 0.005);
      const brassTrimMat = new THREE.MeshStandardMaterial({
        color: "#C5A869",
        roughness: 0.3,
        metalness: 0.7,
      });
      const brassTrim = new THREE.Mesh(brassTrimGeo, brassTrimMat);
      artworkGroup.add(brassTrim);

      // 2. White Museum Mat Board
      const matGeo = new THREE.PlaneGeometry(frameW - 0.22, frameH - 0.22);
      const matMat = new THREE.MeshStandardMaterial({
        color: "#FAF9F5",
        roughness: 0.9,
      });
      const matMesh = new THREE.Mesh(matGeo, matMat);
      matMesh.position.z = frameDepth / 2 + 0.004;
      artworkGroup.add(matMesh);

      // 3. Artwork Canvas / Photo Plane
      const photoTexture = createTextureFromSrc(artwork.src);
      const photoGeo = new THREE.PlaneGeometry(frameW - 0.52, frameH - 0.52);
      const photoMat = new THREE.MeshStandardMaterial({
        map: photoTexture,
        roughness: 0.45,
        metalness: 0.05,
      });
      const photoMesh = new THREE.Mesh(photoGeo, photoMat);
      photoMesh.position.z = frameDepth / 2 + 0.006;
      artworkGroup.add(photoMesh);

      // 4. Subtle Museum Spotlight Glass Glare Plane
      const glassGeo = new THREE.PlaneGeometry(frameW - 0.22, frameH - 0.22);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: "#FFFFFF",
        transparent: true,
        opacity: 0.06,
        roughness: 0.1,
        transmission: 0.9,
        ior: 1.5,
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassMesh.position.z = frameDepth / 2 + 0.008;
      artworkGroup.add(glassMesh);

      // 5. Minimalist Museum Plaque / Wall Label below painting
      const plaqueGeo = new THREE.PlaneGeometry(0.55, 0.22);
      const plaqueMat = new THREE.MeshStandardMaterial({
        color: "#E2E8F0",
        roughness: 0.4,
        metalness: 0.15,
      });
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueMesh.position.set(0, -frameH / 2 - 0.26, frameDepth / 2 + 0.002);
      artworkGroup.add(plaqueMesh);

      // 6. Dedicated Ceiling Museum Spotlight
      // Positioned on the ceiling slightly in front of the artwork pointing down at it
      const spotOffsetRadius = isOuter ? -1.8 : 1.8;
      const spotAngle = angle;
      const spotX = Math.sin(spotAngle) * (wallRadius + spotOffsetRadius);
      const spotZ = Math.cos(spotAngle) * (wallRadius + spotOffsetRadius);

      const spotLight = new THREE.SpotLight("#FFF5E4", 2.8, 12, Math.PI / 5, 0.45, 1.2);
      spotLight.position.set(spotX, WALL_HEIGHT - 0.2, spotZ);
      spotLight.target = frameBox;
      spotLight.castShadow = true;
      spotLight.shadow.bias = -0.0008;
      scene.add(spotLight);
      scene.add(spotLight.target);

      // Trackable hit-box for raycaster
      const hitBoxGeo = new THREE.BoxGeometry(frameW + 0.3, frameH + 0.6, 0.4);
      const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitBox = new THREE.Mesh(hitBoxGeo, hitBoxMat);
      hitBox.userData = { artwork, frameBox, spotLight };
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

      // Rotate central sculpture gently
      sculptureMesh.rotation.y += dt * 0.12;
      sculptureMesh.rotation.x += dt * 0.06;

      // Camera Smooth Interpolation along circular path
      const diff = targetAngleRef.current - currentAngleRef.current;
      currentAngleRef.current += diff * 0.075;

      const theta = currentAngleRef.current;

      // Calculate camera position along circular corridor
      const camX = Math.sin(theta) * R_PATH;
      const camZ = Math.cos(theta) * R_PATH;
      camera.position.set(camX, EYE_HEIGHT, camZ);

      // Calculate camera look-at point along the curved forward trajectory
      const lookTheta = theta + LOOK_AHEAD_RAD;
      const lookX = Math.sin(lookTheta) * R_PATH;
      const lookZ = Math.cos(lookTheta) * R_PATH;
      camera.lookAt(lookX, EYE_HEIGHT, lookZ);

      // Raycaster check for hovering over artwork
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
      if (minAngleDist < 0.6) {
        setActiveArtwork(closestArt);
      } else {
        setActiveArtwork(null);
      }

      // Calculate overall circular progress percentage
      const totalSpan = Math.PI * 2;
      const normProgress = ((theta % totalSpan) + totalSpan) % totalSpan;
      setVisitorProgress(normProgress / totalSpan);

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
      // Dispose materials & geometries
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

  // Mouse wheel forward/backward along curve
  const handleWheel = useCallback((e) => {
    // Scroll down moves forward, scroll up moves backward
    const scrollDelta = e.deltaY * 0.0016;
    targetAngleRef.current += scrollDelta;
  }, []);

  // Mouse drag forward/backward
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;

    // Update normalized mouse coords for Raycasting
    const rect = container.getBoundingClientRect();
    mouseCoordsRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseCoordsRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPointerPosRef.current.x;
    const dy = e.clientY - lastPointerPosRef.current.y;
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };

    // Moving horizontal or vertical drag navigates along the curved exhibition path
    targetAngleRef.current += (-dx * 0.003) + (dy * 0.003);
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

    // Move camera along curved path
    targetAngleRef.current += (dy * 0.0035) + (dx * 0.0035);
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

      {/* ── Museum Vignette & Horizon Lighting Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(6,9,18,0.7) 100%)",
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
              Curved Path
            </span>
            <span className="text-xs font-mono text-[#93C5FD]">
              {Math.round(visitorProgress * 360)}° TRAJECTORY
            </span>
          </div>

          {/* Minimap Circle */}
          <div
            className="relative w-11 h-11 rounded-full border border-white/20 flex items-center justify-center p-1"
            style={{ background: "rgba(10, 16, 30, 0.65)", backdropFilter: "blur(8px)" }}
          >
            {/* Inner Wall indicator */}
            <div className="w-5 h-5 rounded-full border border-blue-400/40" />
            {/* Visitor marker dot orbiting along circle */}
            <div
              className="absolute w-2 h-2 rounded-full bg-[#3B82F6]"
              style={{
                top: `${50 - Math.cos(visitorProgress * Math.PI * 2) * 38}%`,
                left: `${50 + Math.sin(visitorProgress * Math.PI * 2) * 38}%`,
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 8px #60A5FA",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Floating Hover / Focus Artwork Pill ── */}
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
        {/* Left Instruction */}
        <div className="text-left hidden md:block">
          <p className="text-[11px] font-mono tracking-widest text-[#93C5FD]/70 uppercase">
            CONTEMPORARY PHOTOGRAPHY MUSEUM
          </p>
          <p className="text-xs text-neutral-400 font-light">
            Walk along the continuous curved exhibition gallery
          </p>
        </div>

        {/* Center: Walking Guidance & Quick Stepper */}
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

        {/* Right Artwork Index Navigator */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
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

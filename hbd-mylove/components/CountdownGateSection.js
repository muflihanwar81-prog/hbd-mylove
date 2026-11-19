"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Sparkles, Gift } from "lucide-react";
import { getCountdown, padZero } from "@/lib/format";
import { coupleData, countdownGateData } from "@/lib/data-konten";

function checkWebGL() {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function CountdownGateSection({ onTimeReached, onPreviewUnlock }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    animId: null,
    boxGroup: null,
    lidGroup: null,
    bodyRibbonGroup: null,
    bowGroup: null,
    innerLight: null,
    innerSpotLight: null,
    dustPoints: null,
    burstPoints: null,
    burstVelocities: null,
  });

  const [timeLeft, setTimeLeft] = useState(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showBurstOverlay, setShowBurstOverlay] = useState(false);

  const isOpeningRef = useRef(false);
  const openStartTimeRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseCoordsRef = useRef(new THREE.Vector2(-999, -999));

  // ─── 1. Live Countdown ────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    setHasWebGL(checkWebGL());

    const updateCountdown = () => {
      const cd = getCountdown(coupleData.birthday);
      setTimeLeft(cd);
      if (cd && cd.isPassed && !isOpeningRef.current) {
        handleOpenGift();
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // ─── 2. Audio Trigger ─────────────────────────────────────────────────────
  const triggerAudio = () => {
    try {
      const audioEl = document.getElementById("bg-music-player");
      if (audioEl && audioEl.paused) {
        audioEl.play().catch((e) => console.log("Audio play caught:", e));
      }
    } catch (e) {
      console.log("Audio trigger error:", e);
    }
  };

  // ─── 3. Trigger Gift Box Opening Sequence ─────────────────────────────────
  const handleOpenGift = useCallback(() => {
    if (isOpeningRef.current) return;
    isOpeningRef.current = true;
    setIsOpening(true);
    openStartTimeRef.current = performance.now();
    triggerAudio();

    // Trigger golden light burst overlay at 2.2s
    setTimeout(() => {
      setShowBurstOverlay(true);
    }, 2200);

    // Transition to birthday page at 3.0s
    setTimeout(() => {
      if (onPreviewUnlock) onPreviewUnlock();
      else if (onTimeReached) onTimeReached();
    }, 3000);
  }, [onPreviewUnlock, onTimeReached]);

  // ─── 4. Three.js 3D Gift Box Scene ────────────────────────────────────────
  useEffect(() => {
    if (!hasWebGL) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth || 800;
    let height = container.clientHeight || window.innerHeight || 600;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA - Positioned so 3D gift box is centered and clearly visible
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.8);
    camera.lookAt(0, -0.32, 0);

    // RENDERER with error handling
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (err) {
      console.warn("WebGL initialization failed:", err);
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ─── MATERIALS (Luxurious Deep Burgundy & Satin Champagne Gold) ───────────
    // Body & Lid: Deep Burgundy / Red Wine with high specular sheen
    const burgundyMat = new THREE.MeshStandardMaterial({
      color: 0x64152D,
      roughness: 0.28,
      metalness: 0.15,
    });

    // Dark Velvet Interior
    const interiorMat = new THREE.MeshStandardMaterial({
      color: 0x350B19,
      roughness: 0.7,
      metalness: 0.05,
      side: THREE.BackSide,
    });

    // Ribbon & Bow: Satin Champagne Gold with metallic reflection
    const goldRibbonMat = new THREE.MeshStandardMaterial({
      color: 0xD6A56D,
      roughness: 0.2,
      metalness: 0.65,
      emissive: 0x2A1A0A,
    });

    // ─── GEOMETRY ─────────────────────────────────────────────────────────────
    const boxGroup = new THREE.Group();
    boxGroup.position.set(0, -0.48, 0);
    boxGroup.rotation.x = 0.32; // Tilt downward so top lid & bow are visible

    // 1. CUBE BOX BODY
    const bW = 1.6;
    const bH = 1.25;
    const bD = 1.6;
    const baseBox = new THREE.Mesh(new THREE.BoxGeometry(bW, bH, bD), burgundyMat);
    baseBox.castShadow = true;
    baseBox.receiveShadow = true;
    boxGroup.add(baseBox);

    // Inner cavity
    const innerCavity = new THREE.Mesh(
      new THREE.BoxGeometry(bW - 0.08, bH - 0.08, bD - 0.08),
      interiorMat
    );
    boxGroup.add(innerCavity);

    // 2. BODY RIBBONS (Vertical & Horizontal wrapping the 4 sides)
    const bodyRibbonGroup = new THREE.Group();
    const ribbonW = 0.28;

    const bRibbonV = new THREE.Mesh(
      new THREE.BoxGeometry(ribbonW, bH + 0.015, bD + 0.02),
      goldRibbonMat
    );
    bRibbonV.castShadow = true;
    bodyRibbonGroup.add(bRibbonV);

    const bRibbonH = new THREE.Mesh(
      new THREE.BoxGeometry(bW + 0.02, bH + 0.015, ribbonW),
      goldRibbonMat
    );
    bRibbonH.castShadow = true;
    bodyRibbonGroup.add(bRibbonH);

    boxGroup.add(bodyRibbonGroup);

    // 3. SEPARATE MOVABLE LID
    const lidGroup = new THREE.Group();
    // Position pivot right atop the box body
    lidGroup.position.set(0, bH / 2, 0);

    const lW = bW + 0.1;
    const lH = 0.28;
    const lD = bD + 0.1;

    const lidBox = new THREE.Mesh(new THREE.BoxGeometry(lW, lH, lD), burgundyMat);
    lidBox.position.set(0, lH / 2, 0);
    lidBox.castShadow = true;
    lidBox.receiveShadow = true;
    lidGroup.add(lidBox);

    // Lid ribbons (cross on top and wrap around lid lips)
    const lRibbonV = new THREE.Mesh(
      new THREE.BoxGeometry(ribbonW + 0.005, lH + 0.02, lD + 0.02),
      goldRibbonMat
    );
    lRibbonV.position.set(0, lH / 2, 0);
    lRibbonV.castShadow = true;
    lidGroup.add(lRibbonV);

    const lRibbonH = new THREE.Mesh(
      new THREE.BoxGeometry(lW + 0.02, lH + 0.02, ribbonW + 0.005),
      goldRibbonMat
    );
    lRibbonH.position.set(0, lH / 2, 0);
    lRibbonH.castShadow = true;
    lidGroup.add(lRibbonH);

    // 4. REALISTIC SATIN RIBBON BOW ON TOP
    const bowGroup = new THREE.Group();
    bowGroup.position.set(0, lH + 0.01, 0);

    // Center knot
    const knot = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 20), goldRibbonMat);
    knot.scale.set(1.15, 0.85, 1.15);
    knot.castShadow = true;
    bowGroup.add(knot);

    // 6 Ribbon Loops arranged radially
    const loopCount = 6;
    for (let i = 0; i < loopCount; i++) {
      const loopPivot = new THREE.Group();
      loopPivot.rotation.y = (i * Math.PI * 2) / loopCount;

      const loopGeo = new THREE.TorusGeometry(0.28, 0.07, 16, 32, Math.PI * 1.55);
      const loopMesh = new THREE.Mesh(loopGeo, goldRibbonMat);
      loopMesh.rotation.x = Math.PI / 2.3;
      loopMesh.rotation.z = Math.PI / 4.2;
      loopMesh.position.set(0.2, 0.14, 0);
      loopMesh.scale.set(1.0, 0.85, 1.25);
      loopMesh.castShadow = true;

      loopPivot.add(loopMesh);
      bowGroup.add(loopPivot);
    }

    // 2 Flowing cascading ribbon tails
    const tailGeo = new THREE.BoxGeometry(0.2, 0.02, 0.65);
    const tail1 = new THREE.Mesh(tailGeo, goldRibbonMat);
    tail1.position.set(0.3, 0.02, 0.3);
    tail1.rotation.set(-0.35, 0.55, 0.15);
    tail1.castShadow = true;
    bowGroup.add(tail1);

    const tail2 = new THREE.Mesh(tailGeo, goldRibbonMat);
    tail2.position.set(-0.3, 0.02, 0.32);
    tail2.rotation.set(-0.38, -0.6, -0.2);
    tail2.castShadow = true;
    bowGroup.add(tail2);

    lidGroup.add(bowGroup);
    boxGroup.add(lidGroup);

    // 5. CONTACT FLOOR SHADOW
    const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    const sGrad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 62);
    sGrad.addColorStop(0, "rgba(20, 2, 7, 0.85)");
    sGrad.addColorStop(0.5, "rgba(35, 5, 14, 0.45)");
    sGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -bH / 2 - 0.01;
    boxGroup.add(shadowPlane);

    scene.add(boxGroup);

    // ─── 6. LIGHTING ──────────────────────────────────────────────────────────
    // Main Key Light (front-top-right)
    const keyLight = new THREE.DirectionalLight(0xFFE5C2, 2.3);
    keyLight.position.set(3.2, 5.5, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Rim Light (back-left) in red wine to highlight box silhouette
    const rimLight = new THREE.DirectionalLight(0x801F3A, 2.9);
    rimLight.position.set(-4.2, 3.2, -3.8);
    scene.add(rimLight);

    // Gold Accent Fill from bottom
    const goldFill = new THREE.PointLight(0xD6A56D, 1.4, 9);
    goldFill.position.set(0, -1.2, 3.2);
    scene.add(goldFill);

    // Ambient Warm Velvet
    const ambientLight = new THREE.AmbientLight(0x4A1021, 1.05);
    scene.add(ambientLight);

    // Internal Box Light (glowing gold escaping on open)
    const innerLight = new THREE.PointLight(0xFFE2A3, 0, 15, 1.3);
    innerLight.position.set(0, 0.25, 0);
    boxGroup.add(innerLight);

    const innerSpotLight = new THREE.SpotLight(0xFFF0D0, 0, 20, Math.PI / 3.2, 0.35, 1.2);
    innerSpotLight.position.set(0, 0.35, 0);
    innerSpotLight.target.position.set(0, 3.5, 0);
    boxGroup.add(innerSpotLight);
    boxGroup.add(innerSpotLight.target);

    // ─── 7. FLOATING GOLDEN DUST (Ambient 3D particles) ──────────────────────
    const dustCount = 280;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustBase = [];

    for (let i = 0; i < dustCount; i++) {
      const radius = 1.1 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const y = -1.2 + Math.random() * 4.2;
      dustPositions[i * 3] = Math.sin(theta) * radius;
      dustPositions[i * 3 + 1] = y;
      dustPositions[i * 3 + 2] = Math.cos(theta) * radius;

      dustBase.push({
        radius,
        theta,
        y,
        speed: 0.003 + Math.random() * 0.006,
        yVel: 0.002 + Math.random() * 0.003,
      });
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    // Circle particle texture
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext("2d");
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, "rgba(255, 245, 237, 1)");
    pGrad.addColorStop(0.35, "rgba(214, 165, 109, 0.85)");
    pGrad.addColorStop(0.7, "rgba(168, 50, 80, 0.35)");
    pGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);
    const pTex = new THREE.CanvasTexture(pCanvas);

    const dustMat = new THREE.PointsMaterial({
      size: 0.11,
      map: pTex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // ─── 8. BURST PARTICLES (Explosion upon opening) ─────────────────────────
    const burstCount = 1000;
    const burstGeo = new THREE.BufferGeometry();
    const burstPositions = new Float32Array(burstCount * 3);
    const burstColors = new Float32Array(burstCount * 3);
    const burstVelocities = [];

    const colGold = new THREE.Color(0xD6A56D);
    const colBurgundy = new THREE.Color(0xA83250);
    const colWarmWhite = new THREE.Color(0xFFF5ED);

    for (let i = 0; i < burstCount; i++) {
      burstPositions[i * 3] = (Math.random() - 0.5) * 0.3;
      burstPositions[i * 3 + 1] = 0.2 + (Math.random() - 0.5) * 0.2;
      burstPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const speed = 1.8 + Math.random() * 4.2;

      const vx = Math.sin(phi) * Math.cos(theta) * speed;
      const vy = Math.abs(Math.cos(phi)) * speed * 1.35 + 1.2;
      const vz = Math.sin(phi) * Math.sin(theta) * speed;
      burstVelocities.push({ vx, vy, vz });

      const pick = Math.random();
      const c = pick < 0.65 ? colGold : pick < 0.9 ? colBurgundy : colWarmWhite;
      burstColors[i * 3] = c.r;
      burstColors[i * 3 + 1] = c.g;
      burstColors[i * 3 + 2] = c.b;
    }

    burstGeo.setAttribute("position", new THREE.BufferAttribute(burstPositions, 3));
    burstGeo.setAttribute("color", new THREE.BufferAttribute(burstColors, 3));

    const burstMat = new THREE.PointsMaterial({
      size: 0.15,
      map: pTex,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const burstPoints = new THREE.Points(burstGeo, burstMat);
    scene.add(burstPoints);

    // Save refs
    threeRef.current = {
      scene,
      camera,
      renderer,
      animId: null,
      boxGroup,
      lidGroup,
      bodyRibbonGroup,
      bowGroup,
      goldRibbonMat,
      innerLight,
      innerSpotLight,
      dustPoints,
      dustBase,
      burstPoints,
      burstVelocities,
    };

    // ─── 9. RENDER LOOP ───────────────────────────────────────────────────────
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      const t = currentTime * 0.001;

      // Mouse Parallax
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.06;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.06;

      // Ambient Dust Drift
      if (dustPoints && dustBase) {
        const dPos = dustPoints.geometry.attributes.position.array;
        for (let i = 0; i < dustCount; i++) {
          const item = dustBase[i];
          item.theta += item.speed;
          item.y += item.yVel;
          if (item.y > 3.2) item.y = -1.2;

          dPos[i * 3] = Math.sin(item.theta) * item.radius;
          dPos[i * 3 + 1] = item.y + Math.sin(t * 1.5 + i) * 0.06;
          dPos[i * 3 + 2] = Math.cos(item.theta) * item.radius;
        }
        dustPoints.geometry.attributes.position.needsUpdate = true;
      }

      // ── IDLE ANIMATION: Continuous gentle Y rotation + breathing float ──
      if (!isOpeningRef.current) {
        // Continuous rotation on Y axis
        boxGroup.rotation.y += 0.008;
        // Subtle floating on Y
        boxGroup.position.y = -0.48 + Math.sin(t * 1.5) * 0.05;
        // Subtle mouse tilt
        boxGroup.rotation.x = 0.32 + mousePosRef.current.y * 0.22;
        boxGroup.rotation.z = -mousePosRef.current.x * 0.12;

        // Raycasting for interactive hover
        raycasterRef.current.setFromCamera(mouseCoordsRef.current, camera);
        const intersects = raycasterRef.current.intersectObjects(boxGroup.children, true);
        if (intersects.length > 0) {
          setIsHovered(true);
          if (canvas) canvas.style.cursor = "pointer";
          boxGroup.scale.lerp(new THREE.Vector3(1.03, 1.03, 1.03), 0.1);
        } else {
          setIsHovered(false);
          if (canvas) canvas.style.cursor = "default";
          boxGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      } else {
        // ── OPENING ANIMATION: Realistic Physics Sequence ──
        const elapsed = (currentTime - openStartTimeRef.current) / 1000;

        // 1. Ribbon releases & moves downward (0.0s - 0.7s)
        const ribbonProgress = Math.min(Math.max(elapsed / 0.7, 0), 1);
        bodyRibbonGroup.position.y = -ribbonProgress * 0.65;
        goldRibbonMat.opacity = Math.max(1 - ribbonProgress * 1.4, 0);
        goldRibbonMat.transparent = true;

        // 2. Lid lifts upward and rotates 3D backward (0.3s - 1.8s)
        if (elapsed > 0.3) {
          const lidT = Math.min((elapsed - 0.3) / 1.5, 1);
          const easeLid = 1 - Math.pow(1 - lidT, 3);

          lidGroup.position.y = bH / 2 + easeLid * 1.6;
          lidGroup.position.z = -easeLid * 0.9;
          lidGroup.rotation.x = -easeLid * 1.95; // Realistically tilts backward
          lidGroup.rotation.z = Math.sin(easeLid * Math.PI) * 0.15;
        }

        // 3. Warm golden light bursts from within (0.4s - 2.6s)
        if (elapsed > 0.4) {
          const lightT = Math.min((elapsed - 0.4) / 1.6, 1);
          innerLight.intensity = lightT * 26;
          innerSpotLight.intensity = lightT * 32;
        }

        // 4. Glowing particles erupt and spread across the screen (0.6s - 3.0s)
        if (elapsed > 0.6) {
          burstMat.opacity = Math.min((elapsed - 0.6) * 2.5, 1);
          const bPos = burstPoints.geometry.attributes.position.array;
          const dtBurst = dt * 1.25;

          for (let i = 0; i < burstCount; i++) {
            const vel = burstVelocities[i];
            bPos[i * 3] += vel.vx * dtBurst;
            bPos[i * 3 + 1] += vel.vy * dtBurst;
            bPos[i * 3 + 2] += vel.vz * dtBurst;

            vel.vy -= 0.5 * dtBurst;
            vel.vx *= 0.985;
            vel.vz *= 0.985;
          }
          burstPoints.geometry.attributes.position.needsUpdate = true;
        }

        // 5. Camera zooms in toward the glowing interior (1.2s - 2.8s)
        if (elapsed > 1.2) {
          const zoomT = Math.min((elapsed - 1.2) / 1.6, 1);
          const easeZoom = zoomT < 0.5 ? 2 * zoomT * zoomT : -1 + (4 - 2 * zoomT) * zoomT;

          camera.position.z = 5.8 - easeZoom * 4.6; // Zooms from 5.8 to 1.2
          camera.position.y = 0.45 - easeZoom * 0.55;
          camera.lookAt(0, -0.15, 0);
        }
      }

      renderer.render(scene, camera);
      threeRef.current.animId = requestAnimationFrame(animate);
    };

    threeRef.current.animId = requestAnimationFrame(animate);

    // ─── 10. RESIZE & POINTER EVENTS ──────────────────────────────────────────
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      mouseCoordsRef.current.x = normX;
      mouseCoordsRef.current.y = normY;
      mousePosRef.current.targetX = normX;
      mousePosRef.current.targetY = -normY;
    };

    const handleCanvasClick = () => {
      if (isOpeningRef.current) return;
      raycasterRef.current.setFromCamera(mouseCoordsRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(boxGroup.children, true);
      if (intersects.length > 0) {
        handleOpenGift();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("click", handleCanvasClick);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("click", handleCanvasClick);
      if (threeRef.current.animId) cancelAnimationFrame(threeRef.current.animId);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [hasWebGL, handleOpenGift]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 flex flex-col items-center justify-between overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, #4A1021 0%, #350B19 45%, #24050E 80%, #150207 100%)",
      }}
    >
      {/* ── Soft Red Wine & Champagne Ambient Light Rays ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
        <div
          className="absolute -top-40 left-1/4 w-[600px] h-[900px] rotate-[-22deg] blur-3xl"
          style={{
            background: "linear-gradient(180deg, rgba(214, 165, 109, 0.2) 0%, rgba(128, 31, 58, 0.3) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute -top-40 right-1/4 w-[600px] h-[900px] rotate-[22deg] blur-3xl"
          style={{
            background: "linear-gradient(180deg, rgba(168, 50, 80, 0.25) 0%, rgba(74, 16, 33, 0.35) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Velvet Vignette Overlay (Non-blocking) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          boxShadow: "inset 0 0 100px rgba(21, 2, 7, 0.85), inset 0 0 50px rgba(36, 5, 14, 0.6)",
        }}
      />

      {/* ── 3D WebGL Canvas ── */}
      {hasWebGL ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-10"
        />
      ) : (
        /* Fallback if WebGL unavailable */
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
          <div
            onClick={handleOpenGift}
            className="w-48 h-48 rounded-3xl bg-[#64152D] border-4 border-[#D6A56D] flex flex-col items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform"
          >
            <Gift size={64} className="text-[#D6A56D] animate-bounce mb-2" />
            <span className="text-xs font-bold text-[#FFF5ED] uppercase tracking-wider">
              Buka Kado
            </span>
          </div>
        </div>
      )}

      {/* ── Top Header & Live Countdown ── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 pt-4 sm:pt-6 px-4 text-center max-w-xl mx-auto pointer-events-none"
      >
        {/* Luxury Badge */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-2 backdrop-blur-md"
          style={{
            background: "rgba(53, 11, 25, 0.8)",
            border: "1px solid rgba(214, 165, 109, 0.35)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <Sparkles size={13} className="text-[#D6A56D]" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.22em] text-[#D6A56D] uppercase">
            {countdownGateData.badge || "COUNTDOWN TO YOUR SPECIAL DAY ✨"}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFF5ED] tracking-wide mb-1"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow: "0 2px 25px rgba(0,0,0,0.8)",
          }}
        >
          {coupleData.partnerName
            ? `Countdown to ${coupleData.partnerName.split(" ")[0]}'s Birthday`
            : "A Special Surprise For You"}
        </h1>

        <p className="text-[11px] sm:text-xs text-[#FFF5ED]/70 max-w-sm mx-auto mb-3 font-light tracking-wide">
          Sesuatu yang sangat indah telah disiapkan khusus untukmu di hari ulang tahunmu.
        </p>

        {/* Countdown Cards Grid (Days, Hours, Minutes, Seconds) */}
        {timeLeft && !timeLeft.isPassed && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 pointer-events-auto">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 sm:py-1.5 min-w-[56px] sm:min-w-[68px] rounded-xl backdrop-blur-md shadow-xl"
                style={{
                  background: "rgba(53, 11, 25, 0.75)",
                  border: "1px solid rgba(214, 165, 109, 0.3)",
                  boxShadow: "0 8px 25px rgba(21, 2, 7, 0.5)",
                }}
              >
                <span className="text-lg sm:text-xl font-extrabold text-[#D6A56D] tabular-nums tracking-tight">
                  {padZero(unit.value)}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#FFF5ED]/65 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Bottom Interactive Call To Action ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-20 pb-5 sm:pb-7 px-4 text-center pointer-events-auto flex flex-col items-center gap-2"
      >
        {/* Main Action Button */}
        <motion.button
          onClick={handleOpenGift}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isOpening}
          className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-2xl cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #801F3A 0%, #64152D 50%, #4A1021 100%)",
            color: "#FFF5ED",
            border: "1px solid rgba(214, 165, 109, 0.6)",
            boxShadow: "0 10px 40px rgba(128, 31, 58, 0.45), 0 0 25px rgba(214, 165, 109, 0.25)",
          }}
        >
          <Gift size={16} className="text-[#D6A56D] group-hover:rotate-12 transition-transform" />
          <span className="font-semibold text-[#FFF5ED]">
            {isOpening ? "Membuka Kado..." : "Buka Kado Sekarang"}
          </span>
          <Sparkles size={15} className="text-[#D6A56D] animate-pulse" />
        </motion.button>

        {/* Subtle Hint */}
        <p className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#D6A56D]/85 uppercase">
          {isHovered ? "Klik untuk membuka kado 3D ✨" : "Sentuh atau klik kado 3D untuk membuka kejutan"}
        </p>
      </motion.div>

      {/* ── Golden Cinematic Light Burst Overlay (On Reveal) ── */}
      <AnimatePresence>
        {showBurstOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255, 245, 237, 1) 0%, rgba(214, 165, 109, 0.95) 45%, rgba(128, 31, 58, 0.98) 100%)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Sparkles, Gift, Clock } from "lucide-react";
import { getCountdown, padZero, parseDate } from "@/lib/format";
import { coupleData, countdownGateData } from "@/lib/data-konten";

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
    ribbonGroup: null,
    bowGroup: null,
    innerLight: null,
    innerSpotLight: null,
    dustPoints: null,
    burstPoints: null,
    burstVelocities: null,
  });

  const [timeLeft, setTimeLeft] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showBurstOverlay, setShowBurstOverlay] = useState(false);

  const isOpeningRef = useRef(false);
  const openStartTimeRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseCoordsRef = useRef(new THREE.Vector2(-999, -999));

  // ─── 1. Live Countdown Timer ──────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    const updateCountdown = () => {
      const cd = getCountdown(coupleData.birthday);
      setTimeLeft(cd);
      if (cd && cd.isPassed && !isOpeningRef.current) {
        // Automatically start opening when time is reached
        handleOpenGift();
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // ─── 2. Trigger Audio on User Interaction ─────────────────────────────────
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

    // Trigger golden light burst overlay at 2.4s
    setTimeout(() => {
      setShowBurstOverlay(true);
    }, 2300);

    // Transition to birthday page at 3.2s
    setTimeout(() => {
      if (onPreviewUnlock) onPreviewUnlock();
      else if (onTimeReached) onTimeReached();
    }, 3200);
  }, [onPreviewUnlock, onTimeReached]);

  // ─── 4. Three.js 3D Gift Box Scene ────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.25, 5.4);
    camera.lookAt(0, 0.05, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ─── MATERIALS (Luxury Maroon, Burgundy & Champagne Gold) ─────────────────
    // Premium Deep Burgundy Wrapping Paper (#64152D / #801F3A sheen)
    const burgundyPaperMat = new THREE.MeshPhysicalMaterial({
      color: 0x64152D,
      roughness: 0.38,
      metalness: 0.08,
      clearcoat: 0.4,
      clearcoatRoughness: 0.25,
      sheen: 0.65,
      sheenColor: new THREE.Color(0x801F3A),
    });

    // Dark Velvet Interior Lining (#350B19)
    const velvetInteriorMat = new THREE.MeshStandardMaterial({
      color: 0x350B19,
      roughness: 0.85,
      metalness: 0.02,
      side: THREE.BackSide,
    });

    // Elegant Champagne-Gold Satin Ribbon (#D6A56D)
    const goldRibbonMat = new THREE.MeshStandardMaterial({
      color: 0xD6A56D,
      roughness: 0.22,
      metalness: 0.52,
      emissive: 0x241607,
    });

    // ─── 3D GIFT BOX GEOMETRY ─────────────────────────────────────────────────
    const boxGroup = new THREE.Group();
    const ribbonGroup = new THREE.Group();

    // A. Base Box Body (2.1 x 1.6 x 2.1)
    const boxW = 2.1;
    const boxH = 1.6;
    const boxD = 2.1;
    const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(boxW, boxH, boxD), burgundyPaperMat);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    boxGroup.add(baseMesh);

    // Inner Velvet Cavity
    const innerCavity = new THREE.Mesh(new THREE.BoxGeometry(boxW - 0.08, boxH - 0.08, boxD - 0.08), velvetInteriorMat);
    boxGroup.add(innerCavity);

    // B. Base Ribbons (Champagne Gold Bands)
    const baseRibbonV = new THREE.Mesh(new THREE.BoxGeometry(0.32, boxH + 0.015, boxD + 0.02), goldRibbonMat);
    baseRibbonV.castShadow = true;
    ribbonGroup.add(baseRibbonV);

    const baseRibbonH = new THREE.Mesh(new THREE.BoxGeometry(boxW + 0.02, boxH + 0.015, 0.32), goldRibbonMat);
    baseRibbonH.castShadow = true;
    ribbonGroup.add(baseRibbonH);

    boxGroup.add(ribbonGroup);

    // C. Box Lid Group with realistic hinge pivot
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, boxH / 2, 0); // Sits right atop the base box

    const lidW = boxW + 0.12;
    const lidH = 0.36;
    const lidD = boxD + 0.12;
    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(lidW, lidH, lidD), burgundyPaperMat);
    lidMesh.position.y = lidH / 2;
    lidMesh.castShadow = true;
    lidMesh.receiveShadow = true;
    lidGroup.add(lidMesh);

    // Lid Ribbons
    const lidRibbonGroup = new THREE.Group();
    const lidRibbonV = new THREE.Mesh(new THREE.BoxGeometry(0.325, lidH + 0.02, lidD + 0.02), goldRibbonMat);
    lidRibbonV.position.y = lidH / 2;
    lidRibbonV.castShadow = true;
    lidRibbonGroup.add(lidRibbonV);

    const lidRibbonH = new THREE.Mesh(new THREE.BoxGeometry(lidW + 0.02, lidH + 0.02, 0.325), goldRibbonMat);
    lidRibbonH.position.y = lidH / 2;
    lidRibbonH.castShadow = true;
    lidRibbonGroup.add(lidRibbonH);

    // D. Realistic Multi-Loop Champagne-Gold Ribbon Bow
    const bowGroup = new THREE.Group();
    bowGroup.position.set(0, lidH + 0.02, 0);

    // Center Knot
    const knotMesh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), goldRibbonMat);
    knotMesh.scale.set(1.15, 0.9, 1.15);
    knotMesh.castShadow = true;
    bowGroup.add(knotMesh);

    // 6 Curved Satin Loops around the center knot
    const numLoops = 6;
    for (let i = 0; i < numLoops; i++) {
      const angle = (i * Math.PI * 2) / numLoops;
      const loopGroup = new THREE.Group();
      loopGroup.rotation.y = angle;

      const loopGeo = new THREE.TorusGeometry(0.36, 0.08, 16, 32, Math.PI * 1.55);
      const loopMesh = new THREE.Mesh(loopGeo, goldRibbonMat);
      loopMesh.rotation.x = Math.PI / 2.3;
      loopMesh.rotation.z = Math.PI / 4;
      loopMesh.position.set(0.24, 0.18, 0);
      loopMesh.scale.set(1.0, 0.85, 1.2);
      loopMesh.castShadow = true;

      loopGroup.add(loopMesh);
      bowGroup.add(loopGroup);
    }

    // 2 Flowing Ribbon Tails cascading off the lid edge
    const tail1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.75), goldRibbonMat);
    tail1.position.set(0.35, 0.02, 0.35);
    tail1.rotation.set(-0.35, 0.6, 0.2);
    tail1.castShadow = true;
    bowGroup.add(tail1);

    const tail2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.8), goldRibbonMat);
    tail2.position.set(-0.35, 0.02, 0.4);
    tail2.rotation.set(-0.4, -0.65, -0.25);
    tail2.castShadow = true;
    bowGroup.add(tail2);

    lidRibbonGroup.add(bowGroup);
    lidGroup.add(lidRibbonGroup);
    boxGroup.add(lidGroup);

    // Soft Contact Shadow Plane Underneath
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    const sGrad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
    sGrad.addColorStop(0, "rgba(20, 3, 8, 0.75)");
    sGrad.addColorStop(0.5, "rgba(35, 6, 15, 0.4)");
    sGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -boxH / 2 - 0.01;
    boxGroup.add(shadowPlane);

    // Raycast hit target for easy clicking
    const hitBox = new THREE.Mesh(
      new THREE.BoxGeometry(boxW + 0.4, boxH + lidH + 0.4, boxD + 0.4),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    hitBox.position.y = 0.15;
    hitBox.userData = { isGiftBox: true };
    boxGroup.add(hitBox);

    scene.add(boxGroup);

    // ─── LIGHTING (Warm Champagne, Deep Velvet Maroon & Red Wine) ─────────────
    // Key Warm Light from top-front-right
    const keyLight = new THREE.DirectionalLight(0xFFE5C2, 2.1);
    keyLight.position.set(3.5, 6, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.camera.left = -3;
    keyLight.shadow.camera.right = 3;
    keyLight.shadow.camera.top = 3;
    keyLight.shadow.camera.bottom = -3;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Red-Wine Rim Light from back-left for luxury edge highlights
    const rimLight = new THREE.DirectionalLight(0x801F3A, 2.8);
    rimLight.position.set(-4.5, 3.5, -4.0);
    scene.add(rimLight);

    // Warm Gold Fill Light on lower ribbon
    const goldFill = new THREE.PointLight(0xD6A56D, 1.4, 9);
    goldFill.position.set(0, -1.2, 3.5);
    scene.add(goldFill);

    // Velvet Maroon Ambient
    const ambientLight = new THREE.AmbientLight(0x4A1021, 0.95);
    scene.add(ambientLight);

    // Hidden Internal Golden Burst Lights (escapes upon opening)
    const innerLight = new THREE.PointLight(0xFFE0A3, 0, 14, 1.4);
    innerLight.position.set(0, 0.3, 0);
    boxGroup.add(innerLight);

    const innerSpotLight = new THREE.SpotLight(0xFFF2D0, 0, 18, Math.PI / 3.2, 0.35, 1.2);
    innerSpotLight.position.set(0, 0.4, 0);
    innerSpotLight.target.position.set(0, 3.5, 0);
    boxGroup.add(innerSpotLight);
    boxGroup.add(innerSpotLight.target);

    // ─── FLOATING GOLDEN DUST PARTICLES (Idle Atmosphere) ─────────────────────
    const dustCount = 320;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustScales = new Float32Array(dustCount);
    const dustBase = [];

    for (let i = 0; i < dustCount; i++) {
      const radius = 1.2 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const y = -1.2 + Math.random() * 4.5;
      const x = Math.sin(theta) * radius;
      const z = Math.cos(theta) * radius;

      dustPositions[i * 3] = x;
      dustPositions[i * 3 + 1] = y;
      dustPositions[i * 3 + 2] = z;
      dustScales[i] = 0.035 + Math.random() * 0.06;

      dustBase.push({
        radius,
        theta,
        y,
        speed: 0.003 + Math.random() * 0.007,
        yVel: 0.002 + Math.random() * 0.004,
      });
    }

    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    // Particle texture (soft golden circle)
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext("2d");
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, "rgba(255, 245, 237, 1)");
    pGrad.addColorStop(0.35, "rgba(214, 165, 109, 0.85)");
    pGrad.addColorStop(0.7, "rgba(168, 50, 80, 0.4)");
    pGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);
    const pTex = new THREE.CanvasTexture(pCanvas);

    const dustMat = new THREE.PointsMaterial({
      size: 0.12,
      map: pTex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // ─── EXPLOSION / BURST PARTICLE SYSTEM (Active on Opening) ────────────────
    const burstCount = 1200;
    const burstGeo = new THREE.BufferGeometry();
    const burstPositions = new Float32Array(burstCount * 3);
    const burstColors = new Float32Array(burstCount * 3);
    const burstVelocities = [];

    const goldColor = new THREE.Color(0xD6A56D);
    const crimsonColor = new THREE.Color(0xA83250);
    const warmWhiteColor = new THREE.Color(0xFFF5ED);

    for (let i = 0; i < burstCount; i++) {
      burstPositions[i * 3] = (Math.random() - 0.5) * 0.4;
      burstPositions[i * 3 + 1] = 0.2 + (Math.random() - 0.5) * 0.3;
      burstPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      // Radial velocities fanning outward and upward
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const speed = 1.8 + Math.random() * 4.5;

      const vx = Math.sin(phi) * Math.cos(theta) * speed;
      const vy = Math.abs(Math.cos(phi)) * speed * 1.35 + 1.2; // Strong upward bias
      const vz = Math.sin(phi) * Math.sin(theta) * speed;
      burstVelocities.push({ vx, vy, vz, rot: Math.random() * 10 });

      // Color distribution: 65% Champagne Gold, 25% Crimson/Burgundy, 10% Soft Warm White
      const pick = Math.random();
      let c = goldColor;
      if (pick > 0.65 && pick < 0.9) c = crimsonColor;
      else if (pick >= 0.9) c = warmWhiteColor;

      burstColors[i * 3] = c.r;
      burstColors[i * 3 + 1] = c.g;
      burstColors[i * 3 + 2] = c.b;
    }

    burstGeo.setAttribute("position", new THREE.BufferAttribute(burstPositions, 3));
    burstGeo.setAttribute("color", new THREE.BufferAttribute(burstColors, 3));

    const burstMat = new THREE.PointsMaterial({
      size: 0.16,
      map: pTex,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const burstPoints = new THREE.Points(burstGeo, burstMat);
    scene.add(burstPoints);

    // Save refs for animation loop
    threeRef.current = {
      scene,
      camera,
      renderer,
      animId: null,
      boxGroup,
      lidGroup,
      ribbonGroup,
      lidRibbonGroup,
      bowGroup,
      innerLight,
      innerSpotLight,
      dustPoints,
      dustBase,
      burstPoints,
      burstVelocities,
      hitBox,
    };

    // ─── 5. ANIMATION LOOP (Realistic Physics & Cinematic Timing) ────────────
    let lastTime = performance.now();

    const animate = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      const t = currentTime * 0.001;

      // Mouse Parallax Lerping
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.06;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.06;

      // Animate Ambient Dust
      if (dustPoints && dustBase) {
        const dPos = dustPoints.geometry.attributes.position.array;
        for (let i = 0; i < dustCount; i++) {
          const item = dustBase[i];
          item.theta += item.speed;
          item.y += item.yVel;
          if (item.y > 3.5) item.y = -1.2;

          dPos[i * 3] = Math.sin(item.theta) * item.radius;
          dPos[i * 3 + 1] = item.y + Math.sin(t * 1.5 + i) * 0.08;
          dPos[i * 3 + 2] = Math.cos(item.theta) * item.radius;
        }
        dustPoints.geometry.attributes.position.needsUpdate = true;
      }

      // STATE: IDLE (Gentle floating, breathing & mouse parallax)
      if (!isOpeningRef.current) {
        boxGroup.position.y = Math.sin(t * 1.4) * 0.07;
        boxGroup.rotation.y = Math.sin(t * 0.6) * 0.14 + mousePosRef.current.x * 0.45;
        boxGroup.rotation.x = mousePosRef.current.y * 0.35 + 0.1;

        // Raycasting for cursor & hover
        raycasterRef.current.setFromCamera(mouseCoordsRef.current, camera);
        const intersects = raycasterRef.current.intersectObject(hitBox);
        if (intersects.length > 0) {
          setIsHovered(true);
          canvas.style.cursor = "pointer";
          boxGroup.scale.lerp(new THREE.Vector3(1.03, 1.03, 1.03), 0.1);
        } else {
          setIsHovered(false);
          canvas.style.cursor = "default";
          boxGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      } else {
        // STATE: OPENING SEQUENCE (Elapsed Time in seconds)
        const elapsed = (currentTime - openStartTimeRef.current) / 1000;

        // 1. Ribbon releases & dissolves naturally (0.0s - 0.7s)
        const ribbonProgress = Math.min(Math.max(elapsed / 0.7, 0), 1);
        const ribbonScale = 1 + ribbonProgress * 0.22;
        ribbonGroup.scale.set(ribbonScale, 1.0, ribbonScale);
        goldRibbonMat.opacity = Math.max(1 - ribbonProgress * 1.5, 0);
        goldRibbonMat.transparent = true;

        // 2. Lid rotates upward realistically like a luxury box (0.4s - 2.0s)
        if (elapsed > 0.4) {
          const lidT = Math.min((elapsed - 0.4) / 1.6, 1);
          // Cubic ease-out
          const easeLid = 1 - Math.pow(1 - lidT, 3);

          lidGroup.position.y = boxH / 2 + easeLid * 1.65;
          lidGroup.position.z = -easeLid * 0.95;
          lidGroup.rotation.x = -easeLid * 1.85; // Tilts backwards past 105 degrees
          lidGroup.rotation.z = Math.sin(easeLid * Math.PI) * 0.12;
        }

        // 3. Warm golden light escapes from inside (0.5s - 2.8s)
        if (elapsed > 0.5) {
          const lightT = Math.min((elapsed - 0.5) / 1.8, 1);
          innerLight.intensity = lightT * 28;
          innerSpotLight.intensity = lightT * 35;
        }

        // 4. Particle eruption spreads outward (0.7s - 3.2s)
        if (elapsed > 0.7) {
          burstMat.opacity = Math.min((elapsed - 0.7) * 2.5, 1);
          const bPos = burstPoints.geometry.attributes.position.array;
          const dtBurst = dt * 1.2;

          for (let i = 0; i < burstCount; i++) {
            const vel = burstVelocities[i];
            bPos[i * 3] += vel.vx * dtBurst;
            bPos[i * 3 + 1] += vel.vy * dtBurst;
            bPos[i * 3 + 2] += vel.vz * dtBurst;

            // Upward lift + swirling drag
            vel.vy -= 0.6 * dtBurst;
            vel.vx *= 0.985;
            vel.vz *= 0.985;
          }
          burstPoints.geometry.attributes.position.needsUpdate = true;
        }

        // 5. Camera smoothly zooms into glowing interior (1.3s - 3.2s)
        if (elapsed > 1.3) {
          const zoomT = Math.min((elapsed - 1.3) / 1.8, 1);
          // Ease in-out
          const easeZoom = zoomT < 0.5 ? 2 * zoomT * zoomT : -1 + (4 - 2 * zoomT) * zoomT;

          camera.position.z = 5.4 - easeZoom * 4.3; // Zooms from 5.4 to 1.1
          camera.position.y = 1.25 - easeZoom * 0.85; // Lowers toward interior
          camera.lookAt(0, 0.2, 0);
        }
      }

      renderer.render(scene, camera);
      threeRef.current.animId = requestAnimationFrame(animate);
    };

    threeRef.current.animId = requestAnimationFrame(animate);

    // ─── 6. Event Handlers ───────────────────────────────────────────────────
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
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

    const handleCanvasClick = (e) => {
      if (isOpeningRef.current) return;
      raycasterRef.current.setFromCamera(mouseCoordsRef.current, camera);
      const intersects = raycasterRef.current.intersectObject(hitBox);
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
  }, [handleOpenGift]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 flex flex-col items-center justify-between overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 48%, #4A1021 0%, #350B19 45%, #24050E 80%, #150207 100%)",
      }}
    >
      {/* ── Cinematic Ambient Light Rays (Red Wine & Champagne Gold) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <div
          className="absolute -top-40 left-1/4 w-[600px] h-[900px] rotate-[-22deg] blur-3xl"
          style={{
            background: "linear-gradient(180deg, rgba(214, 165, 109, 0.18) 0%, rgba(128, 31, 58, 0.28) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute -top-40 right-1/4 w-[600px] h-[900px] rotate-[22deg] blur-3xl"
          style={{
            background: "linear-gradient(180deg, rgba(168, 50, 80, 0.22) 0%, rgba(74, 16, 33, 0.35) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Soft Velvet Vignette Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          boxShadow: "inset 0 0 120px rgba(21, 2, 7, 0.9), inset 0 0 60px rgba(36, 5, 14, 0.7)",
        }}
      />

      {/* ── 3D WebGL Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-15"
      />

      {/* ── Top Header & Live Countdown ── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 pt-8 sm:pt-10 px-4 text-center max-w-2xl mx-auto pointer-events-none"
      >
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 backdrop-blur-md"
          style={{
            background: "rgba(53, 11, 25, 0.75)",
            border: "1px solid rgba(214, 165, 109, 0.35)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <Sparkles size={14} className="text-[#D6A56D]" />
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-[#D6A56D] uppercase">
            {countdownGateData.badge || "COUNTDOWN TO YOUR SPECIAL DAY ✨"}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FFF5ED] tracking-wide mb-1"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow: "0 2px 25px rgba(0,0,0,0.8)",
          }}
        >
          {coupleData.partnerName
            ? `Countdown to ${coupleData.partnerName.split(" ")[0]}'s Birthday`
            : "A Special Surprise For You"}
        </h1>

        <p className="text-xs sm:text-sm text-[#FFF5ED]/70 max-w-md mx-auto mb-5 font-light tracking-wide">
          Sesuatu yang sangat indah telah disiapkan khusus untukmu di hari ulang tahunmu.
        </p>

        {/* Countdown Cards Grid (Days, Hours, Minutes, Seconds) */}
        {timeLeft && !timeLeft.isPassed && (
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 pointer-events-auto">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 min-w-[64px] sm:min-w-[76px] rounded-2xl backdrop-blur-md shadow-xl transition-transform hover:scale-105"
                style={{
                  background: "rgba(53, 11, 25, 0.72)",
                  border: "1px solid rgba(214, 165, 109, 0.28)",
                  boxShadow: "0 8px 25px rgba(21, 2, 7, 0.5)",
                }}
              >
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#D6A56D] tabular-nums tracking-tight">
                  {padZero(unit.value)}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#FFF5ED]/65 uppercase mt-0.5">
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
        className="relative z-20 pb-10 sm:pb-12 px-4 text-center pointer-events-auto flex flex-col items-center gap-3"
      >
        {/* Main Action Button */}
        <motion.button
          onClick={handleOpenGift}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isOpening}
          className="group relative inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all shadow-2xl cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #801F3A 0%, #64152D 50%, #4A1021 100%)",
            color: "#FFF5ED",
            border: "1px solid rgba(214, 165, 109, 0.55)",
            boxShadow: "0 10px 40px rgba(128, 31, 58, 0.45), 0 0 25px rgba(214, 165, 109, 0.25)",
          }}
        >
          <Gift size={18} className="text-[#D6A56D] group-hover:rotate-12 transition-transform" />
          <span className="font-semibold text-[#FFF5ED]">
            {isOpening ? "Membuka Kado..." : "Buka Kado Sekarang"}
          </span>
          <Sparkles size={16} className="text-[#D6A56D] animate-pulse" />
        </motion.button>

        {/* Subtle Hint */}
        <p className="text-[11px] sm:text-xs font-mono tracking-wider text-[#D6A56D]/80 uppercase">
          {isHovered ? "Klik untuk membuka kejutan ✨" : "Sentuh atau klik kado 3D untuk membuka kejutan"}
        </p>
      </motion.div>

      {/* ── Golden Cinematic Light Burst Overlay (Appears on Reveal) ── */}
      <AnimatePresence>
        {showBurstOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
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

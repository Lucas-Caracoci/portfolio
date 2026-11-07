"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "./theme-provider";

const etherealVertexShader = `
  attribute vec3 aStage1;
  attribute vec3 aStage2;
  attribute vec3 aStage3;
  attribute float aScale;
  attribute float aSeed;

  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouseWorld;
  uniform float uPixelRatio;
  uniform float uHeroOffsetX;

  varying float vDefocus;
  varying float vSeed;
  varying float vForce;

  vec3 cubicMix(vec3 a, vec3 b, float t) {
    float s = smoothstep(0.0, 1.0, clamp(t, 0.0, 1.0));
    return mix(a, b, s);
  }

  void main() {
    vSeed = aSeed;

    // Stage 0: Ethereal Silk Torus-Knot Sculpture (Hero)
    float heroSpin = uTime * 0.22;
    float cs0 = cos(heroSpin);
    float sn0 = sin(heroSpin);
    vec3 p0 = vec3(
      position.x * cs0 - position.z * sn0 + uHeroOffsetX,
      position.y,
      position.x * sn0 + position.z * cs0
    );

    // Stage 1: Diagonal Astral Stream (Projects)
    vec3 p1 = aStage1;
    p1.x += sin(uTime * 0.35 + aSeed * 6.28) * 0.35;
    p1.y += cos(uTime * 0.28 + p1.x * 0.4) * 0.32;

    // Stage 2: Zero-Gravity Ascending Nebula (Stack & Career)
    vec3 p2 = aStage2;
    p2.y = mod(p2.y + uTime * 0.22 + 5.5, 11.0) - 5.5;
    p2.x += sin(uTime * 0.3 + aSeed * 10.0) * 0.25;

    // Stage 3: Serene Horizon Crown (Contact Footer)
    float ringSpin = -uTime * 0.18;
    float csr = cos(ringSpin);
    float snr = sin(ringSpin);
    vec3 p3 = vec3(
      aStage3.x * csr - aStage3.z * snr,
      aStage3.y + sin(uTime * 0.6 + aStage3.x) * 0.14,
      aStage3.x * snr + aStage3.z * csr
    );

    // Smooth continuous scroll morphing across the 4 spatial chapters
    vec3 pos;
    if (uScroll < 0.33) {
      pos = cubicMix(p0, p1, uScroll / 0.33);
    } else if (uScroll < 0.68) {
      pos = cubicMix(p1, p2, (uScroll - 0.33) / 0.35);
    } else {
      pos = cubicMix(p2, p3, (uScroll - 0.68) / 0.32);
    }

    // Silk-like organic curl breathing
    float silkX = sin(pos.y * 1.35 + uTime * 0.95 + aSeed * 6.28) * 0.14;
    float silkY = cos(pos.x * 1.25 - uTime * 0.8 + aSeed * 4.1) * 0.14;
    float silkZ = sin((pos.x + pos.y) * 1.1 + uTime * 0.75) * 0.16;
    pos += vec3(silkX, silkY, silkZ);

    // Gentle cursor silk swirl & elevation
    float dist = distance(pos.xy, uMouseWorld);
    float force = smoothstep(2.75, 0.0, dist);
    vForce = force;

    vec2 rel = pos.xy - uMouseWorld;
    float swirlAngle = force * 1.15;
    float csm = cos(swirlAngle);
    float snm = sin(swirlAngle);
    vec2 rotated = vec2(rel.x * csm - rel.y * snm, rel.x * snm + rel.y * csm);
    pos.xy = uMouseWorld + rotated + normalize(rel + vec2(0.0001)) * force * 0.42;
    pos.z += force * 0.75;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Optical Depth-of-Field Bokeh calculation (focal plane around z = 6.6)
    float depthDist = abs(-mvPosition.z - 6.6);
    float defocus = clamp(depthDist / 3.4, 0.0, 1.0);
    vDefocus = defocus;

    // Out-of-focus particles expand into dreamy bokeh discs; in-focus stay crisp
    float bokehExpand = 1.0 + defocus * 2.1;
    float baseSize = (13.0 * aScale * bokehExpand + force * 10.0) * uPixelRatio;
    gl_PointSize = clamp(baseSize * (1.0 / max(-mvPosition.z, 1.4)), 1.5, 64.0);
  }
`;

const etherealFragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uIsDark;

  varying float vDefocus;
  varying float vSeed;
  varying float vForce;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;

    // Crisp diamond core when in focus; soft dreamy bokeh disc with subtle lens rim when defocused
    float sharpCore = exp(-d * d * 26.0);
    float softDisc = smoothstep(0.5, 0.12, d);
    float bokehRim = smoothstep(0.32, 0.44, d) * smoothstep(0.5, 0.43, d) * 0.45;
    float shape = mix(sharpCore, softDisc * 0.52 + bokehRim, vDefocus);

    // 3-tone iridescent blend across particles
    vec3 col = mix(uColor1, uColor2, smoothstep(0.15, 0.75, vSeed));
    col = mix(col, uColor3, smoothstep(0.65, 1.0, fract(vSeed * 3.7 + vForce * 0.4)));

    // Defocused particles become gauzier so foreground/background never overpower typography
    float depthFade = mix(0.88, 0.28, vDefocus);
    float lightModeBoost = mix(0.78, 1.0, uIsDark);
    float alpha = shape * depthFade * lightModeBoost + vForce * softDisc * 0.18;

    gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.92));
  }
`;

export function EtherealScene() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const themeTargetRef = useRef<"dark" | "light">(theme);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    themeTargetRef.current = theme;
    const mat = materialRef.current;
    if (mat) {
      mat.blending =
        theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending;
      mat.needsUpdate = true;
    }
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    container.appendChild(renderer.domElement);

    // Precompute 6,500 particles across 4 spatial formations
    const count = 6500;
    const stage0 = new Float32Array(count * 3);
    const stage1 = new Float32Array(count * 3);
    const stage2 = new Float32Array(count * 3);
    const stage3 = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const seeds = new Float32Array(count);

    const ribbonCount = 4800;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const seed = Math.random();
      seeds[i] = seed;
      scales[i] = 0.55 + Math.random() * 0.95;

      // STAGE 0: Ethereal Silk Torus-Knot Ribbon + Gossamer Aura Dust
      if (i < ribbonCount) {
        const t = (i / ribbonCount) * Math.PI * 2 * 2;
        const p = 2;
        const q = 3;
        const rKnot = 1.42 + 0.52 * Math.cos(q * t);
        const tubeAngle = Math.random() * Math.PI * 2;
        const tubeRadius = (0.18 + Math.random() * 0.34) * (0.75 + 0.35 * Math.sin(t * 3.0));

        const cx = rKnot * Math.cos(p * t);
        const cy = rKnot * Math.sin(p * t);
        const cz = 0.72 * Math.sin(q * t);

        stage0[i3] = cx + Math.cos(tubeAngle) * tubeRadius;
        stage0[i3 + 1] = cy * 0.88 + Math.sin(tubeAngle) * tubeRadius;
        stage0[i3 + 2] = cz + (Math.random() - 0.5) * 0.45;
      } else {
        // Ambient bokeh halo motes floating around the sculpture
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const rad = 2.1 + Math.random() * 2.6;
        stage0[i3] = Math.sin(phi) * Math.cos(theta) * rad * 1.25;
        stage0[i3 + 1] = Math.sin(phi) * Math.sin(theta) * rad * 0.95;
        stage0[i3 + 2] = Math.cos(phi) * rad;
      }

      // STAGE 1: Panoramic Diagonal Astral Stream (Projects)
      const u1 = (i / count) * 2 - 1; // -1 to 1
      const streamSpread = (Math.random() - 0.5) * 2.6;
      stage1[i3] = u1 * 6.8 + (Math.random() - 0.5) * 0.8;
      stage1[i3 + 1] =
        -u1 * 2.1 + Math.sin(u1 * 3.4) * 0.95 + streamSpread * 0.85;
      stage1[i3 + 2] =
        Math.cos(u1 * 2.6 + seed * 4.0) * 1.9 + (Math.random() - 0.5) * 1.8;

      // STAGE 2: Zero-Gravity Ascending Constellation (Stack & Career)
      stage2[i3] = (Math.random() - 0.5) * 13.5;
      stage2[i3 + 1] = (Math.random() - 0.5) * 10.5;
      stage2[i3 + 2] = (Math.random() - 0.5) * 5.2;

      // STAGE 3: Serene Celestial Horizon Ring (Contact Footer)
      const ringA = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const ringR = 2.65 + (Math.random() - 0.5) * 1.15;
      stage3[i3] = Math.cos(ringA) * ringR * 1.35;
      stage3[i3 + 1] =
        (Math.random() - 0.5) * 0.65 + Math.sin(ringA * 2.0) * 0.28 - 0.2;
      stage3[i3 + 2] = Math.sin(ringA) * ringR * 0.95;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(stage0, 3));
    geometry.setAttribute("aStage1", new THREE.BufferAttribute(stage1, 3));
    geometry.setAttribute("aStage2", new THREE.BufferAttribute(stage2, 3));
    geometry.setAttribute("aStage3", new THREE.BufferAttribute(stage3, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const isDarkInit = document.documentElement.classList.contains("dark");

    const darkC1 = new THREE.Color("#F8FAFC"); // Luminous Pearl
    const darkC2 = new THREE.Color("#C4B5FD"); // Silver Lavender
    const darkC3 = new THREE.Color("#93C5FD"); // Celestial Blue

    const lightC1 = new THREE.Color("#4338CA"); // Astral Indigo
    const lightC2 = new THREE.Color("#8B5CF6"); // Silk Violet
    const lightC3 = new THREE.Color("#0284C7"); // Crystal Sky

    const material = new THREE.ShaderMaterial({
      vertexShader: etherealVertexShader,
      fragmentShader: etherealFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: isDarkInit ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouseWorld: { value: new THREE.Vector2(99, 99) },
        uPixelRatio: { value: dpr },
        uHeroOffsetX: { value: width >= 1024 ? 1.35 : 0.0 },
        uColor1: { value: (isDarkInit ? darkC1 : lightC1).clone() },
        uColor2: { value: (isDarkInit ? darkC2 : lightC2).clone() },
        uColor3: { value: (isDarkInit ? darkC3 : lightC3).clone() },
        uIsDark: { value: isDarkInit ? 1.0 : 0.0 },
      },
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let elapsed = 0;
    let lastNow = performance.now();
    let rafId: number | null = null;
    let contextLost = false;

    const targetMouse = { x: 0, y: 0, active: false };
    const currentMouse = { x: 99, y: 99 };
    const currentCamParallax = { x: 0, y: 0 };
    let targetScroll = 0;

    const updateScrollProgress = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      targetScroll = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const w = Math.max(window.innerWidth, 1);
      const h = Math.max(window.innerHeight, 1);
      const nx = (e.clientX / w) * 2 - 1;
      const ny = -((e.clientY / h) * 2 - 1);
      const aspect = w / h;
      const halfH = Math.tan(THREE.MathUtils.degToRad(46 * 0.5)) * 6.8;
      const halfW = halfH * aspect;
      targetMouse.x = nx * halfW;
      targetMouse.y = ny * halfH;
      targetMouse.active = true;
    };

    const render = () => {
      if (document.hidden || contextLost) {
        rafId = null;
        return;
      }

      const now = performance.now();
      const dt = Math.min((now - lastNow) * 0.001, 0.05);
      lastNow = now;
      elapsed += dt;

      material.uniforms.uTime.value = elapsed;

      // Smoothly interpolate scroll morphing
      material.uniforms.uScroll.value +=
        (targetScroll - material.uniforms.uScroll.value) * 0.065;

      // Smoothly interpolate 3-tone iridescent palette on theme switch
      const wantDark = themeTargetRef.current === "dark";
      const tGoal1 = wantDark ? darkC1 : lightC1;
      const tGoal2 = wantDark ? darkC2 : lightC2;
      const tGoal3 = wantDark ? darkC3 : lightC3;
      material.uniforms.uColor1.value.lerp(tGoal1, 0.08);
      material.uniforms.uColor2.value.lerp(tGoal2, 0.08);
      material.uniforms.uColor3.value.lerp(tGoal3, 0.08);
      material.uniforms.uIsDark.value +=
        ((wantDark ? 1.0 : 0.0) - material.uniforms.uIsDark.value) * 0.08;

      if (targetMouse.active) {
        currentMouse.x += (targetMouse.x - currentMouse.x) * 0.09;
        currentMouse.y += (targetMouse.y - currentMouse.y) * 0.09;
        material.uniforms.uMouseWorld.value.set(currentMouse.x, currentMouse.y);

        currentCamParallax.x += (targetMouse.x * 0.045 - currentCamParallax.x) * 0.05;
        currentCamParallax.y += (targetMouse.y * 0.045 - currentCamParallax.y) * 0.05;
        camera.position.x = currentCamParallax.x;
        camera.position.y = currentCamParallax.y;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    const start = () => {
      if (rafId === null && !document.hidden && !contextLost) {
        lastNow = performance.now();
        rafId = requestAnimationFrame(render);
      }
    };

    const stop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      stop();
    };

    const handleContextRestored = () => {
      contextLost = false;
      start();
    };

    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", handleContextRestored);

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth || window.innerWidth;
      const newH = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      material.uniforms.uHeroOffsetX.value = newW >= 1024 ? 1.35 : 0.0;
      updateScrollProgress();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    updateScrollProgress();
    start();

    return () => {
      materialRef.current = null;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", handleContextRestored);
      stop();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Volumetric Atmospheric Mist Halos (eliminates any flat background feeling) */}
      <div
        className="absolute -top-32 -left-24 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-40 dark:opacity-25 transition-colors duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(167, 139, 250, 0.34) 0%, rgba(129, 140, 248, 0.08) 55%, transparent 75%)",
        }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[46rem] h-[46rem] rounded-full blur-3xl opacity-45 dark:opacity-25 transition-colors duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(147, 197, 253, 0.32) 0%, rgba(196, 181, 253, 0.1) 52%, transparent 74%)",
        }}
      />
      <div
        className="absolute -bottom-40 left-1/3 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-35 dark:opacity-20 transition-colors duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(240, 171, 252, 0.24) 0%, rgba(99, 102, 241, 0.08) 55%, transparent 75%)",
        }}
      />

      {/* Full-Viewport Continuous WebGL Bokeh Particle Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

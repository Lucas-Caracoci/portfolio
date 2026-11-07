"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDownRight, Copy, Check } from "lucide-react";
import { useTheme } from "./theme-provider";

const morphVertexShader = `
  attribute vec3 aScatter;
  attribute float aScale;
  attribute float aMix;
  attribute float aIsRing;

  uniform float uTime;
  uniform float uExplode;
  uniform vec3 uMouse3D;
  uniform float uPixelRatio;

  varying float vMix;
  varying float vAlpha;

  void main() {
    vMix = aMix;

    // Counter-rotation between core Fibonacci sphere and outer orbital ring
    float spinDir = aIsRing > 0.5 ? -0.55 : 0.38;
    float angle = uTime * spinDir + position.y * (aIsRing > 0.5 ? 0.15 : 0.45);
    float s = sin(angle);
    float c = cos(angle);
    vec3 pos = vec3(
      position.x * c - position.z * s,
      position.y,
      position.x * s + position.z * c
    );

    // Multi-harmonic organic breathing waves across the sculpture
    float wave1 = sin(pos.x * 2.4 + uTime * 2.1) * cos(pos.y * 2.4 - uTime * 1.7) * 0.18;
    float wave2 = sin(pos.z * 3.2 - uTime * 1.4) * 0.08;
    pos += normalize(pos + vec3(0.0001)) * (wave1 + wave2);

    // Scroll dispersion: sphere dissolves and expands into space as user scrolls down
    float easeExplode = smoothstep(0.0, 1.0, uExplode);
    pos = mix(pos, pos * 1.7 + aScatter * 5.2, easeExplode);

    // 3D Cursor magnetic repulsion & swirl wave
    float distMouse = distance(pos.xy, uMouse3D.xy);
    float force = smoothstep(2.1, 0.0, distMouse);
    vec2 rel = pos.xy - uMouse3D.xy;
    float swirl = force * 1.1;
    float cs = cos(swirl);
    float sn = sin(swirl);
    vec2 swirled = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs);
    pos.xy = uMouse3D.xy + swirled + normalize(rel + vec2(0.0001)) * force * 0.68;
    pos.z += force * 0.85;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float size = (18.0 * aScale + force * 14.0) * uPixelRatio;
    gl_PointSize = size * (1.0 / max(-mvPosition.z, 1.2));

    vAlpha = (0.84 + force * 0.16) * (1.0 - easeExplode * 0.32);
  }
`;

const morphFragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vMix;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float softEdge = smoothstep(0.5, 0.08, d);
    vec3 color = mix(uColorA, uColorB, vMix);

    gl_FragColor = vec4(color, softEdge * vAlpha);
  }
`;

export function HeroParticleMorph() {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  // Magnetic button springs
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const springX = useSpring(btnX, { stiffness: 320, damping: 22, mass: 0.6 });
  const springY = useSpring(btnY, { stiffness: 320, damping: 22, mass: 0.6 });

  // Update WebGL particle colors smoothly when theme toggles
  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;
    if (theme === "dark") {
      mat.uniforms.uColorA.value.set("#D2FF00"); // Acid Volt
      mat.uniforms.uColorB.value.set("#3A5BFF"); // Electric Klein
    } else {
      mat.uniforms.uColorA.value.set("#1D3BFF"); // Electric Klein
      mat.uniforms.uColorB.value.set("#0B0D14"); // Deep Ink
    }
  }, [theme]);

  // GSAP Entrance Reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".h1-morph-reveal",
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.06,
          ease: "power4.out",
          delay: 0.05,
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  // Three.js Particle Sculpture Engine
  useEffect(() => {
    const section = sectionRef.current;
    const container = canvasWrapRef.current;
    if (!section || !container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.6);

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

    // Build 5,400 particles (4,000 Fibonacci sphere + 1,400 orbital ring)
    const count = 5400;
    const positions = new Float32Array(count * 3);
    const scatters = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const mixes = new Float32Array(count);
    const isRings = new Float32Array(count);

    const sphereCount = 4000;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      if (i < sphereCount) {
        const y = 1 - (i / (sphereCount - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;
        const r = 1.82 + (Math.random() - 0.5) * 0.09;

        positions[i3] = Math.cos(theta) * radiusAtY * r;
        positions[i3 + 1] = y * r;
        positions[i3 + 2] = Math.sin(theta) * radiusAtY * r;
        mixes[i] = (y + 1) * 0.5;
        scales[i] = 0.7 + Math.random() * 0.8;
        isRings[i] = 0.0;
      } else {
        // Tilted orbital ring
        const angle = Math.random() * Math.PI * 2;
        const ringR = 2.55 + (Math.random() - 0.5) * 0.4;
        positions[i3] = Math.cos(angle) * ringR;
        positions[i3 + 1] = (Math.random() - 0.5) * 0.24 + Math.sin(angle * 2.0) * 0.32;
        positions[i3 + 2] = Math.sin(angle) * ringR;
        mixes[i] = 0.12;
        scales[i] = 0.55 + Math.random() * 0.65;
        isRings[i] = 1.0;
      }

      // Random dispersion vector for scroll dissolve
      const sTheta = Math.random() * Math.PI * 2;
      const sPhi = Math.acos(2 * Math.random() - 1);
      const sDist = 0.6 + Math.random() * 1.5;
      scatters[i3] = Math.sin(sPhi) * Math.cos(sTheta) * sDist;
      scatters[i3 + 1] = Math.sin(sPhi) * Math.sin(sTheta) * sDist;
      scatters[i3 + 2] = Math.cos(sPhi) * sDist;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatters, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aMix", new THREE.BufferAttribute(mixes, 1));
    geometry.setAttribute("aIsRing", new THREE.BufferAttribute(isRings, 1));

    const isDarkNow = document.documentElement.classList.contains("dark");
    const material = new THREE.ShaderMaterial({
      vertexShader: morphVertexShader,
      fragmentShader: morphFragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uExplode: { value: 0 },
        uMouse3D: { value: new THREE.Vector3(99, 99, 0) },
        uPixelRatio: { value: dpr },
        uColorA: {
          value: new THREE.Color(isDarkNow ? "#D2FF00" : "#1D3BFF"),
        },
        uColorB: {
          value: new THREE.Color(isDarkNow ? "#3A5BFF" : "#0B0D14"),
        },
      },
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    const updateMeshOffset = (w: number) => {
      points.position.x = w >= 1024 ? 1.55 : 0;
    };
    updateMeshOffset(width);
    scene.add(points);

    let elapsed = 0;
    let lastNow = performance.now();
    let rafId: number | null = null;
    let isVisible = true;
    let contextLost = false;

    const targetMouse = { x: 99, y: 99 };
    const currentMouse = { x: 99, y: 99 };
    let targetExplode = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1);
      const aspect = rect.width / Math.max(rect.height, 1);
      const halfH = Math.tan(THREE.MathUtils.degToRad(45 * 0.5)) * 6.6;
      const halfW = halfH * aspect;
      targetMouse.x = nx * halfW - points.position.x;
      targetMouse.y = ny * halfH;
    };

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      const scrolled = Math.max(-rect.top, 0);
      targetExplode = Math.min(scrolled / (vh * 0.82), 1);
    };

    const render = () => {
      if (!isVisible || document.hidden || contextLost) {
        rafId = null;
        return;
      }

      const now = performance.now();
      const dt = Math.min((now - lastNow) * 0.001, 0.05);
      lastNow = now;
      elapsed += dt;

      material.uniforms.uTime.value = elapsed;

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.12;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.12;
      material.uniforms.uMouse3D.value.set(currentMouse.x, currentMouse.y, 0);

      material.uniforms.uExplode.value +=
        (targetExplode - material.uniforms.uExplode.value) * 0.1;

      points.rotation.x = Math.sin(elapsed * 0.45) * 0.24;
      points.rotation.z = Math.cos(elapsed * 0.35) * 0.16;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    const start = () => {
      if (rafId === null && isVisible && !document.hidden && !contextLost) {
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

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0.01 }
    );
    observer.observe(section);

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const handleResize = () => {
      if (!canvasWrapRef.current) return;
      const newW = canvasWrapRef.current.clientWidth || window.innerWidth;
      const newH = canvasWrapRef.current.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      updateMeshOffset(newW);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    handleScroll();
    start();

    return () => {
      materialRef.current = null;
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
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

  const handleCopy = () => {
    navigator.clipboard.writeText("lucascaracoci2@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const scrollTo = (id: string) => {
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: id } })
    );
  };

  return (
    <section
      ref={sectionRef}
      id="hero-1"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-14 px-4 sm:px-8 overflow-hidden border-b border-[var(--border-subtle)]"
    >
      {/* Interactive 3D Particle Sphere Canvas */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-8">
          {/* Option Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full v3-glass text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-main)] animate-pulse" />
            <span className="font-semibold">HERO 01 • ESCULTURA DE PARTÍCULAS 3D</span>
            <span className="text-[var(--fg-muted)] hidden sm:inline">
              (Mova o mouse e role a página)
            </span>
          </div>

          {/* Crisp, Objective Headline */}
          <h1
            aria-label="Lucas Caracoci — Desenvolvedor Full-Stack"
            className="text-6xl sm:text-8xl font-bold tracking-tight leading-none"
          >
            <span className="block overflow-hidden pb-1" aria-hidden="true">
              <span className="h1-morph-reveal inline-block">Lucas</span>
            </span>
            <span className="block overflow-hidden pb-2" aria-hidden="true">
              <span className="h1-morph-reveal inline-block text-[var(--accent-main)]">
                Caracoci.
              </span>
            </span>
          </h1>

          {/* Short, Simple, Non-AI Copy */}
          <p className="text-lg sm:text-2xl text-[var(--fg-muted)] max-w-lg leading-relaxed font-normal text-pretty">
            Engenheiro de Software Full-Stack. Desenvolvo sistemas web rápidos, seguros e prontos
            para uso intenso com{" "}
            <strong className="text-[var(--fg-primary)] font-semibold">
              Laravel, React e PostgreSQL
            </strong>
            .
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <motion.button
              type="button"
              style={{ x: springX, y: springY }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                btnX.set((e.clientX - (rect.left + rect.width / 2)) * 0.24);
                btnY.set((e.clientY - (rect.top + rect.height / 2)) * 0.24);
              }}
              onMouseLeave={() => {
                btnX.set(0);
                btnY.set(0);
              }}
              onClick={() => scrollTo("projects")}
              className="group px-6 py-3.5 rounded-full bg-[var(--accent-main)] text-[var(--accent-fg)] font-semibold text-base flex items-center gap-2 cursor-pointer active:scale-[0.97] shadow-lg"
            >
              <span>Ver projetos</span>
              <ArrowDownRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </motion.button>

            <button
              type="button"
              onClick={() => scrollTo("hero-2")}
              className="px-5 py-3.5 rounded-full v3-glass text-xs font-mono font-semibold uppercase tracking-wider hover:border-[var(--accent-main)] cursor-pointer active:scale-[0.97]"
            >
              Comparar com Hero 02 ↓
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="px-5 py-3.5 rounded-full v3-surface text-xs font-mono font-semibold uppercase tracking-wider hover:border-[var(--accent-main)] flex items-center gap-2 cursor-pointer active:scale-[0.97] min-w-[144px] justify-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.14 }}
                    className="flex items-center gap-1.5 text-emerald-500"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.14 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 text-[var(--accent-main)]" />
                    <span>E-mail</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Bottom Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
        <span>ARRAIAL DO CABO, RJ</span>
        <span>OPÇÃO 01 DE 02 • ROLE PARA VER A HERO 02 ↓</span>
      </div>
    </section>
  );
}

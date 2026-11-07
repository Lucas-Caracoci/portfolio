"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Copy, Check } from "lucide-react";
import { useTheme } from "./theme-provider";

gsap.registerPlugin(ScrollTrigger);

const flowVertexShader = `
  attribute float aSeed;
  uniform float uTime;
  uniform vec2 uMouseWorld;
  uniform float uPixelRatio;

  varying float vElevation;
  varying float vMouseForce;

  void main() {
    vec3 pos = position;

    // Multi-layered organic 3D flow waves (Curl-like topography)
    float w1 = sin(pos.x * 0.58 + uTime * 1.25 + aSeed * 1.6);
    float w2 = cos(pos.y * 0.68 - uTime * 0.95 + pos.x * 0.28);
    float w3 = sin((pos.x + pos.y) * 0.85 + uTime * 1.55);
    float elevation = (w1 * 0.55 + w2 * 0.48 + w3 * 0.28);

    // Magnetic vortex & ripple around cursor
    float dist = distance(pos.xy, uMouseWorld);
    float force = smoothstep(2.9, 0.0, dist);
    float swirlAngle = force * 2.3;
    vec2 rel = pos.xy - uMouseWorld;
    float cs = cos(swirlAngle);
    float sn = sin(swirlAngle);
    pos.xy = uMouseWorld + vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs);
    pos.xy += normalize(rel + vec2(0.0001)) * force * 0.42;

    pos.z += elevation + force * 1.3;

    vElevation = clamp((elevation + 1.1) * 0.48, 0.0, 1.0);
    vMouseForce = force;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float baseSize = (14.0 + vElevation * 10.0 + force * 16.0) * uPixelRatio;
    gl_PointSize = baseSize * (1.0 / max(-mvPosition.z, 1.5));
  }
`;

const flowFragmentShader = `
  uniform vec3 uColorCrest;
  uniform vec3 uColorBase;
  varying float vElevation;
  varying float vMouseForce;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.08, d) * (0.48 + vElevation * 0.48 + vMouseForce * 0.35);
    vec3 color = mix(uColorBase, uColorCrest, clamp(vElevation * 0.88 + vMouseForce * 0.75, 0.0, 1.0));

    gl_FragColor = vec4(color, alpha);
  }
`;

export function HeroParticleFlow() {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  // Sync particle wave colors on Light/Dark switch
  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;
    if (theme === "dark") {
      mat.uniforms.uColorCrest.value.set("#D2FF00"); // Acid Volt crests
      mat.uniforms.uColorBase.value.set("#2B4CFF"); // Electric Klein valleys
    } else {
      mat.uniforms.uColorCrest.value.set("#1D3BFF"); // Electric Klein crests
      mat.uniforms.uColorBase.value.set("#0F172A"); // Deep Slate valleys
    }
  }, [theme]);

  // GSAP Scroll Entrance Choreography for Hero 02
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".h2-flow-reveal",
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const container = canvasWrapRef.current;
    if (!section || !container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, -3.6, 6.8);
    camera.lookAt(0, 0.4, 0);

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

    // 96 x 68 grid = 6,528 flowing particles
    const cols = 96;
    const rows = 68;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    const spanX = 18;
    const spanY = 12;
    let idx = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i3 = idx * 3;
        positions[i3] = (c / (cols - 1) - 0.5) * spanX + (Math.random() - 0.5) * 0.08;
        positions[i3 + 1] = (r / (rows - 1) - 0.5) * spanY + (Math.random() - 0.5) * 0.08;
        positions[i3 + 2] = 0;
        seeds[idx] = Math.random();
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const isDarkNow = document.documentElement.classList.contains("dark");
    const material = new THREE.ShaderMaterial({
      vertexShader: flowVertexShader,
      fragmentShader: flowFragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMouseWorld: { value: new THREE.Vector2(99, 99) },
        uPixelRatio: { value: dpr },
        uColorCrest: {
          value: new THREE.Color(isDarkNow ? "#D2FF00" : "#1D3BFF"),
        },
        uColorBase: {
          value: new THREE.Color(isDarkNow ? "#2B4CFF" : "#0F172A"),
        },
      },
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let elapsed = 0;
    let lastNow = performance.now();
    let rafId: number | null = null;
    let isVisible = true;
    let contextLost = false;

    const targetMouse = { x: 99, y: 99 };
    const currentMouse = { x: 99, y: 99 };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY < rect.top - 100 || e.clientY > rect.bottom + 100) return;
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1);
      targetMouse.x = nx * 7.2;
      targetMouse.y = ny * 4.8;
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

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.1;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.1;
      material.uniforms.uMouseWorld.value.set(currentMouse.x, currentMouse.y);

      // Subtle camera drift with cursor
      camera.position.x = (currentMouse.x < 50 ? currentMouse.x : 0) * 0.09;
      camera.lookAt(0, 0.4, 0);

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
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    start();

    return () => {
      materialRef.current = null;
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
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
      id="hero-2"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-14 px-4 sm:px-8 overflow-hidden border-b border-[var(--border-subtle)]"
    >
      {/* Full-Screen 3D Magnetic Particle Wave Canvas */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full v3-glass text-xs font-mono mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-main)] animate-pulse" />
          <span className="font-semibold">HERO 02 • CAMPO DE FLUXO MAGNÉTICO 3D</span>
          <span className="text-[var(--fg-muted)] hidden sm:inline">
            (Passe o cursor pelas ondas)
          </span>
        </div>

        <h2
          aria-label="Lucas Caracoci"
          className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight leading-none mb-6"
        >
          <span className="inline-block overflow-hidden pb-2" aria-hidden="true">
            <span className="h2-flow-reveal inline-block">Lucas</span>
          </span>{" "}
          <span className="inline-block overflow-hidden pb-2" aria-hidden="true">
            <span className="h2-flow-reveal inline-block text-[var(--accent-main)]">
              Caracoci
            </span>
          </span>
        </h2>

        <p className="text-lg sm:text-2xl text-[var(--fg-muted)] max-w-xl leading-relaxed mb-8 text-balance">
          Engenheiro de Software Full-Stack.{" "}
          <span className="text-[var(--fg-primary)] font-medium">
            Arquitetura limpa, dados íntegros e interfaces diretas.
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo("projects")}
            className="group px-6 py-3.5 rounded-full bg-[var(--accent-main)] text-[var(--accent-fg)] font-semibold text-base flex items-center gap-2 cursor-pointer active:scale-[0.97] shadow-lg"
          >
            <span>Explorar projetos</span>
            <ArrowDownRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="px-5 py-3.5 rounded-full v3-glass text-xs font-mono font-semibold uppercase tracking-wider hover:border-[var(--accent-main)] flex items-center gap-2 cursor-pointer active:scale-[0.97] min-w-[152px] justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied-2"
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
                  key="copy-2"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.14 }}
                  className="flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-[var(--accent-main)]" />
                  <span>Copiar e-mail</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
        <span>LARAVEL • REACT 19 • NEXT.JS • POSTGRESQL</span>
        <span>OPÇÃO 02 DE 02 • PROJETOS ABAIXO ↓</span>
      </div>
    </section>
  );
}

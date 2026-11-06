"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  varying vec2 vUv;

  // 2D Simplex Noise generator
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractional Brownian Motion for fluid turbulence
  float fbm(vec2 p) {
    float total = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      total += snoise(p) * amplitude;
      p *= 2.05;
      amplitude *= 0.5;
    }
    return total;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 mouseOffset = (u_mouse - 0.5) * 0.45;
    vec2 pos = st * 1.6 - mouseOffset;

    float t = u_time * 0.18;

    // Organic Domain Warping
    vec2 q = vec2(fbm(pos + vec2(0.0, t * 0.2)), fbm(pos + vec2(5.2, 1.3 - t * 0.15)));
    vec2 r = vec2(fbm(pos + 3.0 * q + vec2(1.7 - t * 0.1, 9.2)), fbm(pos + 3.0 * q + vec2(8.3, 2.8 + t * 0.12)));

    float f = fbm(pos + 4.0 * r);

    // Color Palette inspired by reference video:
    // Void base -> Royal Cobalt -> Electric Cyan -> Soft Aqua Glow
    vec3 voidBlack = vec3(0.012, 0.027, 0.071);   // #030712
    vec3 deepCobalt = vec3(0.08, 0.22, 0.72);    // #1438b8
    vec3 electricCyan = vec3(0.0, 0.96, 1.0);     // #00F5FF
    vec3 brightMint = vec3(0.65, 0.97, 0.92);     // #A7F7EB

    vec3 color = voidBlack;

    // Layered color blend based on noise field
    color = mix(color, deepCobalt, clamp(f * f * 2.8, 0.0, 1.0));
    color = mix(color, electricCyan, clamp(pow(r.x, 2.0) * 1.6, 0.0, 1.0));
    color = mix(color, brightMint, clamp(pow(q.y, 3.0) * 1.8, 0.0, 1.0));

    // Focal luminous core on the left/center as in reference video
    float distFromCore = length(st - vec2(0.35 + mouseOffset.x * 0.4, 0.55 + mouseOffset.y * 0.4));
    float vignette = smoothstep(1.35, 0.2, distFromCore);
    color *= vignette * 1.15;

    // Edge fading so content remains crisp and legible
    float edgeDarkening = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
    color *= (0.4 + 0.6 * edgeDarkening);

    // Subtle film grain to eliminate 8-bit banding on dark gradients
    float noise = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453) - 0.5) * 0.025;
    color += noise;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function HeroShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Renderer setup
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        powerPreference: "high-performance",
        antialias: false,
        alpha: false,
      });
    } catch {
      // Graceful fallback if WebGL is unavailable
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);

    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Target mouse with spring/LERP smoothing
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w * dpr, h * dpr);
    };

    window.addEventListener("resize", handleResize);

    // IntersectionObserver to shut down GPU loop when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || prefersReducedMotion) {
        return;
      }

      const delta = (currentTime - lastTime) * 0.001;
      lastTime = currentTime;

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      uniforms.u_time.value += delta;
      uniforms.u_mouse.value.set(currentMouseX, currentMouseY);

      renderer?.render(scene, camera);
    };

    // Render single initial frame
    renderer.render(scene, camera);

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover opacity-90 transition-opacity duration-700"
      />
      {/* Subtle vignette radial mask to guarantee text readability */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#030712]/90 pointer-events-none" />
    </div>
  );
}

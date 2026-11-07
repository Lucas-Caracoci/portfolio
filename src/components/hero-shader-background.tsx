"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uDimming;
  uniform float uDotIntensity;
  uniform float uScroll;
  varying vec2 vUv;

  // Ashima 2D Simplex Noise
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

  void main() {
      vec2 uv = vUv;
      vec2 fragCoord = vUv * uResolution;
      
      vec2 mouseOffset = (uMouse - 0.5) * 0.05;
      
      // 1. GRADIENTE FLUIDO ("Kura" distortion + 5 stops de cor)
      float n1 = snoise(vec2((uv.x + mouseOffset.x) * 1.4 - uTime * 0.12, (uv.y + mouseOffset.y) * 1.4 + uTime * 0.08));
      float n2 = snoise(vec2(uv.x * 3.2 + uTime * 0.18, uv.y * 2.8 - uTime * 0.14));
      
      float flow = uv.x + n1 * 0.32 + n2 * 0.12;
      
      vec3 c1 = vec3(0.85, 0.98, 1.00); // Branco Ciano brilhante (esquerda)
      vec3 c2 = vec3(0.00, 0.85, 0.92); // Turquesa / Ciano vibrante
      vec3 c3 = vec3(0.05, 0.45, 0.95); // Azul Royal médio
      vec3 c4 = vec3(0.06, 0.12, 0.42); // Azul Índigo escuro
      vec3 c5 = vec3(0.008, 0.008, 0.012); // #020203 (Fundo quase preto à direita)
      
      vec3 gradColor = mix(c1, c2, smoothstep(0.05, 0.25, flow));
      gradColor = mix(gradColor, c3, smoothstep(0.22, 0.42, flow));
      gradColor = mix(gradColor, c4, smoothstep(0.38, 0.62, flow));
      gradColor = mix(gradColor, c5, smoothstep(0.55, 0.82, flow));

      // Faz a transição suave do gradiente para #020203 ao descer da Hero, mantendo a grelha viva
      float heroStrength = 1.0 - smoothstep(0.0, 0.85, uScroll);
      vec3 color = mix(c5, gradColor, heroStrength);

      // 2. PATTERNS: DOT GRID ANIMADA (Distance: 24px, Dot size: 3px, Blend: Normal, Noise: Ridged ↓)
      float spacing = 24.0;
      vec2 gridPos = mod(fragCoord, spacing) - spacing * 0.5;
      float dist = length(gridPos);
      
      float dotShape = 1.0 - smoothstep(1.1, 1.9, dist);
      
      // Coordenada com o movimento descendente (Direction: ↓, Speed: 69, Size: 450)
      vec2 patternUv = fragCoord / 420.0;
      patternUv.y += uTime * 0.24;
      patternUv.x -= uTime * 0.04;
      
      float rawNoise = snoise(patternUv);
      float ridged = 1.0 - abs(rawNoise);
      ridged = pow(ridged, 1.6);
      
      float dotMask = smoothstep(0.12, 0.88, ridged);
      float dotAlpha = dotShape * (0.06 + 0.82 * dotMask) * uDotIntensity;
      
      color = mix(color, vec3(1.0), dotAlpha);
      color *= (1.0 - uDimming);
      
      gl_FragColor = vec4(color, 1.0);
  }
`;

interface FluidBackgroundProps {
  dimming?: number;
  dotIntensity?: number;
}

export function FluidBackground({
  dimming = 0.05,
  dotIntensity = 1.0,
}: FluidBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uDimming: { value: dimming },
      uDotIntensity: { value: dotIntensity },
      uScroll: { value: 0 },
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

    let animationFrameId: number | null = null;
    const clock = new THREE.Clock();
    const targetMouse = { x: 0.5, y: 0.5 };
    let targetScroll = 0;

    const handlePointerMove = (e: PointerEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    };

    const handleScroll = () => {
      const vh = Math.max(window.innerHeight, 1);
      targetScroll = Math.min(Math.max(window.scrollY / vh, 0), 1.2);
    };

    const render = () => {
      if (document.hidden) {
        animationFrameId = null;
        return;
      }
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.x += (targetMouse.x - uniforms.uMouse.value.x) * 0.05;
      uniforms.uMouse.value.y += (targetMouse.y - uniforms.uMouse.value.y) * 0.05;
      uniforms.uScroll.value += (targetScroll - uniforms.uScroll.value) * 0.08;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clock.stop();
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        clock.start();
        if (animationFrameId === null) {
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    handleScroll();
    render();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newW = mountRef.current.clientWidth || window.innerWidth;
      const newH = mountRef.current.clientHeight || window.innerHeight;
      renderer.setSize(newW, newH);
      uniforms.uResolution.value.set(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [dimming, dotIntensity]);

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
}

export const HeroShaderBackground = FluidBackground;

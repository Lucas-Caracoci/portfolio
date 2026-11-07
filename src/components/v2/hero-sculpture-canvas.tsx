"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const sculptureVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const sculptureFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Studio key light + warm bounce light
    vec3 keyLight = normalize(vec3(1.2, 1.6, 1.4));
    vec3 fillLight = normalize(vec3(-1.4, -0.8, 0.6));

    float diffKey = max(dot(normal, keyLight), 0.0);
    float diffFill = max(dot(normal, fillLight), 0.0);

    // Fresnel rim effect for International Orange (#FF3B00)
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.6);

    // Subtle machined anodized rings along the torus knot UV
    float grooves = sin(vUv.x * 160.0 + uTime * 2.0) * 0.035;

    vec3 baseCarbon = vec3(0.09, 0.09, 0.085);
    vec3 warmStudioHighlight = vec3(0.96, 0.94, 0.90);
    vec3 vermilionRim = vec3(1.0, 0.231, 0.0); // #FF3B00

    // Specular highlight (Blinn-Phong)
    vec3 halfDir = normalize(keyLight + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 42.0);

    vec3 color = baseCarbon;
    color = mix(color, vec3(0.22, 0.21, 0.20), diffKey * 0.65 + grooves);
    color += vermilionRim * (fresnel * 1.15 + diffFill * 0.22);
    color += warmStudioHighlight * spec * 0.55;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function HeroSculptureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 520;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

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

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Group holding the entire kinetic sculpture
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central Parametric TorusKnot with Studio Fresnel Shader
    const knotGeo = new THREE.TorusKnotGeometry(1.12, 0.34, 200, 36, 2, 3);
    const knotUniforms = {
      uTime: { value: 0 },
    };
    const knotMat = new THREE.ShaderMaterial({
      vertexShader: sculptureVertexShader,
      fragmentShader: sculptureFragmentShader,
      uniforms: knotUniforms,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    rootGroup.add(knotMesh);

    // 2. Outer Gyroscopic Vermilion Ring (#FF3B00)
    const ringGeo = new THREE.TorusGeometry(2.05, 0.032, 24, 140);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff3b00 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI * 0.35;
    ringMesh.rotation.y = Math.PI * 0.15;
    rootGroup.add(ringMesh);

    // 3. Secondary Graphite Precision Ring
    const innerRingGeo = new THREE.TorusGeometry(1.68, 0.018, 20, 120);
    const innerRingMat = new THREE.MeshBasicMaterial({ color: 0x141413 });
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.rotation.x = -Math.PI * 0.28;
    rootGroup.add(innerRingMesh);

    // 4. Orbiting Satellites (Spheres on the rings)
    const satGeo = new THREE.SphereGeometry(0.11, 24, 24);
    const satOrangeMat = new THREE.MeshBasicMaterial({ color: 0xff3b00 });
    const satDarkMat = new THREE.MeshBasicMaterial({ color: 0x111111 });

    const sat1 = new THREE.Mesh(satGeo, satOrangeMat);
    const sat2 = new THREE.Mesh(satGeo, satDarkMat);
    rootGroup.add(sat1);
    rootGroup.add(sat2);

    const clock = new THREE.Clock();
    let rafId: number | null = null;
    let isVisible = true;

    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };
    let extraSpin = 0;

    const handlePointerMove = (e: PointerEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const render = () => {
      if (!isVisible || document.hidden) {
        rafId = null;
        return;
      }

      const elapsed = clock.getElapsedTime();
      knotUniforms.uTime.value = elapsed;

      // Read Lenis scroll velocity to accelerate sculpture rotation on scroll
      const velocity = window.__lenisVelocity ?? 0;
      extraSpin += Math.min(Math.abs(velocity) * 0.0025, 0.12);

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;

      // Smoothly tilt entire sculpture toward cursor
      rootGroup.rotation.y = currentMouse.x * 0.45 + elapsed * 0.28 + extraSpin * 0.4;
      rootGroup.rotation.x = -currentMouse.y * 0.35 + Math.sin(elapsed * 0.5) * 0.15;

      // Independent counter-rotation of central knot & rings
      knotMesh.rotation.z = elapsed * 0.35 + extraSpin;
      ringMesh.rotation.z = -elapsed * 0.45 - extraSpin * 0.6;
      innerRingMesh.rotation.y = elapsed * 0.6;

      // Orbiting satellites
      const orbitAngle = elapsed * 1.15;
      sat1.position.set(
        Math.cos(orbitAngle) * 2.05,
        Math.sin(orbitAngle) * 1.2,
        Math.sin(orbitAngle) * 1.5
      );
      sat2.position.set(
        Math.sin(-orbitAngle * 0.8) * 1.68,
        Math.cos(-orbitAngle * 0.8) * 1.3,
        Math.cos(-orbitAngle * 0.8) * 1.1
      );

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (rafId === null && isVisible && !document.hidden) {
        clock.start();
        rafId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      clock.stop();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) startLoop();
        else stopLoop();
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth || 520;
      const newH = containerRef.current.clientHeight || 520;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    startLoop();

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      stopLoop();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      knotGeo.dispose();
      knotMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      satGeo.dispose();
      satOrangeMat.dispose();
      satDarkMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[380px] sm:h-[480px] lg:h-[560px] relative select-none"
      aria-hidden="true"
    />
  );
}

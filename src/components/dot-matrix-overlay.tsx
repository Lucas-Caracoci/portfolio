"use client";

import { useEffect, useRef } from "react";

export function DotMatrixOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.5;
    let currentX = targetX;
    let currentY = targetY;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let rafId: number;
    const updateSpotlight = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (el) {
        el.style.setProperty("--mouse-x", `${currentX}px`);
        el.style.setProperty("--mouse-y", `${currentY}px`);
      }
      rafId = requestAnimationFrame(updateSpotlight);
    };

    rafId = requestAnimationFrame(updateSpotlight);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Base Dot Matrix Grid */}
      <div
        className="absolute inset-0 bg-dot-matrix opacity-35"
        style={{
          maskImage:
            "radial-gradient(circle at 60% 50%, black 20%, rgba(0,0,0,0.6) 60%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(circle at 60% 50%, black 20%, rgba(0,0,0,0.6) 60%, transparent 95%)",
        }}
      />

      {/* Interactive Cursor Spotlight Glow over the dots */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-screen transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 211, 238, 0.28), transparent 75%)",
        }}
      />
    </div>
  );
}

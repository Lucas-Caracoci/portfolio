"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SpatialGlassProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

export function SpatialGlass({
  children,
  className = "",
  tilt = false,
}: SpatialGlassProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 170, damping: 26, mass: 0.8 });
  const rotateY = useSpring(rawRotateY, { stiffness: 170, damping: 26, mass: 0.8 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--glow-opacity", "1");

    if (tilt) {
      const nx = (x / Math.max(rect.width, 1) - 0.5) * 2;
      const ny = (y / Math.max(rect.height, 1) - 0.5) * 2;
      rawRotateX.set(-ny * 1.6);
      rawRotateY.set(nx * 1.6);
    }
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (el) {
      el.style.setProperty("--glow-opacity", "0");
    }
    if (tilt) {
      rawRotateX.set(0);
      rawRotateY.set(0);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tilt
          ? {
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }
          : undefined
      }
      className={`group/glass relative overflow-hidden ethereal-glass ${className}`}
    >
      {/* Cursor-following ambient iridescent sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--glow-opacity, 0)",
          background:
            "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), var(--glow-color), transparent 68%)",
        }}
      />

      {/* Top hairline specular reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

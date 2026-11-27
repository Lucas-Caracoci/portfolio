"use client";

import {
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(249, 115, 22, 0.22)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`group/card relative rounded-2xl bg-[#161616]/88 backdrop-blur-xl border border-white/10 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#f97316]/35 ${className}`}
    >
      {/* Glowing Cursor Perimeter Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl z-20 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          opacity,
          padding: "1.5px",
          background: `radial-gradient(320px circle at ${position.x}px ${position.y}px, rgba(249, 115, 22, 0.95), rgba(254, 215, 170, 0.35) 45%, transparent 75%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Internal Ambient Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          opacity,
          background: `radial-gradient(520px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
}

export function TiltedCard({
  children,
  className = "",
  rotateAmplitude = 7,
  scaleOnHover = 1.01,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 260, damping: 24, mass: 0.6 };
  const sRotateX = useSpring(rotateX, springConfig);
  const sRotateY = useSpring(rotateY, springConfig);
  const sScale = useSpring(scale, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (-offsetY / (rect.height / 2)) * rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    scale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="[perspective:1100px] w-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: sRotateX,
          rotateY: sRotateY,
          scale: sScale,
          transformStyle: "preserve-3d",
        }}
        className={`relative rounded-2xl bg-[#161616]/88 backdrop-blur-xl border border-white/10 overflow-hidden will-change-transform ${className}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: hovered ? 0.14 : 0,
            background:
              "radial-gradient(circle at 50% 0%, rgba(254,215,170,0.45), transparent 65%)",
          }}
        />
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
}

interface MagnetProps {
  children: ReactNode;
  strength?: number;
  disabled?: boolean;
  className?: string;
}

export function Magnet({
  children,
  strength = 0.28,
  disabled = false,
  className = "",
}: MagnetProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface StarBorderProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function StarBorder({
  children,
  className = "",
  color = "#f97316",
}: StarBorderProps) {
  return (
    <div
      className={`relative inline-flex rounded-xl p-px overflow-hidden group ${className}`}
    >
      <span
        aria-hidden="true"
        className="rb-star-border-beam pointer-events-none absolute inset-[-120%]"
        style={{
          background: `conic-gradient(from 0deg, transparent 70%, ${color} 100%)`,
        }}
      />
      <div className="relative z-10 inline-flex items-center">{children}</div>
    </div>
  );
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

interface ClickSparkProps {
  enabled?: boolean;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}

export function ClickSpark({
  enabled = true,
  sparkColor = "#f97316",
  sparkSize = 9,
  sparkRadius = 22,
  sparkCount = 8,
  duration = 380,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number | null = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const animate = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 3);
        const distance = eased * sparkRadius;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 1.75;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      if (sparksRef.current.length > 0) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    };

    const handleClick = (e: globalThis.MouseEvent) => {
      const now = performance.now();
      const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }));
      sparksRef.current.push(...newSparks);
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [enabled, sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}

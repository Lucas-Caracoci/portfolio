"use client";

import { useEffect, useRef } from "react";

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

export function TechMeshOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId: number | null = null;

    const pointer = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      active: false,
    };

    let scrollAlpha = 0;
    let targetScrollAlpha = 0;
    let time = 0;
    let scrollOffset = 0;

    const updateScrollTarget = () => {
      const vh = Math.max(window.innerHeight, 1);
      targetScrollAlpha = smoothstep(0.08, 0.78, window.scrollY / vh);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateScrollTarget();
    };

    resize();

    const onPointerMove = (e: PointerEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateScrollTarget, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const spacing = 44;
    const maxDist = 210;

    const renderFrame = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(renderFrame);
        return;
      }

      time += 0.018;
      const vel = window.__lenisVelocity ?? 0;
      scrollOffset = (scrollOffset + vel * 0.15) % spacing;

      scrollAlpha += (targetScrollAlpha - scrollAlpha) * 0.12;

      if (!pointer.active) {
        pointer.targetX = width * 0.5 + Math.cos(time * 0.55) * (width * 0.25);
        pointer.targetY = height * 0.45 + Math.sin(time * 0.7) * (height * 0.2);
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.16;
      pointer.y += (pointer.targetY - pointer.y) * 0.16;

      ctx.clearRect(0, 0, width, height);

      if (scrollAlpha > 0.005) {
        ctx.save();
        ctx.globalAlpha = scrollAlpha;

        // Soft cursor telemetry halo
        const halo = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          4,
          pointer.x,
          pointer.y,
          maxDist * 1.15
        );
        halo.addColorStop(0, "rgba(249, 115, 22, 0.16)");
        halo.addColorStop(0.5, "rgba(254, 215, 170, 0.05)");
        halo.addColorStop(1, "rgba(18, 15, 23, 0)");
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, width, height);

        const cols = Math.ceil(width / spacing) + 2;
        const rows = Math.ceil(height / spacing) + 2;
        const activeNodes: Array<{ x: number; y: number; factor: number }> = [];

        for (let r = -1; r < rows; r++) {
          for (let c = -1; c < cols; c++) {
            const baseX = c * spacing;
            const baseY = r * spacing - scrollOffset;

            const dx = baseX - pointer.x;
            const dy = baseY - pointer.y;
            const dist = Math.hypot(dx, dy);

            const wave =
              Math.sin(c * 0.4 + time * 1.5) *
                Math.cos(r * 0.4 - time * 1.2) *
                0.5 +
              0.5;

            let drawX = baseX;
            let drawY = baseY;

            if (dist < maxDist) {
              const factor = 1 - dist / maxDist;
              const push = factor * factor * 12;
              const angle = Math.atan2(dy, dx);
              drawX += Math.cos(angle) * push;
              drawY += Math.sin(angle) * push;

              activeNodes.push({ x: drawX, y: drawY, factor });

              // Draw glowing technical crosshair on every 3rd node inside cursor field
              if ((c + r) % 3 === 0 && factor > 0.25) {
                const arm = 3.5 + factor * 2.5;
                ctx.strokeStyle = `rgba(254, 215, 170, ${0.35 + factor * 0.55})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(drawX - arm, drawY);
                ctx.lineTo(drawX + arm, drawY);
                ctx.moveTo(drawX, drawY - arm);
                ctx.lineTo(drawX, drawY + arm);
                ctx.stroke();
              } else {
                const radius = 1.3 + factor * 2.2;
                ctx.fillStyle = `rgba(249, 115, 22, ${0.35 + factor * 0.65})`;
                ctx.beginPath();
                ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
                ctx.fill();
              }
            } else {
              // Subtle ambient technical grid dots & periodic crosshairs
              if ((c + r) % 4 === 0) {
                ctx.strokeStyle = `rgba(254, 215, 170, ${0.09 + wave * 0.08})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(drawX - 2.5, drawY);
                ctx.lineTo(drawX + 2.5, drawY);
                ctx.moveTo(drawX, drawY - 2.5);
                ctx.lineTo(drawX, drawY + 2.5);
                ctx.stroke();
              } else {
                ctx.fillStyle = `rgba(254, 215, 170, ${0.11 + wave * 0.09})`;
                ctx.beginPath();
                ctx.arc(drawX, drawY, 1.15 + wave * 0.35, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }

        // Vector constellation lines connecting nearby active nodes around cursor
        ctx.lineWidth = 0.85;
        for (let i = 0; i < activeNodes.length; i++) {
          const a = activeNodes[i];
          if (a.factor > 0.38) {
            ctx.strokeStyle = `rgba(249, 115, 22, ${(a.factor - 0.38) * 0.42})`;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(a.x, a.y);
            ctx.stroke();
          }
          for (let j = i + 1; j < activeNodes.length; j++) {
            const b = activeNodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < spacing * 1.45) {
              const lineAlpha = Math.min(a.factor, b.factor) * 0.38;
              ctx.strokeStyle = `rgba(254, 215, 170, ${lineAlpha})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        ctx.restore();
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScrollTarget);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
}

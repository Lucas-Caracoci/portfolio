"use client";

import { useEffect, useRef } from "react";

export type ReactBitsBgVariant = "squares" | "dots" | "aurora";

interface ReactBitsBackgroundProps {
  variant: ReactBitsBgVariant;
  accentColor?: string;
}

export function ReactBitsBackground({
  variant,
  accentColor = "#f97316",
}: ReactBitsBackgroundProps) {
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
      y: height * 0.38,
      targetX: width * 0.5,
      targetY: height * 0.38,
      active: false,
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

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    // State for Squares background (world-space coordinates so trails never jump)
    let scrollX = 0;
    let scrollY = 0;
    const squareSize = 48;
    const trailMap = new Map<string, number>();

    let time = 0;

    const renderFrame = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(renderFrame);
        return;
      }

      time += 0.015;

      // If user hasn't moved mouse yet, gently orbit focal point so background feels alive
      if (!pointer.active) {
        pointer.targetX = width * 0.5 + Math.cos(time * 0.6) * (width * 0.22);
        pointer.targetY = height * 0.38 + Math.sin(time * 0.8) * (height * 0.16);
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.14;
      pointer.y += (pointer.targetY - pointer.y) * 0.14;

      // Base Grainient dark obsidian-ember canvas tone (#120f17)
      ctx.fillStyle = "#120f17";
      ctx.fillRect(0, 0, width, height);

      // Ambient Grainient color wash (#2a0f0a -> #9a3412 -> #f97316) so body harmonizes with Hero
      const ambientTop = ctx.createRadialGradient(
        width * (0.28 + Math.sin(time * 0.25) * 0.08),
        height * 0.25,
        20,
        width * 0.35,
        height * 0.3,
        Math.max(width, height) * 0.72
      );
      ambientTop.addColorStop(0, "rgba(154, 52, 18, 0.24)");
      ambientTop.addColorStop(0.45, "rgba(42, 15, 10, 0.22)");
      ambientTop.addColorStop(1, "rgba(18, 15, 23, 0)");
      ctx.fillStyle = ambientTop;
      ctx.fillRect(0, 0, width, height);

      const ambientRight = ctx.createRadialGradient(
        width * (0.78 + Math.cos(time * 0.2) * 0.06),
        height * 0.68,
        20,
        width * 0.75,
        height * 0.68,
        Math.max(width, height) * 0.6
      );
      ambientRight.addColorStop(0, "rgba(249, 115, 22, 0.14)");
      ambientRight.addColorStop(0.5, "rgba(154, 52, 18, 0.10)");
      ambientRight.addColorStop(1, "rgba(18, 15, 23, 0)");
      ctx.fillStyle = ambientRight;
      ctx.fillRect(0, 0, width, height);

      if (variant === "squares") {
        scrollX += 0.28;
        scrollY += 0.28;

        // World coordinates of pointer
        const worldPointerX = pointer.x + scrollX;
        const worldPointerY = pointer.y + scrollY;
        const hoveredWorldCol = Math.floor(worldPointerX / squareSize);
        const hoveredWorldRow = Math.floor(worldPointerY / squareSize);

        trailMap.set(`${hoveredWorldCol}:${hoveredWorldRow}`, 1);

        // Periodic autonomous tech cell pulses across the grid
        if (Math.random() < 0.08) {
          const randCol =
            Math.floor(scrollX / squareSize) +
            Math.floor(Math.random() * (Math.ceil(width / squareSize) + 1));
          const randRow =
            Math.floor(scrollY / squareSize) +
            Math.floor(Math.random() * (Math.ceil(height / squareSize) + 1));
          const key = `${randCol}:${randRow}`;
          if (!trailMap.has(key)) {
            trailMap.set(key, 0.45);
          }
        }

        // Decay trail cells
        trailMap.forEach((alpha, key) => {
          const next = alpha - 0.022;
          if (next <= 0) {
            trailMap.delete(key);
          } else {
            trailMap.set(key, next);
          }
        });

        // Subtle ember ambient spotlight behind grid around pointer
        const spotGrad = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          10,
          pointer.x,
          pointer.y,
          340
        );
        spotGrad.addColorStop(0, "rgba(249, 115, 22, 0.18)");
        spotGrad.addColorStop(0.5, "rgba(154, 52, 18, 0.08)");
        spotGrad.addColorStop(1, "rgba(18, 15, 23, 0)");
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);

        const firstWorldCol = Math.floor(scrollX / squareSize) - 1;
        const firstWorldRow = Math.floor(scrollY / squareSize) - 1;
        const cols = Math.ceil(width / squareSize) + 3;
        const rows = Math.ceil(height / squareSize) + 3;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const worldCol = firstWorldCol + c;
            const worldRow = firstWorldRow + r;
            const x = worldCol * squareSize - scrollX;
            const y = worldRow * squareSize - scrollY;

            const cellCenterX = x + squareSize * 0.5;
            const cellCenterY = y + squareSize * 0.5;
            const distToPointer = Math.hypot(
              cellCenterX - pointer.x,
              cellCenterY - pointer.y
            );
            const proximity = Math.max(0, 1 - distToPointer / 280);

            const trailAlpha = trailMap.get(`${worldCol}:${worldRow}`) ?? 0;
            if (trailAlpha > 0) {
              ctx.fillStyle = `rgba(249, 115, 22, ${trailAlpha * 0.24})`;
              ctx.fillRect(x, y, squareSize, squareSize);
            }

            ctx.lineWidth = 1;
            if (trailAlpha > 0.15 || proximity > 0.15) {
              const borderAlpha = Math.max(trailAlpha * 0.58, proximity * 0.38);
              ctx.strokeStyle = `rgba(249, 115, 22, ${borderAlpha})`;
            } else {
              ctx.strokeStyle = "rgba(254, 215, 170, 0.09)";
            }
            ctx.strokeRect(x, y, squareSize, squareSize);

            // Tech intersection crosshair ticks
            if ((worldCol + worldRow) % 3 === 0) {
              ctx.fillStyle =
                proximity > 0.2
                  ? `rgba(254, 215, 170, ${0.4 + proximity * 0.45})`
                  : "rgba(254, 215, 170, 0.2)";
              ctx.fillRect(x - 1, y - 1, 2.5, 2.5);
            }
          }
        }
      } else if (variant === "dots") {
        const spacing = 28;
        const cols = Math.ceil(width / spacing) + 1;
        const rows = Math.ceil(height / spacing) + 1;
        const maxDist = 180;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const baseX = c * spacing;
            const baseY = r * spacing;

            const dx = baseX - pointer.x;
            const dy = baseY - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Subtle ambient wave across the dot matrix
            const wave =
              Math.sin(c * 0.35 + time * 1.4) *
                Math.cos(r * 0.35 - time * 1.1) *
                0.5 +
              0.5;

            let drawX = baseX;
            let drawY = baseY;
            let radius = 1.25 + wave * 0.45;
            let alpha = 0.2 + wave * 0.12;

            if (dist < maxDist) {
              const factor = 1 - dist / maxDist;
              const push = factor * factor * 11;
              const angle = Math.atan2(dy, dx);
              drawX += Math.cos(angle) * push;
              drawY += Math.sin(angle) * push;
              radius = 1.4 + factor * 2.1;
              alpha = 0.35 + factor * 0.65;
              ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`;
            } else {
              ctx.fillStyle = `rgba(254, 215, 170, ${alpha})`;
            }

            ctx.beginPath();
            ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (variant === "aurora") {
        // Luminous Grainient-matched Ember Aurora waves
        const ribbons = [
          {
            yBase: height * 0.32,
            amp: 64,
            freq: 0.0022,
            speed: 1.1,
            color: "249, 115, 22",
            alpha: 0.22,
          },
          {
            yBase: height * 0.44,
            amp: 82,
            freq: 0.0017,
            speed: -0.85,
            color: "154, 52, 18",
            alpha: 0.24,
          },
          {
            yBase: height * 0.24,
            amp: 48,
            freq: 0.0029,
            speed: 1.4,
            color: "254, 215, 170",
            alpha: 0.12,
          },
        ];

        ribbons.forEach((rib, idx) => {
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 20) {
            const pointerInfluence =
              Math.exp(-Math.pow(x - pointer.x, 2) / 95000) *
              ((pointer.y - height * 0.4) * 0.18);

            const y =
              rib.yBase +
              Math.sin(x * rib.freq + time * rib.speed + idx) * rib.amp +
              Math.cos(x * rib.freq * 0.6 - time * 0.7) * (rib.amp * 0.5) +
              pointerInfluence;

            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.closePath();

          const ribGrad = ctx.createLinearGradient(0, rib.yBase - 80, 0, height);
          ribGrad.addColorStop(0, `rgba(${rib.color}, ${rib.alpha})`);
          ribGrad.addColorStop(0.55, `rgba(${rib.color}, ${rib.alpha * 0.35})`);
          ribGrad.addColorStop(1, `rgba(${rib.color}, 0)`);
          ctx.fillStyle = ribGrad;
          ctx.fill();
        });
      }

      // Gentle outer edge vignette into #120f17
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.42,
        Math.min(width, height) * 0.32,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      grad.addColorStop(0, "rgba(18, 15, 23, 0)");
      grad.addColorStop(1, "rgba(18, 15, 23, 0.55)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      rafId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [variant, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}


"use client";

import { useEffect, useRef } from "react";
import {
  LaravelLogo,
  ReactLogo,
  NextjsLogo,
  TypeScriptLogo,
  PostgresLogo,
  DockerLogo,
  RedisLogo,
  PythonLogo,
  TailwindLogo,
  GitLogo,
  NginxLogo,
} from "@/components/react-bits/TechLogos";

const STACK_ITEMS = [
  { name: "Laravel", logo: LaravelLogo },
  { name: "React", logo: ReactLogo },
  { name: "Next.js", logo: NextjsLogo },
  { name: "TypeScript", logo: TypeScriptLogo },
  { name: "PostgreSQL", logo: PostgresLogo },
  { name: "Docker", logo: DockerLogo },
  { name: "Redis", logo: RedisLogo },
  { name: "Python", logo: PythonLogo },
  { name: "Tailwind CSS", logo: TailwindLogo },
  { name: "Nginx", logo: NginxLogo },
  { name: "Git", logo: GitLogo },
];

const TELEMETRY_PHRASES = [
  "ARQUITETURA DE SOFTWARE FULL STACK",
  "SINCRONIZAÇÃO LOCAL OFFLINE-FIRST",
  "MOTORES DE DOCUMENTOS EM CHROMIUM HEADLESS",
  "FILAS SUPERVISIONADAS COM REDIS & HORIZON",
  "RESPOSTA DE INTERFACE ABAIXO DE 200MS",
  "SISTEMAS CRÍTICOS EM PRODUÇÃO REAL",
];

// Soft multi-stop alpha mask so edges dissolve transparently into the Grainient background
const EDGE_FADE_MASK =
  "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.08) 3%, rgba(0, 0, 0, 0.32) 7%, rgba(0, 0, 0, 0.68) 12%, rgba(0, 0, 0, 0.92) 16%, #000 20%, #000 80%, rgba(0, 0, 0, 0.92) 84%, rgba(0, 0, 0, 0.68) 88%, rgba(0, 0, 0, 0.32) 93%, rgba(0, 0, 0, 0.08) 97%, transparent 100%)";

// Repeat enough times per half so 50% of the track exceeds even ultrawide viewports
const HALF_STACK = [
  ...STACK_ITEMS,
  ...STACK_ITEMS,
  ...STACK_ITEMS,
  ...STACK_ITEMS,
];
const REPEATED_STACK = [...HALF_STACK, ...HALF_STACK];

const HALF_TELEMETRY = [...TELEMETRY_PHRASES, ...TELEMETRY_PHRASES];
const REPEATED_TELEMETRY = [...HALF_TELEMETRY, ...HALF_TELEMETRY];

export function ScrollVelocityStrip() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackTopRef = useRef<HTMLDivElement>(null);
  const trackBottomRef = useRef<HTMLDivElement>(null);
  const isPausedTopRef = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const trackTop = trackTopRef.current;
    const trackBottom = trackBottomRef.current;
    if (!wrap || !trackTop || !trackBottom) return;

    let xTop = 0;
    let xBottom = -25;
    let dir = -1;
    let smoothVel = 0;
    let rafId: number | null = null;
    let lastTime: number | null = null;
    let isVisible = true;

    const tick = (now: number) => {
      if (!isVisible || document.hidden) {
        rafId = null;
        lastTime = null;
        return;
      }

      const dt =
        lastTime === null
          ? 1
          : Math.min((now - lastTime) / (1000 / 60), 3);
      lastTime = now;

      const rawVel = window.__lenisVelocity ?? 0;
      smoothVel += (rawVel - smoothVel) * Math.min(1, 0.14 * dt);

      if (smoothVel > 0.25) dir = -1;
      else if (smoothVel < -0.25) dir = 1;

      const boost = Math.min(Math.abs(smoothVel) * 0.012, 0.28);
      const speedTop = (0.016 + boost) * dir * dt;
      const speedBottom = (0.014 + boost * 0.85) * -dir * dt;

      if (!isPausedTopRef.current) {
        xTop += speedTop;
        while (xTop <= -50) xTop += 50;
        while (xTop > 0) xTop -= 50;
        trackTop.style.transform = `translate3d(${xTop}%, 0, 0)`;
      }

      xBottom += speedBottom;
      while (xBottom <= -50) xBottom += 50;
      while (xBottom > 0) xBottom -= 50;
      trackBottom.style.transform = `translate3d(${xBottom}%, 0, 0)`;

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafId === null && isVisible && !document.hidden) {
        lastTime = null;
        rafId = requestAnimationFrame(tick);
      }
    };

    const stop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        lastTime = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0.01 }
    );

    observer.observe(wrap);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    start();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stop();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-label="Stack tecnológica e telemetria em movimento"
      style={{
        maskImage: EDGE_FADE_MASK,
        WebkitMaskImage: EDGE_FADE_MASK,
      }}
      className="relative w-full pt-12 pb-6 overflow-x-clip select-none space-y-4"
    >
      {/* Track 01: Infinite Tech Logos Carousel (logos only, name tooltip + pause on hover) */}
      <div
        className="flex overflow-x-clip"
        onMouseEnter={() => {
          isPausedTopRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedTopRef.current = false;
        }}
        onFocus={() => {
          isPausedTopRef.current = true;
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            isPausedTopRef.current = false;
          }
        }}
      >
        <div
          ref={trackTopRef}
          className="flex items-center gap-4 w-max will-change-transform pr-4"
        >
          {REPEATED_STACK.map((item, idx) => {
            const Logo = item.logo;
            const isClone = idx >= HALF_STACK.length;
            return (
              <div
                key={`${item.name}-${idx}`}
                tabIndex={isClone ? undefined : 0}
                aria-label={isClone ? undefined : item.name}
                aria-hidden={isClone || undefined}
                className="group relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#161616]/75 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[#f97316]/45 hover:bg-[#1C1C1C]/90 focus-visible:border-[#f97316]/60 flex items-center justify-center transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1 rounded-lg bg-[#111111]/95 backdrop-blur-md border border-white/12 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.75)] text-[11px] font-mono font-medium text-[#fff7ed] whitespace-nowrap opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] z-20"
                >
                  {item.name}
                </span>
                <Logo className="w-6 h-6 sm:w-7 sm:h-7 text-[#fed7aa]/85 group-hover:text-[#f97316] group-focus-visible:text-[#f97316] group-hover:scale-110 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Track 02: ScrollVelocity Telemetry Stream */}
      <div className="flex overflow-hidden" aria-hidden="true">
        <div
          ref={trackBottomRef}
          className="flex items-center gap-6 w-max will-change-transform font-mono text-xs uppercase tracking-[0.2em] text-[#fed7aa]/60 pr-6"
        >
          {REPEATED_TELEMETRY.map((phrase, idx) => (
            <span
              key={`${phrase}-${idx}`}
              className="inline-flex items-center gap-6 shrink-0"
            >
              <span>{phrase}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] shadow-[0_0_8px_#f97316]" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

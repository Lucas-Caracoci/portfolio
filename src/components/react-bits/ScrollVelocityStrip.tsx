"use client";

import { useEffect, useRef } from "react";
import {
  SolarCode,
  SolarDatabase,
  SolarLayers,
  SolarServer,
  SolarShieldCheck,
  SolarCpu,
  SolarTerminal,
} from "@/components/react-bits/icons";

const STACK_ITEMS = [
  { name: "Laravel 12", meta: "Service Pattern • DTOs", icon: SolarCode },
  { name: "React 19", meta: "Concurrent UI • Hooks", icon: SolarLayers },
  { name: "Next.js 16", meta: "App Router • SSR/RSC", icon: SolarCpu },
  { name: "TypeScript", meta: "Strict Contracts • Zod", icon: SolarTerminal },
  { name: "PostgreSQL", meta: "ACID • Otimização SQL", icon: SolarDatabase },
  { name: "Docker & Linux", meta: "Containers • Nginx", icon: SolarServer },
  { name: "Redis & Horizon", meta: "Filas Assíncronas", icon: SolarCpu },
  {
    name: "Dexie.js IndexedDB",
    meta: "Offline-First Sync",
    icon: SolarDatabase,
  },
  {
    name: "Python ETL & PDF",
    meta: "Chromium Headless",
    icon: SolarShieldCheck,
  },
];

const TELEMETRY_PHRASES = [
  "ARQUITETURA DE SOFTWARE FULL STACK",
  "SINCRONIZAÇÃO LOCAL OFFLINE-FIRST",
  "MOTORES DE DOCUMENTOS EM CHROMIUM HEADLESS",
  "FILAS SUPERVISIONADAS COM REDIS & HORIZON",
  "RESPOSTA DE INTERFACE ABAIXO DE 200MS",
  "SISTEMAS CRÍTICOS EM PRODUÇÃO REAL",
];

export function ScrollVelocityStrip() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackTopRef = useRef<HTMLDivElement>(null);
  const trackBottomRef = useRef<HTMLDivElement>(null);

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
    let isVisible = true;

    const tick = () => {
      if (!isVisible || document.hidden) {
        rafId = null;
        return;
      }

      const rawVel = window.__lenisVelocity ?? 0;
      smoothVel += (rawVel - smoothVel) * 0.14;

      if (smoothVel > 0.25) dir = -1;
      else if (smoothVel < -0.25) dir = 1;

      const boost = Math.min(Math.abs(smoothVel) * 0.022, 0.55);
      const speedTop = (0.032 + boost) * dir;
      const speedBottom = (0.026 + boost * 0.85) * -dir;

      xTop += speedTop;
      xBottom += speedBottom;

      if (xTop <= -50) xTop += 50;
      if (xTop > 0) xTop -= 50;

      if (xBottom <= -50) xBottom += 50;
      if (xBottom > 0) xBottom -= 50;

      trackTop.style.transform = `translate3d(${xTop}%, 0, 0)`;
      trackBottom.style.transform = `translate3d(${xBottom}%, 0, 0)`;

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafId === null && isVisible && !document.hidden) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const stop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
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
    start();

    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  const repeatedStack = [...STACK_ITEMS, ...STACK_ITEMS];
  const repeatedTelemetry = [...TELEMETRY_PHRASES, ...TELEMETRY_PHRASES];

  return (
    <div
      ref={wrapRef}
      aria-label="Stack tecnológica e telemetria em movimento"
      className="relative w-full py-6 overflow-hidden select-none space-y-3"
    >
      {/* Edge fade masks so badges enter/exit smoothly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-linear-to-r from-[#120f17] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-linear-to-l from-[#120f17] to-transparent"
      />

      {/* Track 01: React Bits LogoLoop Stack Carousel */}
      <div className="flex overflow-hidden">
        <div
          ref={trackTopRef}
          className="flex items-center gap-3 w-max will-change-transform pr-3"
        >
          {repeatedStack.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.name}-${idx}`}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#141118]/75 backdrop-blur-xl border border-[#fed7aa]/12 hover:border-[#f97316]/50 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-xl bg-[#221b29] border border-[#fed7aa]/10 flex items-center justify-center text-[#f97316] group-hover:scale-105 transition-transform duration-200">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#fff7ed] leading-tight">
                    {item.name}
                  </div>
                  <div className="text-[11px] font-mono text-[#fed7aa]/65">
                    {item.meta}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Track 02: React Bits ScrollVelocity Telemetry Stream */}
      <div className="flex overflow-hidden" aria-hidden="true">
        <div
          ref={trackBottomRef}
          className="flex items-center gap-6 w-max will-change-transform font-mono text-xs uppercase tracking-[0.2em] text-[#fed7aa]/60 pr-6"
        >
          {repeatedTelemetry.map((phrase, idx) => (
            <span
              key={`${phrase}-${idx}`}
              className="inline-flex items-center gap-6"
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

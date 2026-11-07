"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { gsap } from "gsap";
import {
  ArrowDownRight,
  Copy,
  Check,
  GripHorizontal,
  Cpu,
  Layers,
} from "lucide-react";

function InteractiveKineticChar({ char }: { char: string }) {
  const [hovered, setHovered] = useState(false);

  if (char === " ") {
    return <span className="inline-block w-[0.26em]">&nbsp;</span>;
  }

  return (
    <motion.span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y: hovered ? -14 : 0,
        scaleY: hovered ? 1.07 : 1,
        color: hovered ? "#FF3B00" : "#111111",
      }}
      transition={{
        type: "spring",
        stiffness: 520,
        damping: 22,
        mass: 0.5,
      }}
      className="hero-char-reveal inline-block origin-bottom cursor-default select-none will-change-transform"
    >
      {char}
    </motion.span>
  );
}

function MagneticCircularStamp({ onClick }: { onClick: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.6 });

  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * 0.36);
        y.set(dy * 0.36);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.93 }}
      aria-label="Rolar para ver os projetos"
      className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#FF3B00] hover:bg-[#E03200] text-white shadow-[0_20px_40px_-10px_rgba(255,59,0,0.55)] flex items-center justify-center cursor-pointer transition-colors duration-200 group shrink-0"
    >
      {/* Rotating Circular Text SVG */}
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full p-2 animate-[spin_14s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path
            id="circleTextPath"
            d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <text className="fill-white text-[10.2px] font-mono font-bold uppercase tracking-[0.18em]">
          <textPath href="#circleTextPath" startOffset="0%">
            VER PROJETOS • ROLAR AGORA •
          </textPath>
        </text>
      </svg>

      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-11 h-11 rounded-full bg-[#141413] text-white flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
          <ArrowDownRight className="w-5 h-5 text-[#FF3B00] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
        </div>
      </div>
    </motion.button>
  );
}

function VelocityMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    let xPercent = 0;
    let direction = -1;
    let rafId: number | null = null;
    let isVisible = true;

    const animate = () => {
      if (!isVisible || document.hidden) {
        rafId = null;
        return;
      }

      const vel = window.__lenisVelocity ?? 0;
      if (vel > 0.4) direction = -1;
      else if (vel < -0.4) direction = 1;

      const speedBoost = Math.min(Math.abs(vel) * 0.018, 0.45);
      xPercent += (0.045 + speedBoost) * direction;

      if (xPercent <= -50) xPercent = 0;
      if (xPercent > 0) xPercent = -50;

      track.style.transform = `translate3d(${xPercent}%, 0, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (rafId === null && isVisible && !document.hidden) {
        rafId = requestAnimationFrame(animate);
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

  const phrase =
    "SISTEMAS QUE NÃO TRAVAM NA HORA H  •  SINCRONIZAÇÃO OFFLINE-FIRST  •  LARAVEL & REACT 19  •  DO BANCO DE DADOS AO PIXEL  •  ARQUITETURA LIMPA  •  ";

  return (
    <div
      ref={wrapRef}
      className="w-full bg-[#141413] text-[#F4F1EA] py-3.5 overflow-hidden border-t border-[#111111]/15 select-none"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap w-max font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold will-change-transform"
      >
        <span className="pr-4">
          <span className="text-[#FF3B00]">●</span> {phrase}
          <span className="text-[#FF3B00]">●</span> {phrase}
        </span>
        <span className="pr-4">
          <span className="text-[#FF3B00]">●</span> {phrase}
          <span className="text-[#FF3B00]">●</span> {phrase}
        </span>
      </div>
    </div>
  );
}

export function HeroMagneticKinetic() {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateClock = () => {
      setLocalTime(
        new Date().toLocaleTimeString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-char-reveal",
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.028,
          ease: "power4.out",
          delay: 0.05,
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("lucascaracoci2@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const scrollTo = (id: string) => {
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: id } })
    );
  };

  const nameChars = "LUCAS CARACOCI".split("");

  return (
    <section
      ref={heroRef}
      id="exp-hero"
      className="relative min-h-screen w-full pt-24 flex flex-col justify-between swiss-grid-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 flex-1 flex flex-col justify-between py-6 sm:py-10 gap-10">
        {/* Top Swiss Technical Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#111111]/12 text-xs font-mono uppercase tracking-wider text-[#575551]">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded bg-[#FF3B00] text-white font-bold">
              ESTILO 03 / CINÉTICA &amp; MAGNÉTICA
            </span>
            <span>ARRAIAL DO CABO, RJ {localTime ? `• ${localTime}` : ""}</span>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <span>PASSE O MOUSE NO NOME E ARRASTE OS MÓDULOS</span>
            <span className="text-[#111111] font-bold">● DISPONÍVEL</span>
          </div>
        </div>

        {/* Middle Asymmetric Section: Conversational Bio (Left) + Draggable/Magnetic Modules (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
          {/* Left 6 Cols: Personal, Conversational 1st-Person Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#111111]/12 text-xs font-mono text-[#111111] font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FF3B00]" />
              <span>Engenheiro de Software Full-Stack &amp; Cloud</span>
            </div>

            <p className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] leading-snug text-balance">
              Saí da linha de frente do TI pra construir os sistemas que eu sentia falta na
              prática:{" "}
              <span className="text-[#FF3B00]">
                rápidos, sem frescura e prontos pro mundo real.
              </span>
            </p>

            <p className="text-base sm:text-lg text-[#575551] leading-relaxed max-w-xl text-pretty">
              Quando você vê de perto a internet oscilar no meio de uma operação ou alguém juntando
              dezenas de PDFs na mão, você projeta software diferente. Hoje arquiteto sistemas em{" "}
              <strong className="text-[#111111] font-semibold">
                Laravel, React 19, Next.js e PostgreSQL
              </strong>{" "}
              que funcionam de verdade.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-5 py-3.5 rounded-2xl bg-[#141413] hover:bg-[#262624] text-[#F4F1EA] font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2.5 cursor-pointer active:scale-[0.97] transition-colors min-w-[190px] justify-center shadow-lg"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied-k"
                      initial={{ opacity: 0, scale: 0.85, y: 2 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 500, damping: 28 },
                      }}
                      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.1 } }}
                      className="flex items-center gap-2 text-emerald-400"
                    >
                      <Check className="w-4 h-4" />
                      <span>E-mail copiado!</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy-k"
                      initial={{ opacity: 0, scale: 0.85, y: -2 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 500, damping: 28 },
                      }}
                      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.1 } }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4 text-[#FF3B00]" />
                      <span>Copiar meu e-mail</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                type="button"
                onClick={() => scrollTo("career")}
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-[#EAE5DC] text-[#111111] border border-[#111111]/15 font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer active:scale-[0.97] transition-colors"
              >
                Ver minha trajetória
              </button>
            </div>
          </div>

          {/* Right 6 Cols: Tactile Draggable Hardware Modules + Magnetic Circular CTA */}
          <div className="lg:col-span-6 relative flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-5">
            <div className="flex flex-col gap-4 w-full sm:w-auto max-w-sm">
              {/* Draggable Module 01: Origin & Architecture */}
              <motion.div
                drag
                dragSnapToOrigin
                dragElastic={0.45}
                dragTransition={{ bounceStiffness: 380, bounceDamping: 24 }}
                whileHover={{ y: -3, rotate: -1 }}
                whileDrag={{ scale: 1.04, rotate: -2.5, zIndex: 30 }}
                className="p-5 rounded-2xl bg-[#141413] text-[#F4F1EA] border border-white/10 shadow-xl cursor-grab active:cursor-grabbing select-none space-y-3"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span className="flex items-center gap-1.5 text-[#FF3B00] font-bold">
                    <Cpu className="w-3.5 h-3.5" /> MÓDULO 01 • ARRASTE
                  </span>
                  <GripHorizontal className="w-4 h-4 text-stone-500" />
                </div>
                <div className="text-base font-bold text-white leading-snug">
                  De Analista de TI (2025) a Dev Full-Stack (2026)
                </div>
                <div className="text-xs font-mono text-stone-400">
                  Conheço a infraestrutura por baixo e desenho a interface por cima.
                </div>
              </motion.div>

              {/* Draggable Module 02: Core Stack */}
              <motion.div
                drag
                dragSnapToOrigin
                dragElastic={0.45}
                dragTransition={{ bounceStiffness: 380, bounceDamping: 24 }}
                whileHover={{ y: -3, rotate: 1 }}
                whileDrag={{ scale: 1.04, rotate: 2.5, zIndex: 30 }}
                className="p-5 rounded-2xl bg-white text-[#111111] border border-[#111111]/15 shadow-[0_18px_38px_-18px_rgba(17,17,17,0.16)] cursor-grab active:cursor-grabbing select-none space-y-3"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#575551]">
                  <span className="flex items-center gap-1.5 text-[#111111] font-bold">
                    <Layers className="w-3.5 h-3.5 text-[#FF3B00]" /> MÓDULO 02 • ARRASTE
                  </span>
                  <GripHorizontal className="w-4 h-4 text-[#575551]" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Laravel", "React 19", "Next.js", "PostgreSQL", "Dexie.js", "Docker"].map(
                    (item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-lg bg-[#F4F1EA] border border-[#111111]/10 text-xs font-mono font-semibold text-[#111111]"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            </div>

            {/* Magnetic Rotating Circular CTA Stamp */}
            <div className="pt-2 sm:pt-0 sm:pl-2">
              <MagneticCircularStamp onClick={() => scrollTo("exp-projects")} />
            </div>
          </div>
        </div>

        {/* Bottom Monumental Interactive Kinetic Name Display */}
        <div className="pt-4 border-t border-[#111111]/12">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#575551] mb-2">
            <span>PORTFÓLIO DE ENGENHARIA &amp; DESIGN</span>
            <span className="text-[#FF3B00] font-bold">INTERATIVO • PASSE O CURSOR ↓</span>
          </div>

          <h1
            aria-label="Lucas Caracoci"
            className="text-[12.5vw] sm:text-[11vw] xl:text-[138px] font-bold tracking-tighter leading-[0.88] text-[#111111] whitespace-nowrap overflow-hidden py-1"
          >
            <span aria-hidden="true" className="inline-block">
              {nameChars.map((ch, idx) => (
                <InteractiveKineticChar key={idx} char={ch} />
              ))}
            </span>
          </h1>
        </div>
      </div>

      {/* Scroll-Velocity Reactive Marquee */}
      <VelocityMarquee />
    </section>
  );
}

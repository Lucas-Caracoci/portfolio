"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDownRight, Copy, Check, Sparkles, Compass } from "lucide-react";
import { HeroSculptureCanvas } from "./hero-sculpture-canvas";

export function HeroKinetic() {
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const badgeTopRef = useRef<HTMLDivElement>(null);
  const badgeBottomRef = useRef<HTMLDivElement>(null);

  // Magnetic primary button spring
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);
  const springBtnX = useSpring(btnX, { stiffness: 320, damping: 22, mass: 0.6 });
  const springBtnY = useSpring(btnY, { stiffness: 320, damping: 22, mass: 0.6 });

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word-reveal",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.045,
          ease: "power4.out",
          delay: 0.08,
        }
      );
    }, heroEl);

    const handlePointerMove = (e: PointerEvent) => {
      const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;

      if (badgeTopRef.current) {
        gsap.to(badgeTopRef.current, {
          x: xNorm * -18,
          y: yNorm * -14,
          duration: 0.6,
          ease: "power2.out",
        });
      }
      if (badgeBottomRef.current) {
        gsap.to(badgeBottomRef.current, {
          x: xNorm * 22,
          y: yNorm * 16,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      ctx.revert();
    };
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

  const headlineWords = [
    "Oi,",
    "eu",
    "sou",
    "o",
    "Lucas.",
  ];

  return (
    <section
      ref={heroRef}
      id="exp-hero"
      className="relative min-h-screen w-full pt-28 pb-16 px-4 sm:px-8 flex flex-col justify-between swiss-grid-bg border-b border-[#111111]/12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Swiss Top Technical Index Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#111111]/12 text-xs font-mono uppercase tracking-wider text-[#575551]">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-[#FF3B00] text-white font-semibold">
              EXP 01 / ESCULTURA 3D + PARALLAX
            </span>
            <span>ARRAIAL DO CABO, RJ • 22°57&apos;S</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>ENGENHEIRO DE SOFTWARE &amp; CLOUD</span>
            <span className="text-[#111111] font-semibold">● DISPONÍVEL PARA CONVERSAR</span>
          </div>
        </div>

        {/* Main Asymmetric Hero Grid: 7 Cols Editorial Copy / 5 Cols Interactive 3D Sculpture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Monumental Personal Typography */}
          <div className="lg:col-span-7 space-y-8 relative z-10">
            <div>
              {/* Accessible H1 with GSAP Staggered Word Reveal */}
              <h1
                aria-label="Oi, eu sou o Lucas. Construo sistemas que não travam na hora H e telas que dão gosto de usar."
                className="text-5xl sm:text-7xl xl:text-8xl font-bold tracking-tight text-[#111111] leading-none mb-6"
              >
                <span className="block mb-2" aria-hidden="true">
                  {headlineWords.map((word, idx) => (
                    <span
                      key={idx}
                      className="inline-block overflow-hidden mr-[0.22em] pb-1"
                    >
                      <span
                        className={`hero-word-reveal inline-block ${
                          word === "Lucas." ? "text-[#FF3B00]" : "text-[#111111]"
                        }`}
                      >
                        {word}
                      </span>
                    </span>
                  ))}
                </span>

                <span
                  aria-hidden="true"
                  className="block text-3xl sm:text-5xl xl:text-6xl font-semibold tracking-tight text-[#111111] leading-tight text-balance"
                >
                  Construo sistemas que não travam na hora H e{" "}
                  <span className="underline decoration-[#FF3B00] decoration-4 underline-offset-8">
                    telas que dão gosto de usar.
                  </span>
                </span>
              </h1>

              <p className="text-base sm:text-xl text-[#575551] max-w-[600px] leading-relaxed text-pretty font-normal pt-2">
                Sou desenvolvedor Full-Stack apaixonado por pegar problemas cabeludos do mundo real
                e transformar em software rápido, limpo e confiável — usando{" "}
                <strong className="text-[#111111] font-semibold">
                  Laravel, React, Next.js e TypeScript
                </strong>
                .
              </p>
            </div>

            {/* Tactile Actions Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <motion.button
                type="button"
                style={{ x: springBtnX, y: springBtnY }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const offsetX = e.clientX - (rect.left + rect.width / 2);
                  const offsetY = e.clientY - (rect.top + rect.height / 2);
                  btnX.set(offsetX * 0.22);
                  btnY.set(offsetY * 0.22);
                }}
                onMouseLeave={() => {
                  btnX.set(0);
                  btnY.set(0);
                }}
                onClick={() => scrollTo("exp-projects")}
                className="group px-6 py-4 rounded-2xl bg-[#FF3B00] hover:bg-[#E03200] text-white font-semibold text-base shadow-[0_14px_30px_-8px_rgba(255,59,0,0.45)] flex items-center gap-2.5 cursor-pointer active:scale-[0.97] transition-colors duration-200"
              >
                <span>Ver projetos na prática</span>
                <ArrowDownRight className="w-5 h-5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </motion.button>

              <button
                type="button"
                onClick={() => scrollTo("exp-shapes")}
                className="px-5 py-4 rounded-2xl bg-[#141413] hover:bg-[#262624] text-[#F4F1EA] font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 cursor-pointer active:scale-[0.97] transition-colors duration-200"
              >
                <Compass className="w-4 h-4 text-[#FF3B00]" />
                <span>Conhecer minha história</span>
              </button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-5 py-4 rounded-2xl bg-white hover:bg-[#EAE5DC] text-[#111111] border border-[#111111]/15 font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 cursor-pointer active:scale-[0.97] transition-colors duration-200 min-w-[148px] justify-center"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, scale: 0.85, y: 2 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 500, damping: 28 },
                      }}
                      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.1 } }}
                      className="flex items-center gap-1.5 text-emerald-700"
                    >
                      <Check className="w-4 h-4" />
                      <span>Copiado!</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.85, y: -2 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 500, damping: 28 },
                      }}
                      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.1 } }}
                      className="flex items-center gap-1.5"
                    >
                      <Copy className="w-4 h-4 text-[#FF3B00]" />
                      <span>Copiar E-mail</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive 3D Parametric Sculpture + Floating Parallax Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Soft Warm Radial Backdrop behind 3D Object */}
            <div
              className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#FF3B00]/10 blur-3xl absolute pointer-events-none"
              aria-hidden="true"
            />

            {/* Floating Parallax Badge 1 (Top Left) */}
            <div
              ref={badgeTopRef}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl swiss-card absolute top-6 left-2 z-20 pointer-events-none"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B00]" />
              <div className="text-xs font-mono leading-tight">
                <div className="font-semibold text-[#111111]">GIROSCÓPIO KINETIC 3D</div>
                <div className="text-[#575551]">Mova o mouse ou role a página</div>
              </div>
            </div>

            {/* Three.js Sculpture Canvas */}
            <HeroSculptureCanvas />

            {/* Floating Parallax Badge 2 (Bottom Right) */}
            <div
              ref={badgeBottomRef}
              className="hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#141413] text-[#F4F1EA] shadow-xl absolute bottom-6 right-2 z-20 pointer-events-none"
            >
              <Sparkles className="w-4 h-4 text-[#FF3B00]" />
              <div className="text-xs font-mono leading-tight">
                <div className="font-semibold text-white">DO BANCO AO PIXEL</div>
                <div className="text-stone-400">Arquitetura + Design Engineering</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

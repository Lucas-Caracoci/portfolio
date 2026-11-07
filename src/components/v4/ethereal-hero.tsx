"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDownRight, Copy, Check } from "lucide-react";

export function EtherealHero() {
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Silky magnetic CTA spring
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 240, damping: 24, mass: 0.7 });
  const springY = useSpring(rawY, { stiffness: 240, damping: 24, mass: 0.7 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ethereal-hero-reveal",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.06,
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("lucascaracoci2@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const scrollTo = (id: string) => {
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: id } })
    );
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-8">
          {/* Whisper-light translucent availability capsule */}
          <div className="ethereal-hero-reveal inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full ethereal-pill text-xs font-mono text-[var(--fg-muted)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-main)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-main)]" />
            </span>
            <span>Disponível para projetos • Arraial do Cabo, RJ</span>
          </div>

          {/* Airy Editorial Display Typography (Geist Light + Instrument Serif) */}
          <h1
            aria-label="Lucas Caracoci — Engenheiro de Software Full-Stack"
            className="ethereal-hero-reveal text-6xl sm:text-8xl lg:text-9xl tracking-tight leading-none"
          >
            <span className="block font-light text-[var(--fg-primary)]">
              Lucas
            </span>
            <span className="block font-serif-display font-normal bg-gradient-to-r from-[var(--fg-primary)] via-[var(--accent-main)] to-[var(--accent-secondary)] bg-clip-text text-transparent pb-2">
              Caracoci
            </span>
          </h1>

          {/* Short, Direct, Zero-AI-Slop Copy */}
          <p className="ethereal-hero-reveal text-lg sm:text-xl text-[var(--fg-muted)] max-w-lg leading-relaxed font-light text-pretty">
            Engenheiro de Software Full-Stack. Desenvolvo sistemas web rápidos, seguros e prontos
            para uso intenso com{" "}
            <span className="text-[var(--fg-primary)] font-normal">
              Laravel, React e PostgreSQL
            </span>
            .
          </p>

          {/* Weightless Luminous Actions */}
          <div className="ethereal-hero-reveal flex flex-wrap items-center gap-3.5 pt-2">
            <motion.button
              type="button"
              style={{ x: springX, y: springY }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                rawX.set((e.clientX - (rect.left + rect.width / 2)) * 0.22);
                rawY.set((e.clientY - (rect.top + rect.height / 2)) * 0.22);
              }}
              onMouseLeave={() => {
                rawX.set(0);
                rawY.set(0);
              }}
              onClick={() => scrollTo("projects")}
              className="group px-7 py-3.5 rounded-full ethereal-cta text-sm sm:text-base font-medium flex items-center gap-2.5 cursor-pointer active:scale-[0.97]"
            >
              <span>Explorar sistemas</span>
              <ArrowDownRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </motion.button>

            <button
              type="button"
              onClick={handleCopy}
              className="px-6 py-3.5 rounded-full ethereal-pill hover:border-[var(--accent-main)] text-xs font-mono tracking-wide flex items-center gap-2 cursor-pointer active:scale-[0.97] min-w-[164px] justify-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied-hero"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5 text-emerald-500 font-medium"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>E-mail copiado</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy-hero"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2 text-[var(--fg-primary)]"
                  >
                    <Copy className="w-3.5 h-3.5 text-[var(--accent-main)]" />
                    <span>Copiar e-mail</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Delicate floating scroll filament (no hard section border!) */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-xs font-mono text-[var(--fg-subtle)]">
        <span className="tracking-widest uppercase">Laravel • React 19 • PostgreSQL</span>
        <button
          type="button"
          onClick={() => scrollTo("projects")}
          className="group inline-flex items-center gap-3 text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors cursor-pointer"
        >
          <span>Role para fluir</span>
          <span className="relative w-px h-7 bg-[var(--border-outline)] overflow-hidden">
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-main)] to-transparent"
            />
          </span>
        </button>
      </div>
    </section>
  );
}

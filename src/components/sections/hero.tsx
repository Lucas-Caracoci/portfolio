"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, Copy, Check } from "lucide-react";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const [copied, setCopied] = useState(false);

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

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-4 pt-32 pb-16 overflow-hidden">
      <div className="relative z-20 w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center">
        {/* Minimalist Kicker & Availability Status */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOutExpo }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/25 text-xs font-mono text-slate-300 mb-6 w-fit drop-shadow-[0_2px_10px_rgba(2,2,3,0.9)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#00F5FF]" />
          </span>
          <span>Disponível para projetos • Arraial do Cabo, RJ</span>
        </motion.div>

        {/* Monumental Authorial Title (H1) — Left-aligned editorial anchor */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.04, ease: easeOutExpo }}
          className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-left leading-none mb-10 bg-linear-to-r from-[#FFFFFF] via-[#F4F4F5] to-[#9B9B9B] bg-clip-text text-transparent drop-shadow-[0_6px_32px_rgba(2,2,3,0.9)]"
        >
          Lucas Caracoci
        </motion.h1>

        {/* Editorial Split Bar: Bio on the left, Actions on the right */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-white/15 items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-base sm:text-xl text-slate-100 max-w-[620px] text-pretty font-normal leading-relaxed drop-shadow-[0_2px_16px_rgba(2,2,3,0.95)]">
              Engenheiro de Software Full-Stack. Desenvolvo sistemas web rápidos, seguros e prontos
              para uso intenso com{" "}
              <span className="text-cyan-300 font-mono font-medium">
                Laravel, React e PostgreSQL
              </span>
              .
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="group px-6 py-3.5 rounded-xl font-semibold text-base text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_28px_-5px_rgba(0,245,255,0.5)] flex items-center gap-2 cursor-pointer active:scale-[0.97]"
            >
              <span>Explorar sistemas</span>
              <ArrowDownRight className="w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              onClick={handleCopyEmail}
              className="px-5 py-3.5 rounded-xl font-mono text-xs text-slate-200 bg-[#020203]/85 hover:bg-[#020203] backdrop-blur-xl border border-white/15 hover:border-cyan-400/40 flex items-center gap-2 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.97] min-w-[140px] justify-center"
              title="Copiar e-mail de contato"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.8, y: 2 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 500, damping: 28 },
                    }}
                    exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.1 } }}
                    className="flex items-center gap-1.5 text-emerald-400 font-medium"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>E-mail copiado</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.8, y: -2 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 500, damping: 28 },
                    }}
                    exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.1 } }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Copiar e-mail</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Filament */}
      <div className="relative z-20 max-w-6xl mx-auto w-full pt-8 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="tracking-widest uppercase">Laravel • React 19 • PostgreSQL</span>
        <button
          type="button"
          onClick={() => scrollTo("projects")}
          className="group inline-flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <span>Role para explorar</span>
          <span className="relative w-px h-6 bg-white/20 overflow-hidden">
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            />
          </span>
        </button>
      </div>
    </section>
  );
}

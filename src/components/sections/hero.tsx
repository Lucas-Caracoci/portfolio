"use client";

import { useState } from "react";
import { HeroShaderBackground } from "../hero-shader-background";
import { DotMatrixOverlay } from "../dot-matrix-overlay";
import { ArrowDownRight, Terminal, Copy, Check, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("lucascaracoci2@gmail.com");
    setCopied(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.75 },
      colors: ["#00F5FF", "#22D3EE", "#38BDF8"],
    });
    setTimeout(() => setCopied(false), 1600);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 pt-28 pb-16 overflow-hidden">
      {/* 1. Fluid Cyan/Cobalt Shader Background (WebGL Three.js) */}
      <HeroShaderBackground />

      {/* 2. Interactive Dot Matrix Grid Overlay */}
      <DotMatrixOverlay />

      {/* 3. Hero Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Architectural Identity Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-xs font-mono text-cyan-300 mb-8 shadow-[0_0_20px_-3px_rgba(0,245,255,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="tracking-wide">ARQUITETURA DE SISTEMAS & DESIGN ENGINEERING</span>
        </div>

        {/* Kinetic Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-100 max-w-4xl leading-[1.08] mb-6">
          Engenharia de alta confiabilidade.
          <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
            Interfaces com precisão cirúrgica.
          </span>
        </h1>

        {/* Narrative positioning statement */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          Olá, sou <span className="text-white font-medium">Lucas Caracoci</span>. Arquiteto de
          Software Full-Stack especializado em monólitos modulares com{" "}
          <span className="text-cyan-300 font-mono text-sm">Laravel 12 & React 19</span>, pipelines
          de migração de dados criptografados e interfaces de altíssimo acabamento visual.
        </p>

        {/* Tactile Action Buttons (Emil Kowalski microinteractions) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={() => scrollTo("case-studies")}
            className="group px-6 py-3.5 rounded-xl font-medium text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-150 shadow-[0_0_30px_-5px_rgba(0,245,255,0.4)] flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Explorar Sistemas Reais</span>
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={() => scrollTo("terminal")}
            className="px-5 py-3.5 rounded-xl font-mono text-sm text-slate-200 glass-panel glass-panel-hover flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Terminal Interativo</span>
          </button>

          <button
            onClick={handleCopyEmail}
            className="px-4 py-3.5 rounded-xl font-mono text-xs text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            title="Copiar e-mail para área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>lucascaracoci2@gmail.com</span>
              </>
            )}
          </button>
        </div>

        {/* Architecture Spec Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono text-slate-400">
          <span className="px-2.5 py-1 rounded-md bg-slate-950/70 border border-cyan-500/20 text-slate-300">
            Laravel 12 / PHP 8.5
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-950/70 border border-cyan-500/20 text-slate-300">
            React 19 / Inertia.js
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-950/70 border border-cyan-500/20 text-slate-300">
            PostgreSQL 18
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-950/70 border border-cyan-500/20 text-slate-300">
            Python ETL & Fernet AES
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-950/70 border border-cyan-500/20 text-slate-300">
            Docker & Linux VPS
          </span>
        </div>
      </div>
    </section>
  );
}

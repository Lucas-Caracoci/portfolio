"use client";

import { useState, useEffect } from "react";
import { Terminal, Command as CommandIcon } from "lucide-react";
import { GithubIcon } from "./icons/github";

interface NavbarProps {
  onOpenCommand: () => void;
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 flex justify-center px-4 transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <nav
        className={`w-full max-w-6xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? "glass-panel bg-slate-950/80 border-cyan-500/25 shadow-lg shadow-black/60"
            : "bg-slate-950/40 backdrop-blur-md border border-white/5"
        }`}
      >
        {/* Brand identity & Status badge */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 group font-mono font-medium text-sm text-slate-100 hover:text-cyan-400 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F5FF] animate-pulse" />
            <span className="tracking-tight font-semibold">Lucas Caracoci</span>
          </a>

          <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-slate-800 text-xs font-mono text-slate-400">
            <span className="text-emerald-400">●</span>
            <span>Disponível para Arquitetura & Projetos</span>
          </div>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
          <button
            onClick={() => scrollTo("case-studies")}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Projetos
          </button>
          <button
            onClick={() => scrollTo("terminal")}
            className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Terminal
          </button>
          <button
            onClick={() => scrollTo("metrics")}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Métricas
          </button>
          <button
            onClick={() => scrollTo("skills")}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Stack
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Contato
          </button>
        </div>

        {/* Actions & Command Menu trigger */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900/80 hover:bg-cyan-950/60 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
            title="Abrir Menu de Comandos (⌘K)"
          >
            <CommandIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Comandos</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] bg-slate-800/80 border border-slate-700 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://github.com/lucascaracoci"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Lucas Caracoci"
            className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60 border border-transparent hover:border-slate-800 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}

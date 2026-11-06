"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import confetti from "canvas-confetti";
import {
  Code2,
  Terminal,
  Database,
  Layers,
  Copy,
  ExternalLink,
  Check,
  Search,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "./icons/github";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("lucascaracoci2@gmail.com");
    setCopied(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#00F5FF", "#22D3EE", "#38BDF8"],
    });
    setTimeout(() => {
      setCopied(false);
      onOpenChange(false);
    }, 1200);
  };

  const scrollTo = (id: string) => {
    onOpenChange(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all duration-150">
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <Command
          className="w-full flex flex-col bg-transparent text-slate-100"
          loop
        >
          {/* Header search bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-cyan-500/15 gap-3">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Digite um comando ou busque projetos... (Ex: 'GIDE', 'Terminal', 'Email')"
              className="w-full bg-transparent text-sm placeholder:text-slate-400 outline-none text-slate-100"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-700 rounded">
              ESC
            </kbd>
          </div>

          {/* List of actions */}
          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1">
            <Command.Empty className="py-6 text-center text-sm text-slate-400">
              Nenhum comando encontrado.
            </Command.Empty>

            <Command.Group
              heading="Ações Rápidas"
              className="text-xs font-mono uppercase text-cyan-400/70 px-2 py-1.5"
            >
              <Command.Item
                onSelect={handleCopyEmail}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-slate-200 hover:bg-cyan-500/15 hover:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-cyan-400" />
                  )}
                  <span>
                    {copied
                      ? "E-mail copiado com sucesso!"
                      : "Copiar e-mail de contato (lucascaracoci2@gmail.com)"}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">1 clique</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open("https://github.com/lucascaracoci", "_blank");
                  onOpenChange(false);
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-slate-200 hover:bg-cyan-500/15 hover:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-slate-300" />
                  <span>Acessar GitHub de Lucas Caracoci</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Navegação em Sistemas & Casos de Estudo"
              className="text-xs font-mono uppercase text-cyan-400/70 px-2 pt-3 pb-1"
            >
              <Command.Item
                onSelect={() => scrollTo("case-studies")}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-slate-200 hover:bg-cyan-500/15 hover:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>GIDE (PMAC Starter Kit & Padrão Municipal)</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">Laravel 12 + Inertia</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo("case-studies")}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-slate-200 hover:bg-cyan-500/15 hover:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>Portal de Concursos (Pipeline ETL Criptografado)</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">Python ETL + PostgreSQL</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo("case-studies")}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-slate-200 hover:bg-cyan-500/15 hover:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Meu Porto (Plataforma Escolar & RBAC)</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">PWA Offline-First</span>
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Playground & Terminal"
              className="text-xs font-mono uppercase text-cyan-400/70 px-2 pt-3 pb-1"
            >
              <Command.Item
                onSelect={() => scrollTo("terminal")}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-slate-200 hover:bg-cyan-500/15 hover:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Abrir Terminal Interativo</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">CLI Hyprland</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo("skills")}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none text-slate-200 hover:bg-cyan-500/15 hover:text-cyan-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Ver Matriz de Arquitetura & Stack</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">PHP, React, Postgres</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer note */}
          <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Navegue com ↑ / ↓ e selecione com Enter</span>
            <span className="text-cyan-400">Lucas Caracoci • Portfolio</span>
          </div>
        </Command>
      </div>
    </div>
  );
}

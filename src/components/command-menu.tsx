"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Code2,
  Copy,
  ExternalLink,
  Check,
  Search,
  Sparkles,
  Briefcase,
  Layers,
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
    setTimeout(() => {
      setCopied(false);
      onOpenChange(false);
    }, 900);
  };

  const scrollTo = (id: string) => {
    onOpenChange(false);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: id } })
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/70 backdrop-blur-md">
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl bg-[#F4F1EA] rounded-2xl border border-[#111111]/20 shadow-2xl overflow-hidden z-10">
        <Command
          className="w-full flex flex-col bg-transparent text-[#111111]"
          loop
        >
          {/* Header search bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-[#111111]/12 gap-3 bg-white">
            <Search className="w-5 h-5 text-[#FF3B00] shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Busque seções ou ações... (Ex: 'Projetos', 'Ferramentas', 'Email')"
              className="w-full bg-transparent text-sm placeholder:text-[#575551] outline-none text-[#111111]"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono text-[#575551] bg-[#F4F1EA] border border-[#111111]/15 rounded">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1">
            <Command.Empty className="py-6 text-center text-sm text-[#575551]">
              Nenhum comando encontrado.
            </Command.Empty>

            <Command.Group
              heading="Navegação Rápida"
              className="text-xs font-mono uppercase text-[#FF3B00] font-bold px-2 py-1.5"
            >
              <Command.Item
                onSelect={() => scrollTo("exp-hero")}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer select-none text-[#111111] hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#FF3B00]" />
                  <span>Início — Hero Cinética &amp; Magnética</span>
                </div>
                <span className="text-xs text-[#575551] font-mono">Topo</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo("exp-projects")}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer select-none text-[#111111] hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#FF3B00]" />
                  <span>Projetos — Horizontal Pin &amp; Cards Magnéticos</span>
                </div>
                <span className="text-xs text-[#575551] font-mono">GIDE, Concursos, Meu Porto</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo("stack")}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer select-none text-[#111111] hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-4 h-4 text-[#111111]" />
                  <span>Caixa de Ferramentas &amp; Stack</span>
                </div>
                <span className="text-xs text-[#575551] font-mono">Laravel, React, Postgres</span>
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo("career")}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer select-none text-[#111111] hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-[#111111]" />
                  <span>Trajetória Profissional (2025 — Hoje)</span>
                </div>
                <span className="text-xs text-[#575551] font-mono">TI → Full-Stack</span>
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Contato Direto"
              className="text-xs font-mono uppercase text-[#575551] font-bold px-2 pt-3 pb-1"
            >
              <Command.Item
                onSelect={handleCopyEmail}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer select-none text-[#111111] hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#FF3B00]" />
                  )}
                  <span>
                    {copied
                      ? "E-mail copiado com sucesso!"
                      : "Copiar meu e-mail (lucascaracoci2@gmail.com)"}
                  </span>
                </div>
                <span className="text-xs text-[#575551] font-mono">1 clique</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open("https://github.com/Lucas-Caracoci", "_blank");
                  onOpenChange(false);
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer select-none text-[#111111] hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[#111111]" />
                  <span>Abrir meu GitHub (Lucas-Caracoci)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#575551]" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="px-4 py-2 bg-[#EAE5DC] border-t border-[#111111]/10 text-[11px] font-mono text-[#575551] flex items-center justify-between">
            <span>Navegue com ↑ / ↓ e Enter</span>
            <span className="text-[#FF3B00] font-bold">Swiss Kinetic Edition</span>
          </div>
        </Command>
      </div>
    </div>
  );
}

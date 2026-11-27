"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import type { ProjectId } from "@/components/v5/rb-projects";
import {
  SolarSearch,
  SolarSparkles,
  SolarLayers,
  SolarCopy,
  SolarCheck,
  SolarArrowUpRight,
} from "@/components/react-bits/icons";
import { GithubIcon } from "./icons/github";
import { LinkedinIcon } from "./icons/linkedin";

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
    }, 800);
  };

  const scrollTo = (id: string) => {
    onOpenChange(false);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: id } })
    );
  };

  const selectProject = (projectId: ProjectId) => {
    onOpenChange(false);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", {
        detail: { target: `project-${projectId}` },
      })
    );
  };

  // Instantaneous render with zero entrance animation delay per Emil Kowalski Rule #1
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl bg-[#111111]/95 backdrop-blur-2xl rounded-2xl border border-white/12 shadow-2xl overflow-hidden z-10">
        <Command
          className="w-full flex flex-col bg-transparent text-[#fff7ed]"
          loop
        >
          <div className="flex items-center px-4 py-3 border-b border-white/10 gap-3 bg-[#161616]/90">
            <SolarSearch className="w-5 h-5 text-[#f97316] shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Buscar seções ou sistemas em produção..."
              className="w-full bg-transparent text-sm placeholder:text-neutral-500 outline-none text-[#fff7ed]"
            />
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono text-neutral-400 bg-[#1C1C1C] border border-white/10 rounded">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1">
            <Command.Empty className="py-6 text-center text-sm text-neutral-400">
              Nenhum comando encontrado.
            </Command.Empty>

            <Command.Group
              heading="Navegação Rápida"
              className="text-xs font-mono uppercase text-[#f97316] px-2 py-1.5"
            >
              {[
                { id: "hero", label: "Início", meta: "TechText & Grainient" },
                {
                  id: "about",
                  label: "Sobre Mim e Credencial 3D",
                  meta: "Lanyard",
                },
                {
                  id: "projects",
                  label: "Projetos em Produção",
                  meta: "4 Sistemas",
                },
                {
                  id: "career",
                  label: "Trajetória Profissional",
                  meta: "2025 a 2026",
                },
                { id: "contact", label: "Contato Direto", meta: "E mail" },
              ].map((item) => (
                <Command.Item
                  key={item.id}
                  onSelect={() => scrollTo(item.id)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer select-none text-neutral-200 hover:bg-[#1C1C1C] hover:text-white data-[selected=true]:bg-[#1C1C1C] data-[selected=true]:text-white transition-colors duration-150"
                >
                  <div className="flex items-center gap-2.5">
                    <SolarSparkles className="w-4 h-4 text-[#f97316]" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    {item.meta}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Inspecionar Sistemas"
              className="text-xs font-mono uppercase text-neutral-400 px-2 pt-3 pb-1"
            >
              {(
                [
                  {
                    id: "gide",
                    label: "GIDE • Avaliação em Rede",
                    tech: "IndexedDB e QR",
                  },
                  {
                    id: "concursos",
                    label: "Portal de Concursos",
                    tech: "PDF Headless",
                  },
                  {
                    id: "meu-porto",
                    label: "Meu Porto • Comunidade Escolar",
                    tech: "Match 96%",
                  },
                  {
                    id: "pizzashop",
                    label: "PizzaShop Web",
                    tech: "React 19 e Zod",
                  },
                ] as const
              ).map((proj) => (
                <Command.Item
                  key={proj.id}
                  onSelect={() => selectProject(proj.id)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer select-none text-neutral-200 hover:bg-[#1C1C1C] hover:text-white data-[selected=true]:bg-[#1C1C1C] data-[selected=true]:text-white transition-colors duration-150"
                >
                  <div className="flex items-center gap-2.5">
                    <SolarLayers className="w-4 h-4 text-[#f97316]" />
                    <span>{proj.label}</span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    {proj.tech}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Ações Diretas"
              className="text-xs font-mono uppercase text-neutral-400 px-2 pt-3 pb-1"
            >
              <Command.Item
                onSelect={handleCopyEmail}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer select-none text-neutral-200 hover:bg-[#1C1C1C] hover:text-white data-[selected=true]:bg-[#1C1C1C] data-[selected=true]:text-white transition-colors duration-150"
              >
                <div className="flex items-center gap-2.5">
                  {copied ? (
                    <SolarCheck className="w-4 h-4 text-[#f97316]" />
                  ) : (
                    <SolarCopy className="w-4 h-4 text-[#f97316]" />
                  )}
                  <span>
                    {copied
                      ? "Endereço copiado para a área de transferência"
                      : "Copiar e mail (lucascaracoci2@gmail.com)"}
                  </span>
                </div>
                <span className="text-xs text-neutral-400 font-mono">
                  1 clique
                </span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open(
                    "https://www.linkedin.com/in/lucascaracoci/",
                    "_blank"
                  );
                  onOpenChange(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer select-none text-neutral-200 hover:bg-[#1C1C1C] hover:text-white data-[selected=true]:bg-[#1C1C1C] data-[selected=true]:text-white transition-colors duration-150"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-[#fff7ed]" />
                  <span>Abrir perfil no LinkedIn</span>
                </div>
                <SolarArrowUpRight className="w-4 h-4 text-neutral-400" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open("https://github.com/Lucas-Caracoci", "_blank");
                  onOpenChange(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer select-none text-neutral-200 hover:bg-[#1C1C1C] hover:text-white data-[selected=true]:bg-[#1C1C1C] data-[selected=true]:text-white transition-colors duration-150"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[#fff7ed]" />
                  <span>Abrir perfil no GitHub</span>
                </div>
                <SolarArrowUpRight className="w-4 h-4 text-neutral-400" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="px-4 py-2 bg-[#161616]/90 border-t border-white/10 text-xs font-mono text-neutral-400 flex items-center justify-between">
            <span>Navegue com ↑ / ↓ e Enter</span>
            <span className="text-[#f97316]">Atalho ⌘K</span>
          </div>
        </Command>
      </div>
    </div>
  );
}

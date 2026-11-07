"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Code2,
  Database,
  Layers,
  Copy,
  ExternalLink,
  Check,
  Search,
  Sparkles,
  Briefcase,
  ShoppingBag,
  Sun,
  Moon,
  Orbit,
  Waves,
  Mail,
} from "lucide-react";
import { GithubIcon } from "./icons/github";
import { useTheme } from "./v3/theme-provider";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        onOpenChange(false);
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
    }, 750);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    onOpenChange(false);
  };

  const scrollTo = (id: string) => {
    onOpenChange(false);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: id } })
    );
  };

  const selectProjectAndScroll = (
    projectId: "gide" | "concursos" | "meu-porto" | "pizzashop"
  ) => {
    window.dispatchEvent(
      new CustomEvent("portfolio:select-project", { detail: { projectId } })
    );
    scrollTo("projects");
  };

  if (!open) return null;

  const itemClass =
    "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer select-none text-[var(--fg-primary)] data-[selected=true]:bg-[var(--accent-main)] data-[selected=true]:text-[var(--accent-fg)]";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu de comandos rápidos"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-2xl overflow-hidden z-10">
        <Command className="w-full flex flex-col bg-transparent text-[var(--fg-primary)]" loop>
          {/* Header search bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-subtle)] gap-3 bg-[var(--bg-elevated)]">
            <Search className="w-5 h-5 text-[var(--accent-main)] shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Buscar projetos, seções ou alternar tema..."
              className="w-full bg-transparent text-sm placeholder:text-[var(--fg-muted)] outline-none text-[var(--fg-primary)]"
            />
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono text-[var(--fg-muted)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded cursor-pointer"
            >
              ESC
            </button>
          </div>

          {/* List of actions */}
          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1">
            <Command.Empty className="py-6 text-center text-sm text-[var(--fg-muted)]">
              Nenhum comando encontrado.
            </Command.Empty>

            <Command.Group
              heading="Ações Rápidas & Tema"
              className="text-xs font-mono uppercase text-[var(--fg-muted)] px-2 py-1.5"
            >
              <Command.Item onSelect={handleToggleTheme} className={itemClass}>
                <div className="flex items-center gap-2.5">
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 shrink-0" />
                  ) : (
                    <Moon className="w-4 h-4 shrink-0" />
                  )}
                  <span>
                    {theme === "dark"
                      ? "Alternar para Modo Claro (Electric Klein)"
                      : "Alternar para Modo Escuro (Acid Volt)"}
                  </span>
                </div>
                <span className="text-xs opacity-75 font-mono">Tema</span>
              </Command.Item>

              <Command.Item onSelect={handleCopyEmail} className={itemClass}>
                <div className="flex items-center gap-2.5">
                  {copied ? (
                    <Check className="w-4 h-4 shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 shrink-0" />
                  )}
                  <span>
                    {copied
                      ? "E-mail copiado!"
                      : "Copiar e-mail (lucascaracoci2@gmail.com)"}
                  </span>
                </div>
                <span className="text-xs opacity-75 font-mono">1 clique</span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open("https://github.com/Lucas-Caracoci", "_blank", "noopener,noreferrer");
                  onOpenChange(false);
                }}
                className={itemClass}
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 shrink-0" />
                  <span>Abrir GitHub de Lucas Caracoci</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" />
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Sistemas em Produção"
              className="text-xs font-mono uppercase text-[var(--fg-muted)] px-2 pt-3 pb-1"
            >
              <Command.Item
                onSelect={() => selectProjectAndScroll("gide")}
                className={itemClass}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>GIDE — Avaliação educacional offline & QR Code</span>
                </div>
                <span className="text-xs opacity-75 font-mono">Laravel + Dexie</span>
              </Command.Item>

              <Command.Item
                onSelect={() => selectProjectAndScroll("concursos")}
                className={itemClass}
              >
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 shrink-0" />
                  <span>Portal de Concursos — Editais & fusão de PDFs</span>
                </div>
                <span className="text-xs opacity-75 font-mono">Postgres + PDF</span>
              </Command.Item>

              <Command.Item
                onSelect={() => selectProjectAndScroll("meu-porto")}
                className={itemClass}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Meu Porto — Mentoria estudantil & suporte</span>
                </div>
                <span className="text-xs opacity-75 font-mono">Inertia + Zod</span>
              </Command.Item>

              <Command.Item
                onSelect={() => selectProjectAndScroll("pizzashop")}
                className={itemClass}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  <span>PizzaShop Web — Painel de pedidos & métricas</span>
                </div>
                <span className="text-xs opacity-75 font-mono">React 19</span>
              </Command.Item>
            </Command.Group>

            <Command.Group
              heading="Navegação"
              className="text-xs font-mono uppercase text-[var(--fg-muted)] px-2 pt-3 pb-1"
            >
              <Command.Item onSelect={() => scrollTo("hero-1")} className={itemClass}>
                <div className="flex items-center gap-2.5">
                  <Orbit className="w-4 h-4 shrink-0" />
                  <span>Hero 01 — Escultura de Partículas 3D</span>
                </div>
                <span className="text-xs opacity-75 font-mono">WebGL</span>
              </Command.Item>

              <Command.Item onSelect={() => scrollTo("hero-2")} className={itemClass}>
                <div className="flex items-center gap-2.5">
                  <Waves className="w-4 h-4 shrink-0" />
                  <span>Hero 02 — Campo de Fluxo Magnético 3D</span>
                </div>
                <span className="text-xs opacity-75 font-mono">WebGL</span>
              </Command.Item>

              <Command.Item onSelect={() => scrollTo("stack")} className={itemClass}>
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-4 h-4 shrink-0" />
                  <span>02 / Stack & Tecnologias</span>
                </div>
                <span className="text-xs opacity-75 font-mono">Backend • Frontend</span>
              </Command.Item>

              <Command.Item onSelect={() => scrollTo("career")} className={itemClass}>
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>03 / Carreira Profissional</span>
                </div>
                <span className="text-xs opacity-75 font-mono">2025 — Atual</span>
              </Command.Item>

              <Command.Item onSelect={() => scrollTo("contact")} className={itemClass}>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>04 / Contato Direto</span>
                </div>
                <span className="text-xs opacity-75 font-mono">E-mail</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer note */}
          <div className="px-4 py-2 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] text-xs font-mono text-[var(--fg-muted)] flex items-center justify-between">
            <span>↑ / ↓ para navegar • Enter para selecionar</span>
            <span className="text-[var(--accent-main)] font-semibold">V3 Dual-Mode</span>
          </div>
        </Command>
      </div>
    </div>
  );
}

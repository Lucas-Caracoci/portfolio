"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Command as CommandIcon, Menu, X } from "lucide-react";
import { GithubIcon } from "../icons/github";
import { useTheme } from "./theme-provider";

interface EtherealNavbarProps {
  onOpenCommand: () => void;
}

const navLinks = [
  { id: "hero", label: "Início" },
  { id: "projects", label: "Sistemas" },
  { id: "stack", label: "Stack" },
  { id: "career", label: "Trajetória" },
  { id: "contact", label: "Contato" },
] as const;

export function EtherealNavbar({ onOpenCommand }: EtherealNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-32% 0px -52% 0px", threshold: 0 }
    );

    navLinks.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: id } })
    );
  };

  const scrollToTop = () => {
    setMobileOpen(false);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: 0 } })
    );
  };

  const highlighted = hoveredNav ?? activeSection;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 flex flex-col items-center px-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="w-full max-w-5xl flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-full ethereal-glass"
      >
        {/* Whisper-light Editorial Brand */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2.5 text-sm cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent-main)] shadow-[0_0_12px_var(--accent-main)]" />
          <span className="font-light tracking-tight">
            Lucas <span className="font-serif-display text-base">Caracoci</span>
          </span>
        </button>

        {/* Desktop Translucent Links */}
        <div
          className="hidden md:flex items-center gap-1 text-xs font-mono"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navLinks.map((item) => {
            const isHighlighted = highlighted === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer active:scale-[0.97] ${
                  isHighlighted
                    ? "text-[var(--fg-primary)] font-medium"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg-primary)]"
                }`}
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="etherealNavPill"
                    transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.75 }}
                    className="absolute inset-0 rounded-full bg-[var(--bg-tint)] border border-[var(--border-outline)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] -z-10"
                  />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Controls: Theme Toggle + ⌘K + GitHub + Mobile Menu */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
            title={theme === "dark" ? "Modo Claro (Iridescent Pearl)" : "Modo Escuro (Astral Obsidian)"}
            className="p-2 rounded-full ethereal-pill hover:border-[var(--accent-main)] cursor-pointer active:scale-[0.94]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="sun-v4"
                  initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
                  transition={{ duration: 0.16 }}
                  className="block"
                >
                  <Sun className="w-4 h-4 text-[var(--accent-main)]" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon-v4"
                  initial={{ opacity: 0, rotate: 40, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -40, scale: 0.8 }}
                  transition={{ duration: 0.16 }}
                  className="block"
                >
                  <Moon className="w-4 h-4 text-[var(--accent-main)]" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={onOpenCommand}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full ethereal-pill hover:border-[var(--accent-main)] text-xs font-mono cursor-pointer active:scale-[0.97]"
            title="Menu de Comandos (⌘K)"
          >
            <CommandIcon className="w-3.5 h-3.5 text-[var(--accent-main)]" />
            <kbd className="hidden sm:inline-block text-xs text-[var(--fg-muted)]">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://github.com/Lucas-Caracoci"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Lucas Caracoci"
            className="p-2 rounded-full ethereal-pill hover:border-[var(--accent-main)] transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            className="md:hidden p-2 rounded-full ethereal-pill text-[var(--fg-primary)] cursor-pointer active:scale-[0.95]"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Translucent Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.22 } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.14 } }}
            className="md:hidden w-full max-w-5xl mt-2 p-3 rounded-3xl ethereal-glass"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-2.5 rounded-2xl text-left text-xs font-mono cursor-pointer transition-colors ${
                    activeSection === item.id
                      ? "bg-[var(--bg-tint)] border border-[var(--border-outline)] text-[var(--fg-primary)] font-medium"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg-primary)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

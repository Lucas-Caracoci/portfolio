"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Command as CommandIcon, Menu, X } from "lucide-react";
import { GithubIcon } from "../icons/github";
import { useTheme } from "./theme-provider";

interface V3NavbarProps {
  onOpenCommand: () => void;
}

const navLinks = [
  { id: "hero-1", label: "Hero 01" },
  { id: "hero-2", label: "Hero 02" },
  { id: "projects", label: "Projetos" },
  { id: "stack", label: "Stack" },
  { id: "career", label: "Carreira" },
  { id: "contact", label: "Contato" },
] as const;

export function V3Navbar({ onOpenCommand }: V3NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero-1");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
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
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
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
      className={`fixed top-0 left-0 right-0 z-40 flex flex-col items-center px-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className={`w-full max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full v3-glass transition-shadow duration-300 ${
          scrolled ? "shadow-xl" : ""
        }`}
      >
        {/* Brand */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2.5 font-mono text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-main)]" />
          <span className="tracking-tight">Lucas Caracoci</span>
        </button>

        {/* Desktop Links */}
        <div
          className="hidden lg:flex items-center gap-1 text-xs font-mono"
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
                className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-150 cursor-pointer active:scale-[0.97] ${
                  isHighlighted
                    ? "text-[var(--accent-fg)] font-semibold"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg-primary)]"
                }`}
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="v3NavPill"
                    transition={{ type: "spring", stiffness: 460, damping: 34, mass: 0.7 }}
                    className="absolute inset-0 rounded-full bg-[var(--accent-main)] -z-10"
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
            title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            className="p-2 rounded-full v3-surface hover:border-[var(--accent-main)] cursor-pointer active:scale-[0.95]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <Sun className="w-4 h-4 text-[var(--accent-main)]" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
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
            className="flex items-center gap-2 px-3 py-1.5 rounded-full v3-surface hover:border-[var(--accent-main)] text-xs font-mono cursor-pointer active:scale-[0.97]"
            title="Abrir Comandos (⌘K)"
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
            className="p-2 rounded-full v3-surface hover:border-[var(--accent-main)] transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            className="lg:hidden p-2 rounded-full bg-[var(--accent-main)] text-[var(--accent-fg)] cursor-pointer active:scale-[0.95]"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
            className="lg:hidden w-full max-w-7xl mt-2 p-3 rounded-2xl v3-glass shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-left text-xs font-mono cursor-pointer transition-colors ${
                    activeSection === item.id
                      ? "bg-[var(--accent-main)] text-[var(--accent-fg)] font-semibold"
                      : "v3-surface text-[var(--fg-primary)]"
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

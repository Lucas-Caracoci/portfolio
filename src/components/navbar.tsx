"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Command as CommandIcon, Menu, X } from "lucide-react";
import { GithubIcon } from "./icons/github";

interface NavbarProps {
  onOpenCommand: () => void;
}

const navLinks = [
  { id: "case-studies", label: "Projetos" },
  { id: "skills", label: "Arquitetura" },
  { id: "experience", label: "Carreira" },
  { id: "terminal", label: "Terminal", hasIcon: true },
  { id: "contact", label: "Contato" },
] as const;

export function Navbar({ onOpenCommand }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY < 260) {
        setActiveSection(null);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 260) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
      }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: id } })
    );
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: 0 } })
    );
  };

  const highlightedNav = hoveredNav ?? activeSection;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 flex flex-col items-center px-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className={`w-full max-w-6xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled || mobileMenuOpen
            ? "glass-panel bg-slate-950/85 border-cyan-500/25 shadow-lg shadow-black/60"
            : "bg-slate-950/40 backdrop-blur-md border border-white/5"
        }`}
      >
        {/* Brand identity & Status badge */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 group font-mono font-medium text-sm text-slate-100 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F5FF] animate-pulse" />
            <span className="tracking-tight font-semibold">Lucas Caracoci</span>
          </button>

          <div className="hidden xl:flex items-center gap-1.5 pl-3 border-l border-slate-800 text-xs font-mono text-slate-400">
            <span className="text-emerald-400">●</span>
            <span>Disponível para Arquitetura & Projetos</span>
          </div>
        </div>

        {/* Center Links Ordered by Importance + Spring Active/Hover Pill */}
        <div
          className="hidden md:flex items-center gap-1 text-xs font-mono text-slate-300"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navLinks.map((item) => {
            const isHighlighted = highlightedNav === item.id;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                className={`relative px-3 py-1.5 rounded-full transition-colors duration-150 cursor-pointer flex items-center gap-1.5 active:scale-[0.97] ${
                  isActive ? "text-cyan-300 font-semibold" : "hover:text-cyan-300"
                }`}
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="navHoverPill"
                    transition={{ type: "spring", stiffness: 460, damping: 34, mass: 0.7 }}
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-cyan-400/25 -z-10"
                  />
                )}
                {"hasIcon" in item && item.hasIcon && (
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Actions, Command Menu trigger & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900/80 hover:bg-cyan-950/60 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors duration-150 cursor-pointer active:scale-[0.98]"
            title="Abrir Menu de Comandos (⌘K)"
          >
            <CommandIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Comandos</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] bg-slate-800/80 border border-slate-700 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://github.com/Lucas-Caracoci"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Lucas Caracoci"
            className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60 border border-transparent hover:border-slate-800 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle Button (< md) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-cyan-400 bg-slate-900/70 border border-slate-800 cursor-pointer active:scale-[0.96]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
                  transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  <X className="w-4 h-4 text-cyan-400" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 45, scale: 0.85 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.85 }}
                  transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  <Menu className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer (< md) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{
              opacity: 0,
              y: -6,
              transition: { duration: 0.13, ease: [0.22, 1, 0.36, 1] },
            }}
            className="md:hidden w-full max-w-6xl mt-2 p-3 rounded-2xl glass-panel bg-[#020203]/95 border border-white/15 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: idx * 0.035,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-left text-xs font-mono flex items-center justify-between border transition-colors cursor-pointer active:scale-[0.98] ${
                    activeSection === item.id
                      ? "bg-cyan-950/40 border-cyan-400/40 text-cyan-300 font-semibold"
                      : "bg-white/[0.02] border-white/10 text-slate-200 hover:border-white/25"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-slate-500">0{idx + 1}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command as CommandIcon, Menu, X } from "lucide-react";
import { GithubIcon } from "../icons/github";

interface SwissNavbarProps {
  onOpenCommand: () => void;
}

const navLinks = [
  { id: "exp-hero", label: "Início" },
  { id: "exp-projects", label: "Projetos" },
  { id: "stack", label: "Ferramentas" },
  { id: "career", label: "Trajetória" },
  { id: "contact", label: "Contato" },
] as const;

export function SwissNavbar({ onOpenCommand }: SwissNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("exp-hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
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
        className={`w-full max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled || mobileOpen
            ? "bg-[#F4F1EA]/90 backdrop-blur-xl border border-[#111111]/15 shadow-[0_12px_32px_-12px_rgba(17,17,17,0.12)]"
            : "bg-[#F4F1EA]/70 backdrop-blur-md border border-[#111111]/10"
        }`}
      >
        {/* Brand Identity */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2.5 font-mono text-sm font-bold text-[#111111] hover:text-[#FF3B00] transition-colors cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B00]" />
          <span className="tracking-tight">Lucas Caracoci</span>
        </button>

        {/* Center Links with Spring Pill */}
        <div
          className="hidden md:flex items-center gap-1 text-xs font-mono text-[#111111]"
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
                  isHighlighted ? "text-white font-semibold" : "text-[#575551] hover:text-[#111111]"
                }`}
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="swissNavPill"
                    transition={{ type: "spring", stiffness: 460, damping: 34, mass: 0.7 }}
                    className="absolute inset-0 rounded-full bg-[#141413] -z-10"
                  />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-[#111111] bg-white hover:bg-[#EAE5DC] border border-[#111111]/15 transition-colors cursor-pointer active:scale-[0.97]"
            title="Abrir Menu de Comandos (⌘K)"
          >
            <CommandIcon className="w-3.5 h-3.5 text-[#FF3B00]" />
            <span className="hidden sm:inline font-medium">Menu</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] bg-[#F4F1EA] border border-[#111111]/15 rounded text-[#575551]">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://github.com/Lucas-Caracoci"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Lucas Caracoci"
            className="p-2 rounded-full text-[#111111] hover:text-white bg-white hover:bg-[#141413] border border-[#111111]/15 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            className="md:hidden p-2 rounded-full bg-[#141413] text-[#F4F1EA] cursor-pointer active:scale-[0.96]"
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
            className="md:hidden w-full max-w-7xl mt-2 p-3 rounded-2xl bg-[#F4F1EA]/95 backdrop-blur-xl border border-[#111111]/15 shadow-xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-left text-xs font-mono border transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? "bg-[#141413] text-[#F4F1EA] border-[#141413] font-semibold"
                      : "bg-white text-[#111111] border-[#111111]/10"
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

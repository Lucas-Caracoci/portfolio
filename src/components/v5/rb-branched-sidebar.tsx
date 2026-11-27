"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BranchedMenu, {
  type BranchedMenuItem,
} from "@/components/react-bits/BranchedMenu";
import {
  SolarSparkles,
  SolarCode,
  SolarLayers,
  SolarServer,
  SolarSearch,
  SolarArrowUpRight,
} from "@/components/react-bits/icons";
import { GithubIcon } from "@/components/icons/github";

const SECTION_IDS = ["hero", "about", "projects", "career", "contact"];
const baseCurve = [0.22, 1, 0.36, 1] as const;

interface RbBranchedSidebarProps {
  onOpenCommand: () => void;
}

export function RbBranchedSidebar({ onOpenCommand }: RbBranchedSidebarProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      rafId = null;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(Math.max(0, Math.min(1, window.scrollY / scrollable)));
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const rootNode = (
    <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase text-white/90">
      <span
        aria-hidden="true"
        className="w-2 h-2 rounded-full bg-[#f97316] shadow-[0_0_8px_#f97316]"
      />
      <span>LC</span>
    </span>
  );

  const menuItems: BranchedMenuItem[] = [
    {
      label: "Navegação principal",
      labelNode: rootNode,
      children: [
        {
          value: "hero",
          label: "Início",
          icon: <SolarSparkles className="w-3.5 h-3.5" />,
        },
        {
          value: "about",
          label: "Sobre Mim",
          icon: <SolarCode className="w-3.5 h-3.5" />,
        },
        {
          value: "projects",
          label: "Projetos",
          icon: <SolarLayers className="w-3.5 h-3.5" />,
        },
        {
          value: "career",
          label: "Carreira",
          icon: <SolarServer className="w-3.5 h-3.5" />,
        },
        {
          value: "contact",
          label: "Contato",
          icon: <SolarSparkles className="w-3.5 h-3.5" />,
        },
      ],
    },
  ];

  const handleSelect = (value: string) => {
    setMobileOpen(false);
    setActiveSection(value);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: value } })
    );
  };

  return (
    <>
      {/* Desktop Fixed Left Floating Branched Menu */}
      <aside
        aria-label="Navegação lateral em árvore"
        className="hidden lg:block fixed left-5 top-1/2 -translate-y-1/2 z-30 drop-shadow-[0_2px_6px_rgba(10,10,10,0.95)]"
      >
        <BranchedMenu
          items={menuItems}
          defaultOpen={[0]}
          activeValue={activeSection}
          scrollProgress={scrollProgress}
          onSelect={handleSelect}
          color="#ffffff"
          accentColor="#f97316"
          lineColor="rgba(255, 255, 255, 0.24)"
          width={196}
          rowHeight={34}
          indent={34}
          trunk={11}
          radius={9}
          lineWidth={1.75}
          fontSize={13.5}
          drawDuration={360}
          foldDuration={260}
        />
      </aside>

      {/* Desktop Fixed Top-Right Discreet Command Palette Pill */}
      <button
        type="button"
        onClick={onOpenCommand}
        aria-label="Abrir busca rápida e comandos"
        className="hidden lg:inline-flex fixed top-5 right-5 z-40 items-center gap-2 px-3 py-2 rounded-full bg-[#161616]/85 hover:bg-[#1C1C1C] backdrop-blur-xl border border-white/10 hover:border-[#f97316]/50 text-xs font-mono font-medium text-neutral-200 hover:text-white shadow-xl transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.97]"
      >
        <SolarSearch className="w-3.5 h-3.5 text-[#f97316]" />
        <span>Buscar</span>
        <kbd className="px-1.5 py-0.5 rounded bg-[#111111] border border-white/10 text-[11px] text-neutral-400">
          ⌘K
        </kbd>
      </button>

      {/* Mobile Top-Right Controls (Command + Fullscreen Branch Menu Trigger) */}
      <div className="lg:hidden fixed top-4 right-4 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenCommand}
          aria-label="Abrir busca rápida"
          className="h-9 px-3 rounded-full bg-[#161616]/88 hover:bg-[#1C1C1C] backdrop-blur-xl border border-white/10 text-xs font-mono font-medium text-neutral-200 flex items-center gap-1.5 shadow-xl transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.97]"
        >
          <SolarSearch className="w-3.5 h-3.5 text-[#f97316]" />
          <span>⌘K</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
          aria-label="Abrir menu de navegação"
          className="h-9 px-3.5 rounded-full bg-[#161616]/88 hover:bg-[#1C1C1C] backdrop-blur-xl border border-white/10 text-xs font-mono font-semibold text-white flex items-center gap-2 shadow-xl transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.97]"
        >
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-[#f97316]"
          />
          <span>Menu</span>
        </button>
      </div>

      {/* Mobile Fullscreen Branch Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: baseCurve }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="lg:hidden fixed inset-0 z-50 bg-[#111111]/95 backdrop-blur-2xl flex flex-col justify-between p-6"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase text-white">
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-[#f97316] shadow-[0_0_8px_#f97316]"
                />
                <span>Lucas Caracoci</span>
              </span>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar menu de navegação"
                className="h-9 px-3.5 rounded-full bg-[#1C1C1C] hover:bg-[#242424] border border-white/10 text-xs font-mono font-medium text-neutral-200 hover:text-white transition-colors duration-200 cursor-pointer active:scale-[0.97]"
              >
                Fechar
              </button>
            </div>

            <motion.nav
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.28, ease: baseCurve }}
              className="my-auto pl-2"
            >
              <BranchedMenu
                items={menuItems}
                defaultOpen={[0]}
                activeValue={activeSection}
                scrollProgress={scrollProgress}
                onSelect={handleSelect}
                color="#ffffff"
                accentColor="#f97316"
                lineColor="rgba(255, 255, 255, 0.24)"
                width={280}
                rowHeight={44}
                indent={38}
                trunk={12}
                radius={10}
                lineWidth={1.75}
                fontSize={16}
                drawDuration={360}
                foldDuration={260}
              />
            </motion.nav>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCommand();
                }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#161616] border border-white/10 text-neutral-200 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <SolarSearch className="w-3.5 h-3.5 text-[#f97316]" />
                <span>Busca rápida (⌘K)</span>
              </button>

              <a
                href="https://github.com/Lucas-Caracoci"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors duration-200"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <SolarArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

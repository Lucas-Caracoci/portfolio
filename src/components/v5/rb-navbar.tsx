"use client";

import { useEffect, useState } from "react";
import PillNav, { type PillNavItem } from "@/components/react-bits/PillNav";
import { SolarSearch } from "@/components/react-bits/icons";

const navItems: Array<{ id: string; label: string }> = [
  { id: "hero", label: "Início" },
  { id: "about", label: "Sobre" },
  { id: "projects", label: "Projetos" },
  { id: "career", label: "Carreira" },
  { id: "contact", label: "Contato" },
];

interface RbNavbarProps {
  onOpenCommand: () => void;
}

export function RbNavbar({ onOpenCommand }: RbNavbarProps) {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    const elements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
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

  const scrollTo = (id: string) => {
    setActiveId(id);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: id } })
    );
  };

  const pillItems: PillNavItem[] = navItems.map((item) => ({
    label: item.label,
    href: `#${item.id}`,
  }));

  const logoMark = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5 text-[#f97316]"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 9L11 12L8 15M13 15H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <header className="fixed top-4 inset-x-0 z-40 px-4 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 max-w-full">
        <PillNav
          logo={logoMark}
          logoAlt="Lucas Caracoci — Início"
          logoHref="#hero"
          items={pillItems}
          activeHref={`#${activeId}`}
          theme="dark"
          layout="split"
          size="md"
          surface="glass"
          itemStyle="pill"
          hoverEffect="fill"
          indicator="dot"
          highlightColor="#f97316"
          highlightTextColor="#120f17"
          barColor="rgba(26, 21, 32, 0.76)"
          textColor="#fff7ed"
          ariaLabel="Navegação principal"
          onItemClick={(item, _index, event) => {
            event.preventDefault();
            const targetId = (item.href || "#hero").replace("#", "");
            scrollTo(targetId);
          }}
        />

        <button
          type="button"
          onClick={onOpenCommand}
          aria-label="Abrir menu de comando rápido"
          className="h-[44px] px-3.5 rounded-full bg-[#1a1520]/80 hover:bg-[#2c2234] backdrop-blur-xl border border-[#fed7aa]/12 text-xs font-mono font-semibold text-[#fff7ed] flex items-center gap-1.5 shadow-xl transition-colors duration-200 cursor-pointer shrink-0"
        >
          <SolarSearch className="w-4 h-4 text-[#f97316]" />
          <span className="hidden sm:inline">⌘K</span>
        </button>
      </div>
    </header>
  );
}


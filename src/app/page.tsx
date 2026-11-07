"use client";

import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CommandMenu } from "@/components/command-menu";
import { SwissNavbar } from "@/components/v2/swiss-navbar";
import { HeroMagneticKinetic } from "@/components/v2/hero-magnetic-kinetic";
import { HeroKinetic } from "@/components/v2/hero-kinetic";
import { HorizontalProjectsPin } from "@/components/v2/horizontal-projects-pin";
import { SwissStackIndex } from "@/components/v2/swiss-stack-index";
import { SwissCareer } from "@/components/v2/swiss-career";
import { SwissFooter } from "@/components/v2/swiss-footer";
import { MotionLabPill, type HeroVariant } from "@/components/v2/motion-lab-pill";

export default function HomePage() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [heroVariant, setHeroVariant] = useState<HeroVariant>("style3");

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [heroVariant]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#F4F1EA] text-[#111111] flex flex-col">
        {/* Skip to Content link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[#FF3B00] focus:text-white focus:font-mono focus:text-xs focus:font-semibold"
        >
          Pular para o conteúdo principal
        </a>

        {/* Floating Swiss Navigation Bar */}
        <SwissNavbar onOpenCommand={() => setCommandMenuOpen(true)} />

        {/* Command Menu (⌘K) in Swiss Kinetic Light Theme */}
        <CommandMenu
          open={commandMenuOpen}
          onOpenChange={setCommandMenuOpen}
        />

        {/* Live Switcher to compare Hero Style 3 (Kinetic & Magnetic) vs Hero Style 1 (3D Sculpture) */}
        <MotionLabPill
          heroVariant={heroVariant}
          onChangeHero={setHeroVariant}
        />

        <main id="main-content" className="relative z-10 flex-1 w-full">
          {/* 01. Hero Section (Defaults to Style 3: Kinetic Typography + Draggable/Magnetic Spring Modules) */}
          {heroVariant === "style3" ? <HeroMagneticKinetic /> : <HeroKinetic />}

          {/* 02. Projetos Selecionados: Tipografia Cinética Gigante + Horizontal Pin + Cards Magnéticos */}
          <HorizontalProjectsPin />

          {/* 03. Caixa de Ferramentas & Stack em 1ª Pessoa */}
          <SwissStackIndex />

          {/* 04. Trajetória Profissional Real (2025 TI → 2026 Dev Full-Stack) */}
          <SwissCareer />
        </main>

        {/* 05. Rodapé Editorial Vermilion & Carbono */}
        <SwissFooter />
      </div>
    </SmoothScroll>
  );
}

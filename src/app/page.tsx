"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CommandMenu } from "@/components/command-menu";
import { ThemeProvider } from "@/components/v3/theme-provider";
import { V3Navbar } from "@/components/v3/v3-navbar";
import { HeroParticleMorph } from "@/components/v3/hero-particle-morph";
import { HeroParticleFlow } from "@/components/v3/hero-particle-flow";
import { V3Projects } from "@/components/v3/v3-projects";
import { V3Stack } from "@/components/v3/v3-stack";
import { V3Career } from "@/components/v3/v3-career";
import { V3Footer } from "@/components/v3/v3-footer";

export default function HomePage() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--fg-primary)] flex flex-col">
          {/* Skip to Content link for Keyboard Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[var(--accent-main)] focus:text-[var(--accent-fg)] focus:font-mono focus:text-xs focus:font-semibold"
          >
            Pular para o conteúdo principal
          </a>

          {/* Floating Dual-Mode Navigation Bar + Live Theme Switcher */}
          <V3Navbar onOpenCommand={() => setCommandMenuOpen(true)} />

          {/* Instant Keyboard Command Menu (⌘K) */}
          <CommandMenu
            open={commandMenuOpen}
            onOpenChange={setCommandMenuOpen}
          />

          {/* Main Semantic Content Flow */}
          <main id="main-content" className="relative z-10 flex-1 w-full">
            {/* HERO OPÇÃO 01: 3D Particle Morphing Sculpture (Mouse repulsion + Scroll dissolve) */}
            <HeroParticleMorph />

            {/* HERO OPÇÃO 02: Continuous 3D Magnetic Particle Wave Flow */}
            <HeroParticleFlow />

            {/* 01. Production Systems (Objective copy + Dual-Theme Previews) */}
            <V3Projects />

            {/* 02. Core Technical Stack */}
            <V3Stack />

            {/* 03. Career Progression (2025 IT -> 2026 Full-Stack) */}
            <V3Career />
          </main>

          {/* 04. Direct Contact Footer */}
          <V3Footer />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}

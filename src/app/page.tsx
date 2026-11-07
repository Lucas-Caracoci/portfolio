"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { CommandMenu } from "@/components/command-menu";
import { FluidBackground } from "@/components/hero-shader-background";
import { HeroSection } from "@/components/sections/hero";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { SkillsMatrixSection } from "@/components/sections/skills-matrix";
import { ExperienceTimelineSection } from "@/components/sections/experience-timeline";
import { SystemTerminal } from "@/components/sections/system-terminal";
import { ContactFooter } from "@/components/sections/contact-footer";

export default function HomePage() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#020203] text-slate-100 flex flex-col">
        {/* Skip to Content link for Keyboard Accessibility (Rule B10) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-cyan-400 focus:text-slate-950 focus:font-mono focus:text-xs focus:font-semibold"
        >
          Pular para o conteúdo principal
        </a>

        {/* Global WebGL Fluid Gradient (Header/Hero) + Continuous Animated Dot Mesh (Site Body) */}
        <div className="fixed inset-0 z-0 pointer-events-none select-none">
          <FluidBackground dimming={0.05} dotIntensity={1.0} />
        </div>

        {/* Floating Header Navbar */}
        <Navbar onOpenCommand={() => setCommandMenuOpen(true)} />

        {/* Raycast-style Command Menu (⌘K) */}
        <CommandMenu
          open={commandMenuOpen}
          onOpenChange={setCommandMenuOpen}
        />

        {/* Page Content Flow — Ordered by Hierarchy of Importance */}
        <main id="main-content" className="relative z-10 flex-1 w-full">
          {/* 00. Hero over the Fluid Kura Gradient */}
          <HeroSection />

          {/* 01. Selected Production Systems (GIDE, Concursos, Meu Porto, PizzaShop) */}
          <CaseStudiesSection />

          {/* 02. Architecture & Technical Domains Index */}
          <SkillsMatrixSection />

          {/* 03. Professional Experience & Career Timeline */}
          <ExperienceTimelineSection />

          {/* 04. Interactive System Terminal Playground */}
          <SystemTerminal />
        </main>

        {/* 05. Tactile Footer & Direct Contact */}
        <ContactFooter />
      </div>
    </SmoothScroll>
  );
}

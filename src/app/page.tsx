"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { CommandMenu } from "@/components/command-menu";
import { HeroSection } from "@/components/sections/hero";
import { MetricsRibbon } from "@/components/sections/metrics-ribbon";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { SystemTerminal } from "@/components/sections/system-terminal";
import { SkillsMatrixSection } from "@/components/sections/skills-matrix";
import { ContactFooter } from "@/components/sections/contact-footer";

export default function HomePage() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col">
        {/* Floating Header Navbar */}
        <Navbar onOpenCommand={() => setCommandMenuOpen(true)} />

        {/* Raycast-style Command Menu (⌘K) */}
        <CommandMenu
          open={commandMenuOpen}
          onOpenChange={setCommandMenuOpen}
        />

        {/* Page Content Flow */}
        <main className="flex-1 w-full">
          {/* 1. Hero with Cyan Aurora Shader & Dot Matrix */}
          <HeroSection />

          {/* 2. Real Metrics Ribbon */}
          <MetricsRibbon />

          {/* 3. Deep Case Studies (GIDE, Concursos PMAC, Meu Porto, PizzaShop) */}
          <CaseStudiesSection />

          {/* 4. Interactive Linux Terminal Playground */}
          <SystemTerminal />

          {/* 5. Capabilities & Architecture Matrix */}
          <SkillsMatrixSection />
        </main>

        {/* 6. Tactile Footer & Contact */}
        <ContactFooter />
      </div>
    </SmoothScroll>
  );
}

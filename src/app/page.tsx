"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CommandMenu } from "@/components/command-menu";
import { ThemeProvider } from "@/components/v4/theme-provider";
import { EtherealScene } from "@/components/v4/ethereal-scene";
import { EtherealNavbar } from "@/components/v4/ethereal-navbar";
import { EtherealHero } from "@/components/v4/ethereal-hero";
import { EtherealProjects } from "@/components/v4/ethereal-projects";
import { EtherealStack } from "@/components/v4/ethereal-stack";
import { EtherealCareer } from "@/components/v4/ethereal-career";
import { EtherealFooter } from "@/components/v4/ethereal-footer";

export default function HomePage() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--fg-primary)] flex flex-col">
          {/* Skip to Content link for Keyboard Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 rounded-full ethereal-cta font-mono text-xs font-medium"
          >
            Pular para o conteúdo principal
          </a>

          {/* Continuous Full-Viewport 3D Bokeh Particle & Mist Scene */}
          <EtherealScene />

          {/* Floating Iridescent Glass Navigation Bar */}
          <EtherealNavbar onOpenCommand={() => setCommandMenuOpen(true)} />

          {/* Frosted Spatial Command Palette (⌘K) */}
          <CommandMenu
            open={commandMenuOpen}
            onOpenChange={setCommandMenuOpen}
          />

          {/* Transparent Spatial Content Flow over the 3D Journey */}
          <main id="main-content" className="relative z-10 flex-1 w-full">
            {/* Stage 0: Ethereal Silk Sculpture Hero */}
            <EtherealHero />

            {/* Stage 1: Production Systems on Translucent Spatial Glass */}
            <EtherealProjects />

            {/* Stage 2: Core Technical Stack */}
            <EtherealStack />

            {/* Stage 2b: Luminous Thread Career Progression */}
            <EtherealCareer />
          </main>

          {/* Stage 3: Serene Horizon Contact Footer */}
          <EtherealFooter />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}

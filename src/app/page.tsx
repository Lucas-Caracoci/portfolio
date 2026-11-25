"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CommandMenu } from "@/components/command-menu";
import Grainient from "@/components/react-bits/Grainient";
import { TechMeshOverlay } from "@/components/react-bits/TechMeshOverlay";
import { ScrollVelocityStrip } from "@/components/react-bits/ScrollVelocityStrip";
import { ClickSpark } from "@/components/react-bits/ui-effects";
import { RbNavbar } from "@/components/v5/rb-navbar";
import { RbBranchedSidebar } from "@/components/v5/rb-branched-sidebar";
import { RbHero } from "@/components/v5/rb-hero";
import { RbAbout } from "@/components/v5/rb-about";
import { RbProjects } from "@/components/v5/rb-projects";
import { RbTaglineReveal } from "@/components/v5/rb-tagline-reveal";
import { RbCareer } from "@/components/v5/rb-career";
import { RbFooter } from "@/components/v5/rb-footer";

export default function HomePage() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen text-[#fff7ed] flex flex-col isolate">
        {/* Skip to Content link for Keyboard Accessibility (Rule B10) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-3 focus:py-2 focus:rounded-lg focus:bg-[#f97316] focus:text-[#120f17] focus:font-mono focus:text-xs focus:font-semibold"
        >
          Pular para o conteúdo principal
        </a>

        {/* Unified Continuous Grainient Shader Background (Remains vibrant & energetic) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Grainient
            colors={["#120f17", "#2a0f0a", "#9a3412", "#f97316", "#fed7aa"]}
            scrollColors={[
              "#100c14",
              "#240d08",
              "#7c2d12",
              "#ea580c",
              "#fed7aa",
            ]}
            scrollFlowScale={0.85}
            type="linear"
            angle={55}
            bands={1}
            softness={1}
            flow={0.8}
            scale={1}
            speed={1}
            silk={0.35}
            grainAmount={0.08}
            grainSize={1.2}
            grainAnimated={true}
            contrast={1}
            saturation={1}
            interactive={true}
            stir={1}
            clickSwirl={true}
            intro={true}
          />
        </div>

        {/* Scroll-Blended Magnetic Tech Mesh & Constellation Overlay (0% in Hero -> 100% in Body) */}
        <TechMeshOverlay />

        {/* React Bits ClickSpark Geometric Feedback Overlay */}
        <ClickSpark enabled={true} />

        {/* Floating PillNav Navigation Bar (React Bits PillNav) */}
        <RbNavbar onOpenCommand={() => setCommandMenuOpen(true)} />

        {/* Left Fixed Branched Menu (React Bits BranchedMenu) */}
        <RbBranchedSidebar />

        {/* Instantaneous Command Menu (⌘K) */}
        <CommandMenu open={commandMenuOpen} onOpenChange={setCommandMenuOpen} />

        {/* Main Content Structure */}
        <main id="main-content" className="relative z-10 flex-1 w-full">
          {/* 01. Hero Section (TechText + Subtitle over continuous Grainient) */}
          <RbHero />

          {/* Kinetic ScrollVelocity & Stack LogoLoop Strip */}
          <ScrollVelocityStrip />

          {/* 02. About Me Section (Text Left + 3D Lanyard Right) */}
          <RbAbout />

          {/* 03. Case Studies & How It Works (SpotlightCard, TiltedCard, Magnetic Tabs) */}
          <RbProjects magnetEnabled={true} />

          {/* 04. Mandatory Tagline Reveal Section (Rule B11 ScrollReveal word-by-word) */}
          <RbTaglineReveal />

          {/* 05. Career Proof & Trajectory (SpotlightCard, DecryptedText) */}
          <RbCareer />
        </main>

        {/* 06. Final CTA, Validated Contact Form & Legal Footer */}
        <div className="relative z-10">
          <RbFooter magnetEnabled={true} />
        </div>
      </div>
    </SmoothScroll>
  );
}

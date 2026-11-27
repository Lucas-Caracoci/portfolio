"use client";

import { motion } from "framer-motion";
import TechText from "@/components/react-bits/TechText";
import {
  SolarArrowUpRight,
  SolarChevronDown,
} from "@/components/react-bits/icons";
import { GithubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";

const baseCurve = [0.22, 1, 0.36, 1] as const;

export function RbHero() {
  const scrollToAbout = () => {
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: "about" } })
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full pt-24 pb-12 px-4 sm:px-8 flex flex-col items-center justify-between"
    >
      <div aria-hidden="true" className="h-6" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center">
        <h1 className="sr-only">Lucas Caracoci</h1>

        <div style={{ width: "100%", height: "460px", position: "relative" }}>
          <TechText
            text="Lucas Caracoci"
            fontWeight={600}
            fontSize={150}
            color="#fff7ed"
            accentColor="#fed7aa"
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={0}
            intro="metrics"
            introDuration={1.4}
            clickKick
            guides={false}
            reach={240}
            softness={0.85}
            strokeWidth={1}
            labels={false}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: baseCurve }}
          className="-mt-6 sm:-mt-10 text-lg sm:text-2xl text-[#fff7ed]/95 font-normal tracking-tight max-w-2xl text-balance drop-shadow-[0_2px_12px_rgba(10,10,10,0.65)]"
        >
          Engenheiro de Software Full Stack &amp; Cloud
        </motion.p>
      </div>

      {/* Subtle Scroll Cue & Profile Links */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7, ease: baseCurve }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 text-xs font-mono text-[#fff7ed]/80 drop-shadow-[0_1px_8px_rgba(10,10,10,0.75)]"
      >
        <button
          type="button"
          onClick={scrollToAbout}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.98]"
        >
          <span>Role para explorar</span>
          <SolarChevronDown className="w-3.5 h-3.5 text-[#fed7aa]" />
        </button>

        <span aria-hidden="true" className="w-1 h-1 rounded-full bg-white/30" />

        <a
          href="https://github.com/Lucas-Caracoci"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>GitHub</span>
          <SolarArrowUpRight className="w-3 h-3 text-[#fed7aa]" />
        </a>

        <span aria-hidden="true" className="w-1 h-1 rounded-full bg-white/30" />

        <a
          href="https://www.linkedin.com/in/lucascaracoci/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          <LinkedinIcon className="w-3.5 h-3.5" />
          <span>LinkedIn</span>
          <SolarArrowUpRight className="w-3 h-3 text-[#fed7aa]" />
        </a>
      </motion.div>
    </section>
  );
}

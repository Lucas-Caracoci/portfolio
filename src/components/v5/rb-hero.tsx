"use client";

import { motion } from "framer-motion";
import TechText from "@/components/react-bits/TechText";

const baseCurve = [0.22, 1, 0.36, 1] as const;

export function RbHero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full pt-24 pb-16 px-4 sm:px-8 flex flex-col items-center justify-center"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center">
        <h1 className="sr-only">Lucas Caracoci</h1>

        <div style={{ width: "100%", height: "480px", position: "relative" }}>
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
          className="-mt-6 sm:-mt-10 text-lg sm:text-2xl text-[#fed7aa]/90 font-normal tracking-tight max-w-2xl text-balance"
        >
          Engenheiro de Software Full Stack &amp; Cloud
        </motion.p>
      </div>
    </section>
  );
}




"use client";

import { SlidersHorizontal } from "lucide-react";

export type HeroVariant = "style3" | "style1";

interface MotionLabPillProps {
  heroVariant: HeroVariant;
  onChangeHero: (variant: HeroVariant) => void;
}

export function MotionLabPill({ heroVariant, onChangeHero }: MotionLabPillProps) {
  const selectVariant = (variant: HeroVariant) => {
    onChangeHero(variant);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: 0 } })
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      <div className="rounded-2xl bg-[#141413]/95 backdrop-blur-xl border border-white/15 text-[#F4F1EA] shadow-2xl p-2 flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 pl-2 pr-1 text-xs font-mono font-bold text-stone-300">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF3B00]" />
          <span>HERO:</span>
        </div>

        <button
          type="button"
          onClick={() => selectVariant("style3")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer active:scale-[0.97] ${
            heroVariant === "style3"
              ? "bg-[#FF3B00] text-white"
              : "bg-white/[0.06] text-stone-300 hover:bg-white/12"
          }`}
        >
          Estilo 3: Cinética &amp; Magnética
        </button>

        <button
          type="button"
          onClick={() => selectVariant("style1")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer active:scale-[0.97] ${
            heroVariant === "style1"
              ? "bg-[#FF3B00] text-white"
              : "bg-white/[0.06] text-stone-300 hover:bg-white/12"
          }`}
        >
          Estilo 1: Escultura 3D
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactBitsBgVariant } from "@/components/react-bits/backgrounds";
import { SolarSliders } from "@/components/react-bits/icons";

const baseCurve = [0.22, 1, 0.36, 1] as const;

interface RbTweaksProps {
  bgVariant: ReactBitsBgVariant;
  onChangeBg: (variant: ReactBitsBgVariant) => void;
  clickSparkEnabled: boolean;
  onToggleClickSpark: () => void;
  magnetEnabled: boolean;
  onToggleMagnet: () => void;
}

export function RbTweaks({
  bgVariant,
  onChangeBg,
  clickSparkEnabled,
  onToggleClickSpark,
  magnetEnabled,
  onToggleMagnet,
}: RbTweaksProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.aside
            key="tweaks-panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: baseCurve }}
            aria-label="Tweaks"
            className="w-72 p-4 rounded-2xl bg-[#1a1520]/95 backdrop-blur-xl border border-[#fed7aa]/15 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#fed7aa]/10">
              <div className="flex items-center gap-2">
                <SolarSliders className="w-4 h-4 text-[#f97316]" />
                <span className="text-sm font-bold text-[#fff7ed]">Tweaks</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-2 py-1 rounded-lg bg-[#2c2234] hover:bg-[#382b42] text-xs font-mono text-[#fed7aa] cursor-pointer"
              >
                Fechar
              </button>
            </div>

            {/* React Bits Background Selector */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-neutral-400">
                REACT BITS BACKGROUND
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { id: "squares", label: "Squares" },
                    { id: "dots", label: "DotGrid" },
                    { id: "aurora", label: "Aurora" },
                  ] as const
                ).map((opt) => {
                  const active = bgVariant === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onChangeBg(opt.id)}
                      className={`px-2 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-colors duration-200 cursor-pointer ${
                        active
                          ? "bg-[#f97316] text-[#120f17] border-[#f97316]"
                          : "bg-[#221b29] text-neutral-300 border-[#fed7aa]/10 hover:border-[#f97316]/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggle Controls */}
            <div className="space-y-2 pt-1 border-t border-[#fed7aa]/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-300">
                  ClickSpark Effect
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={clickSparkEnabled}
                  onClick={onToggleClickSpark}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border transition-colors duration-200 cursor-pointer ${
                    clickSparkEnabled
                      ? "bg-[#2c2234] text-[#f97316] border-[#f97316]/40"
                      : "bg-[#221b29] text-neutral-400 border-[#fed7aa]/10"
                  }`}
                >
                  {clickSparkEnabled ? "Ativo" : "Pausado"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-300">
                  Magnet Physics
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={magnetEnabled}
                  onClick={onToggleMagnet}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border transition-colors duration-200 cursor-pointer ${
                    magnetEnabled
                      ? "bg-[#2c2234] text-[#f97316] border-[#f97316]/40"
                      : "bg-[#221b29] text-neutral-400 border-[#fed7aa]/10"
                  }`}
                >
                  {magnetEnabled ? "Ativo" : "Pausado"}
                </button>
              </div>
            </div>
          </motion.aside>
        ) : (
          <motion.button
            key="tweaks-trigger"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18, ease: baseCurve }}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir painel Tweaks"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1a1520]/90 hover:bg-[#2c2234] backdrop-blur-xl border border-[#fed7aa]/15 text-xs font-mono font-semibold text-[#fff7ed] shadow-xl transition-colors duration-200 cursor-pointer active:scale-[0.98]"
          >
            <SolarSliders className="w-4 h-4 text-[#f97316]" />
            <span>Tweaks</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

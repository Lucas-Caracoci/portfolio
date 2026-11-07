"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowUpRight, MapPin, Clock } from "lucide-react";
import { GithubIcon } from "../icons/github";

export function SwissFooter() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("lucascaracoci2@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <footer id="contact" className="relative bg-[#141413] text-[#F4F1EA] pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Bold Vermilion Callout Card */}
        <div className="rounded-2xl bg-[#FF3B00] text-white p-8 sm:p-14 mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white/85 font-semibold">
              [ VAMOS CONVERSAR? ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-balance">
              Tem um projeto desafiador ou precisa estruturar um sistema do zero?
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
              Me manda um e-mail direto. Seja pra falar de arquitetura Laravel/React, trocar ideia
              sobre engenharia de software ou construir algo novo juntos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="px-7 py-4 rounded-2xl bg-[#141413] hover:bg-[#242422] text-[#F4F1EA] font-mono text-sm font-bold flex items-center justify-center gap-3 cursor-pointer active:scale-[0.97] transition-colors shadow-xl min-w-[260px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied-ft"
                    initial={{ opacity: 0, scale: 0.85, y: 2 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 500, damping: 28 },
                    }}
                    exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.1 } }}
                    className="flex items-center gap-2 text-emerald-400"
                  >
                    <Check className="w-4 h-4" />
                    <span>E-mail copiado!</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy-ft"
                    initial={{ opacity: 0, scale: 0.85, y: -2 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 500, damping: 28 },
                    }}
                    exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.1 } }}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4 text-[#FF3B00]" />
                    <span>lucascaracoci2@gmail.com</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Bottom Metadata Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/12 text-xs font-mono text-stone-400">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#F4F1EA]">
              <MapPin className="w-3.5 h-3.5 text-[#FF3B00]" />
              <span>Arraial do Cabo, RJ — Brasil</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>{time || "UTC-3"}</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Lucas-Caracoci"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-[#F4F1EA] hover:text-[#FF3B00] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>github.com/Lucas-Caracoci</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span>© 2026 Lucas Caracoci</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowUpRight, MapPin, Clock } from "lucide-react";
import { GithubIcon } from "../icons/github";
import { SpatialGlass } from "./spatial-glass";

export function EtherealFooter() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateClock();
    const id = setInterval(updateClock, 15000);
    return () => clearInterval(id);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("lucascaracoci2@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <footer id="contact" className="relative pt-20 pb-14 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SpatialGlass tilt className="rounded-3xl p-8 sm:p-14 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-main)]">
                04 / Contato Direto
              </div>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight leading-tight">
                Vamos construir seu próximo{" "}
                <span className="font-serif-display">sistema</span>?
              </h2>
              <p className="text-base font-light text-[var(--fg-muted)]">
                Disponível para novos projetos, arquitetura de software e desenvolvimento Full-Stack.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="px-7 py-4 rounded-full ethereal-cta font-mono text-sm font-medium flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.97] min-w-[264px] shrink-0"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied-footer"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.14 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>E-mail copiado!</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy-footer"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.14 }}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>lucascaracoci2@gmail.com</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </SpatialGlass>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 text-xs font-mono text-[var(--fg-muted)]">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent-main)]" />
              <span>Arraial do Cabo, RJ</span>
            </span>
            {time && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{time} (BRT)</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Lucas-Caracoci"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--fg-primary)] hover:text-[var(--accent-main)] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <span>© 2026 Lucas Caracoci</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowUpRight, MapPin, Clock } from "lucide-react";
import { GithubIcon } from "../icons/github";

export function V3Footer() {
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
    <footer id="contact" className="relative pt-20 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="v3-surface rounded-2xl p-8 sm:p-12 mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-main)] font-semibold">
              04 / CONTATO
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Vamos conversar sobre o seu próximo sistema?
            </h2>
            <p className="text-base text-[var(--fg-muted)]">
              Disponível para novos projetos, arquitetura de software e desenvolvimento Full-Stack.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-7 py-4 rounded-full bg-[var(--accent-main)] text-[var(--accent-fg)] font-mono text-sm font-bold flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.97] shadow-lg min-w-[260px] shrink-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied-f"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.14 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>E-mail copiado!</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy-f"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)] text-xs font-mono text-[var(--fg-muted)]">
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

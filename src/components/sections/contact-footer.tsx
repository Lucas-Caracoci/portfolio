"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowUpRight, Clock, MapPin } from "lucide-react";
import { GithubIcon } from "../icons/github";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setYear(now.getFullYear());
      setTime(
        now.toLocaleTimeString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("lucascaracoci2@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <footer id="contact" className="relative z-20 pt-20 pb-12 px-4 border-t border-white/10 bg-[#020203]/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto">
        {/* Main Contact Card (Outer rounded-2xl -> Inner rounded-xl per Rule B3) */}
        <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/15 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
              05 / CONTATO DIRETO
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 text-balance mb-4">
              Disponível para novos projetos de software & consultoria de arquitetura.
            </h2>

            <p className="text-sm text-slate-300 font-sans leading-relaxed text-pretty mb-8">
              Seja para estruturar uma nova aplicação em monólito modular, migrar infraestruturas
              legadas ou construir interfaces com o mais alto acabamento visual, entre em contato
              direto.
            </p>

            {/* Email Copy Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1 px-4 py-3.5 rounded-xl bg-[#020203]/90 border border-white/10 text-sm font-mono text-slate-200 select-all flex items-center justify-between">
                <span>lucascaracoci2@gmail.com</span>
                <span className="text-xs text-cyan-400 font-semibold uppercase">E-mail Direto</span>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-6 py-3.5 rounded-xl font-semibold text-base text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_24px_-4px_rgba(0,245,255,0.45)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.97] shrink-0 min-w-[200px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied-footer"
                      initial={{ opacity: 0, scale: 0.85, y: 2 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 500, damping: 28 },
                      }}
                      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.1 } }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-emerald-950" />
                      <span>E-mail Copiado</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy-footer"
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
                      <Copy className="w-4 h-4 text-slate-950" />
                      <span>Copiar Endereço</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Arraial do Cabo RJ, Brasil</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{time || "UTC-3"}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Lucas-Caracoci"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <span>© {year ?? "2026"} Lucas Caracoci</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

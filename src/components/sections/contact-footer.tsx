"use client";

import { useState, useEffect } from "react";
import { Mail, Copy, Check, ArrowUpRight, Clock, MapPin } from "lucide-react";
import { GithubIcon } from "../icons/github";
import confetti from "canvas-confetti";

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
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.85 },
      colors: ["#00F5FF", "#22D3EE", "#38BDF8"],
    });
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <footer id="contact" className="relative z-20 pt-20 pb-12 px-4 border-t border-cyan-500/15 bg-slate-950/80">
      <div className="max-w-6xl mx-auto">
        {/* Main Contact Card */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/25 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>VAMOS CONVERSAR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mb-4">
              Disponível para novos projetos de software & consultoria de arquitetura.
            </h2>

            <p className="text-sm text-slate-300 font-sans leading-relaxed mb-8">
              Seja para estruturar uma nova aplicação em monólito modular, migrar infraestruturas legadas ou construir interfaces com o mais alto acabamento visual, entre em contato direto.
            </p>

            {/* Email Copy Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1 px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm font-mono text-slate-200 select-all flex items-center justify-between">
                <span>lucascaracoci2@gmail.com</span>
                <span className="text-[11px] text-cyan-400 font-semibold uppercase">E-mail Direto</span>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-6 py-3 rounded-xl font-medium text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-150 shadow-[0_0_20px_-3px_rgba(0,245,255,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>E-mail Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-950" />
                    <span>Copiar Endereço</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-900 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Arraial do Cabo, RJ</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{time || "UTC-3"}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/lucascaracoci"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </a>

            <span>© {year ?? "2026"} Lucas Caracoci</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

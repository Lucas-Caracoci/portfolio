"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SpotlightCard,
  Magnet,
  StarBorder,
} from "@/components/react-bits/ui-effects";
import { DecryptedText } from "@/components/react-bits/text-effects";
import {
  SolarCopy,
  SolarCheck,
  SolarArrowUpRight,
  SolarMapPin,
  SolarClock,
  SolarSend,
  SolarAlertCircle,
  SolarDownload,
} from "@/components/react-bits/icons";
import { GithubIcon } from "@/components/icons/github";
import { LinkedinIcon } from "@/components/icons/linkedin";

const baseCurve = [0.22, 1, 0.36, 1] as const;

interface RbFooterProps {
  magnetEnabled?: boolean;
}

export function RbFooter({ magnetEnabled = true }: RbFooterProps) {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("lucascaracoci2@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = senderEmail.trim();
    const trimmedMsg = message.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setFormState("error");
      setErrorMessage(
        "Formato de e-mail inválido. Informe um endereço válido como voce@empresa.com."
      );
      return;
    }

    if (trimmedMsg.length < 10) {
      setFormState("error");
      setErrorMessage(
        "Mensagem muito curta. Descreva brevemente o projeto ou oportunidade com pelo menos 10 caracteres."
      );
      return;
    }

    setFormState("loading");
    setErrorMessage("");

    setTimeout(() => {
      setFormState("success");
      const subject = encodeURIComponent(
        `Contato via Portfólio • ${trimmedEmail}`
      );
      const body = encodeURIComponent(
        `${trimmedMsg}\n\nRemetente: ${trimmedEmail}`
      );
      window.location.href = `mailto:lucascaracoci2@gmail.com?subject=${subject}&body=${body}`;
    }, 350);
  };

  return (
    <footer id="contact" className="relative pt-24 pb-14 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-14">
        <SpotlightCard className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 6 Cols: Direct Offer, Copy Email & Conversion Shortcuts */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <DecryptedText
                  text="04 // CONTATO DIRETO"
                  className="text-xs text-[#f97316] uppercase tracking-widest"
                />
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#fff7ed] text-balance">
                  Pronto para arquitetar seu próximo sistema.
                </h2>
                <p className="text-base text-neutral-300 text-pretty">
                  Disponível para oportunidades como Engenheiro de Software Full
                  Stack e projetos de arquitetura com Laravel, React 19, Next.js
                  e PostgreSQL. Conversa técnica inicial sem compromisso.
                </p>
              </div>

              {/* Copy E-mail Bar */}
              <div className="p-4 rounded-xl bg-[#111111]/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-neutral-400">
                    E-MAIL DIRETO
                  </div>
                  <div className="text-sm sm:text-base font-mono font-semibold text-white select-all">
                    lucascaracoci2@gmail.com
                  </div>
                </div>

                <Magnet disabled={!magnetEnabled} strength={0.22}>
                  <StarBorder color="#f97316">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className={`py-2 px-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.98] ${
                        copied
                          ? "bg-[#f97316] text-[#111111]"
                          : "bg-[#fed7aa] hover:bg-[#fdba74] text-[#111111]"
                      }`}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span
                            key="copied"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.16, ease: baseCurve }}
                            className="flex items-center gap-1.5"
                          >
                            <SolarCheck className="w-4 h-4" />
                            <span>Copiado!</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.16, ease: baseCurve }}
                            className="flex items-center gap-1.5"
                          >
                            <SolarCopy className="w-4 h-4" />
                            <span>Copiar e-mail</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </StarBorder>
                </Magnet>
              </div>

              {/* Direct Conversion Shortcuts: LinkedIn, GitHub, CV PDF */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/lucascaracoci/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#242424] border border-white/10 hover:border-[#f97316]/50 text-xs font-mono font-semibold text-neutral-100 hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#f97316]" />
                  <span>LinkedIn</span>
                  <SolarArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>

                <a
                  href="https://github.com/Lucas-Caracoci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#242424] border border-white/10 hover:border-[#f97316]/50 text-xs font-mono font-semibold text-neutral-100 hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
                >
                  <GithubIcon className="w-4 h-4 text-[#f97316]" />
                  <span>GitHub</span>
                  <SolarArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>

                <a
                  href="/cv-lucas-caracoci.pdf"
                  download="CV-Lucas-Caracoci.pdf"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#242424] border border-white/10 hover:border-[#f97316]/50 text-xs font-mono font-semibold text-neutral-100 hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
                >
                  <SolarDownload className="w-4 h-4 text-[#f97316]" />
                  <span>Baixar CV (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right 6 Cols: Direct Form directly on the unified dark neutral card */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="lg:col-span-6 lg:pl-10 lg:border-l lg:border-white/10 space-y-5"
            >
              <div className="text-base font-semibold text-white">
                Enviar mensagem rápida
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono font-medium text-neutral-200"
                >
                  Seu e-mail corporativo ou pessoal
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => {
                    setSenderEmail(e.target.value);
                    if (formState === "error") setFormState("idle");
                  }}
                  placeholder="voce@empresa.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111]/90 border border-white/15 text-sm text-white placeholder:text-neutral-400 focus:border-[#f97316] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono font-medium text-neutral-200"
                >
                  Resumo do projeto ou vaga
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (formState === "error") setFormState("idle");
                  }}
                  placeholder="Conte sobre o escopo técnico, stack ou oportunidade..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#111111]/90 border border-white/15 text-sm text-white placeholder:text-neutral-400 focus:border-[#f97316] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] resize-none"
                />
              </div>

              {formState === "error" && (
                <div
                  role="alert"
                  className="p-3 rounded-xl bg-[#1C1C1C] border border-amber-400/40 text-xs text-amber-300 flex items-start gap-2"
                >
                  <SolarAlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {formState === "success" && (
                <div
                  role="status"
                  className="p-3 rounded-xl bg-[#1C1C1C] border border-[#f97316]/40 text-xs text-[#fed7aa] flex items-center gap-2"
                >
                  <SolarCheck className="w-4 h-4 shrink-0 text-[#f97316]" />
                  <span>
                    Mensagem validada e aberta no seu cliente de e-mail para
                    Lucas Caracoci.
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <span className="text-xs font-mono text-neutral-300">
                  Respondo em até 24h
                </span>

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="py-2.5 px-4 rounded-xl bg-[#f97316] hover:bg-[#fb923c] disabled:opacity-50 text-[#111111] text-sm font-semibold inline-flex items-center gap-2 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.98]"
                >
                  <SolarSend className="w-4 h-4" />
                  <span>
                    {formState === "loading"
                      ? "Preparando envio..."
                      : "Iniciar conversa"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </SpotlightCard>

        {/* Bottom Metadata & Social Links Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-300">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2 text-neutral-100">
              <SolarMapPin className="w-4 h-4 text-[#f97316]" />
              <span>Arraial do Cabo, RJ • Brasil</span>
            </span>
            <span className="flex items-center gap-2 text-neutral-300">
              <SolarClock className="w-4 h-4 text-neutral-400" />
              <span>{time || "Horário de Brasília"}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://www.linkedin.com/in/lucascaracoci/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-200 hover:text-[#f97316] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
              <SolarArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://github.com/Lucas-Caracoci"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-200 hover:text-[#f97316] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <SolarArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <span className="text-neutral-400">© 2026 Lucas Caracoci</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

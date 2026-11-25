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
} from "@/components/react-bits/icons";
import { GithubIcon } from "@/components/icons/github";

const baseCurve = [0.22, 1, 0.36, 1] as const;

interface RbFooterProps {
  magnetEnabled?: boolean;
}

export function RbFooter({ magnetEnabled = true }: RbFooterProps) {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  const [legalView, setLegalView] = useState<"privacy" | "terms" | null>(null);

  // Client-side validated quick contact form (Rule B9 / B10)
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
        "Formato de e mail inválido. Informe um endereço válido como voce@empresa.com."
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
    <footer id="contact" className="relative pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <SpotlightCard className="p-6 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 6 Cols: Direct Offer, Risk Reversal & 1-Click Email */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <DecryptedText
                  text="05 // CONTATO DIRETO"
                  className="text-xs text-[#f97316] uppercase tracking-widest"
                />
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#fff7ed] text-balance">
                  Pronto para arquitetar seu próximo sistema.
                </h2>
                <p className="text-base text-neutral-300 text-pretty">
                  Disponível para oportunidades como Engenheiro de Software Full
                  Stack e projetos de arquitetura com Laravel, React 19, Next.js
                  e PostgreSQL. Conversa técnica inicial sem compromisso e
                  resposta direta em até 24 horas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1c1622]/70 backdrop-blur-md border border-[#fed7aa]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-neutral-400">
                    E MAIL DIRETO
                  </div>
                  <div className="text-sm sm:text-base font-mono font-semibold text-[#fff7ed] select-all">
                    lucascaracoci2@gmail.com
                  </div>
                </div>

                <Magnet disabled={!magnetEnabled} strength={0.22}>
                  <StarBorder color="#f97316">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="py-2 px-3 rounded-xl bg-[#fed7aa] hover:bg-[#fdba74] text-[#120f17] text-base font-semibold flex items-center gap-2 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.98]"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span
                            key="copied"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.18, ease: baseCurve }}
                            className="flex items-center gap-2"
                          >
                            <SolarCheck className="w-4 h-4 text-[#9a3412]" />
                            <span>Endereço copiado</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.18, ease: baseCurve }}
                            className="flex items-center gap-2"
                          >
                            <SolarCopy className="w-4 h-4" />
                            <span>Copiar e mail</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </StarBorder>
                </Magnet>
              </div>
            </div>

            {/* Right 6 Cols: Validated Quick Dispatch Form (Rule B9 / B10) */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="lg:col-span-6 p-6 rounded-xl bg-[#1c1622]/70 backdrop-blur-md border border-[#fed7aa]/12 space-y-4"
            >
              <div className="text-sm font-semibold text-[#fff7ed]">
                Enviar mensagem rápida
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono text-neutral-300"
                >
                  Seu e mail corporativo ou pessoal
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
                  className="w-full px-3 py-2 rounded-lg bg-[#1a1520] border border-[#fed7aa]/15 text-sm text-[#fff7ed] placeholder:text-neutral-500 focus:border-[#f97316] transition-colors duration-200"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono text-neutral-300"
                >
                  Resumo do projeto ou vaga
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (formState === "error") setFormState("idle");
                  }}
                  placeholder="Conte sobre o escopo técnico, stack ou oportunidade..."
                  className="w-full px-3 py-2 rounded-lg bg-[#1a1520] border border-[#fed7aa]/15 text-sm text-[#fff7ed] placeholder:text-neutral-500 focus:border-[#f97316] transition-colors duration-200 resize-none"
                />
              </div>

              {formState === "error" && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-[#2c2234] border border-amber-400/40 text-xs text-amber-300 flex items-start gap-2"
                >
                  <SolarAlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {formState === "success" && (
                <div
                  role="status"
                  className="p-3 rounded-lg bg-[#2c2234] border border-[#f97316]/40 text-xs text-[#fed7aa] flex items-center gap-2"
                >
                  <SolarCheck className="w-4 h-4 shrink-0 text-[#f97316]" />
                  <span>
                    Mensagem validada e aberta no seu cliente de e mail para
                    Lucas Caracoci.
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-4 pt-1">
                <span className="text-xs font-mono text-neutral-400">
                  Validação instantânea no navegador
                </span>

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="py-2 px-3 rounded-lg bg-[#f97316] hover:bg-[#fb923c] disabled:opacity-50 text-[#120f17] text-base font-semibold flex items-center gap-2 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.98]"
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

        {/* Legal / Privacy Drawer when requested (Rule B10) */}
        <AnimatePresence>
          {legalView && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: baseCurve }}
              className="p-6 rounded-2xl bg-[#1a1520] border border-[#fed7aa]/15 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#fff7ed]">
                  {legalView === "privacy"
                    ? "Política de Privacidade e LGPD"
                    : "Termos de Uso do Portfólio"}
                </h3>
                <button
                  type="button"
                  onClick={() => setLegalView(null)}
                  className="px-3 py-1 rounded-lg bg-[#2c2234] text-xs font-mono text-[#fed7aa] hover:text-white cursor-pointer"
                >
                  Fechar
                </button>
              </div>
              <p className="text-sm text-neutral-300 text-pretty">
                {legalView === "privacy"
                  ? "Este portfólio não coleta cookies de rastreamento publicitário nem armazena dados pessoais em servidores intermediários. As mensagens enviadas pelo formulário são abertas diretamente no seu cliente de e mail padrão para contato com Lucas Caracoci."
                  : "Todo o conteúdo arquitetural, estudos de caso e código fonte deste portfólio pertencem a Lucas Caracoci. Os sistemas institucionais citados são descritos apenas para fins de comprovação técnica profissional, preservando integralmente o sigilo de dados operacionais."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Metadata & Legal Links Row */}
        <div className="pt-8 border-t border-[#fed7aa]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-400">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2 text-neutral-200">
              <SolarMapPin className="w-4 h-4 text-[#f97316]" />
              <span>Arraial do Cabo RJ, Brasil</span>
            </span>
            <span className="flex items-center gap-2">
              <SolarClock className="w-4 h-4 text-neutral-400" />
              <span>{time || "Horário de Brasília"}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() =>
                setLegalView((prev) =>
                  prev === "privacy" ? null : "privacy"
                )
              }
              className="hover:text-[#fed7aa] transition-colors duration-200 cursor-pointer"
            >
              Privacidade
            </button>

            <button
              type="button"
              onClick={() =>
                setLegalView((prev) => (prev === "terms" ? null : "terms"))
              }
              className="hover:text-[#fed7aa] transition-colors duration-200 cursor-pointer"
            >
              Termos
            </button>

            <a
              href="https://github.com/Lucas-Caracoci"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-200 hover:text-[#f97316] transition-colors duration-200"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <SolarArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <span>© 2026 Lucas Caracoci</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

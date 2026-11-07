"use client";

import { motion } from "framer-motion";
import { Code2, Server } from "lucide-react";

const easeOutCustom = [0.22, 1, 0.36, 1] as const;

export function SwissCareer() {
  const roles = [
    {
      period: "ABRIL 2026 — ATUALMENTE",
      badge: "CARGO ATUAL",
      title: "Desenvolvedor Full-Stack",
      org: "@Prefeitura Municipal",
      icon: Code2,
      active: true,
      story:
        "Depois de um ano conhecendo a operação por dentro, assumi o desenvolvimento e a evolução de sistemas institucionais em produção.",
      highlights: [
        "Arquitetura e desenvolvimento de aplicações web críticas (avaliação educacional em rede, portal de certames públicos e comunidade escolar) com PHP/Laravel, React 19, TypeScript e Inertia.js;",
        "Criação de coleta Offline-First com IndexedDB (Dexie.js), vouchers anônimos via QR Code/OTP e apuração dinâmica de metas;",
        "Automação de migração de dados legados com Python (ETL) para PostgreSQL e unificação de PDFs com Chromium Headless em Docker;",
        "Operação de filas assíncronas com Redis/Horizon, controle de acesso granular (RBAC) e adequação à LGPD.",
      ],
      tech: "PHP, Laravel, React 19, TypeScript, Inertia.js, PostgreSQL, Redis, Docker, Python, Dexie.js, Tailwind CSS, Git.",
    },
    {
      period: "ABRIL 2025 — ABRIL 2026",
      badge: "BASE OPERACIONAL",
      title: "Analista de TI & Infraestrutura",
      org: "@Prefeitura Municipal",
      icon: Server,
      active: false,
      story:
        "Onde comecei no setor público: garantindo que a infraestrutura, as redes e os sistemas funcionassem na ponta para servidores e unidades.",
      highlights: [
        "Sustentação da infraestrutura de TI, redes, conectividade e suporte técnico de nível crítico às unidades;",
        "Diagnóstico de gargalos operacionais em campo e apoio direto na implantação de novos sistemas web;",
        "Padronização de segurança da informação, proteção de dados (LGPD) e transição para o time de Engenharia de Software.",
      ],
      tech: "Infraestrutura de TI, Redes, Linux, Windows, Diagnóstico de Sistemas, Segurança da Informação e Suporte Crítico.",
    },
  ];

  return (
    <section
      id="career"
      className="relative py-28 px-4 sm:px-8 bg-[#EAE5DC]/50 border-b border-[#111111]/12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: easeOutCustom }}
          className="mb-14"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-md bg-[#FF3B00] text-white text-xs font-mono uppercase tracking-widest font-bold mb-4">
            [ TRAJETÓRIA PROFISSIONAL ]
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] leading-none">
            Experiência{" "}
            <span className="text-[#FF3B00]">na prática.</span>
          </h2>
        </motion.div>

        <div className="relative pl-4 sm:pl-8">
          {/* Continuous Left Swiss Line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-0.5 bg-linear-to-b from-[#FF3B00] via-[#111111]/20 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-6">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <motion.article
                  key={role.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: easeOutCustom }}
                  className="relative bg-white rounded-2xl border border-[#111111]/15 p-6 sm:p-9 shadow-[0_18px_40px_-22px_rgba(17,17,17,0.1)]"
                >
                  {/* Timeline Node Dot */}
                  <span
                    className={`hidden sm:block absolute -left-[37px] top-10 w-3 h-3 rounded-full border-2 ${
                      role.active
                        ? "bg-[#FF3B00] border-[#F4F1EA] ring-2 ring-[#FF3B00]"
                        : "bg-[#141413] border-[#F4F1EA]"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        role.active
                          ? "bg-[#FF3B00] text-white"
                          : "bg-[#141413] text-[#F4F1EA]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-1">
                          <span className="text-xs font-mono uppercase tracking-wider text-[#575551] font-semibold">
                            {role.period}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                              role.active
                                ? "bg-[#FF3B00]/12 text-[#FF3B00]"
                                : "bg-[#EAE5DC] text-[#575551]"
                            }`}
                          >
                            {role.badge}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                          {role.title}
                        </h3>
                        <div className="text-sm font-mono font-bold text-[#FF3B00] mt-0.5">
                          {role.org}
                        </div>
                      </div>

                      <p className="text-base text-[#111111] font-medium leading-relaxed">
                        {role.story}
                      </p>

                      <ul className="space-y-2.5 pt-1">
                        {role.highlights.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-[#575551] leading-relaxed text-pretty"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B00] mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-3 border-t border-[#111111]/10 text-xs font-mono text-[#575551]">
                        <strong className="text-[#111111]">Stack &amp; ferramentas: </strong>
                        {role.tech}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

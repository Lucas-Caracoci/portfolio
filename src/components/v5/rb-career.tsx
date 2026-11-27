"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/react-bits/ui-effects";
import { DecryptedText } from "@/components/react-bits/text-effects";
import { SolarCode, SolarServer } from "@/components/react-bits/icons";

const baseCurve = [0.22, 1, 0.36, 1] as const;

export function RbCareer() {
  const experiences = [
    {
      id: "fullstack",
      period: "ABRIL 2026 • ATUALMENTE",
      badge: "Cargo Atual",
      role: "Desenvolvedor Full Stack",
      organization: "@Prefeitura Municipal",
      icon: SolarCode,
      isCurrent: true,
      bullets: [
        "Desenvolvimento e evolução de sistemas institucionais em produção para avaliação educacional em rede, portal de certames públicos e comunidade escolar com PHP, Laravel, React 19, TypeScript e Inertia.js sob Service Pattern.",
        "Engenharia de coleta com persistência local no navegador via IndexedDB e Dexie.js, emissão de vouchers anônimos em QR Code e motores de cálculo dinâmico de metas.",
        "Automação de pipelines de ingestão e saneamento de dados legados com Python ETL, migração relacional íntegra para PostgreSQL e unificação automatizada de PDFs com Chromium Headless.",
        "Operação de ambientes conteinerizados com Docker, processamento de filas assíncronas com Redis e Laravel Horizon, controle de acesso granular RBAC e conformidade com a LGPD.",
      ],
      technologies:
        "PHP, Laravel, React 19, TypeScript, Inertia.js, PostgreSQL, Redis, Docker, Python ETL, Dexie.js, Tailwind CSS e Git.",
    },
    {
      id: "infra",
      period: "ABRIL 2025 • ABRIL 2026",
      badge: "Base Operacional",
      role: "Analista de TI e Infraestrutura",
      organization: "@Prefeitura Municipal",
      icon: SolarServer,
      isCurrent: false,
      bullets: [
        "Sustentação da infraestrutura tecnológica institucional, administração de redes, ambientes operacionais e suporte técnico especializado às unidades e sistemas públicos.",
        "Diagnóstico e resolução de incidentes críticos de conectividade, hardware e sistemas, assegurando alta disponibilidade na operação diária.",
        "Apoio técnico na implantação de sistemas web nas unidades, levantamento de requisitos operacionais em campo e transição direta para a equipe de Engenharia e Desenvolvimento de Software.",
        "Padronização de estações de trabalho, políticas de segurança da informação e proteção de dados em conformidade com a LGPD.",
      ],
      technologies:
        "Infraestrutura de TI, Redes e Conectividade, Linux, Windows, Diagnóstico de Sistemas, Segurança da Informação e Automação.",
    },
  ];

  return (
    <section id="career" className="relative py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: baseCurve }}
          className="space-y-3"
        >
          <DecryptedText
            text="03 // TRAJETÓRIA PROFISSIONAL"
            className="text-xs text-[#f97316] uppercase tracking-widest"
          />
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#fff7ed] text-balance">
            Experiência comprovada em operação real.
          </h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: baseCurve,
                }}
              >
                <SpotlightCard className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row items-start gap-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                        exp.isCurrent
                          ? "bg-[#1C1C1C] border-[#f97316]/40 text-[#f97316]"
                          : "bg-[#111111] border-white/10 text-neutral-300"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-1">
                            <span className="text-xs font-mono text-neutral-400">
                              {exp.period}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-xs font-mono font-semibold ${
                                exp.isCurrent
                                  ? "bg-[#1C1C1C] text-[#f97316] border border-[#f97316]/30"
                                  : "bg-[#111111] text-neutral-400 border border-white/10"
                              }`}
                            >
                              {exp.badge}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-[#fff7ed] tracking-tight text-balance">
                            {exp.role}
                          </h3>
                        </div>

                        <div className="text-sm font-mono font-semibold text-[#f97316]">
                          {exp.organization}
                        </div>
                      </div>

                      <ul className="space-y-2.5 pt-2">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-3 text-sm text-neutral-300 text-pretty"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#f97316] mt-2 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-2 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-xs font-mono text-neutral-400 text-pretty">
                        <strong className="text-[#fff7ed] font-semibold shrink-0">
                          Tecnologias utilizadas:
                        </strong>
                        <span>{exp.technologies}</span>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Code2, Server, type LucideIcon } from "lucide-react";

const easeOutCustom = [0.22, 1, 0.36, 1] as const;

interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  icon: LucideIcon;
  isCurrent?: boolean;
  bullets: string[];
  technologies: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "dev-fullstack",
    period: "ABRIL 2026 — ATUALMENTE",
    role: "Desenvolvedor Full-Stack",
    organization: "@Prefeitura Municipal",
    icon: Code2,
    isCurrent: true,
    bullets: [
      "Desenvolvimento e evolução de sistemas institucionais em produção (avaliação educacional multidimensional, portal de certames públicos e ecossistema escolar) utilizando PHP/Laravel, React, TypeScript e Inertia.js sob arquitetura desacoplada (Service Pattern);",
      "Engenharia de coleta Offline-First com persistência local no navegador via IndexedDB (Dexie.js), emissão de vouchers anônimos de uso único (QR Code / OTP) e motores de cálculo dinâmico de metas;",
      "Automação de pipelines de ingestão e saneamento de dados legados com Python (ETL), migração relacional íntegra para PostgreSQL e unificação automatizada de PDFs via microserviço Chromium Headless;",
      "Implantação e operação de ambientes conteinerizados com Docker, processamento de filas assíncronas com Redis e Laravel Horizon, controle de acesso granular (RBAC) e conformidade com a LGPD;",
    ],
    technologies:
      "PHP, Laravel, React 19, TypeScript, Inertia.js, PostgreSQL, Redis, Docker, Python (ETL), Dexie.js, Tailwind CSS, Git, dentre outras.",
  },
  {
    id: "ti-infra",
    period: "ABRIL 2025 — ABRIL 2026",
    role: "Analista de TI & Infraestrutura",
    organization: "@Prefeitura Municipal",
    icon: Server,
    bullets: [
      "Sustentação da infraestrutura tecnológica institucional, administração de redes, ambientes operacionais e suporte técnico especializado às unidades e sistemas públicos;",
      "Diagnóstico e resolução de incidentes críticos de conectividade, hardware e sistemas, assegurando alta disponibilidade na operação diária;",
      "Apoio técnico na implantação de sistemas web nas unidades, levantamento de requisitos operacionais em campo e transição direta para a equipe de Engenharia e Desenvolvimento de Software;",
      "Padronização de estações de trabalho, políticas de segurança da informação e proteção de dados em conformidade com a LGPD;",
    ],
    technologies:
      "Infraestrutura de TI, Redes & Conectividade, Linux, Windows, Diagnóstico de Sistemas, Segurança da Informação, Suporte Crítico e Automação.",
  },
];

function CircuitBulletIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-1.5"
      aria-hidden="true"
    >
      <line
        x1="1"
        y1="8"
        x2="5.5"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.5" />
      <line
        x1="10.5"
        y1="8"
        x2="15"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ExperienceTimelineSection() {
  return (
    <section id="experience" className="relative z-20 py-24 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: easeOutCustom }}
        className="mb-14"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-md border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">
          [ 03 ] CARREIRA
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 leading-tight text-balance">
          Experiência
          <span className="block text-cyan-400">profissional.</span>
        </h2>
      </motion.div>

      {/* Vertical Timeline Container */}
      <div className="relative pl-4 sm:pl-8">
        {/* Continuous Left Vertical Line */}
        <div
          className="absolute left-0 top-2 bottom-2 w-px bg-linear-to-b from-cyan-400/70 via-white/15 to-transparent"
          aria-hidden="true"
        />

        <div className="space-y-6">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.08,
                  ease: easeOutCustom,
                }}
                className="relative glass-panel rounded-2xl border border-white/12 hover:border-cyan-400/35 p-6 sm:p-8 transition-colors duration-300"
              >
                {/* Timeline Node Dot on the vertical line */}
                <span
                  className={`hidden sm:block absolute -left-[36.5px] top-10 w-2.5 h-2.5 rounded-full border ${
                    exp.isCurrent
                      ? "bg-cyan-400 border-cyan-300 shadow-[0_0_10px_#00F5FF]"
                      : "bg-[#020203] border-white/40"
                  }`}
                  aria-hidden="true"
                />

                <div className="flex flex-col sm:flex-row items-start gap-5">
                  {/* Left Role Icon Box (Nested radius: rounded-xl inside rounded-2xl) */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      exp.isCurrent
                        ? "bg-cyan-950/40 border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_-6px_rgba(0,245,255,0.4)]"
                        : "bg-white/[0.03] border-white/12 text-slate-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Right Content Column */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-1">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          {exp.period}
                        </span>
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                            Cargo Atual
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>

                      <div className="text-sm font-mono text-cyan-400 mt-0.5">
                        {exp.organization}
                      </div>
                    </div>

                    {/* Bullet Points with Circuit Node Icon */}
                    <ul className="space-y-2.5 pt-1">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed text-pretty font-sans"
                        >
                          <CircuitBulletIcon />
                          <span>{bullet}</span>
                        </li>
                      ))}

                      {/* Technologies Bullet */}
                      <li className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed text-pretty font-sans pt-1">
                        <CircuitBulletIcon />
                        <span>
                          <strong className="text-white font-semibold">
                            Principais tecnologias utilizadas:{" "}
                          </strong>
                          <span className="text-slate-300">{exp.technologies}</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

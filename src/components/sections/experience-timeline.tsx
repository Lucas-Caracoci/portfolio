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
    period: "Abril 2026 — Atualmente",
    role: "Desenvolvedor Full-Stack",
    organization: "@Prefeitura Municipal",
    icon: Code2,
    isCurrent: true,
    bullets: [
      "Desenvolvimento de sistemas web em produção com Laravel, React, TypeScript e Inertia.js.",
      "Sincronização offline via IndexedDB (Dexie.js), vouchers QR Code e motores de cálculo.",
      "Migração de dados legados com Python para PostgreSQL e geração de PDFs em Docker.",
    ],
    technologies:
      "Laravel, React 19, TypeScript, Inertia.js, PostgreSQL, Docker, Dexie.js, Redis.",
  },
  {
    id: "ti-infra",
    period: "Abril 2025 — Abril 2026",
    role: "Analista de TI & Infraestrutura",
    organization: "@Prefeitura Municipal",
    icon: Server,
    bullets: [
      "Administração de redes, infraestrutura de TI e suporte crítico às unidades.",
      "Implantação de sistemas internos, padronização de segurança e adequação à LGPD.",
      "Mapeamento técnico em campo e transição para a equipe de Desenvolvimento.",
    ],
    technologies:
      "Infraestrutura de TI, Redes, Linux, Diagnóstico de Sistemas, Segurança da Informação.",
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
    <section id="career" className="relative z-20 py-24 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: easeOutCustom }}
        className="mb-14"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-md border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">
          03 / EXPERIÊNCIA PROFISSIONAL
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 leading-tight text-balance">
          Trajetória
          <span className="block text-cyan-400">técnica.</span>
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

"use client";

import { motion } from "framer-motion";
import { Code2, Server } from "lucide-react";
import { SpatialGlass } from "./spatial-glass";

const easeOutEthereal = [0.22, 1, 0.36, 1] as const;

export function EtherealCareer() {
  const items = [
    {
      period: "Abril 2026 — Atualmente",
      role: "Desenvolvedor Full-Stack",
      org: "@Prefeitura Municipal",
      current: true,
      icon: Code2,
      bullets: [
        "Desenvolvimento de sistemas web em produção com Laravel, React, TypeScript e Inertia.js.",
        "Sincronização offline via IndexedDB (Dexie.js), vouchers QR Code e motores de cálculo.",
        "Migração de dados legados com Python para PostgreSQL e geração de PDFs em Docker.",
      ],
    },
    {
      period: "Abril 2025 — Abril 2026",
      role: "Analista de TI & Infraestrutura",
      org: "@Prefeitura Municipal",
      current: false,
      icon: Server,
      bullets: [
        "Administração de redes, infraestrutura de TI e suporte crítico às unidades.",
        "Implantação de sistemas internos, padronização de segurança e adequação à LGPD.",
        "Mapeamento técnico em campo e transição para a equipe de Desenvolvimento.",
      ],
    },
  ];

  return (
    <section id="career" className="relative py-28 sm:py-36 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14 space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-main)]">
            03 / Experiência Profissional
          </div>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tight">
            Trajetória <span className="font-serif-display">técnica</span>
          </h2>
        </div>

        <div className="relative pl-5 sm:pl-9 space-y-8">
          {/* Luminous vertical filament instead of a heavy solid line */}
          <div
            className="absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-[var(--accent-main)] via-[var(--accent-secondary)] to-transparent opacity-60"
            aria-hidden="true"
          />

          {items.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.article
                key={exp.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: easeOutEthereal,
                }}
                className="relative"
              >
                <span
                  className={`hidden sm:block absolute -left-[40px] top-10 w-2.5 h-2.5 rounded-full ${
                    exp.current
                      ? "bg-[var(--accent-main)] shadow-[0_0_14px_var(--accent-main)]"
                      : "bg-[var(--fg-subtle)]"
                  }`}
                  aria-hidden="true"
                />

                <SpatialGlass className="rounded-3xl p-6 sm:p-9">
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-[var(--border-outline)] ${
                        exp.current
                          ? "bg-[var(--bg-tint)] text-[var(--accent-main)]"
                          : "ethereal-pill text-[var(--fg-muted)]"
                      }`}
                    >
                      <Icon className="w-5 h-5 stroke-[1.6]" />
                    </div>

                    <div className="flex-1 space-y-3.5">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                          {exp.period}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-light tracking-tight mt-0.5">
                          {exp.role}
                        </h3>
                        <div className="text-sm font-mono text-[var(--accent-main)] mt-0.5">
                          {exp.org}
                        </div>
                      </div>

                      <ul className="space-y-2 pt-1">
                        {exp.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3 text-sm font-light text-[var(--fg-muted)] leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-main)] mt-2 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpatialGlass>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

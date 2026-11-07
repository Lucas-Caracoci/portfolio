"use client";

import { motion } from "framer-motion";
import { Code2, Server } from "lucide-react";

const easeOutCustom = [0.22, 1, 0.36, 1] as const;

export function V3Career() {
  const items = [
    {
      period: "ABRIL 2026 — ATUALMENTE",
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
      period: "ABRIL 2025 — ABRIL 2026",
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
    <section
      id="career"
      className="relative py-24 px-4 sm:px-8 border-b border-[var(--border-subtle)]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-main)] font-semibold mb-2">
            03 / CARREIRA
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Experiência profissional.
          </h2>
        </div>

        <div className="relative pl-4 sm:pl-8 space-y-6">
          <div
            className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border-strong)]"
            aria-hidden="true"
          />

          {items.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.article
                key={exp.role}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.06, ease: easeOutCustom }}
                className="relative v3-surface rounded-2xl p-6 sm:p-8 hover:border-[var(--accent-main)]"
              >
                <span
                  className={`hidden sm:block absolute -left-[36.5px] top-9 w-2.5 h-2.5 rounded-full ${
                    exp.current
                      ? "bg-[var(--accent-main)]"
                      : "bg-[var(--fg-muted)]"
                  }`}
                  aria-hidden="true"
                />

                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      exp.current
                        ? "bg-[var(--accent-main)] text-[var(--accent-fg)]"
                        : "bg-[var(--bg-elevated)] text-[var(--fg-primary)]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-[var(--fg-muted)]">
                        {exp.period}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-mono font-semibold text-[var(--accent-main)]">
                        {exp.org}
                      </div>
                    </div>

                    <ul className="space-y-2 pt-1">
                      {exp.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2.5 text-sm text-[var(--fg-muted)] leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-main)] mt-2 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
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

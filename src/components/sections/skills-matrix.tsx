"use client";

import { motion } from "framer-motion";

const easeOutCustom = [0.22, 1, 0.36, 1] as const;

export function SkillsMatrixSection() {
  const domains = [
    {
      index: "01",
      title: "Backend",
      summary: "Regras de negócio & motores de processamento.",
      tags: [
        "PHP & Laravel",
        "Service Pattern",
        "Python (ETL)",
        "PDF Headless",
        "SSO & RBAC",
      ],
    },
    {
      index: "02",
      title: "Frontend",
      summary: "Interfaces fluidas, reatividade e sincronização offline.",
      tags: [
        "React 19",
        "Next.js",
        "TypeScript",
        "Inertia.js",
        "Tailwind CSS v4",
        "Dexie.js (IndexedDB)",
        "Three.js & GSAP",
      ],
    },
    {
      index: "03",
      title: "Dados & Cloud",
      summary: "Persistência consistente, filas e infraestrutura.",
      tags: [
        "PostgreSQL",
        "Redis & Horizon",
        "Docker & Compose",
        "Cloud Computing",
        "Linux",
      ],
    },
    {
      index: "04",
      title: "Qualidade",
      summary: "Testes automatizados, contratos e análise estática.",
      tags: [
        "PHPUnit",
        "Zod & React Hook Form",
        "Análise Estática",
        "ESLint & Pint",
        "Git",
      ],
    },
  ];

  return (
    <section id="stack" className="relative z-20 py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: easeOutCustom }}
        className="mb-12"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
          02 / ARQUITETURA & FERRAMENTAS
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 text-balance">
          Stack principal.
        </h2>
      </motion.div>

      {/* Horizontal Editorial Specification Index (Anti-Slop: replaces generic 2x2 boxy icon cards) */}
      <div className="border-t border-white/15 divide-y divide-white/10">
        {domains.map((domain, idx) => (
          <motion.div
            key={domain.index}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.35,
              delay: idx * 0.05,
              ease: easeOutCustom,
            }}
            className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-colors duration-200 hover:bg-white/[0.01]"
          >
            <div className="lg:col-span-5 pr-4">
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="text-xs font-mono text-cyan-400">{domain.index}</span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {domain.title}
                </h3>
              </div>
              <p className="text-sm text-slate-400 font-sans text-pretty leading-relaxed pl-7">
                {domain.summary}
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-wrap gap-2 lg:justify-end">
              {domain.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-[#020203]/85 border border-white/12 hover:border-cyan-400/50 hover:-translate-y-0.5 text-xs font-mono text-slate-200 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

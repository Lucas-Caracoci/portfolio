"use client";

import { motion } from "framer-motion";
import { SpatialGlass } from "./spatial-glass";

const easeOutEthereal = [0.22, 1, 0.36, 1] as const;

export function EtherealStack() {
  const groups = [
    {
      num: "01",
      title: "Backend",
      subtitle: "Regras de negócio & motores",
      items: [
        "PHP & Laravel",
        "Service Pattern",
        "Python (ETL)",
        "PDF Headless",
        "SSO & RBAC",
      ],
    },
    {
      num: "02",
      title: "Frontend",
      subtitle: "Interfaces fluidas & offline",
      items: [
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
      num: "03",
      title: "Dados & Cloud",
      subtitle: "Persistência & infraestrutura",
      items: [
        "PostgreSQL",
        "Redis & Horizon",
        "Docker & Compose",
        "Cloud Computing",
        "Linux",
      ],
    },
    {
      num: "04",
      title: "Qualidade",
      subtitle: "Testes & contratos tipados",
      items: [
        "PHPUnit",
        "Zod & React Hook Form",
        "Análise Estática",
        "ESLint & Pint",
        "Git",
      ],
    },
  ];

  return (
    <section id="stack" className="relative py-28 sm:py-36 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-main)]">
            02 / Arquitetura & Ferramentas
          </div>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tight">
            Stack <span className="font-serif-display">principal</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group, idx) => (
            <motion.div
              key={group.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.07,
                ease: easeOutEthereal,
              }}
            >
              <SpatialGlass className="rounded-3xl p-7 sm:p-8 h-full flex flex-col justify-between gap-6">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-light tracking-tight">
                      {group.title}
                    </h3>
                    <p className="text-xs font-mono text-[var(--fg-muted)] mt-1">
                      {group.subtitle}
                    </p>
                  </div>
                  <span className="font-serif-display text-3xl text-[var(--accent-main)] opacity-80">
                    {group.num}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3.5 py-1.5 rounded-full ethereal-pill text-xs font-mono text-[var(--fg-primary)] hover:border-[var(--accent-main)] hover:-translate-y-0.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SpatialGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

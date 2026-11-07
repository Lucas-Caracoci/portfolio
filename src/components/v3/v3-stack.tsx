"use client";

import { motion } from "framer-motion";

const easeOutCustom = [0.22, 1, 0.36, 1] as const;

export function V3Stack() {
  const rows = [
    {
      num: "01",
      title: "Backend",
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
    <section
      id="stack"
      className="relative py-24 px-4 sm:px-8 border-b border-[var(--border-subtle)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-main)] font-semibold mb-2">
            02 / STACK
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Tecnologias principais.
          </h2>
        </div>

        <div className="border-t border-[var(--border-strong)] divide-y divide-[var(--border-subtle)]">
          {rows.map((row, idx) => (
            <motion.div
              key={row.num}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: idx * 0.04, ease: easeOutCustom }}
              className="py-7 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            >
              <div className="md:col-span-4 flex items-baseline gap-3">
                <span className="text-xs font-mono font-bold text-[var(--accent-main)]">
                  {row.num}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {row.title}
                </h3>
              </div>

              <div className="md:col-span-8 flex flex-wrap gap-2 md:justify-end">
                {row.items.map((item) => (
                  <span
                    key={item}
                    className="px-3.5 py-1.5 rounded-full v3-surface text-xs font-mono font-medium hover:border-[var(--accent-main)] hover:-translate-y-0.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

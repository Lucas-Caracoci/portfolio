"use client";

import { motion } from "framer-motion";

const easeOutCustom = [0.22, 1, 0.36, 1] as const;

export function SwissStackIndex() {
  const stackGroups = [
    {
      index: "01",
      title: "Backend sem bagunça",
      personalWhy:
        "Não gosto de Controller gigante fazendo tudo. Separo as regras de negócio em Services e DTOs claros, uso filas para o que é pesado e mantenho o código fácil de testar.",
      tools: [
        "PHP & Laravel",
        "Service Pattern & DTOs",
        "Python (ETL & Scripts)",
        "PDF Headless (Chromium)",
        "SSO & RBAC",
        "PHPUnit",
      ],
    },
    {
      index: "02",
      title: "Front-end que parece aplicativo nativo",
      personalWhy:
        "Cuido dos detalhes que pouca gente vê mas todo mundo sente: transições rápidas abaixo de 250ms, dados salvos no navegador quando a rede cai e formulários que validam na hora.",
      tools: [
        "React 19 & Next.js",
        "TypeScript Estrito",
        "Inertia.js",
        "Tailwind CSS v4",
        "Dexie.js (IndexedDB)",
        "TanStack Query",
        "GSAP & Three.js",
      ],
    },
    {
      index: "03",
      title: "Banco de dados, Cloud & Containers",
      personalWhy:
        "Pós-graduado em Engenharia de Software e Cloud Computing. Tudo roda isolado em containers Docker com transações seguras no PostgreSQL e filas supervisionadas no Redis.",
      tools: [
        "PostgreSQL & MySQL",
        "Docker & Compose",
        "Redis & Horizon",
        "Cloud Architecture",
        "Transações ACID",
        "Linux & Nginx",
      ],
    },
  ];

  return (
    <section
      id="stack"
      className="relative py-28 px-4 sm:px-8 bg-[#F4F1EA] border-b border-[#111111]/12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: easeOutCustom }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF3B00] font-bold mb-3">
              [ CAIXA DE FERRAMENTAS ]
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] leading-none text-balance">
              O que eu uso no dia a dia —{" "}
              <span className="text-[#575551]">e por quê.</span>
            </h2>
          </div>

          <p className="text-sm font-mono text-[#575551] max-w-xs">
            Tecnologia pra mim é ferramenta, não religião. Escolho o que resolve o problema com
            menos atrito.
          </p>
        </motion.div>

        <div className="border-t border-[#111111]/15 divide-y divide-[#111111]/12">
          {stackGroups.map((group, idx) => (
            <motion.div
              key={group.index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.05, ease: easeOutCustom }}
              className="group py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-colors duration-200 hover:bg-white/60 px-2 sm:px-4 rounded-xl"
            >
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded bg-[#141413] group-hover:bg-[#FF3B00] text-white text-xs font-mono font-bold transition-colors">
                    {group.index}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-[#111111]">
                    {group.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#575551] leading-relaxed text-pretty pl-11">
                  {group.personalWhy}
                </p>
              </div>

              <div className="lg:col-span-7 flex flex-wrap gap-2 lg:justify-end pt-1">
                {group.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#111111]/12 group-hover:border-[#111111]/25 text-xs font-mono font-semibold text-[#111111] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF3B00]"
                  >
                    {tool}
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

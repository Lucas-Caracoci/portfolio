"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/react-bits/ui-effects";
import { DecryptedText } from "@/components/react-bits/text-effects";
import {
  SolarCode,
  SolarLayers,
  SolarDatabase,
  SolarShieldCheck,
} from "@/components/react-bits/icons";

const baseCurve = [0.22, 1, 0.36, 1] as const;

export function RbStack() {
  const pillars = [
    {
      index: "01",
      title: "Backend modular e motores de documentos",
      outcome:
        "Regras de negócio isoladas em Services e DTOs evitam acoplamento em controllers e permitem processar lotes de PDFs em segundo plano.",
      icon: SolarCode,
      tools: [
        "PHP e Laravel",
        "Service Pattern e DTOs",
        "Python ETL",
        "Chromium PDF Engine",
        "SSO e OAuth2",
        "RBAC Granular",
      ],
    },
    {
      index: "02",
      title: "Front end reativo com sincronização local",
      outcome:
        "Interfaces construídas para responder em menos de 200ms e continuar salvando dados no navegador mesmo sem sinal de internet.",
      icon: SolarLayers,
      tools: [
        "React 19 e Next.js",
        "TypeScript Estrito",
        "Inertia.js",
        "Tailwind CSS v4",
        "Dexie.js IndexedDB",
        "TanStack Query",
      ],
    },
    {
      index: "03",
      title: "Cloud Computing, dados e containers",
      outcome:
        "Ambientes reproduzíveis em Docker com transações ACID no PostgreSQL e filas assíncronas monitoradas em tempo real com Redis e Horizon.",
      icon: SolarDatabase,
      tools: [
        "PostgreSQL e MySQL",
        "Docker e Compose",
        "Redis e Horizon",
        "Arquitetura em Nuvem",
        "Transações ACID",
        "Linux e Nginx",
      ],
    },
    {
      index: "04",
      title: "Qualidade, segurança e auditoria",
      outcome:
        "Contratos tipados de ponta a ponta com validação estrita, ofuscação de identificadores sensíveis e conformidade com a LGPD.",
      icon: SolarShieldCheck,
      tools: [
        "PHPUnit",
        "Zod e React Hook Form",
        "Análise Estática",
        "Trilhas de Auditoria",
        "Laravel Pint e ESLint",
        "Git Flow",
      ],
    },
  ];

  return (
    <section id="stack" className="relative py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: baseCurve }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3">
            <DecryptedText
              text="03 // ARQUITETURA E BENEFÍCIOS"
              className="text-xs text-emerald-400 uppercase tracking-widest"
            />
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white text-balance">
              Especificações técnicas.
            </h2>
          </div>

          <p className="text-sm text-neutral-400 max-w-md text-pretty">
            Pós graduado em Engenharia de Software e Cloud Computing. Cada
            camada da stack é escolhida para reduzir retrabalho operacional e
            sustentar carga real.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: baseCurve,
                }}
              >
                <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-[#272727] border border-white/10 flex items-center justify-center text-emerald-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-neutral-400">
                        DOMÍNIO {pillar.index}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-neutral-300 text-pretty">
                        {pillar.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    {pillar.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-md bg-[#1F1F1F] border border-white/10 text-xs font-mono text-neutral-200 hover:border-emerald-400/50 transition-colors duration-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

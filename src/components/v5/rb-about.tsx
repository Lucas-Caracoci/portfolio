"use client";

import { motion } from "framer-motion";
import Lanyard from "@/components/react-bits/Lanyard";
import { DecryptedText, CountUp } from "@/components/react-bits/text-effects";
import { SpotlightCard } from "@/components/react-bits/ui-effects";
import {
  SolarCode,
  SolarDatabase,
  SolarShieldCheck,
  SolarSparkles,
} from "@/components/react-bits/icons";

const baseCurve = [0.22, 1, 0.36, 1] as const;

export function RbAbout() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column (6 cols): Personal Bio, Engineering Philosophy & Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: baseCurve }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="space-y-3">
            <DecryptedText
              text="01 // SOBRE MIM"
              className="text-xs text-[#f97316] uppercase tracking-widest"
            />
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#fff7ed] text-balance">
              Da linha de frente da infraestrutura à arquitetura de software
              crítico.
            </h2>
          </div>

          <div className="space-y-4 text-base text-neutral-300 text-pretty">
            <p>
              Sou{" "}
              <strong className="text-[#fff7ed] font-semibold">
                Lucas Caracoci
              </strong>
              , Engenheiro de Software Full Stack baseado em Arraial do Cabo,
              RJ, pós graduado em{" "}
              <strong className="text-[#fff7ed] font-semibold">
                Engenharia de Software e Cloud Computing
              </strong>
              .
            </p>

            <p>
              Minha trajetória começou na sustentação de infraestrutura e redes
              em operação real. Ver de perto links de internet oscilarem no meio
              de avaliações escolares ou equipes unificando centenas de PDFs
              manualmente moldou a forma como projeto software hoje.
            </p>

            <p>
              Desenvolvo sistemas institucionais e produtos digitais com{" "}
              <strong className="text-[#fff7ed] font-semibold">
                Laravel, React 19, Next.js, TypeScript e PostgreSQL
              </strong>
              , priorizando persistência local no navegador via IndexedDB,
              filas auditáveis com Redis e Horizon e interfaces que respondem em
              menos de 200ms.
            </p>
          </div>

          {/* Core Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              {
                icon: SolarDatabase,
                metric: <CountUp to={94.2} decimals={1} suffix="%" />,
                label: "Quórum apurado com sync local",
              },
              {
                icon: SolarShieldCheck,
                metric: <CountUp to={312} suffix="+" />,
                label: "Editais migrados via Python ETL",
              },
              {
                icon: SolarCode,
                metric: <CountUp to={4} />,
                label: "Sistemas críticos em produção",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <SpotlightCard key={item.label} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold font-mono text-[#fff7ed]">
                      {item.metric}
                    </span>
                    <Icon className="w-4 h-4 text-[#f97316]" />
                  </div>
                  <div className="text-xs text-neutral-400">{item.label}</div>
                </SpotlightCard>
              );
            })}
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#141118]/70 backdrop-blur-xl border border-[#fed7aa]/10 text-xs font-mono text-[#fed7aa]/90">
            <SolarSparkles className="w-4 h-4 text-[#f97316] shrink-0" />
            <span>
              Interativo: arraste o crachá 3D ao lado ou clique nele para virar
              o verso
            </span>
          </div>
        </motion.div>

        {/* Right Column (6 cols): Official React Bits 3D Lanyard Component */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12, ease: baseCurve }}
          className="lg:col-span-6"
        >
          <div className="relative w-full h-[540px] sm:h-[620px] rounded-2xl bg-[#141118]/65 backdrop-blur-xl border border-[#fed7aa]/10 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.65)] overflow-hidden">
            {/* Subtle top status header inside Lanyard viewport */}
            <div className="pointer-events-none absolute top-4 inset-x-4 z-10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="px-2.5 py-1 rounded-lg bg-[#141118]/80 backdrop-blur-md border border-[#fed7aa]/12 text-[#f97316]">
                CREDENTIAL // 3D PHYSICS
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#141118]/80 backdrop-blur-md border border-[#fed7aa]/12 text-[#fed7aa]/80">
                ARRASTE OU CLIQUE PARA GIRAR
              </span>
            </div>

            <Lanyard
              orientation="portrait"
              finish="holographic"
              metal="gold"
              cardColor="#1a141f"
              strapColor="#120f17"
              strapLength={0.48}
              strapWidth={0.68}
              size={0.58}
              cornerRadius={0.28}
              gravity={1}
              damping={0.48}
              elasticity={0.52}
              breeze={0.42}
              interactive={true}
              intro={true}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

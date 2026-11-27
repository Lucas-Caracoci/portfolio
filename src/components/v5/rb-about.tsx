"use client";

import { motion } from "framer-motion";
import Lanyard from "@/components/react-bits/Lanyard";
import { DecryptedText } from "@/components/react-bits/text-effects";

const baseCurve = [0.22, 1, 0.36, 1] as const;

export function RbAbout() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column (6 cols): Concise Title & Bio */}
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
              Da infraestrutura à arquitetura de software crítico.
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-neutral-300 text-pretty">
            <p>
              Sou{" "}
              <strong className="text-white font-semibold">
                Lucas Caracoci
              </strong>
              , Engenheiro de Software Full Stack em Arraial do Cabo, RJ,
              pós-graduado em{" "}
              <strong className="text-white font-semibold">
                Engenharia de Software e Cloud Computing
              </strong>
              . Minha base veio da sustentação de redes em operação real, onde
              ver avaliações escolares caírem com internet instável moldou o
              cuidado com cada sistema que projeto hoje.
            </p>

            <p>
              Desenvolvo produtos institucionais e web com{" "}
              <strong className="text-white font-semibold">
                Laravel, React 19, Next.js, TypeScript e PostgreSQL
              </strong>
              , priorizando persistência local via IndexedDB, filas auditáveis
              com Redis e Horizon e interfaces com resposta abaixo de 200ms.
            </p>
          </div>
        </motion.div>

        {/* Right Column (6 cols): Floating 3D Lanyard directly over page background */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12, ease: baseCurve }}
          className="lg:col-span-6 flex flex-col items-center"
        >
          <div className="relative w-full h-[500px] sm:h-[580px]">
            <Lanyard
              orientation="portrait"
              finish="matte"
              metal="graphite"
              cardColor="#141414"
              strapColor="#111111"
              strapLength={0.48}
              strapWidth={0.68}
              size={0.6}
              cornerRadius={0.28}
              gravity={1}
              damping={0.48}
              elasticity={0.52}
              breeze={0.42}
              interactive={true}
              intro={true}
            />
          </div>

          <p className="mt-2 text-xs font-mono text-[#fff7ed]/75 tracking-wide drop-shadow-[0_1px_6px_rgba(10,10,10,0.85)]">
            Arraste ou clique para virar
          </p>
        </motion.div>
      </div>
    </section>
  );
}

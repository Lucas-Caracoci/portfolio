"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "@/components/react-bits/ui-effects";
import { DecryptedText } from "@/components/react-bits/text-effects";
import { SolarChevronDown } from "@/components/react-bits/icons";

const baseCurve = [0.22, 1, 0.36, 1] as const;

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "f1",
    question: "Por que você utiliza monólitos modulares com Laravel e Inertia.js?",
    answer:
      "Monólitos modulares eliminam a duplicação de contratos entre repositório de API e cliente web, mantendo a produtividade alta e a latência baixa. Com Service Pattern e DTOs estritos, cada domínio fica isolado e pronto para escalar ou extrair microserviços específicos apenas quando necessário, como fiz no motor de PDFs.",
  },
  {
    id: "f2",
    question: "Como funciona a sincronização local para ambientes sem internet estável?",
    answer:
      "Utilizo IndexedDB no navegador gerenciado pelo Dexie.js. As ações do usuário são gravadas localmente com validação imediata e entram em uma fila de sincronização idempotente que despacha os lotes ao servidor assim que a conectividade retorna.",
  },
  {
    id: "f3",
    question: "Qual é a sua disponibilidade atual para novos projetos ou oportunidades?",
    answer:
      "Atuo atualmente como Desenvolvedor Full Stack e estou disponível para conversas sobre oportunidades remotas de engenharia de software, arquitetura de sistemas web ou consultoria técnica pontual.",
  },
  {
    id: "f4",
    question: "Como você lida com migração de dados legados e acervos antigos?",
    answer:
      "Construo pipelines de extração, saneamento e carga com Python e SQL transacional. No Portal de Concursos, esse processo estruturou mais de 300 editais históricos no PostgreSQL com verificação de integridade e rastreabilidade.",
  },
  {
    id: "f5",
    question: "Como é garantida a segurança e a conformidade com a LGPD nos sistemas?",
    answer:
      "Aplico controle de acesso baseado em papéis granulares, ofuscação de identificadores públicos em rotas de documentos, anonimização criptográfica em votações sensíveis e registro completo de trilhas de auditoria no banco de dados.",
  },
  {
    id: "f6",
    question: "Por que os sistemas privados não possuem link público de repositório?",
    answer:
      "Os sistemas GIDE, Portal de Concursos e Meu Porto são softwares institucionais em operação no setor público sob acordos de confidencialidade e segurança. Posso apresentar decisões arquiteturais, padrões de código e demonstrações técnicas em entrevistas ou reuniões.",
  },
];

export function RbFaq() {
  const [openId, setOpenId] = useState<string | null>("f1");

  return (
    <section
      id="faq"
      className="relative py-24 px-4 sm:px-8 border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: baseCurve }}
          className="space-y-3"
        >
          <DecryptedText
            text="05 // PERGUNTAS FREQUENTES"
            className="text-xs text-emerald-400 uppercase tracking-widest"
          />
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white text-balance">
            Dúvidas sobre arquitetura e trabalho.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.05,
                  ease: baseCurve,
                }}
              >
                <SpotlightCard>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenId((prev) => (prev === faq.id ? null : faq.id))
                    }
                    className="w-full p-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-semibold text-white">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-lg bg-[#272727] border border-white/10 flex items-center justify-center text-neutral-300 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "rotate-180 text-emerald-400" : ""
                      }`}
                    >
                      <SolarChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: baseCurve }}
                        className="px-6 pb-6 pt-0 text-sm sm:text-base text-neutral-300 text-pretty border-t border-white/10"
                      >
                        <div className="pt-4">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { ScrollReveal, DecryptedText } from "@/components/react-bits/text-effects";

export function RbTaglineReveal() {
  return (
    <section
      id="manifesto"
      aria-label="Filosofia de engenharia"
      className="relative py-24 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <DecryptedText
            text="03 // PRINCÍPIO DE ENGENHARIA"
            className="text-xs text-[#f97316] uppercase tracking-widest"
          />
        </div>

        <ScrollReveal
          lines={[
            "Software público e corporativo não pode",
            "depender de conexão perfeita para funcionar.",
            "Desenho sistemas com persistência local,",
            "filas auditáveis e resposta imediata na tela.",
          ]}
        />
      </div>
    </section>
  );
}

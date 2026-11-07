"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Lock,
  QrCode,
  WifiOff,
  FileText,
  Users,
  ShoppingBag,
} from "lucide-react";

const easeOutCustom = [0.22, 1, 0.36, 1] as const;

export interface V3Project {
  id: "gide" | "concursos" | "meu-porto" | "pizzashop";
  category: string;
  title: string;
  oneLiner: string;
  bullets: string[];
  stack: string[];
  repoUrl?: string;
}

const projects: V3Project[] = [
  {
    id: "gide",
    category: "Educação & Indicadores",
    title: "GIDE",
    oneLiner:
      "Avaliação educacional em rede com votação anônima por QR Code e funcionamento offline.",
    bullets: [
      "Coleta local sem internet via IndexedDB",
      "Vouchers de uso único por segmento",
      "Apuração automática de metas ponderadas",
    ],
    stack: ["Laravel", "React", "TypeScript", "Inertia.js", "Dexie.js"],
  },
  {
    id: "concursos",
    category: "Gestão Documental",
    title: "Portal de Concursos",
    oneLiner:
      "Publicação de certames e editais com fusão automatizada de PDFs e acervo histórico migrado.",
    bullets: [
      "Unificação de anexos via Chromium Headless",
      "Mais de 300 editais migrados ao PostgreSQL",
      "Identificadores protegidos em rotas públicas",
    ],
    stack: ["Laravel", "React", "PostgreSQL", "PDF Headless", "Horizon"],
  },
  {
    id: "meu-porto",
    category: "Comunidade Escolar",
    title: "Meu Porto",
    oneLiner:
      "Plataforma estudantil com mentoria entre alunos por afinidade, fórum moderado e suporte.",
    bullets: [
      "Pareamento automático por interesses",
      "Atendimento interno por protocolo",
      "Conversão de fotos HEIC no navegador",
    ],
    stack: ["Laravel", "Inertia.js", "TanStack Query", "Zod", "Tailwind"],
  },
  {
    id: "pizzashop",
    category: "Operação & Analytics",
    title: "PizzaShop Web",
    oneLiner:
      "Painel de pedidos e métricas para restaurantes com atualização instantânea de status.",
    bullets: [
      "Mutação otimista sem tempo de espera",
      "Formulários tipados com React Hook Form + Zod",
      "Componentes 100% acessíveis por teclado",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind v4", "Radix UI"],
    repoUrl: "https://github.com/Lucas-Caracoci/pizzashop",
  },
];

function DualThemePreview({ id }: { id: V3Project["id"] }) {
  if (id === "gide") {
    return (
      <div className="p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
            <div className="text-xs font-mono text-[var(--fg-muted)]">Quórum</div>
            <div className="text-2xl font-bold font-mono text-[var(--accent-main)] mt-0.5">
              94.2%
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
            <div className="text-xs font-mono text-[var(--fg-muted)]">Vouchers</div>
            <div className="text-2xl font-bold font-mono mt-0.5">1.482</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
              <span>Offline</span>
              <WifiOff className="w-3.5 h-3.5 text-[var(--accent-main)]" />
            </div>
            <div className="text-xs font-mono font-semibold">Sincronizado</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-3">
            {[
              { label: "Docentes", pct: 92 },
              { label: "Equipe Técnica", pct: 78 },
              { label: "Estudantes", pct: 68 },
            ].map((row, idx) => (
              <div key={row.label} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--fg-muted)]">{row.label}</span>
                  <span className="font-semibold">{row.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[var(--bg-base)] overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 28,
                      delay: 0.05 + idx * 0.05,
                    }}
                    className="h-full rounded-full bg-[var(--accent-main)] origin-left"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="sm:col-span-4 p-4 rounded-xl bg-[var(--accent-main)] text-[var(--accent-fg)] flex flex-col items-center justify-center text-center">
            <QrCode className="w-10 h-10 mb-2" />
            <div className="text-xs font-mono font-bold">#GD-8492</div>
            <div className="text-xs font-mono opacity-80">Uso único</div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "concursos") {
    return (
      <div className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          <span className="text-xs font-mono font-semibold">
            CERTAME #2026-01 • QUADRO GERAL
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-main)] text-[var(--accent-fg)] text-xs font-mono font-bold">
            Publicado
          </span>
        </div>

        {[
          { name: "01_Edital_Abertura.pdf", status: "Assinado" },
          { name: "02_Quadro_De_Vagas.pdf", status: "Anexado" },
          { name: "03_Cronograma_Consolidado.pdf", status: "Unificado" },
        ].map((doc, idx) => (
          <motion.div
            key={doc.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.04, ease: easeOutCustom }}
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-mono"
          >
            <span className="flex items-center gap-2.5 truncate">
              <FileText className="w-4 h-4 text-[var(--accent-main)] shrink-0" />
              <span className="truncate">{doc.name}</span>
            </span>
            <span className="font-semibold text-[var(--accent-main)] shrink-0">
              {doc.status}
            </span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (id === "meu-porto") {
    return (
      <div className="p-5 sm:p-6 space-y-4">
        <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 font-semibold">
              <Users className="w-4 h-4 text-[var(--accent-main)]" /> MENTORIA ESTUDANTIL
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-main)] text-[var(--accent-fg)] font-bold">
              96% Match
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <div className="text-xs font-mono text-[var(--fg-muted)]">Mentor</div>
              <div className="text-sm font-bold mt-0.5">Gabriel M. • 9º Ano</div>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <div className="text-xs font-mono text-[var(--fg-muted)]">Afilhado</div>
              <div className="text-sm font-bold mt-0.5">Lucas S. • 6º Ano</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {["#Robótica", "#Programação", "#Matemática", "#Xadrez"].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-6 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          <div className="text-xs font-mono text-[var(--fg-muted)]">Receita Mensal</div>
          <div className="text-2xl font-bold font-mono mt-0.5">R$ 48.290</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
            <span>Pedidos Hoje</span>
            <ShoppingBag className="w-3.5 h-3.5 text-[var(--accent-main)]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--accent-main)] mt-0.5">
            142
          </div>
        </div>
      </div>

      {[
        { id: "#9821", customer: "Mariana Costa", status: "Em entrega", total: "R$ 89,90" },
        { id: "#9820", customer: "Rafael Mendes", status: "Preparando", total: "R$ 124,50" },
      ].map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-mono"
        >
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-[var(--accent-main)]">{order.id}</span>
            <span className="font-sans font-medium">{order.customer}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[var(--fg-muted)]">{order.status}</span>
            <span className="font-bold">{order.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function V3Projects() {
  const [active, setActive] = useState<V3Project>(projects[0]);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const custom = e as CustomEvent<{ projectId: V3Project["id"] }>;
      const found = projects.find((p) => p.id === custom.detail?.projectId);
      if (found) setActive(found);
    };
    window.addEventListener("portfolio:select-project", onSelect);
    return () => window.removeEventListener("portfolio:select-project", onSelect);
  }, []);

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-8 border-b border-[var(--border-subtle)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Clean Header + Spring Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-main)] font-semibold mb-2">
              01 / PROJETOS
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Sistemas em produção.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {projects.map((p, idx) => {
              const isSelected = active.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(p)}
                  className={`relative px-4 py-2.5 rounded-full text-xs font-mono transition-colors duration-150 cursor-pointer active:scale-[0.97] ${
                    isSelected
                      ? "text-[var(--accent-fg)] font-bold"
                      : "v3-surface text-[var(--fg-muted)] hover:text-[var(--fg-primary)]"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="v3ProjectTab"
                      transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.8 }}
                      className="absolute inset-0 rounded-full bg-[var(--accent-main)]"
                    />
                  )}
                  <span className="relative z-10">
                    0{idx + 1}. {p.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Concise Split Card */}
        <div className="v3-surface rounded-2xl p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.22, ease: easeOutCustom },
              }}
              exit={{
                opacity: 0,
                y: -4,
                transition: { duration: 0.12, ease: easeOutCustom },
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left 5 Cols: Ultra-clean, short copy */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent-main)] font-semibold mb-2">
                    {active.category}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                    {active.title}
                  </h3>
                  <p className="text-base text-[var(--fg-muted)] leading-relaxed text-pretty">
                    {active.oneLiner}
                  </p>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-[var(--border-subtle)]">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-main)] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
                  <div className="flex flex-wrap gap-1.5">
                    {active.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {active.repoUrl ? (
                    <a
                      href={active.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent-main)] hover:underline"
                    >
                      <span>Ver código no GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--fg-muted)]">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Em produção • Repositório privado</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right 7 Cols: Dual-Theme Visual Interface */}
              <div className="lg:col-span-7">
                <div className="rounded-xl overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-base)]">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] text-xs font-mono text-[var(--fg-muted)]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-main)]" />
                    </div>
                    <span>{active.id}.app</span>
                    <span className="text-[var(--accent-main)] font-semibold">Preview</span>
                  </div>

                  <DualThemePreview id={active.id} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

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
import { SpatialGlass } from "./spatial-glass";

const easeOutEthereal = [0.22, 1, 0.36, 1] as const;

export interface EtherealProject {
  id: "gide" | "concursos" | "meu-porto" | "pizzashop";
  category: string;
  title: string;
  oneLiner: string;
  bullets: string[];
  stack: string[];
  repoUrl?: string;
}

const projects: EtherealProject[] = [
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

function FrostedProjectPreview({ id }: { id: EtherealProject["id"] }) {
  if (id === "gide") {
    return (
      <div className="p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl ethereal-pill">
            <div className="text-xs font-mono text-[var(--fg-muted)]">Quórum</div>
            <div className="text-2xl font-light font-mono text-[var(--accent-main)] mt-1">
              94.2%
            </div>
          </div>
          <div className="p-3.5 rounded-2xl ethereal-pill">
            <div className="text-xs font-mono text-[var(--fg-muted)]">Vouchers</div>
            <div className="text-2xl font-light font-mono mt-1">1.482</div>
          </div>
          <div className="p-3.5 rounded-2xl ethereal-pill flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
              <span>Offline</span>
              <WifiOff className="w-3.5 h-3.5 text-[var(--accent-main)]" />
            </div>
            <div className="text-xs font-mono text-[var(--fg-primary)]">Sincronizado</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 p-4 rounded-2xl ethereal-pill space-y-3">
            {[
              { label: "Docentes", pct: 92 },
              { label: "Equipe Técnica", pct: 78 },
              { label: "Estudantes", pct: 68 },
            ].map((row, idx) => (
              <div key={row.label} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--fg-muted)]">{row.label}</span>
                  <span>{row.pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[var(--bg-tint)] overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 28,
                      delay: 0.05 + idx * 0.06,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-[var(--accent-main)] to-[var(--accent-secondary)] origin-left"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="sm:col-span-4 p-4 rounded-2xl bg-[var(--bg-tint)] border border-[var(--border-outline)] flex flex-col items-center justify-center text-center">
            <QrCode className="w-9 h-9 mb-2 text-[var(--accent-main)] stroke-[1.5]" />
            <div className="text-xs font-mono font-medium">#GD-8492</div>
            <div className="text-xs font-mono text-[var(--fg-muted)]">Uso único</div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "concursos") {
    return (
      <div className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between p-3.5 rounded-2xl ethereal-pill">
          <span className="text-xs font-mono">CERTAME #2026-01 • QUADRO GERAL</span>
          <span className="px-3 py-0.5 rounded-full bg-[var(--bg-tint)] border border-[var(--border-outline)] text-[var(--accent-main)] text-xs font-mono">
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
            transition={{ duration: 0.24, delay: idx * 0.05, ease: easeOutEthereal }}
            className="flex items-center justify-between px-4 py-3 rounded-2xl ethereal-pill text-xs font-mono"
          >
            <span className="flex items-center gap-2.5 truncate">
              <FileText className="w-4 h-4 text-[var(--accent-main)] shrink-0" />
              <span className="truncate">{doc.name}</span>
            </span>
            <span className="text-[var(--accent-main)] shrink-0">{doc.status}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (id === "meu-porto") {
    return (
      <div className="p-5 sm:p-6 space-y-4">
        <div className="p-4 rounded-2xl ethereal-pill space-y-3.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[var(--accent-main)]" /> Mentoria Estudantil
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--bg-tint)] border border-[var(--border-outline)] text-[var(--accent-main)]">
              96% afinidade
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[var(--bg-tint)] border border-[var(--border-outline)]">
              <div className="text-xs font-mono text-[var(--fg-muted)]">Mentor</div>
              <div className="text-sm font-medium mt-0.5">Gabriel M. • 9º Ano</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--bg-tint)] border border-[var(--border-outline)]">
              <div className="text-xs font-mono text-[var(--fg-muted)]">Afilhado</div>
              <div className="text-sm font-medium mt-0.5">Lucas S. • 6º Ano</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {["#Robótica", "#Programação", "#Matemática", "#Xadrez"].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-[var(--bg-tint)] border border-[var(--border-outline)] text-xs font-mono text-[var(--fg-muted)]"
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
        <div className="p-3.5 rounded-2xl ethereal-pill">
          <div className="text-xs font-mono text-[var(--fg-muted)]">Receita Mensal</div>
          <div className="text-2xl font-light font-mono mt-1">R$ 48.290</div>
        </div>
        <div className="p-3.5 rounded-2xl ethereal-pill">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
            <span>Pedidos Hoje</span>
            <ShoppingBag className="w-3.5 h-3.5 text-[var(--accent-main)]" />
          </div>
          <div className="text-2xl font-light font-mono text-[var(--accent-main)] mt-1">
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
          className="flex items-center justify-between px-4 py-3 rounded-2xl ethereal-pill text-xs font-mono"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-[var(--accent-main)]">{order.id}</span>
            <span className="font-sans">{order.customer}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[var(--fg-muted)]">{order.status}</span>
            <span className="font-medium">{order.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EtherealProjects() {
  const [active, setActive] = useState<EtherealProject>(projects[0]);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const custom = e as CustomEvent<{ projectId: EtherealProject["id"] }>;
      const found = projects.find((p) => p.id === custom.detail?.projectId);
      if (found) setActive(found);
    };
    window.addEventListener("portfolio:select-project", onSelect);
    return () => window.removeEventListener("portfolio:select-project", onSelect);
  }, []);

  return (
    <section id="projects" className="relative py-28 sm:py-36 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Editorial Header + Translucent Spring Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-main)]">
              01 / Sistemas Selecionados
            </div>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight">
              Em <span className="font-serif-display">produção</span>
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
                  className={`relative px-4 py-2 rounded-full text-xs font-mono transition-colors duration-200 cursor-pointer active:scale-[0.97] ${
                    isSelected
                      ? "text-[var(--fg-primary)] font-medium"
                      : "ethereal-pill text-[var(--fg-muted)] hover:text-[var(--fg-primary)]"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="etherealProjectTab"
                      transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.8 }}
                      className="absolute inset-0 rounded-full ethereal-glass -z-10"
                    />
                  )}
                  <span className="relative z-10">
                    0{idx + 1} · {p.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating Spatial Glass Showcase */}
        <SpatialGlass tilt className="rounded-3xl p-6 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.28, ease: easeOutEthereal },
              }}
              exit={{
                opacity: 0,
                y: -6,
                transition: { duration: 0.14, ease: easeOutEthereal },
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            >
              {/* Left 5 Cols: Clean, light, objective description */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent-main)]">
                    {active.category}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-light tracking-tight">
                    {active.title}
                  </h3>
                  <p className="text-base text-[var(--fg-muted)] font-light leading-relaxed text-pretty">
                    {active.oneLiner}
                  </p>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-[var(--border-outline)]">
                  {active.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-3 text-sm font-light text-[var(--fg-primary)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-main)] shadow-[0_0_8px_var(--accent-main)] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 pt-4 border-t border-[var(--border-outline)]">
                  <div className="flex flex-wrap gap-1.5">
                    {active.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-[var(--bg-tint)] border border-[var(--border-outline)] text-xs font-mono text-[var(--fg-muted)]"
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
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-main)] hover:underline"
                    >
                      <span>Ver código no GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--fg-subtle)]">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Em produção • Repositório privado</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right 7 Cols: Frosted Quartz Interface Preview */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl overflow-hidden border border-[var(--border-outline)] bg-[var(--bg-tint)] backdrop-blur-md">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-outline)] text-xs font-mono text-[var(--fg-muted)]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[var(--border-outline)]" />
                      <span className="w-2 h-2 rounded-full bg-[var(--border-outline)]" />
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-main)]" />
                    </div>
                    <span>{active.id}.app</span>
                    <span className="text-[var(--accent-main)]">Interface</span>
                  </div>

                  <FrostedProjectPreview id={active.id} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SpatialGlass>
      </div>
    </section>
  );
}

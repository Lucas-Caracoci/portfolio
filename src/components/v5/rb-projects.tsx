"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/react-bits/ui-effects";
import { DecryptedText } from "@/components/react-bits/text-effects";
import {
  SolarArrowUpRight,
  SolarLock,
  SolarQrCode,
  SolarFileText,
  SolarLayers,
  SolarUsers,
  SolarShoppingBag,
} from "@/components/react-bits/icons";

const baseCurve = [0.22, 1, 0.36, 1] as const;

export type ProjectId = "gide" | "concursos" | "meu-porto" | "pizzashop";

interface ProjectOutcome {
  title: string;
  detail: string;
}

interface ProjectMetric {
  value: string;
  label: string;
}

interface CaseStudyItem {
  id: ProjectId;
  index: string;
  category: string;
  title: string;
  metric?: ProjectMetric;
  summary: string;
  outcomes: ProjectOutcome[];
  techStack: string[];
  repoUrl?: string;
  provenance: string;
}

const caseStudies: CaseStudyItem[] = [
  {
    id: "gide",
    index: "01",
    category: "Avaliação Institucional e Indicadores",
    title: "GIDE",
    metric: {
      value: "94,2%",
      label: "de quórum apurado com sync local",
    },
    summary:
      "Plataforma de avaliação multidimensional para redes de ensino com controle de quórum em tempo real, votação anônima por QR Code e apuração automatizada de metas.",
    outcomes: [
      {
        title: "Coleta offline-first",
        detail:
          "Persistência no navegador via IndexedDB e Dexie.js para unidades escolares com conexão instável.",
      },
      {
        title: "Vouchers QR de uso único",
        detail:
          "Emissão em lote de códigos anônimos com trava automática de cota por segmento escolar.",
      },
      {
        title: "Cálculo ponderado dinâmico",
        detail:
          "Apuração de notas com redistribuição automática de pesos para itens não aplicáveis.",
      },
    ],
    techStack: [
      "Laravel",
      "React 19",
      "TypeScript",
      "Inertia.js",
      "Dexie.js",
      "PostgreSQL",
    ],
    provenance: "Sistema em Produção • Repositório Privado",
  },
  {
    id: "concursos",
    index: "02",
    category: "Transparência Pública e Documentos",
    title: "Portal de Concursos",
    metric: {
      value: "312+",
      label: "editais migrados via Python ETL",
    },
    summary:
      "Sistema de gestão e publicação de certames, editais e cronogramas com motor dedicado de unificação de PDFs e migração estruturada de acervo histórico.",
    outcomes: [
      {
        title: "Fusão automatizada de PDFs",
        detail:
          "Geração de dossiês e unificação de anexos via microserviço isolado com Chromium Headless.",
      },
      {
        title: "Ingestão de acervo histórico",
        detail:
          "Pipeline em Python e SQL que saneou e estruturou editais legados no PostgreSQL.",
      },
      {
        title: "Proteção e auditoria",
        detail:
          "Ofuscação de identificadores públicos nas rotas de download e registro de trilha de auditoria.",
      },
    ],
    techStack: [
      "Laravel",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "PDF Headless",
      "Laravel Horizon",
    ],
    provenance: "Sistema em Produção • Repositório Privado",
  },
  {
    id: "meu-porto",
    index: "03",
    category: "Ecossistema Escolar e Mentoria",
    title: "Meu Porto",
    summary:
      "Plataforma de comunidade estudantil integrando programa de mentoria por afinidade, fórum acadêmico moderado, suporte por protocolo e mural digital.",
    outcomes: [
      {
        title: "Pareamento por afinidade",
        detail:
          "Algoritmo que forma duplas de mentoria cruzando o catálogo de interesses dos estudantes.",
      },
      {
        title: "Suporte por protocolo",
        detail:
          "Atendimento assíncrono segmentado entre coordenação pedagógica e suporte técnico.",
      },
      {
        title: "Mídia otimizada no cliente",
        detail:
          "Conversão automática de fotos HEIC de dispositivos móveis e compressão antes do envio.",
      },
    ],
    techStack: [
      "Laravel",
      "Inertia.js",
      "TanStack Query",
      "React Hook Form",
      "Zod",
    ],
    provenance: "Sistema em Produção • Repositório Privado",
  },
  {
    id: "pizzashop",
    index: "04",
    category: "Arquitetura Front end e Tempo Real",
    title: "PizzaShop Web",
    summary:
      "Dashboard analítico e operacional para gestão de pedidos e métricas de restaurantes, construído com validação tipada de ponta a ponta e navegação por teclado.",
    outcomes: [
      {
        title: "Mutação otimista instantânea",
        detail:
          "Atualização de status de pedidos na fila operacional com resposta visual imediata.",
      },
      {
        title: "Contratos estritos com Zod",
        detail:
          "Filtros e formulários validados com React Hook Form e TypeScript estrito.",
      },
      {
        title: "Acessibilidade por teclado",
        detail:
          "Modais, tabelas e controles construídos sobre primitivos Radix UI e Tailwind CSS v4.",
      },
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Radix UI",
    ],
    repoUrl: "https://github.com/Lucas-Caracoci/pizzashop",
    provenance: "Código Aberto no GitHub",
  },
];

interface SyncLogEntry {
  id: number;
  tag: "INDEXEDDB" | "POSTGRESQL" | "REDE";
  text: string;
}

function GideOfflineDemo() {
  const [isOffline, setIsOffline] = useState(false);
  const [pendingQueue, setPendingQueue] = useState(0);
  const [logs, setLogs] = useState<SyncLogEntry[]>([
    {
      id: 1,
      tag: "POSTGRESQL",
      text: "Sincronização ativa • 0 votos pendentes no navegador",
    },
  ]);

  const appendLog = (tag: SyncLogEntry["tag"], text: string) => {
    setLogs((prev) => [{ id: Date.now() + Math.random(), tag, text }, ...prev].slice(0, 4));
  };

  const handleToggleNetwork = () => {
    if (isOffline) {
      setIsOffline(false);
      if (pendingQueue > 0) {
        const flushed = pendingQueue;
        setPendingQueue(0);
        appendLog(
          "POSTGRESQL",
          `Conexão restabelecida • ${flushed} voto(s) da fila local gravados em lote`
        );
      } else {
        appendLog("REDE", "Conexão restabelecida • Sync em tempo real ativo");
      }
      return;
    }

    setIsOffline(true);
    appendLog(
      "REDE",
      "Queda simulada • Persistência local Dexie.js assumiu os votos"
    );
  };

  const handleSimulateVote = () => {
    const code = `GD${Math.floor(1000 + Math.random() * 9000)}`;
    if (isOffline) {
      setPendingQueue((prev) => {
        const next = prev + 1;
        appendLog(
          "INDEXEDDB",
          `Voucher #${code} salvo localmente (${next} na fila de sync)`
        );
        return next;
      });
      return;
    }

    appendLog(
      "POSTGRESQL",
      `Voucher #${code} apurado e persistido diretamente em 42ms`
    );
  };

  return (
    <div className="rounded-xl bg-[#111111]/90 border border-white/10 p-5 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5 text-xs font-mono">
          <span
            aria-hidden="true"
            className={`w-2 h-2 rounded-full ${
              isOffline ? "bg-amber-400" : "bg-emerald-400"
            }`}
          />
          <span className="text-neutral-200 font-semibold">
            {isOffline ? "Offline (IndexedDB ativo)" : "Online (Sync ativo)"}
          </span>
          {pendingQueue > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-[#1C1C1C] border border-amber-400/30 text-amber-300">
              {pendingQueue} na fila
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleToggleNetwork}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.98] ${
              isOffline
                ? "bg-amber-500/15 text-amber-300 border-amber-400/40 hover:bg-amber-500/25"
                : "bg-[#1C1C1C] text-neutral-200 border-white/10 hover:border-[#f97316]/50 hover:text-white"
            }`}
          >
            {isOffline ? "Reconectar" : "Simular queda"}
          </button>

          <button
            type="button"
            onClick={handleSimulateVote}
            className="px-3 py-1.5 rounded-lg bg-[#f97316] hover:bg-[#fb923c] text-[#111111] text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.98]"
          >
            <SolarQrCode className="w-3.5 h-3.5" />
            <span>Simular voto QR</span>
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-400">
          <span>Log da fila local (Dexie.js → PostgreSQL)</span>
          <span className="text-[#f97316]">Simulação interativa</span>
        </div>

        <ul className="space-y-2 font-mono text-xs">
          {logs.map((entry, idx) => (
            <li
              key={entry.id}
              className={`flex items-start gap-2.5 py-1.5 border-b border-white/5 last:border-b-0 ${
                idx === 0 ? "text-neutral-100" : "text-neutral-400"
              }`}
            >
              <span
                className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                  entry.tag === "INDEXEDDB"
                    ? "bg-amber-500/15 text-amber-300"
                    : entry.tag === "POSTGRESQL"
                    ? "bg-[#f97316]/15 text-[#fb923c]"
                    : "bg-[#1C1C1C] text-neutral-300"
                }`}
              >
                {entry.tag}
              </span>
              <span className="leading-relaxed text-pretty">{entry.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ConcursosPdfDemo() {
  const [pdfStage, setPdfStage] = useState<
    "idle" | "queued" | "merging" | "done"
  >("idle");
  const [pdfLog, setPdfLog] = useState(
    "Worker Horizon pronto • 3 anexos aguardando unificação"
  );

  const triggerPdfMerge = () => {
    if (pdfStage === "queued" || pdfStage === "merging") return;
    setPdfStage("queued");
    setPdfLog("Job despachado para Redis Horizon (queue: pdf-engine)...");
    setTimeout(() => {
      setPdfStage("merging");
      setPdfLog(
        "Chromium Headless unificando 3 PDFs e gerando hash SHA-256..."
      );
    }, 420);
    setTimeout(() => {
      setPdfStage("done");
      setPdfLog(
        "Dossiê_Consolidado_2026.pdf gerado (2.86 MB) em 318ms • Assinado"
      );
    }, 1150);
  };

  const docs = [
    {
      name: "001_Edital_Abertura_Normativo.pdf",
      size: "1.8 MB",
      status: pdfStage === "done" ? "Mesclado ✓" : "Assinado",
    },
    {
      name: "002_Anexo_I_Quadro_De_Vagas.pdf",
      size: "640 KB",
      status: pdfStage === "done" ? "Mesclado ✓" : "Anexado",
    },
    {
      name: "003_Cronograma_Oficial.pdf",
      size: "420 KB",
      status: pdfStage === "done" ? "Mesclado ✓" : "Pronto",
    },
  ];

  return (
    <div className="rounded-xl bg-[#111111]/90 border border-white/10 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
          <SolarFileText className="w-4 h-4 text-[#f97316]" />
          <span>Motor PDF Headless</span>
        </div>

        <button
          type="button"
          onClick={triggerPdfMerge}
          disabled={pdfStage === "queued" || pdfStage === "merging"}
          className="px-3 py-1.5 rounded-lg bg-[#f97316] hover:bg-[#fb923c] disabled:opacity-60 text-[#111111] text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.98]"
        >
          <SolarLayers className="w-3.5 h-3.5" />
          <span>
            {pdfStage === "idle" && "Unificar PDFs"}
            {pdfStage === "queued" && "Fila Horizon..."}
            {pdfStage === "merging" && "Compilando..."}
            {pdfStage === "done" && "Reprocessar"}
          </span>
        </button>
      </div>

      <ul className="divide-y divide-white/5 text-xs font-mono">
        {docs.map((doc) => (
          <li
            key={doc.name}
            className="py-2 flex items-center justify-between gap-3"
          >
            <span className="text-neutral-200 truncate">{doc.name}</span>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-neutral-500">{doc.size}</span>
              <span className="text-[#f97316]">{doc.status}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="pt-3 border-t border-white/10 text-xs font-mono text-neutral-300 truncate">
        &gt; {pdfLog}
      </div>
    </div>
  );
}

function MeuPortoAffinityDemo() {
  const tags = ["Robótica", "Matemática", "Programação", "Xadrez", "Física", "IA"];
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Robótica",
    "Matemática",
    "Programação",
    "Xadrez",
  ]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.length > 1
          ? prev.filter((t) => t !== tag)
          : prev
        : [...prev, tag]
    );
  };

  const affinityScore = Math.min(99, Math.round(82 + selectedTags.length * 3.5));

  return (
    <div className="rounded-xl bg-[#111111]/90 border border-white/10 p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300">
          <SolarUsers className="w-4 h-4 text-[#f97316]" />
          <span>Pareamento por Afinidade</span>
        </span>
        <span className="px-2 py-0.5 rounded-md bg-[#1C1C1C] border border-[#f97316]/35 text-[#f97316] text-xs font-mono font-semibold">
          {affinityScore}% compatível
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 text-xs">
        <div>
          <div className="font-mono text-neutral-500">Mentor Veterano</div>
          <div className="text-sm font-semibold text-white mt-0.5">
            {selectedTags.includes("IA") || selectedTags.includes("Física")
              ? "Beatriz L. • 9º Ano"
              : "Gabriel M. • 9º Ano"}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-neutral-500">Estudante Afilhado</div>
          <div className="text-sm font-semibold text-white mt-0.5">
            Lucas S. • 6º Ano
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 space-y-2">
        <div className="text-[11px] font-mono text-neutral-400">
          Selecione interesses para recalcular a afinidade:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.97] ${
                  isSelected
                    ? "bg-[#f97316] text-[#111111] font-bold"
                    : "bg-[#1C1C1C] border border-white/10 text-neutral-300 hover:border-[#f97316]/45"
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PizzaShopQueueDemo() {
  const [orders, setOrders] = useState([
    {
      id: "#ORD9821",
      customer: "Mariana Costa",
      status: "Preparando" as "Preparando" | "Em entrega" | "Entregue",
      total: "R$ 89,90",
    },
    {
      id: "#ORD9820",
      customer: "Rafael Mendes",
      status: "Em entrega" as "Preparando" | "Em entrega" | "Entregue",
      total: "R$ 124,50",
    },
    {
      id: "#ORD9819",
      customer: "Beatriz Silva",
      status: "Entregue" as "Preparando" | "Em entrega" | "Entregue",
      total: "R$ 68,00",
    },
  ]);

  const cycleOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const nextStatus =
          o.status === "Preparando"
            ? "Em entrega"
            : o.status === "Em entrega"
            ? "Entregue"
            : "Preparando";
        return { ...o, status: nextStatus };
      })
    );
  };

  return (
    <div className="rounded-xl bg-[#111111]/90 border border-white/10 p-5 space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
        <span className="inline-flex items-center gap-2 text-neutral-300">
          <SolarShoppingBag className="w-4 h-4 text-[#f97316]" />
          <span>Fila de Pedidos (Mutação Otimista)</span>
        </span>
        <span className="text-neutral-500">Clique no status</span>
      </div>

      <ul className="divide-y divide-white/5 text-xs font-mono">
        {orders.map((order) => (
          <li
            key={order.id}
            className="py-2.5 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-[#f97316] shrink-0">{order.id}</span>
              <span className="text-neutral-200 font-sans truncate">
                {order.customer}
              </span>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => cycleOrderStatus(order.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.97] ${
                  order.status === "Entregue"
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                    : order.status === "Em entrega"
                    ? "bg-[#f97316] text-[#111111]"
                    : "bg-[#1C1C1C] text-neutral-200 border border-white/10 hover:border-[#f97316]/50"
                }`}
              >
                {order.status} ↻
              </button>
              <span className="text-white font-semibold hidden sm:inline">
                {order.total}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectMetaFooter({ project }: { project: CaseStudyItem }) {
  return (
    <div className="space-y-4 pt-4 border-t border-white/10">
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-md bg-[#1C1C1C] border border-white/10 text-xs font-mono text-neutral-200"
          >
            {tech}
          </span>
        ))}
      </div>

      <div>
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#f97316] hover:text-[#fed7aa] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            <span>{project.provenance}</span>
            <SolarArrowUpRight className="w-4 h-4" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400">
            <SolarLock className="w-3.5 h-3.5 text-[#f97316]" />
            <span>{project.provenance}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export function RbProjects() {
  useEffect(() => {
    const handleSelectProject = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId?: ProjectId }>;
      const projectId = customEvent.detail?.projectId;
      if (!projectId) return;
      const target = document.getElementById(`project-${projectId}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    window.addEventListener("portfolio:select-project", handleSelectProject);
    return () =>
      window.removeEventListener(
        "portfolio:select-project",
        handleSelectProject
      );
  }, []);

  const [gide, concursos, meuPorto, pizzashop] = caseStudies;

  return (
    <section id="projects" className="relative py-24 sm:py-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: baseCurve }}
          className="space-y-3"
        >
          <DecryptedText
            text="02 // SISTEMAS SELECIONADOS"
            className="text-xs text-[#f97316] uppercase tracking-widest"
          />
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#fff7ed] text-balance">
            Projetos em produção.
          </h2>
        </motion.div>

        {/* Featured Full-Width Project 01: GIDE */}
        <motion.article
          id={`project-${gide.id}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: baseCurve }}
        >
          <SpotlightCard className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#f97316]">
                      {gide.index} • {gide.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#fff7ed] tracking-tight text-balance">
                      {gide.title}
                    </h3>
                    {gide.metric && (
                      <div className="inline-flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono text-[#f97316]">
                          {gide.metric.value}
                        </span>
                        <span className="text-xs font-mono text-neutral-400">
                          {gide.metric.label}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-neutral-300 text-pretty">
                    {gide.summary}
                  </p>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-white/10">
                  {gide.outcomes.map((outcome) => (
                    <li
                      key={outcome.title}
                      className="text-sm text-neutral-300 text-pretty"
                    >
                      <strong className="text-[#fff7ed] font-semibold">
                        {outcome.title}:{" "}
                      </strong>
                      <span>{outcome.detail}</span>
                    </li>
                  ))}
                </ul>

                <ProjectMetaFooter project={gide} />
              </div>

              <div className="lg:col-span-7">
                <GideOfflineDemo />
              </div>
            </div>
          </SpotlightCard>
        </motion.article>

        {/* Secondary Projects 2-Column Grid: Portal de Concursos & Meu Porto */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {[
            { project: concursos, demo: <ConcursosPdfDemo /> },
            { project: meuPorto, demo: <MeuPortoAffinityDemo /> },
          ].map(({ project, demo }, idx) => (
            <motion.article
              key={project.id}
              id={`project-${project.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: baseCurve,
              }}
            >
              <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between gap-6">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#f97316]">
                      {project.index} • {project.category}
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#fff7ed] tracking-tight text-balance">
                        {project.title}
                      </h3>
                      {project.metric && (
                        <div className="inline-flex items-baseline gap-1.5">
                          <span className="text-xl font-bold font-mono text-[#f97316]">
                            {project.metric.value}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">
                            {project.metric.label}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-neutral-300 text-pretty">
                      {project.summary}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-white/10">
                    {project.outcomes.map((outcome) => (
                      <li
                        key={outcome.title}
                        className="text-sm text-neutral-300 text-pretty"
                      >
                        <strong className="text-[#fff7ed] font-semibold">
                          {outcome.title}:{" "}
                        </strong>
                        <span>{outcome.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-5">
                  {demo}
                  <ProjectMetaFooter project={project} />
                </div>
              </SpotlightCard>
            </motion.article>
          ))}
        </div>

        {/* Project 04: Open Source Showcase (PizzaShop Web) */}
        <motion.article
          id={`project-${pizzashop.id}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: baseCurve }}
        >
          <SpotlightCard className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#f97316]">
                    {pizzashop.index} • {pizzashop.category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#fff7ed] tracking-tight text-balance">
                    {pizzashop.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 text-pretty">
                    {pizzashop.summary}
                  </p>
                </div>

                <ul className="space-y-2 pt-4 border-t border-white/10">
                  {pizzashop.outcomes.map((outcome) => (
                    <li
                      key={outcome.title}
                      className="text-sm text-neutral-300 text-pretty"
                    >
                      <strong className="text-[#fff7ed] font-semibold">
                        {outcome.title}:{" "}
                      </strong>
                      <span>{outcome.detail}</span>
                    </li>
                  ))}
                </ul>

                <ProjectMetaFooter project={pizzashop} />
              </div>

              <div className="lg:col-span-7">
                <PizzaShopQueueDemo />
              </div>
            </div>
          </SpotlightCard>
        </motion.article>
      </div>
    </section>
  );
}

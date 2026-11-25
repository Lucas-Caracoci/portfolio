"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SpotlightCard,
  TiltedCard,
  Magnet,
} from "@/components/react-bits/ui-effects";
import { DecryptedText } from "@/components/react-bits/text-effects";
import {
  SolarArrowUpRight,
  SolarLock,
  SolarQrCode,
  SolarWifiOff,
  SolarCheck,
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

interface CaseStudyItem {
  id: ProjectId;
  index: string;
  category: string;
  title: string;
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
    summary:
      "Plataforma de avaliação multidimensional para redes de ensino com controle de quórum em tempo real, votação anônima por QR Code e apuração automatizada de metas.",
    outcomes: [
      {
        title: "Coleta com sincronização local",
        detail:
          "Persistência no navegador via IndexedDB e Dexie.js para unidades escolares com conexão instável.",
      },
      {
        title: "Vouchers QR de uso único",
        detail:
          "Emissão em lote de códigos anônimos com trava automática de cota por segmento escolar.",
      },
      {
        title: "Motor de cálculo ponderado",
        detail:
          "Apuração dinâmica de notas com redistribuição automática de pesos para itens não aplicáveis.",
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
    category: "Transparência Pública e Motor de Documentos",
    title: "Portal de Concursos",
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
          "Pipeline em Python e SQL que saneou e estruturou mais de 300 editais legados no PostgreSQL.",
      },
      {
        title: "Proteção e auditoria completa",
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
        title: "Pipeline de mídia no navegador",
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
        title: "Acessibilidade completa por teclado",
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

function InteractiveSystemMockup({ id }: { id: ProjectId }) {
  // 01. GIDE Live Offline-First & QR Voucher Simulator State
  const [isOffline, setIsOffline] = useState(false);
  const [vouchersCount, setVouchersCount] = useState(1482);
  const [pendingQueue, setPendingQueue] = useState(0);
  const [quorumPct, setQuorumPct] = useState(94.2);
  const [docentePct, setDocentePct] = useState(92);
  const [tecnicoPct, setTecnicoPct] = useState(78);
  const [estudantePct, setEstudantePct] = useState(68);
  const [voucherHash, setVoucherHash] = useState("GD8492");
  const [syncLog, setSyncLog] = useState(
    "IndexedDB sincronizado com PostgreSQL (0 pendências)"
  );

  // 02. Concursos Live PDF Merger Simulator State
  const [pdfStage, setPdfStage] = useState<
    "idle" | "queued" | "merging" | "done"
  >("idle");
  const [pdfLog, setPdfLog] = useState(
    "Worker Horizon pronto • 3 anexos aguardando unificação"
  );

  // 03. Meu Porto Live Affinity Matcher State
  const allPortoTags = [
    "Robótica",
    "Matemática",
    "Programação",
    "Xadrez",
    "Física",
    "IA",
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Robótica",
    "Matemática",
    "Programação",
    "Xadrez",
  ]);
  const [protocolApproved, setProtocolApproved] = useState(false);

  // 04. PizzaShop Live Optimistic Order Queue State
  const [orders, setOrders] = useState([
    {
      id: "#ORD9821",
      customer: "Mariana Costa",
      status: "Preparando" as "Preparando" | "Em entrega" | "Entregue",
      total: "R$ 89,90",
      amount: 89.9,
    },
    {
      id: "#ORD9820",
      customer: "Rafael Mendes",
      status: "Em entrega" as "Preparando" | "Em entrega" | "Entregue",
      total: "R$ 124,50",
      amount: 124.5,
    },
    {
      id: "#ORD9819",
      customer: "Beatriz Silva",
      status: "Entregue" as "Preparando" | "Em entrega" | "Entregue",
      total: "R$ 68,00",
      amount: 68.0,
    },
  ]);
  const [revenue, setRevenue] = useState(48290);
  const [ordersToday, setOrdersToday] = useState(142);
  const [lastMutationMs, setLastMutationMs] = useState("0.8ms");

  if (id === "gide") {
    const handleToggleNetwork = () => {
      if (isOffline) {
        setIsOffline(false);
        if (pendingQueue > 0) {
          const flushed = pendingQueue;
          setPendingQueue(0);
          setSyncLog(
            `Sync concluído! ${flushed} voto(s) do IndexedDB gravados no PostgreSQL`
          );
        } else {
          setSyncLog("Conexão restabelecida • Sync PostgreSQL ativo");
        }
      } else {
        setIsOffline(true);
        setSyncLog(
          "Rede desconectada • Persistência local Dexie.js assumiu a operação"
        );
      }
    };

    const handleEmitVote = () => {
      const nextCode = `GD${Math.floor(1000 + Math.random() * 9000)}`;
      setVoucherHash(nextCode);
      setVouchersCount((prev) => prev + 1);
      setQuorumPct((prev) => Math.min(99.9, Number((prev + 0.2).toFixed(1))));
      setDocentePct((prev) => Math.min(100, prev + 1));
      setTecnicoPct((prev) => Math.min(100, prev + 2));
      setEstudantePct((prev) => Math.min(100, prev + 2));

      if (isOffline) {
        setPendingQueue((prev) => {
          const next = prev + 1;
          setSyncLog(
            `Voucher #${nextCode} salvo localmente no IndexedDB (${next} na fila)`
          );
          return next;
        });
      } else {
        setSyncLog(
          `Voucher #${nextCode} apurado e persistido em 42ms (ACID OK)`
        );
      }
    };

    return (
      <div className="p-5 sm:p-6 space-y-4 bg-[#141118]/90 text-[#fff7ed] select-none">
        {/* Interactive Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#fed7aa]/10">
          <button
            type="button"
            onClick={handleToggleNetwork}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border flex items-center gap-2 transition-colors duration-200 cursor-pointer active:scale-[0.98] ${
              isOffline
                ? "bg-amber-500/20 text-amber-300 border-amber-400/40"
                : "bg-[#221b29] text-[#fed7aa] border-[#fed7aa]/15 hover:border-[#f97316]/50"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOffline ? "bg-amber-400 animate-ping" : "bg-emerald-400"
              }`}
            />
            <span>
              {isOffline
                ? "Rede: OFFLINE (Reconectar)"
                : "Rede: ONLINE (Simular Queda)"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleEmitVote}
            className="px-3 py-1.5 rounded-lg bg-[#f97316] hover:bg-[#fb923c] text-[#120f17] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors duration-200 cursor-pointer active:scale-[0.97]"
          >
            <SolarQrCode className="w-3.5 h-3.5" />
            <span>+ Simular Voto QR</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-[#221b29]/80 border border-[#fed7aa]/10">
            <div className="text-xs font-mono text-neutral-400">
              Índice Consolidado
            </div>
            <div className="text-2xl font-bold font-mono text-[#f97316] mt-1">
              {quorumPct.toFixed(1)}%
            </div>
            <div className="text-xs text-neutral-300 mt-1 flex items-center gap-1">
              <SolarCheck className="w-3.5 h-3.5 text-[#f97316]" />
              <span>Quórum atingido</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#221b29]/80 border border-[#fed7aa]/10">
            <div className="text-xs font-mono text-neutral-400">
              Vouchers Validados
            </div>
            <div className="text-2xl font-bold font-mono text-[#fff7ed] mt-1">
              {vouchersCount.toLocaleString("pt-BR")}
            </div>
            <div className="text-xs text-neutral-400 mt-1">100% Anônimos</div>
          </div>

          <div className="p-3 rounded-lg bg-[#2c2234]/85 border border-[#fed7aa]/15 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-[#f97316]">
              <span>{isOffline ? "Dexie Queue" : "Sync Local"}</span>
              <SolarWifiOff className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono text-neutral-200">
              {pendingQueue > 0
                ? `${pendingQueue} pendente(s)`
                : "IndexedDB • Limpo"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-7 p-4 rounded-lg bg-[#221b29]/80 border border-[#fed7aa]/10 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Participação por Segmento (Tempo Real)
            </div>
            {[
              { label: "Equipe Docente", pct: docentePct },
              { label: "Equipe Técnica e Apoio", pct: tecnicoPct },
              { label: "Estudantes e Responsáveis", pct: estudantePct },
            ].map((seg) => (
              <div key={seg.label} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-300">{seg.label}</span>
                  <span className="text-[#fff7ed] font-semibold">
                    {seg.pct}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#2c2234] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#f97316] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ width: `${seg.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="sm:col-span-5 p-4 rounded-lg bg-[#221b29]/80 border border-[#fed7aa]/10 flex flex-col items-center justify-center text-center">
            <div className="p-2 rounded-lg bg-[#fed7aa] text-[#120f17] mb-2">
              <SolarQrCode className="w-9 h-9" />
            </div>
            <div className="text-xs font-mono font-semibold text-[#fff7ed]">
              VOUCHER #{voucherHash}
            </div>
            <div className="text-xs font-mono text-[#f97316] mt-0.5">
              {isOffline ? "Armazenado Offline" : "Uso Único • Verificado"}
            </div>
          </div>
        </div>

        {/* Live Telemetry Console Strip */}
        <div className="px-3 py-2 rounded-lg bg-[#0d0a10] border border-[#fed7aa]/10 text-xs font-mono text-[#fed7aa]/85 flex items-center justify-between gap-2">
          <span className="truncate">&gt; {syncLog}</span>
          <span className="text-[#f97316] shrink-0">DEXIE.JS</span>
        </div>
      </div>
    );
  }

  if (id === "concursos") {
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

    return (
      <div className="p-5 sm:p-6 space-y-4 bg-[#141118]/90 text-[#fff7ed] select-none">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#221b29]/80 border border-[#fed7aa]/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-[#2c2234] border border-[#fed7aa]/10 text-[#f97316]">
              <SolarFileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#f97316]">
                CERTAME #2026/01 • HOMOLOGADO
              </div>
              <div className="text-sm font-semibold text-[#fff7ed]">
                Processo Seletivo Público • Quadro Geral
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={triggerPdfMerge}
            disabled={pdfStage === "queued" || pdfStage === "merging"}
            className="px-3 py-1.5 rounded-lg bg-[#f97316] hover:bg-[#fb923c] disabled:opacity-60 text-[#120f17] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors duration-200 cursor-pointer active:scale-[0.97]"
          >
            <SolarLayers className="w-3.5 h-3.5" />
            <span>
              {pdfStage === "idle" && "Unificar PDFs (Testar)"}
              {pdfStage === "queued" && "Fila Horizon..."}
              {pdfStage === "merging" && "Compilando PDF..."}
              {pdfStage === "done" && "Reprocessar Dossiê"}
            </span>
          </button>
        </div>

        <div className="p-4 rounded-lg bg-[#221b29]/80 border border-[#fed7aa]/10 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-1">
            <span>PIPELINE DE UNIFICAÇÃO DE DOCUMENTOS</span>
            <span className="text-[#f97316] flex items-center gap-1">
              <SolarLayers className="w-3.5 h-3.5" /> Chromium Headless
            </span>
          </div>
          {[
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
              name: "003_Cronograma_Oficial_Consolidado.pdf",
              size: "420 KB",
              status: pdfStage === "done" ? "Mesclado ✓" : "Unificado",
            },
          ].map((doc) => (
            <div
              key={doc.name}
              className="flex items-center justify-between px-3 py-2 rounded-md bg-[#2c2234]/85 border border-[#fed7aa]/10 text-xs font-mono"
            >
              <span className="text-neutral-200 truncate">{doc.name}</span>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-neutral-400">{doc.size}</span>
                <span className="text-[#f97316]">{doc.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-3 py-2 rounded-lg bg-[#0d0a10] border border-[#fed7aa]/10 text-xs font-mono text-[#fed7aa]/85 flex items-center justify-between gap-2">
          <span className="truncate">&gt; {pdfLog}</span>
          <span className="text-[#f97316] shrink-0">HORIZON</span>
        </div>
      </div>
    );
  }

  if (id === "meu-porto") {
    const toggleTag = (tag: string) => {
      setProtocolApproved(false);
      setSelectedTags((prev) =>
        prev.includes(tag)
          ? prev.length > 1
            ? prev.filter((t) => t !== tag)
            : prev
          : [...prev, tag]
      );
    };

    const affinityScore = Math.min(99, 82 + selectedTags.length * 3.5);

    return (
      <div className="p-5 sm:p-6 space-y-4 bg-[#141118]/90 text-[#fff7ed] select-none">
        <div className="p-4 rounded-lg bg-[#221b29]/80 border border-[#fed7aa]/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#f97316] flex items-center gap-1.5">
              <SolarUsers className="w-4 h-4" /> Pareamento de Mentoria
              (Interativo)
            </span>
            <span className="px-2.5 py-0.5 rounded bg-[#2c2234] border border-[#f97316]/40 text-[#f97316] text-xs font-mono font-bold">
              {Math.round(affinityScore)}% Afinidade
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                role: "Mentor Veterano",
                student:
                  selectedTags.includes("IA") || selectedTags.includes("Física")
                    ? "Beatriz L. • 9º Ano"
                    : "Gabriel M. • 9º Ano",
              },
              { role: "Estudante Afilhado", student: "Lucas S. • 6º Ano" },
            ].map((pair) => (
              <div
                key={pair.role}
                className="p-3 rounded-md bg-[#2c2234]/85 border border-[#fed7aa]/10"
              >
                <div className="text-xs font-mono text-neutral-400">
                  {pair.role}
                </div>
                <div className="text-sm font-semibold text-[#fff7ed] mt-0.5">
                  {pair.student}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-neutral-400">
              CLIQUE NAS TAGS PARA RECALCULAR O ALGORITMO DE AFINIDADE:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allPortoTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-[#f97316] text-[#120f17] font-bold"
                        : "bg-[#2c2234] border border-[#fed7aa]/10 text-neutral-300 hover:border-[#f97316]/40"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#221b29]/80 border border-[#fed7aa]/10 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono text-neutral-400">
              {protocolApproved
                ? "PROTOCOLO #4093 • PAR VALIDADO"
                : "PROTOCOLO #4092 • COORDENAÇÃO"}
            </div>
            <div className="text-xs text-neutral-200 mt-0.5">
              {protocolApproved
                ? `Dupla homologada com ${Math.round(affinityScore)}% de compatibilidade`
                : "Solicitação pedagógica respondida em 14 minutos"}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setProtocolApproved((prev) => !prev)}
            className="px-3 py-1.5 rounded-lg bg-[#2c2234] hover:bg-[#f97316] hover:text-[#120f17] border border-[#f97316]/40 text-xs font-mono font-semibold text-[#f97316] transition-colors duration-200 cursor-pointer shrink-0"
          >
            {protocolApproved ? "Homologado ✓" : "Homologar Dupla"}
          </button>
        </div>
      </div>
    );
  }

  const cycleOrderStatus = (orderId: string) => {
    const latencies = ["0.4ms", "0.6ms", "0.5ms", "0.7ms"];
    setLastMutationMs(latencies[ordersToday % latencies.length]);
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const nextStatus =
          o.status === "Preparando"
            ? "Em entrega"
            : o.status === "Em entrega"
            ? "Entregue"
            : "Preparando";
        if (nextStatus === "Entregue") {
          setRevenue((r) => Math.round(r + o.amount));
          setOrdersToday((c) => c + 1);
        }
        return { ...o, status: nextStatus };
      })
    );
  };

  return (
    <div className="p-5 sm:p-6 space-y-4 bg-[#141118]/90 text-[#fff7ed] select-none">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-[#221b29]/80 border border-[#fed7aa]/10">
          <div className="text-xs font-mono text-neutral-400">
            Receita Mensal (Tempo Real)
          </div>
          <div className="text-2xl font-bold font-mono text-[#fff7ed] mt-1">
            R$ {revenue.toLocaleString("pt-BR")}
          </div>
          <div className="text-xs text-[#f97316] mt-1">
            Mutação Otimista • Latência {lastMutationMs}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#221b29]/80 border border-[#fed7aa]/10">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Pedidos Hoje</span>
            <SolarShoppingBag className="w-4 h-4 text-[#f97316]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#fff7ed] mt-1">
            {ordersToday}
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            Clique em um pedido abaixo para avançar
          </div>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-[#221b29]/80 border border-[#fed7aa]/10 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-wider">
          <span>Fila Operacional Otimista (Clique no status)</span>
          <span className="text-[#f97316]">ZOD + TANSTACK</span>
        </div>
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between px-3 py-2 rounded-md bg-[#2c2234]/85 border border-[#fed7aa]/10 text-xs font-mono"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#f97316]">{order.id}</span>
              <span className="text-neutral-200 font-sans">
                {order.customer}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => cycleOrderStatus(order.id)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-colors duration-150 cursor-pointer ${
                  order.status === "Entregue"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                    : order.status === "Em entrega"
                    ? "bg-[#f97316] text-[#120f17]"
                    : "bg-[#1a1520] text-[#fed7aa] border border-[#fed7aa]/25 hover:border-[#f97316]"
                }`}
              >
                {order.status} ↻
              </button>
              <span className="text-[#fff7ed] font-semibold">
                {order.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface RbProjectsProps {
  magnetEnabled?: boolean;
}

export function RbProjects({ magnetEnabled = true }: RbProjectsProps) {
  const [active, setActive] = useState<CaseStudyItem>(caseStudies[0]);

  useEffect(() => {
    const handleSelectProject = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId: ProjectId }>;
      const found = caseStudies.find(
        (p) => p.id === customEvent.detail?.projectId
      );
      if (found) setActive(found);
    };
    window.addEventListener("portfolio:select-project", handleSelectProject);
    return () =>
      window.removeEventListener(
        "portfolio:select-project",
        handleSelectProject
      );
  }, []);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header + Project Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: baseCurve }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="space-y-3">
            <DecryptedText
              text="02 // SISTEMAS SELECIONADOS"
              className="text-xs text-[#f97316] uppercase tracking-widest"
            />
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#fff7ed] text-balance">
              Projetos em produção.
            </h2>
          </div>

          {/* React Bits Magnetic Tab Switcher (Outer rounded-2xl p-2 -> Inner rounded-lg per B3) */}
          <div
            role="tablist"
            aria-label="Selecionar estudo de caso"
            className="flex flex-wrap gap-2 p-2 rounded-2xl bg-[#141118]/75 backdrop-blur-xl border border-[#fed7aa]/10 w-fit"
          >
            {caseStudies.map((item) => {
              const isSelected = active.id === item.id;
              return (
                <Magnet
                  key={item.id}
                  disabled={!magnetEnabled}
                  strength={0.18}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActive(item)}
                    className={`relative px-3 py-2 rounded-lg text-xs font-mono font-semibold transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer active:scale-[0.98] ${
                      isSelected
                        ? "text-[#120f17]"
                        : "text-neutral-300 hover:text-[#fff7ed]"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="rbActiveProjectTab"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                          mass: 0.7,
                        }}
                        className="absolute inset-0 rounded-lg bg-[#f97316]"
                      />
                    )}
                    <span className="relative z-10">
                      {item.index}. {item.title}
                    </span>
                  </button>
                </Magnet>
              );
            })}
          </div>
        </motion.div>

        {/* Main Case Study Spotlight Card */}
        <SpotlightCard className="p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: baseCurve }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left 5 Cols: Outcome-driven description */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#f97316]">
                    {active.category}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-[#fff7ed] tracking-tight">
                    {active.title}
                  </h3>
                  <p className="text-base text-neutral-300 text-pretty">
                    {active.summary}
                  </p>
                </div>

                {/* Benefit bullets per Rule A5 (Bold benefit, then proof/detail, no hyphens) */}
                <div className="space-y-3 pt-4 border-t border-[#fed7aa]/10">
                  {active.outcomes.map((outcome) => (
                    <div
                      key={outcome.title}
                      className="text-sm text-neutral-300 text-pretty"
                    >
                      <strong className="text-[#fff7ed] font-semibold">
                        {outcome.title}:{" "}
                      </strong>
                      <span>{outcome.detail}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack & Provenance Link */}
                <div className="space-y-4 pt-4 border-t border-[#fed7aa]/10">
                  <div className="flex flex-wrap gap-2">
                    {active.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#2c2234] border border-[#fed7aa]/10 text-xs font-mono text-neutral-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div>
                    {active.repoUrl ? (
                      <a
                        href={active.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#f97316] hover:text-[#fed7aa] transition-colors duration-200"
                      >
                        <span>{active.provenance}</span>
                        <SolarArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                        <SolarLock className="w-3.5 h-3.5 text-[#f97316]" />
                        <span>{active.provenance}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right 7 Cols: Interactive TiltedCard Interface Preview */}
              <div className="lg:col-span-7">
                <TiltedCard rotateAmplitude={5} scaleOnHover={1.008}>
                  <div className="bg-[#1a1520]">
                    {/* Minimal Window Chrome */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#221b29] border-b border-[#fed7aa]/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#382b42]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#382b42]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#382b42]" />
                      </div>
                      <div className="px-3 py-0.5 rounded bg-[#2c2234] border border-[#fed7aa]/10 text-xs font-mono text-neutral-300">
                        {active.id}.producao.app
                      </div>
                      <div className="text-xs font-mono text-[#f97316]">
                        Interface Real
                      </div>
                    </div>

                    <InteractiveSystemMockup id={active.id} />
                  </div>
                </TiltedCard>
              </div>
            </motion.div>
          </AnimatePresence>
        </SpotlightCard>

        {/* How It Works — 3 Steps per Rule A2 (#8 How it works, three steps) */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "PASSO 01",
              title: "Diagnóstico na operação real",
              description:
                "Mapeio gargalos de rede, fluxos de atendimento e dados legados diretamente onde o sistema será usado.",
            },
            {
              step: "PASSO 02",
              title: "Arquitetura desacoplada e local",
              description:
                "Estruturo regras de negócio em Services e DTOs no Laravel com persistência IndexedDB e contratos tipados no React.",
            },
            {
              step: "PASSO 03",
              title: "Entrega em containers auditáveis",
              description:
                "Implanto com Docker, filas supervisionadas no Redis Horizon, trilhas de auditoria e conformidade com a LGPD.",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: baseCurve,
              }}
            >
              <SpotlightCard className="p-6 h-full flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#f97316] font-semibold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#fff7ed] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-300 text-pretty">
                    {item.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

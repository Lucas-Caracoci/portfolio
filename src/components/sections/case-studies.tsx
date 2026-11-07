"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  ArrowUpRight,
  QrCode,
  WifiOff,
  CheckCircle2,
  FileText,
  Layers,
  Users,
  MessageSquare,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";

const easeOutCustom = [0.22, 1, 0.36, 1] as const;

interface ProjectHighlight {
  label: string;
  detail: string;
}

interface CaseStudy {
  id: "gide" | "concursos" | "meu-porto" | "pizzashop";
  category: string;
  title: string;
  summary: string;
  highlights: ProjectHighlight[];
  techStack: string[];
  repoUrl?: string;
  provenanceLabel: string;
}

const projects: CaseStudy[] = [
  {
    id: "gide",
    category: "Avaliação Institucional & Indicadores",
    title: "GIDE",
    summary:
      "Plataforma de avaliação multidimensional para redes de ensino com controle de quórum em tempo real, votação anônima por QR Code e apuração automatizada de metas.",
    highlights: [
      {
        label: "Coleta Offline-First",
        detail: "Persistência local via IndexedDB (Dexie.js) para unidades sem conexão estável.",
      },
      {
        label: "Vouchers QR/OTP",
        detail: "Emissão em lote de códigos de uso único com trava automática de cota por segmento.",
      },
      {
        label: "Motor Ponderado",
        detail: "Cálculo dinâmico de notas com recálculo automático para itens não aplicáveis.",
      },
    ],
    techStack: ["Laravel", "React & TypeScript", "Inertia.js", "Dexie.js", "Recharts"],
    provenanceLabel: "Sistema em Produção • Repositório Privado",
  },
  {
    id: "concursos",
    category: "Transparência Pública & Document Engine",
    title: "Portal de Concursos",
    summary:
      "Sistema de gestão e publicação de certames, editais e cronogramas com motor dedicado de unificação de PDFs e migração de acervo histórico.",
    highlights: [
      {
        label: "Fusão de PDFs Headless",
        detail: "Geração de dossiês e unificação de anexos via microserviço Chromium isolado.",
      },
      {
        label: "Proteção & Auditoria",
        detail: "Ofuscação de identificadores públicos em rotas de download e trilha de auditoria.",
      },
      {
        label: "Ingestão de Acervo",
        detail: "Pipeline automatizado que estruturou mais de 300 editais históricos no PostgreSQL.",
      },
    ],
    techStack: ["Laravel", "React & TypeScript", "PostgreSQL", "PDF Headless", "Laravel Horizon"],
    provenanceLabel: "Sistema em Produção • Repositório Privado",
  },
  {
    id: "meu-porto",
    category: "Ecossistema Escolar & Mentoria",
    title: "Meu Porto",
    summary:
      "Plataforma de comunidade estudantil integrando programa de mentoria por afinidade, fórum acadêmico moderado, suporte por protocolo e mural para TV.",
    highlights: [
      {
        label: "Pareamento por Afinidade",
        detail: "Formação de duplas de mentoria cruzando catálogo de interesses dos estudantes.",
      },
      {
        label: "Suporte Protocolado",
        detail: "Atendimento assíncrono segmentado entre coordenação pedagógica e suporte técnico.",
      },
      {
        label: "Pipeline de Mídia Mobile",
        detail: "Conversão automática de fotos HEIC no navegador e compressão inteligente.",
      },
    ],
    techStack: ["Laravel", "Inertia.js", "TanStack Query", "React Hook Form", "Zod"],
    provenanceLabel: "Sistema em Produção • Repositório Privado",
  },
  {
    id: "pizzashop",
    category: "Frontend Architecture & Analytics",
    title: "PizzaShop Web",
    summary:
      "Dashboard analítico e operacional para gestão de pedidos e métricas de restaurantes, construído com validação tipada e primitivos acessíveis.",
    highlights: [
      {
        label: "Filtros & Mutação Rápida",
        detail: "Atualização de status de pedidos com feedback imediato e zero latência visual.",
      },
      {
        label: "Contratos com Zod",
        detail: "Formulários validados de ponta a ponta com React Hook Form e TypeScript estrito.",
      },
      {
        label: "UI Acessível por Teclado",
        detail: "Modais, tabelas e menus construídos sobre Radix UI e Tailwind CSS v4.",
      },
    ],
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Radix UI"],
    repoUrl: "https://github.com/Lucas-Caracoci/pizzashop",
    provenanceLabel: "Ver Repositório no GitHub",
  },
];

function ProjectVisualPreview({ projectId }: { projectId: CaseStudy["id"] }) {
  if (projectId === "gide") {
    return (
      <div className="p-5 sm:p-6 space-y-4 bg-[#050811] text-slate-100 select-none">
        {/* Top Metrics Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              title: "Índice Consolidado",
              value: "94.2%",
              valueColor: "text-cyan-400",
              sub: "Quórum atingido",
              subColor: "text-emerald-400",
              hasCheck: true,
              cardClass: "bg-white/[0.03] border-white/10",
            },
            {
              title: "Vouchers Validados",
              value: "1.482",
              valueColor: "text-white",
              sub: "100% Anônimos",
              subColor: "text-slate-400",
              hasCheck: false,
              cardClass: "bg-white/[0.03] border-white/10",
            },
          ].map((kpi, idx) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: idx * 0.04, ease: easeOutCustom }}
              className={`p-3.5 rounded-xl border ${kpi.cardClass}`}
            >
              <div className="text-xs font-mono text-slate-400 mb-1">{kpi.title}</div>
              <div className={`text-2xl font-bold font-mono ${kpi.valueColor}`}>{kpi.value}</div>
              <div className={`text-xs ${kpi.subColor} mt-1 flex items-center gap-1`}>
                {kpi.hasCheck && <CheckCircle2 className="w-3 h-3" />} {kpi.sub}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: 0.08, ease: easeOutCustom }}
            className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
              <span>Sync Offline</span>
              <WifiOff className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xs font-mono text-slate-200">IndexedDB • Fila limpa</div>
          </motion.div>
        </div>

        {/* Quorum Progress Bars + Voucher QR Card */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-7 p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Participação por Segmento
            </div>
            {[
              { label: "Equipe Docente", pct: 92, color: "bg-cyan-400" },
              { label: "Equipe Técnica & Apoio", pct: 78, color: "bg-sky-400" },
              { label: "Estudantes & Responsáveis", pct: 68, color: "bg-indigo-400" },
            ].map((seg, idx) => (
              <div key={seg.label} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">{seg.label}</span>
                  <span className="text-white font-semibold">{seg.pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 28,
                      delay: 0.06 + idx * 0.05,
                    }}
                    className={`h-full rounded-full origin-left ${seg.color}`}
                    style={{ width: `${seg.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.24, delay: 0.1, ease: easeOutCustom }}
            className="sm:col-span-5 p-4 rounded-xl bg-linear-to-b from-slate-900 to-[#020203] border border-white/15 flex flex-col items-center justify-center text-center"
          >
            <div className="p-2.5 rounded-xl bg-white text-slate-950 mb-2.5 shadow-md">
              <QrCode className="w-10 h-10" />
            </div>
            <div className="text-xs font-mono font-semibold text-white">VOUCHER #GD-8492</div>
            <div className="text-xs font-mono text-cyan-400 mt-0.5">Uso Único • Verificado</div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (projectId === "concursos") {
    return (
      <div className="p-5 sm:p-6 space-y-4 bg-[#050811] text-slate-100 select-none">
        {/* Header Bar inside App */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: easeOutCustom }}
          className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400">CERTAME #2026-01 • HOMOLOGADO</div>
              <div className="text-sm font-semibold text-white">
                Processo Seletivo Público — Quadro Geral
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-300">
            Publicado
          </span>
        </motion.div>

        {/* Document Merge Pipeline */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>DOCUMENTOS VINCULADOS (DRAG & DROP)</span>
            <span className="text-cyan-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> PDF Engine Ativo
            </span>
          </div>
          {[
            { name: "001_Edital_Abertura_Normativo.pdf", size: "1.8 MB", status: "Assinado" },
            { name: "002_Anexo_I_Quadro_De_Vagas.pdf", size: "640 KB", status: "Anexado" },
            { name: "003_Cronograma_Oficial_Consolidado.pdf", size: "420 KB", status: "Unificado" },
          ].map((doc, idx) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.22,
                delay: 0.05 + idx * 0.045,
                ease: easeOutCustom,
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#020203]/80 border border-white/10 text-xs font-mono"
            >
              <span className="text-slate-200 truncate">{doc.name}</span>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-slate-500">{doc.size}</span>
                <span className="text-cyan-400">{doc.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (projectId === "meu-porto") {
    return (
      <div className="p-5 sm:p-6 space-y-4 bg-[#050811] text-slate-100 select-none">
        {/* Mentorship Pairing Card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: easeOutCustom }}
          className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Pareamento de Mentoria Estudantil
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 text-xs font-mono">
              96% Afinidade
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {[
              { role: "Mentor Veterano", student: "Gabriel M. • 9º Ano" },
              { role: "Estudante Afilhado", student: "Lucas S. • 6º Ano" },
            ].map((pair, idx) => (
              <motion.div
                key={pair.role}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.04 + idx * 0.04, ease: easeOutCustom }}
                className="p-3 rounded-lg bg-[#020203] border border-white/10"
              >
                <div className="text-xs font-mono text-slate-400">{pair.role}</div>
                <div className="text-sm font-semibold text-white mt-0.5">{pair.student}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {["Robótica", "Matemática", "Programação", "Xadrez"].map((tag, idx) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.18, delay: 0.08 + idx * 0.03, ease: easeOutCustom }}
                className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300"
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Support Protocol Row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.12, ease: easeOutCustom }}
          className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">PROTOCOLO #4092 • COORDENAÇÃO</div>
              <div className="text-xs text-slate-200">
                Solicitação de apoio pedagógico respondida em 14 min
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400">Concluído</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-6 space-y-4 bg-[#050811] text-slate-100 select-none">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: easeOutCustom }}
          className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10"
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>Receita Mensal</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">R$ 48.290</div>
          <div className="text-xs text-emerald-400 mt-1">+14.2% em relação ao mês anterior</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: 0.04, ease: easeOutCustom }}
          className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10"
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>Pedidos Hoje</span>
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">142</div>
          <div className="text-xs text-slate-400 mt-1">Tempo médio: 24 min</div>
        </motion.div>
      </div>

      {/* Live Orders Table Preview */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          Fila Operacional em Tempo Real
        </div>
        {[
          { id: "#ORD-9821", customer: "Mariana Costa", status: "Em entrega", total: "R$ 89,90" },
          { id: "#ORD-9820", customer: "Rafael Mendes", status: "Preparando", total: "R$ 124,50" },
          { id: "#ORD-9819", customer: "Beatriz Silva", status: "Entregue", total: "R$ 68,00" },
        ].map((order, idx) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.22,
              delay: 0.06 + idx * 0.045,
              ease: easeOutCustom,
            }}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#020203]/80 border border-white/10 text-xs font-mono"
          >
            <div className="flex items-center gap-3">
              <span className="text-cyan-400">{order.id}</span>
              <span className="text-slate-200 font-sans">{order.customer}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">{order.status}</span>
              <span className="text-white font-semibold">{order.total}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function CaseStudiesSection() {
  const [activeProject, setActiveProject] = useState<CaseStudy>(projects[0]);

  useEffect(() => {
    const handleSelectProject = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectId: CaseStudy["id"] }>;
      const found = projects.find((p) => p.id === customEvent.detail?.projectId);
      if (found) {
        setActiveProject(found);
      }
    };
    window.addEventListener("portfolio:select-project", handleSelectProject);
    return () => window.removeEventListener("portfolio:select-project", handleSelectProject);
  }, []);

  return (
    <section id="case-studies" className="relative z-20 py-24 px-4 max-w-6xl mx-auto">
      {/* Editorial Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: easeOutCustom }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
            01 / SISTEMAS SELECIONADOS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 text-balance">
            Projetos em produção.
          </h2>
        </div>

        {/* Clean Horizontal Selector Tabs with Spring Physics (layoutId) */}
        <div className="flex flex-wrap gap-2">
          {projects.map((proj, index) => {
            const isActive = activeProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-mono transition-colors duration-150 cursor-pointer active:scale-[0.97] ${
                  isActive
                    ? "text-slate-950 font-semibold"
                    : "bg-[#020203]/80 text-slate-300 border border-white/12 hover:border-white/25 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeProjectPill"
                    transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.8 }}
                    className="absolute inset-0 rounded-xl bg-cyan-400 shadow-[0_0_20px_-4px_rgba(0,245,255,0.45)]"
                  />
                )}
                <span className="relative z-10">
                  0{index + 1}. {proj.title}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Split Showcase Card: 5 cols concise copy / 7 cols Visual Interface */}
      <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-white/12 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.24, ease: easeOutCustom },
            }}
            exit={{
              opacity: 0,
              y: -4,
              transition: { duration: 0.13, ease: easeOutCustom },
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
          >
            {/* Left Column (5 cols): Fast 5-second read */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                  {activeProject.category}
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                  {activeProject.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-pretty font-sans mb-6">
                  {activeProject.summary}
                </p>

                {/* 3 Concise Highlights (Bold keyword + 1 line) */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  {activeProject.highlights.map((item) => (
                    <div key={item.label} className="text-xs sm:text-sm leading-relaxed">
                      <span className="font-semibold text-white">{item.label}</span>
                      <span className="text-slate-400"> — {item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Essential Tech Tags + Provenance */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-[#020203]/90 border border-white/10 text-xs font-mono text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div>
                  {activeProject.repoUrl ? (
                    <a
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>{activeProject.provenanceLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>{activeProject.provenanceLabel}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Product Interface Visual Frame */}
            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-white/15 bg-[#050811] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.008]">
                {/* Minimal Browser/App Chrome Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#020203] border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                  <div className="px-3 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-400">
                    {activeProject.title.toLowerCase().replace(/\s+/g, "-")}.app
                  </div>
                  <div className="text-xs font-mono text-cyan-400">UI Preview</div>
                </div>

                {/* Crisp Product Interface Mockup */}
                <ProjectVisualPreview projectId={activeProject.id} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

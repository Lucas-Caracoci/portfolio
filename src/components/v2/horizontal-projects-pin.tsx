"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Lock,
  WifiOff,
  QrCode,
  FileText,
  Users,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PersonalProject {
  id: "gide" | "concursos" | "meu-porto" | "pizzashop";
  index: string;
  tag: string;
  title: string;
  painPoint: string;
  howISolvedIt: string;
  metrics: { label: string; value: string }[];
  tech: string[];
  repoUrl?: string;
}

const projects: PersonalProject[] = [
  {
    id: "gide",
    index: "01",
    tag: "AVALIAÇÃO EM REDE & OFFLINE-FIRST",
    title: "GIDE",
    painPoint:
      "Unidades precisavam coletar milhares de avaliações anônimas da comunidade, mas nem todo local tinha Wi-Fi estável na hora da votação.",
    howISolvedIt:
      "Criei um fluxo com vouchers de uso único em QR Code e salvamento local no navegador via IndexedDB (Dexie.js). Mesmo se a internet cair, ninguém perde o voto e o motor calcula as notas ponderadas sozinho.",
    metrics: [
      { label: "Quórum Consolidado", value: "94.2%" },
      { label: "Persistência Local", value: "IndexedDB" },
    ],
    tech: ["Laravel", "React & TypeScript", "Inertia.js", "Dexie.js", "Recharts"],
  },
  {
    id: "concursos",
    index: "02",
    tag: "MOTOR DE DOCUMENTOS & TRANSPARÊNCIA",
    title: "Portal de Concursos",
    painPoint:
      "Publicar editais, retificações e anexos exigia juntar PDFs manualmente, além de existir um acervo antigo de centenas de documentos espalhados.",
    howISolvedIt:
      "Subi um microserviço isolado com Chromium Headless para fundir PDFs automaticamente com drag-and-drop, ofusquei IDs sensíveis nas rotas públicas e escrevi um pipeline que migrou mais de 300 editais históricos para o PostgreSQL.",
    metrics: [
      { label: "Acervo Migrado", value: "300+ Editais" },
      { label: "Fusão de Anexos", value: "PDF Headless" },
    ],
    tech: ["Laravel", "React & TypeScript", "PostgreSQL", "PDF Headless", "Horizon"],
  },
  {
    id: "meu-porto",
    index: "03",
    tag: "COMUNIDADE ESCOLAR & MENTORIA",
    title: "Meu Porto",
    painPoint:
      "Faltava um espaço único onde estudantes veteranos pudessem apadrinhar os mais novos por afinidade e a coordenação acompanhasse demandas com protocolo.",
    howISolvedIt:
      "Desenvolvi um algoritmo de pareamento que cruza os interesses dos alunos para formar duplas de mentoria, chat protocolado por setor e até conversão automática de fotos HEIC do iPhone direto no navegador.",
    metrics: [
      { label: "Match de Interesses", value: "96% Afinidade" },
      { label: "Mídia Mobile", value: "HEIC → Web" },
    ],
    tech: ["Laravel", "Inertia.js", "TanStack Query", "React Hook Form", "Zod"],
  },
  {
    id: "pizzashop",
    index: "04",
    tag: "FRONTEND ARCHITECTURE & TEMPO REAL",
    title: "PizzaShop Web",
    painPoint:
      "Dashboards operacionais costumam travar o operador com telas lentas quando há dezenas de pedidos mudando de status ao mesmo tempo.",
    howISolvedIt:
      "Construí uma SPA focada em velocidade de operação com React 19, mutação otimista instantânea, contratos validados de ponta a ponta com Zod e navegação 100% acessível por teclado.",
    metrics: [
      { label: "Latência de UI", value: "Otimista 0ms" },
      { label: "Validação", value: "Zod Strict" },
    ],
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Radix UI"],
    repoUrl: "https://github.com/Lucas-Caracoci/pizzashop",
  },
];

function SwissProjectPreview({ id }: { id: PersonalProject["id"] }) {
  if (id === "gide") {
    return (
      <div className="p-5 rounded-xl bg-[#F4F1EA] border border-[#111111]/12 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="px-2 py-0.5 rounded bg-[#141413] text-[#F4F1EA] font-semibold">
            GIDE.APP • QUÓRUM AO VIVO
          </span>
          <span className="flex items-center gap-1 text-[#FF3B00] font-semibold">
            <WifiOff className="w-3.5 h-3.5" /> OFFLINE SYNC OK
          </span>
        </div>

        <div className="grid grid-cols-12 gap-3 items-center">
          <div className="col-span-7 space-y-2.5 bg-white p-3.5 rounded-lg border border-[#111111]/10">
            {[
              { label: "Docentes", pct: 92 },
              { label: "Equipe Técnica", pct: 78 },
              { label: "Estudantes", pct: 68 },
            ].map((row) => (
              <div key={row.label} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#575551]">{row.label}</span>
                  <span className="font-bold text-[#111111]">{row.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#EAE5DC] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#FF3B00]"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-5 bg-[#141413] text-[#F4F1EA] p-3.5 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="p-2 rounded-lg bg-white text-[#111111] mb-2">
              <QrCode className="w-8 h-8" />
            </div>
            <div className="text-[11px] font-mono font-bold">VOUCHER #8492</div>
            <div className="text-[10px] font-mono text-[#FF3B00]">USO ÚNICO</div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "concursos") {
    return (
      <div className="p-5 rounded-xl bg-[#F4F1EA] border border-[#111111]/12 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="px-2 py-0.5 rounded bg-[#141413] text-[#F4F1EA] font-semibold">
            PDF MERGE ENGINE
          </span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 300+ EDITAIS
          </span>
        </div>

        <div className="space-y-2">
          {[
            { file: "01_Edital_Abertura_Consolidado.pdf", badge: "ASSINADO" },
            { file: "02_Anexo_Quadro_Vagas.pdf", badge: "ANEXADO" },
            { file: "03_Cronograma_Oficial.pdf", badge: "UNIFICADO" },
          ].map((doc) => (
            <div
              key={doc.file}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-[#111111]/10 text-xs font-mono"
            >
              <span className="flex items-center gap-2 text-[#111111] truncate">
                <FileText className="w-3.5 h-3.5 text-[#FF3B00] shrink-0" />
                <span className="truncate">{doc.file}</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-[#FF3B00]/12 text-[#FF3B00] font-semibold text-[10px] shrink-0">
                {doc.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "meu-porto") {
    return (
      <div className="p-5 rounded-xl bg-[#F4F1EA] border border-[#111111]/12 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="px-2 py-0.5 rounded bg-[#141413] text-[#F4F1EA] font-semibold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#FF3B00]" /> DUPLA DE MENTORIA
          </span>
          <span className="px-2 py-0.5 rounded bg-[#FF3B00] text-white font-semibold">
            96% MATCH
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-lg bg-white border border-[#111111]/10">
            <div className="text-[11px] font-mono text-[#575551]">MENTOR VETERANO</div>
            <div className="text-sm font-bold text-[#111111]">Gabriel M. • 9º Ano</div>
          </div>
          <div className="p-3 rounded-lg bg-white border border-[#111111]/10">
            <div className="text-[11px] font-mono text-[#575551]">AFILHADO</div>
            <div className="text-sm font-bold text-[#111111]">Lucas S. • 6º Ano</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {["#Robótica", "#Programação", "#Matemática", "#Xadrez"].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-md bg-white border border-[#111111]/10 text-xs font-mono text-[#111111]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl bg-[#F4F1EA] border border-[#111111]/12 space-y-3">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="px-2 py-0.5 rounded bg-[#141413] text-[#F4F1EA] font-semibold flex items-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5 text-[#FF3B00]" /> FILA DE PEDIDOS
        </span>
        <span className="text-[#FF3B00] font-bold">R$ 48.290 / MÊS</span>
      </div>

      <div className="space-y-2">
        {[
          { id: "#9821", customer: "Mariana Costa", state: "Em entrega", val: "R$ 89,90" },
          { id: "#9820", customer: "Rafael Mendes", state: "Preparando", val: "R$ 124,50" },
        ].map((ord) => (
          <div
            key={ord.id}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-[#111111]/10 text-xs font-mono"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FF3B00]">{ord.id}</span>
              <span className="text-[#111111] font-sans font-medium">{ord.customer}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#575551]">{ord.state}</span>
              <span className="font-bold text-[#111111]">{ord.val}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MagneticProjectCard({ project }: { project: PersonalProject }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 26, mass: 0.7 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 26, mass: 0.7 });

  return (
    <motion.article
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1100,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(-yPct * 5);
        rotateY.set(xPct * 6);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      className="w-full lg:w-[560px] xl:w-[620px] shrink-0 bg-white rounded-2xl border border-[#111111]/15 p-6 sm:p-8 shadow-[0_24px_48px_-20px_rgba(17,17,17,0.12)] flex flex-col justify-between gap-6 select-none"
    >
      <div className="space-y-5">
        {/* Card Top Metadata Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#111111]/10">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#FF3B00] text-white font-mono text-xs font-bold flex items-center justify-center">
              {project.index}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#575551]">
              {project.tag}
            </span>
          </div>

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141413] text-[#F4F1EA] hover:bg-[#FF3B00] text-xs font-mono transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EAE5DC] text-[#575551] text-xs font-mono">
              <Lock className="w-3 h-3" />
              <span>Produção • Privado</span>
            </span>
          )}
        </div>

        {/* Title + Conversational Problem/Solution */}
        <div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mb-4">
            {project.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm leading-relaxed">
            <div className="p-3.5 rounded-xl bg-[#F4F1EA] border border-[#111111]/8">
              <div className="text-xs font-mono uppercase font-bold text-[#FF3B00] mb-1">
                Qual era a dor:
              </div>
              <p className="text-[#575551] text-pretty">{project.painPoint}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F4F1EA] border border-[#111111]/8">
              <div className="text-xs font-mono uppercase font-bold text-[#111111] mb-1">
                O que eu fiz:
              </div>
              <p className="text-[#111111] text-pretty">{project.howISolvedIt}</p>
            </div>
          </div>
        </div>

        {/* Swiss Hardware-style UI Preview */}
        <SwissProjectPreview id={project.id} />
      </div>

      {/* Footer Tech Stack Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#111111]/10">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-[#EAE5DC] text-[#111111] text-xs font-mono font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <span className="text-[#575551]">{m.label}: </span>
              <strong className="text-[#111111]">{m.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function HorizontalProjectsPin() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const kineticBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const kineticBg = kineticBgRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 96);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth + 240, 900)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      if (kineticBg) {
        gsap.to(kineticBg, {
          xPercent: -28,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: () => `+=${Math.max(track.scrollWidth, 1400)}`,
            scrub: 1,
          },
        });
      }

      return () => {
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="exp-projects"
      className="relative w-full min-h-screen py-20 lg:py-16 bg-[#141413] text-[#F4F1EA] overflow-hidden flex flex-col justify-between border-b border-[#111111]/15"
    >
      {/* Giant Kinetic Background Typography moving on scroll */}
      <div
        ref={kineticBgRef}
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-[110px] sm:text-[180px] font-bold tracking-tight text-white/[0.04] leading-none absolute top-1/2 -translate-y-1/2 left-0 z-0"
      >
        OFFLINE FIRST • PDF ENGINE • COMUNIDADE • TEMPO REAL • ARQUITETURA LIMPA
      </div>

      {/* Top Header inside Pinned Section */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 mb-8 lg:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF3B00] text-white text-xs font-mono uppercase tracking-widest mb-3">
            <span>EXP 03 / HORIZONTAL PIN + TIPOGRAFIA CINÉTICA + CARDS MAGNÉTICOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F1EA]">
            Sistemas que eu coloquei de pé.
          </h2>
        </div>

        <div className="text-xs font-mono text-stone-400 uppercase tracking-wider">
          <span className="hidden lg:inline">↓ Role para baixo para deslizar horizontalmente</span>
          <span className="lg:hidden">↓ Explore os 4 projetos abaixo</span>
        </div>
      </div>

      {/* Horizontal Track on Desktop / Vertical Stack on Mobile */}
      <div className="relative z-10 w-full px-4 sm:px-8">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row items-stretch gap-8 lg:w-max"
        >
          {projects.map((proj) => (
            <MagneticProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}

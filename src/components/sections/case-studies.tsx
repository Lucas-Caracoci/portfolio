"use client";

import { useState } from "react";
import {
  Layers,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface CaseStudy {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  architectureHighlights: string[];
  techStack: string[];
  codeSnippet?: {
    filename: string;
    code: string;
  };
}

const projects: CaseStudy[] = [
  {
    id: "gide",
    badge: "Padrão de Engenharia & Starter Kit",
    title: "GIDE — PMAC Starter Kit & Padrão Municipal",
    subtitle: "Monólito modular de alta escala com Laravel 12, React 19 via Inertia e Gotenberg",
    description:
      "Arquitetura base desenvolvida para padronizar e unificar o desenvolvimento de todos os novos softwares da Prefeitura Municipal de Arraial do Cabo. Implementa Service Pattern estrito, autenticação unificada SSO ArraiAuth e motor Gotenberg desacoplado.",
    challenge:
      "Sistemas municipais sofriam com duplicação de regras de negócio em Controllers, acoplamento excessivo e geração pesada de relatórios PDF que travavam os workers PHP-FPM em horários de pico.",
    solution:
      "Criou-se uma arquitetura base padronizada com Service Pattern desacoplado, geração de PDFs delegada assincronamente a um microserviço Gotenberg via Docker e persistência otimizada no PostgreSQL com identificadores UUIDv7.",
    architectureHighlights: [
      "Service Pattern: Controllers enxutos atuando apenas como roteadores HTTP e serializadores",
      "Motor Gotenberg: Renderização de PDFs em Chromium headless rodando em container Docker isolado",
      "SSO ArraiAuth: Camada centralizada de autenticação e tokens JWT para os sistemas municipais",
      "Tipagem Estrita & Qualidade: Larastan no nível 8 e Pint para garantia de conformidade de código",
    ],
    techStack: [
      "Laravel 12",
      "PHP 8.5",
      "React 19",
      "Inertia.js",
      "PostgreSQL 18",
      "Gotenberg PDF",
      "Docker Compose",
      "Tailwind CSS",
    ],
    codeSnippet: {
      filename: "app/Services/EditalPublicationService.php",
      code: `final readonly class EditalPublicationService
{
    public function __construct(
        private EditalRepositoryInterface $repository,
        private GotenbergClientInterface $gotenberg,
        private AuditLoggerInterface $logger,
    ) {}

    public function publish(EditalDraftDTO $dto): Edital
    {
        return DB::transaction(function () use ($dto) {
            $pdfContent = $this->gotenberg->htmlToPdf($dto->renderTemplate());
            $edital = $this->repository->createWithDocument($dto, $pdfContent);
            $this->logger->logSecurityAction('edital.published', $edital->uuid);
            return $edital;
        });
    }
}`,
    },
  },
  {
    id: "concursos",
    badge: "Engenharia de Dados & Segurança",
    title: "Portal de Concursos PMAC — Pipeline ETL Criptografado",
    subtitle: "Migração de acervo com descriptografia Fernet AES e ingestão transacional no PostgreSQL",
    description:
      "Plataforma pública responsável pela inscrição, homologação e publicação de editais de processos seletivos públicos, integrada a um pipeline de migração que recuperou centenas de documentos legados criptografados.",
    challenge:
      "Bancos de dados legados em SQLite continham metadados e documentos protegidos com criptografia simétrica Fernet AES sem documentação de schema, necessitando de migração sem perda de integridade nem quebra de hashes.",
    solution:
      "Desenvolvimento de um pipeline de ETL em Python com validação transacional por lotes, rotação segura de chaves, descriptografia controlada em memória e persistência estruturada em tabelas normalizadas do PostgreSQL sob Docker.",
    architectureHighlights: [
      "Pipeline ETL Python: Ingestão de dados com validação de schemas via Pydantic e SQLAlchemy",
      "Criptografia Fernet AES: Processamento seguro com verificação de integridade HMAC-SHA256",
      "Docker Bridge Network: Isolamento de rede entre os serviços de ingestão e o banco de dados",
      "Nginx Proxy Manager: Gerenciamento seguro de certificados SSL e rate limiting em endpoints públicos",
    ],
    techStack: [
      "Python 3.12",
      "Fernet AES",
      "PostgreSQL",
      "Docker",
      "Nginx Proxy Manager",
      "SQLAlchemy",
      "Linux VPS",
    ],
    codeSnippet: {
      filename: "etl/decryptor_pipeline.py",
      code: `def migrate_legacy_edital(legacy_row: sqlite3.Row, cipher: Fernet) -> PreparedEdital:
    try:
        raw_payload = cipher.decrypt(legacy_row["encrypted_metadata"])
        metadata = json.loads(raw_payload.decode("utf-8"))
        
        return PreparedEdital(
            uuid=str(uuid.uuid4()),
            title=metadata["titulo_edital"],
            published_at=datetime.fromisoformat(metadata["data_publicacao"]),
            checksum=hashlib.sha256(legacy_row["pdf_blob"]).hexdigest()
        )
    except InvalidToken:
        logger.critical(f"Falha de integridade na chave para o edital ID {legacy_row['id']}")
        raise`,
    },
  },
  {
    id: "meu-porto",
    badge: "Plataforma Educacional Colaborativa",
    title: "Meu Porto — Ecossistema Escolar Municipal",
    subtitle: "Feed pedagógico, ouvidoria, fórum de turmas e controle RBAC granular",
    description:
      "Ambiente digital municipal focado na comunicação escolar, engajamento comunitário de responsáveis e alunos, e gestão de ouvidoria pedagógica com suporte a conexões móveis lentas.",
    challenge:
      "Usuários utilizavam conexões 3G/4G instáveis em dispositivos modestos, exigindo tempos de carregamento instantâneos e suporte a interações em cache.",
    solution:
      "Arquitetura PWA híbrida utilizando Inertia.js com React 19, cache com TanStack Query para otimização de requisições e persistência em cache Redis para feeds de turmas.",
    architectureHighlights: [
      "RBAC Granular: Matriz estrita de permissões para Gestores, Professores, Responsáveis e Alunos",
      "TanStack Query: Cache inteligente e invalidação seletiva de feeds e mensagens",
      "PWA Offline-First: Service Workers com estratégias stale-while-revalidate para avisos municipais",
    ],
    techStack: ["Laravel 12", "React 19", "Inertia.js", "Redis", "Tailwind CSS", "PWA"],
  },
  {
    id: "pizzashop",
    badge: "Design Engineering & Reatividade",
    title: "PizzaShop Web — Dashboard de Operações",
    subtitle: "SPA frontend de alta performance com validação estrita e microinterações táteis",
    description:
      "Interface analítica para gerenciamento de pedidos e métricas operacionais, projetada com componentes acessíveis do Radix UI e formulários reativos tipados.",
    challenge:
      "Apresentar fluxos contínuos de atualizações de pedidos sem travamento de renderização e com tratamento minucioso de estados vazios e erros de validação.",
    solution:
      "Estruturação baseada em React 19 com Tailwind CSS v4, validação com Zod e transições instantâneas de estado seguindo as diretrizes de design engineering de Emil Kowalski.",
    architectureHighlights: [
      "Validação Tipada: Schemas de formulários garantidos em tempo de compilação via Zod",
      "Radix UI Primitives: Componentes 100% acessíveis e amigáveis a teclado",
      "Microinterações: Feedback instantâneo em mutações de pedidos sem latência perceptual",
    ],
    techStack: ["React 19", "TypeScript", "Tailwind CSS v4", "Radix UI", "Zod", "TanStack Query"],
  },
];

export function CaseStudiesSection() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section id="case-studies" className="relative z-20 py-24 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>SISTEMAS & CASOS DE ESTUDO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 mb-4">
          Arquitetura comprovada em produção.
        </h2>
        <p className="text-base text-slate-400 max-w-2xl font-sans">
          Projetos reais com soluções de engenharia para problemas de escala, integridade de
          dados, segurança e experiência do usuário.
        </p>
      </div>

      {/* Project Switcher Navigation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {projects.map((proj) => {
          const isActive = activeProject.id === proj.id;
          return (
            <button
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-slate-900 border border-cyan-400/50 shadow-[0_0_20px_-5px_rgba(0,245,255,0.25)]"
                  : "glass-panel opacity-70 hover:opacity-100 hover:border-slate-700"
              }`}
            >
              <div className="text-[11px] font-mono text-cyan-400 mb-1 flex items-center justify-between">
                <span>{proj.badge.split(" ")[0]}</span>
                {isActive && <ChevronRight className="w-3 h-3 text-cyan-400" />}
              </div>
              <div className="font-semibold text-sm text-slate-100 truncate">{proj.title.split("—")[0]}</div>
              <div className="text-xs text-slate-400 truncate mt-0.5">{proj.techStack.slice(0, 2).join(", ")}</div>
            </button>
          );
        })}
      </div>

      {/* Active Project Full Detail Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-cyan-500/25 relative overflow-hidden">
        {/* Subtle cyan glow inside card */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Context, Challenge, Solution */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
                {activeProject.badge}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
                {activeProject.title}
              </h3>
              <p className="text-sm font-medium text-cyan-400/90 mb-6 font-mono">
                {activeProject.subtitle}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                {activeProject.description}
              </p>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-red-500/20">
                  <div className="text-xs font-mono text-red-400 font-semibold mb-1 flex items-center gap-1.5">
                    <span>O Desafio</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeProject.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/20">
                  <div className="text-xs font-mono text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
                    <span>A Solução de Arquitetura</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-mono uppercase text-slate-400">Destaques Técnicos:</div>
                {activeProject.architectureHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-2.5">Stack Tecnológica:</div>
              <div className="flex flex-wrap gap-2">
                {activeProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-cyan-500/20 text-xs font-mono text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Code Snippet / Visual Spec */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {activeProject.codeSnippet ? (
              <div className="rounded-xl overflow-hidden border border-cyan-500/25 bg-slate-950/90 shadow-2xl">
                {/* Code Editor Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {activeProject.codeSnippet.filename}
                  </span>
                </div>
                {/* Code Content */}
                <pre className="p-4 text-[12px] font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{activeProject.codeSnippet.code}</code>
                </pre>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center p-8 text-center rounded-xl border border-cyan-500/20 bg-slate-950/60">
                <ShieldCheck className="w-12 h-12 text-cyan-400 mb-4 animate-pulse" />
                <h4 className="text-base font-semibold text-slate-100 mb-2">
                  Qualidade e Resiliência em Produção
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs font-sans">
                  Sistemas projetados com testes automatizados, contratos de dados estritos e
                  garantia de integridade para usuários finais.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Code, Layout, Database, CheckCircle2 } from "lucide-react";

export function SkillsMatrixSection() {
  const domains = [
    {
      icon: Code,
      title: "Backend & Arquitetura",
      description: "Construção de monólitos modulares resilientes e APIs RESTful estruturadas.",
      capabilities: [
        "PHP 8.5 & Laravel 12 (Service Pattern, DTOs, Policies)",
        "Gotenberg PDF Engine (Microserviço Docker headless)",
        "Python 3.12 (Pipelines ETL, Criptografia Fernet AES)",
        "SSO & OAuth2 (Tokens JWT e autenticação unificada)",
        "Filas Assíncronas & Jobs com Redis e Supervisor",
      ],
    },
    {
      icon: Layout,
      title: "Frontend & Design Engineering",
      description: "Interfaces com fidelidade de design, transições fluidas e microinterações táteis.",
      capabilities: [
        "React 19 & Next.js 15 (App Router, SSG, Server Actions)",
        "Inertia.js (Integração semântica monólito-frontend)",
        "Tailwind CSS v4 & Shaders WebGL / Three.js",
        "GSAP 3 (ScrollTrigger) & Lenis (Single Smooth Scroll)",
        "Framer Motion & Componentes Acessíveis Radix UI",
      ],
    },
    {
      icon: Database,
      title: "Dados & Infraestrutura",
      description: "Modelagem relacional consistente, integridade transacional e conteinerização.",
      capabilities: [
        "PostgreSQL 18 (UUIDs v7, Índices B-Tree, Schemas)",
        "Docker & Docker Compose (Redes bridge isoladas)",
        "Linux VPS (CachyOS/Arch, Nginx Proxy Manager, SSL)",
        "Redis (Cache em memória e invalidação seletiva)",
        "Backups Automatizados & Retenção com Checksums",
      ],
    },
    {
      icon: CheckCircle2,
      title: "Qualidade & Ferramentas",
      description: "Padrões de engenharia rigorosos para longevidade e manutenibilidade do código.",
      capabilities: [
        "Análise Estática com Larastan (PHPStan Nível 8)",
        "Pint & ESLint para formatação e padrões de código",
        "Validação de Contratos com Zod & Form Requests",
        "Git Flow, versionamento semântico e code review",
        "Acessibilidade WCAG e suporte a prefers-reduced-motion",
      ],
    },
  ];

  return (
    <section id="skills" className="relative z-20 py-24 px-4 max-w-6xl mx-auto">
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <Code className="w-3.5 h-3.5" />
          <span>CAPACIDADES TÉCNICAS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 mb-4">
          Matriz de Arquitetura & Domínios.
        </h2>
        <p className="text-base text-slate-400 max-w-2xl font-sans">
          Competências organizadas por áreas de responsabilidade técnica, fundamentadas em
          aplicações reais de produção.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domains.map((domain, idx) => {
          const Icon = domain.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/15 hover:border-cyan-500/35 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/25 text-cyan-400 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">{domain.title}</h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">{domain.description}</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                {domain.capabilities.map((cap, capIdx) => (
                  <div key={capIdx} className="flex items-center gap-2.5 text-xs text-slate-300 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

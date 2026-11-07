"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { CornerDownLeft } from "lucide-react";

const easeOutCustom = [0.22, 1, 0.36, 1] as const;

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

const quickCommands = [
  "projects",
  "career",
  "arch",
  "skills",
  "whoami",
  "neofetch",
  "clear",
] as const;

function NeofetchOutput() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-2 text-xs font-mono">
      <div className="md:col-span-5 text-cyan-400 select-none leading-tight font-bold">
        <pre className="text-xs leading-tight overflow-x-auto">
{`   .-.     .-.
  (   )   (   )
   |~|     |~|     Lucas Caracoci
   | |     | |     ------------------
   | |_____| |     Role: Full-Stack & Cloud Architect
  /           \\    Academic: Pós Eng. Software & Cloud
 /   .-----.   \\   Backend: Laravel, PHP, Python
/   /       \\   \\  Frontend: Next.js, React, TypeScript
\\   \\       /   /  Data: PostgreSQL, Redis, Docker
 \\   '-----'   /   Shader: Kura Fluid + Ridged Dot Mesh
  '-----------'    Status: Available for Projects`}
        </pre>
      </div>
      <div className="md:col-span-7 space-y-1 text-slate-300">
        <div>
          <span className="text-cyan-400 font-semibold">Perfil:</span> Engenheiro de Software,
          Cloud & Arquiteto Full-Stack
        </div>
        <div>
          <span className="text-cyan-400 font-semibold">Especialização:</span> Engenharia de
          Software & Cloud Computing
        </div>
        <div>
          <span className="text-cyan-400 font-semibold">Localização:</span> Arraial do Cabo, RJ —
          Brasil (UTC-3)
        </div>
        <div>
          <span className="text-cyan-400 font-semibold">E-mail:</span> lucascaracoci2@gmail.com
        </div>
        <div>
          <span className="text-cyan-400 font-semibold">GitHub:</span> github.com/Lucas-Caracoci
        </div>
        <div className="pt-2 text-slate-400">
          Digite ou clique em <span className="text-cyan-300 font-bold">help</span> para listar
          todos os comandos disponíveis.
        </div>
      </div>
    </div>
  );
}

export function SystemTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "init-1",
      command: "neofetch",
      output: <NeofetchOutput />,
    },
  ]);

  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    let response: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        response = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300 my-2">
            <div className="text-cyan-400 font-semibold">Comandos Disponíveis:</div>
            <div><span className="text-cyan-300 w-24 inline-block">help</span> — Exibe esta lista de comandos</div>
            <div><span className="text-cyan-300 w-24 inline-block">projects</span> — Resumo dos sistemas em produção</div>
            <div><span className="text-cyan-300 w-24 inline-block">career</span> — Trajetória e experiência profissional</div>
            <div><span className="text-cyan-300 w-24 inline-block">arch</span> — Filosofia de arquitetura de software & cloud</div>
            <div><span className="text-cyan-300 w-24 inline-block">skills</span> — Matriz de competências técnicas</div>
            <div><span className="text-cyan-300 w-24 inline-block">whoami</span> — Sobre a trajetória e formação de Lucas Caracoci</div>
            <div><span className="text-cyan-300 w-24 inline-block">contact</span> — Canais de comunicação e contato</div>
            <div><span className="text-cyan-300 w-24 inline-block">neofetch</span> — Exibe especificações do perfil e stack</div>
            <div><span className="text-cyan-300 w-24 inline-block">clear</span> — Limpa a tela do terminal</div>
          </div>
        );
        break;

      case "neofetch":
        response = <NeofetchOutput />;
        break;

      case "career":
        response = (
          <div className="space-y-2 text-xs font-mono text-slate-300 my-2">
            <div className="text-cyan-400 font-semibold">Trajetória Profissional:</div>
            <div>
              • <span className="text-white font-semibold">Desenvolvedor Full-Stack</span>{" "}
              <span className="text-cyan-400">@Prefeitura Municipal</span> (Abril 2026 — Atualmente)
              — Arquitetura e desenvolvimento de sistemas institucionais com Laravel, React,
              TypeScript, Inertia.js, PostgreSQL, Docker e Python ETL.
            </div>
            <div>
              • <span className="text-white font-semibold">Analista de TI & Infraestrutura</span>{" "}
              <span className="text-cyan-400">@Prefeitura Municipal</span> (Abril 2025 — Abril 2026)
              — Sustentação de infraestrutura de TI, redes, segurança da informação e apoio à
              implantação de sistemas públicos.
            </div>
          </div>
        );
        break;

      case "arch":
        response = (
          <div className="space-y-2 text-xs font-mono text-slate-300 my-2">
            <div className="text-cyan-400 font-semibold">Filosofia de Arquitetura:</div>
            <div>1. <span className="text-white font-semibold">Service Pattern Estrito:</span> Controllers nunca contêm regras de negócio. São meros orquestradores de requisição HTTP e DTOs.</div>
            <div>2. <span className="text-white font-semibold">Monólitos Modulares & Cloud:</span> Coesão de domínio com serviços especializados conteinerizados (PDF Headless, Filas, Cache).</div>
            <div>3. <span className="text-white font-semibold">Integridade Transacional:</span> Operações críticas e migrações encapsuladas em transações ACID com validação rigorosa.</div>
            <div>4. <span className="text-white font-semibold">Design Engineering:</span> Interfaces em React / Next.js e WebGL tratadas com o mesmo rigor de engenharia que a camada de dados.</div>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-2 text-xs font-mono text-slate-300 my-2">
            <div className="text-cyan-400 font-semibold">Sistemas em Destaque:</div>
            <div>• <span className="text-cyan-300">GIDE (Gestão Integrada de Desempenho Educacional)</span> — Plataforma de avaliação multidimensional, vouchers QR/OTP, coleta Offline-First (Dexie.js) e motor de cálculo de indicadores.</div>
            <div>• <span className="text-cyan-300">Portal de Concursos & Processos Seletivos</span> — Gestão de certames e editais, fusão/renderização PDF em container isolado, filas Horizon e migração de dados para PostgreSQL.</div>
            <div>• <span className="text-cyan-300">Meu Porto (Plataforma de Comunidade Escolar)</span> — Programa de Mentoria/Apadrinhamento Estudantil (pareamento por interesses), fórum acadêmico, suporte protocolado e conversão de mídia HEIC.</div>
            <div>• <span className="text-cyan-300">PizzaShop Web</span> — SPA analítico com React 19, Vite, Tailwind CSS v4, Shadcn UI e validação tipada com Zod.</div>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="text-xs font-mono text-slate-300 leading-relaxed my-2">
            Lucas Caracoci é Engenheiro de Software Full-Stack com especialização em Engenharia de Software e Cloud Computing. Atua no desenvolvimento de sistemas institucionais e corporativos de alta demanda, arquitetando soluções que unem robustez de backend (PHP / Laravel / PostgreSQL / Python ETL) com fluidez de interfaces modernas (Next.js / React / TypeScript / Three.js Shaders).
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300 my-2">
            <div><span className="text-cyan-400 font-semibold">Backend:</span> PHP, Laravel, Service Pattern, Python (ETL & Data Pipelines), Microserviços PDF Headless</div>
            <div><span className="text-cyan-400 font-semibold">Frontend:</span> Next.js, React, Inertia.js, TypeScript, Tailwind CSS, GSAP, Three.js GLSL</div>
            <div><span className="text-cyan-400 font-semibold">Cloud & Dados:</span> PostgreSQL, Redis, Docker & Docker Compose, Cloud Architecture, Filas Assíncronas</div>
            <div><span className="text-cyan-400 font-semibold">Qualidade:</span> PHPUnit, Análise Estática, Laravel Pint, ESLint, Zod, Git Flow</div>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 text-xs font-mono text-slate-300 my-2">
            <div>E-mail: <span className="text-cyan-300">lucascaracoci2@gmail.com</span></div>
            <div>GitHub: <span className="text-cyan-300">https://github.com/Lucas-Caracoci</span></div>
            <div>Localização: Arraial do Cabo, RJ — Brasil (UTC-3)</div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      case "":
        return;

      default:
        response = (
          <div className="text-xs font-mono text-rose-400 my-1">
            Comando não reconhecido: &quot;{cmdText}&quot;. Digite <span className="text-cyan-300 font-semibold">help</span> para ver a lista de comandos.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmdText,
        output: response,
      },
    ]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <section id="terminal" className="relative z-20 py-24 px-4 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: easeOutCustom }}
        className="mb-10"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
          04 / PLAYGROUND INTERATIVO
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 text-balance mb-3">
          Terminal do Sistema.
        </h2>
        <p className="text-base text-slate-400 max-w-xl font-sans text-pretty">
          Inspecione a filosofia de arquitetura, carreira, stack e projetos digitando comandos ou
          clicando nos atalhos rápidos abaixo.
        </p>
      </motion.div>

      {/* Terminal Window Box */}
      <div
        className="glass-panel rounded-2xl border border-white/15 overflow-hidden shadow-2xl shadow-black/60 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#020203]/95 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" />
            <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" />
            <span className="w-3 h-3 rounded-full bg-cyan-500/80 inline-block" />
            <span className="text-xs font-mono text-slate-400 ml-2">lucas@workstation: ~/portfolio</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SESSION_ACTIVE</span>
          </div>
        </div>

        {/* Quick-Command Action Bar (1-click execution for mobile & desktop) */}
        <div
          className="px-4 py-2.5 bg-[#050811]/90 border-b border-white/10 flex flex-wrap items-center gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[11px] font-mono text-slate-400 mr-1">Atalhos:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-1 rounded-md bg-[#020203] hover:bg-cyan-950/60 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer active:scale-[0.97]"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen Body */}
        <div
          ref={screenRef}
          className="p-4 sm:p-6 bg-[#020203]/90 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4 font-mono text-xs text-slate-200"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-emerald-400">lucas@dev</span>
                <span className="text-slate-500">:</span>
                <span className="text-sky-300">~</span>
                <span className="text-slate-400">$</span>
                <span className="text-slate-100 font-semibold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          {/* Prompt Input Line */}
          <div className="flex items-center gap-2 text-cyan-400 pt-1">
            <span className="text-emerald-400">lucas@dev</span>
            <span className="text-slate-500">:</span>
            <span className="text-sky-300">~</span>
            <span className="text-slate-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs"
              placeholder="Digite um comando (ex: help, career, projects)..."
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="button"
              onClick={() => {
                handleCommand(input);
                setInput("");
              }}
              className="p-1.5 rounded-lg bg-cyan-950/80 text-cyan-400 hover:bg-cyan-900 border border-cyan-500/30 cursor-pointer active:scale-[0.96]"
              title="Executar"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

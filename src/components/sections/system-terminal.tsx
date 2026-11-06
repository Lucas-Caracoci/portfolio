"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function SystemTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "init-1",
      command: "neofetch",
      output: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-2 text-xs font-mono">
          <div className="md:col-span-5 text-cyan-400 select-none leading-tight font-bold">
            <pre className="text-[11px] leading-tight">
{`   .-.     .-.
  (   )   (   )
   |~|     |~|     Lucas Caracoci
   | |     | |     ------------------
   | |_____| |     OS: Linux / CachyOS
  /           \\    Host: Full-Stack Architect
 /   .-----.   \\   Kernel: Production-Grade
/   /       \\   \\  Shell: zsh + tmux
\\   \\       /   /  Stack: Laravel 12, React 19
 \\   '-----'   /   DB: PostgreSQL 18 + UUIDv7
  '-----------'    Aesthetic: Cyan Aurora`}
            </pre>
          </div>
          <div className="md:col-span-7 space-y-1 text-slate-300">
            <div><span className="text-cyan-400 font-semibold">Perfil:</span> Engenheiro de Software & Arquiteto Full-Stack</div>
            <div><span className="text-cyan-400 font-semibold">Localização:</span> Arraial do Cabo / Rio de Janeiro, BR (UTC-3)</div>
            <div><span className="text-cyan-400 font-semibold">E-mail:</span> lucascaracoci2@gmail.com</div>
            <div><span className="text-cyan-400 font-semibold">GitHub:</span> github.com/lucascaracoci</div>
            <div className="pt-2 text-slate-400">
              Digite <span className="text-cyan-300 font-bold">help</span> para listar comandos disponíveis.
            </div>
          </div>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
            <div><span className="text-cyan-300 w-24 inline-block">arch</span> — Filosofia de arquitetura de software</div>
            <div><span className="text-cyan-300 w-24 inline-block">projects</span> — Resumo dos sistemas em produção</div>
            <div><span className="text-cyan-300 w-24 inline-block">whoami</span> — Sobre a trajetória de Lucas Caracoci</div>
            <div><span className="text-cyan-300 w-24 inline-block">skills</span> — Matriz de competências técnicas</div>
            <div><span className="text-cyan-300 w-24 inline-block">contact</span> — Canais de comunicação e contato</div>
            <div><span className="text-cyan-300 w-24 inline-block">neofetch</span> — Exibe especificações do sistema e host</div>
            <div><span className="text-cyan-300 w-24 inline-block">clear</span> — Limpa a tela do terminal</div>
          </div>
        );
        break;

      case "arch":
        response = (
          <div className="space-y-2 text-xs font-mono text-slate-300 my-2">
            <div className="text-cyan-400 font-semibold">Filosofia de Arquitetura:</div>
            <div>1. <span className="text-white font-semibold">Service Pattern Estrito:</span> Controllers nunca contêm regras de negócio. São meros orquestradores de requisição HTTP e DTOs.</div>
            <div>2. <span className="text-white font-semibold">Monólitos Modulares:</span> Coesão de domínio antes de microserviços prematuros. Menor overhead operacional, máxima velocidade de entrega.</div>
            <div>3. <span className="text-white font-semibold">Integridade Transacional:</span> Operações de migração e mutação de estado encapsuladas em transações ACID com locks graduais.</div>
            <div>4. <span className="text-white font-semibold">Design Engineering:</span> A interface visual é tratada com o mesmo rigor de código que a camada de dados.</div>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-2 text-xs font-mono text-slate-300 my-2">
            <div className="text-cyan-400 font-semibold">Sistemas em Destaque:</div>
            <div>• <span className="text-cyan-300">GIDE</span> — Starter Kit municipal & padrão de engenharia com Laravel 12, Inertia e Gotenberg PDF.</div>
            <div>• <span className="text-cyan-300">Portal de Concursos PMAC</span> — Pipeline ETL Python com descriptografia Fernet AES legada e PostgreSQL.</div>
            <div>• <span className="text-cyan-300">Meu Porto</span> — Ecossistema escolar com feed colaborativo, ouvidoria e RBAC granular.</div>
            <div>• <span className="text-cyan-300">PizzaShop Web</span> — SPA analítico com React 19, Zod, Radix UI e TanStack Query.</div>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="text-xs font-mono text-slate-300 leading-relaxed my-2">
            Lucas Caracoci é Engenheiro de Software Full-Stack. Atua no desenvolvimento de sistemas governamentais e empresariais de alta demanda, arquitetando soluções que unem robustez de backend (PHP 8.5 / Laravel 12 / PostgreSQL) com fluidez de interfaces modernas (React 19 / TypeScript / Shaders).
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300 my-2">
            <div><span className="text-cyan-400 font-semibold">Backend:</span> PHP 8.5, Laravel 12, Service Pattern, Python (ETL / Crypto), Gotenberg</div>
            <div><span className="text-cyan-400 font-semibold">Frontend:</span> React 19, Next.js, Inertia.js, TypeScript, Tailwind CSS, GSAP, WebGL</div>
            <div><span className="text-cyan-400 font-semibold">Dados & Infra:</span> PostgreSQL 18 (UUIDs, B-Tree), Redis, Docker Compose, Linux CachyOS/VPS, Nginx</div>
            <div><span className="text-cyan-400 font-semibold">Qualidade:</span> Larastan (Level 8), Pint, ESLint, Git Flow</div>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 text-xs font-mono text-slate-300 my-2">
            <div>E-mail: <span className="text-cyan-300">lucascaracoci2@gmail.com</span></div>
            <div>GitHub: <span className="text-cyan-300">https://github.com/lucascaracoci</span></div>
            <div>Localização: Arraial do Cabo, RJ - Brasil</div>
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
    <section id="terminal" className="relative z-20 py-20 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span>PLAYGROUND INTERATIVO</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mb-3">
          Terminal do Sistema
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto font-sans">
          Experimente comandos reais diretamente no ambiente virtualizado.
        </p>
      </div>

      {/* Terminal Window Box */}
      <div
        className="glass-panel rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-950/40 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="text-xs font-mono text-slate-400 ml-2">lucas@hyprland: ~</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SESSION_ACTIVE</span>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-4 sm:p-6 bg-slate-950/95 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4 font-mono text-xs text-slate-200">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-emerald-400">lucas@cachyos</span>
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
            <span className="text-emerald-400">lucas@cachyos</span>
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
              placeholder="Digite um comando (ex: help, arch, projects)..."
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={() => {
                handleCommand(input);
                setInput("");
              }}
              className="p-1 rounded bg-cyan-950/80 text-cyan-400 hover:bg-cyan-900 border border-cyan-500/30 cursor-pointer"
              title="Executar"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </section>
  );
}

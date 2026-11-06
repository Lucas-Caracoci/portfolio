# Lucas Caracoci — Portfólio de Engenharia de Software & Arquitetura

<div align="center">

![Next.js 15](https://img.shields.io/badge/Next.js%2015-black?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js WebGL](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GSAP 3](https://img.shields.io/badge/GSAP%203-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

**Engenharia de alta confiabilidade. Interfaces com precisão cirúrgica.**

[Visão Geral](#-visão-geral) • [Arquitetura Visual](#-arquitetura-visual-cyan-aurora--dot-matrix) • [Casos de Estudo](#-casos-de-estudo-reais) • [Terminal Interativo](#-terminal-interativo) • [Como Rodar](#-como-rodar-o-projeto)

</div>

---

## ⚡ Visão Geral

Portfólio autoral de engenharia de software desenvolvido para demonstrar o trabalho técnico e arquitetural de **Lucas Caracoci**. O projeto combina a solidez de sistemas de missão crítica em backend (Laravel 12, PostgreSQL 18, pipelines ETL em Python e conteinerização Docker) com interfaces modernas e táteis inspiradas nos padrões internacionais do **Awwwards** e nas diretrizes de design engineering de **Emil Kowalski**.

---

## 🌌 Arquitetura Visual: Cyan Aurora & Dot Matrix

A experiência visual do portfólio fundamenta-se no contraste entre a luz orgânica e a precisão da engenharia:

1. **Shader WebGL / Three.js (`src/components/hero-shader-background.tsx`)**:
   - Fragment shader customizado com *Fractional Brownian Motion (FBM)* e *Simplex Noise* em domain warping.
   - Gradiente volumétrico com transição do Ciano Elétrico (`#00F5FF`) para Azul Cobalto Profundo (`#1D4ED8`) e Obsidian Black (`#030712`).
   - Reatividade suave ao cursor com amortecimento elástico LERP (0.04).
   - Otimização com `IntersectionObserver`: o loop `requestAnimationFrame` é pausado quando o hero está fora da tela, garantindo 0% de impacto na GPU.
   - Respeito à acessibilidade: suporte imediato à diretiva `prefers-reduced-motion`.
2. **Grade Técnica Dot Matrix (`src/components/dot-matrix-overlay.tsx`)**:
   - Camada sobreposta de matriz de pontos com máscara radial e spotlight que ilumina os pontos ao redor do ponteiro do mouse.
3. **Scroll Suave com Lenis (`src/components/providers/smooth-scroll.tsx`)**:
   - Instalação única de motor de scroll sincronizada diretamente ao ticker do GSAP ScrollTrigger.
4. **Command Palette Raycast (`src/components/command-menu.tsx`)**:
   - Acesso por atalho `⌘K` / `Ctrl+K`, navegação por teclado e feedback tátil/sonoro (< 150ms).

---

## 🛠 Casos de Estudo Reais

O portfólio não apresenta métricas fictícias ou projetos genéricos. Destaca sistemas reais desenvolvidos por Lucas Caracoci:

- **GIDE (PMAC Starter Kit & Padrão Municipal)**:
  - Monólito modular em Laravel 12 + React 19 via Inertia.js.
  - Service Pattern estrito eliminando regras de negócio de Controllers.
  - Microserviço Gotenberg em Docker isolado para geração assíncrona de relatórios em PDF com Chromium headless.
  - Autenticação centralizada com SSO ArraiAuth e análise estática Larastan no nível 8.
- **Portal de Concursos PMAC (Pipeline ETL Criptografado)**:
  - Migração de mais de 320 documentos e editais legados de banco SQLite criptografado com Fernet AES.
  - Ingestão transacional segura em tabelas normalizadas do PostgreSQL com validação de checksums SHA-256.
  - Infraestrutura com redes isoladas Docker bridge e Nginx Proxy Manager com SSL automatizado.
- **Meu Porto (Plataforma Escolar Colaborativa)**:
  - Ambiente escolar com feed pedagógico, ouvidoria e fórum de turmas.
  - Controle de acesso granular RBAC para Gestores, Professores, Pais e Alunos.
  - TanStack Query e arquitetura PWA com estratégias de cache para conexões lentas.
- **PizzaShop Web (Dashboard de Operações)**:
  - SPA moderna em React 19 com Tailwind CSS v4, validação tipada de ponta a ponta com Zod e componentes acessíveis Radix UI.

---

## 💻 Terminal Interativo

O portfólio inclui um terminal integrado (`src/components/sections/system-terminal.tsx`) inspirado no ambiente Linux CachyOS/Hyprland. Comandos disponíveis:

```bash
help       # Lista todos os comandos
arch       # Filosofia de arquitetura de sistemas
whoami     # Trajetória e perfil de Lucas Caracoci
projects   # Resumo dos sistemas em produção
skills     # Matriz de competências técnicas
contact    # Informações de contato direto
neofetch   # Especificações do sistema virtualizado
clear      # Limpa o histórico de comandos
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+ (recomendado Node.js 22+)
- npm ou pnpm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Lucas-Caracoci/portfolio.git

# Acesse o diretório
cd portfolio

# Instale as dependências
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build de Produção

```bash
# Executa typecheck, linting e compilação otimizada Turbopack
npm run build

# Inicia o servidor de produção
npm run start
```

---

## 📬 Contato

- **Autor**: Lucas Caracoci
- **E-mail**: [lucascaracoci2@gmail.com](mailto:lucascaracoci2@gmail.com)
- **GitHub**: [@Lucas-Caracoci](https://github.com/Lucas-Caracoci)
- **Localização**: Arraial do Cabo / Rio de Janeiro, Brasil (UTC-3)

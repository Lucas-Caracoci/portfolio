# Lucas Caracoci — Portfólio de Engenharia de Software & Arquitetura

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js WebGL](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**Engenharia de alta confiabilidade. Interfaces com precisão cirúrgica.**

</div>

---

## ⚡ Visão Geral

Portfólio autoral de engenharia de software desenvolvido para apresentar a arquitetura e os projetos de **Lucas Caracoci** — Engenheiro de Software Full-Stack com especialização em Engenharia de Software e Cloud Computing.

---

## 🌌 Arquitetura Visual: Fluid Kura Shader & Ridged Dot Mesh

1. **Shader WebGL Global (`src/components/hero-shader-background.tsx`)**:
   - Gradiente fluido animado na seção Hero com distorção *Simplex Noise* e transição suave por scroll (`uScroll`) para `#020203`.
   - Malha de pontos animada (*Ridged Dot Grid*) contínua por todo o corpo da página.
2. **Scroll Suave com Lenis (`src/components/providers/smooth-scroll.tsx`)**.
3. **Command Palette (`src/components/command-menu.tsx`)**: Acesso rápido via `⌘K` / `Ctrl+K`.

---

## 🛠 Casos de Estudo Apresentados

- **GIDE (Gestão Integrada de Desempenho Educacional)**:
  - Plataforma de avaliação institucional multidimensional com motor de pontuação ponderada, vouchers QR/OTP, sincronização Offline-First (`Dexie.js` / IndexedDB) e relatórios analíticos.
- **Portal de Concursos & Processos Seletivos**:
  - Sistema de transparência e publicação de certames e editais com motor de documentos PDF headless, proteção de rotas, filas assíncronas e migração de acervo histórico.
- **Meu Porto (Plataforma de Comunidade Escolar)**:
  - Ecossistema estudantil com programa de apadrinhamento/mentoria por afinidade de interesses, fórum acadêmico, central de suporte por protocolo e otimização de mídia mobile.
- **PizzaShop Web**:
  - SPA analítico para gestão de pedidos e métricas construído com React, Vite, Tailwind CSS, Shadcn UI, React Hook Form e Zod.

---

## 🚀 Como Rodar o Projeto

```bash
npm install
npm run dev
```

Para gerar a build otimizada de produção:

```bash
npm run build
npm run start
```

---

## 📬 Contato

- **Autor**: Lucas Caracoci
- **E-mail**: [lucascaracoci2@gmail.com](mailto:lucascaracoci2@gmail.com)
- **GitHub**: [@Lucas-Caracoci](https://github.com/Lucas-Caracoci)
- **Localização**: Rio de Janeiro, Brasil (UTC-3)

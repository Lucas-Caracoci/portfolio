import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Lucas Caracoci — Arquiteto de Software & Engenheiro Full-Stack",
  description:
    "Portfólio de engenharia de Lucas Caracoci. Especialista em monólitos modulares (Laravel 12 / React 19 / Inertia), pipelines ETL criptografados no PostgreSQL e interfaces de precisão cirúrgica.",
  keywords: [
    "Lucas Caracoci",
    "Engenheiro de Software",
    "Arquiteto de Software",
    "Laravel 12",
    "React 19",
    "Inertia.js",
    "PostgreSQL",
    "Python ETL",
    "Docker",
    "Design Engineering",
  ],
  authors: [{ name: "Lucas Caracoci", url: "https://github.com/lucascaracoci" }],
  openGraph: {
    title: "Lucas Caracoci — Arquiteto de Software & Engenheiro Full-Stack",
    description:
      "Engenharia de alta confiabilidade e interfaces de precisão cirúrgica. Monólitos modulares, pipelines ETL e design engineering.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

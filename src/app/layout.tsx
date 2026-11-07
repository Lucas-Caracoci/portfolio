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
  themeColor: "#F4F1EA",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Lucas Caracoci — Engenheiro de Software Full-Stack",
  description:
    "Oi, eu sou o Lucas. Construo sistemas web que não travam na hora H e interfaces que dão gosto de usar com Laravel, React, Next.js e TypeScript.",
  keywords: [
    "Lucas Caracoci",
    "Engenheiro de Software",
    "Desenvolvedor Full-Stack",
    "Laravel",
    "React",
    "Next.js",
    "Inertia.js",
    "PostgreSQL",
    "Design Engineering",
  ],
  authors: [{ name: "Lucas Caracoci", url: "https://github.com/Lucas-Caracoci" }],
  openGraph: {
    title: "Lucas Caracoci — Engenheiro de Software Full-Stack",
    description:
      "Sistemas web de missão crítica, sincronização Offline-First e interfaces pensadas para pessoas reais.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F1EA] text-[#111111] selection:bg-[#FF3B00] selection:text-white">
        {children}
      </body>
    </html>
  );
}

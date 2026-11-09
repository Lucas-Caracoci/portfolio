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
  themeColor: "#020203",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Lucas Caracoci — Engenheiro de Software Full-Stack",
  description:
    "Engenheiro de Software Full-Stack. Sistemas web rápidos, seguros e prontos para produção com Laravel, React, Next.js e PostgreSQL.",
  keywords: [
    "Lucas Caracoci",
    "Engenheiro de Software",
    "Full-Stack",
    "Laravel",
    "React",
    "Next.js",
    "Inertia.js",
    "PostgreSQL",
    "Cloud Computing",
    "Design Engineering",
  ],
  authors: [{ name: "Lucas Caracoci", url: "https://github.com/Lucas-Caracoci" }],
  openGraph: {
    title: "Lucas Caracoci — Engenheiro de Software Full-Stack",
    description:
      "Sistemas web rápidos, seguros e prontos para produção com Laravel, React, Next.js e PostgreSQL.",
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
      <body className="min-h-full flex flex-col bg-[#020203] text-slate-100 selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

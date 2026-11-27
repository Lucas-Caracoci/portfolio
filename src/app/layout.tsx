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
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Lucas Caracoci • Engenheiro de Software Full Stack e Cloud",
  description:
    "Portfólio de engenharia de software de Lucas Caracoci. Sistemas web críticos com sincronização local, motores de documentos e interfaces de alta precisão em Laravel, React 19, Next.js e PostgreSQL.",
  keywords: [
    "Lucas Caracoci",
    "Engenheiro de Software",
    "Desenvolvedor Full Stack",
    "Laravel",
    "React 19",
    "Next.js",
    "Inertia.js",
    "PostgreSQL",
    "Cloud Computing",
  ],
  authors: [
    { name: "Lucas Caracoci", url: "https://github.com/Lucas-Caracoci" },
  ],
  openGraph: {
    title: "Lucas Caracoci • Engenheiro de Software Full Stack e Cloud",
    description:
      "Sistemas web críticos, sincronização local via IndexedDB e interfaces de alta precisão.",
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
      <body className="min-h-full flex flex-col bg-[#111111] text-[#fff7ed] selection:bg-[#f97316] selection:text-[#111111]">
        {children}
      </body>
    </html>
  );
}

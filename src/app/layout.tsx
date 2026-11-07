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
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Lucas Caracoci — Desenvolvedor Full-Stack",
  description:
    "Desenvolvedor Full-Stack. Sistemas web rápidos, seguros e prontos para produção com Laravel, React, Next.js e PostgreSQL.",
  authors: [{ name: "Lucas Caracoci", url: "https://github.com/Lucas-Caracoci" }],
  openGraph: {
    title: "Lucas Caracoci — Desenvolvedor Full-Stack",
    description:
      "Sistemas web rápidos, seguros e prontos para produção com Laravel, React, Next.js e PostgreSQL.",
    type: "website",
    locale: "pt_BR",
  },
};

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('portfolio-v3-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = (saved === 'dark' || saved === 'light') ? saved : (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

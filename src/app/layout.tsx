import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Lucas Caracoci — Engenheiro de Software Full-Stack",
  description:
    "Engenheiro de Software Full-Stack. Sistemas web rápidos, seguros e prontos para produção com Laravel, React, Next.js e PostgreSQL.",
  authors: [{ name: "Lucas Caracoci", url: "https://github.com/Lucas-Caracoci" }],
  openGraph: {
    title: "Lucas Caracoci — Engenheiro de Software Full-Stack",
    description:
      "Sistemas web rápidos, seguros e prontos para produção com Laravel, React, Next.js e PostgreSQL.",
    type: "website",
    locale: "pt_BR",
  },
};

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('portfolio-v4-theme');
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}

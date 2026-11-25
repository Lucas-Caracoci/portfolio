import Link from "next/link";
import { SolarArrowUpRight } from "@/components/react-bits/icons";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full p-8 rounded-2xl bg-[#181818] border border-white/10 space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#272727] border border-white/10 text-xs font-mono text-emerald-400">
          <span>ERRO 404 • ROTA NÃO ENCONTRADA</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Página fora do índice.
          </h1>
          <p className="text-sm text-neutral-300 text-pretty">
            O endereço acessado não existe ou foi movido dentro do portfólio de
            Lucas Caracoci.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Link
            href="/"
            className="py-2 px-3 rounded-xl bg-white hover:bg-neutral-200 text-black text-base font-semibold inline-flex items-center gap-2 transition-colors duration-200"
          >
            <span>Voltar ao portfólio</span>
            <SolarArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

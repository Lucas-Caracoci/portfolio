import { ShieldCheck, Server, Database, Cpu } from "lucide-react";

export function MetricsRibbon() {
  const metrics = [
    {
      icon: Database,
      value: "320+",
      label: "Documentos & Editais Públicos",
      detail: "Pipeline ETL Python com descriptografia Fernet AES legada e migração para PostgreSQL",
    },
    {
      icon: Server,
      value: "100%",
      label: "Ambientes Conteinerizados",
      detail: "Docker Compose, redes bridge dedicadas, Nginx Proxy Manager e deploy VPS Linux",
    },
    {
      icon: Cpu,
      value: "Zero",
      unit: "Downtime",
      label: "Em Migrações Críticas",
      detail: "Execução com integridade transacional ACID, locks graduais e validação de checksums",
    },
    {
      icon: ShieldCheck,
      value: "Service",
      unit: "Pattern",
      label: "Arquitetura Desacoplada",
      detail: "Separação estrita entre camada HTTP (Controllers), regras de negócio e persistência",
    },
  ];

  return (
    <section id="metrics" className="relative z-20 py-16 px-4 bg-slate-950/70 border-y border-cyan-500/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-cyan-500/15 hover:border-cyan-500/35 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold font-mono tracking-tight text-slate-100 flex items-baseline gap-1">
                    <span>{item.value}</span>
                    {item.unit && (
                      <span className="text-sm font-sans font-medium text-cyan-400">
                        {item.unit}
                      </span>
                    )}
                  </div>
                </div>
                <h2 className="text-sm font-medium text-slate-200 mb-1.5">{item.label}</h2>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

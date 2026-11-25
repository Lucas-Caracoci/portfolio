"use client";

import { useEffect, useState } from "react";
import BranchedMenu, {
  type BranchedMenuItem,
} from "@/components/react-bits/BranchedMenu";
import type { ProjectId } from "@/components/v5/rb-projects";
import {
  SolarSparkles,
  SolarCode,
  SolarLayers,
  SolarServer,
  SolarDatabase,
  SolarShieldCheck,
  SolarCpu,
  SolarShoppingBag,
} from "@/components/react-bits/icons";

const SECTION_IDS = [
  "hero",
  "about",
  "projects",
  "manifesto",
  "career",
  "contact",
];

export function RbBranchedSidebar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const menuItems: BranchedMenuItem[] = [
    {
      label: "Navegação",
      children: [
        {
          value: "hero",
          label: "Início",
          icon: <SolarSparkles className="w-3.5 h-3.5" />,
        },
        {
          value: "about",
          label: "Sobre Mim",
          icon: <SolarCode className="w-3.5 h-3.5" />,
        },
        {
          value: "projects",
          label: "Projetos",
          icon: <SolarLayers className="w-3.5 h-3.5" />,
        },
        {
          value: "career",
          label: "Carreira",
          icon: <SolarServer className="w-3.5 h-3.5" />,
        },
        {
          value: "contact",
          label: "Contato",
          icon: <SolarSparkles className="w-3.5 h-3.5" />,
        },
      ],
    },
    {
      label: "Sistemas",
      children: [
        {
          value: "project:gide",
          label: "GIDE • Avaliação",
          icon: <SolarDatabase className="w-3.5 h-3.5" />,
        },
        {
          value: "project:concursos",
          label: "Portal Concursos",
          icon: <SolarShieldCheck className="w-3.5 h-3.5" />,
        },
        {
          value: "project:meu-porto",
          label: "Meu Porto",
          icon: <SolarCpu className="w-3.5 h-3.5" />,
        },
        {
          value: "project:pizzashop",
          label: "PizzaShop Web",
          icon: <SolarShoppingBag className="w-3.5 h-3.5" />,
        },
      ],
    },
  ];

  const handleSelect = (value: string) => {
    setMobileOpen(false);

    if (value.startsWith("project:")) {
      const projectId = value.replace("project:", "") as ProjectId;
      window.dispatchEvent(
        new CustomEvent("portfolio:select-project", { detail: { projectId } })
      );
      window.dispatchEvent(
        new CustomEvent("portfolio:scroll-to", {
          detail: { target: "projects" },
        })
      );
      return;
    }

    setActiveSection(value);
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", { detail: { target: value } })
    );
  };

  return (
    <>
      {/* Desktop Fixed Left Branched Menu */}
      <aside
        aria-label="Menu ramificado lateral"
        className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-2xl bg-[#141118]/75 backdrop-blur-xl border border-[#fed7aa]/10 shadow-2xl"
      >
        <BranchedMenu
          items={menuItems}
          defaultOpen={[0, 1]}
          activeValue={activeSection}
          onSelect={handleSelect}
          color="#fff7ed"
          accentColor="#f97316"
          lineColor="#4a3531"
          width={190}
          rowHeight={32}
          indent={34}
          trunk={11}
          radius={9}
          lineWidth={1.5}
          fontSize={12.5}
          drawDuration={380}
          foldDuration={280}
        />
      </aside>

      {/* Compact Left Trigger & Drawer for < lg screens so BranchedMenu is always accessible on the left */}
      <div className="lg:hidden fixed left-4 bottom-4 z-40">
        {mobileOpen ? (
          <aside
            aria-label="Menu ramificado lateral"
            className="p-4 rounded-2xl bg-[#141118]/95 backdrop-blur-xl border border-[#fed7aa]/15 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#fed7aa]/10">
              <span className="text-xs font-mono font-semibold text-[#f97316]">
                MENU // BRANCHED
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="px-2 py-0.5 rounded-md bg-[#2c2234] text-xs font-mono text-[#fed7aa] hover:text-white cursor-pointer"
              >
                Fechar
              </button>
            </div>
            <BranchedMenu
              items={menuItems}
              defaultOpen={[0, 1]}
              activeValue={activeSection}
              onSelect={handleSelect}
              color="#fff7ed"
              accentColor="#f97316"
              lineColor="#4a3531"
              width={210}
              rowHeight={32}
              indent={34}
              trunk={11}
              radius={9}
              lineWidth={1.5}
              fontSize={13}
              drawDuration={380}
              foldDuration={280}
            />
          </aside>
        ) : (
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir Branched Menu lateral"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#141118]/85 hover:bg-[#2c2234] backdrop-blur-xl border border-[#fed7aa]/15 text-xs font-mono font-semibold text-[#fff7ed] shadow-xl transition-colors duration-200 cursor-pointer active:scale-[0.98]"
          >
            <span className="w-2 h-2 rounded-full bg-[#f97316]" />
            <span>Menu</span>
          </button>
        )}
      </div>
    </>
  );
}

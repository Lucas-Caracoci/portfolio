'use client';

import React, { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  SolarSparkles,
  SolarCode,
  SolarLayers,
  SolarServer,
  SolarSliders,
} from '@/components/react-bits/icons';

export interface BranchedMenuChild {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface BranchedMenuItem {
  label: string;
  labelNode?: ReactNode;
  value?: string;
  children?: BranchedMenuChild[];
}

export interface BranchedMenuProps {
  items?: BranchedMenuItem[];
  defaultOpen?: number | number[];
  defaultActive?: string;
  activeValue?: string;
  scrollProgress?: number;
  onSelect?: (value: string, item: BranchedMenuChild | BranchedMenuItem) => void;
  onToggle?: (index: number, open: boolean) => void;
  color?: string;
  accentColor?: string;
  lineColor?: string;
  width?: number;
  rowHeight?: number;
  indent?: number;
  trunk?: number;
  radius?: number;
  lineWidth?: number;
  fontSize?: number;
  drawDuration?: number;
  foldDuration?: number;
  className?: string;
}

const DEFAULT_ITEMS: BranchedMenuItem[] = [
  {
    label: 'Navegação',
    children: [
      { value: 'hero', label: 'Início', icon: <SolarSparkles className="w-3.5 h-3.5" /> },
      { value: 'about', label: 'Sobre Mim', icon: <SolarCode className="w-3.5 h-3.5" /> },
      { value: 'projects', label: 'Projetos', icon: <SolarLayers className="w-3.5 h-3.5" /> },
      { value: 'career', label: 'Carreira', icon: <SolarServer className="w-3.5 h-3.5" /> }
    ]
  },
  {
    label: 'Backgrounds',
    children: [
      { value: 'bg:squares', label: 'Squares', icon: <SolarSliders className="w-3.5 h-3.5" /> },
      { value: 'bg:dots', label: 'DotGrid', icon: <SolarSliders className="w-3.5 h-3.5" /> },
      { value: 'bg:aurora', label: 'Aurora', icon: <SolarSliders className="w-3.5 h-3.5" /> }
    ]
  }
];
const PAD = 6;
const MARK = 16;

const renderIcon = (icon: ReactNode) => icon;
const toSet = (open: number | number[]) => new Set(Array.isArray(open) ? open : open >= 0 ? [open] : []);

const BranchedMenu: React.FC<BranchedMenuProps> = ({
  items = DEFAULT_ITEMS,
  defaultOpen = 0,
  defaultActive = '',
  activeValue,
  scrollProgress,
  onSelect,
  onToggle,
  color = '#ffffff',
  accentColor = '#f97316',
  lineColor = 'rgba(255, 255, 255, 0.24)',
  width = 220,
  rowHeight = 34,
  indent = 36,
  trunk = 12,
  radius = 10,
  lineWidth = 1.5,
  fontSize = 13,
  drawDuration = 400,
  foldDuration = 300,
  className = ''
}) => {
  const [open, setOpen] = useState<Set<number>>(() => toSet(defaultOpen));
  const [internalActive, setInternalActive] = useState(() => {
    if (defaultActive) return defaultActive;
    const first = items.find((it, i) => it.children && toSet(defaultOpen).has(i));
    return first?.children?.[0]?.value ?? '';
  });

  const active = activeValue !== undefined ? activeValue : internalActive;

  const navRef = useRef<HTMLElement>(null);
  const heads = useRef<(HTMLButtonElement | null)[]>([]);
  const markerRef = useRef<HTMLSpanElement>(null);
  const latest = useRef<{ onSelect?: BranchedMenuProps['onSelect']; onToggle?: BranchedMenuProps['onToggle'] }>({});

  useEffect(() => {
    latest.current = { onSelect, onToggle };
  }, [onSelect, onToggle]);

  const activeSection = items.findIndex(it => it.children?.some(kid => kid.value === active));
  const markerShown = activeSection >= 0 && open.has(activeSection);
  useLayoutEffect(() => {
    const place = (glide: boolean) => {
      const m = markerRef.current;
      const el = heads.current[activeSection];
      if (!m) return;
      const on = markerShown && el;
      if (!glide) m.style.transition = 'none';
      if (on) m.style.top = `${el.offsetTop + (el.offsetHeight - MARK) / 2}px`;
      m.toggleAttribute('data-on', Boolean(on));
      if (!glide) {
        void m.offsetHeight;
        m.style.transition = '';
      }
    };
    place(true);
    let first = true;
    const ro = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      place(false);
    });
    if (navRef.current) ro.observe(navRef.current);
    return () => ro.disconnect();
  }, [activeSection, markerShown, items, fontSize, rowHeight]);

  const select = (value: string, item: BranchedMenuChild | BranchedMenuItem) => {
    setInternalActive(value);
    latest.current.onSelect?.(value, item);
  };
  const toggle = (i: number) => {
    setOpen(prev => {
      const next = new Set(prev);
      const isOpen = !next.has(i);
      if (isOpen) next.add(i);
      else next.delete(i);
      latest.current.onToggle?.(i, isOpen);
      return next;
    });
  };

  const r = Math.min(radius, rowHeight / 2 - 2);
  const endX = indent - 8;
  const rowY = (k: number) => PAD + k * rowHeight + rowHeight / 2;
  const branch = (k: number) => `M ${trunk} ${rowY(k) - r} A ${r} ${r} 0 0 0 ${trunk + r} ${rowY(k)} H ${endX}`;
  const reach = (k: number) => `M ${trunk} 0 V ${rowY(k) - r} A ${r} ${r} 0 0 0 ${trunk + r} ${rowY(k)} H ${endX}`;
  const length = (k: number) => rowY(k) - r + (Math.PI * r) / 2 + (endX - trunk - r);

  return (
    <nav
      ref={navRef}
      className={`relative flex w-fit max-w-[min(var(--bm-w),100%)] flex-col pl-3.5 leading-[1.2] [color:var(--bm-ink)] [font-family:inherit] [font-size:var(--bm-font)] before:absolute before:top-2 before:bottom-0 before:left-0 before:w-0.5 before:rounded-[1px] before:[background:linear-gradient(to_bottom,var(--bm-line)_0%,var(--bm-line)_55%,transparent_100%)] before:content-['']${className ? ` ${className}` : ''}`}
      style={
        {
          '--bm-w': `${width}px`,
          '--bm-ink': color,
          '--bm-accent': accentColor,
          '--bm-line': lineColor,
          '--bm-font': `${fontSize}px`,
          '--bm-row': `${rowHeight}px`,
          '--bm-indent': `${indent}px`,
          '--bm-line-w': lineWidth,
          '--bm-draw': `${drawDuration}ms`,
          '--bm-muted': `color-mix(in srgb, ${color} 55%, transparent)`,
          '--bm-fold': `${foldDuration}ms`
        } as CSSProperties
      }
    >
      {typeof scrollProgress === 'number' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2 bottom-0 left-0 w-0.5 origin-top rounded-[1px] [background:linear-gradient(to_bottom,var(--bm-accent)_0%,var(--bm-accent)_82%,transparent_100%)] [transition:transform_120ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{
            transform: `scaleY(${Math.max(0.06, Math.min(1, scrollProgress))})`,
          }}
        />
      ) : null}
      <span
        ref={markerRef}
        className="absolute -top-px left-0 z-[1] h-4 w-0.5 rounded-[1px] opacity-0 [background:var(--bm-accent)] [transition:top_240ms_cubic-bezier(0.22,1,0.36,1),opacity_180ms_ease] data-[on]:opacity-100 motion-reduce:[transition:opacity_150ms_ease]"
        aria-hidden="true"
      />
      {items.map((item, i) => {
        const kids = item.children;
        const isOpen = kids ? open.has(i) : false;
        const leafValue = item.value ?? item.label;
        const leafActive = !kids && leafValue === active;
        const bodyH = kids ? PAD * 2 + kids.length * rowHeight : 0;
        return (
          <div
            key={item.value ?? item.label}
            className="group/section flex flex-col"
            data-open={isOpen ? '' : undefined}
          >
            <button
              ref={el => {
                heads.current[i] = el;
              }}
              type="button"
              aria-label={item.label}
              className="m-0 block cursor-pointer border-0 bg-transparent py-[9px] text-left font-semibold outline-none [color:var(--bm-muted)] [font-family:inherit] [font-size:calc(var(--bm-font)+1px)] [text-shadow:0_1px_4px_rgba(10,10,10,0.95),0_0_12px_rgba(10,10,10,0.85)] [-webkit-tap-highlight-color:transparent] [transition:color_220ms_cubic-bezier(0.22,1,0.36,1)] group-data-[open]/section:[color:var(--bm-ink)] data-[active]:[color:var(--bm-ink)] hover:[color:var(--bm-ink)]"
              aria-expanded={kids ? isOpen : undefined}
              aria-current={leafActive ? 'true' : undefined}
              data-active={leafActive ? '' : undefined}
              onClick={() => (kids ? toggle(i) : select(leafValue, item))}
            >
              {item.labelNode ?? item.label}
            </button>
            {kids ? (
              <div className="grid [grid-template-rows:0fr] [transition:grid-template-rows_var(--bm-fold)_cubic-bezier(0.22,1,0.36,1)] group-data-[open]/section:[grid-template-rows:1fr] motion-reduce:transition-none">
                <div className="min-h-0 overflow-hidden">
                  <div className="relative box-border py-1.5" style={{ height: bodyH }}>
                    <svg
                      className="pointer-events-none absolute top-0 left-0 overflow-visible opacity-0 [transition:opacity_200ms_ease] group-data-[open]/section:opacity-100 group-data-[open]/section:[transition:opacity_250ms_ease_100ms]"
                      width={indent}
                      height={bodyH}
                      aria-hidden="true"
                    >
                      <path
                        className="fill-none [stroke:var(--bm-line)] [stroke-width:var(--bm-line-w)] [stroke-linecap:round] [stroke-linejoin:round]"
                        d={`M ${trunk} 0 V ${rowY(kids.length - 1) - r}`}
                      />
                      {kids.map((kid, k) => (
                        <path
                          key={kid.value}
                          className="fill-none [stroke:var(--bm-line)] [stroke-width:var(--bm-line-w)] [stroke-linecap:round] [stroke-linejoin:round]"
                          d={branch(k)}
                        />
                      ))}
                      {kids.map((kid, k) => {
                        const isKidActive = kid.value === active;
                        return (
                          <g key={kid.value}>
                            <path
                              className="fill-none [stroke:var(--bm-accent)] [stroke-width:var(--bm-line-w)] [stroke-linecap:round] [stroke-linejoin:round] [transition:stroke-dashoffset_var(--bm-draw)_cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                              d={reach(k)}
                              style={{
                                strokeDasharray: length(k),
                                strokeDashoffset: isKidActive ? 0 : length(k)
                              }}
                            />
                            <circle
                              cx={endX}
                              cy={rowY(k)}
                              r={isKidActive ? 5 : 0}
                              className="fill-[var(--bm-accent)] opacity-25 [transition:r_220ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                            />
                            <circle
                              cx={endX}
                              cy={rowY(k)}
                              r={isKidActive ? 2.5 : 0}
                              className="fill-[var(--bm-accent)] [transition:r_220ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                            />
                          </g>
                        );
                      })}
                    </svg>
                    {kids.map(kid => (
                      <button
                        key={kid.value}
                        type="button"
                        className="group/kid m-0 box-border flex w-full cursor-pointer items-center gap-2 border-0 bg-transparent py-0 pr-0 text-left font-medium outline-none [height:var(--bm-row)] [padding-left:var(--bm-indent)] [color:var(--bm-muted)] [font-family:inherit] [text-shadow:0_1px_3px_rgba(10,10,10,0.95),0_0_10px_rgba(10,10,10,0.85)] [-webkit-tap-highlight-color:transparent] [transition:color_220ms_cubic-bezier(0.22,1,0.36,1)] hover:[color:var(--bm-ink)] data-[active]:font-semibold data-[active]:text-white"
                        aria-current={kid.value === active ? 'true' : undefined}
                        data-active={kid.value === active ? '' : undefined}
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() => select(kid.value, kid)}
                      >
                        {kid.icon ? (
                          <span
                            className="inline-flex flex-none transition-colors duration-200 group-data-[active]/kid:[color:var(--bm-accent)]"
                            aria-hidden="true"
                          >
                            {renderIcon(kid.icon)}
                          </span>
                        ) : null}
                        <span className="whitespace-nowrap">{kid.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
};

export default BranchedMenu;

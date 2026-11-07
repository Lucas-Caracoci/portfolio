"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Initialize single Lenis instance unconditionally so Windows OS visual-effects settings never kill smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      anchors: true,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleCustomScroll = (e: Event) => {
      const customEvent = e as CustomEvent<{ target: string | number }>;
      const target = customEvent.detail?.target;
      if (target === 0) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else if (typeof target === "string") {
        const el = document.getElementById(target);
        if (el) {
          lenis.scrollTo(el, { offset: -24, duration: 1.2 });
        }
      }
    };

    window.addEventListener("portfolio:scroll-to", handleCustomScroll);

    return () => {
      window.removeEventListener("portfolio:scroll-to", handleCustomScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}

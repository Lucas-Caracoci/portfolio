"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenisVelocity?: number;
  }
}

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    window.__lenisVelocity = 0;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      anchors: true,
    });

    lenis.on("scroll", (e: { velocity: number }) => {
      window.__lenisVelocity = e.velocity;
      ScrollTrigger.update();
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleCustomScroll = (e: Event) => {
      const customEvent = e as CustomEvent<{ target: string | number }>;
      const target = customEvent.detail?.target;
      if (target === 0) {
        lenis.scrollTo(0, { duration: 1.15 });
      } else if (typeof target === "string") {
        const el = document.getElementById(target);
        if (el) {
          lenis.scrollTo(el, { offset: -20, duration: 1.15 });
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

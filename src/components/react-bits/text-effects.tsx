"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const baseCurve = [0.22, 1, 0.36, 1] as const;

interface BlurTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delayStep?: number;
  initialDelay?: number;
}

export function BlurText({
  text,
  className = "",
  wordClassName = "",
  delayStep = 0.045,
  initialDelay = 0.05,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const words = text.split(" ");

  return (
    <span ref={ref} aria-label={text} className={`inline ${className}`}>
      <span aria-hidden="true" className="inline">
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 12, filter: "blur(8px)" }
            }
            transition={{
              duration: 0.5,
              delay: initialDelay + index * delayStep,
              ease: baseCurve,
            }}
            className={`inline-block will-change-transform ${wordClassName}`}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

interface ShinyTextProps {
  text: string;
  className?: string;
  speedSeconds?: number;
}

export function ShinyText({
  text,
  className = "",
  speedSeconds = 4,
}: ShinyTextProps) {
  return (
    <span
      className={`rb-shiny-text inline-block ${className}`}
      style={{ animationDuration: `${speedSeconds}s` }}
    >
      {text}
    </span>
  );
}

export { default as TechText } from "./TechText";
export type { TechTextProps } from "./TechText";

interface DecryptedTextProps {
  text: string;
  className?: string;
  animateOn?: "view" | "hover";
}

const CIPHER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/•#";

export function DecryptedText({
  text,
  className = "",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<number | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const triggerScramble = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    let iteration = 0;
    const totalIterations = Math.min(text.length, 18);
    const step = Math.max(1, text.length / totalIterations);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
          })
          .join("")
      );

      iteration += step;
      if (iteration >= text.length) {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(text);
      }
    }, 26);
  }, [text]);

  useEffect(() => {
    if (animateOn === "view" && isInView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      triggerScramble();
    }
  }, [isInView, animateOn, triggerScramble]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-label={text}
      onMouseEnter={triggerScramble}
      className={`inline-block font-mono ${className}`}
    >
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
}

interface CountUpProps {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
}

export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let rafId: number;
    const duration = 900;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(to * eased);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setValue(to);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, to]);

  const formatted = (() => {
    const fixed = value.toFixed(decimals);
    if (!separator) return fixed;
    const parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join(".");
  })();

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

interface ScrollRevealProps {
  lines: string[];
  className?: string;
}

export function ScrollReveal({ lines, className = "" }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const allWords = lines.flatMap((line, lineIdx) =>
    line.split(" ").map((word, wordIdx, arr) => ({
      word,
      isLineEnd: wordIdx === arr.length - 1 && lineIdx < lines.length - 1,
    }))
  );

  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let isIntersecting = false;

    const updateProgress = () => {
      rafId = null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Trigger line moves from 85% viewport height to 28% viewport height
      const startY = vh * 0.85;
      const endY = vh * 0.25;
      const rawProgress = (startY - rect.top) / (startY - endY);
      const clamped = Math.max(0, Math.min(1, rawProgress));
      const nextCount = Math.round(clamped * allWords.length);
      setActiveCount(nextCount);
    };

    const onScroll = () => {
      if (!isIntersecting || rafId !== null) return;
      rafId = requestAnimationFrame(updateProgress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0]?.isIntersecting ?? false;
        if (isIntersecting) {
          updateProgress();
        }
      },
      { threshold: 0, rootMargin: "120px 0px" }
    );

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [allWords.length]);

  const fullLabel = lines.join(" ");

  return (
    <div ref={containerRef} className={className}>
      <p
        aria-label={fullLabel}
        className="text-4xl sm:text-5xl font-bold tracking-tight max-w-[680px] text-balance"
      >
        <span aria-hidden="true">
          {allWords.map((item, idx) => {
            const isActivated = idx < activeCount;
            return (
              <span key={`${item.word}-${idx}`}>
                <span
                  className={`inline-block transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActivated
                      ? "text-[#fff7ed] opacity-100"
                      : "text-[#fed7aa] opacity-25"
                  }`}
                >
                  {item.word}
                </span>
                {item.isLineEnd ? <br /> : " "}
              </span>
            );
          })}
        </span>
      </p>
    </div>
  );
}


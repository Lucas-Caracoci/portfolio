"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  useCallback,
  type ReactNode,
} from "react";

export type ThemeMode = "dark" | "light";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

function subscribeTheme(callback: () => void) {
  window.addEventListener("portfolio:theme-change", callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMedia = () => {
    const saved = localStorage.getItem("portfolio-v3-theme");
    if (!saved) {
      const next: ThemeMode = media.matches ? "dark" : "light";
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(next);
      callback();
    }
  };
  media.addEventListener("change", handleMedia);
  return () => {
    window.removeEventListener("portfolio:theme-change", callback);
    media.removeEventListener("change", handleMedia);
  };
}

function getThemeSnapshot(): ThemeMode {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function getServerSnapshot(): ThemeMode {
  return "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    // Sync initial browser preference if not yet set on html
    const root = document.documentElement;
    if (!root.classList.contains("dark") && !root.classList.contains("light")) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(prefersDark ? "dark" : "light");
      window.dispatchEvent(new Event("portfolio:theme-change"));
    }
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    localStorage.setItem("portfolio-v3-theme", mode);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
    window.dispatchEvent(new Event("portfolio:theme-change"));
  }, []);

  const toggleTheme = useCallback(() => {
    const current = getThemeSnapshot();
    setTheme(current === "dark" ? "light" : "dark");
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// components/portfolio/theme.tsx
// Light / dark mode. Defaults to the visitor's system setting, remembers an
// explicit choice, and toggles the `dark` class on <html> (Tailwind darkMode: "class").
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("theme");
    } catch {}
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(saved === "dark" || saved === "light" ? saved : system);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggle = () =>
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {}
      return next;
    });

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);

/** Sun ↔ moon switch for the top nav. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="relative flex h-7 w-12 items-center rounded-full bg-scrap-rose/15 px-0.5 transition-colors dark:bg-white/15"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] shadow dark:bg-[#2A2240] ${dark ? "ml-auto" : ""}`}
      >
        {dark ? "🌙" : "☀️"}
      </motion.span>
    </button>
  );
}

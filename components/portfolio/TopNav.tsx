// components/portfolio/TopNav.tsx
// Floating pill nav (tanvishiyekar.com style): avatar + name, section links,
// and live Dublin time + weather. Collapses to a menu button on mobile.
"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useClock, useDublinWeather } from "./useDublin";
import { ThemeToggle } from "./theme";

const LINKS = [
  { id: "about", label: "About" },
  { id: "impact", label: "Numbers" },
  { id: "project", label: "Projects" },
  { id: "education", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function TopNav() {
  const time = useClock();
  const weather = useDublinWeather();
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-x-0 top-3 z-50 flex justify-center px-4">
      <nav
        aria-label="Sections"
        className="relative flex items-center gap-3 rounded-full border border-white/70 dark:border-white/15 bg-white/80 dark:bg-[#211b2e]/80 transition-colors duration-500 py-1.5 pl-1.5 pr-3 font-sans text-sm text-ink dark:text-[#F3E9EE] shadow-[0_8px_30px_rgba(168,66,94,0.15)] backdrop-blur-xl"
      >
        <button onClick={() => go("about")} className="flex items-center gap-2" aria-label="Back to top">
          <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-scrap-pink/50">
            <Image src="/images/illustrated-avatar.jpg" alt="" fill sizes="36px" className="object-cover" />
          </span>
          <span className="font-semibold">Khushi</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="rounded-full px-3 py-1.5 text-inksoft dark:text-[#B9A9B8] transition-colors hover:bg-scrap-rose/10 hover:text-scrap-rosedark dark:hover:text-[#E07A98]"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="/cv"
          className="hidden rounded-full border border-scrap-rose/40 px-3 py-1 text-xs font-medium text-scrap-rosedark transition-colors hover:bg-scrap-rose hover:text-white dark:text-[#D98DA0] sm:inline-block"
        >
          Résumé
        </a>

        <span className="hidden h-5 w-px bg-line dark:bg-white/15 sm:block" aria-hidden />
        <span className="hidden items-center gap-1.5 whitespace-nowrap text-xs text-inksoft dark:text-[#B9A9B8] sm:flex" title="Local time in Dublin, Ireland">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          Dublin {time}
          {weather && (
            <span>
              · {weather.emoji} {weather.temp}°
            </span>
          )}
        </span>

        <ThemeToggle />

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Open menu"
          className="ml-1 flex h-8 w-8 flex-col items-center justify-center gap-1 rounded-full hover:bg-scrap-rose/10 lg:hidden"
        >
          <span className="h-0.5 w-5 bg-ink/70 dark:bg-[#F3E9EE]/80" />
          <span className="h-0.5 w-5 bg-ink/70 dark:bg-[#F3E9EE]/80" />
          <span className="h-0.5 w-5 bg-ink/70 dark:bg-[#F3E9EE]/80" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="absolute right-0 top-14 w-48 rounded-2xl border border-white/70 dark:border-white/15 bg-white/95 dark:bg-[#211b2e]/95 p-2 shadow-xl lg:hidden"
            >
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="w-full rounded-xl px-3 py-2 text-left hover:bg-scrap-rose/10 hover:text-scrap-rosedark dark:hover:text-[#E07A98]"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="/cv" className="block w-full rounded-xl px-3 py-2 text-left font-medium text-scrap-rosedark hover:bg-scrap-rose/10 dark:text-[#D98DA0]">
                  Résumé (recruiter view)
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

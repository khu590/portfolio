// components/portfolio/PortfolioPage.tsx
// The portfolio behind the landing page: card layout on a
// blush dotted grid over a seasonal New York backdrop, with a floating nav and a lo-fi toggle.
"use client";

import { useEffect } from "react";
import TopNav from "./TopNav";
import Butterflies from "./Butterflies";
import SeasonalBackdrop, { SeasonPicker, SeasonProvider, useSeason } from "./SeasonalBackdrop";
import { ThemeProvider } from "./theme";
import Cursor from "./Cursor";
import { useLofi } from "./JazzPlayer";
import { Hero, Impact, Journey, Skills, Credentials, Contact } from "./Sections";
import ProjectsFolder from "./ProjectsFolder";

function MusicButton() {
  const { playing, toggle } = useLofi();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Pause lo-fi music" : "Play lo-fi music"}
      title={playing ? "Pause lo-fi" : "Play some lo-fi"}
      className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/90 dark:bg-[#2A2240]/90 text-xl shadow-[0_8px_24px_rgba(168,66,94,0.2)] backdrop-blur transition-transform hover:scale-105"
    >
      {playing ? (
        <span className="flex h-5 items-end gap-[3px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[3px] animate-pulse rounded bg-scrap-rose"
              style={{ height: `${8 + ((i * 5) % 12)}px`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      ) : (
        <span aria-hidden>🎧</span>
      )}
    </button>
  );
}

// butterflies only belong in the warmer months
function SeasonalButterflies() {
  const { season } = useSeason();
  return season === "spring" || season === "summer" ? <Butterflies /> : null;
}

export default function PortfolioPage({ initialTarget }: { initialTarget?: string }) {
  useEffect(() => {
    document.body.style.overflow = "auto";
    if (!initialTarget) return;
    const t = setTimeout(() => document.getElementById(initialTarget)?.scrollIntoView({ behavior: "smooth" }), 500);
    return () => clearTimeout(t);
  }, [initialTarget]);

  return (
    <ThemeProvider>
    <SeasonProvider>
    <div className="dot-grid relative min-h-screen font-sans text-ink dark:text-[#F3E9EE]">
      <SeasonalBackdrop />
      <SeasonalButterflies />
      <TopNav />
      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col gap-16 px-4 pb-24 md:gap-24">
        <Hero />
        <Impact />
        <ProjectsFolder />
        <Journey />
        <Skills />
        <Credentials />
        <Contact />
      </div>
      <MusicButton />
      <SeasonPicker />
      <Cursor />
    </div>
    </SeasonProvider>
    </ThemeProvider>
  );
}

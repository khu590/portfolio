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
import Lanyards from "./Lanyards";
import { profile } from "@/lib/data";

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
        <Lanyards />
        <Contact />
      </div>
      <MusicButton />
      <SeasonPicker />
      <a
        href={profile.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Message Khushi on WhatsApp (${profile.phone})`}
        title={`WhatsApp ${profile.phone}`}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={"h-7 w-7"}><path d="M16 2.7C8.6 2.7 2.7 8.6 2.7 16c0 2.3.6 4.6 1.8 6.5L2.7 29.3l7.1-1.7A13.3 13.3 0 0 0 16 29.3c7.4 0 13.3-6 13.3-13.3S23.4 2.7 16 2.7Zm0 24c-2.1 0-4.1-.6-5.8-1.6l-.4-.2-4.2 1 1-4.1-.3-.4A10.6 10.6 0 0 1 5.3 16C5.3 10.1 10.1 5.3 16 5.3S26.7 10.1 26.7 16 21.9 26.7 16 26.7Zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.3-.1.2-.3.2-.6.1-.3-.2-1.3-.5-2.6-1.6-1-.8-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.3 3.4 5.5 4.8.8.3 1.4.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4Z"/></svg>
      </a>
      <Cursor />
    </div>
    </SeasonProvider>
    </ThemeProvider>
  );
}

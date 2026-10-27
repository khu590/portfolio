// components/portfolio/SeasonalBackdrop.tsx
// Page background only: a soft New York skyline with Central Park trees along
// the bottom, tinted by season, plus falling petals / leaves / snow. The
// season follows today's date in Dublin, with a small picker to preview the
// others. Cards sit above this, so it stays faint and decorative.
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "./theme";
import { useDublinWeather } from "./useDublin";

export type Season = "spring" | "summer" | "autumn" | "winter";

export const SEASONS: { id: Season; label: string; icon: string }[] = [
  { id: "spring", label: "Spring", icon: "🌸" },
  { id: "summer", label: "Summer", icon: "☀️" },
  { id: "autumn", label: "Autumn", icon: "🍂" },
  { id: "winter", label: "Winter", icon: "❄️" },
];

function seasonFromDate(): Season {
  const m = Number(new Intl.DateTimeFormat("en-IE", { timeZone: "Europe/Dublin", month: "numeric" }).format(new Date()));
  // Irish calendar: spring Feb-Apr, summer May-Jul, autumn Aug-Oct, winter Nov-Jan
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "autumn";
  return "winter";
}

const SeasonCtx = createContext<{ season: Season; setSeason: (s: Season) => void }>({
  season: "autumn",
  setSeason: () => {},
});

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeason] = useState<Season>("autumn");
  useEffect(() => setSeason(seasonFromDate()), []);
  return <SeasonCtx.Provider value={{ season, setSeason }}>{children}</SeasonCtx.Provider>;
}

export const useSeason = () => useContext(SeasonCtx);

/* ── palette per season: sky wash, tree canopy, particles ── */
const LOOK: Record<Season, { sky: [string, string]; trees: string[]; particles: string[]; glow?: string }> = {
  spring: { sky: ["#FCE8EE", "#F6EEF6"], trees: ["#F4B6C8", "#EFA0B8", "#F8CCD8"], particles: ["#F4B6C8", "#FAD1DC", "#EFA0B8"] },
  summer: { sky: ["#FFF1DD", "#F3F0E6"], trees: ["#9CC59A", "#86B886", "#B3D3A6"], particles: [], glow: "#FFD98A" },
  autumn: { sky: ["#FBE7D6", "#F5ECE4"], trees: ["#E39A4F", "#D2693F", "#E8B25A", "#C85C3D"], particles: ["#E39A4F", "#D2693F", "#E8B25A", "#C85C3D"] },
  winter: { sky: ["#EEF1F6", "#F4F1F2"], trees: [], particles: ["#FFFFFF"] },
};

/* ── deterministic skyline so server and client render the same ── */
const W = 1440;
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
type Tower = { x: number; w: number; h: number; top: "flat" | "spire" | "step" };
const SKY = (() => {
  const r = rng(11);
  const towers: Tower[] = [];
  for (let x = 0; x < W; ) {
    const w = 28 + Math.floor(r() * 44);
    const tall = r() < 0.14;
    towers.push({ x, w, h: tall ? 170 + r() * 80 : 50 + r() * 110, top: tall ? (r() < 0.6 ? "spire" : "step") : "flat" });
    x += w + 2 + Math.floor(r() * 4);
  }
  const windows: { x: number; y: number }[] = [];
  towers.forEach((t) => {
    for (let wy = 260 - t.h + 12; wy < 236; wy += 13) {
      for (let wx = t.x + 6; wx < t.x + t.w - 6; wx += 10) if (r() < 0.2) windows.push({ x: wx, y: wy });
    }
  });
  const trees: { x: number; r: number; c: number }[] = [];
  for (let x = 10; x < W; x += 22 + Math.floor(r() * 18)) trees.push({ x, r: 14 + r() * 12, c: Math.floor(r() * 4) });
  const parts = Array.from({ length: 34 }, () => ({
    left: r() * 100,
    delay: r() * 14,
    dur: 9 + r() * 12,
    size: 6 + r() * 9,
    sway: 30 + r() * 90,
    c: Math.floor(r() * 4),
  }));
  // Christmas lights: a sagging string between rooftops
  const bulbs = Array.from({ length: 48 }, (_, i) => {
    const x = 15 + i * 30;
    const sag = Math.sin(((i % 8) / 8) * Math.PI) * 14;
    return { x, y: 70 + sag, c: i % 4, d: (i % 6) * 0.25 };
  });
  const drops = Array.from({ length: 70 }, () => ({ left: r() * 100, delay: r() * 2, dur: 0.6 + r() * 0.5, len: 14 + r() * 16 }));
  return { towers, windows, trees, parts, bulbs, drops };
})();

function Particle({ season, p, color }: { season: Season; p: (typeof SKY.parts)[number]; color: string }) {
  const shape =
    season === "winter" ? (
      <circle cx="5" cy="5" r="3" fill={color} />
    ) : season === "spring" ? (
      <path d="M5 0 C 8 2, 8 7, 5 10 C 2 7, 2 2, 5 0 Z" fill={color} />
    ) : (
      <path d="M5 0 L7 4 L10 4.5 L7.5 7 L8 10 L5 8.5 L2 10 L2.5 7 L0 4.5 L3 4 Z" fill={color} />
    );
  return (
    <svg
      className={`${season === "autumn" ? "season-tumble" : "season-fall"} absolute top-[-20px]`}
      width={p.size}
      height={p.size}
      viewBox="0 0 10 10"
      style={{
        left: `${p.left}%`,
        animationDuration: `${p.dur}s`,
        animationDelay: `-${p.delay}s`,
        ["--sway" as string]: `${p.sway}px`,
        opacity: season === "winter" ? 0.9 : 0.75,
      }}
    >
      {shape}
    </svg>
  );
}

export default function SeasonalBackdrop() {
  const { season } = useSeason();
  const weather = useDublinWeather();
  const raining = !!weather?.rain;
  const night = useTheme().theme === "dark";
  const reduce = useReducedMotion();
  const look = LOOK[season];
  const building = night ? "#3A2E4F" : "#C9A9B4";
  const ground = 260;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* faint seasonal sky wash (light mode only; dark keeps the plum page) */}
      {!night && (
        <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{ background: `linear-gradient(to bottom, ${look.sky[0]}99, transparent 45%, ${look.sky[1]}66)` }}
        />
      )}
      {/* summer: a proper sun with slowly turning rays */}
      {season === "summer" && !raining && (
        <div className="absolute right-[6%] top-[12%]">
          <div className="absolute -inset-24 rounded-full blur-3xl" style={{ background: look.glow, opacity: night ? 0.12 : 0.45 }} />
          <svg width="160" height="160" viewBox="-80 -80 160 160" className={reduce ? "" : "season-spin"} style={{ opacity: night ? 0.25 : 0.7 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x={-2} y={-74} width={4} height={18} rx={2} fill="#F7B500" transform={`rotate(${i * 30})`} />
            ))}
            <circle r="40" fill="#FFD98A" />
            <circle r="30" fill="#FFE6A8" />
          </svg>
        </div>
      )}

      {/* skyline + Central Park trees */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[150px] w-full md:h-[220px]"
        viewBox={`0 0 ${W} ${ground}`}
        preserveAspectRatio="xMidYMax slice"
        style={{ opacity: night ? 0.4 : 0.45 }}
      >
        {SKY.towers.map((t, i) => (
          <g key={i} fill={building}>
            <rect x={t.x} y={ground - t.h} width={t.w} height={t.h} />
            {t.top === "spire" && <rect x={t.x + t.w / 2 - 1.5} y={ground - t.h - 40} width={3} height={40} />}
            {t.top === "step" && (
              <>
                <rect x={t.x + t.w * 0.2} y={ground - t.h - 18} width={t.w * 0.6} height={18} />
                <rect x={t.x + t.w * 0.38} y={ground - t.h - 32} width={t.w * 0.24} height={14} />
              </>
            )}
          </g>
        ))}
        {night &&
          SKY.windows.map((w, i) => <rect key={i} x={w.x} y={w.y} width={4} height={6} fill="#FFD98A" opacity={0.6} />)}

        {/* winter: Christmas lights strung across the rooftops */}
        {season === "winter" && (
          <g>
            <path
              d={SKY.bulbs.map((b, i) => `${i ? "L" : "M"}${b.x} ${b.y - 3}`).join(" ")}
              stroke={night ? "#6B5B7F" : "#9C8585"}
              strokeWidth={1}
              fill="none"
            />
            {SKY.bulbs.map((b, i) => (
              <circle
                key={i}
                cx={b.x}
                cy={b.y}
                r={3.5}
                fill={["#E0453A", "#F7B500", "#3E9E6E", "#4A7BD0"][b.c]}
                className={reduce ? "" : "season-twinkle"}
                style={{ animationDelay: `${b.d}s` }}
              />
            ))}
          </g>
        )}

        {/* park: trunks + canopies (bare branches with snow in winter) */}
        {SKY.trees.map((t, i) => {
          const base = ground - 4;
          return (
            <g key={i}>
              <rect x={t.x - 1.5} y={base - t.r - 6} width={3} height={t.r + 10} fill={night ? "#2A2240" : "#8C6B6B"} opacity={0.8} />
              {season === "winter" ? (
                <>
                  <path
                    d={`M${t.x} ${base - t.r} l-${t.r * 0.6} -${t.r * 0.7} M${t.x} ${base - t.r - 4} l${t.r * 0.6} -${t.r * 0.8} M${t.x} ${base - t.r - 8} v-${t.r * 0.6}`}
                    stroke={night ? "#4A3D5F" : "#9C8585"}
                    strokeWidth={2}
                  />
                  <ellipse cx={t.x} cy={base - t.r * 1.5} rx={t.r * 0.5} ry={3} fill="#FFFFFF" opacity={0.8} />
                </>
              ) : (
                <circle cx={t.x} cy={base - t.r * 1.2} r={t.r} fill={look.trees[t.c % look.trees.length]} opacity={night ? 0.45 : 0.8} />
              )}
            </g>
          );
        })}
        <rect x={0} y={ground - 6} width={W} height={6} fill={season === "winter" ? "#FFFFFF" : night ? "#2A2240" : "#D9B9A9"} opacity={0.9} />
      </svg>

      {/* falling petals / leaves / snow (spring a little lighter) */}
      {!reduce &&
        look.particles.length > 0 &&
        SKY.parts
          .slice(0, season === "spring" ? 22 : SKY.parts.length)
          .map((p, i) => <Particle key={`${season}-${i}`} season={season} p={p} color={look.particles[p.c % look.particles.length]} />)}

      {/* live Dublin weather: rain streaks when it's actually raining */}
      {raining && !reduce && (
        <div className="absolute inset-0">
          {SKY.drops.map((d, i) => (
            <span
              key={i}
              className="season-rain absolute top-[-40px] w-px rounded-full"
              style={{
                left: `${d.left}%`,
                height: `${d.len}px`,
                animationDuration: `${d.dur}s`,
                animationDelay: `-${d.delay}s`,
                background: night ? "rgba(200,190,230,0.45)" : "rgba(120,110,150,0.35)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Small round season picker, sits above the music button. */
export function SeasonPicker() {
  const { season, setSeason } = useSeason();
  const [open, setOpen] = useState(false);
  const current = SEASONS.find((s) => s.id === season)!;
  return (
    <div className="fixed bottom-24 left-5 z-50 flex flex-col-reverse items-center gap-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Season: ${current.label}. Change season`}
        title="Change season"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-lg shadow-[0_8px_24px_rgba(168,66,94,0.2)] backdrop-blur transition-transform hover:scale-105 dark:bg-[#2A2240]/90"
      >
        {current.icon}
      </button>
      {open &&
        SEASONS.filter((s) => s.id !== season).map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSeason(s.id);
              setOpen(false);
            }}
            aria-label={`Show ${s.label}`}
            title={s.label}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-base shadow backdrop-blur hover:scale-105 dark:bg-[#2A2240]/90"
          >
            {s.icon}
          </button>
        ))}
    </div>
  );
}

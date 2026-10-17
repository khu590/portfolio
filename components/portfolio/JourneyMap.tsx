"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { experience, education, places } from "../../lib/data";
import { useTheme } from "./theme";

type PlaceKey = keyof typeof places;

type Stop = {
  id: string;
  kind: "work" | "education" | "move";
  title: string;
  org: string;
  date: string;
  sortDate: string;
  badge: string;
  current: boolean;
  place: PlaceKey;
  details: string[];
};

const ROSE = "#C85C7A";
const AMBER = "#E8A33D";

// Equirectangular projection into a 360 x 180 viewBox.
const project = (lat: number, lon: number) => ({ x: lon + 180, y: 90 - lat });

// Coarse land mask: ellipses in [lon, lat, rLon, rLat]. Light and abstract on purpose.
const LAND: [number, number, number, number][] = [
  [-100, 50, 32, 18], [-120, 62, 22, 10], [-75, 60, 14, 10], [-95, 30, 16, 12], [-100, 20, 8, 6],
  [-42, 72, 14, 9],
  [-60, -10, 17, 16], [-65, -32, 9, 16], [-72, 5, 8, 6],
  [-3, 54, 3, 4], [-8, 53, 1.8, 1.8], [10, 50, 14, 8], [25, 60, 14, 8], [15, 64, 6, 6], [-4, 40, 5, 4],
  [15, 15, 22, 14], [25, -5, 14, 14], [25, -25, 9, 9], [47, -19, 2, 6],
  [45, 25, 10, 8], [78, 20, 7, 10], [70, 35, 14, 8], [100, 55, 40, 14], [105, 32, 18, 12],
  [102, 12, 6, 8], [115, 0, 12, 5], [138, 37, 3, 6],
  [134, -25, 17, 11], [172, -42, 3, 4],
];

const isLand = (lon: number, lat: number) =>
  LAND.some(([cx, cy, rx, ry]) => ((lon - cx) / rx) ** 2 + ((lat - cy) / ry) ** 2 <= 1);

function buildDots() {
  const dots: { x: number; y: number }[] = [];
  for (let lat = 80; lat >= -56; lat -= 4) {
    for (let lon = -176; lon <= 180; lon += 4) {
      if (isLand(lon, lat)) dots.push(project(lat, lon));
    }
  }
  return dots;
}

function buildStops(): Stop[] {
  const work: Stop[] = experience.map((e) => ({
    id: `w-${e.sortDate}`,
    kind: "work",
    title: e.role,
    org: e.company,
    date: e.date,
    sortDate: e.sortDate,
    badge: e.badge,
    current: e.current,
    place: e.place,
    details: e.highlights,
  }));
  const edu: Stop[] = education.map((e) => ({
    id: `e-${e.sortDate}`,
    kind: "education",
    title: e.degree,
    org: e.school,
    date: e.date,
    sortDate: e.sortDate,
    badge: e.grade,
    current: e.current,
    place: e.place,
    details: e.modules.split(" · "),
  }));
  const move: Stop = {
    id: "move",
    kind: "move",
    title: "Moved to Dublin",
    org: "Bengaluru → Dublin",
    date: "Sept 2025",
    sortDate: "2025-08-99", // after Aug 2025, before Sept 2025 entries
    badge: "8,300 km",
    current: false,
    place: "dublin",
    details: [],
  };
  return [...work, ...edu, move].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
}

const B = project(places.bengaluru.lat, places.bengaluru.lon);
const D = project(places.dublin.lat, places.dublin.lon);
const C = { x: (B.x + D.x) / 2 - 6, y: Math.min(B.y, D.y) - 34 }; // arc control point
const ARC = `M ${B.x} ${B.y} Q ${C.x} ${C.y} ${D.x} ${D.y}`;

function bezier(t: number) {
  const u = 1 - t;
  const x = u * u * B.x + 2 * u * t * C.x + t * t * D.x;
  const y = u * u * B.y + 2 * u * t * C.y + t * t * D.y;
  const dx = 2 * u * (C.x - B.x) + 2 * t * (D.x - C.x);
  const dy = 2 * u * (C.y - B.y) + 2 * t * (D.y - C.y);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

// Viewport crop on the world (Americas trimmed so the route reads larger).
const VB = { x: 110, y: 10, w: 220, h: 110 };

function Pin({ x, y, active, current, label }: { x: number; y: number; active: boolean; current: boolean; label: string }) {
  const dark = useTheme().theme === "dark";
  return (
    <g transform={`translate(${x} ${y})`}>
      {current && (
        <circle r="3" fill={ROSE} opacity="0.35">
          <animate attributeName="r" values="2;9;2" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.45;0;0.45" dur="2.2s" repeatCount="indefinite" />
        </circle>
      )}
      <g transform={`scale(${active ? 1.35 : 1})`} style={{ transition: "transform 250ms" }}>
        <path d="M0 0 C -1.5 -3 -4 -4.6 -4 -7.6 A 4 4 0 1 1 4 -7.6 C 4 -4.6 1.5 -3 0 0 Z" fill={active ? "#A8425E" : ROSE} stroke="#fff" strokeWidth="0.8" />
        <circle cy="-7.6" r="1.5" fill="#fff" />
      </g>
      <text y="5.5" textAnchor="middle" className="font-sans" fontSize="3.6" fontWeight="600" fill={dark ? "#F3E9EE" : "#1C1B17"}>
        {label}
      </text>
    </g>
  );
}

export default function JourneyMap() {
  const dark = useTheme().theme === "dark";
  const reduce = useReducedMotion();
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapRef, { once: true, amount: 0.4 });
  const dots = useMemo(buildDots, []);
  const stops = useMemo(buildStops, []);
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [t, setT] = useState(reduce ? 1 : 0);

  useEffect(() => {
    if (reduce) {
      setT(1);
      return;
    }
    if (!inView) return;
    const ctl = animate(0, 1, { duration: 2.4, ease: "easeInOut", delay: 0.3, onUpdate: setT });
    return () => ctl.stop();
  }, [inView, reduce]);

  const sel = stops.find((s) => s.id === selected) ?? null;
  const activePlace: PlaceKey | null = sel ? sel.place : null;
  const plane = bezier(t);
  const tipStop = sel;
  const tipPos = activePlace ? project(places[activePlace].lat, places[activePlace].lon) : null;

  const cx = VB.x + VB.w / 2;
  const cy = VB.y + VB.h / 2;
  const w = VB.w / zoom;
  const h = VB.h / zoom;
  // Zoom toward the route midpoint so both pins stay in view.
  const fx = zoom > 1 ? (B.x + D.x) / 2 : cx;
  const fy = zoom > 1 ? (B.y + D.y) / 2 - 6 : cy;
  const viewBox = `${fx - w / 2} ${fy - h / 2} ${w} ${h}`;

  return (
    <section id="education">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-6 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-scrap-rosedark dark:text-[#D98DA0]">Bengaluru to Dublin</p>
          <h2 className="font-serif text-3xl font-semibold text-ink dark:text-[#F3E9EE] sm:text-4xl">Work and study</h2>
        </div>
        <div className="flex items-center gap-4 font-sans text-xs text-inksoft dark:text-[#B9A9B8]">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full" style={{ background: ROSE }} /> Work</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full" style={{ background: AMBER }} /> Education</span>
        </div>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* Map card */}
        <div ref={mapRef} className="relative self-start overflow-hidden rounded-[28px] bg-[#FBF6F1] dark:bg-[#2A2240] transition-colors duration-500 shadow-[0_10px_30px_-12px_rgba(168,66,94,0.25)] ring-1 ring-black/5 dark:ring-white/10">
          <div className="relative aspect-[2/1] w-full">
            <svg viewBox={viewBox} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label="Map of the route from Bengaluru, India to Dublin, Ireland" style={{ transition: "all 400ms" }}>
              <defs>
                <pattern id="jm-grid" width="15" height="15" patternUnits="userSpaceOnUse">
                  <path d="M15 0H0V15" fill="none" stroke="#C85C7A" strokeOpacity="0.07" strokeWidth="0.3" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="360" height="180" fill="url(#jm-grid)" />
              {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r="1.05" fill="#D98DA0" opacity="0.45" />
              ))}
              {/* Flight arc */}
              <path d={ARC} fill="none" stroke={ROSE} strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
              <path d={ARC} fill="none" stroke={ROSE} strokeWidth="1.1" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - t} />
              {t > 0 && t < 1 && (
                <text x={plane.x} y={plane.y} fontSize="6" textAnchor="middle" dominantBaseline="central" transform={`rotate(${plane.angle - 45} ${plane.x} ${plane.y})`}>
                  ✈
                </text>
              )}
              {t >= 1 && (
                <text x={(B.x + D.x) / 4 + C.x / 2} y={(B.y + D.y) / 4 + C.y / 2 + 7} textAnchor="middle" fontSize="3.6" fontWeight="600" fill={dark ? "#D98DA0" : "#A8425E"} className="font-mono">
                  8,300 km · Sept 2025
                </text>
              )}
              <Pin x={B.x} y={B.y} active={activePlace === "bengaluru"} current={false} label="Bengaluru" />
              <Pin x={D.x} y={D.y} active={activePlace === "dublin"} current label="Dublin" />
            </svg>

            {/* Tooltip card for the selected stop */}
            <AnimatePresence>
              {tipStop && tipPos && (
                <motion.div
                  key={tipStop.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute bottom-3 left-3 max-w-[240px] rounded-2xl bg-white/95 dark:bg-[#211b2e]/95 p-3 shadow-lg ring-1 ring-black/5 dark:ring-white/10"
                >
                  <p className="font-mono text-[10px] uppercase tracking-wider text-scrap-rosedark dark:text-[#D98DA0]">
                    📍 {places[tipStop.place].city}, {places[tipStop.place].country}
                  </p>
                  <p className="mt-1 font-sans text-sm font-semibold leading-snug text-ink dark:text-[#F3E9EE]">{tipStop.title}</p>
                  <p className="font-sans text-xs text-inksoft dark:text-[#B9A9B8]">{tipStop.org} · {tipStop.date}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Map chrome */}
            <span className="absolute left-3 top-3 rounded-full bg-white/95 dark:bg-[#211b2e]/95 px-3 py-1 font-sans text-xs font-semibold text-ink dark:text-[#F3E9EE] shadow ring-1 ring-black/5 dark:ring-white/10">
              📍 Now in Dublin
            </span>
            <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-xl bg-white/95 dark:bg-[#211b2e]/95 shadow ring-1 ring-black/5 dark:ring-white/10">
              <button type="button" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(2, z + 0.5))} className="h-8 w-8 font-sans text-lg leading-none text-ink dark:text-[#F3E9EE] hover:bg-scrap-cream dark:hover:bg-white/10">+</button>
              <span className="h-px bg-black/10 dark:bg-white/15" />
              <button type="button" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(1, z - 0.5))} className="h-8 w-8 font-sans text-lg leading-none text-ink dark:text-[#F3E9EE] hover:bg-scrap-cream dark:hover:bg-white/10">−</button>
            </div>
            <svg viewBox="-12 -12 24 24" className="absolute right-4 top-24 hidden h-10 w-10 sm:block" aria-hidden>
              <circle r="11" fill={dark ? "#211b2e" : "#fff"} fillOpacity="0.9" stroke={dark ? "#fff" : "#1C1B17"} strokeOpacity="0.1" />
              <path d="M0 -9 L2.5 0 L0 9 L-2.5 0 Z" fill={dark ? "#F3E9EE" : "#1C1B17"} fillOpacity="0.25" />
              <path d="M0 -9 L2.5 0 L-2.5 0 Z" fill={ROSE} />
              <text y="-3" x="5" fontSize="5" fontWeight="700" fill={dark ? "#F3E9EE" : "#1C1B17"}>N</text>
            </svg>
            <div className="absolute bottom-3 right-3 hidden items-end gap-2 rounded-lg bg-white/90 dark:bg-[#211b2e]/90 px-2 py-1 sm:flex" aria-hidden>
              <div className="flex flex-col items-start">
                <span className="font-mono text-[9px] text-inksoft dark:text-[#B9A9B8]">{Math.round(2000 / zoom).toLocaleString()} km</span>
                <span className="mt-0.5 h-1.5 w-16 border-x border-b border-ink/60 dark:border-white/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Directions panel */}
        <div className="rounded-[28px] bg-white/90 dark:bg-[#211b2e]/90 transition-colors duration-500 p-5 shadow-[0_10px_30px_-12px_rgba(168,66,94,0.25)] ring-1 ring-black/5 dark:ring-white/10 sm:p-6 lg:max-h-[440px] lg:overflow-y-auto lg:overscroll-contain">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-sans text-sm font-semibold text-ink dark:text-[#F3E9EE]">Bengaluru → Dublin</p>
            <span className="rounded-full bg-scrap-bg dark:bg-[#2A2240] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-inksoft dark:text-[#B9A9B8]">2019 → now</span>
          </div>
          <ol className="relative">
            <span aria-hidden className="absolute bottom-4 left-[9px] top-4 w-0.5 border-l-2 border-dotted border-scrap-pink/60" />
            {stops.map((s) => {
              const color = s.kind === "work" ? ROSE : s.kind === "education" ? AMBER : dark ? "#F3E9EE" : "#1C1B17";
              const isSel = selected === s.id;
              const isOpen = open === s.id;
              return (
                <li key={s.id} className="relative pb-3 pl-8 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute left-0 top-3 flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white dark:ring-[#211b2e]"
                    style={{ background: s.kind === "move" ? (dark ? "#211b2e" : "#fff") : color, border: s.kind === "move" ? `2px solid ${ROSE}` : undefined }}
                  >
                    {s.kind === "move" && <span className="text-[10px] leading-none">✈</span>}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelected(isSel ? null : s.id)}
                    aria-pressed={isSel}
                    className={`w-full rounded-2xl px-3 py-2 text-left transition ${isSel ? "bg-scrap-pink/15 ring-1 ring-scrap-rose/40" : "hover:bg-scrap-bg dark:hover:bg-white/10"}`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                      <span className="font-sans text-sm font-semibold text-ink dark:text-[#F3E9EE]">{s.title}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-inksoft dark:text-[#B9A9B8]">{s.date}</span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                      <span className="font-sans text-xs text-scrap-rosedark dark:text-[#D98DA0]">{s.org}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold ${
                          s.kind === "education" ? "bg-[#E8A33D]/20 text-[#7a5600] dark:text-[#F7B500]" : "bg-scrap-pink/25 dark:bg-[#D98DA0]/20 text-scrap-rosedark dark:text-[#D98DA0]"
                        }`}
                      >
                        {s.current ? "Now · " : ""}
                        {s.badge}
                      </span>
                    </div>
                  </button>
                  {s.details.length > 0 && (
                    <div className="px-3">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : s.id)}
                        aria-expanded={isOpen}
                        className="font-sans text-[11px] font-semibold text-scrap-rose dark:text-[#E07A98] hover:text-scrap-rosedark dark:hover:text-[#E07A98]"
                      >
                        {isOpen ? "Hide details" : s.kind === "education" ? "Modules" : "Details"} {isOpen ? "▴" : "▾"}
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            {s.kind === "education" ? (
                              <div className="flex flex-wrap gap-1.5 py-2">
                                {s.details.map((d) => (
                                  <span key={d} className="rounded-full bg-scrap-bg dark:bg-[#2A2240] px-2.5 py-0.5 font-sans text-[11px] text-inksoft dark:text-[#B9A9B8]">{d}</span>
                                ))}
                              </div>
                            ) : (
                              <ul className="space-y-1.5 py-2 font-sans text-xs leading-relaxed text-inksoft dark:text-[#B9A9B8]">
                                {s.details.map((d) => (
                                  <li key={d} className="flex gap-2">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-scrap-rose" />
                                    {d}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

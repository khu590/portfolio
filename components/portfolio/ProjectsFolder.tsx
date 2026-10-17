"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { projects } from "@/lib/data";

/** Placeholder cards shown while fewer than 3 real projects exist. Empty now that 3 real projects ship. */
const COMING_SOON: readonly string[] = [];

type Metric = { value: string; label: string };
type Project = {
  title: string;
  subtitle: string;
  description: string;
  stack: readonly string[];
  metrics: readonly Metric[];
  cover?: string;
  github?: string;
  demo?: string;
};

type Item = { kind: "project"; project: Project; index: number } | { kind: "soon"; label: string };

const PALETTE = [
  { from: "#C85C7A", to: "#D98DA0" },
  { from: "#E8A33D", to: "#F0C77A" },
  { from: "#A8425E", to: "#C85C7A" },
  { from: "#D98DA0", to: "#F0E4D0" },
  { from: "#A6A37C", to: "#D8D4B0" },
  { from: "#C85C7A", to: "#E8A33D" },
];

// Final (fanned) offsets in px around the folder centre, desktop only.
const SLOTS = [
  { x: -430, y: -160, r: -6 },
  { x: 430, y: -160, r: 6 },
  { x: -430, y: 180, r: 4 },
  { x: 430, y: 180, r: -4 },
  { x: -150, y: -260, r: -3 },
  { x: 150, y: -260, r: 3 },
];

function buildItems(): Item[] {
  const real: Item[] = (projects as readonly Project[]).slice(0, 6).map((p, i) => ({
    kind: "project",
    project: p,
    index: i,
  }));
  if (real.length >= 3) return real;
  const soon: Item[] = COMING_SOON.map((label) => ({ kind: "soon", label }));
  return [...real, ...soon].slice(0, 6);
}

/* ---------------- Folder ---------------- */

function Folder() {
  return (
    <div>
    <div className="relative mx-auto h-[220px] w-[290px] select-none md:h-[270px] md:w-[380px]" aria-hidden="true">
      {/* back + tab */}
      <div className="absolute left-0 top-0 h-10 w-[45%] rounded-t-2xl bg-gradient-to-b from-[#C85C7A] to-[#B9506D]" />
      <div className="absolute inset-x-0 bottom-0 top-6 rounded-2xl rounded-tl-none bg-gradient-to-b from-[#C85C7A] to-[#A8425E] shadow-[0_24px_50px_-20px_rgba(168,66,94,0.55)]" />
      {/* front flap */}
      <div className="absolute inset-x-0 bottom-0 top-14 overflow-hidden rounded-2xl bg-gradient-to-b from-[#E7A3B4] to-[#D98DA0] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_30px_-12px_rgba(168,66,94,0.5)]">
        {/* monogram */}
        <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-scrap-rosedark font-sans text-lg font-bold text-white shadow ring-2 ring-white/70 dark:ring-white/15">
          K
        </div>
        <div className="absolute left-4 top-16 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">Selected work</div>
      </div>
    </div>
    <p className="mt-4 text-center font-mono text-sm font-semibold uppercase tracking-[0.35em] text-scrap-rosedark dark:text-[#D98DA0] md:text-base" aria-hidden="true">
      My projects
    </p>
    </div>
  );
}

/* ---------------- Cards ---------------- */

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/10 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      <span className="ml-2 truncate font-mono text-[10px] text-muted dark:text-[#B9A9B8]">{title}</span>
    </div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const c = PALETTE[index % PALETTE.length];
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-[290px] sm:w-[340px] overflow-hidden rounded-2xl bg-white dark:bg-[#211b2e] text-left shadow-[0_18px_40px_-18px_rgba(28,27,23,0.35)] ring-1 ring-black/5 dark:ring-white/10 dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] transition-[transform,background-color,color] duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-18px_rgba(168,66,94,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-scrap-rose"
      aria-label={`Open project: ${project.title}`}
    >
      <WindowChrome title={project.title.toLowerCase().replace(/\s+/g, "-")} />
      {project.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.cover} alt="" className="h-44 w-full object-cover sm:h-52" />
      ) : (
        <div
          className="flex h-44 flex-col justify-end p-5 sm:h-52"
          style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
        >
          <h3 className="font-serif text-2xl leading-tight text-white drop-shadow-sm">{project.title}</h3>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-white/90">{project.subtitle}</p>
        </div>
      )}
      <div className="flex items-center justify-between px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-inksoft dark:text-[#B9A9B8]">View project</span>
        <span className="text-scrap-rose dark:text-[#E07A98] transition-transform group-hover:translate-x-1">→</span>
      </div>
    </button>
  );
}

function SoonCard({ label }: { label: string }) {
  return (
    <div className="flex h-[220px] w-[260px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-scrap-pink/70 bg-white/50 dark:bg-white/10 p-5 text-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-scrap-rose dark:text-[#E07A98]">In progress</span>
      <p className="mt-2 font-serif text-lg text-inksoft dark:text-[#B9A9B8]">{label}</p>
    </div>
  );
}

function renderItem(item: Item, open: (i: number) => void) {
  return item.kind === "project" ? (
    <ProjectCard project={item.project} index={item.index} onOpen={() => open(item.index)} />
  ) : (
    <SoonCard label={item.label} />
  );
}

/* scroll-linked fanning card (desktop) */
function FanCard({
  progress,
  slot,
  order,
  total,
  children,
}: {
  progress: MotionValue<number>;
  slot: (typeof SLOTS)[number];
  order: number;
  total: number;
  children: React.ReactNode;
}) {
  const start = 0.15 + (order / Math.max(total, 1)) * 0.25;
  const end = Math.min(start + 0.3, 0.85);
  const x = useTransform(progress, [start, end], [0, slot.x]);
  const y = useTransform(progress, [0, start, end], [60, 40, slot.y]);
  const scale = useTransform(progress, [start, end], [0.55, 1]);
  const rotate = useTransform(progress, [start, end], [slot.r * 3, slot.r / 2]);
  const opacity = useTransform(progress, [start - 0.05, start + 0.08], [0, 1]);
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -ml-[130px] -mt-[110px]"
      style={{ x, y, scale, rotate, opacity, zIndex: 10 + order }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Modal ---------------- */

function ProjectModal({ project, index, onClose }: { project: Project; index: number; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const c = PALETTE[index % PALETTE.length];

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const node = ref.current;
    node?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && node) {
        const f = node.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white dark:bg-[#211b2e] shadow-2xl md:rounded-2xl"
        initial={{ y: 40, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.97, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
      >
        <div className="sticky top-0 z-10 flex items-center gap-1.5 border-b border-black/5 dark:border-white/10 bg-white/90 dark:bg-[#211b2e]/90 px-4 py-2.5 backdrop-blur">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="h-3 w-3 rounded-full bg-[#FF5F57] focus:outline-none focus-visible:ring-2 focus-visible:ring-scrap-rose"
          />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            className="ml-auto rounded-full px-3 py-1 font-mono text-xs text-inksoft dark:text-[#B9A9B8] hover:bg-scrap-bg dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-scrap-rose"
          >
            Close ✕
          </button>
        </div>
        {project.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.cover} alt="" className="h-56 w-full object-cover" />
        ) : (
          <div className="p-8 pt-16" style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/85">{project.subtitle}</p>
          </div>
        )}
        <div className="space-y-6 p-6 md:p-8">
          <h3 id="project-modal-title" className="font-serif text-3xl leading-tight text-ink dark:text-[#F3E9EE]">
            {project.title}
          </h3>
          <p className="leading-relaxed text-inksoft dark:text-[#B9A9B8]">{project.description}</p>

          {project.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-xl bg-scrap-bg dark:bg-[#2A2240] p-4">
                  <div className="font-serif text-2xl text-scrap-rosedark dark:text-[#D98DA0]">{m.value}</div>
                  <div className="mt-1 text-xs text-muted dark:text-[#B9A9B8]">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full border border-scrap-pink/60 bg-scrap-pink/10 px-3 py-1 font-mono text-xs text-scrap-rosedark dark:text-[#D98DA0]">
                {s}
              </span>
            ))}
          </div>

          {(project.github || project.demo) && (
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="rounded-full bg-ink dark:bg-[#E07A98] px-5 py-2 text-sm text-white hover:bg-inksoft">
                  GitHub ↗
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="rounded-full bg-scrap-rose px-5 py-2 text-sm text-white hover:bg-scrap-rosedark">
                  {/\.pdf($|[?#])/i.test(project.demo) ? "Read the paper ↗" : "View demo ↗"}
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Section ---------------- */

export default function ProjectsFolder() {
  const items = buildItems();
  const all = projects as readonly Project[];
  const reduce = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end end"] });

  // Scale the desktop fan so the outermost cards (±600px wide, -390/+330px tall
  // around centre) always fit inside the sticky viewport below the heading.
  const [fanScale, setFanScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const byW = (window.innerWidth - 48) / 1240;
      const byH = (window.innerHeight - 64 - 150) / 740;
      setFanScale(Math.max(0.5, Math.min(1, byW, byH)));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const open = (i: number) => setOpenIdx(i);
  const close = () => setOpenIdx(null);
  const active = openIdx !== null ? all[openIdx] : undefined;

  const heading = (
    <div className="mb-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-scrap-rose dark:text-[#E07A98]">Selected work</p>
      <h2 className="mt-2 font-serif text-4xl text-ink dark:text-[#F3E9EE] md:text-5xl">Projects</h2>
    </div>
  );

  return (
    <section id="project" className="relative">
      {/* Mobile: folder then horizontal snap scroll */}
      <div className="px-4 py-20 md:hidden">
        {heading}
        <Folder />
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
          {items.map((it, i) => (
            <div key={i} className="shrink-0 snap-center">
              {renderItem(it, open)}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      {reduce ? (
        <div className="hidden px-6 py-24 md:block">
          {heading}
          <Folder />
          <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-6">
            {items.map((it, i) => (
              <div key={i}>{renderItem(it, open)}</div>
            ))}
          </div>
        </div>
      ) : (
        <div ref={containerRef} className="relative hidden h-[200vh] md:block">
          <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden pt-16">
            {heading}
            <div className="relative w-full max-w-6xl" style={{ height: 740 * fanScale }}>
              <div className="absolute inset-0" style={{ transform: `translateY(${55 * fanScale}px) scale(${fanScale})` }}>
                <div className="absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2">
                  <Folder />
                </div>
                {items.map((it, i) => (
                  <FanCard key={i} progress={scrollYProgress} slot={SLOTS[i]} order={i} total={items.length}>
                    {renderItem(it, open)}
                  </FanCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {active && openIdx !== null && <ProjectModal key={openIdx} project={active} index={openIdx} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}

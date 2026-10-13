"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import NycWallpaper from "../mac/NycWallpaper";
import JourneyMap from "./JourneyMap";
import {
  profile,
  stats,
  bio,
  skills,
  awards,
  certifications,
  keywords,
} from "../../lib/data";

const card =
  "rounded-[28px] bg-white/90 dark:bg-[#211b2e]/90 shadow-[0_10px_30px_-12px_rgba(168,66,94,0.25)] ring-1 ring-black/5 dark:ring-white/10 dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] transition-[transform,background-color,color] duration-500 hover:-translate-y-1";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

function Bullet({ letter, color, text = "#fff" }: { letter: string; color: string; text?: string }) {
  return (
    <span
      aria-hidden
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold"
      style={{ background: color, color: text }}
    >
      {letter}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-scrap-rosedark dark:text-[#D98DA0]">{children}</p>;
}

function LinkButtons({ dark = false }: { dark?: boolean }) {
  const ghost = dark
    ? "bg-white/15 text-white ring-1 ring-white/40 hover:bg-white/25"
    : "bg-white dark:bg-[#211b2e] text-ink dark:text-[#F3E9EE] ring-1 ring-black/10 dark:ring-white/10 hover:bg-scrap-cream dark:hover:bg-white/10";
  return (
    <div className="flex flex-wrap gap-3">
      <a href={`mailto:${profile.email}`} className="rounded-full bg-scrap-rose px-5 py-2.5 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-scrap-rosedark">
        Email me
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={`rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition ${ghost}`}>
        LinkedIn
      </a>
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className={`rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition ${ghost}`}>
        GitHub
      </a>
    </div>
  );
}

/* ───────────── Hero ───────────── */
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export function Hero() {
  return (
    <section id="about" className="pt-24">
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-5 md:grid-cols-[1fr_280px]">
        <motion.div variants={item} className="relative min-h-[520px] overflow-hidden rounded-[28px] shadow-xl">
          <div className="absolute inset-0">
            <NycWallpaper />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#F3ECE4] via-[#F3ECE4]/85 to-transparent dark:from-[#2A1F38] dark:via-[#2A1F38]/80" />
          <motion.div variants={stagger} className="relative flex h-full flex-col gap-5 p-6 sm:p-10">
            <motion.p variants={item} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-inksoft dark:text-[#B9A9B8]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              Dublin, Ireland · Data Analyst · DevOps · Open to roles
            </motion.p>
            <motion.h1 variants={item} className="font-script text-5xl leading-tight text-scrap-rosedark dark:text-[#D98DA0] sm:text-6xl">
              {profile.name}
            </motion.h1>
            <motion.h2 variants={item} className="max-w-xl font-serif text-3xl font-semibold leading-tight text-ink dark:text-[#F3E9EE] sm:text-4xl">
              {profile.tagline}
            </motion.h2>
            <motion.p variants={item} className="-mt-2 font-sans text-sm font-semibold uppercase tracking-wider text-scrap-rosedark dark:text-[#D98DA0]">
              {profile.role}
            </motion.p>
            <motion.div variants={item} className="max-w-xl space-y-3 font-sans text-base leading-relaxed text-inksoft dark:text-[#B9A9B8]">
              {bio.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </motion.div>
            <motion.p
              variants={item}
              className="inline-flex w-fit max-w-full flex-wrap items-center gap-x-2 rounded-lg bg-ink/90 dark:bg-[#2A2240]/90 px-3 py-1.5 font-mono text-xs text-white/90 shadow-sm"
              aria-label="Core stack: SQL, Python, Power BI, Azure, Docker, Kubernetes"
            >
              <span className="text-scrap-pink">$</span>
              <span>sql · python · power bi · azure · docker · k8s</span>
              <span aria-hidden className="inline-block h-3.5 w-1.5 animate-pulse bg-scrap-pink" />
            </motion.p>
            <motion.div variants={item} className="mt-auto">
              <LinkButtons />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.figure
          variants={item}
          className="mx-auto w-full max-w-[300px] rotate-[1.5deg] self-center rounded-[24px] bg-white dark:bg-[#211b2e] p-3 pb-4 shadow-xl ring-1 ring-black/5 dark:ring-white/10 dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] transition-[transform,background-color,color] duration-500 hover:rotate-0"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-[18px]">
            <Image src="/images/hero-wall-portrait.jpg" alt={`Portrait of ${profile.name}`} fill sizes="300px" className="object-cover" priority />
          </div>
          <figcaption className="mt-3 text-center font-sans text-sm font-medium text-inksoft dark:text-[#B9A9B8]">
            Bengaluru → Dublin <span className="text-scrap-rose dark:text-[#E07A98]">♡</span> NYC at heart
          </figcaption>
        </motion.figure>
      </motion.div>
    </section>
  );
}

/* ───────────── Impact ───────────── */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  // Only animate plain numbers with a simple suffix ("25+", "116k+", "2+ yrs"); show ratios like "2:1" as-is.
  const m = value.match(/^(\d+(?:\.\d+)?)((?:[^\d:./].*)?)$/);
  const target = m ? parseFloat(m[1]) : 0;
  const decimals = m && m[1].includes(".") ? m[1].split(".")[1].length : 0;
  const [n, setN] = useState(reduce || !m ? target : 0);

  useEffect(() => {
    if (!m || !inView || reduce) {
      if (m) setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, target]);

  if (!m) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {n.toFixed(decimals)}
      {m[2]}
    </span>
  );
}

export function Impact() {
  return (
    <section id="impact">
      <motion.div {...reveal}>
        <SectionLabel>Impact in numbers</SectionLabel>
      </motion.div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 [&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1">
        {stats.map((s, i) => {
          const accent = i === 0;
          return (
            <motion.div
              key={s.label}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className={`${card} flex flex-col justify-between gap-6 p-5 ${i === stats.length - 1 && stats.length % 2 ? "col-span-2 md:col-span-1" : ""} ${
                accent ? "!bg-scrap-rosedark text-white" : "text-ink dark:text-[#F3E9EE]"
              }`}
            >
              <span className="font-serif text-5xl font-semibold leading-none tracking-tight">
                <CountUp value={s.value} />
              </span>
              <span className={`font-sans text-sm leading-snug ${accent ? "text-white/85" : "text-inksoft dark:text-[#B9A9B8]"}`}>{s.label}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────── Journey ───────────── */
export function Journey() {
  return <JourneyMap />;
}

/* ───────────── Skills ───────────── */
const marqueeCss = `
@keyframes kb-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.kb-track { display: flex; width: max-content; animation: kb-marquee 45s linear infinite; }
.kb-track.kb-rev { animation-direction: reverse; animation-duration: 55s; }
.kb-marquee:hover .kb-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .kb-track { animation: none; width: auto; flex-wrap: wrap; justify-content: center; row-gap: 0.5rem; }
  .kb-dup { display: none; }
}
`;

function slug(s: string) {
  return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function KeywordRow({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  const chip = (w: string, k: string, dup: boolean) => (
    <span
      key={k}
      aria-hidden={dup || undefined}
      className={`mx-1.5 shrink-0 whitespace-nowrap rounded-md bg-white dark:bg-[#211b2e] px-3 py-1.5 font-mono text-xs text-ink dark:text-[#F3E9EE] ring-1 ring-scrap-pink/50 ${dup ? "kb-dup" : ""}`}
    >
      <span className="text-scrap-rose dark:text-[#E07A98]">#</span>
      {w}
    </span>
  );
  return (
    <div className={`kb-track ${reverse ? "kb-rev" : ""}`}>
      {words.map((w) => chip(w, w, false))}
      {words.map((w) => chip(w, `dup-${w}`, true))}
    </div>
  );
}

export function Skills() {
  const half = Math.ceil(keywords.length / 2);
  return (
    <section id="skills">
      <style>{marqueeCss}</style>
      <motion.div {...reveal} className="mb-6">
        <SectionLabel>Toolkit</SectionLabel>
        <h2 className="font-serif text-3xl font-semibold text-ink dark:text-[#F3E9EE] sm:text-4xl">Tech stack</h2>
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {skills.map((g, i) => (
          <motion.div
            key={g.category}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.06 }}
            className={`${card} overflow-hidden`}
          >
            <div className="flex items-center gap-1.5 border-b border-black/5 dark:border-white/10 bg-scrap-cream/60 dark:bg-[#2A2240]/60 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-scrap-rose" />
              <span className="h-2 w-2 rounded-full bg-scrap-orange" />
              <span className="h-2 w-2 rounded-full bg-scrap-pink" />
              <h3 className="ml-2 truncate font-mono text-xs text-scrap-rosedark dark:text-[#D98DA0]">~/skills/{slug(g.category)}</h3>
            </div>
            <div className="flex flex-wrap gap-2 p-4">
              {g.items.map((s) => (
                <span key={s} className="rounded-md bg-scrap-bg dark:bg-[#2A2240] px-2.5 py-1 font-mono text-xs text-ink dark:text-[#F3E9EE] ring-1 ring-black/5 dark:ring-white/10">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div {...reveal} className="mt-8">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-inksoft dark:text-[#B9A9B8]">
          Keywords recruiters search for <span className="text-scrap-rose dark:text-[#E07A98]">· all backed by my CV</span>
        </p>
        <div
          className="kb-marquee relative space-y-3 overflow-hidden rounded-[20px] bg-scrap-cream/50 dark:bg-[#2A2240]/50 py-4 ring-1 ring-black/5 dark:ring-white/10 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          aria-label={`Keywords: ${keywords.join(", ")}`}
        >
          <KeywordRow words={keywords.slice(0, half)} />
          <KeywordRow words={keywords.slice(half)} reverse />
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────── Credentials ───────────── */
function Sticker({ src, alt, tilt }: { src: string; alt: string; tilt: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="relative h-36 w-36 shrink-0 cursor-default"
      initial={{ rotate: tilt }}
      animate={{ rotate: tilt }}
      whileHover={reduce ? { rotate: 0 } : { rotate: [0, -3, 3, -1.5, 0], y: -8, scale: 1.05, transition: { duration: 0.5 } }}
    >
      {/* die-cut sticker: white outline from stacked drop-shadows, plus a soft cast shadow */}
      <div
        className="relative h-full w-full"
        style={{
          filter:
            "drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff) drop-shadow(2px 2px 0 #fff) drop-shadow(-2px -2px 0 #fff) drop-shadow(0 8px 10px rgba(168,66,94,0.35))",
        }}
      >
        <Image src={src} alt={alt} fill sizes="144px" className="object-contain p-1" />
      </div>
      {/* peel / curl corner */}
      <span
        aria-hidden
        className="absolute bottom-3 right-3 h-6 w-6 rounded-tl-[14px] shadow-[-2px_-2px_4px_rgba(0,0,0,0.12)]"
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #f3e9e3 55%, #e3d3cc 100%)" }}
      />
    </motion.div>
  );
}

export function Credentials() {
  return (
    <section id="credentials">
      <motion.div {...reveal} className="mb-6">
        <SectionLabel>Recognition</SectionLabel>
        <h2 className="font-serif text-3xl font-semibold text-ink dark:text-[#F3E9EE] sm:text-4xl">Credentials</h2>
      </motion.div>
      <div className="grid gap-5 md:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-8">
          {awards.map((a, i) => (
            <motion.div
              key={a.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.1 }}
              className="flex flex-col items-center gap-4 sm:flex-row sm:items-start"
            >
              <Sticker src={a.image} alt={`${a.title} badge`} tilt={i % 2 ? 6 : -7} />
              <figure className={`${card} relative flex-1 p-5`}>
                <span aria-hidden className="absolute -top-3 left-6 font-serif text-5xl leading-none text-scrap-pink">&ldquo;</span>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-scrap-rosedark dark:text-[#D98DA0]">★ {a.org}</p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-ink dark:text-[#F3E9EE]">{a.title}</h3>
                <blockquote className="mt-3 font-serif text-[15px] italic leading-relaxed text-inksoft dark:text-[#B9A9B8]">{a.citation}</blockquote>
                <figcaption className="mt-3 font-sans text-xs text-muted dark:text-[#B9A9B8]">— from {a.from}, via LinkedIn</figcaption>
              </figure>
            </motion.div>
          ))}
        </div>
        <motion.div {...reveal} className={`${card} p-6`}>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-scrap-rosedark dark:text-[#D98DA0]">Certifications</h3>
          <ul className="divide-y divide-line">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-center justify-between gap-4 py-3">
                <span className="font-sans text-sm font-medium text-ink dark:text-[#F3E9EE]">{c.name}</span>
                <span className="shrink-0 rounded-full bg-scrap-bg dark:bg-[#2A2240] px-2.5 py-0.5 font-mono text-[11px] text-inksoft dark:text-[#B9A9B8]">{c.issuer}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── Contact ───────────── */
export function Contact() {
  const lines: [string, string, string?][] = [
    ["A", "#C85C7A"],
    ["C", "#A8425E"],
    ["E", "#D98DA0"],
    ["N", "#F7B500", "#1C1B17"],
    ["Q", "#E8A33D", "#1C1B17"],
  ];
  return (
    <section id="contact" className="pb-10">
      <motion.div {...reveal} className="relative overflow-hidden rounded-[28px] bg-ink dark:bg-[#2A2240] dark:ring-1 dark:ring-white/10 transition-colors duration-500 p-8 text-white shadow-xl sm:p-12">
        <div className="mb-6 flex gap-2">
          {lines.map(([l, c, t]) => (
            <Bullet key={l} letter={l} color={c} text={t} />
          ))}
        </div>
        <h2 className="max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">Let&apos;s build something in Dublin.</h2>
        <p className="mt-4 max-w-xl font-sans text-base text-white/75">
          Open to data analyst, data engineering and DevOps roles in Ireland. The fastest way to reach me is email.
        </p>
        <div className="mt-8">
          <LinkButtons dark />
        </div>
        <p className="mt-10 border-t border-white/15 pt-5 font-sans text-xs text-white/60">
          © 2026 Khushi Bijkal · Made in Dublin with a New York state of mind
        </p>
      </motion.div>
    </section>
  );
}

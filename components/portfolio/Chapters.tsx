"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";

// Three chapters pegged to a washing line, in order, so nobody has to open
// anything to see them. A paper plane crosses the gap where she moved.
const CHAPTERS = [
  {
    src: "/images/dsatm-graduation.jpg",
    alt: "Khushi in her graduation cap and gown at her DSATM graduation",
    w: 640,
    h: 961,
    when: "2023",
    caption: "Graduated, DSATM",
    place: "Bengaluru",
    icon: "🎓",
  },
  {
    src: "/images/socgen-office.jpg",
    alt: "Khushi at the Société Générale office in Bengaluru, in front of a screen reading The Future Is You",
    w: 1100,
    h: 647,
    when: "2023 – 25",
    caption: "Société Générale",
    place: "Bengaluru",
    icon: "💼",
  },
  {
    src: "/images/dcu-campus.jpg",
    alt: "Khushi sitting in front of the big DCU letters on campus",
    w: 800,
    h: 600,
    when: "2025 – 26",
    caption: "MSc at DCU",
    place: "Dublin",
    icon: "🍀",
  },
];

function Peg() {
  return (
    <span aria-hidden className="absolute -top-3 left-1/2 z-10 h-7 w-3 -translate-x-1/2 rounded-[3px] bg-gradient-to-b from-[#d8b48a] to-[#a97e55] shadow-sm">
      <span className="absolute inset-x-0 top-1/2 h-px bg-black/25" />
    </span>
  );
}

export default function Chapters() {
  const still = useReducedMotion();
  return (
    <div className="relative mb-10 mt-2">
      {/* the line, sagging a little between the pegs */}
      <svg aria-hidden className="absolute inset-x-0 top-0 h-10 w-full" viewBox="0 0 1000 40" preserveAspectRatio="none">
        <path d="M0 6 Q 250 34 500 14 T 1000 6" fill="none" stroke="#B8A79A" strokeWidth="2" />
      </svg>

      <div className="relative flex snap-x snap-mandatory items-start gap-6 overflow-x-auto px-2 pb-4 pt-4 sm:justify-between sm:gap-4 sm:overflow-visible sm:px-6">
        {CHAPTERS.map((c, i) => (
          <Fragment key={c.src}>
            {/* paper plane over the move to Dublin */}
            {i === 2 && (
              <div aria-hidden className="mt-24 hidden shrink-0 flex-col items-center sm:flex">
                <motion.span
                  className="text-2xl"
                  animate={still ? undefined : { x: [-24, 24], y: [4, -6, 4], rotate: [6, -4, 6] }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                >
                  ✈️
                </motion.span>
                <span className="mt-2 whitespace-nowrap border-t-2 border-dashed border-scrap-rose/60 pt-1 font-hand text-sm text-scrap-rosedark dark:text-[#D98DA0]">Bengaluru → Dublin</span>
              </div>
            )}
            <motion.figure
              style={{ transformOrigin: "50% 0%" }}
              initial={{ rotate: i % 2 ? 3 : -3 }}
              animate={still ? undefined : { rotate: i % 2 ? [3, 1.5, 3] : [-3, -1.5, -3] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ rotate: 0, scale: 1.04, y: 6 }}
              className={`relative shrink-0 snap-center bg-white p-2.5 pb-1 shadow-xl ring-1 ring-black/5 ${c.w > c.h ? "w-[300px] sm:w-[320px]" : "w-[200px] sm:w-[210px]"}`}
            >
              <Peg />
              <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes="320px" className={`w-full object-cover ${c.w > c.h ? "h-[190px]" : "h-[260px]"}`} />
              <figcaption className="py-2 text-center">
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {c.icon} {c.when} · {c.place}
                </span>
                <span className="block font-hand text-xl leading-tight text-ink">{c.caption}</span>
              </figcaption>
            </motion.figure>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

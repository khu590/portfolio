"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { beyond, profile, type BeyondItem } from "@/lib/data";
import { shutter, ting } from "./photoSounds";

// "Beyond work": each activity hangs from a rail as an event lanyard.
// The badges sway, swing when you brush past, and flip over to show the
// photos and the story behind them.

const STYLE: Record<BeyondItem["kind"], { strap: string; band: string; icon: string }> = {
  Speaking: { strap: "#A8425E", band: "#C85C7A", icon: "🎤" },
  Event: { strap: "#2F5FA8", band: "#4A7FD0", icon: "📍" },
  Volunteering: { strap: "#5E8C6A", band: "#7FAE8A", icon: "♥" },
  Hobby: { strap: "#C98A2B", band: "#E8A33D", icon: "★" },
};

function Lanyard({ item, i }: { item: BeyondItem; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const [photo, setPhoto] = useState(0);
  const still = useReducedMotion();
  const s = STYLE[item.kind];
  const strap = 120 + (i % 3) * 26; // uneven lengths look hung by hand
  const ribbon = `repeating-linear-gradient(0deg, ${s.strap} 0 14px, ${s.band} 14px 16px)`;

  return (
    <motion.div
      className="relative flex w-[280px] shrink-0 snap-center flex-col items-center"
      style={{ transformOrigin: "50% 0%" }}
      animate={still ? undefined : { rotate: [-1.6, 1.6] }}
      transition={{ duration: 3.2 + i * 0.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.3 }}
      whileHover={still ? undefined : { rotate: [0, -6, 4, -2, 0], transition: { duration: 1.2 } }}
      onHoverStart={ting}
    >
      {/* hook */}
      <span aria-hidden className="h-4 w-4 rounded-full border-[3px] border-[#B8A79A]" />
      {/* strap: two ribbons meeting at the clip */}
      <div aria-hidden className="relative -mt-1" style={{ height: strap, width: 70 }}>
        <span className="absolute left-[22px] top-0 h-full w-[12px] origin-top -rotate-[7deg] rounded-sm" style={{ background: ribbon }} />
        <span className="absolute right-[22px] top-0 h-full w-[12px] origin-top rotate-[7deg] rounded-sm" style={{ background: ribbon }} />
      </div>
      {/* clip */}
      <span aria-hidden className="-mt-2 h-5 w-9 rounded-md bg-gradient-to-b from-[#d9d4cf] to-[#9e9690] shadow" />

      {/* badge: click to flip */}
      <button
        type="button"
        onClick={() => setFlipped(!flipped)}
        aria-pressed={flipped}
        aria-label={`${item.title}, ${item.org}. ${flipped ? "Show the badge" : "Turn over to see photos and the story"}`}
        className="relative -mt-1 h-[380px] w-[260px] text-left [perspective:1200px]"
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          {/* front */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 [backface-visibility:hidden] dark:bg-[#231c33] dark:ring-white/10">
            <div className="mx-auto mt-3 h-2 w-14 rounded-full bg-black/10 dark:bg-white/15" aria-hidden />
            <div className="mt-3 px-5 py-3 text-white" style={{ background: s.band }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-90">{item.org}</p>
              <p className="mt-1 font-sans text-[34px] font-extrabold uppercase leading-none tracking-tight">{item.role}</p>
            </div>
            <div className="flex flex-1 flex-col px-5 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted dark:text-[#B9A9B8]">Name</p>
              <p className="font-serif text-2xl font-semibold text-ink dark:text-[#F3E9EE]">{profile.name}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted dark:text-[#B9A9B8]">{item.when ?? "Highlight"}</p>
              <p className="font-sans text-base font-semibold text-ink dark:text-[#F3E9EE]">
                <span aria-hidden className="mr-1">{s.icon}</span>
                {item.title}
              </p>
              {item.ribbon ? (
                <div className="relative mb-12 mt-auto h-[52px] w-full -rotate-2 overflow-hidden rounded-sm shadow-md">
                  <Image src={item.ribbon.src} alt={item.ribbon.alt} fill sizes="240px" className="object-cover" />
                </div>
              ) : (
                // no ribbon: a little photo taped on as a preview of the back
                <div className="relative mb-11 mt-auto h-[96px] w-[130px] rotate-3 self-end bg-white p-1 shadow-md">
                  <span aria-hidden className="absolute -top-2 left-1/2 z-10 h-4 w-12 -translate-x-1/2 -rotate-2 bg-[#f3e3c7]/90" />
                  <div className="relative h-full w-full overflow-hidden">
                    <Image src={item.photos[0].src} alt="" fill sizes="130px" className="object-cover object-[50%_30%]" />
                  </div>
                </div>
              )}
            </div>
            <p className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted dark:text-[#B9A9B8]">tap to turn over ↻</p>
          </div>

          {/* back */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-[#fbf6f1] p-4 shadow-xl ring-1 ring-black/5 [backface-visibility:hidden] [transform:rotateY(180deg)] dark:bg-[#231c33] dark:ring-white/10">
            <div
              role="img"
              aria-label={item.photos[photo].alt}
              className="relative h-[190px] w-full overflow-hidden rounded-lg bg-black/5"
              onClick={(e) => {
                if (item.photos.length < 2) return;
                e.stopPropagation();
                setPhoto((photo + 1) % item.photos.length);
                shutter();
              }}
            >
              <Image src={item.photos[photo].src} alt="" fill sizes="240px" className="object-cover object-[50%_32%]" />
              {item.photos.length > 1 && (
                <span className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-0.5 font-mono text-[10px] text-white">
                  {photo + 1}/{item.photos.length} · tap photo
                </span>
              )}
            </div>
            <p className="mt-3 font-serif text-[15px] leading-snug text-ink dark:text-[#F3E9EE]">{item.story}</p>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function Lanyards() {
  if (!beyond.length) return null;
  const count = (k: BeyondItem["kind"]) => beyond.filter((b) => b.kind === k).length;
  const tally = [
    count("Speaking") && `${count("Speaking")} on stage`,
    count("Event") && `${count("Event")} event${count("Event") > 1 ? "s" : ""}`,
    count("Volunteering") && `${count("Volunteering")} volunteering`,
    count("Hobby") && `${count("Hobby")} just for fun`,
  ].filter(Boolean);

  return (
    <section id="beyond">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-2 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-scrap-rosedark dark:text-[#D98DA0]">Beyond work</p>
          <h2 className="font-serif text-3xl font-semibold text-ink dark:text-[#F3E9EE] sm:text-4xl">Lanyards I&apos;ve collected</h2>
          <p className="mt-2 max-w-xl font-sans text-sm text-inksoft dark:text-[#B9A9B8]">
            Every event leaves you with a lanyard. These are the ones I kept. Turn a badge over to see what happened.
          </p>
        </div>
        <p className="font-mono text-xs text-muted dark:text-[#B9A9B8]">{tally.join(" · ")}</p>
      </motion.div>

      {/* the rail */}
      <div className="relative mt-6">
        <div aria-hidden className="absolute inset-x-0 top-[6px] h-[6px] rounded-full bg-gradient-to-b from-[#cbbfb4] to-[#9d8f84] shadow" />
        <div className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-6 sm:justify-center sm:overflow-visible">
          {beyond.map((b, i) => (
            <Lanyard key={b.title} item={b} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

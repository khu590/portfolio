// components/portfolio/PolaroidStack.tsx
// Two overlapping polaroids beside the hero. Hovering fans them apart and
// lifts the one under the cursor, with a soft camera-shutter sound made with
// the Web Audio API (no files). Browsers only allow sound after the visitor has
// clicked on the page; entering from the landing page counts.
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const PHOTOS = [
  { src: "/images/polaroid-dublin.jpg", alt: "Khushi on a bridge over the River Liffey in Dublin at sunset", caption: "Sunset on the Liffey" },
  { src: "/images/polaroid-armchair.jpg", alt: "Khushi smiling in a leather armchair against a brick wall", caption: "Off the clock" },
];

let ctx: AudioContext | null = null;
let last = 0;
function shutter() {
  const now = Date.now();
  if (now - last < 350) return; // don't machine-gun on quick hovers
  last = now;
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = ctx ?? new Ctx();
    if (ctx.state === "suspended") ctx.resume();
    const t = ctx.currentTime;
    // two short filtered noise clicks = shutter open / close
    [0, 0.07].forEach((offset, i) => {
      const buf = ctx!.createBuffer(1, ctx!.sampleRate * 0.05, ctx!.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / d.length, 3);
      const src = ctx!.createBufferSource();
      src.buffer = buf;
      const bp = ctx!.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = i === 0 ? 2600 : 1800;
      const g = ctx!.createGain();
      g.gain.value = 0.18;
      src.connect(bp).connect(g).connect(ctx!.destination);
      src.start(t + offset);
    });
  } catch {
    /* audio not available — stay silent */
  }
}

export default function PolaroidStack({ caption }: { caption: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const groupHover = hover !== null;
  const ref = useRef<HTMLDivElement>(null);

  // resting tilt/offset, and where each card goes when the stack fans out
  const rest = [
    { rotate: -6, x: -14, y: 6 },
    { rotate: 5, x: 18, y: -8 },
  ];
  const fanned = [
    { rotate: -10, x: -46, y: 10 },
    { rotate: 9, x: 50, y: -14 },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[300px] flex-col items-center self-center">
      <div
        ref={ref}
        className="relative h-[360px] w-[240px] sm:h-[380px] sm:w-[250px]"
        onMouseLeave={() => setHover(null)}
      >
        {PHOTOS.map((p, i) => {
          const isHover = hover === i;
          const base = groupHover && !reduce ? fanned[i] : rest[i];
          return (
            <motion.figure
              key={p.src}
              className="absolute inset-0 cursor-pointer rounded-[6px] bg-white p-3 pb-12 shadow-[0_18px_40px_-14px_rgba(28,27,23,0.45)] ring-1 ring-black/5 dark:bg-[#F6F1EC]"
              style={{ zIndex: isHover ? 30 : i === 1 ? 20 : 10 }}
              initial={false}
              animate={{
                rotate: isHover ? 0 : base.rotate,
                x: base.x,
                y: isHover ? base.y - 14 : base.y,
                scale: isHover ? 1.06 : 1,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onMouseEnter={() => {
                setHover(i);
                shutter();
              }}
              onClick={shutter}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-scrap-cream">
                <Image src={p.src} alt={p.alt} fill sizes="250px" className="object-cover" priority={i === 0} />
                {/* quick flash when the shutter fires */}
                {isHover && !reduce && (
                  <motion.span
                    key={`flash-${hover}`}
                    className="pointer-events-none absolute inset-0 bg-white"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                )}
              </div>
              <figcaption className="absolute inset-x-0 bottom-3 text-center font-hand text-xl text-[#4A473E]">{p.caption}</figcaption>
            </motion.figure>
          );
        })}
      </div>
      <p className="mt-6 text-center font-sans text-sm font-medium text-inksoft dark:text-[#B9A9B8]">{caption}</p>
    </div>
  );
}

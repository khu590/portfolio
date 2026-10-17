// components/IntroLoader.tsx
// Opening animation before the scrapbook landing page: her name rises in
// letter by letter while a counter runs 0 → 100%, then the curtain lifts.
// Plays once per browser session; skipped entirely for reduced motion.
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const NAME = ["KHUSHI", "BIJKAL"];
const DURATION = 1800; // ms for the counter to reach 100

export default function IntroLoader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    if (seen || reduce) return;
    setShow(true);

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out so the last few percent feel deliberate
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 450);
    };
    raf = requestAnimationFrame(tick);
    // safety net in case animation frames are throttled (background tab)
    const fallback = setTimeout(() => setShow(false), DURATION + 2500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex flex-col bg-[#1C1B17] text-[#F3ECE4]"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden
        >
          <div className="flex justify-between px-6 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#F3ECE4]/60 md:px-10">
            <span>Data analyst · DevOps</span>
            <span>Dublin, Ireland</span>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-1 overflow-hidden px-4 md:flex-row md:gap-6">
            {NAME.map((word, wi) => (
              <span key={word} className="flex overflow-hidden">
                {word.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    className="inline-block font-serif text-[15vw] leading-[0.95] md:text-[9vw]"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.15 + (wi * 6 + i) * 0.045, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between px-6 pb-6 md:px-10">
            <motion.div
              className="h-px origin-left bg-scrap-pink"
              style={{ width: "40vw", scaleX: count / 100 }}
            />
            <span className="font-serif text-6xl tabular-nums text-[#F3ECE4]/35 md:text-7xl">
              {count}
              <span className="text-2xl">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

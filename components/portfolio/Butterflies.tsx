// components/portfolio/Butterflies.tsx
// A few soft butterflies drifting across the page behind the content.
// Wings flap with a scaleX loop; paths are fixed so SSR and client match.
"use client";

import { motion, useReducedMotion } from "framer-motion";

const FLIGHTS = [
  { top: "18%", color: "#D98DA0", size: 26, duration: 38, delay: 0, drift: [0, -60, 20, -30, 0] },
  { top: "42%", color: "#C85C7A", size: 20, duration: 46, delay: 9, drift: [0, 40, -30, 50, 0] },
  { top: "66%", color: "#E8A33D", size: 18, duration: 52, delay: 18, drift: [0, -40, 30, -20, 0] },
  { top: "84%", color: "#B98AD9", size: 22, duration: 44, delay: 27, drift: [0, 30, -50, 10, 0] },
];

function Butterfly({ color, size }: { color: string; size: number }) {
  const wing = (side: 1 | -1) => (
    <motion.g
      style={{ originX: "50%", originY: "50%" }}
      animate={{ scaleX: [1, 0.25, 1] }}
      transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d={side === 1 ? "M12 12 C 16 2, 24 4, 21 11 C 24 16, 17 21, 12 13 Z" : "M12 12 C 8 2, 0 4, 3 11 C 0 16, 7 21, 12 13 Z"}
        fill={color}
        opacity={0.85}
      />
    </motion.g>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      {wing(-1)}
      {wing(1)}
      <rect x={11.4} y={8} width={1.2} height={9} rx={0.6} fill="#5B3A44" />
    </svg>
  );
}

export default function Butterflies() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {FLIGHTS.map((f, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: f.top }}
          initial={{ x: "-10vw" }}
          animate={{ x: "110vw", y: f.drift, rotate: [8, -6, 10, -4, 8] }}
          transition={{
            x: { duration: f.duration, repeat: Infinity, ease: "linear", delay: f.delay },
            y: { duration: f.duration / 3, repeat: Infinity, ease: "easeInOut", delay: f.delay },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Butterfly color={f.color} size={f.size} />
        </motion.div>
      ))}
    </div>
  );
}

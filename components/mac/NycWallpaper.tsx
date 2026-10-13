// components/mac/NycWallpaper.tsx
// Desktop wallpaper: Manhattan at dusk — Empire State, Chrysler, One World
// Trade, a skyline of lit windows, and the Brooklyn Bridge over the river.
// Pure SVG, deterministic (no Math.random) so server and client match.
"use client";

import { motion } from "framer-motion";

const W = 1440;
const H = 900;

// tiny deterministic PRNG so lit windows look random but render identically
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type Tower = { x: number; w: number; h: number; tone: string };

function Windows({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: number }) {
  const r = rng(seed);
  const cells: JSX.Element[] = [];
  for (let wy = y + 8; wy < y + h - 6; wy += 11) {
    for (let wx = x + 5; wx < x + w - 6; wx += 9) {
      if (r() < 0.38) {
        cells.push(<rect key={`${wx}-${wy}`} x={wx} y={wy} width={4} height={6} fill={r() < 0.8 ? "#FFD98A" : "#FFF1C9"} opacity={0.55 + r() * 0.4} />);
      }
    }
  }
  return <g>{cells}</g>;
}

function EmpireState({ x, base }: { x: number; base: number }) {
  return (
    <g fill="#2B2F55">
      <rect x={x - 46} y={base - 300} width={92} height={300} />
      <rect x={x - 34} y={base - 380} width={68} height={80} />
      <rect x={x - 22} y={base - 430} width={44} height={50} />
      <rect x={x - 12} y={base - 465} width={24} height={35} />
      <rect x={x - 5} y={base - 500} width={10} height={35} />
      <rect x={x - 1.5} y={base - 560} width={3} height={60} />
      <circle cx={x} cy={base - 562} r={3} fill="#FF6B6B" />
      <Windows x={x - 46} y={base - 300} w={92} h={300} seed={11} />
      <Windows x={x - 34} y={base - 380} w={68} h={80} seed={12} />
    </g>
  );
}

function Chrysler({ x, base }: { x: number; base: number }) {
  return (
    <g>
      <rect x={x - 32} y={base - 330} width={64} height={330} fill="#323764" />
      <Windows x={x - 32} y={base - 330} w={64} h={330} seed={21} />
      {/* stacked sunburst arches */}
      {[0, 1, 2, 3, 4].map((i) => {
        const w = 30 - i * 5.5;
        const y = base - 330 - i * 22;
        return (
          <g key={i}>
            <path d={`M${x - w} ${y} Q${x - w} ${y - 30} ${x} ${y - 34} Q${x + w} ${y - 30} ${x + w} ${y} Z`} fill="#C9CCE0" />
            <path d={`M${x - w + 4} ${y - 4} Q${x} ${y - 30} ${x + w - 4} ${y - 4}`} stroke="#2B2F55" strokeWidth={1.5} fill="none" />
          </g>
        );
      })}
      <path d={`M${x - 3} ${base - 440} L${x} ${base - 520} L${x + 3} ${base - 440} Z`} fill="#C9CCE0" />
    </g>
  );
}

function OneWTC({ x, base }: { x: number; base: number }) {
  return (
    <g>
      <path d={`M${x - 44} ${base} L${x - 30} ${base - 470} L${x + 30} ${base - 470} L${x + 44} ${base} Z`} fill="#3A4170" />
      <path d={`M${x} ${base} L${x - 30} ${base - 470} L${x + 30} ${base - 470} Z`} fill="#454D82" opacity={0.6} />
      <rect x={x - 1.5} y={base - 560} width={3} height={90} fill="#C9CCE0" />
      <Windows x={x - 30} y={base - 440} w={60} h={420} seed={31} />
    </g>
  );
}

function BrooklynBridge({ base }: { base: number }) {
  const deck = base + 40;
  const towers = [420, 1020];
  return (
    <g>
      {/* cables */}
      <path d={`M0 ${deck - 120} Q210 ${deck - 10} ${towers[0]} ${deck - 150} Q720 ${deck - 10} ${towers[1]} ${deck - 150} Q1230 ${deck - 10} ${W} ${deck - 120}`} stroke="#8D90B8" strokeWidth={2} fill="none" />
      {Array.from({ length: 40 }).map((_, i) => {
        const x = 30 + i * 35;
        return <line key={i} x1={x} y1={deck} x2={x} y2={deck - 60} stroke="#8D90B8" strokeWidth={0.6} opacity={0.6} />;
      })}
      <rect x={0} y={deck} width={W} height={10} fill="#1B1E3A" />
      {towers.map((tx) => (
        <g key={tx} fill="#5B4A55">
          <rect x={tx - 34} y={deck - 170} width={68} height={190} />
          <path d={`M${tx - 22} ${deck - 30} V${deck - 110} Q${tx - 13} ${deck - 130} ${tx - 4} ${deck - 110} V${deck - 30} Z`} fill="#F2B8A8" opacity={0.45} />
          <path d={`M${tx + 4} ${deck - 30} V${deck - 110} Q${tx + 13} ${deck - 130} ${tx + 22} ${deck - 110} V${deck - 30} Z`} fill="#F2B8A8" opacity={0.45} />
        </g>
      ))}
    </g>
  );
}

export default function NycWallpaper() {
  const base = H - 180;
  const r = rng(7);
  // background filler towers
  const towers: Tower[] = [];
  for (let x = -20; x < W; x += 34 + Math.floor(r() * 30)) {
    towers.push({ x, w: 30 + Math.floor(r() * 40), h: 120 + Math.floor(r() * 220), tone: r() < 0.5 ? "#3A3F6E" : "#30355E" });
  }
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="nycsky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F2350" />
            <stop offset="45%" stopColor="#6B4E85" />
            <stop offset="75%" stopColor="#E48C88" />
            <stop offset="100%" stopColor="#F7C59F" />
          </linearGradient>
          <linearGradient id="river" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3C3566" />
            <stop offset="100%" stopColor="#15172E" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#nycsky)" />
        {/* stars */}
        {Array.from({ length: 60 }).map((_, i) => (
          <circle key={i} cx={r() * W} cy={r() * 260} r={r() * 1.2 + 0.3} fill="#fff" opacity={0.3 + r() * 0.6} />
        ))}
        <circle cx={260} cy={150} r={26} fill="#FFF3D6" opacity={0.9} />

        {towers.map((t, i) => (
          <g key={i}>
            <rect x={t.x} y={base - t.h} width={t.w} height={t.h} fill={t.tone} />
            <Windows x={t.x} y={base - t.h} w={t.w} h={t.h} seed={100 + i} />
          </g>
        ))}
        <OneWTC x={300} base={base} />
        <EmpireState x={760} base={base} />
        <Chrysler x={1020} base={base} />

        <rect x={0} y={base} width={W} height={H - base} fill="url(#river)" />
        {/* reflections */}
        {Array.from({ length: 50 }).map((_, i) => (
          <rect key={i} x={r() * W} y={base + 20 + r() * 150} width={10 + r() * 30} height={1.5} fill="#FFD98A" opacity={0.15 + r() * 0.25} />
        ))}
        <BrooklynBridge base={base} />
      </svg>

      {/* a slow-blinking plane crossing the sky */}
      <motion.div
        className="absolute top-[12%] w-1.5 h-1.5 rounded-full bg-red-300 shadow-[0_0_8px_2px_rgba(255,120,120,0.6)]"
        initial={{ left: "-5%" }}
        animate={{ left: "105%", opacity: [1, 0.3, 1] }}
        transition={{ left: { duration: 60, repeat: Infinity, ease: "linear" }, opacity: { duration: 1.5, repeat: Infinity } }}
      />
    </div>
  );
}

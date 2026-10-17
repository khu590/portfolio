// components/mac/JazzPlayer.tsx
// Low-key lo-fi beat, generated live with the Web Audio API — no audio files,
// no licensing. Mellow electric-piano 7th/9th chords, a soft swung beat and a
// little vinyl crackle, all through a warm low-pass. Off until clicked.
"use client";

import { useEffect, useRef, useState } from "react";

const BPM = 72;
const BEAT = 60 / BPM;
const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

// Fmaj9 → Em7 → Dm9 → Cmaj7 — two bars each, a classic late-night loop
const CHORDS = [
  { bass: 41, notes: [57, 60, 64, 67] },
  { bass: 40, notes: [55, 59, 62, 67] },
  { bass: 38, notes: [53, 57, 60, 64] },
  { bass: 36, notes: [55, 59, 62, 64] },
];

function noiseBuffer(ctx: AudioContext, seconds: number) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function keys(ctx: AudioContext, out: AudioNode, note: number, t: number, dur: number, vel = 0.06) {
  const env = ctx.createGain();
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(vel, t + 0.03);
  env.gain.exponentialRampToValueAtTime(vel * 0.35, t + 0.6);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  env.connect(out);
  // Rhodes-ish: fundamental + soft bell partial, tiny detune for warmth
  [[1, 1], [2.0, 0.18], [3.01, 0.06]].forEach(([r, g]) => {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = midi(note) * r * (1 + (Math.random() - 0.5) * 0.003);
    const gn = ctx.createGain();
    gn.gain.value = g;
    o.connect(gn).connect(env);
    o.start(t);
    o.stop(t + dur + 0.05);
  });
}

function bass(ctx: AudioContext, out: AudioNode, note: number, t: number, dur: number) {
  const o = ctx.createOscillator();
  o.type = "triangle";
  o.frequency.value = midi(note);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.12, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + dur + 0.05);
}

function kick(ctx: AudioContext, out: AudioNode, t: number) {
  const o = ctx.createOscillator();
  o.frequency.setValueAtTime(120, t);
  o.frequency.exponentialRampToValueAtTime(45, t + 0.18);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.35, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + 0.4);
}

function hit(ctx: AudioContext, out: AudioNode, noise: AudioBuffer, t: number, type: "snare" | "hat") {
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const f = ctx.createBiquadFilter();
  f.type = type === "snare" ? "bandpass" : "highpass";
  f.frequency.value = type === "snare" ? 1800 : 7000;
  const g = ctx.createGain();
  const peak = type === "snare" ? 0.09 : 0.025;
  const len = type === "snare" ? 0.18 : 0.05;
  g.gain.setValueAtTime(peak, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + len);
  src.connect(f).connect(g).connect(out);
  src.start(t);
  src.stop(t + len + 0.02);
}

export function useLofi() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const crackleRef = useRef<AudioBufferSourceNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [playing, setPlaying] = useState(false);

  function start() {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 2400;
      master.connect(lp).connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    const ctx = ctxRef.current!;
    const master = masterRef.current!;
    ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 2);

    const noise = noiseBuffer(ctx, 1);

    // vinyl: quiet hiss + sparse pops, looped
    const vinyl = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
    const vd = vinyl.getChannelData(0);
    for (let i = 0; i < vd.length; i++) {
      vd[i] = (Math.random() * 2 - 1) * 0.004 + (Math.random() < 0.0004 ? (Math.random() - 0.5) * 0.5 : 0);
    }
    const crackle = ctx.createBufferSource();
    crackle.buffer = vinyl;
    crackle.loop = true;
    const cg = ctx.createGain();
    cg.gain.value = 0.6;
    crackle.connect(cg).connect(master);
    crackle.start();
    crackleRef.current = crackle;

    // lookahead scheduler, one 8th note at a time with light swing
    let step = 0;
    let next = ctx.currentTime + 0.1;
    const schedule = () => {
      while (next < ctx.currentTime + 0.4) {
        const bar = Math.floor(step / 8);
        const pos = step % 8;
        const chord = CHORDS[Math.floor(bar / 2) % CHORDS.length];
        const t = next + (pos % 2 ? BEAT * 0.08 : 0); // swing the off-beats
        if (pos === 0 && bar % 2 === 0) {
          chord.notes.forEach((n, i) => keys(ctx, master, n, t + i * 0.015, BEAT * 7.5));
        }
        if (pos === 5 && bar % 2 === 1) keys(ctx, master, chord.notes[3] + 12, t, BEAT * 2, 0.03);
        if (pos === 0 || pos === 5) bass(ctx, master, chord.bass, t, BEAT * 1.5);
        if (pos === 0 || pos === 3) kick(ctx, master, t);
        if (pos === 2 || pos === 6) hit(ctx, master, noise, t, "snare");
        hit(ctx, master, noise, t, "hat");
        next += BEAT / 2;
        step++;
      }
    };
    schedule();
    timerRef.current = setInterval(schedule, 100);
    setPlaying(true);
  }

  function stop() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    const ctx = ctxRef.current;
    if (ctx && masterRef.current) {
      masterRef.current.gain.cancelScheduledValues(ctx.currentTime);
      masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, ctx.currentTime);
      masterRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    }
    const c = crackleRef.current;
    crackleRef.current = null;
    setTimeout(() => c?.stop(), 900);
    setPlaying(false);
  }

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
      ctxRef.current?.close();
    },
    []
  );

  return { playing, toggle: () => (playing ? stop() : start()) };
}

/** Small pill button for the menu bar. */
export default function JazzToggle({ className = "" }: { className?: string }) {
  const { playing, toggle } = useLofi();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Pause lo-fi music" : "Play lo-fi music"}
      title={playing ? "Pause lo-fi" : "Play lo-fi"}
      className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 transition-colors hover:bg-white/40 ${className}`}
    >
      <span aria-hidden>{playing ? "🎧" : "🎵"}</span>
      <span className="hidden sm:inline">{playing ? "lo-fi on" : "lo-fi off"}</span>
      {playing && (
        <span className="flex items-end gap-[2px] h-3" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[2px] bg-current rounded animate-pulse"
              style={{ height: `${6 + i * 3}px`, animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </span>
      )}
    </button>
  );
}

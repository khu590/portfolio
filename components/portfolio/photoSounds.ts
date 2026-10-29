// components/portfolio/photoSounds.ts
// Small hover sounds for the photos, made with the Web Audio API (no files).
// Browsers only allow sound after the visitor has clicked somewhere on the
// page, so the first hover before any click stays silent. That's expected.
"use client";

let ctx: AudioContext | null = null;
let last = 0;

function audio(): AudioContext | null {
  const now = Date.now();
  if (now - last < 250) return null; // don't machine-gun on quick hovers
  last = now;
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = ctx ?? new Ctx();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  } catch {
    return null; // audio not available, stay silent
  }
}

function noise(ac: AudioContext, seconds: number, shape: (p: number) => number) {
  const buf = ac.createBuffer(1, Math.ceil(ac.sampleRate * seconds), ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * shape(j / d.length);
  const src = ac.createBufferSource();
  src.buffer = buf;
  return src;
}

/** Camera shutter: two short filtered clicks. */
export function shutter() {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime;
  [0, 0.07].forEach((offset, i) => {
    const src = noise(ac, 0.05, (p) => Math.pow(1 - p, 3));
    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = i === 0 ? 2600 : 1800;
    const g = ac.createGain();
    g.gain.value = 0.18;
    src.connect(bp).connect(g).connect(ac.destination);
    src.start(t + offset);
  });
}

/** Paper flutter: a soft swish, like a photo moving on a line. */
export function rustle() {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime;
  const src = noise(ac, 0.28, (p) => Math.sin(Math.PI * p) * (0.6 + 0.4 * Math.sin(p * 40)));
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 0.8;
  bp.frequency.setValueAtTime(1400, t);
  bp.frequency.linearRampToValueAtTime(3200, t + 0.28);
  const g = ac.createGain();
  g.gain.value = 0.12;
  src.connect(bp).connect(g).connect(ac.destination);
  src.start(t);
}

/** Film advance: a quick double tick, like a projector moving a frame on. */
export function filmClick() {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime;
  [0, 0.045].forEach((offset, i) => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "square";
    o.frequency.value = i ? 900 : 1300;
    g.gain.setValueAtTime(0.06, t + offset);
    g.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.03);
    o.connect(g).connect(ac.destination);
    o.start(t + offset);
    o.stop(t + offset + 0.035);
  });
}

/** Lanyard clip: a small, bright metallic ting. */
export function ting() {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime;
  [2637, 3951].forEach((f, i) => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "sine";
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(i ? 0.03 : 0.05, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    o.connect(g).connect(ac.destination);
    o.start(t);
    o.stop(t + 0.5);
  });
}

// components/portfolio/photoSounds.ts
// One soft, light hover sound for the photos: a single quiet bell-like note,
// made with the Web Audio API (no files). Each group of photos gets its own
// note so it doesn't feel repetitive. Browsers only allow sound after the
// visitor has clicked somewhere on the page, so the first hover before any
// click stays silent. That's expected.
"use client";

let ctx: AudioContext | null = null;
let last = 0;

// notes from a pentatonic scale, so any two sound fine together
const NOTES = {
  film: [784, 880], // G5, A5
  polaroid: [659, 784], // E5, G5
  line: [587, 659], // D5, E5
  badge: [880, 1047], // A5, C6
};

function chime(notes: number[]) {
  const now = Date.now();
  if (now - last < 220) return; // no rapid repeats when sweeping across photos
  last = now;
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = ctx ?? new Ctx();
    if (ctx.state === "suspended") ctx.resume();
    const ac = ctx;
    const t = ac.currentTime;
    const f = notes[Math.floor(Math.random() * notes.length)];
    const out = ac.createGain();
    const soft = ac.createBiquadFilter();
    soft.type = "lowpass";
    soft.frequency.value = 2400;
    out.connect(soft).connect(ac.destination);
    // fundamental plus a faint octave: a soft glassy note
    [
      [f, 0.035],
      [f * 2, 0.008],
    ].forEach(([freq, vol]) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.02); // gentle attack, no click
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      o.connect(g).connect(out);
      o.start(t);
      o.stop(t + 0.95);
    });
  } catch {
    /* audio not available, stay silent */
  }
}

export const filmClick = () => chime(NOTES.film);
export const shutter = () => chime(NOTES.polaroid);
export const rustle = () => chime(NOTES.line);
export const ting = () => chime(NOTES.badge);

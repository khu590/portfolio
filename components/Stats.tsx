// components/Stats.tsx
"use client";

import { stats } from "@/lib/data";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section className="px-5 md:px-8 pb-2">
      <div className="max-w-[860px] mx-auto">
        <Reveal>
          <p className="font-mono text-xs text-muted mb-3">
            <span className="text-purple">#</span> key_metrics
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-lg overflow-hidden">
            {stats.map((s, i) => (
              <div key={i} className="bg-paper p-5">
                <div className="font-mono font-extrabold text-2xl md:text-3xl text-purple leading-none mb-1">
                  {s.value}
                </div>
                <div className="font-mono text-[0.65rem] text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

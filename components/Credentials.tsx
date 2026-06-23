// components/Credentials.tsx
"use client";

import { certifications, awards } from "@/lib/data";
import Reveal from "./Reveal";

export default function Credentials() {
  return (
    <section className="px-5 md:px-8 py-16 border-t border-line">
      <div className="max-w-[860px] mx-auto">
        <Reveal>
          <p className="font-mono text-xs text-muted mb-2">
            <span className="text-purple">#</span> credentials.yml
          </p>
          <h2 className="font-mono font-bold text-2xl mb-8">
            Awards &amp; Certifications
          </h2>
        </Reveal>

        {/* Awards as sticky-note style — the one playful motif we keep */}
        <Reveal delay={0.1}>
          <p className="font-mono text-xs text-muted mb-3">
            <span className="text-purple">#</span> awards
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            {awards.map((a, i) => (
              <div
                key={i}
                className="bg-note shadow-sm px-4 py-3 rounded-sm font-mono text-[0.8rem] text-ink/80"
                style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
              >
                🏆 {a.title}
                <div className="text-[0.65rem] text-ink/50 mt-0.5">
                  {a.org}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-mono text-xs text-muted mb-3">
            <span className="text-purple">#</span> certifications.yml
          </p>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {certifications.map((c, i) => (
              <div
                key={i}
                className="flex items-baseline gap-2 text-[0.88rem] border border-line rounded-md px-4 py-2.5"
              >
                <span className="font-mono text-purple font-bold flex-shrink-0">
                  [✓]
                </span>
                <span>
                  {c.name}{" "}
                  <span className="font-mono text-[0.7rem] text-muted">
                    — {c.issuer}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

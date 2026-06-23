// components/Education.tsx
"use client";

import { education, certifications, awards } from "@/lib/data";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="px-5 md:px-8 py-16 border-t border-line">
      <div className="max-w-[860px] mx-auto">
        <Reveal>
          <p className="font-mono text-xs text-muted mb-2">
            <span className="text-purple">#</span> education.yml
          </p>
          <h2 className="font-mono font-bold text-2xl mb-8">Education</h2>
        </Reveal>

        <div className="flex flex-col gap-5 mb-12">
          {education.map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border border-line rounded-lg p-6">
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                  <span className="font-mono font-bold text-[0.95rem]">
                    {e.degree}
                  </span>
                  <span className="font-mono text-[0.7rem] bg-purple-bg text-purple px-2.5 py-0.5 rounded">
                    {e.grade}
                  </span>
                </div>
                <div className="font-mono text-[0.78rem] text-muted mb-3">
                  {e.school} · {e.location} · {e.date}
                </div>
                <p className="text-[0.9rem] text-inksoft">{e.modules}</p>
              </div>
            </Reveal>
          ))}
        </div>

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

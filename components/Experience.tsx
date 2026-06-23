// components/Experience.tsx
"use client";

import { experience } from "@/lib/data";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="px-5 md:px-8 py-16 border-t border-line">
      <div className="max-w-[860px] mx-auto">
        <Reveal>
          <p className="font-mono text-xs text-muted mb-2">
            <span className="text-purple">#</span> experience.log
          </p>
          <h2 className="font-mono font-bold text-2xl mb-8">
            Professional Experience
          </h2>
        </Reveal>

        <div className="flex flex-col gap-5">
          {experience.map((job, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border border-line rounded-lg overflow-hidden">
                <div className="bg-paper2 px-6 py-4 flex flex-wrap justify-between items-baseline gap-2">
                  <div>
                    <div className="font-mono font-bold text-[0.95rem]">
                      {job.role}
                    </div>
                    <div className="font-mono text-[0.78rem] text-purple">
                      {job.company}{" "}
                      <span className="text-muted">· {job.sub}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono text-[0.7rem] text-muted">
                      {job.date}
                    </span>
                    <span className="font-mono text-[0.62rem] bg-amber-bg text-amber px-2 py-0.5 rounded">
                      {job.badge}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <ul className="flex flex-col gap-2.5">
                    {job.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="text-[0.95rem] text-inksoft leading-relaxed pl-5 relative"
                      >
                        <span className="absolute left-0 text-amber font-mono font-bold">
                          ›
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

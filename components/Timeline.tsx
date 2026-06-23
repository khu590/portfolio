// components/Timeline.tsx
"use client";

import { motion } from "framer-motion";
import { experience, education } from "@/lib/data";
import Reveal from "./Reveal";

type TimelineEntry =
  | ({ type: "work" } & (typeof experience)[number])
  | ({ type: "education" } & (typeof education)[number]);

// Merge both tracks into one chronological spine, most recent first.
const timeline: TimelineEntry[] = [...experience, ...education].sort((a, b) =>
  b.sortDate.localeCompare(a.sortDate)
);

export default function Timeline() {
  return (
    <section
      id="experience"
      className="px-5 md:px-8 py-16 border-t border-line"
    >
      <div className="max-w-[860px] mx-auto">
        <Reveal>
          <p className="font-mono text-xs text-muted mb-2">
            <span className="text-purple">#</span> timeline.log
          </p>
          <h2 className="font-mono font-bold text-2xl mb-2">
            How I got here
          </h2>
          <p className="text-inksoft text-[0.95rem] max-w-[520px] mb-10">
            Two tracks running in parallel — hands-on production work on one
            side, and the academic grounding to go deeper on the other.
          </p>
        </Reveal>

        <div id="education" className="relative">
          {/* spine */}
          <div className="absolute left-[15px] md:left-1/2 top-2 bottom-2 w-px bg-line md:-translate-x-1/2" />

          <div className="flex flex-col gap-8">
            {timeline.map((entry, i) => {
              const isWork = entry.type === "work";
              const sideClass = isWork ? "md:pr-[52%]" : "md:pl-[52%] md:text-left";
              return (
                <Reveal key={i} delay={i * 0.08} className="relative">
                  <div
                    className={`relative pl-10 md:pl-0 ${sideClass} ${
                      isWork ? "md:text-right" : ""
                    }`}
                  >
                    {/* node on the spine */}
                    <span
                      className={`absolute left-[15px] md:left-1/2 top-1.5 w-3 h-3 rounded-full -translate-x-1/2 border-2 ${
                        entry.current
                          ? "bg-purple border-purple"
                          : "bg-paper border-muted"
                      }`}
                    />
                    {entry.current && (
                      <span className="absolute left-[15px] md:left-1/2 top-1.5 w-3 h-3 rounded-full -translate-x-1/2 bg-purple animate-ping opacity-50" />
                    )}

                    <div className="border border-line rounded-lg p-5 inline-block w-full md:w-auto md:min-w-[340px] text-left">
                      <div className="flex flex-wrap items-baseline gap-2 mb-1 justify-between">
                        <span
                          className={`font-mono text-[0.62rem] uppercase tracking-wide px-2 py-0.5 rounded ${
                            isWork
                              ? "bg-amber-bg text-amber"
                              : "bg-purple-bg text-purple"
                          }`}
                        >
                          {isWork ? "work" : "education"}
                        </span>
                        {entry.current && (
                          <span className="font-mono text-[0.62rem] uppercase tracking-wide px-2 py-0.5 rounded bg-purple text-paper">
                            current
                          </span>
                        )}
                      </div>

                      {isWork ? (
                        <>
                          <div className="font-mono font-bold text-[0.95rem] mt-1">
                            {entry.role}
                          </div>
                          <div className="font-mono text-[0.78rem] text-purple mb-1">
                            {entry.company}
                          </div>
                          <div className="font-mono text-[0.7rem] text-muted mb-3">
                            {entry.sub} · {entry.date}
                          </div>
                          <ul className="flex flex-col gap-2">
                            {entry.highlights.slice(0, 3).map((h, j) => (
                              <li
                                key={j}
                                className="text-[0.85rem] text-inksoft leading-relaxed pl-4 relative"
                              >
                                <span className="absolute left-0 text-amber font-mono font-bold">
                                  ›
                                </span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <>
                          <div className="font-mono font-bold text-[0.95rem] mt-1">
                            {entry.degree}
                          </div>
                          <div className="font-mono text-[0.78rem] text-purple mb-1">
                            {entry.school}
                          </div>
                          <div className="font-mono text-[0.7rem] text-muted mb-3">
                            {entry.location} · {entry.date}
                          </div>
                          <p className="text-[0.85rem] text-inksoft leading-relaxed mb-2">
                            {entry.modules}
                          </p>
                          <span className="font-mono text-[0.68rem] bg-paper2 text-inksoft px-2 py-0.5 rounded">
                            {entry.grade}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

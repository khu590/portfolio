// components/Skills.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import Reveal from "./Reveal";

export default function Skills() {
  const [pinned, setPinned] = useState<string | null>(null);

  return (
    <section id="skills" className="px-5 md:px-8 py-16 border-t border-line">
      <div className="max-w-[860px] mx-auto">
        <Reveal>
          <p className="font-mono text-xs text-muted mb-2">
            <span className="text-purple">#</span> skills.json
          </p>
          <h2 className="font-mono font-bold text-2xl mb-2">
            Skills &amp; Technologies
          </h2>
          <p className="font-mono text-[0.7rem] text-muted mb-8">
            click a tag to pin it
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {skills.map((group, i) => {
            const accent = group.color === "purple" ? "border-l-purple" : "border-l-amber";
            const tagBg =
              group.color === "purple" ? "bg-purple-bg text-purple" : "bg-amber-bg text-amber";
            return (
              <Reveal key={i} delay={(i % 2) * 0.08}>
                <motion.div
                  className={`border border-line ${accent} border-l-[3px] rounded-lg p-5 h-full transition-colors`}
                  whileHover={{ y: -4, borderColor: "rgba(28,27,23,0.2)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="font-mono text-[0.7rem] font-bold tracking-wide uppercase text-muted mb-3">
                    {group.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item, j) => {
                      const id = `${group.category}-${item}`;
                      const isPinned = pinned === id;
                      return (
                        <motion.span
                          key={j}
                          onClick={() => setPinned(isPinned ? null : id)}
                          className={`font-mono text-[0.7rem] px-2.5 py-1 rounded cursor-pointer ${
                            isPinned ? "bg-ink text-paper" : tagBg
                          }`}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          {item}
                          {isPinned && " ★"}
                        </motion.span>
                      );
                    })}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

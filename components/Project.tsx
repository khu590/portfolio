// components/Project.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { project } from "@/lib/data";
import Reveal from "./Reveal";

const FAKE_LOGS = [
  "$ loading dataset... 3,264 MRI scans",
  "$ preprocessing images... done",
  "$ training CNN... epoch 12/12",
  "$ validation accuracy: stable",
  "$ exporting model → flask_app/model.h5",
  "$ deployment status: ✓ live",
];

export default function Project() {
  const [showLogs, setShowLogs] = useState(false);

  return (
    <section id="project" className="px-5 md:px-8 py-16 border-t border-line">
      <div className="max-w-[860px] mx-auto">
        <Reveal>
          <p className="font-mono text-xs text-muted mb-2">
            <span className="text-purple">#</span> project.py
          </p>
          <h2 className="font-mono font-bold text-2xl mb-8">
            Featured Project
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border border-line rounded-lg overflow-hidden">
            <button
              onClick={() => setShowLogs((v) => !v)}
              className="w-full bg-ink text-paper px-6 py-3 flex justify-between items-center font-mono text-[0.8rem] hover:bg-[#2a2922] transition-colors"
            >
              <span>medical_image_classifier.py</span>
              <span className="text-purple flex items-center gap-2">
                ✓ deployed
                <span className="text-muted text-[0.65rem]">
                  {showLogs ? "▲ hide logs" : "▼ view logs"}
                </span>
              </span>
            </button>

            <AnimatePresence>
              {showLogs && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="bg-[#15140F] text-[#9CDB9C] font-mono text-[0.72rem] overflow-hidden"
                >
                  <div className="px-6 py-4 flex flex-col gap-1.5">
                    {FAKE_LOGS.map((log, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        {log}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-6">
              <p className="font-mono text-[0.7rem] text-amber uppercase tracking-wide mb-2">
                {project.subtitle}
              </p>
              <h3 className="font-mono text-lg font-bold mb-3">
                {project.title}
              </h3>
              <p className="text-[0.95rem] text-inksoft leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.stack.map((s, i) => (
                  <span
                    key={i}
                    className="font-mono text-[0.7rem] bg-amber-bg text-amber px-2.5 py-1 rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    className="bg-paper2 rounded-md p-3 text-center cursor-default"
                    whileHover={{
                      y: -3,
                      backgroundColor: "#EFE7FB",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="font-mono font-bold text-purple text-sm mb-1">
                      {m.value}
                    </div>
                    <div className="font-mono text-[0.6rem] text-muted">
                      {m.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

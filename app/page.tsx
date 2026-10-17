"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Landing from "@/components/Landing";
import NycPage from "@/components/nyc/NycPage";
import IntroLoader from "@/components/IntroLoader";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);

  function handleEnter(targetId?: string) {
    setTarget(targetId);
    setEntered(true);
  }

  return (
    <>
      <IntroLoader />

      <AnimatePresence>
        {!entered && <Landing onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Recruiter shortcut, like a "skip to résumé" link */}
      {!entered && (
        <a
          href="/cv"
          className="fixed bottom-4 left-4 z-[60] rounded-full bg-white/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-scrap-rosedark backdrop-blur transition-colors hover:bg-scrap-rosedark hover:text-white md:bottom-6 md:left-6"
        >
          In a hurry? Plain résumé →
        </a>
      )}

      {entered && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <NycPage initialTarget={target} />
        </motion.main>
      )}
    </>
  );
}

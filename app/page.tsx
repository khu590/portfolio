"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Landing from "@/components/Landing";
import NycPage from "@/components/nyc/NycPage";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);

  function handleEnter(targetId?: string) {
    setTarget(targetId);
    setEntered(true);
  }


  return (
    <>
      <AnimatePresence>
        {!entered && <Landing onEnter={handleEnter} />}
      </AnimatePresence>

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

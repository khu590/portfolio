// app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Landing from "@/components/Landing";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Project from "@/components/Project";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const pendingTarget = useRef<string | null>(null);

  function handleEnter(targetId?: string) {
    pendingTarget.current = targetId ?? null;
    setEntered(true);
  }

  // allow re-visiting the landing via back button / hash, optional polish
  useEffect(() => {
    if (entered) {
      document.body.style.overflow = "auto";
      if (pendingTarget.current) {
        const id = pendingTarget.current;
        // wait for the fade-in transition + layout to settle before scrolling
        const t = setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 500);
        pendingTarget.current = null;
        return () => clearTimeout(t);
      }
    }
  }, [entered]);

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
          <NavBar />
          <Hero />
          <Timeline />
          <Skills />
          <Project />
          <Credentials />
          <Contact />
        </motion.main>
      )}
    </>
  );
}

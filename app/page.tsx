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

          {/* WhatsApp floating button — fixed bottom-left */}
          <motion.a
            href="https://wa.me/353892028094?text=Hi%20Khushi%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect."
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: "#25D366" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* WhatsApp SVG icon */}
            <svg
              viewBox="0 0 32 32"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
            >
              <path d="M16.001 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.64 4.56 1.755 6.464L2.667 29.333l7.12-1.717A13.285 13.285 0 0 0 16.001 29.333c7.363 0 13.332-5.97 13.332-13.333S23.364 2.667 16.001 2.667Zm0 24c-2.12 0-4.107-.587-5.803-1.603l-.413-.245-4.224 1.019 1.056-4.107-.267-.427A10.623 10.623 0 0 1 5.334 16c0-5.888 4.779-10.667 10.667-10.667S26.668 10.112 26.668 16 21.889 26.667 16.001 26.667Zm5.853-7.893c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.96 1.253-.133.213-.267.24-.587.08-.32-.16-1.347-.496-2.565-1.584-.947-.845-1.587-1.888-1.773-2.208-.187-.32-.021-.493.14-.653.144-.144.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.253-.613-.517-.533-.72-.544-.187-.011-.4-.013-.613-.013-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.463 4.827.763.328 1.36.524 1.823.672.767.24 1.467.208 2.019.128.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373Z" />
            </svg>
          </motion.a>
        </motion.main>
      )}
    </>
  );
}

// components/NavBar.tsx
"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "about.md" },
  { href: "#experience", label: "timeline.log" },
  { href: "#skills", label: "skills.json" },
  { href: "#project", label: "project.py" },
];

export default function NavBar() {
  return (
    <motion.nav
      className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-line"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[980px] mx-auto flex items-center h-12 px-5 gap-1">
        <div className="flex gap-1.5 mr-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E0645A]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E0A93C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#5FAE5C]" />
        </div>
        <div className="flex gap-0.5 overflow-x-auto flex-1 scrollbar-none">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[0.72rem] px-3 py-1.5 rounded-t text-muted hover:text-ink hover:bg-paper2 transition-colors whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="hidden sm:inline-block font-mono text-[0.7rem] px-3 py-1.5 border border-line rounded text-inksoft hover:border-ink hover:text-ink transition-colors ml-2"
        >
          contact
        </a>
      </div>
    </motion.nav>
  );
}

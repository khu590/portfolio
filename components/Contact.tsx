// components/Contact.tsx
"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";

const contacts = [
  {
    label: "Email",
    value: "khushi.n.bijkal@gmail.com",
    href: `mailto:${profile.email}`,
    color: "#A8425E",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/khu590",
    href: profile.github,
    color: "#1C1B17",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/khushi-bijkal",
    href: profile.linkedin,
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+353 89 202 8094",
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    color: "#D97B29",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <footer id="contact" className="bg-ink text-paper">
      <div className="max-w-[860px] mx-auto px-5 md:px-8 py-16">
        <Reveal>
          <p className="font-mono text-sm text-purple mb-4">
            $ echo &quot;let&apos;s build something&quot;
            <span className="inline-block w-2 h-4 bg-paper ml-2 animate-blink align-middle" />
          </p>
          <h2 className="font-mono text-2xl md:text-3xl leading-snug mb-10 max-w-[480px]">
            Looking for a data-driven engineer who ships{" "}
            <span className="text-amber">production-grade</span> work?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contacts.map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={c.label}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-[#33312A] hover:border-[#555] transition-colors"
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                // stagger via transition delay
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <span
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-transform"
                  style={{ backgroundColor: `${c.color}22`, color: c.color }}
                >
                  {c.icon}
                </span>
                <span className="font-mono text-[0.7rem] text-muted uppercase tracking-widest">
                  {c.label}
                </span>
                <span className="font-mono text-[0.65rem] text-[#C9C5B5] text-center leading-snug break-all">
                  {c.value}
                </span>
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="border-t border-[#33312A] px-5 md:px-8 py-4 max-w-[860px] mx-auto">
        <p className="font-mono text-[0.65rem] text-muted">
          // EOF — {profile.name}, {profile.location} — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

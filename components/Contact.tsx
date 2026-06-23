// components/Contact.tsx
"use client";

import { profile } from "@/lib/data";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <footer id="contact" className="bg-ink text-paper">
      <div className="max-w-[860px] mx-auto px-5 md:px-8 py-16">
        <Reveal>
          <p className="font-mono text-sm text-purple mb-4">
            $ echo &quot;let&apos;s build something&quot;
            <span className="inline-block w-2 h-4 bg-paper ml-2 animate-blink align-middle" />
          </p>
          <h2 className="font-mono text-2xl md:text-3xl leading-snug mb-8 max-w-[480px]">
            Looking for a data-driven engineer who ships{" "}
            <span className="text-amber">production-grade</span> work?
          </h2>

          <div className="flex flex-col gap-2.5">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-[0.88rem] text-[#C9C5B5] hover:text-paper transition-colors flex gap-3"
            >
              <span className="text-muted w-16 flex-shrink-0">email</span>
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.88rem] text-[#C9C5B5] hover:text-paper transition-colors flex gap-3"
            >
              <span className="text-muted w-16 flex-shrink-0">github</span>
              github.com/khu590
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.88rem] text-[#C9C5B5] hover:text-paper transition-colors flex gap-3"
            >
              <span className="text-muted w-16 flex-shrink-0">linkedin</span>
              linkedin.com/in/khushi-bijkal
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="font-mono text-[0.88rem] text-[#C9C5B5] hover:text-paper transition-colors flex gap-3"
            >
              <span className="text-muted w-16 flex-shrink-0">phone</span>
              {profile.phone}
            </a>
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

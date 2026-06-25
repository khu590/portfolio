// components/Landing.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/data";

// The desktop canvas is designed at this fixed size, then scaled to fit
// whatever viewport it's actually shown on. 1440x900 matches the most common
// laptop viewport (13"-15" screens at 1280-1440px logical width) so it needs
// little to no scaling on most laptops, and scales cleanly up/down otherwise.
const CANVAS_W = 1440;
const CANVAS_H = 900;

type CardProps = {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  hoverRotate?: number;
  onClick?: () => void;
  delay?: number;
  ariaLabel?: string;
};

/**
 * A single scrapbook card. Sits at a fixed tilt, straightens + lifts on
 * hover, and is fully clickable/keyboard-accessible when onClick is given.
 */
function ScrapCard({
  children,
  className = "",
  rotate = 0,
  hoverRotate = 0,
  onClick,
  delay = 0,
  ariaLabel,
}: CardProps) {
  const interactive = !!onClick;
  return (
    <motion.div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={(e) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`absolute ${interactive ? "cursor-pointer" : ""} ${className}`}
      style={{ rotate }}
      initial={{ opacity: 0, scale: 0.85, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate }}
      whileHover={
        interactive
          ? { rotate: hoverRotate, scale: 1.06, zIndex: 40, y: -6 }
          : undefined
      }
      whileTap={interactive ? { scale: 0.97 } : undefined}
      whileFocus={interactive ? { rotate: hoverRotate, scale: 1.06, zIndex: 40 } : undefined}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: { delay, duration: 0.5 },
        rotate: { type: "spring", stiffness: 260, damping: 18 },
      }}
    >
      {children}
    </motion.div>
  );
}

function Star({
  className,
  size = 24,
  delay = 0,
}: {
  className: string;
  size?: number;
  delay?: number;
}) {
  return (
    <motion.svg
      className={`absolute pointer-events-none drop-shadow-md ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      initial={{ opacity: 0, scale: 0, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 0.5, ease: "backOut" }}
    >
      <path
        d="M12 1l2.9 7.2L22 11l-7.1 2.8L12 21l-2.9-7.2L2 11l7.1-2.8z"
        fill="#E8C15A"
        stroke="#B8932F"
        strokeWidth="0.5"
      />
    </motion.svg>
  );
}

/** ── Shared small content blocks reused by both layouts ── */

function ContactNote({ onClick }: { onClick: () => void }) {
  return (
    <div className="bg-scrap-orange shadow-lg px-5 py-7 relative">
      <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-[#E0A93C]/70 rotate-[-3deg]" />
      <p className="font-hand text-2xl text-white text-center leading-tight">
        Contact
        <br />
        me
      </p>
    </div>
  );
}

function AboutCard() {
  return (
    <div className="bg-scrap-pink/95 shadow-xl rounded-sm w-full h-full p-6 flex flex-col">
      <p className="font-hand text-3xl text-white mb-2">
        About
        <br />
        me
      </p>
      <p className="font-hand text-base text-white/85 leading-snug mt-auto">
        Data Analyst → AI/ML engineer. Production SQL systems + an MSc in
        Data Analytics. Click to read more →
      </p>
    </div>
  );
}

function GoalsCard() {
  return (
    <div className="bg-scrap-cream border-2 border-scrap-rosedark/40 shadow-md w-full h-full p-4">
      <p className="font-hand text-xl text-scrap-rosedark font-bold border-b-2 border-scrap-rosedark/30 pb-1 mb-3">
        GOALS:
      </p>
      <ul className="font-hand text-sm text-inksoft/80 space-y-2">
        <li>1. MSc Data Analytics — 1:1</li>
        <li>2. Ship applied ML projects</li>
        <li>3. Land an AI/data role</li>
        <li>4. Keep learning, always</li>
        <li>5. Build things that matter</li>
      </ul>
    </div>
  );
}

function HobbiesCard() {
  return (
    <div className="relative bg-[#F3DCC0] shadow-lg w-full h-full border-2 border-[#1B3A6B] flex items-center justify-center">
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C1272D 0 14px, transparent 14px 28px), repeating-linear-gradient(45deg, #1B3A6B 0 14px, transparent 14px 28px)",
          backgroundPosition: "0 0, 0 6px",
          backgroundSize: "100% 6px",
          backgroundRepeat: "no-repeat",
        }}
      />
      <p className="font-hand text-2xl text-scrap-rosedark">Hobbies</p>
    </div>
  );
}

function SkillsCard() {
  return (
    <div className="relative bg-scrap-rose shadow-xl rounded-sm w-full h-full p-6 pl-12">
      <div className="absolute left-2 top-3 bottom-3 flex flex-col justify-between">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="w-4 h-4 rounded-full border-2 border-scrap-rosedark/50 bg-scrap-bg/40"
          />
        ))}
      </div>
      <p className="font-hand text-3xl text-white mb-4">Skills</p>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-px bg-white/30" />
        ))}
      </div>
    </div>
  );
}

function ProjectsCard() {
  return (
    <div className="relative bg-scrap-cream shadow-xl w-full h-full p-6 border border-[#D9C7A8]">
      <div className="space-y-3.5 mt-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-px bg-[#C9B896]" />
        ))}
      </div>
      <p className="absolute bottom-6 left-6 font-hand text-2xl text-scrap-rosedark">
        Projects
      </p>
    </div>
  );
}

function EnterButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="font-hand text-xl bg-scrap-rosedark text-white px-8 py-3 rounded-full shadow-lg hover:bg-scrap-rose transition-colors flex items-center gap-2"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
    >
      step into my world
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.3 }}
      >
        →
      </motion.span>
    </motion.button>
  );
}

/** ── Desktop / laptop layout: fixed canvas, dynamically scaled to fit ── */

function DesktopBoard({ onEnter }: { onEnter: (id?: string) => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function fit() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Use nearly the full viewport, never upscale past 1x so the board
      // doesn't look blurry/oversized on big screens.
      const s = Math.min(vw / CANVAS_W, vh / CANVAS_H, 1);
      setScale(s);
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* ── Headline — centered on the canvas, bigger ── */}
        <motion.p
          className="absolute top-[228px] left-1/2 -translate-x-1/2 font-hand text-3xl text-scrap-pink whitespace-nowrap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Hello! I am
        </motion.p>

        <motion.h1
          className="absolute top-[270px] left-1/2 -translate-x-1/2 w-[480px] font-script text-[5.5rem] leading-[1.05] text-scrap-rosedark text-center"
          style={{ textShadow: "3px 4px 0px rgba(216,141,160,0.45)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
          {profile.name.split(" ")[0]}
          <br />
          {profile.name.split(" ")[1]}
        </motion.h1>

        <Star className="top-[480px] left-[600px]" size={42} delay={0.6} />
        <Star className="top-[355px] left-[940px]" size={26} delay={0.7} />
        <Star className="top-[535px] left-[810px]" size={22} delay={0.8} />

        {/* Contact me */}
        <ScrapCard
          className="top-[68px] left-[76px] w-[135px]"
          rotate={-7}
          delay={0.15}
          onClick={() => onEnter("contact")}
          ariaLabel="Go to contact section"
        >
          <ContactNote onClick={() => onEnter("contact")} />
        </ScrapCard>

        {/* Map decoration */}
        <div
          className="absolute top-[122px] left-[112px] w-[176px] h-[212px] bg-[#E4DEC8] border border-[#C9C0A0] shadow-md opacity-90"
          style={{ rotate: "-4deg" }}
        />

        {/* Film strip */}
        <motion.div
          className="absolute top-[130px] left-[212px] w-[346px] h-[112px] bg-[#9C3A1F] rounded-sm shadow-lg flex items-center gap-1.5 px-3"
          style={{ rotate: "-3deg" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {[
            "/images/hero-wall-portrait.jpg",
            "/images/cafe-candid.jpg",
            "/images/illustrated-avatar.jpg",
            "/images/hero-wall-portrait.jpg",
          ].map((src, i) => (
            <div
              key={i}
              className="relative w-[70px] h-[90px] bg-white flex-shrink-0 overflow-hidden border-2 border-[#9C3A1F]"
            >
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </motion.div>

        {/* About me */}
        <ScrapCard
          className="top-[252px] left-[212px] w-[248px] h-[220px]"
          rotate={-1.5}
          delay={0.2}
          onClick={() => onEnter("about")}
          ariaLabel="Go to about section"
        >
          <AboutCard />
        </ScrapCard>

        {/* Goals */}
        <ScrapCard
          className="top-[486px] left-[76px] w-[176px] h-[176px]"
          rotate={-3}
          delay={0.25}
          onClick={() => onEnter("education")}
          ariaLabel="Go to education section"
        >
          <GoalsCard />
        </ScrapCard>

        {/* Hobbies */}
        <ScrapCard
          className="top-[531px] left-[252px] w-[302px] h-[148px]"
          rotate={-2}
          delay={0.3}
          onClick={() => onEnter("about")}
          ariaLabel="Go to about section"
        >
          <HobbiesCard />
        </ScrapCard>

        {/* Skills */}
        <ScrapCard
          className="top-[90px] left-[1004px] w-[315px] h-[248px]"
          rotate={2}
          delay={0.2}
          onClick={() => onEnter("skills")}
          ariaLabel="Go to skills section"
        >
          <SkillsCard />
        </ScrapCard>

        <div className="absolute top-[72px] left-[1300px] text-3xl rotate-12 opacity-80">
          📎
        </div>
        <div className="absolute top-[76px] left-[981px] text-3xl -rotate-12 opacity-80">
          🌿
        </div>

        {/* Projects */}
        <ScrapCard
          className="top-[450px] left-[932px] w-[360px] h-[225px]"
          rotate={2}
          delay={0.35}
          onClick={() => onEnter("project")}
          ariaLabel="Go to projects section"
        >
          <ProjectsCard />
        </ScrapCard>

        {/* Polaroids */}
        <motion.div
          className="absolute top-[387px] left-[1125px] w-[83px] bg-white p-2 pb-3 shadow-lg"
          style={{ rotate: "-6deg" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ rotate: 0, scale: 1.08, zIndex: 40 }}
        >
          <div className="relative w-full h-[79px] overflow-hidden bg-amber-bg">
            <Image src="/images/illustrated-avatar.jpg" alt="" fill className="object-cover" />
          </div>
        </motion.div>
        <motion.div
          className="absolute top-[376px] left-[1210px] w-[83px] bg-white p-2 pb-3 shadow-lg"
          style={{ rotate: "5deg" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          whileHover={{ rotate: 0, scale: 1.08, zIndex: 40 }}
        >
          <div className="relative w-full h-[79px] overflow-hidden bg-paper2">
            <Image src="/images/cafe-candid.jpg" alt="" fill className="object-cover" />
          </div>
        </motion.div>

        {/* Decorative emoji touches */}
        <div className="absolute top-[608px] left-[846px] text-6xl opacity-90">🐈</div>
        <div className="absolute top-[644px] left-[1246px] text-4xl rotate-12 opacity-90">
          🦋
        </div>
        <div className="absolute top-[459px] left-[1300px] text-3xl rotate-12 opacity-80">
          💿
        </div>

        <Star className="top-[608px] left-[176px]" size={18} delay={0.5} />
        <Star className="top-[652px] left-[198px]" size={14} delay={0.55} />
        <Star className="top-[698px] left-[180px]" size={16} delay={0.6} />

        <div className="absolute top-[630px] left-[558px] text-5xl rotate-12 opacity-90">
          🌸
        </div>

        {/* Enter button — centered under the headline */}
        <motion.div
          className="absolute top-[742px] left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <EnterButton onClick={() => onEnter()} />
        </motion.div>
      </div>
    </div>
  );
}

/** ── Mobile layout: vertical scrapbook journal, same cards stacked ── */

function MobileBoard({ onEnter }: { onEnter: (id?: string) => void }) {
  return (
    <div className="w-full min-h-full px-5 pt-10 pb-14 flex flex-col items-center gap-5">
      <motion.p
        className="font-hand text-xl text-scrap-pink"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        Hello! I am
      </motion.p>

      <motion.h1
        className="font-script text-[3.4rem] leading-[1.05] text-scrap-rosedark text-center -mt-2"
        style={{ textShadow: "2px 3px 0px rgba(216,141,160,0.45)" }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {profile.name.split(" ")[0]}
        <br />
        {profile.name.split(" ")[1]}
      </motion.h1>

      {/* film strip, smaller, centered */}
      <motion.div
        className="w-[260px] h-[90px] bg-[#9C3A1F] rounded-sm shadow-lg flex items-center gap-1 px-2 mt-1"
        style={{ rotate: "-2deg" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        {[
          "/images/hero-wall-portrait.jpg",
          "/images/cafe-candid.jpg",
          "/images/illustrated-avatar.jpg",
        ].map((src, i) => (
          <div
            key={i}
            className="relative w-[78px] h-[72px] bg-white flex-shrink-0 overflow-hidden border-2 border-[#9C3A1F]"
          >
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </motion.div>

      {/* card grid — 2 columns where it fits naturally */}
      <div className="w-full max-w-[360px] grid grid-cols-2 gap-4 mt-3">
        <ScrapCard
          className="!relative w-full h-[110px] col-span-1"
          rotate={-4}
          hoverRotate={0}
          delay={0.1}
          onClick={() => onEnter("contact")}
          ariaLabel="Go to contact section"
        >
          <ContactNote onClick={() => onEnter("contact")} />
        </ScrapCard>

        <ScrapCard
          className="!relative w-full h-[150px] col-span-1"
          rotate={2}
          hoverRotate={0}
          delay={0.15}
          onClick={() => onEnter("skills")}
          ariaLabel="Go to skills section"
        >
          <SkillsCard />
        </ScrapCard>

        <ScrapCard
          className="!relative w-full h-[150px] col-span-2"
          rotate={-1.5}
          hoverRotate={0}
          delay={0.2}
          onClick={() => onEnter("about")}
          ariaLabel="Go to about section"
        >
          <AboutCard />
        </ScrapCard>

        <ScrapCard
          className="!relative w-full h-[150px] col-span-1"
          rotate={-3}
          hoverRotate={0}
          delay={0.25}
          onClick={() => onEnter("education")}
          ariaLabel="Go to education section"
        >
          <GoalsCard />
        </ScrapCard>

        <ScrapCard
          className="!relative w-full h-[150px] col-span-1"
          rotate={3}
          hoverRotate={0}
          delay={0.3}
          onClick={() => onEnter("about")}
          ariaLabel="Go to about section"
        >
          <HobbiesCard />
        </ScrapCard>

        <ScrapCard
          className="!relative w-full h-[140px] col-span-2"
          rotate={1.5}
          hoverRotate={0}
          delay={0.35}
          onClick={() => onEnter("project")}
          ariaLabel="Go to projects section"
        >
          <ProjectsCard />
        </ScrapCard>
      </div>

      {/* small decorative touches, lightweight on mobile */}
      <div className="flex items-center gap-6 text-3xl opacity-90 mt-1">
        <span>🐈</span>
        <span>🌸</span>
        <span>🦋</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-2"
      >
        <EnterButton onClick={() => onEnter()} />
      </motion.div>
    </div>
  );
}

export default function Landing({
  onEnter,
}: {
  onEnter: (targetId?: string) => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-scrap-bg paper-texture"
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      {/* Mobile: stacked journal layout, scrolls naturally */}
      <div className="md:hidden">
        <MobileBoard onEnter={onEnter} />
      </div>

      {/* Desktop/laptop: fixed-aspect board, scaled to fit the viewport exactly */}
      <div className="hidden md:block w-full h-full">
        <DesktopBoard onEnter={onEnter} />
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useTheme } from "./theme";

const ROSE = "#C85C7A";
const ROSE_DARK = "#A8425E";
const BLUSH = "rgba(248, 215, 222, 0.35)";
const INTERACTIVE = "a, button, [role=button], [data-cursor]";

type Particle = { id: number; x: number; y: number; dx: number; dy: number; heart: boolean };
type TrailDot = { id: number; x: number; y: number };

let uid = 0;

export default function Cursor() {
  const isDark = useTheme().theme === "dark";
  const ringColor = isDark ? "#E07A98" : ROSE_DARK;
  const dotColor = isDark ? "#F7B5C8" : ROSE;
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [burst, setBurst] = useState<Particle[]>([]);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const lastTrail = useRef(0);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled || reduce) return;
    const html = document.documentElement;
    html.classList.add("custom-cursor");
    const style = document.createElement("style");
    style.textContent = ".custom-cursor, .custom-cursor * { cursor: none !important; }";
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as Element | null)?.closest?.(INTERACTIVE) as HTMLElement | null;
      setHovering(!!target);
      setLabel(target?.dataset.cursor === "view" ? "View" : null);

      const now = performance.now();
      if (now - lastTrail.current > 70) {
        lastTrail.current = now;
        const dot = { id: ++uid, x: e.clientX, y: e.clientY };
        setTrail((t) => [...t.slice(-11), dot]);
        window.setTimeout(() => setTrail((t) => t.filter((d) => d.id !== dot.id)), 600);
      }
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onClick = (e: MouseEvent) => {
      const parts: Particle[] = Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
        const d = 18 + Math.random() * 10;
        return { id: ++uid, x: e.clientX, y: e.clientY, dx: Math.cos(a) * d, dy: Math.sin(a) * d, heart: i % 2 === 0 };
      });
      setBurst((b) => [...b, ...parts]);
      const ids = new Set(parts.map((p) => p.id));
      window.setTimeout(() => setBurst((b) => b.filter((p) => !ids.has(p.id))), 650);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("click", onClick);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      html.classList.remove("custom-cursor");
      style.remove();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, reduce, x, y]);

  if (!enabled || reduce) return null;

  const ringScale = (hovering ? 2.2 : 1) * (pressed ? 0.8 : 1);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {/* trail */}
      <AnimatePresence>
        {trail.map((d) => (
          <motion.span
            key={d.id}
            className="absolute left-0 top-0 h-1 w-1 rounded-full"
            style={{ x: d.x - 2, y: d.y - 2, backgroundColor: ROSE }}
            initial={{ opacity: 0.45, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* click burst */}
      <AnimatePresence>
        {burst.map((p) => (
          <motion.span
            key={p.id}
            className="absolute left-0 top-0 text-[8px] leading-none"
            style={{ color: ROSE }}
            initial={{ x: p.x - 3, y: p.y - 4, opacity: 0.9, scale: 0.6 }}
            animate={{ x: p.x - 3 + p.dx, y: p.y - 4 + p.dy, opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {p.heart ? "♥" : "✦"}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* ring */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: rx, y: ry }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
          style={{ borderColor: ringColor }}
          animate={{
            scale: ringScale,
            backgroundColor: hovering ? (isDark ? "rgba(224,122,152,0.35)" : "rgba(248, 215, 222, 0.55)") : isDark ? "rgba(224,122,152,0.18)" : BLUSH,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          {label && (
            <span
              className="text-[5px] font-medium uppercase tracking-wider"
              style={{ color: ringColor }}
            >
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* dot */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      </motion.div>
    </div>
  );
}

// components/nyc/CityBackdrop.tsx
// Fixed page background: a faint Manhattan street-grid map (tilted ~29°, like
// the real grid) with Broadway cutting across it. Deliberately a *map*, so it
// doesn't repeat the skyline used in the hero card. Recolours for dark mode.
"use client";

import { useTheme } from "./theme";

export default function CityBackdrop() {
  const night = useTheme().theme === "dark";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Manhattan street grid */}
      <svg className="absolute -inset-[20%] h-[140%] w-[140%] opacity-[0.07] dark:opacity-[0.12]" style={{ transform: "rotate(29deg)" }}>
        <defs>
          <pattern id="mh-grid" width="64" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 0 H64 M0 0 V16" stroke={night ? "#D98DA0" : "#A8425E"} strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mh-grid)" />
        {/* Broadway cutting diagonally across the grid */}
        <path d="M-100 1600 C 400 1100, 700 700, 1900 -200" stroke={night ? "#D98DA0" : "#A8425E"} strokeWidth="3" fill="none" />
      </svg>

    </div>
  );
}

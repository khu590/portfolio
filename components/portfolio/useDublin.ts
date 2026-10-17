// components/portfolio/useDublin.ts
// Live clock for any time zone, and current Dublin weather from open-meteo
// (free, no key). Weather quietly returns null if the request fails.
"use client";

import { useEffect, useState } from "react";

export function useClock(tz = "Europe/Dublin"): string {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IE", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

export type Weather = { temp: number; emoji: string; rain: boolean };

function codeToEmoji(code: number, day: boolean): string {
  if (code === 0) return day ? "☀️" : "🌙";
  if (code <= 3) return day ? "⛅" : "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 67 || (code >= 80 && code <= 82)) return "🌧️";
  if (code <= 77 || code === 85 || code === 86) return "❄️";
  return "⛈️";
}

export function useDublinWeather(): Weather | null {
  const [w, setW] = useState<Weather | null>(null);
  useEffect(() => {
    let alive = true;
    fetch("https://api.open-meteo.com/v1/forecast?latitude=53.35&longitude=-6.26&current=temperature_2m,weather_code,is_day")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (alive && d?.current) {
          const code: number = d.current.weather_code;
          // drizzle, rain, freezing rain, showers, thunderstorms
          const rain = (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95;
          setW({ temp: Math.round(d.current.temperature_2m), emoji: codeToEmoji(code, d.current.is_day === 1), rain });
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return w;
}

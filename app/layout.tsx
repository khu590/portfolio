// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khushi Bijkal — Data & AI Engineer",
  description:
    "Data Analyst turned AI/ML engineer. Production SQL systems at Société Générale, MSc Data Analytics at DCU.",
};

// Fonts are loaded via a standard <link> tag rather than next/font/google.
// This keeps the build working in any environment (including offline/sandboxed
// CI) without requiring build-time access to fonts.googleapis.com.
// To switch to next/font/google later for self-hosted font optimization, see
// the commented alternative at the bottom of this file.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Caveat:wght@500;600;700&family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-ink font-serif antialiased">
        {children}
      </body>
    </html>
  );
}

/* ── Alternative: next/font/google (use when you have network access at build time) ──
import { JetBrains_Mono, Source_Serif_4 } from "next/font/google";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-mono",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-serif",
});

// then add `className={`${mono.variable} ${serif.variable}`}` to <html>,
// and remove the manual <link> tags above.
*/

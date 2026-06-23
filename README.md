# Khushi Bijkal — Portfolio

A single-page "enter the workspace" portfolio built with **Next.js 14 (App Router)**,
**Tailwind CSS**, and **Framer Motion**. Terminal/IDE-inspired visual language —
landing reveal, sticky-note micro-details kept subtle, recruiter-friendly structure.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
portfolio/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── globals.css       # Tailwind entry + global resets
│   └── page.tsx          # Orchestrates Landing → Portfolio transition
├── components/
│   ├── Landing.tsx        # Entry screen ("Enter the workspace")
│   ├── NavBar.tsx         # Sticky IDE-tab style nav
│   ├── Hero.tsx           # About/intro section
│   ├── Stats.tsx          # Key metrics bar
│   ├── Experience.tsx     # Work experience timeline
│   ├── Skills.tsx         # Skills grid (grouped by category)
│   ├── Project.tsx        # Featured project case study
│   ├── Education.tsx      # Education, awards, certifications
│   ├── Contact.tsx        # Footer / contact CTA
│   └── Reveal.tsx         # Reusable scroll-reveal animation wrapper
├── lib/
│   └── data.ts            # ALL content lives here — single source of truth
├── tailwind.config.js      # Custom color tokens, fonts, animations
├── package.json
└── README.md
```

## Editing content

You almost never need to touch a component file to update content.
Open **`lib/data.ts`** and edit:

- `profile` — name, role, email, links
- `stats` — the 4 highlight metrics
- `skills` — grouped skill categories and tags
- `experience` — job entries and bullet highlights
- `project` — featured project case study
- `awards`, `certifications`, `education`

Components read from this file automatically.

## Design notes

- **Fonts**: JetBrains Mono (headers/labels) + Source Serif 4 (body text) —
  loaded via Google Fonts `<link>` tag in `app/layout.tsx` for maximum build
  portability. If you have reliable network access at build time, you can
  switch to `next/font/google` for self-hosted, zero-layout-shift fonts —
  a ready-to-uncomment block is included at the bottom of `layout.tsx`.
- **Color tokens** (see `tailwind.config.js`): cream paper background, near-black
  ink, signal green accent, warm amber highlight. Tuned for a technical/credible
  read rather than a playful/illustrative one — appropriate for data/AI
  engineering roles.
- **Animations**: Framer Motion handles the landing-to-portfolio transition,
  staggered hero reveals, and scroll-triggered section reveals (`Reveal.tsx`).
  Respects `prefers-reduced-motion`.

## Deployment

This is a standard Next.js app — deploys cleanly to:

- **Vercel** (recommended, zero config): `vercel` CLI or connect the GitHub repo
- **Netlify**: use the Next.js runtime plugin
- Any Node host: `npm run build && npm start`

## Customizing for a specific job application

Per the "tailored portfolio" strategy: duplicate `lib/data.ts` content for each
target role, swap in the project/skills most relevant to that job description,
and adjust the `profile.tagline` and `Hero.tsx` description copy to mirror the
language in the job posting.

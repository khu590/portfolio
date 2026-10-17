import type { Metadata } from "next";
import {
  profile,
  bio,
  experience,
  education,
  projects,
  skills,
  certifications,
  awards,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Khushi Bijkal · Recruiter view",
  description: `${profile.name}: data analyst and DevOps, ${profile.location}. Plain-text résumé.`,
};

const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60 mb-4";
const link = "underline underline-offset-2 decoration-ink/40 hover:decoration-ink";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10" aria-labelledby={`cv-${title}`}>
      <h2 id={`cv-${title}`} className={label}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function CvPage() {
  return (
    <div className="cv-page min-h-screen bg-[#FAF7F2] text-ink font-sans leading-relaxed">
      <main className="mx-auto max-w-[680px] px-5 py-12 sm:py-16">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70 flex items-center gap-2">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            Open to data analyst &amp; DevOps roles in Ireland
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl mt-4 leading-tight">{profile.name}</h1>
          <p className="mt-2 text-lg text-ink/80">Data Analyst · DevOps · {profile.location}</p>
          <div className="cv-actions mt-6 flex flex-wrap gap-3">
            <a
              href="/Khushi_Bijkal_CV.pdf"
              download
              className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-[#FAF7F2] hover:opacity-90"
            >
              Download résumé (PDF)
            </a>
            <a
              href="/"
              className="rounded-md border border-ink/30 px-4 py-2 text-sm font-medium hover:border-ink"
            >
              Open the full experience
            </a>
          </div>
        </header>

        <hr className="my-8 border-ink/15" />

        <address className="not-italic flex flex-wrap gap-x-5 gap-y-1 text-sm">
          <a className={link} href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className={link} href={profile.linkedin}>LinkedIn</a>
          <a className={link} href={profile.github}>GitHub</a>
        </address>

        <Section title="Summary">
          <p>{bio[0]}</p>
          <p className="mt-3">{bio[1]}</p>
        </Section>

        <Section title="Experience">
          <div className="space-y-8">
            {experience.map((job) => (
              <article key={`${job.company}-${job.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">{job.role}</h3>
                  <p className="font-mono text-xs text-ink/60">{job.date}</p>
                </div>
                <p className="text-sm text-ink/70">
                  {job.company} · {job.sub} · {job.badge}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {job.highlights.map((h) => (
                    <li key={h} className="relative pl-4 text-[15px]">
                      <span aria-hidden="true" className="cv-bullet absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-rose-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-6">
            {education.map((ed) => (
              <article key={ed.degree}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold">{ed.degree}</h3>
                  <p className="font-mono text-xs text-ink/60">{ed.date}</p>
                </div>
                <p className="text-sm text-ink/70">
                  {ed.school} · {ed.location} · {ed.grade}
                </p>
                <p className="mt-1 text-[15px]">{ed.modules}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <ul className="space-y-5">
            {projects.map((p) => (
              <li key={p.title}>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-ink/70">{p.subtitle}</p>
                <p className="mt-1 text-[15px]">{p.description}</p>
                {"demo" in p && p.demo ? (
                  <p className="mt-1 text-sm">
                    <a className={link} href={p.demo}>Read the paper</a>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <ul className="space-y-2 text-[15px]">
            {skills.map((s) => (
              <li key={s.category}>
                <strong className="font-semibold">{s.category}:</strong> {s.items.join(", ")}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Certifications">
          <ul className="space-y-1 text-[15px]">
            {certifications.map((c) => (
              <li key={c.name}>
                {c.name} <span className="text-ink/60">· {c.issuer}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Awards">
          <p className="text-[15px]">
            {awards.map((a) => a.title).join(" & ")}, {awards[0]?.org}
          </p>
        </Section>

        <footer className="mt-14 border-t border-ink/15 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
          Last updated October 2026
        </footer>
      </main>
    </div>
  );
}

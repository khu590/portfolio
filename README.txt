UPDATE 2 — Timeline + storytelling bio + removed stats
=========================================================

WHAT CHANGED
------------
1. components/Hero.tsx       → rewritten "whoami" bio into a storytelling narrative
2. components/Timeline.tsx   → NEW FILE. Combines work experience + education into
                                one chronological timeline (alternating sides on
                                desktop, single column on mobile), with a "current"
                                marker on your MSc.
3. components/Credentials.tsx→ NEW FILE. Awards + certifications only (education
                                moved out of here into Timeline.tsx).
4. components/NavBar.tsx     → updated nav links (merged "experience.log" +
                                "education.yml" into one "timeline.log" tab)
5. lib/data.ts                → added `type`, `sortDate`, and `current` fields to
                                experience/education entries so Timeline.tsx can
                                sort and merge them correctly.
6. app/page.tsx               → removed <Stats />, removed separate <Experience />
                                and <Education />, now renders <Timeline /> and
                                <Credentials /> instead.

FILES TO DELETE FROM YOUR PROJECT
----------------------------------
These are no longer used — delete them from your `components` folder:
  - components/Stats.tsx
  - components/Experience.tsx
  - components/Education.tsx

HOW TO APPLY
------------
1. Copy these files into your project, OVERWRITING the existing ones at the
   same path:
     components/Hero.tsx
     components/NavBar.tsx
     lib/data.ts
     app/page.tsx

2. Copy these NEW files into your project (they don't exist yet):
     components/Timeline.tsx
     components/Credentials.tsx

3. DELETE these old files from components/ (no longer used):
     components/Stats.tsx
     components/Experience.tsx
     components/Education.tsx

4. From your portfolio folder, run:
     git add .
     git commit -m "merge experience+education into timeline, rewrite bio, remove stats"
     git push

5. Wait ~30-60s, then refresh your live Vercel URL.

// components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section id="about" className="pt-16 pb-14 px-5 md:px-8">
      <div className="max-w-[860px] mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-start">
        <div>
          <motion.p
            className="font-mono text-sm text-purple mb-5 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-muted">$</span> whoami
            <span className="inline-block w-2 h-4 bg-ink animate-blink" />
          </motion.p>

          <motion.h1
            className="font-mono font-extrabold text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[1.05] tracking-tight mb-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {profile.name.split(" ")[0]}{" "}
            <span className="text-purple">{profile.name.split(" ")[1]}</span>
          </motion.h1>

          <motion.p
            className="font-mono text-sm text-amber mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            // {profile.role}
          </motion.p>

          <motion.p
            className="text-inksoft text-[1.05rem] leading-relaxed max-w-[480px] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            I like systems that quietly work — the kind nobody notices until
            they break. For two years at Société Générale, keeping those
            systems healthy was my job: chasing down the root cause of a
            failing batch job at 9pm, turning recurring fires into
            documented fixes, making sure SQL queries answered the actual
            question someone was asking.
          </motion.p>

          <motion.p
            className="text-inksoft text-[1.05rem] leading-relaxed max-w-[480px] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            That work kept pointing toward a question I couldn&rsquo;t answer
            with SQL alone: not just what broke, but what could be{" "}
            <em className="text-amber not-italic">predicted</em>. So I went
            back to school for it — I&rsquo;m currently finishing an MSc in
            Data Analytics at Dublin City University, building the ML and
            explainable-AI skills to go from fixing systems to designing
            smarter ones.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-[0.82rem] bg-ink text-paper px-5 py-2.5 rounded-md hover:bg-purple transition-colors"
            >
              → contact_me()
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.82rem] border border-line text-inksoft px-5 py-2.5 rounded-md hover:border-ink hover:text-ink transition-colors"
            >
              github.com/khu590
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[0.82rem] border border-line text-inksoft px-5 py-2.5 rounded-md hover:border-ink hover:text-ink transition-colors"
            >
              linkedin
            </a>
          </motion.div>
        </div>

        {/* polaroid-style photo cluster — hover to bring forward */}
        <motion.div
          className="hidden md:flex relative w-[180px] h-[200px] flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-[130px] bg-white p-2 pb-3 rounded-sm shadow-md border border-line"
            style={{ rotate: -8 }}
            whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
          >
            <div className="w-full h-[130px] rounded-sm overflow-hidden bg-paper2">
              <Image
                src="/images/cafe-candid.jpg"
                alt="Khushi at a cafe"
                width={260}
                height={260}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-mono text-[0.55rem] text-muted text-center mt-1.5">
              off the clock
            </p>
          </motion.div>

          <motion.div
            className="absolute top-12 left-16 w-[125px] bg-white p-2 pb-3 rounded-sm shadow-md border border-line"
            style={{ rotate: 7 }}
            whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
          >
            <div className="w-full h-[125px] rounded-sm overflow-hidden bg-amber-bg">
              <Image
                src="/images/illustrated-avatar.jpg"
                alt="Illustrated avatar of Khushi"
                width={260}
                height={260}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-mono text-[0.55rem] text-muted text-center mt-1.5">
              avatar mode
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

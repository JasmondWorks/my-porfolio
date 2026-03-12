"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Download, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Docker",
  "React Native",
];

const STATS = [
  { value: "3+", label: "Years Building" },
  { value: "20+", label: "Projects Shipped" },
  { value: "10+", label: "Technologies" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-12">
      {/* ── Background elements ─────────────────────────── */}
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.15] mask-[radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="orb top-1/4 -left-20 h-[480px] w-[480px] bg-indigo-500/5 animate-glow-pulse"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 18, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="orb top-1/3 -right-20 h-[400px] w-[400px] bg-violet-500/5 animate-glow-pulse"
        style={{ animationDelay: "1.5s" }}
      />
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="orb bottom-1/4 left-1/3 h-[300px] w-[300px] bg-purple-500/5 animate-glow-pulse"
        style={{ animationDelay: "3s" }}
      />

      {/* ── Content Container ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-3xl flex-col items-center gap-6 text-center"
        >
          {/* Status badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <span
                className="h-2 w-2 rounded-full bg-green-500"
                style={{ animation: "status-pulse 2s ease-in-out infinite" }}
              />
              <Sparkles className="h-3.5 w-3.5 opacity-70" />
              Available for new projects
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight text-foreground-heading sm:text-5xl md:text-6xl"
          >
            Crafting{" "}
            <span className="gradient-text-animated">digital experiences</span>
            <br className="hidden sm:block" /> with precision &amp; purpose.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Full-Stack Engineer specialising in scalable systems and intuitive
            interfaces. I build things people love to use.
          </motion.p>

          {/* Skill pills */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border bg-muted/30 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted/50 hover:scale-[1.02]"
            >
              <Download className="h-4 w-4" />
              Get in Touch
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-border pt-6"
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground-heading">
                  {value}
                </span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground-heading transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}

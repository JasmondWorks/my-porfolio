"use client";

import { motion, type Variants } from "framer-motion";
import {
  Code2,
  Server,
  Smartphone,
  Wrench,
  Zap,
  Globe,
  Shield,
} from "lucide-react";

const SKILL_CATEGORIES = [
  {
    icon: Code2,
    title: "Frontend",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/10",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Radix UI",
    ],
  },
  {
    icon: Server,
    title: "Backend",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/10",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "REST / GraphQL",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/10",
    skills: ["React Native", "Expo", "SQLite", "Push Notifications"],
  },
  {
    icon: Wrench,
    title: "Tools & DevOps",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/10",
    skills: ["Docker", "Git", "GitHub Actions", "Vercel", "AWS", "Prisma"],
  },
];

const PILLARS = [
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Every decision is made with speed and efficiency in mind — from database queries to bundle size.",
  },
  {
    icon: Globe,
    title: "Scalability by Design",
    description:
      "Systems built to grow. I architect for tomorrow without over-engineering for today.",
  },
  {
    icon: Shield,
    title: "Quality Code",
    description:
      "Clean, typed, tested. Code that your future self — and your team — will actually enjoy working with.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header + Bio */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-12 md:grid-cols-2 md:gap-16 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              About Me
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground-heading sm:text-4xl">
              Passionate engineer,{" "}
              <span className="gradient-text">problem solver.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              I&apos;m a Full-Stack Engineer with over 3 years of experience
              building production-grade applications. My sweet spot is the
              intersection of elegant design and robust engineering.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              I care deeply about the craft — writing code that&apos;s not just
              functional, but maintainable, performant, and a joy to work with.
            </p>
          </div>

          {/* Pillar cards */}
          <div className="grid gap-4">
            {PILLARS.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-xl border border-border bg-card/50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 border border-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-heading">
                    {title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-foreground-heading">
              Tech Stack
            </h3>
            <p className="text-sm text-muted-foreground">
              The tools I use to build things that matter.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_CATEGORIES.map(
              ({ icon: Icon, title, color, bg, skills }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="rounded-xl border border-border bg-card/30 p-6 space-y-4 transition-all duration-300 hover:border-primary/20 hover:-translate-y-0.5"
                >
                  <div
                    className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium ${bg}`}
                  >
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className={color}>{title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

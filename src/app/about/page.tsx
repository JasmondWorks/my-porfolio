import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Server,
  Smartphone,
  Wrench,
  Download,
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "About | Obafemi Olorede",
  description:
    "Learn more about my background, skills, and engineering philosophy.",
};

const EXPERIENCE = [
  {
    role: "Fullstack Engineer",
    company: "Prime Church",
    period: "March 2026 – Present",
    points: [
      "Let one platform serve every affiliated organisation instead of standing up separate systems for each, cutting the cost of onboarding a new branch to near-zero.",
      "Made switching between organisations a one-click action for admins managing multiple branches, instead of separate logins per org.",
      "Gave leadership a single admin view across every organisation's access and permissions, replacing manual, branch-by-branch oversight.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Marimax Global Concepts Limited",
    period: "Sept 2025 – June 2026",
    points: [
      "Let staff switch between roles and departments without separate logins, scoping their data automatically per context.",
      "Cut the delay between a delivery event happening and a team member knowing about it, via a real-time dispatch and notification system.",
      "Removed a recurring class of access bugs by replacing scattered permission checks with a single, consistent rendering pattern.",
    ],
  },
  {
    role: "Backend Engineer",
    company: "Cavista Hackathon",
    period: "2026 · Hackathon",
    points: [
      "Built the backend for DriftCare, an AI health platform that flags wellness decline before it becomes a crisis, instead of after.",
      "Designed a personalised drift-score engine that updates in real time as users check in, so deterioration is caught early rather than at the next appointment.",
      "Helped users catch and course-correct unhealthy habits before they escalated into a medical issue.",
    ],
  },
  {
    role: "Fullstack Engineer",
    company: "Roware",
    period: "Oct 2020 – Dec 2022",
    points: [
      "Shipped production websites for enterprise clients, including Seplat and MFM branches, that held up across every browser their users showed up in.",
      "Built server-rendered web applications for clients who needed pages indexed and fast on first load, not just functional.",
      "Owned delivery end-to-end, from database design to the interface, so clients had one point of accountability instead of coordinating multiple vendors.",
    ],
  },
];

const SKILL_GROUPS = [
  {
    icon: Code2,
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    skills: ["React Native", "Expo", "SQLite"],
  },
  {
    icon: Wrench,
    title: "DevOps/Tools",
    skills: ["Docker", "GitHub Actions", "Vercel", "AWS", "Prisma", "Git"],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20">
        {/* ── Intro ────────────────────────────────── */}
        <div className="grid gap-12 md:grid-cols-5 md:gap-16 items-center">
          <div className="md:col-span-3 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
              About Me
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground-heading sm:text-5xl">
              I build the product,{" "}
              <span className="gradient-text">you get the results.</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m a Full-Stack Engineer with over 5 years turning business
              problems into shipped products: faster checkouts, workflows
              that used to take a spreadsheet and now take a click,
              dashboards that let a team see what&apos;s happening instead of
              guessing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From logistics platforms handling real transactions to internal
              tools teams use every day, I&apos;ve shipped products that real
              businesses depend on. I thrive in fast-paced environments and
              believe great software earns its keep by making someone&apos;s
              job easier or a customer&apos;s decision faster.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm hover:opacity-90 transition-opacity"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
              >
                <FileText className="h-4 w-4" /> View Resume
              </a>
              <a
                href="/Obafemi_Olorede_CV_Sept.docx"
                download="Obafemi_Olorede_CV.docx"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/20 hover:bg-muted/50 transition-all duration-200"
              >
                <Download className="h-4 w-4" /> Download DOCX
              </a>
            </div>
          </div>

          {/* Avatar placeholder + socials */}
          <div className="md:col-span-2 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="h-48 w-48 rounded-2xl border border-border bg-linear-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center shadow-inner">
                <span className="text-6xl font-black gradient-text tracking-tighter">OO</span>
              </div>
              <div
                className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-green-500"
                style={{ animation: "status-pulse 2s ease-in-out infinite" }}
              >
                <span className="sr-only">Available</span>
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="font-semibold text-foreground-heading">Obafemi Olorede</p>
              <p className="text-sm text-muted-foreground">
                Full-Stack Engineer
              </p>
              <p className="text-xs text-muted-foreground">📍 Lagos, Nigeria</p>
            </div>
            <div className="flex gap-2">
              {[
                { href: siteConfig.links.github, icon: Github, label: "GitHub" },
                {
                  href: siteConfig.links.linkedin,
                  icon: Linkedin,
                  label: "LinkedIn",
                },
                {
                  href: siteConfig.links.twitter,
                  icon: Twitter,
                  label: "X",
                },
                {
                  href: siteConfig.links.email,
                  icon: Mail,
                  label: "Email",
                },
                {
                  href: "/resume.pdf",
                  icon: FileText,
                  label: "Resume",
                },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-primary/5 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Skills ───────────────────────────────── */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground-heading">
              Technical Skills
            </h2>
            <p className="text-muted-foreground text-sm">
              The tools and technologies I work with.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_GROUPS.map(({ icon: Icon, title, skills }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-5 space-y-4 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground-heading">
                    {title}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border bg-muted/30 px-2.5 py-1 text-[10px] text-muted-foreground font-bold uppercase tracking-wider"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Experience timeline ─────────────────── */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground-heading">
              Experience
            </h2>
            <p className="text-muted-foreground text-sm">
              My professional journey so far.
            </p>
          </div>
          <div className="relative space-y-0 pl-6">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-linear-to-b from-primary/60 via-border to-transparent" />

            {EXPERIENCE.map(({ role, company, period, points }, i) => (
              <div key={i} className="relative pb-10 last:pb-0">
                {/* Dot */}
                <div className="absolute -left-px top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>

                <div className="pl-6 space-y-2">
                  <div>
                    <p className="font-semibold text-foreground-heading">
                      {role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {company} · {period}
                    </p>
                  </div>
                  <ul className="space-y-1">
                    {points.map((pt, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────── */}
        <div className="rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50/50 to-violet-50/50 p-10 text-center space-y-5">
          <h3 className="text-2xl font-bold text-foreground-heading">
            Ready to work together?
          </h3>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            I&apos;m currently open to new opportunities. Let&apos;s build
            something amazing.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
          >
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

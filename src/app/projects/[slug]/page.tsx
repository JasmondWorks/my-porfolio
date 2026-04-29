import { getProjects, getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Layers,
  TrendingUp,
  Lightbulb,
  GitBranch,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { ProjectCategory } from "@/types/project";
import { cn } from "@/lib/utils";
import { ProjectMedia } from "@/components/projects/ProjectMedia";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

const CATEGORY_STYLES: Record<
  ProjectCategory,
  { badge: string; dot: string; label: string }
> = {
  Frontend: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dot: "bg-blue-400",
    label: "Frontend",
  },
  Backend: {
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    dot: "bg-violet-400",
    label: "Backend",
  },
  Fullstack: {
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    dot: "bg-indigo-400",
    label: "Full-Stack",
  },
  Mobile: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
    label: "Mobile",
  },
  Hackathon: {
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    dot: "bg-orange-400",
    label: "Hackathon",
  },
};

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-8">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
        {children}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getProjects();
  const related = allProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3);

  const cat = CATEGORY_STYLES[project.category];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">

        {/* ── Breadcrumb ──────────────────────────────────── */}
        <nav className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <Link href="/#projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span className="text-foreground truncate max-w-[200px]">{project.title}</span>
        </nav>

        {/* ── Back + Header ────────────────────────────────── */}
        <div className="space-y-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
            {/* Left: meta + title */}
            <div className="lg:col-span-3 space-y-5">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
                    cat.badge,
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", cat.dot)} />
                  {cat.label}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-yellow-500">
                    <Sparkles className="h-3 w-3" />
                    Featured
                  </span>
                )}
                {project.dateStr && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(project.dateStr).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold tracking-tight text-foreground-heading sm:text-4xl lg:text-5xl leading-tight">
                {project.title}
              </h1>

              {/* Short description */}
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg max-w-xl">
                {project.shortDescription}
              </p>
            </div>

            {/* Right: action buttons */}
            <div className="lg:col-span-2 flex flex-wrap items-start gap-3 lg:justify-end lg:pt-2">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-muted/50 hover:scale-[1.02]"
                >
                  <Github className="h-4 w-4" />
                  Source Code
                </Link>
              )}
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Link>
              )}
            </div>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-border bg-muted/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Cover Image / Video ──────────────────────────── */}
        <ProjectMedia
          coverImage={project.coverImage}
          demoVideo={project.demoVideo}
          title={project.title}
        />

        {/* ── Main content grid ────────────────────────────── */}
        <div className="grid gap-16 lg:grid-cols-3">

          {/* ── Left: main content ───────────────────────────── */}
          <div className="lg:col-span-2 space-y-16">

            {/* Overview */}
            <section>
              <SectionLabel icon={Layers}>Overview</SectionLabel>
              <p className="text-base leading-[1.9] text-muted-foreground">
                {project.longDescription}
              </p>
            </section>

            {/* Architecture */}
            {project.architecture && (
              <section>
                <SectionLabel icon={GitBranch}>Architecture</SectionLabel>
                <div className="rounded-2xl border border-border bg-card/40 overflow-hidden">
                  {/* Diagram */}
                  {project.architecture.diagramUrl && (
                    <div className="border-b border-border bg-muted/10">
                      <Image
                        src={project.architecture.diagramUrl}
                        alt="Architecture diagram"
                        width={900}
                        height={450}
                        className="w-full object-contain"
                      />
                    </div>
                  )}
                  {/* Description */}
                  <div className="flex gap-5 p-6">
                    <div className="w-0.5 shrink-0 rounded-full bg-primary/30" />
                    <p className="text-sm leading-[1.9] text-muted-foreground">
                      {project.architecture.description}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Engineering Decisions */}
            {project.engineeringDecisions.length > 0 && (
              <section>
                <SectionLabel icon={Lightbulb}>Technical Decisions</SectionLabel>
                <div className="grid gap-5 sm:grid-cols-2">
                  {project.engineeringDecisions.map((d, i) => (
                    <div
                      key={i}
                      className="group rounded-2xl border border-border bg-card/40 p-5 space-y-4 transition-all duration-300 hover:border-primary/20 hover:bg-card/70 hover:-translate-y-0.5"
                    >
                      {/* Topic */}
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-black text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-sm font-bold text-foreground-heading tracking-tight">
                          {d.topic}
                        </h3>
                      </div>

                      {/* Decision */}
                      <div className="space-y-1 border-l-2 border-primary/40 pl-3">
                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-primary">
                          Chose
                        </p>
                        <p className="text-xs font-semibold text-foreground-heading leading-relaxed">
                          {d.decision}
                        </p>
                      </div>

                      {/* Reason */}
                      <div className="space-y-1 border-l-2 border-border pl-3">
                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                          Why
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {d.reason}
                        </p>
                      </div>

                      {/* Trade-off */}
                      {d.tradeoff && (
                        <div className="space-y-1 border-l-2 border-amber-500/40 pl-3">
                          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400">
                            Trade-off
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed italic">
                            {d.tradeoff}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Future Improvements */}
            {project.futureImprovements && project.futureImprovements.length > 0 && (
              <section>
                <SectionLabel icon={Sparkles}>Future Improvements</SectionLabel>
                <div className="rounded-2xl border border-border bg-card/40 divide-y divide-border">
                  {project.futureImprovements.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-muted/20"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/40" />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Right: sidebar ───────────────────────────────── */}
          <aside className="space-y-10">

            {/* Metrics */}
            {project.metrics.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Impact & Metrics
                </div>
                <div className="space-y-3">
                  {project.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border bg-card/40 p-4 space-y-1"
                    >
                      <p className="text-2xl font-black text-foreground-heading tabular-nums tracking-tight">
                        {m.value}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                        {m.label}
                      </p>
                      {m.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed pt-0.5">
                          {m.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related projects */}
            {related.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Similar Work
                </div>
                <div className="space-y-3">
                  {related.map((p) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.slug}`}
                      className="group flex gap-3 rounded-xl border border-border bg-card/40 p-3 transition-all duration-300 hover:border-primary/20 hover:bg-card/70"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/20">
                        {p.coverImage && (
                          <Image
                            src={p.coverImage}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="min-w-0 space-y-1">
                        <p className="text-xs font-bold text-foreground-heading group-hover:text-primary transition-colors line-clamp-1">
                          {p.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                          {p.shortDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5 space-y-3">
              <p className="text-sm font-bold text-foreground-heading">
                Like what you see?
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                I&apos;m available for new projects. Let&apos;s build something great together.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:opacity-90"
              >
                Get in Touch <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import { getProjects, getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Layers,
  TrendingUp,
  Lightbulb,
  GitBranch,
} from "lucide-react";
import Image from "next/image";
import { ProjectCategory } from "@/types/project";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

const CATEGORY_STYLES: Record<ProjectCategory, string> = {
  Frontend: "bg-blue-50/30 text-foreground-heading border-blue-500/10",
  Backend: "bg-purple-50/30 text-foreground-heading border-purple-500/10",
  Fullstack: "bg-indigo-50/30 text-foreground-heading border-indigo-500/10",
  Mobile: "bg-green-50/30 text-foreground-heading border-green-500/10",
  Hackathon: "bg-orange-50/30 text-foreground-heading border-orange-500/10",
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getProjects();
  const related = allProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
        {/* ── Breadcrumb / Back nav ───────────────────────── */}
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="opacity-30">/</span>
          <Link
            href="/#projects"
            className="hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-foreground truncate">{project.title}</span>
        </div>

        {/* ── Header ─────────────────────────────────────── */}
        <div className="space-y-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-ml-3 text-muted-foreground hover:text-primary"
          >
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
          </Button>

          <div className="space-y-6">
            {/* Category + date row */}
            <div className="flex flex-wrap items-center gap-4">
              <span
                className={cn(
                  "rounded-lg border px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm",
                  CATEGORY_STYLES[project.category],
                )}
              >
                {project.category}
              </span>
              {project.dateStr && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground border-l border-border pl-4">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(project.dateStr).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              )}
            </div>

            {/* Title + actions */}
            <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
              <div className="lg:col-span-2 space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-foreground-heading sm:text-4xl lg:text-6xl">
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>
              <div className="flex gap-3 lg:justify-end">
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    asChild
                    className="border-border bg-background hover:bg-muted/50 font-semibold shadow-sm"
                  >
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="mr-2 h-4 w-4" /> Source
                    </Link>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    asChild
                    className="bg-primary text-foreground-heading font-semibold shadow-md hover:opacity-90 transition-all duration-200"
                  >
                    <Link href={project.liveUrl} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-muted/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Media ──────────────────────────────────────── */}
        <div className="overflow-hidden rounded-3xl border border-border bg-muted/20 relative aspect-video shadow-xl">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-muted-foreground/30 font-bold uppercase tracking-[0.2em]">
                Preview unavailable
              </span>
            </div>
          )}
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-16">
            {/* ── Overview ───────────────────────────────────── */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                <Layers className="h-4 w-4" />
                Project Overview
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {project.longDescription}
                </p>
              </div>
            </section>

            {/* ── Architecture ───────────────────────────────── */}
            {project.architecture && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  <GitBranch className="h-4 w-4" />
                  Engineering Architecture
                </div>
                <div className="rounded-2xl border border-border bg-card/30 p-8 space-y-6 shadow-sm overflow-hidden">
                  {project.architecture.diagramUrl ? (
                    <div className="overflow-hidden rounded-xl border border-border shadow-inner bg-muted/10">
                      <Image
                        src={project.architecture.diagramUrl}
                        alt="Architecture diagram"
                        width={900}
                        height={450}
                        className="w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-2/1 rounded-xl border border-dashed border-border bg-muted/5 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
                        Architecture diagram planned
                      </span>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <div className="w-1 h-auto bg-primary/20 rounded-full" />
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {project.architecture.description}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* ── Engineering Decisions ──────────────────────── */}
            {project.engineeringDecisions.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  <Lightbulb className="h-4 w-4" />
                  Technical Decisions
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {project.engineeringDecisions.map((decision, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border bg-card/30 p-6 space-y-5 shadow-sm hover:border-primary/20 transition-colors"
                    >
                      <h3 className="font-bold text-base text-foreground-heading tracking-tight">
                        {decision.topic}
                      </h3>

                      <div className="space-y-1.5 px-4 border-l-2 border-primary/40">
                        <p className="text-[10px] font-black uppercase tracking-wider text-primary">
                          Decision
                        </p>
                        <p className="text-sm font-medium text-foreground-heading">
                          {decision.decision}
                        </p>
                      </div>

                      <div className="space-y-1.5 px-4 border-l-2 border-muted">
                        <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                          Rationale
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {decision.reason}
                        </p>
                      </div>

                      {decision.tradeoff && (
                        <div className="space-y-1.5 px-4 border-l-2 border-orange-200">
                          <p className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                            Trade-offs
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed italic">
                            &quot;{decision.tradeoff}&quot;
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Sidebar: Metrics + related ─────────────────── */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  <TrendingUp className="h-4 w-4" />
                  Project Impact
                </div>
                <div className="grid gap-4">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border bg-card/50 p-6 space-y-1 shadow-sm text-center"
                    >
                      <p className="text-3xl font-black text-foreground-heading tabular-nums tracking-tight">
                        {metric.value}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                        {metric.label}
                      </p>
                      {metric.description && (
                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed font-medium">
                          {metric.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related items */}
            {related.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-border">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Similiar Work
                </div>
                <div className="grid gap-4">
                  {related.map((p) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.slug}`}
                      className="group flex flex-col gap-3 rounded-2xl border border-border bg-card/30 p-4 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
                    >
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted/20">
                        {p.coverImage && (
                          <Image
                            src={p.coverImage}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-foreground-heading group-hover:text-primary transition-colors">
                          {p.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1 font-medium">
                          {p.shortDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

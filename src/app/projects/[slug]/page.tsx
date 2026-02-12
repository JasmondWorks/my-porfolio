import { getProjects, getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12 md:py-24 max-w-4xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>

        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h1 className="text-4xl font-bold tracking-tight">
                {project.title}
              </h1>
              <div className="flex gap-2">
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="mr-2 h-4 w-4" /> Code
                    </Link>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button size="sm" asChild>
                    <Link href={project.liveUrl} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <p className="text-xl text-muted-foreground">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Media */}
          <div className="rounded-lg border bg-muted/50 overflow-hidden relative aspect-video">
            {/* Placeholder for video/image carousel */}
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Demo Media
              </div>
            )}
          </div>

          {/* Sections */}
          <div className="grid gap-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {project.longDescription}
              </p>
            </section>

            <Separator />

            {/* Architecture */}
            {project.architecture && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Architecture</h2>
                <div className="rounded-lg border bg-card p-6">
                  {/* Placeholder diagram */}
                  <div className="aspect-[2/1] bg-muted mb-4 rounded flex items-center justify-center text-sm text-muted-foreground">
                    System Architecture Diagram
                  </div>
                  <p className="leading-relaxed text-muted-foreground">
                    {project.architecture.description}
                  </p>
                </div>
              </section>
            )}

            <Separator />

            {/* Engineering Decisions */}
            {project.engineeringDecisions.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Engineering Decisions</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {project.engineeringDecisions.map((decision, index) => (
                    <div
                      key={index}
                      className="rounded-lg border bg-card p-6 space-y-2"
                    >
                      <h3 className="font-semibold text-lg">
                        {decision.topic}
                      </h3>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          Decision:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {decision.decision}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          Why:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {decision.reason}
                        </p>
                      </div>
                      {decision.tradeoff && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-destructive/80">
                            Trade-offs:
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {decision.tradeoff}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <Separator />

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Key Metrics</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="rounded-lg border bg-card p-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        {metric.label}
                      </p>
                      <p className="text-3xl font-bold">{metric.value}</p>
                      {metric.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {metric.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

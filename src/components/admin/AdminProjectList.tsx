"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2, ExternalLink, FolderPlus } from "lucide-react";
import { Project, ProjectCategory } from "@/types/project";
import { deleteProjectAction } from "@/lib/actions";
import { cn } from "@/lib/utils";

interface AdminProjectListProps {
  projects: Project[];
}

const CATEGORY_STYLES: Record<ProjectCategory, string> = {
  Frontend: "bg-blue-500/10   text-blue-400   border-blue-500/20",
  Backend: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Fullstack: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Mobile: "bg-green-500/10  text-green-400  border-green-500/20",
  Hackathon: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export function AdminProjectList({ projects }: AdminProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20">
          <FolderPlus className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground-heading">
            No projects yet
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Create your first project to get started.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:opacity-90 hover:scale-[1.02] transition-all"
        >
          New Project
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectItem({ project }: { project: Project }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Delete "${project.title}"? This cannot be undone.`)) {
      startTransition(async () => {
        await deleteProjectAction(project.id);
      });
    }
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-muted/20",
        isPending && "opacity-50 pointer-events-none",
      )}
    >
      {/* Left: thumbnail + info */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/30">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-widest text-muted-foreground">
              img
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground-heading truncate">
              {project.title}
            </span>
            <span
              className={cn(
                "rounded-md border px-1.5 py-0.5 text-[10px] font-medium",
                CATEGORY_STYLES[project.category],
              )}
            >
              {project.category}
            </span>
            {project.featured && (
              <span className="rounded-md border border-yellow-500/20 bg-yellow-500/10 px-1.5 py-0.5 text-[10px] font-medium text-yellow-400">
                Featured
              </span>
            )}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
          >
            /projects/{project.slug}
            <ExternalLink className="h-2.5 w-2.5" />
          </Link>
        </div>
      </div>

      {/* Right: actions (visible on hover) */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <Link
          href={`/admin/projects/${project.id}/edit`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          title="Edit"
        >
          <Edit className="h-3.5 w-3.5" />
        </Link>
        <button
          onClick={handleDelete}
          disabled={isPending}
          title="Delete"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

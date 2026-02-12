"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2, ExternalLink, MoreHorizontal } from "lucide-react";

import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { deleteProjectAction } from "@/lib/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface AdminProjectListProps {
  projects: Project[];
}

export function AdminProjectList({ projects }: AdminProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <svg
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-foreground">No projects</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started by creating a new project.
        </p>
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
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      startTransition(async () => {
        await deleteProjectAction(project.id);
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group">
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative h-10 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0 border border-border/50">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full text-[10px] text-muted-foreground uppercase tracking-widest bg-muted/50">
              Img
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-foreground truncate">
              {project.title}
            </h3>
            <Badge
              variant="outline"
              className="text-[10px] h-5 px-1.5 font-normal text-muted-foreground border-border/60 bg-muted/20"
            >
              {project.category}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <Link
              href={`/projects/${project.slug}`}
              target="_blank"
              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
            >
              View Live <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
          <Link href={`/admin/projects/${project.id}/edit`}>
            <Edit className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Edit</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={handleDelete}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

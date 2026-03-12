"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, ProjectCategory } from "@/types/project";
import { Github, ExternalLink, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

const CATEGORY_STYLES: Record<ProjectCategory, string> = {
  Frontend: "bg-blue-50/30 text-foreground-heading border-blue-500/10",
  Backend: "bg-purple-50/30 text-foreground-heading border-purple-500/10",
  Fullstack: "bg-indigo-50/30 text-foreground-heading border-indigo-500/10",
  Mobile: "bg-green-50/30 text-foreground-heading border-green-500/10",
  Hackathon: "bg-orange-50/30 text-foreground-heading border-orange-500/10",
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group h-full"
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/10 hover:-translate-y-1 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="absolute inset-0 z-10"
        >
          <span className="sr-only">View {project.title}</span>
        </Link>
        {/* ── Media ─────────────────────────────────────── */}
        <div className="relative aspect-video overflow-hidden bg-muted/20">
          {/* Overlay gradient */}
          <div className="absolute inset-0 z-10 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Cover image */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              isHovered && project.demoVideo ? "opacity-0" : "opacity-100",
            )}
          >
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted/30">
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  No preview
                </span>
              </div>
            )}
          </div>

          {/* Video */}
          {project.demoVideo && (
            <video
              ref={videoRef}
              src={project.demoVideo}
              muted
              loop
              playsInline
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            />
          )}

          {/* Badges overlaid on image */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
            <span
              className={cn(
                "rounded-lg border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                CATEGORY_STYLES[project.category],
              )}
            >
              {project.category}
            </span>
          </div>
          {project.featured && (
            <div className="absolute top-3 right-3 z-20">
              <span className="inline-flex items-center gap-1 rounded-lg border border-yellow-100 bg-yellow-50 px-2 py-0.5 text-[10px] font-bold text-yellow-700 uppercase tracking-wider">
                <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                Featured
              </span>
            </div>
          )}

          {/* Arrow overlay on hover */}
          <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────── */}
        <div className="flex flex-1 flex-col p-5 gap-4">
          <div className="space-y-1.5">
            <h3 className="font-bold text-base text-foreground-heading tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground font-bold uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground font-bold">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between border-t border-border pt-4 mt-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary group-hover:opacity-80 transition-opacity">
              Explore Project
            </span>
            <div className="flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="relative z-20 flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

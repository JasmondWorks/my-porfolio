"use client";

import { useState } from "react";
import { Project, ProjectCategory } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface ProjectsGridProps {
  projects: Project[];
}

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "Frontend",
  "Backend",
  "Fullstack",
  "Mobile",
  "Hackathon",
];

const TECH_FILTERS = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Redis",
  "Docker",
  "Kafka",
  "PostgreSQL",
];

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">(
    "All",
  );
  const [activeTechs, setActiveTechs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTech = (tech: string) =>
    setActiveTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );

  const clearFilters = () => {
    setActiveCategory("All");
    setActiveTechs([]);
    setSearchQuery("");
  };

  const isFiltered =
    activeCategory !== "All" || activeTechs.length > 0 || searchQuery !== "";

  const filtered = projects.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const techMatch =
      activeTechs.length === 0 ||
      activeTechs.every((t) => p.techStack.includes(t));
    const search = searchQuery.toLowerCase();
    const txtMatch =
      !search ||
      p.title.toLowerCase().includes(search) ||
      p.shortDescription.toLowerCase().includes(search) ||
      p.techStack.some((t) => t.toLowerCase().includes(search));
    return catMatch && techMatch && txtMatch;
  });

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ── Section header ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            Featured Work
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground-heading sm:text-4xl text-center">
            Projects I&apos;ve <span className="gradient-text">shipped</span>
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground leading-relaxed text-center">
            A curated selection of projects that showcase my technical depth,
            engineering philosophy, and love for clean interfaces.
          </p>
        </motion.div>

        {/* ── Filters ─────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6">
          {/* Search bar */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-card/50 pl-10 pr-4 py-3 text-sm text-foreground placeholder-muted-foreground backdrop-blur-sm transition-all focus:border-primary/10 hover:border-primary/10 focus:outline-none focus:ring-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category segmented control */}
          <div className="mx-auto flex flex-wrap justify-center gap-2 rounded-2xl bg-muted/30 p-1.5 ring-1 ring-border backdrop-blur-sm">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200",
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tech stack pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground mr-1" />
            {TECH_FILTERS.map((tech) => {
              const active = activeTechs.includes(tech);
              return (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                    active
                      ? "border-primary/10 bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-primary/20 hover:text-foreground",
                  )}
                >
                  {tech}
                </button>
              );
            })}
            {isFiltered && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors font-medium ml-2"
              >
                <X className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Result count */}
          <div className="flex items-center gap-2 mt-2">
            <div className="h-px w-8 bg-border" />
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground text-sm mx-0.5">
                {filtered.length}
              </span>{" "}
              out of{" "}
              <span className="font-semibold text-foreground text-sm mx-0.5">
                {projects.length}
              </span>{" "}
              projects
            </p>
            <div className="h-px w-8 bg-border" />
          </div>
        </div>

        {/* ── Grid ──────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty state ───────────────────────────────── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-6 py-24 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-muted/30 shadow-inner">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">
                No projects found
              </p>
              <p className="text-sm text-muted-foreground max-w-[250px]">
                Try adjusting your filters or search query to find what
                you&apos;re looking for.
              </p>
            </div>
            <button
              onClick={clearFilters}
              className="rounded-xl border border-border bg-background px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

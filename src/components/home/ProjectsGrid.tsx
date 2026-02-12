"use client";

import { useState } from "react";
import { Project, ProjectCategory } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectsGridProps {
  projects: Project[];
}

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "Frontend",
  "Backend",
  "Fullstack",
  "Mobile",
];
const TECH_FILTERS = [
  "React",
  "Next.js",
  "Node.js",
  "Kafka",
  "Redis",
  "Docker",
  "TypeScript",
];

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">(
    "All",
  );
  const [activeTechs, setActiveTechs] = useState<string[]>([]);

  const toggleTechFilter = (tech: string) => {
    setActiveTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const filteredProjects = projects.filter((project) => {
    const categoryMatch =
      activeCategory === "All" || project.category === activeCategory;
    const techMatch =
      activeTechs.length === 0 ||
      activeTechs.every((t) => project.techStack.includes(t));
    return categoryMatch && techMatch;
  });

  return (
    <section
      id="projects"
      className="container py-12 md:py-24 lg:py-32 space-y-16"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Featured Projects
        </h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          A selection of projects that demonstrate my technical depth and
          engineering philosophy.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-8">
        {/* Helper text for "Bento" feel - simple dividers */}
        <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Category Tabs - Segmented Control Style */}
        <div className="flex flex-wrap items-center justify-center p-1 bg-muted/50 rounded-lg border border-border/50">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant="ghost"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-md px-4 py-1.5 h-8 text-sm font-medium transition-all",
                activeCategory === category
                  ? "bg-background text-foreground shadow-sm ring-1 ring-black/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-transparent",
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Tech Stack Filters - Minimal Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TECH_FILTERS.map((tech) => (
            <Badge
              key={tech}
              variant={activeTechs.includes(tech) ? "secondary" : "outline"}
              className={cn(
                "cursor-pointer transition-colors px-2.5 py-0.5 rounded-md text-xs font-normal",
                activeTechs.includes(tech)
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground",
              )}
              onClick={() => toggleTechFilter(tech)}
            >
              {tech}
            </Badge>
          ))}
          {activeTechs.length > 0 && (
            <Button
              variant="link"
              size="sm"
              onClick={() => setActiveTechs([])}
              className="text-xs h-6 px-2 text-muted-foreground hover:text-destructive"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Projects Grid - Dense and structured */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          No projects match the selected filters.
        </div>
      )}
    </section>
  );
}

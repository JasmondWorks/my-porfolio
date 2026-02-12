export type ProjectCategory = "Frontend" | "Backend" | "Fullstack" | "Mobile";

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectDecision {
  topic: string;
  decision: string;
  reason: string;
  tradeoff?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  coverImage: string;
  demoVideo?: string; // URL to video
  githubUrl?: string;
  liveUrl?: string;

  // Detail Page Content
  architecture?: {
    diagramUrl?: string;
    description: string;
  };

  engineeringDecisions: ProjectDecision[];
  metrics: ProjectMetric[];

  // "If I had more time"
  futureImprovements?: string[];

  featured?: boolean;
  dateStr: string; // ISO date for sorting
}

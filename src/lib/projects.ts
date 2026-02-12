import { Project } from "@/types/project";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/projects.json");

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading projects:", error);
    return [];
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error("Error saving projects:", error);
    throw new Error("Failed to save projects");
  }
}

export async function createProject(project: Project): Promise<void> {
  const projects = await getProjects();
  projects.unshift(project);
  await saveProjects(projects);
}

export async function updateProject(
  id: string,
  updatedProject: Project,
): Promise<void> {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index !== -1) {
    projects[index] = updatedProject;
    await saveProjects(projects);
  }
}

export async function deleteProject(id: string): Promise<void> {
  const projects = await getProjects();
  const filteredProjects = projects.filter((p) => p.id !== id);
  await saveProjects(filteredProjects);
}

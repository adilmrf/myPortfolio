import { PROJECTS } from "../content/projects";
import type { Project } from "./types";

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

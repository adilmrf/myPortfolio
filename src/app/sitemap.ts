import type { MetadataRoute } from "next";
import { getAllProjects } from "../lib/projects";
import { canonical } from "../lib/site";

// Emitted as a static sitemap.xml under `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/projects", "/experience", "/about"].map((path) => ({
    url: canonical(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const projectRoutes = getAllProjects().map((p) => ({
    url: canonical(`/projects/${p.id}`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}

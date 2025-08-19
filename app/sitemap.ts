// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://your-domain.com";
  const routes = ["", "/projects", "/contact"].map((p) => ({
    url: base + p,
    lastModified: new Date(),
  }));
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
  }));
  return [...routes, ...projectRoutes];
}

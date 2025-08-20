// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getCurrentOrigin } from "@/utils/getCurrentOrigin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await getCurrentOrigin();
  const routes = ["", "/projects", "/contact"].map((p) => ({
    url: base + p,
    lastModified: new Date(),
  }));
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p._id}`,
    lastModified: new Date(),
  }));
  return [...routes, ...projectRoutes];
}

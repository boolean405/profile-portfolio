import { Project, ProjectListResponse } from "@/types";
import { getCurrentOrigin } from "@/utils/getCurrentOrigin";

/** List projects (SSR/ISR) */
export async function fetchProjects(params?: {
  q?: string;
  tag?: string;
  page?: number;
  limit?: number;
  sort?: string; // e.g. "updatedAt:desc" | "title:asc"
}): Promise<ProjectListResponse> {
  const origin = await getCurrentOrigin();
  const sp = new URLSearchParams();
  if (params?.q) sp.set("q", params.q);
  if (params?.tag) sp.set("tag", params.tag);
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.sort) sp.set("sort", params.sort);

  const url = `${origin}/api/projects${
    sp.toString() ? `?${sp.toString()}` : ""
  }`;

  // Revalidate every 5 minutes (tune as needed)
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Failed to fetch projects (${res.status})`);
  return res.json();
}

/** Single project by id (SSR/ISR) */
export async function fetchProjectById(id: string): Promise<Project> {
  const origin = await getCurrentOrigin();
  const res = await fetch(`${origin}/api/projects/${id}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Project not found (${res.status})`);
  return res.json();
}

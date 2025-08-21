// src/app/projects/page.tsx
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
// import { fetchProjects } from "@/services/project";

export default async function ProjectsPage() {
  // searchParams,
  // {
  //   searchParams: { q?: string; tag?: string; page?: string };
  // }
  // const page = Number(searchParams.page || "1");
  // const {
  //   data: projects,
  //   total,
  //   hasMore,
  // } = await fetchProjects({
  //   q: searchParams.q,
  //   tag: searchParams.tag,
  //   page,
  //   limit: 12,
  //   sort: "updatedAt:desc",
  // });
  return (
    <Section title="Projects" subtitle="Case studies and experiments.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, index) => (
          <ProjectCard key={index} project={p} />
        ))}
      </div>
    </Section>
  );
}

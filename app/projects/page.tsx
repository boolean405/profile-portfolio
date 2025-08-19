// src/app/projects/page.tsx
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
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

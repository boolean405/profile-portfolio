// src/app/projects/page.tsx
import { Section } from "@/components/Section";
import AnimatedGrid from "@/components/AnimatedGrid";
import MotionProjectCard from "@/components/MotionProjectCard";
import { projects } from "@/data/projects";

export default async function ProjectsPage() {
  return (
    <Section title="Projects" subtitle="All of my projects." animated>
      <AnimatedGrid className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <MotionProjectCard key={p._id} project={p} />
        ))}
      </AnimatedGrid>
    </Section>
  );
}

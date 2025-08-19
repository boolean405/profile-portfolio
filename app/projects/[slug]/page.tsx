// src/app/projects/[slug]/page.tsx
import { projects } from "@/data/projects";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  return (
    <div className="container-max space-y-6">
      <h1 className="text-3xl md:text-5xl font-bold">{project.title}</h1>
      <p className="text-[rgb(var(--muted))] max-w-prose">
        {project.long || project.description}
      </p>
      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={630}
          className="rounded-2xl border border-black/10"
        />
      )}
      <div className="flex gap-4">
        {project.demo && (
          <a className="underline" href={project.demo}>
            Live Demo
          </a>
        )}
        {project.github && (
          <a className="underline" href={project.github}>
            Source
          </a>
        )}
      </div>
    </div>
  );
}

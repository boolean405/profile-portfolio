// src/components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";

import { Project } from "@/types";
import { TechBadge } from "@/components/TechBadge";

type Props = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: Props) {
  // de-du  // de-dupe tags and make stable keys based on slug + tag + index
  const tags = Array.from(new Set(project.tags));

  return (
    <article
      className={`card card-hover overflow-hidden ${compact ? "p-4" : "p-5"}`}
    >
      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={630}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className={`${compact ? "h-32" : "h-48"} w-full object-cover`}
          priority={compact} // small perf boost for above-the-fold previews
        />
      )}

      <div className={project.image ? (compact ? "pt-4" : "pt-5") : ""}>
        <h3 className={`font-semibold ${compact ? "text-lg" : "text-xl"} mb-1`}>
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>

        <p className="text-sm text-[rgb(var(--muted))] line-clamp-2 mb-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {tags.slice(0, compact ? 3 : tags.length).map((t, i) => (
            <TechBadge key={i} label={t} small />
          ))}
        </div>
      </div>
    </article>
  );
}

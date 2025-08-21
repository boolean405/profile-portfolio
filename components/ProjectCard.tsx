import Image from "next/image";
import Link from "next/link";

import { Project } from "@/types";
import { TechBadge } from "@/components/TechBadge";

type Props = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = true }: Props) {
  // de-dupe tags and make stable keys based on id + tag + index
  const tags = Array.from(new Set(project.tags));
  const titleSize = compact ? "text-lg" : "text-xl";

  return (
    <article
      className={`card card-hover overflow-hidden ${
        compact ? "p-4" : "p-5"
      } h-full flex flex-col`}
    >
      {/* Media block (consistent height/aspect) */}
      {project.images?.length > 0 && (
        <div className={`${compact ? "h-32" : "h-48"} w-full`}>
          <Image
            src={project.images[0]}
            alt={project.title}
            width={1200}
            height={600}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="h-full w-full object-cover"
            priority={compact} // small perf boost for above-the-fold previews
          />
        </div>
      )}

      <div
        className={`flex flex-col flex-1 ${
          project.images?.length ? (compact ? "pt-4" : "pt-5") : ""
        }`}
      >
        {/* Title: clamp to 2 lines + fixed min height so all cards align */}
        <h3
          className={`font-semibold ${titleSize} mb-1 leading-snug line-clamp-2 break-words min-h-[3.5rem]`}
        >
          <Link href={`/projects/${project._id}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>

        {/* Description: clamp to 2 lines + fixed min height */}
        <p className="text-sm text-[rgb(var(--muted))] line-clamp-2 min-h-[2.5rem] mb-2">
          {project.shortDesc}
        </p>

        {/* Tags pinned to bottom for equalized layouts */}
        <div className="mt-auto pt-2 flex flex-wrap gap-1">
          {tags.slice(0, compact ? 3 : tags.length).map((t, i) => (
            <TechBadge key={`${project._id}-${t}-${i}`} label={t} small />
          ))}
        </div>
      </div>
    </article>
  );
}

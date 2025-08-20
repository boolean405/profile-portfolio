import { notFound } from "next/navigation";

import { projects } from "@/data/projects";
import ProjectGallery from "@/components/ProjectGallery";
import TagBadge from "@/components/TagBadge";
import ExpandableText from "@/components/ExpandableText";

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p._id }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p._id === id);
  if (!project) return notFound();

  const hasImages = Array.isArray(project.images) && project.images.length > 0;

  return (
    <div className="container-max space-y-8 md:space-y-10">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          {project.title}
        </h1>
        {project.shortDesc && (
          <p className="text-[rgb(var(--muted))] text-base md:text-lg">
            {project.shortDesc}
          </p>
        )}
        {project.tags?.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((t) => (
              <TagBadge key={t}>{t}</TagBadge>
            ))}
          </div>
        ) : null}
      </header>

      {/* Gallery */}
      {hasImages ? (
        <ProjectGallery images={project.images} alt={project.title} />
      ) : (
        <div className="rounded-2xl border border-black/10 bg-[rgb(var(--muted))/0.06] p-6 text-[rgb(var(--muted))]">
          No images available.
        </div>
      )}

      {/* Body */}
      <section className="grid gap-8 md:grid-cols-[1fr_320px]">
        <div className="max-w-none text-[rgb(var(--foreground))]">
          {/* Long description – expandable */}
          {project.longDesc && (
            <ExpandableText
              text={project.longDesc}
              collapsedHeight={100} // tweak as you like (px)
              className="prose"
            />
          )}
        </div>

        {/* Sidebar card remains the same */}
        <aside className="h-max rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:bg-[rgb(var(--card))]">
          <div className="space-y-4">
            {/* Buttons */}
            <div className="flex flex-col gap-3">
              {/* Live (Primary) */}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--primary))] bg-[rgb(var(--primary))] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--primary-foreground))] shadow-sm transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]/50"
                >
                  Live ↗
                </a>
              )}

              {/* Source (Outline / Neutral) */}
              {project.source && (
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--foreground))] shadow-sm transition hover:bg-[rgb(var(--muted))/0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]/40"
                >
                  Source Code ↗
                </a>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

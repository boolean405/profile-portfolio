import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectGallery from "@/components/ProjectGallery";
import ExpandableText from "@/components/ExpandableText";

// new imports
import ProjectHeaderAnimated from "@/components/ProjectHeaderAnimated";
import InViewFadeUp from "@/components/InViewFadeUp";
import ProjectSidebarCard from "@/components/ProjectSidebarCard";

export function generateStaticParams() {
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
      {/* Header (animated) */}
      <ProjectHeaderAnimated
        title={project.title}
        shortDesc={project.shortDesc}
        tags={project.tags}
      />

      {/* Gallery (animated reveal) */}
      {hasImages ? (
        <InViewFadeUp>
          <ProjectGallery images={project.images} alt={project.title} />
        </InViewFadeUp>
      ) : (
        <InViewFadeUp>
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--muted))/0.06] p-6 text-[rgb(var(--muted))]">
            No images available.
          </div>
        </InViewFadeUp>
      )}

      {/* Body + Sidebar */}
      <section className="grid gap-8 md:grid-cols-[1fr_320px]">
        <InViewFadeUp className="max-w-none text-[rgb(var(--fg))]">
          {project.longDesc && (
            <ExpandableText
              text={project.longDesc}
              collapsedHeight={100}
              className="prose"
            />
          )}
        </InViewFadeUp>

        <ProjectSidebarCard live={project.live} source={project.source} />
      </section>
    </div>
  );
}

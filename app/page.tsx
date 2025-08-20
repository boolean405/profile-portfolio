import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { personJsonLd } from "@/lib/seo";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import { ContactForm } from "@/components/ContactForm";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      <Hero />

      {/* Projects */}
      <Section title="Projects" subtitle="Some of my recent work.">
        <div id="projects" className="scroll-mt-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button as="a" href="/projects" variant="secondary">
              View All Projects →
            </Button>
          </div>
        </div>
      </Section>

      {/* Contact form */}
      <Section
        title="Contact"
        subtitle="Tell me about your idea, scope, and timeline."
      >
        <div id="contact" className="scroll-mt-24">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}

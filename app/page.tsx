// src/app/page.tsx (or wherever your HomePage is)
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { personJsonLd } from "@/lib/seo";
import Hero from "@/components/Hero";
import { ContactForm } from "@/components/ContactForm";
import { projects as projectsData } from "@/data/projects";

// new imports
import AnimatedInView from "@/components/AnimatedInView";
import AnimatedGrid from "@/components/AnimatedGrid";
import MotionProjectCard from "@/components/MotionProjectCard";
import AnimatedCTA from "@/components/AnimatedCTA";

export default async function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      <Hero />

      {/* Projects */}
      <Section title="Projects" subtitle="Some of my recent work." animated>
        <div id="projects" className="scroll-mt-24">
          <AnimatedGrid className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectsData.slice(0, 6).map((p) => (
              <MotionProjectCard key={p._id} project={p} />
            ))}
          </AnimatedGrid>

          <div className="mt-8 flex justify-center">
            <AnimatedCTA>
              <Button as="a" href="/projects" variant="secondary">
                View All Projects →
              </Button>
            </AnimatedCTA>
          </div>
        </div>
      </Section>

      {/* Contact form */}
      <Section
        title="Contact"
        subtitle="Tell me about your idea, scope, and timeline."
        animated
      >
        <AnimatedInView>
          <div id="contact" className="scroll-mt-24">
            <ContactForm />
          </div>
        </AnimatedInView>
      </Section>
    </>
  );
}

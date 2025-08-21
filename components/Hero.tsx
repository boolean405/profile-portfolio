// src/components/Hero.tsx
import Image from "next/image";
import { Button } from "@/components/Button";
import { TechBadge } from "@/components/TechBadge";
import { profile } from "@/data/profile";

// 👇 client bits
import AnimatedTitle from "@/components/AnimatedTitle";
import AnimatedReveal from "@/components/AnimatedReveal";
import AnimatedParagraph from "./AnimatedParagraph";
import AnimatedGroup from "./AnimatedGroup";

export default async function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-indigo-500/40 via-violet-500/30 to-sky-500/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-fuchsia-500/30 via-rose-500/20 to-amber-400/20"
      />

      <div className="container-max py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1 space-y-6 text-center md:text-left">
            {/* Title + avatar */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <AnimatedTitle className="text-4xl md:text-6xl font-extrabold tracking-tight">
                {profile.title}
              </AnimatedTitle>

              <AnimatedReveal>
                <Image
                  src={profile.image}
                  alt={`${profile.name} avatar`}
                  width={400}
                  height={400}
                  priority
                  className="rounded-full ring-2 ring-[rgb(var(--brand))] shadow-lg object-cover"
                />
              </AnimatedReveal>
            </div>

            <AnimatedParagraph
              className="text-lg text-[rgb(var(--muted))] max-w-prose mx-auto md:mx-0"
              staggerWords
            >
              {profile.bio}
            </AnimatedParagraph>

            <AnimatedGroup>
              <Button as="a" href="#contact">
                Contact Me
              </Button>
              <Button
                as="a"
                href={profile.resume}
                variant="secondary"
                className="flex items-center"
              >
                Download Resume
              </Button>
            </AnimatedGroup>

            <AnimatedGroup>
              {profile.skills.map((t, i) => (
                <TechBadge key={i} label={t} />
              ))}
            </AnimatedGroup>
          </div>
        </div>
      </div>
    </section>
  );
}

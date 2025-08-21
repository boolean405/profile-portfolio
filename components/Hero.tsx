// src/components/Hero.tsx
import Image from "next/image";
import { Button } from "@/components/Button";
import { TechBadge } from "@/components/TechBadge";
import { profile } from "@/data/profile";
// import { getProfile } from "@/services/profile";

export default async function Hero() {
  // const profile = await getProfile();

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
          {/* Title + bio + actions */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            {/* Title + circle avatar side-by-side */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                {profile.title}
              </h1>
              <Image
                src={profile.image} // place your image in /public
                alt={`${profile.name} avatar`}
                width={200}
                height={200}
                priority
                className="rounded-full ring-2 ring-[rgb(var(--brand))] shadow-lg object-cover"
              />
            </div>

            <p className="text-lg text-[rgb(var(--muted))] max-w-prose mx-auto md:mx-0">
              {profile.bio}
            </p>

            <div className="flex justify-center md:justify-start gap-3">
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
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              {profile.skills.map((t, i) => (
                <TechBadge key={i} label={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

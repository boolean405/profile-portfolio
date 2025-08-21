// src/components/Footer.tsx
import { profile } from "@/data/profile";
import AnimatedFooter from "@/components/AnimatedFooter";

export default async function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    {
      _id: "1",
      label: "GitHub",
      href: profile.github,
      external: true,
      icon: "github" as const,
    },
    {
      _id: "2",
      label: "LinkedIn",
      href: profile.linkedin,
      external: true,
      icon: "linkedin" as const,
    },
    {
      _id: "3",
      label: "X",
      href: profile.x,
      external: true,
      icon: "x" as const,
    },
    {
      _id: "4",
      label: "Email",
      href: `mailto:${profile.email}`,
      icon: "email" as const,
    },
    {
      _id: "5",
      label: "Resume",
      href: profile.resume,
      icon: "resume" as const,
    },
  ];

  return <AnimatedFooter brand="Boolean" year={year} socials={socials} />;
}

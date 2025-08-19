import { SiGithub, SiLinkedin, SiGmail } from "react-icons/si";
import { IoDocument } from "react-icons/io5";
import { profile } from "@/data/profile";
import { SocialLink } from "@/types";

export function Footer() {
  const year = new Date().getFullYear();

  const socials: SocialLink[] = [
    {
      _id: "1",
      label: "GitHub",
      href: `${profile.github}`,
      Icon: SiGithub,
      external: true,
    },
    {
      _id: "2",
      label: "LinkedIn",
      href: `${profile.linkedin}`,
      Icon: SiLinkedin,
      external: true,
    },
    {
      _id: "3",
      label: "Email",
      href: `mailto:${profile.email}`,
      Icon: SiGmail,
    },
    {
      _id: "4",
      label: "Resume",
      href: `${profile.resume}`,
      Icon: IoDocument,
    },
  ];

  return (
    <footer className="mt-16 border-t border-black/10">
      <div className="container-max py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-[rgb(var(--muted))]">
          <p className="font-medium text-[rgb(var(--fg))]">Boolean</p>
          <p>© {year} All rights reserved.</p>
        </div>

        <nav
          aria-label="Social links"
          className="flex items-center gap-3 md:gap-4"
        >
          {socials.map(({ _id, label, href, Icon, external }) => (
            <a
              key={_id}
              href={href}
              className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm
                         text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]
                         ring-1 ring-transparent hover:ring-black/10
                         transition"
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <Icon
                className="h-4 w-4 flex-none opacity-80 group-hover:opacity-100"
                aria-hidden
              />
              <span className="sr-only">{label}</span>
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/data/profile";
import AnimatedHeader from "@/components/AnimatedHeader";
import AnimatedNavLinks from "@/components/AnimatedNavLinks";
import HomeLink from "@/components/HomeLink";
import MobileNav from "@/components/MobileNav";

export default async function Navbar() {
  const desktopItems = [
    { href: "#projects", label: "Projects", isExternal: false },
    { href: "#contact", label: "Contact", isExternal: false },
    { href: profile.resume, label: "Download Resume", isExternal: false },
  ];

  // For mobile, prefer route-absolute anchors so it works from any page
  const mobileItems = [
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
    { href: profile.resume, label: "Download Resume", external: false },
  ];

  return (
    <AnimatedHeader>
      <div className="container-max h-14 flex items-center justify-between">
        <HomeLink className="font-bold text-2xl">Boolean</HomeLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <HomeLink className="px-3 py-2 rounded-lg text-sm md:text-base">
            Home
          </HomeLink>
          <AnimatedNavLinks items={desktopItems} />
        </nav>

        {/* Right: theme + mobile menu trigger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav items={mobileItems} />
          </div>
        </div>
      </div>
    </AnimatedHeader>
  );
}

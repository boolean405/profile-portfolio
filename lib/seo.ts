// src/lib/seo.ts — JSON‑LD helpers
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bo Bo Aung (Boolean)",
    url: "https://boolean405.vercel.app",
    image: "https://boolean405.vercel.app/profile/boolean405-portfolio.jpg",
    sameAs: [
      "https://github.com/boolean405",
      "https://www.linkedin.com/in/boolean405",
      "https://x.com/boolean405",
    ],
    jobTitle: "Full‑Stack Developer",
    worksFor: { "@type": "Organization", name: "Freelance" },
  };
}

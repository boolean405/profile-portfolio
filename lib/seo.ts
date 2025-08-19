// src/lib/seo.ts — JSON‑LD helpers
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bo Bo Aung (Boolean)",
    url: "https://your-domain.com",
    image: "https://your-domain.com/avatar.jpg",
    sameAs: [
      "https://github.com/yourhandle",
      "https://www.linkedin.com/in/yourhandle/"
    ],
    jobTitle: "Full‑Stack Developer",
    worksFor: { "@type": "Organization", name: "Freelance" }
  };
}
// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { headers } from "next/headers";

/** Resolve the current request origin behind proxies/CDNs */
async function getRequestOrigin() {
  const h = headers(); // sync, NOT a Promise
  const proto = (await h).get("x-forwarded-proto") ?? "http";
  const host = (await h).get("x-forwarded-host") ?? (await h).get("host");
  // Fallback for local dev or unusual setups
  if (!host) return "http://localhost:3000";
  return `${proto}://${host}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await getRequestOrigin();

  return {
    title: { default: "Boolean — Portfolio", template: "%s · Boolean" },
    description:
      "Full-stack developer portfolio: projects, resume, and contact.",
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: "Boolean — Portfolio",
      description:
        "Full-stack developer portfolio: projects, resume, and contact.",
      url: siteUrl,
      siteName: "Boolean",
      // If you use a relative path, Next will resolve it against metadataBase:
      images: ["/profile-image.jpg"],
      type: "website",
    },
    icons: { icon: "/favicon.ico" },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main className="container-max py-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "");

if (!SITE_URL && process.env.NODE_ENV !== "development") {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be set to an absolute URL in production"
  );
}

export const metadata: Metadata = {
  title: { default: "Boolean — Portfolio", template: "%s · Boolean" },
  description: "Full-stack developer portfolio: projects, resume, and contact.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Boolean — Portfolio",
    description:
      "Full-stack developer portfolio: projects, resume, and contact.",
    url: SITE_URL,
    siteName: "Boolean",
    images: ["/profile-image.jpg"], // resolved against metadataBase
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

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

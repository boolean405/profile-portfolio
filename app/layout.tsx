import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { getCurrentOrigin } from "@/utils/getCurrentOrigin";

export async function generateMetadata(): Promise<Metadata> {
  const SITE_URL = await getCurrentOrigin();

  return {
    title: { default: "Boolean — Portfolio", template: "%s · Boolean" },
    description:
      "Full-stack developer portfolio by Bo Bo Aung (Boolean). Projects, resume, and contact — building scalable web and mobile apps with Node.js, React, Next.js, and Expo.",
    metadataBase: new URL(SITE_URL),

    alternates: { canonical: SITE_URL },

    authors: [{ name: "Bo Bo Aung", url: SITE_URL }],
    keywords: [
      "Full-stack developer",
      "Node.js",
      "React",
      "Next.js",
      "Expo",
      "MongoDB",
      "Socket.IO",
      "WebRTC",
      "Portfolio",
      "Resume",
      "Boolean",
      "Bo Bo Aung",
    ],

    openGraph: {
      title: "Boolean — Full-Stack Developer Portfolio",
      description:
        "Explore projects, skills, and resume of Bo Bo Aung (Boolean) — full-stack developer specializing in Node.js, Express, MongoDB, Redis, Socket.IO, React, Next.js, and Expo React Native.",
      url: SITE_URL,
      siteName: "Boolean",
      locale: "en_US",
      type: "website",
      images: [{ url: "/profile-image.jpg", width: 1200, height: 630 }],
    },

    twitter: {
      card: "summary_large_image",
      title: "Boolean — Full-Stack Developer Portfolio",
      description:
        "Portfolio of Bo Bo Aung (Boolean): projects, resume, and contact. Building scalable, real-time web and mobile applications.",
      creator: "@boolean405",
      images: ["/profile-image.jpg"],
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },

    applicationName: "Boolean Portfolio",
    category: "technology",

    other: {
      "msapplication-TileColor": "#2d89ef",
      "application-name": "Boolean Portfolio",
    },
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

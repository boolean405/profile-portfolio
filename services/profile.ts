import { headers } from "next/headers";
import { Profile } from "@/types";
import { profile as fallbackProfile } from "@/data/profile";

export async function getProfile(): Promise<Profile> {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  try {
    const res = await fetch(
      `${protocol}://${host}/api/profile?email=boolean405@gmail.com`,
      { cache: "no-store" }
    );

    if (!res.ok) return fallbackProfile;
    return res.json();
  } catch {
    return fallbackProfile;
  }
}

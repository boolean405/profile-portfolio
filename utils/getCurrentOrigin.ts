import { headers } from "next/headers";

export async function getCurrentOrigin() {
  const host = (await headers()).get("host");
  if (!host) return "http://localhost:3000";
  const proto = process.env.NODE_ENV === "development" ? "http" : "https";
  return `${proto}://${host}`;
}

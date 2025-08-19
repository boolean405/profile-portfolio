import { IconType } from "react-icons";

export type Project = {
  _id: string; // unique identifier
  title: string;
  slug: string;
  description: string;
  long?: string;
  tags: string[];
  image?: string;
  demo?: string;
  github?: string;
};

export type SocialLink = {
  _id: string; // unique identifier
  label: string;
  href: string;
  Icon: IconType; // works for react-icons (Si*, Io*, etc.)
  external?: boolean;
};

// src/types/profile.ts
export interface Profile {
  _id?: string;
  name: string;
  title: string;
  resume: string;
  github: string;
  linkedin: string;
  email: string;
  image: string; // e.g. "profile-image.jpg" (served from /public)
  bio: string;
  skills: string[];
  createdAt?: string;
  updatedAt?: string;
}

import { IconType } from "react-icons";

export type Project = {
  _id: string; // unique identifier
  title: string;
  shortDesc: string;
  longDesc: string;
  tags: string[];
  images: string[];
  live?: string;
  source?: string;
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
  description: string;
  bio: string;
  email: string;
  resume: string;
  github: string;
  linkedin: string;
  x: string;
  website: string;
  image: string;
  skills: string[];
}

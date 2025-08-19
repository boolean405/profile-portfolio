// src/app/api/profile/schema.ts
import { Joi } from "@/lib/joi";

export const createProfileSchema = Joi.object({
  name: Joi.string().trim().max(120).required(),
  title: Joi.string().trim().max(200).required(),
  resume: Joi.string().uri().required(),
  github: Joi.string().uri().optional(),
  linkedin: Joi.string().uri().optional(),
  email: Joi.string().email().required(),
  image: Joi.string().trim().optional(), // allow path or URL; you can harden with regex if needed
  bio: Joi.string().trim().max(2000).optional(),
  skills: Joi.array().items(Joi.string().trim().max(80)).default([]),
});

// For PATCH: all fields optional, but require at least 1 key
export const updateProfileSchema = createProfileSchema
  .fork(
    [
      "name",
      "title",
      "resume",
      "github",
      "linkedin",
      "email",
      "image",
      "bio",
      "skills",
    ],
    (schema) => schema.optional()
  )
  .min(1);

// src/models/Profile.ts
import { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    resume: { type: String, required: true, trim: true },
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    x: { type: String, trim: true },
    website: { type: String, trim: true },
    description: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    image: { type: String, trim: true },
    bio: { type: String, trim: true, maxlength: 2000 },
    skills: [{ type: String, trim: true, maxlength: 80 }],
  },
  { timestamps: true }
);

export type ProfileDoc = typeof ProfileSchema extends infer T ? T : never;
export default models.Profile || model("Profile", ProfileSchema);

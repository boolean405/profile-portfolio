import Joi from "joi";

// Shared pieces
const url = Joi.string().uri({ scheme: ["http", "https"] });
const str = Joi.string().trim();

export const createProjectSchema = Joi.object({
  title: str.max(200).required(),
  shortDesc: str.max(300).required(),
  longDesc: str.max(8000).required(),
  tags: Joi.array().items(str.max(50)).default([]),
  images: Joi.array().items(str).default([]),
  live: url.optional().allow(""),
  source: url.optional().allow(""),
}).required();

export const updateProjectSchema = Joi.object({
  title: str.max(200),
  shortDesc: str.max(300),
  longDesc: str.max(8000),
  tags: Joi.array().items(str.max(50)),
  images: Joi.array().items(url),
  live: url.allow(""),
  source: url.allow(""),
})
  .or("title", "shortDesc", "longDesc", "tags", "images", "live", "source") // at least one
  .required();

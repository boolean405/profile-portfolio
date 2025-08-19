// src/lib/validators.ts
import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  message: Joi.string().min(10).max(2000).required(),
});

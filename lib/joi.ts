// src/lib/joi.ts
import JoiBase from "joi";

export const Joi = JoiBase;

export function toProblem(e: unknown): { status: number; body: unknown } {
  // Map Joi + Mongoose errors to consistent responses
  // Keep messages dev-friendly but safe for clients
  if ((e as unknown as JoiBase.ValidationError)?.isJoi) {
    return {
      status: 400,
      body: {
        error: "VALIDATION_ERROR",
        details: (e as JoiBase.ValidationError).details,
      },
    };
  }
  const err = e as unknown as {
    name?: string;
    code?: number;
    keyValue?: unknown;
  };
  if (err?.name === "MongoServerError" && err.code === 11000) {
    return { status: 409, body: { error: "DUPLICATE_KEY", key: err.keyValue } };
  }
  return { status: 500, body: { error: "INTERNAL_ERROR" } };
}

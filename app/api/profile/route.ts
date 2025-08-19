// src/app/api/profile/route.ts
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";
import { toProblem } from "@/lib/joi";
import { createProfileSchema } from "./schema.tsschema";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  try {
    if (email) {
      const one = await Profile.findOne({ email }).lean();
      return Response.json(one, { status: one ? 200 : 404 });
    }
    const list = await Profile.find({}).sort({ updatedAt: -1 }).lean();
    return Response.json(list, { status: 200 });
  } catch (e) {
    const { status, body } = toProblem(e);
    return Response.json(body, { status });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const payload = await req.json();
    const value = await createProfileSchema.validateAsync(payload, {
      abortEarly: false,
      stripUnknown: true,
    });
    const created = await Profile.create(value);
    return Response.json(created, { status: 201 });
  } catch (e) {
    const { status, body } = toProblem(e);
    return Response.json(body, { status });
  }
}

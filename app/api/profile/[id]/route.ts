import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";
import { toProblem } from "@/lib/joi";
import { updateProfileSchema } from "../schema.tsschema";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    if (!mongoose.isValidObjectId(params.id)) {
      return Response.json({ error: "INVALID_ID" }, { status: 400 });
    }
    const doc = await Profile.findById(params.id).lean();
    return Response.json(doc, { status: doc ? 200 : 404 });
  } catch (e) {
    const { status, body } = toProblem(e);
    return Response.json(body, { status });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    if (!mongoose.isValidObjectId(params.id)) {
      return Response.json({ error: "INVALID_ID" }, { status: 400 });
    }

    const payload = await req.json();

    // Joi: all fields optional, but require at least 1 key
    const value = await updateProfileSchema.validateAsync(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    const updated = await Profile.findByIdAndUpdate(params.id, value, {
      new: true,
      runValidators: true, // let Mongoose enforce schema constraints too
    }).lean();

    return Response.json(updated, { status: updated ? 200 : 404 });
  } catch (e) {
    const { status, body } = toProblem(e);
    return Response.json(body, { status });
  }
}

import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { toProblem } from "@/lib/joi";
import { updateProjectSchema } from "../schema";

function invalidId(id: string) {
  return !mongoose.isValidObjectId(id);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const { id } = await params;
    if (invalidId(id)) {
      return Response.json({ error: "INVALID_ID" }, { status: 400 });
    }
    const doc = await Project.findById(id).lean();
    return Response.json(doc, { status: doc ? 200 : 404 });
  } catch (e: unknown) {
    const { status, body } = toProblem(e);
    return Response.json(body, { status });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const { id } = await params;
    if (invalidId(id)) {
      return Response.json({ error: "INVALID_ID" }, { status: 400 });
    }

    const payload = await req.json();
    const value = await updateProjectSchema.validateAsync(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    const updated = await Project.findByIdAndUpdate(id, value, {
      new: true,
      runValidators: true,
    }).lean();

    return Response.json(updated, { status: updated ? 200 : 404 });
  } catch (e: unknown) {
    const { status, body } = toProblem(e);
    return Response.json(body, { status });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const { id } = await params;
    if (invalidId(id)) {
      return Response.json({ error: "INVALID_ID" }, { status: 400 });
    }
    const deleted = await Project.findByIdAndDelete(id).lean();
    return Response.json(
      { deleted: !!deleted },
      { status: deleted ? 200 : 404 }
    );
  } catch (e: unknown) {
    const { status, body } = toProblem(e);
    return Response.json(body, { status });
  }
}

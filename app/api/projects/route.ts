import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { toProblem } from "@/lib/joi";
import { createProjectSchema } from "./schema";

// function parseSort(sort?: string) {
//   // e.g. "updatedAt:desc" or "title:asc"
//   if (!sort) return { updatedAt: -1 };
//   const [field, dirRaw] = sort.split(":");
//   const dir = dirRaw?.toLowerCase() === "asc" ? 1 : -1;
//   const allow = new Set(["updatedAt", "title"]);
//   return allow.has(field) ? { [field]: dir } : { updatedAt: -1 };
// }

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();
    const tag = searchParams.get("tag")?.trim();
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const limit = Math.min(
      100,
      Math.max(1, Number(searchParams.get("limit") || "12"))
    );
    // const sort = parseSort(searchParams.get("sort") || undefined);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};
    if (q) {
      // Text search or regex fallback
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { shortDesc: { $regex: q, $options: "i" } },
        { longDesc: { $regex: q, $options: "i" } },
      ];
    }
    if (tag) filter.tags = tag;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Project.find(filter).skip(skip).limit(limit).lean(),
      Project.countDocuments(filter),
    ]);

    return Response.json(
      {
        data,
        page,
        limit,
        total,
        hasMore: page * limit < total,
      },
      { status: 200 }
    );
  } catch (e: unknown) {
    const { status, body } = toProblem(e);
    return Response.json(body, { status });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const payload = await req.json();
    const value = await createProjectSchema.validateAsync(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    const created = await Project.create(value);
    return Response.json(created, { status: 201 });
  } catch (e: unknown) {
    const { status, body } = toProblem(e);
    return Response.json(body, { status });
  }
}

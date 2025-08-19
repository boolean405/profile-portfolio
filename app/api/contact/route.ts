// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { resend, contactEmail } from "@/lib/email";

export const runtime = "nodejs"; // Resend Node SDK

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { value, error } = contactSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return NextResponse.json(
        { error: error.details.map((d) => d.message).join("; ") },
        { status: 400 }
      );
    }

    const { to, from, subject, text } = contactEmail(value);
    const result = await resend.emails.send({ to, from, subject, text });

    if (result.error) {
      return NextResponse.json(
        { error: String(result.error) },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

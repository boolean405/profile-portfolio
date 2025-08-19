// src/lib/email.ts
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export function contactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const to = process.env.CONTACT_TO_EMAIL!;
  const from = process.env.CONTACT_FROM_EMAIL!;
  const subject = `New portfolio message from ${name}`;
  const text = `From: ${name} <${email}>\n\n${message}`;
  return { to, from, subject, text };
}

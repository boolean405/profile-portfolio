// src/app/contact/page.tsx
"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("Sending…");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        message: form.get("message"),
      }),
    });

    const data = await res.json();
    setStatus(res.ok ? "Message sent!" : data.error || "Failed to send.");
    if (res.ok) (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Your name"
          required
          className="w-full rounded-xl border border-black/10 p-3 bg-white/60 dark:bg-black/20"
        />
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          className="w-full rounded-xl border border-black/10 p-3 bg-white/60 dark:bg-black/20"
        />
        <textarea
          name="message"
          placeholder="Tell me about your project…"
          required
          rows={6}
          className="w-full rounded-xl border border-black/10 p-3 bg-white/60 dark:bg-black/20"
        />
        <button className="rounded-xl bg-[rgb(var(--brand))] text-white px-5 py-3 font-medium">
          Send
        </button>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}

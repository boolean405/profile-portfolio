// src/components/ContactForm.tsx
"use client";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Capture the form element BEFORE any await (React event pooling)
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    setStatus("Sending…");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
        }),
        cache: "no-store",
      });

      // Safer parse in case response isn't JSON
      let payload: unknown = null;
      const ct = res.headers.get("content-type") || "";
      try {
        payload = ct.includes("application/json")
          ? await res.json()
          : await res.text();
      } catch {
        payload = null;
      }

      if (res.ok) {
        setStatus("Message sent!");
        formEl.reset(); // use saved reference
      } else {
        const msg =
          (payload as { error?: string })?.error ||
          (typeof payload === "string" && payload) ||
          `Failed to send (HTTP ${res.status}).`;
        setStatus(msg);
      }
    } catch (error: unknown) {
      setStatus(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <input
        name="name"
        placeholder="Your name"
        required
        className="w-full rounded-xl border border-[rgb(var(--border))] 
             bg-[rgb(var(--card))] text-[rgb(var(--fg))] 
             placeholder:text-[rgb(var(--muted))] 
             p-3 focus:outline-none 
             focus:ring-2 focus:ring-[rgb(var(--brand))]"
      />

      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        required
        className="w-full rounded-xl border border-[rgb(var(--border))] 
             bg-[rgb(var(--card))] text-[rgb(var(--fg))] 
             placeholder:text-[rgb(var(--muted))] 
             p-3 focus:outline-none 
             focus:ring-2 focus:ring-[rgb(var(--brand))]"
      />
      <textarea
        name="message"
        placeholder="Tell me about your project…"
        required
        rows={6}
        className="w-full rounded-xl border border-[rgb(var(--border))] 
             bg-[rgb(var(--card))] text-[rgb(var(--fg))] 
             placeholder:text-[rgb(var(--muted))] 
             p-3 focus:outline-none 
             focus:ring-2 focus:ring-[rgb(var(--brand))]"
      />
      <button className="rounded-xl bg-[rgb(var(--brand))] text-white px-5 py-2 font-medium">
        Send
      </button>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </form>
  );
}

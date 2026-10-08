"use client";

import { useState } from "react";

const CLINIC_PHONE = "919871190713";
const CLINIC_EMAIL = "care@drgyanshomeopathy.com";

/**
 * No backend/email service is configured yet (see guide §2 — Formspree/Web3Forms
 * or a Next.js API route are the intended options once credentials exist). Until
 * then, submission opens a pre-filled WhatsApp message to the clinic's real
 * number — functional today, no secrets required, and a channel patients
 * already expect. Swap the onSubmit handler for a real API call once a form
 * backend is connected; the field set (name, phone, preferred date, concern)
 * stays the same either way.
 */
export default function AppointmentForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [concern, setConcern] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const message = [
      `Appointment request from ${name}`,
      `Phone: ${phone}`,
      preferredDate && `Preferred date: ${preferredDate}`,
      `Concern: ${concern}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${CLINIC_PHONE}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          suppressHydrationWarning
          className="mt-1 w-full rounded-xl border border-leaf-200 bg-white px-4 py-2.5 text-sm text-ink focus:border-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-600"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium text-ink">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          suppressHydrationWarning
          className="mt-1 w-full rounded-xl border border-leaf-200 bg-white px-4 py-2.5 text-sm text-ink focus:border-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-600"
        />
      </div>

      <div>
        <label htmlFor="preferredDate" className="text-sm font-medium text-ink">
          Preferred date
        </label>
        <input
          id="preferredDate"
          type="date"
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          suppressHydrationWarning
          className="mt-1 w-full rounded-xl border border-leaf-200 bg-white px-4 py-2.5 text-sm text-ink focus:border-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-600"
        />
      </div>

      <div>
        <label htmlFor="concern" className="text-sm font-medium text-ink">
          Concern
        </label>
        <textarea
          id="concern"
          required
          rows={3}
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          placeholder="Briefly describe what you'd like to discuss"
          suppressHydrationWarning
          className="mt-1 w-full rounded-xl border border-leaf-200 bg-white px-4 py-2.5 text-sm text-ink focus:border-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-600"
        />
      </div>

      <button
        type="submit"
        suppressHydrationWarning
        className="mt-2 rounded-full bg-forest-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-800"
      >
        Send via WhatsApp
      </button>
      <p className="text-xs text-ink/60">
        Prefer email? Write to{" "}
        <a href={`mailto:${CLINIC_EMAIL}`} className="underline">
          {CLINIC_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}

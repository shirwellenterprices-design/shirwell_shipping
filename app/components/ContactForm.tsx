"use client";

import { submitContactAction, type ContactState } from "@/app/actions/contact";
import { useActionState } from "react";

const initialState: ContactState = {};

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactAction, initialState);

  if (state.success) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-surface-elevated p-6 text-center">
        <p className="text-lg font-bold text-gold">Message sent!</p>
        <p className="mt-2 text-muted">Thank you — our team will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p className="rounded-lg border border-brand-red/30 bg-brand-red/10 px-4 py-3 text-sm text-brand-red">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-muted">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1.5 w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-muted">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1.5 w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-gold py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-gold-bright disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

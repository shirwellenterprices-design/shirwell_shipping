"use client";

import { adminLoginAction, type AdminAuthState } from "@/app/admin/actions";
import Link from "next/link";
import { useActionState } from "react";

const initialState: AdminAuthState = {};

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLoginAction, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-5 border border-border bg-white p-5 sm:mt-8 sm:p-8">
      {state.error && (
        <p className="rounded-lg border border-brand-red/30 bg-brand-red/5 px-4 py-3 text-sm text-brand-red">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Admin Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full border border-border px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full border border-border px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full border border-gold bg-gold py-3.5 font-serif text-sm font-bold uppercase tracking-wide text-black hover:bg-gold-bright disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>

      <p className="text-center text-sm text-muted">
        <Link href="/home" className="font-semibold text-gold hover:underline">
          ← Back to homepage
        </Link>
      </p>
    </form>
  );
}

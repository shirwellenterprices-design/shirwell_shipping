"use client";

import { driverLoginAction, type DriverAuthState } from "@/app/driver/actions";
import { useActionState } from "react";

const initialState: DriverAuthState = {};

export default function DriverLoginForm() {
  const [state, formAction, pending] = useActionState(driverLoginAction, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <div>
        <label htmlFor="driver-email" className="block text-sm font-medium text-muted">
          Driver Email
        </label>
        <input
          id="driver-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-1 w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-foreground outline-none focus:border-gold"
        />
      </div>
      <div>
        <label htmlFor="driver-password" className="block text-sm font-medium text-muted">
          Password
        </label>
        <input
          id="driver-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-foreground outline-none focus:border-gold"
        />
      </div>
      {state.error ? <p className="text-sm text-brand-red">{state.error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-gold py-3 font-semibold text-black transition-colors hover:bg-gold-bright disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

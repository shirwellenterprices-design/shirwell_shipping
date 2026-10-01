"use client";

import { loginAction, signUpAction, type AuthState } from "@/app/login/actions";
import Link from "next/link";
import { useActionState, useState } from "react";

const initialState: AuthState = {};

type Mode = "login" | "signup";

export default function LoginForm({
  next = "/account",
  initialMode = "login",
}: {
  next?: string;
  initialMode?: Mode;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [loginState, loginFormAction, loginPending] = useActionState(
    loginAction,
    initialState,
  );
  const [signupState, signupFormAction, signupPending] = useActionState(
    signUpAction,
    initialState,
  );

  const state = mode === "login" ? loginState : signupState;
  const pending = mode === "login" ? loginPending : signupPending;
  const formAction = mode === "login" ? loginFormAction : signupFormAction;

  return (
    <div className="mt-6 sm:mt-8">
      <div className="mb-5 grid grid-cols-2 rounded-xl border border-border bg-surface p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`rounded-lg py-2.5 text-sm font-semibold transition-colors ${
            mode === "login"
              ? "bg-gold text-black"
              : "text-muted hover:text-foreground"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`rounded-lg py-2.5 text-sm font-semibold transition-colors ${
            mode === "signup"
              ? "bg-gold text-black"
              : "text-muted hover:text-foreground"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form
        action={formAction}
        className="space-y-5 rounded-2xl border border-border bg-surface-elevated p-5 sm:p-8"
      >
        <input type="hidden" name="next" value={next} />

        {state.error && (
          <p className="rounded-lg border border-brand-red/30 bg-brand-red/10 px-4 py-3 text-sm text-brand-red">
            {state.error}
          </p>
        )}

        {state.success && (
          <p className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
            {state.success}
          </p>
        )}

        {mode === "signup" && (
          <>
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-muted">
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                autoComplete="name"
                className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-muted">
                Phone <span className="text-muted/60">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-muted">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
        </div>

        {mode === "signup" && (
          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium text-muted">
              Confirm Password
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-gold py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-gold-bright disabled:opacity-60"
        >
          {pending
            ? mode === "login"
              ? "Signing in…"
              : "Creating account…"
            : mode === "login"
              ? "Sign In"
              : "Create Account"}
        </button>

        <p className="text-center text-sm text-muted">
          {mode === "login" ? (
            <>
              No account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="font-semibold text-gold hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-semibold text-gold hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>

        <p className="text-center text-sm text-muted">
          <Link href="/home" className="font-semibold text-gold hover:underline">
            ← Back to homepage
          </Link>
        </p>
      </form>
    </div>
  );
}

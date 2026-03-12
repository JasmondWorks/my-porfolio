"use client";

import { login } from "@/lib/actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Lock, Shield } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Verifying…
        </>
      ) : (
        <>
          Access Dashboard <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

export default function AdminLogin() {
  const [error, setError] = useState("");

  async function clientLogin(formData: FormData) {
    const result = await login(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="orb top-1/3 left-1/4 h-[400px] w-[400px] bg-indigo-500/5 animate-glow-pulse" />
        <div
          className="orb bottom-1/3 right-1/4 h-[300px] w-[300px] bg-violet-500/5 animate-glow-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="pointer-events-none fixed inset-0 dot-grid opacity-[0.15] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-sm space-y-6">
        {/* Icon */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-sm">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-foreground-heading">
              Admin Portal
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your PIN to continue
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur-md">
          <form action={clientLogin} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="pin"
                className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                PIN
              </label>
              <input
                id="pin"
                type="password"
                name="pin"
                required
                maxLength={6}
                placeholder="••••••"
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-center text-xl tracking-[0.5em] text-foreground-heading placeholder-muted-foreground/40 font-mono backdrop-blur-sm transition-colors focus:border-primary/60 focus:outline-none focus:ring-0"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2">
                <Shield className="h-3.5 w-3.5 text-destructive shrink-0" />
                <p className="text-xs text-destructive">{error}</p>
              </div>
            )}

            <SubmitButton />
          </form>
        </div>

        <p className="text-center text-[10px] text-muted-foreground/50 uppercase tracking-widest">
          Restricted Access · Portfolio Admin
        </p>
      </div>
    </div>
  );
}

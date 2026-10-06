"use client";

import { useState } from "react";

export default function PickupScanForm({ expectedCode }: { expectedCode: string }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<"idle" | "ok" | "fail">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(value.trim().toUpperCase() === expectedCode.toUpperCase() ? "ok" : "fail");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm">
        <span className="text-muted">Scan or enter tracking / QR code</span>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setResult("idle");
          }}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 font-mono text-foreground outline-none focus:border-gold"
          placeholder={expectedCode}
          autoComplete="off"
        />
      </label>
      <button
        type="submit"
        className="rounded-xl bg-gold px-5 py-2.5 text-sm font-bold text-black hover:bg-gold-bright"
      >
        Confirm pickup
      </button>
      {result === "ok" ? (
        <p className="text-sm text-success">Package matched — status would move to Picked up.</p>
      ) : null}
      {result === "fail" ? (
        <p className="text-sm text-brand-red">Code does not match this delivery.</p>
      ) : null}
    </form>
  );
}

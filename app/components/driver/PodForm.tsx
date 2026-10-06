"use client";

import { useState } from "react";

const DEMO_OTP = "482910";

export default function PodForm() {
  const [otp, setOtp] = useState("");
  const [signed, setSigned] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [done, setDone] = useState(false);

  const otpOk = otp === DEMO_OTP;

  function complete() {
    if (otpOk && (signed || photo)) {
      setDone(true);
    }
  }

  if (done) {
    return (
      <p className="rounded-xl border border-success/40 bg-success/10 p-4 text-sm text-success">
        Delivered — order would move to completed and customer can leave a review.
      </p>
    );
  }

  return (
    <div className="space-y-5 text-sm">
      <div>
        <label className="text-muted">Customer OTP (demo: {DEMO_OTP})</label>
        <input
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 tracking-widest outline-none focus:border-gold"
        />
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={signed} onChange={(e) => setSigned(e.target.checked)} />
        Customer signature captured
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={photo} onChange={(e) => setPhoto(e.target.checked)} />
        Delivery photo captured
      </label>
      <button
        type="button"
        onClick={complete}
        disabled={!otpOk || (!signed && !photo)}
        className="rounded-xl bg-gold px-5 py-2.5 font-bold text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        Mark delivered
      </button>
    </div>
  );
}

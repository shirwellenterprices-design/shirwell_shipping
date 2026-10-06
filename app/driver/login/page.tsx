import DriverLoginForm from "@/app/components/DriverLoginForm";
import Link from "next/link";

export const metadata = { title: "Driver Login", robots: { index: false } };

export default function DriverLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
        <h1 className="font-serif text-2xl font-bold text-gold">Driver</h1>
        <p className="mt-2 text-sm text-muted">
          Pickup, GPS tracking, OTP, and proof of delivery. Requires{" "}
          <code className="text-gold">driver</code> role in Supabase.
        </p>
        <DriverLoginForm />
        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/admin" className="text-gold hover:underline">
            Admin login
          </Link>
          {" · "}
          <Link href="/home" className="text-gold hover:underline">
            Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}

import AdminLoginForm from "@/app/components/AdminLoginForm";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="bg-surface px-4 py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-md sm:px-2">
        <h1 className="font-serif text-2xl font-bold text-gold sm:text-3xl">Admin Login</h1>
        <p className="mt-2 text-muted">Authorized personnel only. Requires admin role in Supabase.</p>
        <AdminLoginForm />
      </div>
    </main>
  );
}

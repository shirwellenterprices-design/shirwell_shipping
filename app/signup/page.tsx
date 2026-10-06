import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ next?: string }>;
};

/** Alias for /login?mode=signup */
export default async function SignupPage({ searchParams }: Props) {
  const { next } = await searchParams;
  const q = new URLSearchParams({ mode: "signup" });
  if (next?.startsWith("/")) q.set("next", next);
  redirect(`/login?${q.toString()}`);
}

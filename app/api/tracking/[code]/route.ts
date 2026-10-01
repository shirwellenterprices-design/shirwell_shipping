import { resolveTrackingSnapshot } from "@/lib/supabase/tracking";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ code: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { code } = await context.params;

  if (!code?.trim()) {
    return NextResponse.json({ error: "Tracking code is required" }, { status: 400 });
  }

  const snapshot = await resolveTrackingSnapshot(decodeURIComponent(code));
  return NextResponse.json(snapshot);
}

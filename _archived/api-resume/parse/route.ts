// app/api/resume/parse/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  // TEMP: disabled in deploys to avoid bundling test assets
  return NextResponse.json(
    { ok: false, message: "Resume parsing temporarily disabled in deploys." },
    { status: 501 }
  );
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Resume parse API is disabled in deploys." });
}

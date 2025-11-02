import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

function isErrorResult(v: unknown): v is { error: { message?: string } } {
  return !!v && typeof v === "object" && "error" in v;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await auth.api.signUpEmail({ body });

    if (isErrorResult(result)) {
      return NextResponse.json({ error: result.error.message || "Signup failed" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown" }, { status: 500 });
  }
}
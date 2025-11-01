// app/api/auth/email/signup/route.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export class ApiError extends Error {
  statusCode: number
  details?: unknown
  constructor(message: string, statusCode = 400, details?: unknown) {
    super(message)
    this.statusCode = statusCode
    this.details = details
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.email || !body.password) throw new ApiError("Email and password are required", 400)
    const result = await auth.api.signUpEmail({ body })
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof ApiError)
      return NextResponse.json({ error: error.message, details: error.details }, { status: error.statusCode })
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

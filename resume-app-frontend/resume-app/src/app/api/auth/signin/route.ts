import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // TODO: Replace this with actual authentication logic
    // This is just a mock implementation
    if (email === "test@example.com" && password === "password") {
      const token = sign(
        { userId: "1", email },
        JWT_SECRET,
        { expiresIn: "1d" }
      )

      // Set the token in an HTTP-only cookie
      cookies().set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day
      })

      return NextResponse.json({ message: "Successfully signed in" })
    }

    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    )
  } catch (error) {
    console.error("Sign in error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 
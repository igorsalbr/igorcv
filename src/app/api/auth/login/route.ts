import { NextResponse } from "next/server"

// Mock API endpoint for login
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // In a real app, you would validate credentials against a database
    // For demo purposes, we'll accept any valid-looking email/password
    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Mock successful login response
    return NextResponse.json({
      userID: "user_" + Math.random().toString(36).substring(2, 9),
      generalToken: "token_" + Math.random().toString(36).substring(2, 15),
      admin: email.includes("admin"),
      restrictedToken: email.includes("admin") ? "admin_token_" + Math.random().toString(36).substring(2, 15) : null,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

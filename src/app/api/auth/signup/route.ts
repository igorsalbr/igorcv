import { NextResponse } from "next/server"

// Mock API endpoint for signup
export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Basic validation
    if (!name || !email || !password || password.length < 6) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 })
    }

    // In a real app, you would create a user in the database
    // For demo purposes, we'll just return success
    return NextResponse.json({
      success: true,
      message: "User created successfully",
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

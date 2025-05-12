import { NextResponse } from "next/server"

// In-memory storage for tower height (in a real app, use a database)
let towerHeight = 30

// Mock API endpoint for decrementing tower height
export async function POST(request: Request) {
  try {
    // Check authorization
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Decrement tower height
    towerHeight = Math.max(towerHeight - 5, 0)

    return NextResponse.json({ height: towerHeight })
  } catch (error) {
    console.error("Tower decrement error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

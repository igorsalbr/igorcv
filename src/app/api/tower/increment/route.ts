import { NextResponse } from "next/server"

// In-memory storage for tower height (in a real app, use a database)
let towerHeight = 30

// Mock API endpoint for incrementing tower height
export async function POST(request: Request) {
  try {
    // Check authorization
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Increment tower height
    towerHeight = Math.min(towerHeight + 5, 100)

    return NextResponse.json({ height: towerHeight })
  } catch (error) {
    console.error("Tower increment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

// In-memory storage for tower height (in a real app, use a database)
const towerHeight = 30

// Mock API endpoint for getting tower height
export async function GET() {
  try {
    return NextResponse.json({ height: towerHeight })
  } catch (error) {
    console.error("Tower error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

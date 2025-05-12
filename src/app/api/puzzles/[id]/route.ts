import { NextResponse } from "next/server"

// In-memory storage for puzzles (in a real app, use a database)
const defaultPuzzles = [
  {
    id: 1,
    title: "API Call Challenge",
    completed: false,
    description: "Discover my backend base url",
    question: "What's the correct endpoint? Without https:// and without the last /",
    correctAnswer: "igor-cv-5a0c3530bcf2.herokuapp.com",
  },
  {
    id: 2,
    title: "Hidden Element Hunt",
    completed: false,
    description: "Find and interact with a hidden element on the page",
    question: "What's the ID of the hidden element?",
    correctAnswer: "salsal",
  },
  {
    id: 3,
    title: "Console Hacker",
    completed: false,
    description: "Use the browser console to interact with the function",
    question: "What's the return value of the secretFunction()?",
    correctAnswer: "h4ck3r",
  },
  {
    id: 4,
    title: "Cryptography Challenge",
    completed: false,
    description: "Decrypt a message using a given cipher",
    question: "Decrypt: Khoor Zruog! What's the original message?",
    correctAnswer: "Hello World!",
  },
  {
    id: 5,
    title: "JWT Decoder",
    completed: false,
    description: "Decode a JSON Web Token to find the message",
    question:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJzZWNyZXQiOiJvaWUifQ.55ja5RWqJJo4ZrsMDOxQXjWQhQsvgIx1AjTqFMbnJus",
    correctAnswer: "oie",
  },
]

// User progress storage (in a real app, use a database)
const userProgress = new Map()

// Mock API endpoint for updating puzzle progress
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const puzzleId = Number.parseInt(params.id)

    // Check authorization
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real app, decode and validate the token
    const userId = "user_" + authHeader.substring(7, 15)

    // Get user's puzzle progress or create new
    if (!userProgress.has(userId)) {
      userProgress.set(userId, JSON.parse(JSON.stringify(defaultPuzzles)))
    }

    const { completed } = await request.json()

    // Update puzzle progress
    const puzzles = userProgress.get(userId)
    const puzzleIndex = puzzles.findIndex((p: any) => p.id === puzzleId)

    if (puzzleIndex === -1) {
      return NextResponse.json({ error: "Puzzle not found" }, { status: 404 })
    }

    puzzles[puzzleIndex].completed = completed

    return NextResponse.json({
      success: true,
      puzzle: puzzles[puzzleIndex],
    })
  } catch (error) {
    console.error("Puzzle update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

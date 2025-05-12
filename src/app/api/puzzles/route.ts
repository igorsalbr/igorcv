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

// Mock API endpoint for getting puzzles
export async function GET(request: Request) {
  try {
    // Get user ID from token (in a real app, validate the token)
    const authHeader = request.headers.get("Authorization")
    let userId = "anonymous"

    if (authHeader && authHeader.startsWith("Bearer ")) {
      // In a real app, decode and validate the token
      userId = "user_" + authHeader.substring(7, 15)
    }

    // Get user's puzzle progress or create new
    if (!userProgress.has(userId)) {
      userProgress.set(userId, JSON.parse(JSON.stringify(defaultPuzzles)))
    }

    return NextResponse.json(userProgress.get(userId))
  } catch (error) {
    console.error("Puzzles error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

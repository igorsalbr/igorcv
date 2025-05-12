// Secure API calls for puzzles

export async function getPuzzles() {
  try {
    const token = localStorage.getItem("generalToken")

    // Use the environment variable if we're calling an external API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/puzzles` : "/api/puzzles"

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch puzzles")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching puzzles:", error)
    throw error
  }
}

export async function updatePuzzleProgress(puzzleId: number, completed: boolean) {
  const token = localStorage.getItem("generalToken")
  if (!token) {
    throw new Error("User not authenticated")
  }

  try {
    // Use the environment variable if we're calling an external API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/puzzles/${puzzleId}`
      : `/api/puzzles/${puzzleId}`

    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed }),
    })

    if (!response.ok) {
      throw new Error("Failed to update puzzle progress")
    }

    return await response.json()
  } catch (error) {
    console.error("Error updating puzzle progress:", error)
    throw error
  }
}

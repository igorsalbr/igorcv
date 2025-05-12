// Secure API calls for tower

export async function getTowerHeight() {
  try {
    const token = localStorage.getItem("generalToken")

    // Use the environment variable if we're calling an external API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/tower` : "/api/tower"

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch tower height")
    }

    const data = await response.json()
    return data.height
  } catch (error) {
    console.error("Error fetching tower height:", error)
    throw error
  }
}

export async function incrementTower() {
  const token = localStorage.getItem("generalToken")
  if (!token) {
    throw new Error("User not authenticated")
  }

  try {
    // Use the environment variable if we're calling an external API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/tower/increment`
      : "/api/tower/increment"

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to increment tower")
    }

    return await response.json()
  } catch (error) {
    console.error("Error incrementing tower:", error)
    throw error
  }
}

export async function decrementTower() {
  const token = localStorage.getItem("generalToken")
  if (!token) {
    throw new Error("User not authenticated")
  }

  try {
    // Use the environment variable if we're calling an external API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/tower/decrement`
      : "/api/tower/decrement"

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to decrement tower")
    }

    return await response.json()
  } catch (error) {
    console.error("Error decrementing tower:", error)
    throw error
  }
}

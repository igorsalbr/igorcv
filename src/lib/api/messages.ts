// Secure API calls for messages

export async function sendMessage(message: string) {
  const userID = localStorage.getItem("userID")
  const token = localStorage.getItem("generalToken")

  if (!userID || !token) {
    throw new Error("User not authenticated")
  }

  try {
    // Use the environment variable if we're calling an external API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/messages` : "/api/messages"

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userID,
        message,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error sending message:", error)
    throw error
  }
}

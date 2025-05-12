// Secure API calls for authentication

export async function login(email: string, password: string) {
  try {
    // Use the environment variable if we're calling an external API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`
      : "/api/auth/login"

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()

    // Save tokens in localStorage
    localStorage.setItem("userID", data.userID)
    localStorage.setItem("generalToken", data.generalToken)
    if (data.admin && data.restrictedToken) {
      localStorage.setItem("restrictedToken", data.restrictedToken)
    }

    return data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export async function signup(name: string, email: string, password: string) {
  try {
    // Use the environment variable if we're calling an external API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`
      : "/api/auth/signup"

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })

    if (!response.ok) {
      throw new Error("Signup failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Signup error:", error)
    throw error
  }
}

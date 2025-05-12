"use client"

import { useState, useEffect } from "react"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUserId = localStorage.getItem("userID")
    if (storedUserId) {
      setUserId(storedUserId)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem("userID")
    localStorage.removeItem("generalToken")
    localStorage.removeItem("restrictedToken")
    setIsAuthenticated(false)
    setUserId("")
    window.location.href = "/"
  }

  return {
    isAuthenticated,
    userId,
    isLoading,
    logout,
  }
}

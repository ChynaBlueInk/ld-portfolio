"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { decodeJWT } from "@/lib/decodeJWT"

interface User {
  userID?: string
  fullName?: string
  email: string
  role?: string
  confirmed?: boolean
}

interface AuthContextType {
  user: User | null
  setUser: (u: User | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Load from localStorage on app start
    const token = localStorage.getItem("idToken")
    const storedName = localStorage.getItem("userFullName")
    const storedEmail = localStorage.getItem("userEmail")
    const storedRole = localStorage.getItem("userRole")

    if (token && storedEmail) {
      try {
        const decoded = decodeJWT(token)
        setUser({
          userID: decoded?.sub,
          fullName: storedName || decoded?.name || decoded?.email,
          email: storedEmail,
          role: storedRole || decoded?.["custom:role"] || "Employee",
          confirmed: true,
        })
      } catch (error) {
        console.error("Error decoding JWT:", error)
        setUser(null)
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("idToken")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userFullName")

    setUser(null)
    window.location.href = "/" // force redirect home
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

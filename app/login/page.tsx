"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { decodeJWT } from "../../lib/decodeJWT"
import { useAuth } from "@/app/contexts/AuthContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        // 🔑 Handle redirect for unconfirmed users
        if (data.redirect) {
          router.push(data.redirect)
          return
        }
        setError(data.error || "Login failed")
        return
      }

      // Save tokens
      localStorage.setItem("idToken", data.idToken)
      localStorage.setItem("accessToken", data.accessToken)

      // Decode the token
      const decoded = decodeJWT(data.idToken)
      if (decoded) {
        const userID = decoded.sub
        const userEmail = decoded.email

        // Fetch details from DynamoDB
        const userRes = await fetch(`/api/users?userID=${userID}`)
        const userData = await userRes.json()

        const role = userData?.role || "Employee"
        const fullName = userData?.fullName || userEmail

        // Save user info locally
        localStorage.setItem("userEmail", userEmail)
        localStorage.setItem("userRole", role)
        localStorage.setItem("userFullName", fullName)

        // ✅ Update AuthContext so NavBar shows instantly
        setUser({ fullName, email: userEmail, role, confirmed: true })

        // Redirect to dashboard
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full border p-2"
      />

      <div>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full border p-2"
        />
        <label className="flex items-center mt-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          Show password
        </label>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </form>
  )
}

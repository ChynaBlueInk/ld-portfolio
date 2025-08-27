"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  SignUpCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider"
import { useAuth } from "@/contexts/AuthContext"

type Env = {
  NEXT_PUBLIC_COGNITO_REGION?: string
  NEXT_PUBLIC_COGNITO_CLIENT_ID?: string
}

// Ensure these exist at build/run time (helpful during dev)
const REGION = (process.env.NEXT_PUBLIC_COGNITO_REGION as Env["NEXT_PUBLIC_COGNITO_REGION"]) || ""
const CLIENT_ID = (process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID as Env["NEXT_PUBLIC_COGNITO_CLIENT_ID"]) || ""

export default function SignupForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"Employee" | "Employer">("Employee")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { setUser } = useAuth()

  const client = new CognitoIdentityProviderClient({
    region: REGION,
  })

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!REGION || !CLIENT_ID) {
      setLoading(false)
      setError("Cognito is not configured. Please set NEXT_PUBLIC_COGNITO_REGION and NEXT_PUBLIC_COGNITO_CLIENT_ID.")
      return
    }

    try {
      // 1) Sign up with Cognito (no custom attributes required)
      const cmd = new SignUpCommand({
        ClientId: CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
          { Name: "name", Value: fullName },
          { Name: "email", Value: email },
        ],
      })

      const res: SignUpCommandOutput = await client.send(cmd)
      // NOTE: res.UserSub exists only after successful sign-up
      const userSub = res.UserSub || ""

      // 2) Save user profile to your backend (DynamoDB)
      const saveResponse = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: userSub,
          email,
          fullName,
          role,             // "Employee" | "Employer"
          region: "New Zealand", // placeholder until you add a field in the form
        }),
      })

      if (!saveResponse.ok) {
        // still allow navigation to confirm; but surface the problem
        const txt = await saveResponse.text()
        throw new Error(`Failed to save user in DynamoDB: ${txt || saveResponse.status}`)
      }

      const { user } = await saveResponse.json()

      // Persist for NavBar/AuthContext
      localStorage.setItem("userFullName", user?.fullName || fullName)
      localStorage.setItem("userEmail", user?.email || email)
      localStorage.setItem("userRole", user?.role || role)

      setUser(user || { fullName, email, role })

      // 3) Redirect to confirm email flow
      router.push(`/confirm?email=${encodeURIComponent(email)}`)
    } catch (err: any) {
      console.error("Signup error:", err)
      const message =
        err?.message ||
        "Signup failed. Please check your details (password policy, email format) and try again."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Create Your Professional Profile</h2>
      <p className="text-center text-gray-600 mb-6">
        Showcase your skills, experience, and services to connect with businesses looking for L&amp;D talent.
      </p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="w-full p-2 mb-4 border rounded"
        autoComplete="name"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 mb-4 border rounded"
        autoComplete="email"
      />

      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
          autoComplete="new-password"
        />
        <label className="flex items-center mt-2 text-sm">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          Show password
        </label>
        <p className="text-xs text-gray-500 mt-2">
          Your password must meet your Cognito User Pool policy (e.g., min length and character rules).
        </p>
      </div>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "Employee" | "Employer")}
        className="w-full p-2 mb-6 border rounded"
      >
        <option value="Employee">Employee</option>
        <option value="Employer">Employer</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  )
}

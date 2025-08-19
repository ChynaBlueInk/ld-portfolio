"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider"
import { useAuth } from "@/app/contexts/AuthContext"
import ProfileForm from "@/components/profile-form"

const REGION = process.env.NEXT_PUBLIC_COGNITO_REGION || ""
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || ""

// Helper: try several common keys for the same concept
function firstFilled(fd: FormData, keys: string[], fallback = ""): string {
  for (const k of keys) {
    const v = fd.get(k)
    if (typeof v === "string" && v.trim()) return v.trim()
  }
  return fallback
}

export default function SignupClient() {
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useAuth()

  const client = new CognitoIdentityProviderClient({ region: REGION })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!REGION || !CLIENT_ID) {
      setLoading(false)
      setError("Cognito not configured. Set NEXT_PUBLIC_COGNITO_REGION and NEXT_PUBLIC_COGNITO_CLIENT_ID.")
      return
    }

    try {
      const fd = new FormData(e.currentTarget)

      // Pull core values from whatever names your form uses
      const fullName =
        firstFilled(fd, ["fullName", "name"]) ||
        `${firstFilled(fd, ["firstName"])} ${firstFilled(fd, ["lastName"])}`.trim()

      const email = firstFilled(fd, ["email", "userEmail"])
      const password = firstFilled(fd, ["password", "pass", "userPassword"])
      const role = firstFilled(fd, ["role", "userRole"], "Employee")
      const region = firstFilled(fd, ["region", "location", "country"], "New Zealand")

      if (!fullName || !email || !password) {
        throw new Error("Full name, email, and password are required.")
      }

      // Sign up with Cognito
      const res = await client.send(
        new SignUpCommand({
          ClientId: CLIENT_ID,
          Username: email,
          Password: password,
          UserAttributes: [
            { Name: "name", Value: fullName },
            { Name: "email", Value: email },
          ],
        })
      )

      const userID = res.UserSub || ""

      // Include ALL remaining string fields from the form in the payload
      const knownKeys = new Set([
        "fullName", "name", "firstName", "lastName",
        "email", "userEmail",
        "password", "pass", "userPassword",
        "role", "userRole",
        "region", "location", "country",
      ])

      const extras: Record<string, string> = {}
      for (const [k, v] of fd.entries()) {
        if (knownKeys.has(k)) continue
        if (typeof v === "string") extras[k] = v
      }

      const saveRes = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID,
          email,
          fullName,
          role,
          region,
          ...extras, // <- all your extra ProfileForm fields go to DynamoDB too
        }),
      })

      if (!saveRes.ok) {
        const msg = await saveRes.text()
        throw new Error(`Failed to save user in DynamoDB: ${msg || saveRes.status}`)
      }

      const { user } = await saveRes.json()

      localStorage.setItem("userFullName", user?.fullName || fullName)
      localStorage.setItem("userEmail", user?.email || email)
      localStorage.setItem("userRole", user?.role || role)
      setUser(user || { fullName, email, role, region })

      router.push(`/confirm?email=${encodeURIComponent(email)}`)
    } catch (err: any) {
      setError(err?.message || "Signup failed. Please check your details and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {error && (
        <div className="max-w-2xl mx-auto mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* IMPORTANT:
         - If your ProfileForm ALREADY wraps its own <form>, see the note below (Option B).
         - If ProfileForm is just fields (no <form>), this wrapper will submit ALL fields.
      */}
      <form ref={formRef} onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <ProfileForm />
        {/* If your ProfileForm already has a submit button, remove this one */}
        <div className="mt-6 text-right">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Create Account"}
          </button>
        </div>
      </form>
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider"

export default function ConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [resendMessage, setResendMessage] = useState("")

  const client = new CognitoIdentityProviderClient({
    region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  })

  // ✅ Auto‑fill email
  useEffect(() => {
    const prefillEmail = searchParams.get("email")
    if (prefillEmail) setEmail(prefillEmail)
  }, [searchParams])

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const command = new ConfirmSignUpCommand({
        ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
        Username: email,
        ConfirmationCode: code,
      })

      await client.send(command)
      setSuccess("Your account has been confirmed! Redirecting to login...")
      setTimeout(() => router.push("/login"), 2000)
    } catch (err: any) {
      console.error("Confirmation error:", err)
      setError(err.message || "Failed to confirm signup")
    }
  }

  const handleResend = async () => {
    setResendMessage("")
    setError("")

    try {
      const res = await fetch("/api/resend-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to resend code")
        return
      }

      setResendMessage(data.message)
    } catch (err: any) {
      setError("Something went wrong while resending the code.")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-4">
        Confirm Your Account
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Please enter the confirmation code sent to your email.
      </p>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {resendMessage && <p className="text-blue-600 mb-4">{resendMessage}</p>}

      <form onSubmit={handleConfirm}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="text"
          placeholder="Confirmation Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Confirm Account
        </button>
      </form>

      <button
        onClick={handleResend}
        className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Resend Code
      </button>
    </div>
  )
}

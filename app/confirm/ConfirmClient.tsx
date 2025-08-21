"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider"

const REGION = process.env.NEXT_PUBLIC_COGNITO_REGION || ""
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || ""

export default function ConfirmClient() {
  const params = useSearchParams()
  const router = useRouter()
  const emailFromUrl = params.get("email") || ""
  const [email, setEmail] = useState(emailFromUrl)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const client = new CognitoIdentityProviderClient({ region: REGION })

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      if (!REGION || !CLIENT_ID) throw new Error("Cognito not configured.")
      const cmd = new ConfirmSignUpCommand({
        ClientId: CLIENT_ID,
        Username: email,
        ConfirmationCode: code,
      })
      await client.send(cmd)
      router.push("/login?confirmed=1")
    } catch (err: any) {
      setError(err?.message || "Confirmation failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleConfirm} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
        className="w-full p-2 border rounded"
        autoComplete="email"
      />
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        placeholder="6-digit code"
        className="w-full p-2 border rounded"
        inputMode="numeric"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Confirming..." : "Confirm"}
      </button>
    </form>
  )
}

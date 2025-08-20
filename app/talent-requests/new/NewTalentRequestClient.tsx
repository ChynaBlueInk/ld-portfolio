"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/contexts/AuthContext"
import NewTalentRequestForm from "@/components/new-talent-request-form"

export default function NewTalentRequestClient() {
  const router = useRouter()
  const { user } = useAuth()

  // Redirect logic stays client-side
  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role !== "Employer") {
      alert("Only Employers can post a talent request.")
      router.push("/talent-requests")
    }
  }, [user, router])

  if (!user || user.role !== "Employer") {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center">
        <p className="text-gray-600">Redirecting...</p>
      </div>
    )
  }

  return <NewTalentRequestForm />
}

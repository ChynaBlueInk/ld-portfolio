"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import NewTalentRequestForm from "@/components/new-talent-request-form"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/app/contexts/AuthContext"

export const metadata = {
  title: "Post a Talent Request | L&D Talent Hub",
  description:
    "Post a talent request to find Learning & Development professionals for your business needs. Describe your project or position and connect with qualified L&D talent.",
}

export default function PostTalentRequestPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      // Not logged in → login first
      router.push("/login")
    } else if (user.role !== "Employer") {
      // Logged in but not Employer → redirect back
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

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/talent-requests"
            className="flex items-center text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Talent Requests
          </Link>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Post a Talent Request
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Describe your L&D project or position and connect with qualified professionals who have the skills you
              need.
            </p>
          </div>

          <div className="mt-10">
            <NewTalentRequestForm />
          </div>
        </div>
      </div>
    </div>
  )
}

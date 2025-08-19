"use client"

import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import TalentRequestContactForm from "@/components/talent-request-contact-form"
import { ArrowLeft, Building, MapPin, Briefcase, Clock, Mail } from "lucide-react"
import { useAuth } from "@/app/contexts/AuthContext"
import { talentRequests } from "../data"

export default function TalentRequestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const [profileComplete, setProfileComplete] = useState(true)

  const request = talentRequests.find((r) => r.id === params.id)
  if (!request) notFound()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (!user.fullName || !user.role) {
      setProfileComplete(false)
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center">
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/talent-requests" className="flex items-center text-indigo-600 hover:text-indigo-500">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Talent Requests
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900">{request.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <div className="flex items-center"><Building className="mr-1 h-4 w-4" /> {request.company}</div>
              <div className="flex items-center"><MapPin className="mr-1 h-4 w-4" /> {request.location}</div>
              <div className="flex items-center"><Briefcase className="mr-1 h-4 w-4" /> {request.budget}</div>
              <div className="flex items-center"><Clock className="mr-1 h-4 w-4" /> Posted {request.posted}</div>
            </div>

            <div className="mt-4">
              <Badge variant="secondary" className="text-sm">{request.type}</Badge>
            </div>

            <div className="mt-6 border rounded p-6">
              <h2 className="text-xl font-semibold">Request Description</h2>
              <div className="prose prose-indigo mt-4" dangerouslySetInnerHTML={{ __html: request.detailedDescription }} />

              <h3 className="mt-6 text-lg font-medium">Skills Required</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {request.skills.map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded border p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Express Interest</h2>
              {!profileComplete ? (
                <p className="mt-4 text-yellow-700">
                  Please <Link href="/profile/create" className="underline">complete your profile</Link> before applying.
                </p>
              ) : request.applicationMethod === "Platform" ? (
                <TalentRequestContactForm requestId={request.id} requestTitle={request.title} />
              ) : (
                <div className="mt-4">
                  <p className="text-gray-600">Contact directly:</p>
                  <a href={`mailto:${request.contactInfo}`} className="flex items-center text-indigo-600 hover:underline mt-2">
                    <Mail className="mr-2 h-5 w-5" /> {request.contactInfo}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

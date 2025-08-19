"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { talentRequests } from "./data"


export default function TalentRequestsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Talent Requests
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {talentRequests.map((req) => (
            <div key={req.id} className="rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">{req.title}</h2>
              <p className="text-gray-600">{req.company}</p>
              <p className="text-sm text-gray-500">{req.location}</p>
              <Badge variant="secondary" className="mt-2">{req.type}</Badge>
              <p className="mt-2 text-gray-700 font-medium">{req.budget}</p>
              
              <div className="mt-4">
                <Link
                  href={`/talent-requests/${req.id}`}
                  className="text-indigo-600 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

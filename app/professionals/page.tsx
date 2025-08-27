"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfessionalsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [profiles, setProfiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchProfiles = async () => {
      try {
        const res = await fetch("/api/professionals")
        if (res.ok) {
          setProfiles(await res.json())
        }
      } catch (err) {
        console.error("Failed to load professionals:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [user, router])

  if (!user) {
    return <p className="text-center mt-20">Redirecting to login...</p>
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Browse L&D Professionals
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect Learning & Development professional for your business needs. 
            Filter by skills, services, and expertise.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Left column could hold filters later */}
          <div className="lg:col-span-1">
            <div className="p-4 border rounded bg-gray-50">
              <p className="font-semibold">Filters</p>
              <p className="text-sm text-gray-600 mt-2">
                Filter by skills, services, or region (coming soon).
              </p>
            </div>
          </div>

          {/* Professionals list */}
          <div className="lg:col-span-3">
            {loading ? (
              <ProfessionalsListSkeleton />
            ) : profiles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {profiles.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col rounded-lg border border-gray-200 bg-white shadow p-6"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="h-24 w-24 rounded-full bg-gray-200 mb-4" />
                      <h2 className="text-lg font-semibold">{p.fullName}</h2>
                      <p className="text-sm text-gray-500">{p.title || "No title"}</p>
                      <p className="text-sm text-gray-500">{p.region || "Region not specified"}</p>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{p.bio}</p>
                      <button
                        onClick={() => router.push(`/professionals/${p.id}`)}
                        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No professionals found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfessionalsListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="col-span-1 flex flex-col rounded-lg border border-gray-200 bg-white shadow p-6"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"

interface FavouriteJob {
  jobId: string
  title: string
  company: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [favourites, setFavourites] = useState<FavouriteJob[]>([])
  const [loading, setLoading] = useState(true)
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchData = async () => {
      try {
        // ✅ Fetch favourites
        const favRes = await fetch(`/api/favourites?userID=${encodeURIComponent(user.userID || user.email)}`)
        if (favRes.ok) {
          const data = await favRes.json()
          if (Array.isArray(data)) {
            setFavourites(data)
          }
        }

        // ✅ Check if user has a profile
        const profileRes = await fetch(`/api/users?userID=${encodeURIComponent(user.userID || user.email)}`)
        if (profileRes.ok) {
          const profile = await profileRes.json()
          if (profile.fullName && profile.region) {
            setHasProfile(true)
          }
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, router])

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center">
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome, {user.fullName || user.email}!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        You're logged in as <strong>{user.email}</strong>
      </p>

      <div className="mb-10">
        {!hasProfile ? (
          <>
            <p className="text-gray-700 mb-4">
              Your profile isn’t set up yet. Complete it to appear in searches.
            </p>
            <Link
              href="/profile/create"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Set Up Your Profile
            </Link>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-4">
              You can update your details anytime.
            </p>
            <Link
              href="/profile/create"
              className="inline-block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              Edit Your Profile
            </Link>
          </>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Favourited Jobs</h2>
      {loading ? (
        <p className="text-gray-500">Loading your dashboard...</p>
      ) : favourites.length > 0 ? (
        <ul className="space-y-4">
          {favourites.map((job) => (
            <li
              key={job.jobId}
              className="p-4 border rounded shadow text-left bg-white"
            >
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You haven’t saved any favourites yet.</p>
      )}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function CreateProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [image, setImage] = useState("")
  const [region, setRegion] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [website, setWebsite] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/signup")
      return
    }

    const loadProfile = async () => {
      try {
        const res = await fetch(
          `/api/users?userID=${encodeURIComponent(user.userID || user.email)}`
        )
        if (res.ok) {
          const data = await res.json()
          setTitle(data.title || "")
          setLocation(data.location || "")
          setBio(data.bio || "")
          setImage(data.image || "")
          setRegion(data.region || "")
          setLinkedin(data.linkedin || "")
          setWebsite(data.website || "")
        }
      } catch (err) {
        console.error("Failed to load profile:", err)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user, router])

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">
        <p className="text-gray-600">Redirecting to sign up...</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: user.userID || user.email,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          title,
          location,
          bio,
          image,
          region,
          linkedin,
          website,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to save profile")
      }

      setMessage("Profile saved successfully! Redirecting to Dashboard...")
      setTimeout(() => router.push("/dashboard"), 2000)
    } catch (err: any) {
      console.error("Profile save error:", err)
      setMessage("Error saving profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">
        {loading ? "Loading..." : "Edit Your Professional Profile"}
      </h1>

      {message && (
        <p
          className={`mb-4 ${
            message.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      {!loading && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={user.fullName || ""}
              disabled
              className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title / Role
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Instructional Designer"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Wellington, NZ"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about your background..."
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image URL
            </label>
            <input
  type="url"
  value={image}
  onChange={(e) => setImage(e.target.value)}
  placeholder="https://example.com/profile.jpg"
  className="w-full p-2 border rounded"
/>

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Region
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="e.g. New Zealand"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn Profile
            </label>
          <input
  type="url"
  value={linkedin}
  onChange={(e) => setLinkedin(e.target.value)}
  placeholder="https://linkedin.com/in/yourname"
  className="w-full p-2 border rounded"
/>

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website (optional)
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      )}
    </div>
  )
}

// app/talent-requests/[id]/TalentRequestClient.tsx  (CLIENT)
"use client"
import { useEffect, useState } from "react"

export default function TalentRequestClient({ id }: { id: string }) {
  const [request, setRequest] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    let ignore = false
    ;(async () => {
      try {
        const res = await fetch(`/api/talent-requests/${id}`)
        if (!res.ok) throw new Error(`Failed to load request ${id}`)
        const data = await res.json()
        if (!ignore) { setRequest(data); setLoading(false) }
      } catch (e: any) {
        if (!ignore) { setError(e?.message || "Failed to load."); setLoading(false) }
      }
    })()
    return () => { ignore = true }
  }, [id])

  if (loading) return <p className="p-6 text-gray-600">Loading…</p>
  if (error)   return <p className="p-6 text-red-600">{error}</p>
  if (!request) return <p className="p-6 text-gray-600">Not found.</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{request.title || `Request ${id}`}</h1>
      {/* render the rest of your fields here */}
    </div>
  )
}

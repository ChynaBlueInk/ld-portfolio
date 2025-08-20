// app/talent-requests/new/page.tsx  (no "use client" here)
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import NewTalentRequestClient from "./NewTalentRequestClient"

export const metadata = {
  title: "Post a Talent Request | L&D Talent Hub",
  description:
    "Post a talent request to find Learning & Development professionals for your business needs. Describe your project or position and connect with qualified L&D talent.",
}

export default function Page() {
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
              Describe your L&amp;D project or position and connect with qualified professionals who have the skills you
              need.
            </p>
          </div>

          <div className="mt-10">
            {/* All client logic (auth + router + hooks) lives in here */}
            <NewTalentRequestClient />
          </div>
        </div>
      </div>
    </div>
  )
}

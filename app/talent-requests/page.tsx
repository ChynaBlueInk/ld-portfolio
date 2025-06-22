import Link from "next/link"
import { Button } from "@/components/ui/button"
import TalentRequestsList from "@/components/talent-requests-list"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Talent Requests | L&D Talent Hub",
  description:
    "View talent requests from businesses looking for Learning & Development professionals. Find opportunities that match your skills and expertise.",
}

export default function TalentRequestsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Talent Requests</h1>
              <p className="text-lg text-gray-600">
                Browse opportunities from businesses looking for Learning & Development expertise. Find requests that
                match your skills and services.
              </p>
            </div>

            <div className="mt-8">
              <TalentRequestsList />
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="rounded-lg bg-indigo-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Are you a business?</h2>
              <p className="mt-2 text-gray-600">
                Looking for Learning & Development talent? Post your request and let qualified professionals come to
                you.
              </p>
              <div className="mt-6">
                <Link href="/talent-requests/new">
                  <Button className="w-full">
                    Post a Talent Request
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">How It Works</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-indigo-100 p-1">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
                      1
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-gray-900">Browse Requests</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Find talent requests that match your skills and expertise.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-indigo-100 p-1">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
                      2
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-gray-900">Express Interest</h3>
                    <p className="mt-1 text-sm text-gray-600">Contact the business directly or through our platform.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-indigo-100 p-1">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
                      3
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-gray-900">Connect & Collaborate</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Discuss project details and start your professional relationship.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

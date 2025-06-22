import { Suspense } from "react"
import ProfessionalsList from "@/components/professionals-list"
import ProfessionalsFilter from "@/components/professionals-filter"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Browse L&D Professionals | L&D Talent Hub",
  description:
    "Find and connect with top Learning & Development professionals. Filter by skills, services, and expertise to find the perfect match for your business needs.",
}

export default function ProfessionalsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Browse L&D Professionals</h1>
          <p className="text-lg text-gray-600">
            Find the perfect Learning & Development professional for your business needs. Filter by skills, services,
            and expertise.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className="lg:col-span-1">
            <ProfessionalsFilter />
          </div>

          {/* Professionals list */}
          <div className="lg:col-span-3">
            <Suspense fallback={<ProfessionalsListSkeleton />}>
              <ProfessionalsList />
            </Suspense>
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
        <div key={i} className="col-span-1 flex flex-col rounded-lg border border-gray-200 bg-white shadow">
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-6 w-16 rounded-full" />
              ))}
            </div>
            <div className="mt-6">
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

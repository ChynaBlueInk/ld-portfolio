import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminPendingProfiles from "@/components/admin-pending-profiles"
import AdminApprovedProfiles from "@/components/admin-approved-profiles"
import AdminReportedProfiles from "@/components/admin-reported-profiles"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Admin Dashboard | L&D Talent Hub",
  description: "Manage and moderate professional profiles on the L&D Talent Hub platform.",
}

export default function AdminDashboardPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">
            Manage and moderate professional profiles on the L&D Talent Hub platform.
          </p>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
              <TabsTrigger value="approved">Approved Profiles</TabsTrigger>
              <TabsTrigger value="reported">Reported Profiles</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-6">
              <Suspense fallback={<ProfilesSkeleton />}>
                <AdminPendingProfiles />
              </Suspense>
            </TabsContent>
            <TabsContent value="approved" className="mt-6">
              <Suspense fallback={<ProfilesSkeleton />}>
                <AdminApprovedProfiles />
              </Suspense>
            </TabsContent>
            <TabsContent value="reported" className="mt-6">
              <Suspense fallback={<ProfilesSkeleton />}>
                <AdminReportedProfiles />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function ProfilesSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-full mt-2" />
              <Skeleton className="h-3 w-full" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

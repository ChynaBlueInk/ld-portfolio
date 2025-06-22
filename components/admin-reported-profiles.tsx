"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Eye, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for reported profiles
const reportedProfilesData = [
  {
    id: "1",
    name: "James Smith",
    title: "Learning Consultant",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Consulting", "Strategy", "Needs Analysis"],
    bio: "Strategic learning consultant with expertise in organizational development and performance improvement.",
    reportReason: "Inaccurate credentials",
    reportedBy: "user123",
    reportedDate: "2023-05-10",
  },
  {
    id: "2",
    name: "Olivia Brown",
    title: "Content Developer",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Content Writing", "Curriculum Design", "Editing"],
    bio: "Creating engaging and effective learning content for various industries and audiences.",
    reportReason: "Inappropriate content",
    reportedBy: "user456",
    reportedDate: "2023-05-08",
  },
]

export default function AdminReportedProfiles() {
  const [reportedProfiles, setReportedProfiles] = useState(reportedProfilesData)
  const [selectedProfile, setSelectedProfile] = useState<(typeof reportedProfilesData)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const dismissReport = (id: string) => {
    setReportedProfiles(reportedProfiles.filter((profile) => profile.id !== id))
    // In a real app, you would send an API request to dismiss the report
  }

  const removeProfile = (id: string) => {
    setReportedProfiles(reportedProfiles.filter((profile) => profile.id !== id))
    // In a real app, you would send an API request to remove the profile
  }

  const viewProfile = (profile: (typeof reportedProfilesData)[0]) => {
    setSelectedProfile(profile)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Reported Profiles ({reportedProfiles.length})</h2>
      </div>

      {reportedProfiles.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No reported profiles to review.</p>
        </div>
      ) : (
        reportedProfiles.map((profile) => (
          <div key={profile.id} className="rounded-lg border border-gray-200 p-6">
            <div className="flex items-start space-x-4">
              <Image
                src={profile.image || "/placeholder.svg"}
                alt={profile.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{profile.name}</h3>
                <p className="text-sm text-gray-500">{profile.title}</p>
                <p className="mt-2 text-sm text-gray-600">{profile.bio}</p>
                <div className="mt-2">
                  <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                    Reported: {profile.reportReason}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Reported by {profile.reportedBy} on {new Date(profile.reportedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => viewProfile(profile)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => dismissReport(profile.id)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Dismiss
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeProfile(profile.id)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedProfile && (
            <>
              <DialogHeader>
                <DialogTitle>Reported Profile: {selectedProfile.name}</DialogTitle>
                <DialogDescription>Review the reported profile and take appropriate action.</DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-6">
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Report Details</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>Reason: {selectedProfile.reportReason}</p>
                        <p>Reported by: {selectedProfile.reportedBy}</p>
                        <p>Date: {new Date(selectedProfile.reportedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Image
                    src={selectedProfile.image || "/placeholder.svg"}
                    alt={selectedProfile.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{selectedProfile.name}</h3>
                    <p className="text-sm text-gray-500">{selectedProfile.title}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Bio</h4>
                  <p className="mt-1 text-sm text-gray-600">{selectedProfile.bio}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Skills</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProfile.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-gray-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => {
                      dismissReport(selectedProfile.id)
                      setIsDialogOpen(false)
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Dismiss Report
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      removeProfile(selectedProfile.id)
                      setIsDialogOpen(false)
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Remove Profile
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

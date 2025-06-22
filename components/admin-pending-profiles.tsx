"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for pending profiles
const pendingProfiles = [
  {
    id: "1",
    name: "Alex Thompson",
    title: "Gamification Specialist",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Gamification", "Learning Design", "Game Development"],
    bio: "Specializing in creating engaging learning experiences through gamification principles and techniques.",
    submittedDate: "2023-05-15",
  },
  {
    id: "2",
    name: "Jordan Lee",
    title: "VR Training Developer",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Virtual Reality", "3D Modeling", "Instructional Design"],
    bio: "Creating immersive VR training experiences for high-risk industries and complex procedures.",
    submittedDate: "2023-05-14",
  },
  {
    id: "3",
    name: "Taylor Morgan",
    title: "Learning Analytics Specialist",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Data Analysis", "Learning Metrics", "Tableau"],
    bio: "Helping organizations measure and improve the effectiveness of their learning programs through data-driven insights.",
    submittedDate: "2023-05-13",
  },
]

export default function AdminPendingProfiles() {
  const [profiles, setProfiles] = useState(pendingProfiles)
  const [selectedProfile, setSelectedProfile] = useState<(typeof pendingProfiles)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const approveProfile = (id: string) => {
    setProfiles(profiles.filter((profile) => profile.id !== id))
    // In a real app, you would send an API request to approve the profile
  }

  const rejectProfile = (id: string) => {
    setProfiles(profiles.filter((profile) => profile.id !== id))
    // In a real app, you would send an API request to reject the profile
  }

  const viewProfile = (profile: (typeof pendingProfiles)[0]) => {
    setSelectedProfile(profile)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Pending Approval ({profiles.length})</h2>
      </div>

      {profiles.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No pending profiles to review.</p>
        </div>
      ) : (
        profiles.map((profile) => (
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
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-gray-50">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Submitted on {new Date(profile.submittedDate).toLocaleDateString()}
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
                  onClick={() => approveProfile(profile.id)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => rejectProfile(profile.id)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
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
                <DialogTitle>Profile Review: {selectedProfile.name}</DialogTitle>
                <DialogDescription>
                  Review the complete profile details before approving or rejecting.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-6">
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
                      approveProfile(selectedProfile.id)
                      setIsDialogOpen(false)
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      rejectProfile(selectedProfile.id)
                      setIsDialogOpen(false)
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
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

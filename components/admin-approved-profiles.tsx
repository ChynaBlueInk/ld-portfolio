"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for approved profiles
const approvedProfilesData = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "eLearning Specialist",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Instructional Design", "Articulate Storyline", "LMS Administration"],
    bio: "10+ years experience creating engaging eLearning solutions for Fortune 500 companies.",
    approvedDate: "2023-05-01",
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Workshop Facilitator & Trainer",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Leadership Training", "Team Building", "Public Speaking"],
    bio: "Certified facilitator specializing in leadership development and team dynamics.",
    approvedDate: "2023-04-28",
  },
  {
    id: "3",
    name: "Priya Patel",
    title: "Learning Experience Designer",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["UX Design", "Learning Analytics", "Content Strategy"],
    bio: "Combining UX principles with learning science to create effective learning experiences.",
    approvedDate: "2023-04-25",
  },
  {
    id: "4",
    name: "David Wilson",
    title: "Corporate Trainer",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Sales Training", "Customer Service", "Presentation Skills"],
    bio: "Helping organizations improve performance through effective training programs.",
    approvedDate: "2023-04-22",
  },
  {
    id: "5",
    name: "Emma Rodriguez",
    title: "Learning Technologist",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["EdTech Integration", "Virtual Reality", "Mobile Learning"],
    bio: "Leveraging cutting-edge technology to create innovative learning solutions.",
    approvedDate: "2023-04-20",
  },
]

export default function AdminApprovedProfiles() {
  const [approvedProfiles, setApprovedProfiles] = useState(approvedProfilesData)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProfiles = approvedProfiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const reportProfile = (id: string) => {
    // In a real app, you would send an API request to report the profile
    console.log(`Reporting profile ${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Approved Profiles ({approvedProfiles.length})</h2>
        <div className="w-64">
          <Input placeholder="Search profiles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {filteredProfiles.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No profiles match your search.</p>
        </div>
      ) : (
        filteredProfiles.map((profile) => (
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
                  Approved on {new Date(profile.approvedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`/professionals/${profile.id}`, "_blank")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                  onClick={() => reportProfile(profile.id)}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Flag
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

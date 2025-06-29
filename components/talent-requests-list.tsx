"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Briefcase, Clock, Building, MapPin, Search } from "lucide-react"

// Mock data for talent requests
const talentRequestsData = [
  {
    id: "1",
    title: "eLearning Designer for Corporate Training Program",
    company: "Tech Innovations Inc.",
    location: "Remote (NZ-based)",
    budget: "$5,000 - $10,000",
    type: "Project-based",
    timeframe: "3-6 months",
    posted: "2 days ago",
    description:
      "We're looking for an experienced eLearning designer to help create a comprehensive training program for our new software platform. The ideal candidate will have experience with Articulate Storyline, instructional design principles, and corporate technology training.",
    skills: ["Articulate Storyline", "Instructional Design", "Software Training", "Corporate Training"],
    applicationMethod: "Email",
    contactInfo: "careers@techinnovations.com",
  },
  {
    id: "2",
    title: "Workshop Facilitator for Leadership Development",
    company: "Global Enterprises",
    location: "Auckland, NZ (Hybrid)",
    budget: "$3,000 - $5,000",
    type: "Contract",
    timeframe: "1-2 months",
    posted: "5 days ago",
    description:
      "Seeking a dynamic workshop facilitator to deliver a series of leadership development sessions for our mid-level managers. The ideal candidate will have experience with leadership coaching, team building exercises, and interactive workshop facilitation.",
    skills: ["Leadership Development", "Workshop Facilitation", "Coaching", "Team Building"],
    applicationMethod: "Platform",
    contactInfo: "",
  },
  {
    id: "3",
    title: "LMS Administrator and Content Developer",
    company: "Healthcare Solutions",
    location: "Remote",
    budget: "$80,000 - $100,000",
    type: "Full-time",
    timeframe: "Immediate",
    posted: "1 week ago",
    description:
      "We are seeking an LMS Administrator who can also develop content for our healthcare training programs. The ideal candidate will have experience with healthcare compliance training, LMS management, and content creation for medical professionals.",
    skills: ["LMS Administration", "Healthcare Training", "Content Development", "Compliance Training"],
    applicationMethod: "Website",
    contactInfo: "www.healthcaresolutions.com/careers",
  },
  {
    id: "4",
    title: "Learning Experience Designer for Mobile Learning",
    company: "EdTech Startup",
    location: "Wellington, NZ (On-site)",
    budget: "$15,000 - $25,000",
    type: "Project-based",
    timeframe: "2-3 months",
    posted: "3 days ago",
    description:
      "Our EdTech startup is looking for a Learning Experience Designer to help create engaging mobile learning experiences for our platform. The ideal candidate will have a strong understanding of UX design principles, mobile learning best practices, and innovative learning approaches.",
    skills: ["UX Design", "Mobile Learning", "Instructional Design", "Educational Technology"],
    applicationMethod: "Platform",
    contactInfo: "",
  },
  {
    id: "5",
    title: "Virtual Reality Training Developer",
    company: "Manufacturing Solutions",
    location: "Remote",
    budget: "$20,000 - $30,000",
    type: "Project-based",
    timeframe: "4-6 months",
    posted: "1 day ago",
    description:
      "We're looking for a VR Training Developer to create immersive training experiences for manufacturing operations. The ideal candidate will have experience with Unity, VR development, and designing training for complex physical tasks.",
    skills: ["VR Development", "Unity", "3D Modeling", "Manufacturing Training"],
    applicationMethod: "Email",
    contactInfo: "hr@manufacturingsolutions.com",
  },
]

export default function TalentRequestsList() {
  const [talentRequests, setTalentRequests] = useState(talentRequestsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filter talent requests based on search term and type filter
  const filteredRequests = talentRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = typeFilter === "all" ? true : request.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Search and filter */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            placeholder="Search talent requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="project-based">Project-based</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        Showing {filteredRequests.length} of {talentRequests.length} talent requests
      </div>

      {/* Talent requests list */}
      {filteredRequests.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No talent requests match your search criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link href={`/talent-requests/${request.id}`} className="hover:text-indigo-600">
                        {request.title}
                      </Link>
                    </h3>
                    <Badge
                      variant={
                        request.type === "Full-time"
                          ? "default"
                          : request.type === "Project-based"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {request.type}
                    </Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Building className="mr-1 h-4 w-4" />
                      {request.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {request.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" />
                      {request.budget}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      Posted {request.posted}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600">{request.description}</p>

                <div className="flex flex-wrap gap-2">
                  {request.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Timeframe:</span>{" "}
                    <span className="text-gray-600">{request.timeframe}</span>
                  </div>
                  <Link href={`/talent-requests/${request.id}`}>
                    <Button>View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

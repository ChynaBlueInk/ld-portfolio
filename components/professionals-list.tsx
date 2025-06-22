"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data for professionals
const professionals = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "eLearning Specialist",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Instructional Design", "Articulate Storyline", "LMS Administration"],
    services: ["eLearning Development", "Course Design", "LMS Setup"],
    bio: "10+ years experience creating engaging eLearning solutions for Fortune 500 companies.",
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Workshop Facilitator & Trainer",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Leadership Training", "Team Building", "Public Speaking"],
    services: ["Workshop Design", "Leadership Development", "Team Building"],
    bio: "Certified facilitator specializing in leadership development and team dynamics.",
  },
  {
    id: "3",
    name: "Priya Patel",
    title: "Learning Experience Designer",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["UX Design", "Learning Analytics", "Content Strategy"],
    services: ["Learning Experience Design", "Content Strategy", "Program Evaluation"],
    bio: "Combining UX principles with learning science to create effective learning experiences.",
  },
  {
    id: "4",
    name: "David Wilson",
    title: "Corporate Trainer",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Sales Training", "Customer Service", "Presentation Skills"],
    services: ["Sales Training", "Customer Service Training", "Presentation Coaching"],
    bio: "Helping organizations improve performance through effective training programs.",
  },
  {
    id: "5",
    name: "Emma Rodriguez",
    title: "Learning Technologist",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["EdTech Integration", "Virtual Reality", "Mobile Learning"],
    services: ["EdTech Consulting", "VR Training Development", "Mobile Learning Design"],
    bio: "Leveraging cutting-edge technology to create innovative learning solutions.",
  },
  {
    id: "6",
    name: "James Kim",
    title: "Organizational Development Consultant",
    image: "/placeholder.svg?height=400&width=400",
    skills: ["Change Management", "Talent Development", "Performance Improvement"],
    services: ["Change Management", "Talent Development Strategy", "Performance Consulting"],
    bio: "Strategic consultant helping organizations develop their people and improve performance.",
  },
]

export default function ProfessionalsList() {
  const [displayedProfessionals] = useState(professionals)

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayedProfessionals.map((professional) => (
        <div
          key={professional.id}
          className="col-span-1 flex flex-col rounded-lg border border-gray-200 bg-white shadow transition-all hover:shadow-md"
        >
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center space-x-4">
              <Image
                src={professional.image || "/placeholder.svg"}
                alt={professional.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{professional.name}</h3>
                <p className="text-sm text-gray-500">{professional.title}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">{professional.bio}</p>
            <div className="mt-4">
              <h4 className="text-xs font-medium text-gray-500">TOP SKILLS</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {professional.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-gray-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Link href={`/professionals/${professional.id}`}>
                <Button className="w-full" variant="outline">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

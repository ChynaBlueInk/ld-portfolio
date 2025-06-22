import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Award, BookOpen, MessageSquare, FileText, Mail, Linkedin, ExternalLink } from "lucide-react"

// Mock data for professionals (ids 1-6) — keep these in sync with components/professionals-list.tsx
const professionals = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "eLearning Specialist",
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=1200&width=400",
    bio: "10 + years experience creating engaging eLearning solutions for Fortune 500 companies.",
    skills: ["Instructional Design", "Articulate Storyline", "LMS Administration"],
    services: [
      { title: "eLearning Development", description: "Custom eLearning courses designed to meet specific objectives." },
      { title: "Course Design", description: "Instructional design services based on adult-learning principles." },
      { title: "LMS Setup & Management", description: "Configuration and management of learning management systems." },
    ],
    experience: [
      {
        company: "Global Learning Solutions",
        role: "Senior eLearning Developer",
        period: "2018 – Present",
        description: "Lead developer for enterprise-wide learning initiatives.",
      },
    ],
    certifications: ["CPLP", "Articulate Storyline Master Developer"],
    portfolio: [],
    testimonials: [],
    contact: { email: "sarah@example.com", linkedin: "linkedin.com/in/sarahjohnson", website: "sarahjohnson.com" },
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Workshop Facilitator & Trainer",
    location: "Chicago, IL",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=1200&width=400",
    bio: "Certified facilitator specializing in leadership development and team dynamics.",
    skills: ["Leadership Training", "Team Building", "Public Speaking"],
    services: [{ title: "Workshop Design", description: "Interactive leadership and team-building workshops." }],
    experience: [],
    certifications: ["ATD Master Trainer"],
    portfolio: [],
    testimonials: [],
    contact: { email: "michael@example.com", linkedin: "linkedin.com/in/michaelchen", website: "" },
  },
  {
    id: "3",
    name: "Priya Patel",
    title: "Learning Experience Designer",
    location: "Austin, TX",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=1200&width=400",
    bio: "Combining UX principles with learning science to create effective learning experiences.",
    skills: ["UX Design", "Learning Analytics", "Content Strategy"],
    services: [{ title: "Learning Experience Design", description: "End-to-end LX design services." }],
    experience: [],
    certifications: [],
    portfolio: [],
    testimonials: [],
    contact: { email: "priya@example.com", linkedin: "linkedin.com/in/priyapatel", website: "" },
  },
  {
    id: "4",
    name: "David Wilson",
    title: "Corporate Trainer",
    location: "Remote",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=1200&width=400",
    bio: "Helping organizations improve performance through effective training programs.",
    skills: ["Sales Training", "Customer Service", "Presentation Skills"],
    services: [{ title: "Sales Training", description: "Boost sales performance with targeted training." }],
    experience: [],
    certifications: [],
    portfolio: [],
    testimonials: [],
    contact: { email: "david@example.com", linkedin: "", website: "" },
  },
  {
    id: "5",
    name: "Emma Rodriguez",
    title: "Learning Technologist",
    location: "Denver, CO",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=1200&width=400",
    bio: "Leveraging cutting-edge technology to create innovative learning solutions.",
    skills: ["EdTech Integration", "Virtual Reality", "Mobile Learning"],
    services: [{ title: "EdTech Consulting", description: "Integrate the latest tech into your L&D strategy." }],
    experience: [],
    certifications: [],
    portfolio: [],
    testimonials: [],
    contact: { email: "emma@example.com", linkedin: "", website: "" },
  },
  {
    id: "6",
    name: "James Kim",
    title: "Organizational Development Consultant",
    location: "New York, NY",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=1200&width=400",
    bio: "Strategic consultant helping organizations develop their people and improve performance.",
    skills: ["Change Management", "Talent Development", "Performance Improvement"],
    services: [{ title: "Change Management", description: "Drive successful organizational change." }],
    experience: [],
    certifications: [],
    portfolio: [],
    testimonials: [],
    contact: { email: "james@example.com", linkedin: "", website: "" },
  },
]

export default function ProfessionalProfile({ params }: { params: { id: string } }) {
  const professional = professionals.find((p) => p.id === params.id)

  if (!professional) {
    notFound()
  }

  return (
    <div className="bg-white">
      {/* Cover image */}
      <div className="relative h-48 w-full bg-gray-200 sm:h-64 lg:h-72">
        <Image src={professional.coverImage || "/placeholder.svg"} alt="" fill className="object-cover" priority />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile header */}
        <div className="relative -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="relative h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32">
            <Image
              src={professional.image || "/placeholder.svg"}
              alt={professional.name}
              fill
              className="rounded-full object-cover"
              priority
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">{professional.name}</h1>
              <p className="text-lg text-gray-500">{professional.title}</p>
              <p className="text-sm text-gray-500">{professional.location}</p>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile profile header */}
        <div className="mt-6 min-w-0 flex-1 md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{professional.name}</h1>
          <p className="text-lg text-gray-500">{professional.title}</p>
          <p className="text-sm text-gray-500">{professional.location}</p>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-5">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="testimonials" className="hidden md:block">
                Testimonials
              </TabsTrigger>
            </TabsList>

            {/* About tab */}
            <TabsContent value="about" className="mt-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-900">Bio</h2>
                  <p className="mt-4 text-gray-600">{professional.bio}</p>

                  <h2 className="mt-8 text-xl font-semibold text-gray-900">Skills</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {professional.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <h2 className="mt-8 text-xl font-semibold text-gray-900">Certifications</h2>
                  <ul className="mt-4 space-y-2">
                    {professional.certifications.map((cert) => (
                      <li key={cert} className="flex items-start">
                        <Award className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 md:col-span-1">
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                    <ul className="mt-4 space-y-4">
                      <li className="flex items-center">
                        <Mail className="mr-2 h-5 w-5 text-gray-400" />
                        <a
                          href={`mailto:${professional.contact.email}`}
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          {professional.contact.email}
                        </a>
                      </li>
                      <li className="flex items-center">
                        <Linkedin className="mr-2 h-5 w-5 text-gray-400" />
                        <a
                          href={`https://${professional.contact.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          LinkedIn Profile
                        </a>
                      </li>
                      <li className="flex items-center">
                        <ExternalLink className="mr-2 h-5 w-5 text-gray-400" />
                        <a
                          href={`https://${professional.contact.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          Personal Website
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Services tab */}
            <TabsContent value="services" className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Services Offered</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {professional.services.map((service) => (
                  <div key={service.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                    <p className="mt-2 text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Experience tab */}
            <TabsContent value="experience" className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
              <div className="mt-6 space-y-8">
                {professional.experience.map((exp) => (
                  <div key={exp.company} className="relative">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-indigo-100">
                        <Briefcase className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{exp.role}</h3>
                        <p className="text-sm text-gray-500">
                          {exp.company} • {exp.period}
                        </p>
                        <p className="mt-2 text-gray-600">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Portfolio tab */}
            <TabsContent value="portfolio" className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Portfolio</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {professional.portfolio.map((item) => (
                  <div key={item.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-indigo-100">
                        <BookOpen className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.type}</p>
                        <p className="mt-2 text-gray-600">{item.description}</p>
                        <div className="mt-4">
                          <Link href={item.link}>
                            <Button variant="outline" size="sm">
                              View Project
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Testimonials tab */}
            <TabsContent value="testimonials" className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Client Testimonials</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {professional.testimonials.map((testimonial, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                    <div className="mt-4">
                      <p className="font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

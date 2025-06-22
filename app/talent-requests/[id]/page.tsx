import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TalentRequestContactForm from "@/components/talent-request-contact-form"
import { ArrowLeft, Building, MapPin, Briefcase, Clock, Mail, ExternalLink } from "lucide-react"

// Mock data for talent requests
const talentRequests = [
  {
    id: "1",
    title: "eLearning Designer for Corporate Training Program",
    company: "Tech Innovations Inc.",
    location: "Remote (US-based)",
    budget: "$5,000 - $10,000",
    type: "Project-based",
    timeframe: "3-6 months",
    posted: "2 days ago",
    description:
      "We're looking for an experienced eLearning designer to help create a comprehensive training program for our new software platform. The ideal candidate will have experience with Articulate Storyline, instructional design principles, and corporate technology training.",
    detailedDescription: `
      <p>Tech Innovations Inc. is seeking an experienced eLearning designer to develop a comprehensive training program for our new enterprise software platform. This project will involve creating engaging, interactive learning modules that effectively teach users how to utilize all aspects of our software.</p>
      
      <h3>Project Scope:</h3>
      <ul>
        <li>Develop 8-10 interactive eLearning modules (approximately 3-5 hours of total learning content)</li>
        <li>Create knowledge checks and assessments throughout the program</li>
        <li>Design engaging activities and scenarios that reflect real-world software usage</li>
        <li>Develop user guides and quick reference materials as supplementary resources</li>
        <li>Work with our subject matter experts to ensure accuracy of content</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>Proven experience designing eLearning programs for software training</li>
        <li>Proficiency with Articulate Storyline or similar authoring tools</li>
        <li>Strong understanding of adult learning principles and instructional design</li>
        <li>Experience working with SCORM/xAPI standards</li>
        <li>Excellent communication skills and ability to work with subject matter experts</li>
        <li>Portfolio demonstrating previous eLearning development work</li>
      </ul>
      
      <h3>Timeline:</h3>
      <p>We anticipate this project taking 3-6 months to complete, with the first module needed within 6 weeks of project start.</p>
    `,
    skills: ["Articulate Storyline", "Instructional Design", "Software Training", "Corporate Training"],
    applicationMethod: "Email",
    contactInfo: "careers@techinnovations.com",
    companyDescription:
      "Tech Innovations Inc. is a leading provider of enterprise software solutions for the financial services industry. With over 200 employees and offices in New York, San Francisco, and London, we're dedicated to creating cutting-edge technology that simplifies complex financial processes.",
    companyWebsite: "https://www.techinnovations.com",
  },
  {
    id: "2",
    title: "Workshop Facilitator for Leadership Development",
    company: "Global Enterprises",
    location: "Chicago, IL (Hybrid)",
    budget: "$3,000 - $5,000",
    type: "Contract",
    timeframe: "1-2 months",
    posted: "5 days ago",
    description:
      "Seeking a dynamic workshop facilitator to deliver a series of leadership development sessions for our mid-level managers. The ideal candidate will have experience with leadership coaching, team building exercises, and interactive workshop facilitation.",
    detailedDescription: `
      <p>Global Enterprises is looking for an experienced workshop facilitator to deliver a series of leadership development workshops for our mid-level management team. These workshops are part of our ongoing talent development initiative aimed at strengthening leadership capabilities across the organization.</p>
      
      <h3>Project Scope:</h3>
      <ul>
        <li>Deliver 4 full-day leadership workshops over a period of 8 weeks</li>
        <li>Topics include: emotional intelligence, strategic thinking, team building, and effective communication</li>
        <li>Workshops will be conducted in a hybrid format (in-person at our Chicago office with some participants joining virtually)</li>
        <li>Approximately 15-20 participants per session</li>
        <li>Provide workshop materials and pre/post-workshop activities</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>Minimum 5 years experience facilitating leadership development workshops</li>
        <li>Strong background in adult learning and interactive facilitation techniques</li>
        <li>Experience with hybrid workshop delivery (in-person and virtual participants)</li>
        <li>Knowledge of current leadership development best practices</li>
        <li>Excellent presentation and communication skills</li>
        <li>Relevant certifications in leadership coaching or development preferred</li>
      </ul>
      
      <h3>Timeline:</h3>
      <p>We plan to begin the workshop series in the coming month and complete all sessions within an 8-week timeframe.</p>
    `,
    skills: ["Leadership Development", "Workshop Facilitation", "Coaching", "Team Building"],
    applicationMethod: "Platform",
    contactInfo: "",
    companyDescription:
      "Global Enterprises is a multinational consulting firm with over 5,000 employees worldwide. We specialize in business strategy, operations, and organizational development for Fortune 500 companies across diverse industries.",
    companyWebsite: "https://www.globalenterprises.com",
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
    detailedDescription: `
      <p>Healthcare Solutions is looking for a full-time LMS Administrator and Content Developer to join our growing Learning & Development team. This role will be responsible for managing our learning management system and developing healthcare-specific training content for our staff and partners.</p>
      
      <h3>Key Responsibilities:</h3>
      <ul>
        <li>Administer and maintain our Cornerstone LMS, including user management, course assignments, and reporting</li>
        <li>Develop engaging healthcare training content, with a focus on compliance, clinical procedures, and patient care</li>
        <li>Collaborate with subject matter experts to ensure accuracy and relevance of training materials</li>
        <li>Track completion rates and certification status for all required training</li>
        <li>Provide technical support to users and troubleshoot LMS issues</li>
        <li>Stay current with healthcare regulations and update training content accordingly</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>3+ years experience as an LMS administrator (Cornerstone experience preferred)</li>
        <li>Background in healthcare training or content development</li>
        <li>Knowledge of healthcare compliance requirements (HIPAA, OSHA, etc.)</li>
        <li>Experience with eLearning authoring tools (Articulate, Captivate, etc.)</li>
        <li>Strong organizational and project management skills</li>
        <li>Bachelor's degree in instructional design, education, healthcare, or related field</li>
      </ul>
      
      <h3>Benefits:</h3>
      <p>We offer competitive salary, comprehensive healthcare benefits, 401(k) matching, professional development opportunities, and a positive remote work culture.</p>
    `,
    skills: ["LMS Administration", "Healthcare Training", "Content Development", "Compliance Training"],
    applicationMethod: "Website",
    contactInfo: "www.healthcaresolutions.com/careers",
    companyDescription:
      "Healthcare Solutions is a leading provider of healthcare staffing and training services. We partner with hospitals, clinics, and healthcare facilities nationwide to provide qualified professionals and comprehensive training programs that improve patient care outcomes.",
    companyWebsite: "https://www.healthcaresolutions.com",
  },
  {
    id: "4",
    title: "Learning Experience Designer for Mobile Learning",
    company: "EdTech Startup",
    location: "San Francisco, CA (On-site)",
    budget: "$15,000 - $25,000",
    type: "Project-based",
    timeframe: "2-3 months",
    posted: "3 days ago",
    description:
      "Our EdTech startup is looking for a Learning Experience Designer to help create engaging mobile learning experiences for our platform. The ideal candidate will have a strong understanding of UX design principles, mobile learning best practices, and innovative learning approaches.",
    detailedDescription: `
      <p>EdTech Startup is seeking a talented Learning Experience Designer to help us reimagine mobile learning for our educational platform. This project will focus on creating engaging, effective learning experiences optimized for mobile devices that appeal to learners of all ages.</p>
      
      <h3>Project Scope:</h3>
      <ul>
        <li>Redesign our existing learning modules for optimal mobile experience</li>
        <li>Create interactive, micro-learning components that work well on small screens</li>
        <li>Design gamified learning elements to increase engagement and retention</li>
        <li>Develop personalized learning pathways based on user preferences and behavior</li>
        <li>Collaborate with our development team to implement designs</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>3+ years experience in learning experience design, preferably for mobile platforms</li>
        <li>Strong understanding of UX/UI design principles for mobile applications</li>
        <li>Knowledge of learning science and instructional design methodologies</li>
        <li>Experience with design tools like Figma, Sketch, or Adobe XD</li>
        <li>Portfolio demonstrating innovative learning design work</li>
        <li>Familiarity with gamification and microlearning concepts</li>
      </ul>
      
      <h3>Timeline:</h3>
      <p>This is a 2-3 month project with possibility for extension or conversion to a permanent role for the right candidate.</p>
    `,
    skills: ["UX Design", "Mobile Learning", "Instructional Design", "Educational Technology"],
    applicationMethod: "Platform",
    contactInfo: "",
    companyDescription:
      "EdTech Startup is an innovative educational technology company focused on making learning accessible, engaging, and effective for everyone. Our mobile platform uses cutting-edge technology to deliver personalized learning experiences across a wide range of subjects.",
    companyWebsite: "https://www.edtechstartup.io",
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
    detailedDescription: `
      <p>Manufacturing Solutions is seeking a skilled Virtual Reality Training Developer to create immersive training simulations for our manufacturing clients. This project will involve developing VR-based training modules that teach complex assembly procedures and safety protocols in a risk-free virtual environment.</p>
      
      <h3>Project Scope:</h3>
      <ul>
        <li>Develop 3-5 VR training modules for manufacturing assembly processes</li>
        <li>Create realistic 3D models of manufacturing components and equipment</li>
        <li>Design interactive sequences that teach proper assembly techniques and safety procedures</li>
        <li>Implement tracking and assessment features to measure learner performance</li>
        <li>Ensure compatibility with major VR headsets (Oculus Quest, HTC Vive, etc.)</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>Proven experience developing VR training applications</li>
        <li>Strong proficiency with Unity and C# programming</li>
        <li>Experience with 3D modeling and animation</li>
        <li>Understanding of instructional design principles</li>
        <li>Knowledge of manufacturing processes and safety protocols (preferred)</li>
        <li>Portfolio demonstrating previous VR development work</li>
      </ul>
      
      <h3>Timeline:</h3>
      <p>We anticipate this project taking 4-6 months to complete, with the first module delivered within 8 weeks of project start.</p>
    `,
    skills: ["VR Development", "Unity", "3D Modeling", "Manufacturing Training"],
    applicationMethod: "Email",
    contactInfo: "hr@manufacturingsolutions.com",
    companyDescription:
      "Manufacturing Solutions specializes in providing advanced training and technology solutions for the manufacturing industry. We work with leading manufacturers to improve operational efficiency, safety compliance, and workforce development through innovative training approaches.",
    companyWebsite: "https://www.manufacturingsolutions.com",
  },
]

export default function TalentRequestPage({ params }: { params: { id: string } }) {
  const request = talentRequests.find((r) => r.id === params.id)

  if (!request) {
    notFound()
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/talent-requests" className="flex items-center text-indigo-600 hover:text-indigo-500">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Talent Requests
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{request.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
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
                <div className="mt-4">
                  <Badge
                    variant={
                      request.type === "Full-time"
                        ? "default"
                        : request.type === "Project-based"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-sm"
                  >
                    {request.type}
                  </Badge>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Request Description</h2>
                <div
                  className="prose prose-indigo mt-4 max-w-none"
                  dangerouslySetInnerHTML={{ __html: request.detailedDescription }}
                />

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Skills Required</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {request.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Timeframe</h3>
                  <p className="mt-2 text-gray-600">{request.timeframe}</p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900">About {request.company}</h2>
                <p className="mt-4 text-gray-600">{request.companyDescription}</p>
                {request.companyWebsite && (
                  <div className="mt-4">
                    <a
                      href={request.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 hover:text-indigo-500"
                    >
                      Visit Company Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Express Interest</h2>

              {request.applicationMethod === "Platform" ? (
                <div className="mt-4">
                  <TalentRequestContactForm requestId={request.id} requestTitle={request.title} />
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-gray-600">To apply for this opportunity, please contact the business directly:</p>
                  <div className="mt-4">
                    {request.applicationMethod === "Email" ? (
                      <a
                        href={`mailto:${request.contactInfo}`}
                        className="flex items-center text-indigo-600 hover:text-indigo-500"
                      >
                        <Mail className="mr-2 h-5 w-5" />
                        {request.contactInfo}
                      </a>
                    ) : (
                      <a
                        href={
                          request.contactInfo.startsWith("http")
                            ? request.contactInfo
                            : `https://${request.contactInfo}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-indigo-600 hover:text-indigo-500"
                      >
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Apply on Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Request Details</h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{request.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Budget</dt>
                  <dd className="mt-1 text-sm text-gray-900">{request.budget}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{request.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Timeframe</dt>
                  <dd className="mt-1 text-sm text-gray-900">{request.timeframe}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Posted</dt>
                  <dd className="mt-1 text-sm text-gray-900">{request.posted}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6">
              <Button className="w-full" asChild>
                <Link href="/professionals">Browse L&D Professionals</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

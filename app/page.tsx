"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Award, Briefcase } from "lucide-react"
import { useAuth } from "@/app/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  const handleCreateProfile = () => {
    if (user) {
      router.push("/profile/create")
    } else {
      router.push("/signup")
    }
  }

  return (
    <div className="bg-[#f9f8f7] text-[#321709]">
      {/* Hero Section */}
      <section className="bg-[#A87C6F] py-24 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">
            Discover Top L&D Talent
          </h1>
          <p className="mt-6 text-lg max-w-xl mx-auto text-[#f8f6f6]">
            Browse portfolios, connect with experts, and find the perfect fit
            for your learning and development needs.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link href="/professionals">
              <Button
                size="lg"
                className="rounded-full px-6 bg-[#4a3b36] text-white hover:bg-[#a87c6f]"
              >
                Browse Professionals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              onClick={handleCreateProfile}
              className="rounded-full px-6 border border-[#4A3B36] text-[#4A3B36] hover:bg-[#Ea87c6f] bg-white"
            >
              Create Your Profile
            </Button>
          </div>
        </div>
      </section>

      {/* For Businesses */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[#A87C6F] font-semibold text-base tracking-wide">
            For Businesses
          </h2>
          <p className="mt-2 text-4xl font-bold text-[#4A3B36]">
            Hire Learning & Development Experts
          </p>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Connect with verified professionals in eLearning, instructional
            design, facilitation, and organisational training.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              icon: <BookOpen className="h-6 w-6 text-[#A8C09D]" />,
              title: "Specialised Expertise",
              desc: "Access professionals with skills in eLearning, AI training, LMS setup, workshop design, and more.",
            },
            {
              icon: <Users className="h-6 w-6 text-[#A8C09D]" />,
              title: "Verified Professionals",
              desc: "Browse vetted profiles with proven experience and client testimonials.",
            },
            {
              icon: <Award className="h-6 w-6 text-[#A8C09D]" />,
              title: "Quality Assurance",
              desc: "All professionals meet our standards for excellence and performance.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#F4F1ED] shadow-sm rounded-lg p-6 text-left border border-[#e5ded5]"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <h3 className="text-lg font-semibold text-[#4A3B36]">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For Professionals */}
      <section className="bg-[#A8C09D] py-24 px-6 text-[#4A3B36]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[#4A3B36] font-semibold text-base tracking-wide">
            For L&D Professionals
          </h2>
          <p className="mt-2 text-4xl font-bold">Showcase Your Skills</p>
          <p className="mt-4 text-lg text-[#3A3A3A] max-w-3xl mx-auto">
            Build a standout profile, share your expertise, and get discovered
            by businesses who need your services.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              icon: <Briefcase className="h-6 w-6 text-[#4A3B36]" />,
              title: "Professional Portfolio",
              desc: "Highlight your certifications, services, and project experience in one place.",
            },
            {
              icon: <Users className="h-6 w-6 text-[#4A3B36]" />,
              title: "Direct Connections",
              desc: "Get matched with clients who value your unique skill set.",
            },
            {
              icon: <Award className="h-6 w-6 text-[#4A3B36]" />,
              title: "Build Credibility",
              desc: "Display testimonials and build trust with your ideal clients.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-sm rounded-lg p-6 text-left border border-[#dcd4c6]"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="mt-3 text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Button
            size="lg"
            onClick={handleCreateProfile}
            className="rounded-full px-6 bg-[#a87c6f] text-white hover:bg-[#4a3b36]"
          >
            Create Your Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#A87C6F] py-24 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto text-[#F4F1ED]">
            Whether you’re hiring or looking to be hired, our platform helps you
            connect and grow.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link href="/professionals">
              <Button
                size="lg"
                className="rounded-full px-6 bg-white text-[#A87C6F] hover:bg-[#F4F1ED]"
              >
                Browse Professionals
              </Button>
            </Link>
            <Button
              size="lg"
              onClick={handleCreateProfile}
              className="rounded-full px-6 bg-white text-[#A87C6F] hover:bg-[#F4F1ED]"
            >
              Create Your Profile
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

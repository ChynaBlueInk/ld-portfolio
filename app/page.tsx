import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Award, Briefcase } from "lucide-react"

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Connect with Top Learning & Development Talent
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find the perfect L&D professional for your business needs. Browse portfolios, skills, and services from
              top remote talent.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/professionals">
                <Button size="lg" className="rounded-md px-6">
                  Browse Professionals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="rounded-md px-6">
                  Create Your Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">For Businesses</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Find the perfect L&D professional for your needs
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform connects businesses with skilled Learning & Development professionals who can help transform
            your organization.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <BookOpen className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Specialized Expertise
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Access professionals with specialized skills in eLearning, workshop design, AI training, LMS setup,
                  and more.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Users className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Verified Professionals
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Browse through curated profiles of verified L&D professionals with proven track records and client
                  testimonials.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Award className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Quality Assurance
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  All professionals are vetted to ensure they meet our high standards for quality and expertise.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* For professionals section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">For L&D Professionals</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Showcase your skills and grow your business
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Create a professional portfolio that highlights your expertise and connects you with businesses looking
              for your specific skills.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Briefcase className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  Professional Portfolio
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Create a comprehensive profile showcasing your skills, experience, services, and portfolio pieces.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Users className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  Business Connections
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Connect with businesses looking specifically for your L&D expertise and services.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Award className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  Credibility Building
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Display client testimonials and recommendations to build trust with potential clients.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-16 flex justify-center">
            <Link href="/signup">
              <Button size="lg" className="rounded-md px-6">
                Create Your Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-indigo-600 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to find the perfect match?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
              Whether you're a business looking for L&D talent or a professional wanting to showcase your skills, get
              started today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/professionals">
                <Button variant="secondary" size="lg" className="rounded-md px-6">
                  Browse Professionals
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-md border-white bg-transparent text-white hover:bg-white hover:text-indigo-600 px-6"
                >
                  Create Your Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

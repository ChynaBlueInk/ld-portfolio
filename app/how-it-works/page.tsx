import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Users, Search, FileCheck, MessageSquare, Building, ArrowRight } from "lucide-react"

export const metadata = {
  title: "How It Works | L&D Talent Hub",
  description:
    "Learn how L&D Talent Hub connects Learning & Development professionals with businesses looking for specialized talent.",
}

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">How L&D Talent Hub Works</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            L&D Talent Hub connects Learning & Development professionals with businesses looking for specialized talent.
            Our platform makes it easy to find the perfect match for your needs.
          </p>
        </div>

        {/* Tabs for different user types */}
        <div className="mt-16">
          <Tabs defaultValue="professionals" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="professionals">For L&D Professionals</TabsTrigger>
              <TabsTrigger value="businesses">For Businesses</TabsTrigger>
            </TabsList>

            {/* For L&D Professionals */}
            <TabsContent value="professionals" className="mt-8">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                <div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="L&D Professional using the platform"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Showcase your skills and find opportunities
                  </h2>
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                          <span className="text-indigo-600 font-semibold">1</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Create your professional profile</h3>
                        <p className="mt-1 text-gray-600">
                          Build a comprehensive profile showcasing your skills, experience, portfolio, and services
                          offered. Make yourself discoverable to businesses looking for L&D talent.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                          <span className="text-indigo-600 font-semibold">2</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Browse talent requests</h3>
                        <p className="mt-1 text-gray-600">
                          Explore talent requests posted by businesses looking for L&D professionals. Filter by project
                          type, budget, and required skills to find opportunities that match your expertise.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                          <span className="text-indigo-600 font-semibold">3</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Express interest in opportunities</h3>
                        <p className="mt-1 text-gray-600">
                          When you find a talent request that matches your skills, express your interest directly
                          through our platform or via the business's preferred contact method.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                          <span className="text-indigo-600 font-semibold">4</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Connect and collaborate</h3>
                        <p className="mt-1 text-gray-600">
                          Once a business is interested in your profile or responds to your application, you can discuss
                          project details, negotiate terms, and begin your professional relationship.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center sm:justify-start">
                    <Link href="/signup">
                      <Button size="lg">
                        Create Your Profile
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-16 border-t border-gray-200 pt-16">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">Benefits for L&D Professionals</h2>
                </div>
                <div className="mx-auto mt-12 grid max-w-md gap-8 sm:max-w-lg md:max-w-5xl md:grid-cols-3">
                  <div className="flex flex-col rounded-lg border border-gray-200 p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                      <Users className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Targeted Visibility</h3>
                    <p className="mt-2 flex-1 text-gray-600">
                      Get discovered by businesses specifically looking for your L&D expertise and services.
                    </p>
                  </div>

                  <div className="flex flex-col rounded-lg border border-gray-200 p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                      <Search className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Find Relevant Opportunities</h3>
                    <p className="mt-2 flex-1 text-gray-600">
                      Browse talent requests that match your skills, experience, and preferred work arrangements.
                    </p>
                  </div>

                  <div className="flex flex-col rounded-lg border border-gray-200 p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                      <CheckCircle className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Build Credibility</h3>
                    <p className="mt-2 flex-1 text-gray-600">
                      Showcase your portfolio and client testimonials to build trust with potential clients.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* For Businesses */}
            <TabsContent value="businesses" className="mt-8">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                      Find the perfect L&D talent for your needs
                    </h2>
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                            <span className="text-indigo-600 font-semibold">1</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Post a talent request</h3>
                          <p className="mt-1 text-gray-600">
                            Create a detailed talent request describing your L&D project or position. Specify the
                            skills, experience, and qualifications you're looking for.
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                            <span className="text-indigo-600 font-semibold">2</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Browse professional profiles</h3>
                          <p className="mt-1 text-gray-600">
                            Search and filter through our curated database of L&D professionals. Review their skills,
                            experience, portfolios, and client testimonials.
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                            <span className="text-indigo-600 font-semibold">3</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Connect with qualified professionals</h3>
                          <p className="mt-1 text-gray-600">
                            Reach out to professionals who match your requirements, or review applications from
                            professionals who have expressed interest in your talent request.
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                            <span className="text-indigo-600 font-semibold">4</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Hire and collaborate</h3>
                          <p className="mt-1 text-gray-600">
                            Once you've found the right match, finalize the details and begin working together on your
                            L&D project or role.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center sm:justify-start">
                      <Link href="/talent-requests/new">
                        <Button size="lg">
                          Post a Talent Request
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Business using the platform"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              <div className="mt-16 border-t border-gray-200 pt-16">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">Benefits for Businesses</h2>
                </div>
                <div className="mx-auto mt-12 grid max-w-md gap-8 sm:max-w-lg md:max-w-5xl md:grid-cols-3">
                  <div className="flex flex-col rounded-lg border border-gray-200 p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                      <FileCheck className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Verified Professionals</h3>
                    <p className="mt-2 flex-1 text-gray-600">
                      Access a curated network of L&D professionals with verified skills and experience.
                    </p>
                  </div>

                  <div className="flex flex-col rounded-lg border border-gray-200 p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                      <Building className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Specialized Expertise</h3>
                    <p className="mt-2 flex-1 text-gray-600">
                      Find professionals with specialized skills in eLearning, workshop design, LMS setup, and more.
                    </p>
                  </div>

                  <div className="flex flex-col rounded-lg border border-gray-200 p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                      <MessageSquare className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Direct Communication</h3>
                    <p className="mt-2 flex-1 text-gray-600">
                      Connect directly with professionals to discuss your project needs and requirements.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Have questions about how L&D Talent Hub works? Find answers to common questions below.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is L&D Talent Hub free to use?</AccordionTrigger>
                <AccordionContent>
                  Creating a basic profile and browsing professionals or talent requests is free. We offer premium
                  features for both professionals and businesses that require a subscription. Visit our pricing page for
                  more details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How are L&D professionals verified?</AccordionTrigger>
                <AccordionContent>
                  All professional profiles are reviewed by our team before being published. We verify credentials,
                  check portfolios, and ensure that professionals meet our quality standards. Additionally, client
                  testimonials and ratings provide further validation of a professional's expertise.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Can I hire professionals for both short-term projects and full-time roles?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! L&D Talent Hub supports various engagement types, including project-based work, contract
                  positions, part-time roles, and full-time employment. When posting a talent request, you can specify
                  the type of engagement you're looking for.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How do I get paid as an L&D professional?</AccordionTrigger>
                <AccordionContent>
                  L&D Talent Hub is a platform for connecting professionals with businesses. Payment arrangements are
                  made directly between you and the business. We recommend discussing payment terms, methods, and
                  schedules before beginning any work.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can I update my profile or talent request after publishing?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can update your professional profile or talent request at any time. We encourage keeping your
                  information current to ensure the best matches between professionals and businesses.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>What types of L&D professionals can I find on the platform?</AccordionTrigger>
                <AccordionContent>
                  Our platform features a diverse range of L&D professionals, including instructional designers,
                  eLearning developers, workshop facilitators, LMS administrators, learning experience designers,
                  content creators, and more. You can filter professionals by skills, services, and expertise to find
                  the perfect match for your needs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <div className="relative isolate overflow-hidden bg-indigo-600 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
              Whether you're an L&D professional looking to showcase your skills or a business seeking specialized
              talent, L&D Talent Hub is here to help you connect.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/professionals">
                <Button variant="secondary" size="lg">
                  Browse Professionals
                </Button>
              </Link>
              <Link href="/talent-requests">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white bg-transparent text-white hover:bg-white hover:text-indigo-600"
                >
                  View Talent Requests
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

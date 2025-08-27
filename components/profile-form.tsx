// components/profile-form.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload } from "lucide-react"

const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  title: z.string().min(2, { message: "Professional title must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  bio: z
    .string()
    .min(50, { message: "Bio must be at least 50 characters." })
    .max(500, { message: "Bio must not be longer than 500 characters." }),
  linkedin: z.string().optional(),
  website: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileForm() {
  const router = useRouter()
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [services, setServices] = useState<{ title: string; description: string }[]>([])
  const [newServiceTitle, setNewServiceTitle] = useState("")
  const [newServiceDescription, setNewServiceDescription] = useState("")
  const [activeTab, setActiveTab] = useState("basic")

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      title: "",
      location: "",
      bio: "",
      linkedin: "",
      website: "",
    },
  })

  function onSubmit(data: ProfileFormValues) {
    console.log({ ...data, skills, services })
    router.push("/professionals")
  }

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addService = () => {
    if (newServiceTitle && newServiceDescription) {
      setServices([...services, { title: newServiceTitle, description: newServiceDescription }])
      setNewServiceTitle("")
      setNewServiceDescription("")
    }
  }

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="skills">Skills & Services</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio & Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter your personal and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Title</FormLabel>
                        <FormControl>
                          <Input placeholder="eLearning Specialist" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell businesses about your experience, expertise, and what makes you unique..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>{field.value.length}/500 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Profile</FormLabel>
                          <FormControl>
                            <Input placeholder="linkedin.com/in/johndoe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Personal Website</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block text-sm font-medium">Profile Picture</div>
                    <div className="mt-2 flex items-center gap-x-3">
                      <div className="h-12 w-12 rounded-full bg-gray-300" />
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 block text-sm font-medium">Cover Image</div>
                    <div className="mt-2">
                      <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-300" />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("skills")}>
                    Next: Skills & Services
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                  <CardDescription>Add your professional skills and areas of expertise.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Skills
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {skill}</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill (e.g., Instructional Design)"
                          className="flex-1"
                        />
                        <Button type="button" onClick={addSkill} size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Services
                      </div>
                      <div className="space-y-4">
                        {services.map((service, index) => (
                          <div key={index} className="rounded-lg border border-gray-200 p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{service.title}</h4>
                                <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeService(index)}
                                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove service</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 space-y-4">
                        <div>
                          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Service Title
                          </div>
                          <Input
                            value={newServiceTitle}
                            onChange={(e) => setNewServiceTitle(e.target.value)}
                            placeholder="e.g., eLearning Course Development"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Service Description
                          </div>
                          <Textarea
                            value={newServiceDescription}
                            onChange={(e) => setNewServiceDescription(e.target.value)}
                            placeholder="Describe what this service includes and how it benefits clients..."
                            className="min-h-24"
                          />
                        </div>
                        <Button type="button" onClick={addService} size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Service
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                  <CardDescription>Add the services you offer to potential clients.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4" />
                  <div className="space-y-4" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                    Previous: Basic Info
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setActiveTab("portfolio")}>
                    Next: Portfolio & Experience
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>Add examples of your work to showcase your skills and experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Portfolio Items
                    </div>
                    <div className="mt-4 space-y-4">
                      <div className="rounded-lg border border-gray-200 p-4">
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Project Title
                            </div>
                            <Input placeholder="e.g., Leadership Development Program" />
                          </div>
                          <div>
                            <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Project Description
                            </div>
                            <Textarea
                              placeholder="Describe the project, your role, and the outcomes..."
                              className="min-h-24"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Project Type
                            </div>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="case-study">Case Study</SelectItem>
                                <SelectItem value="elearning">eLearning Course</SelectItem>
                                <SelectItem value="workshop">Workshop</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Project Link or File
                            </div>
                            <div className="mt-2 flex items-center gap-x-3">
                              <Input placeholder="https://example.com/project" />
                              <span className="text-sm text-gray-500">or</span>
                              <Button type="button" variant="outline" size="sm">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button type="button" variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Portfolio Item
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Add your relevant work experience in the L&D field.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Company Name
                        </div>
                        <Input placeholder="e.g., Global Learning Solutions" />
                      </div>
                      <div>
                        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Job Title
                        </div>
                        <Input placeholder="e.g., Senior Instructional Designer" />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Start Date
                          </div>
                          <Input type="month" />
                        </div>
                        <div>
                          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            End Date
                          </div>
                          <Input type="month" placeholder="Present" />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Job Description
                        </div>
                        <Textarea
                          placeholder="Describe your responsibilities and achievements..."
                          className="min-h-24"
                        />
                      </div>
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Experience
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("skills")}>
                    Previous: Skills & Services
                  </Button>
                  <Button type="submit">Create Profile</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}

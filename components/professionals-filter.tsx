"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for filters
const skillsOptions = [
  "Instructional Design",
  "eLearning Development",
  "LMS Administration",
  "Workshop Facilitation",
  "Leadership Development",
  "Content Creation",
  "Learning Analytics",
  "Virtual Reality Training",
  "Mobile Learning",
  "Gamification",
]

const servicesOptions = [
  "eLearning Course Creation",
  "Workshop Design",
  "LMS Setup & Management",
  "Leadership Training",
  "Team Building",
  "Content Strategy",
  "Program Evaluation",
  "EdTech Consulting",
  "Change Management",
  "Performance Consulting",
]

export default function ProfessionalsFilter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const handleSkillChange = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSkills([])
    setSelectedServices([])
  }

  return (
    <div className="sticky top-4 space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        <p className="text-sm text-gray-500">Narrow down professionals by skills and services</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="search" className="text-sm font-medium">
            Search
          </Label>
          <div className="mt-1">
            <Input
              type="text"
              id="search"
              placeholder="Search by name or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["skills", "services"]} className="w-full">
          <AccordionItem value="skills">
            <AccordionTrigger className="text-sm font-medium">Skills</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {skillsOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={() => handleSkillChange(skill)}
                    />
                    <Label
                      htmlFor={`skill-${skill}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="services">
            <AccordionTrigger className="text-sm font-medium">Services</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {servicesOptions.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service}`}
                      checked={selectedServices.includes(service)}
                      onCheckedChange={() => handleServiceChange(service)}
                    />
                    <Label
                      htmlFor={`service-${service}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {service}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  )
}

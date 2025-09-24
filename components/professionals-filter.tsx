"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type FilterState = {
  search: string;
  skills: string[];
  services: string[];
};

type Props = {
  defaultState?: Partial<FilterState>;
  onChange?: (state: FilterState) => void;
  skillsOptions?: string[];
  servicesOptions?: string[];
};

const DEFAULT_SKILLS = [
  "Instructional Design",
  "eLearning Development",
  "LMS Administration",
  "Workshop Facilitation",
  "Leadership Development",
  "Content Creation",
  "Learning Analytics",
  "Change Management",
  "Accessibility (WCAG)",
  "SCORM",
  "xAPI",
];

const DEFAULT_SERVICES = [
  "eLearning Course Creation",
  "Workshop Design",
  "LMS Setup & Management",
  "Leadership Training",
  "Content Strategy",
  "Program Evaluation",
  "EdTech Consulting",
  "Measurement & Evaluation",
  "Migration",
];

export default function ProfessionalsFilter({
  defaultState,
  onChange,
  skillsOptions = DEFAULT_SKILLS,
  servicesOptions = DEFAULT_SERVICES,
}: Props) {
  const [search, setSearch] = useState(defaultState?.search ?? "");
  const [skills, setSkills] = useState<string[]>(defaultState?.skills ?? []);
  const [services, setServices] = useState<string[]>(defaultState?.services ?? []);

  // Emit changes up
  useEffect(() => {
    onChange?.({ search, skills, services });
  }, [search, skills, services, onChange]);

  const clearFilters = () => {
    setSearch("");
    setSkills([]);
    setServices([]);
  };

  const toggle = (list: string[], value: string, setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter((s) => s !== value) : [...list, value]);
  };

  // Keep list order stable but unique
  const uniq = (arr: string[]) => Array.from(new Set(arr));
  const skillOpts = useMemo(() => uniq(skillsOptions), [skillsOptions]);
  const serviceOpts = useMemo(() => uniq(servicesOptions), [servicesOptions]);

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
              placeholder="Search by name, title, or keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["skills", "services"]} className="w-full">
          <AccordionItem value="skills">
            <AccordionTrigger className="text-sm font-medium">Skills</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {skillOpts.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={skills.includes(skill)}
                      onCheckedChange={() => toggle(skills, skill, setSkills)}
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
                {serviceOpts.map((svc) => (
                  <div key={svc} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${svc}`}
                      checked={services.includes(svc)}
                      onCheckedChange={() => toggle(services, svc, setServices)}
                    />
                    <Label
                      htmlFor={`service-${svc}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {svc}
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
  );
}

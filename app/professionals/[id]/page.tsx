"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Award,
  BookOpen,
  MessageSquare,
  FileText,
  Mail,
  Linkedin,
  ExternalLink,
  MapPin,
  Clock,
  DollarSign,
  Globe,
  User2,
} from "lucide-react";
import type { Professional, Service, PortfolioItem, ExperienceItem, Testimonial, Contact } from "@/app/professionals/_mock";
import { MOCK_PROFESSIONALS } from "@/app/professionals/_mock";

/** Allow API variance but render everything the form collects */
type ExtProfessional = Professional & {
  // accept API shapes too
  servicesDetailed?: Service[];
  portfolio?: PortfolioItem[] | Array<{ label: string; url: string; type?: string; description?: string }>;
  experience?: ExperienceItem[];
  testimonials?: Testimonial[];
  contact?: Contact;
  email?: string;     // some APIs put these at top-level
  linkedin?: string;
  website?: string;
};

function normalize(raw: any): ExtProfessional {
  const name =
    raw?.name ||
    raw?.fullName ||
    [raw?.firstName, raw?.lastName].filter(Boolean).join(" ") ||
    "Unnamed";

  const id = String(
    raw?.id || raw?.userID || raw?.slug || raw?.email || `api-${Math.random().toString(36).slice(2)}`
  );

  // contact (merge top-level fallbacks)
  const contact: Contact = {
    email: raw?.contact?.email || raw?.email,
    linkedin: raw?.contact?.linkedin || raw?.linkedin,
    website: raw?.contact?.website || raw?.website,
  };

  // servicesDetailed
  let servicesDetailed: Service[] | undefined;
  if (Array.isArray(raw?.servicesDetailed)) {
    servicesDetailed = raw.servicesDetailed.map((s: any) => ({
      title: String(s?.title || ""),
      description: s?.description ? String(s.description) : undefined,
    })).filter((s: Service) => s.title);
  } else if (Array.isArray(raw?.services)) {
    servicesDetailed = raw.services.map((s: any) =>
      typeof s === "string" ? { title: s } : { title: String(s?.title || ""), description: s?.description ? String(s.description) : undefined }
    ).filter((s: Service) => s.title);
  }

  // portfolio (support both shapes)
  let portfolio: PortfolioItem[] | undefined;
  if (Array.isArray(raw?.portfolio)) {
    portfolio = raw.portfolio.map((p: any) => {
      if (p && typeof p === "object") {
        if ("title" in p && "link" in p) {
          return {
            title: String(p.title),
            link: String(p.link),
            type: p.type ? String(p.type) : undefined,
            description: p.description ? String(p.description) : undefined,
          } as PortfolioItem;
        }
        if ("label" in p && "url" in p) {
          return { title: String(p.label), link: String(p.url) } as PortfolioItem;
        }
      }
      return null;
    }).filter(Boolean) as PortfolioItem[];
  }

  // arrays
  const skills = Array.isArray(raw?.skills) ? raw.skills.map(String) : undefined;
  const tools = Array.isArray(raw?.tools) ? raw.tools.map(String) : undefined;
  const languages = Array.isArray(raw?.languages) ? raw.languages.map(String) : undefined;
  const certifications = Array.isArray(raw?.certifications) ? raw.certifications.map(String) : undefined;

  // experience
  const experience: ExperienceItem[] | undefined = Array.isArray(raw?.experience)
    ? raw.experience.map((e: any) => ({
        company: String(e?.company || ""),
        role: String(e?.role || ""),
        start: e?.start ? String(e.start) : undefined,
        end: e?.end ? String(e.end) : undefined,
        period: e?.period ? String(e.period) : undefined,
        description: e?.description ? String(e.description) : undefined,
      })).filter((e: ExperienceItem) => e.company && e.role)
    : undefined;

  // testimonials
  const testimonials: Testimonial[] | undefined = Array.isArray(raw?.testimonials)
    ? raw.testimonials.map((t: any) => ({
        text: String(t?.text || ""),
        author: String(t?.author || ""),
        role: t?.role ? String(t.role) : undefined,
      })).filter((t: Testimonial) => t.text && t.author)
    : undefined;

  return {
    id,
    name,
    firstName: raw?.firstName,
    lastName: raw?.lastName,
    title: raw?.title,
    location: raw?.location,
    region: raw?.region,
    image: raw?.image || "/placeholder.svg",
    coverImage: raw?.coverImage || "/placeholder.svg",
    bio: raw?.bio,
    yearsExperience: raw?.yearsExperience ?? raw?.experienceYears,
    availability: raw?.availability,
    rate: raw?.rate,
    skills,
    services: Array.isArray(raw?.services) ? raw.services.map((s: any) => (typeof s === "string" ? s : String(s?.title || ""))) : undefined,
    servicesDetailed,
    tools,
    languages,
    certifications,
    portfolio,
    experience,
    testimonials,
    contact,
  };
}

export default function ProfessionalProfile() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [professional, setProfessional] = useState<ExtProfessional | null>(null);
  const [loading, setLoading] = useState(true);

  const mockFallback = useMemo<ExtProfessional | null>(() => {
    const m = MOCK_PROFESSIONALS.find((p) => String(p.id) === String(id));
    return m ? normalize(m) : null;
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/professionals", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const all = Array.isArray(data) ? data.map(normalize) : [];
          const match = all.find((p) => String(p.id) === String(id));
          if (!cancelled && match) {
            setProfessional(match);
            setLoading(false);
            return;
          }
        }
      } catch {
        /* ignore, use fallback */
      }
      if (!cancelled) {
        setProfessional(mockFallback);
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id, mockFallback]);

  if (loading) {
    return <p className="text-center mt-20">Loading profile...</p>;
  }

  if (!professional) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold text-gray-900">Profile not found</h1>
        <p className="mt-2 text-gray-600">This profile may have been removed or is not available in preview.</p>
        <div className="mt-6">
          <Button onClick={() => router.push("/professionals")}>Back to professionals</Button>
        </div>
      </div>
    );
  }

  const {
    name, title, location, region, bio, image, coverImage,
    yearsExperience, availability, rate,
    skills, tools, languages, certifications,
    servicesDetailed, portfolio, experience, testimonials, contact
  } = professional;

  const showExperience = !!(experience && experience.length);
  const showTestimonials = !!(testimonials && testimonials.length);

  return (
    <div className="bg-white">
      {/* Cover + overlay */}
      <div className="relative h-48 w-full sm:h-64 lg:h-72">
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={`${name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header card */}
        <div className="-mt-12 sm:-mt-16">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full ring-4 ring-white overflow-hidden shadow">
                  <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
                  <p className="text-gray-600">{title}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-700">
                    {location && (
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 ring-1 ring-gray-200">
                        <MapPin className="mr-1 h-3 w-3" /> {location}
                      </span>
                    )}
                    {region && (
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 ring-1 ring-gray-200">
                        <Globe className="mr-1 h-3 w-3" /> {region}
                      </span>
                    )}
                    {typeof yearsExperience === "number" && (
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 ring-1 ring-gray-200">
                        <User2 className="mr-1 h-3 w-3" /> {yearsExperience} yrs exp
                      </span>
                    )}
                    {availability && (
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 ring-1 ring-gray-200">
                        <Clock className="mr-1 h-3 w-3" /> {availability}
                      </span>
                    )}
                    {rate && (
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 ring-1 ring-gray-200">
                        <DollarSign className="mr-1 h-3 w-3" /> {rate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {contact?.email && (
                  <a href={`mailto:${contact.email}`}>
                    <Button className="w-full sm:w-auto">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                  </a>
                )}
                {contact?.website && (
                  <Link href={contact.website.startsWith("http") ? contact.website : `https://${contact.website}`} target="_blank">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Website
                    </Button>
                  </Link>
                )}
                {contact?.linkedin && (
                  <Link href={contact.linkedin.startsWith("http") ? contact.linkedin : `https://${contact.linkedin}`} target="_blank">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                  </Link>
                )}
                <Button variant="outline" className="w-full sm:w-auto">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-5">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              {showExperience && <TabsTrigger value="experience" className="hidden md:inline-flex">Experience</TabsTrigger>}
              {showTestimonials && <TabsTrigger value="testimonials" className="hidden md:inline-flex">Testimonials</TabsTrigger>}
            </TabsList>

            {/* About */}
            <TabsContent value="about" className="mt-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                  {bio && (
                    <>
                      <h2 className="text-xl font-semibold text-gray-900">Bio</h2>
                      <p className="mt-4 text-gray-700 leading-relaxed">{bio}</p>
                    </>
                  )}

                  {skills?.length ? (
                    <>
                      <h2 className="mt-8 text-xl font-semibold text-gray-900">Skills</h2>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {skills.map((s) => (
                          <Badge key={s} variant="secondary">{s}</Badge>
                        ))}
                      </div>
                    </>
                  ) : null}

                  {tools?.length ? (
                    <>
                      <h2 className="mt-8 text-xl font-semibold text-gray-900">Tools</h2>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tools.map((t) => (
                          <span key={t} className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] text-indigo-700 ring-1 ring-inset ring-indigo-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : null}

                  {languages?.length ? (
                    <>
                      <h2 className="mt-8 text-xl font-semibold text-gray-900">Languages</h2>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {languages.map((l) => (
                          <span key={l} className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700 ring-1 ring-inset ring-gray-200">
                            {l}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : null}

                  {certifications?.length ? (
                    <>
                      <h2 className="mt-8 text-xl font-semibold text-gray-900">Certifications</h2>
                      <ul className="mt-4 space-y-2">
                        {certifications.map((cert) => (
                          <li key={cert} className="flex items-start">
                            <Award className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>

                {/* Quick info + contact card */}
                <div className="space-y-6 md:col-span-1">
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900">Quick Info</h3>
                    <ul className="mt-4 space-y-2 text-sm text-gray-700">
                      {location && <li className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-gray-400" /> {location}</li>}
                      {region && <li className="flex items-center"><Globe className="mr-2 h-4 w-4 text-gray-400" /> {region}</li>}
                      {typeof yearsExperience === "number" && <li className="flex items-center"><User2 className="mr-2 h-4 w-4 text-gray-400" /> {yearsExperience} years experience</li>}
                      {availability && <li className="flex items-center"><Clock className="mr-2 h-4 w-4 text-gray-400" /> {availability}</li>}
                      {rate && <li className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-gray-400" /> {rate}</li>}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                    <ul className="mt-4 space-y-3">
                      {contact?.email && (
                        <li className="flex items-center">
                          <Mail className="mr-2 h-5 w-5 text-gray-400" />
                          <a href={`mailto:${contact.email}`} className="text-indigo-600 hover:text-indigo-500">{contact.email}</a>
                        </li>
                      )}
                      {contact?.linkedin && (
                        <li className="flex items-center">
                          <Linkedin className="mr-2 h-5 w-5 text-gray-400" />
                          <a
                            href={contact.linkedin.startsWith("http") ? contact.linkedin : `https://${contact.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-500"
                          >
                            LinkedIn Profile
                          </a>
                        </li>
                      )}
                      {contact?.website && (
                        <li className="flex items-center">
                          <ExternalLink className="mr-2 h-5 w-5 text-gray-400" />
                          <a
                            href={contact.website.startsWith("http") ? contact.website : `https://${contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-500"
                          >
                            Personal Website
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Services */}
            <TabsContent value="services" className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Services Offered</h2>
              {servicesDetailed?.length ? (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {servicesDetailed.map((s) => (
                    <div key={s.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <h3 className="text-lg font-medium text-gray-900">{s.title}</h3>
                      {s.description && <p className="mt-2 text-gray-600">{s.description}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-gray-600">No services listed.</p>
              )}
            </TabsContent>

            {/* Portfolio */}
            <TabsContent value="portfolio" className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Portfolio</h2>
              {portfolio?.length ? (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {portfolio.map((item, idx) => (
                    <div key={`${"title" in item ? item.title : (item as any).label}-${idx}`} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <div className="flex items-start">
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-indigo-100">
                          <BookOpen className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {"title" in item ? item.title : (item as any).label}
                          </h3>
                          {"type" in item && item.type ? (
                            <p className="text-sm text-gray-500">{(item as any).type}</p>
                          ) : null}
                          {"description" in item && item.description ? (
                            <p className="mt-2 text-gray-600">{(item as any).description}</p>
                          ) : null}
                          <div className="mt-4">
                            <Link href={"link" in item ? item.link : (item as any).url} target="_blank">
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
              ) : (
                <p className="mt-2 text-gray-600">No portfolio items listed.</p>
              )}
            </TabsContent>

            {/* Experience */}
            {showExperience && (
              <TabsContent value="experience" className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
                <div className="mt-6 space-y-8">
                  {experience!.map((exp, i) => {
                    const period = exp.period || [exp.start, exp.end || "Present"].filter(Boolean).join(" – ");
                    return (
                      <div key={`${exp.company}-${exp.role}-${i}`} className="relative">
                        <div className="flex items-start">
                          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-indigo-100">
                            <Briefcase className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{exp.role}</h3>
                            <p className="text-sm text-gray-500">
                              {exp.company ? `${exp.company} • ` : ""}
                              {period}
                            </p>
                            {exp.description && <p className="mt-2 text-gray-600">{exp.description}</p>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            )}

            {/* Testimonials */}
            {showTestimonials && (
              <TabsContent value="testimonials" className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">Client Testimonials</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {testimonials!.map((t, i) => (
                    <div key={`${t.author}-${i}`} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <p className="text-gray-700 italic">"{t.text}"</p>
                      <div className="mt-4">
                        <p className="font-medium text-gray-900">{t.author}</p>
                        {t.role && <p className="text-sm text-gray-500">{t.role}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

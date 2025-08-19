export interface Professional {
  id: string
  name: string
  title: string
  location: string
  image?: string
  coverImage?: string
  bio: string
  skills: string[]
  services: { title: string; description: string }[]
  experience: {
    company?: string
    role: string
    period: string
    description: string
  }[]
  certifications: string[]
  portfolio: {
    title: string
    type: string
    description: string
    link: string
  }[]
  testimonials: {
    text: string
    author: string
    role: string
  }[]
  contact: {
    email: string
    linkedin?: string
    website?: string
  }
}

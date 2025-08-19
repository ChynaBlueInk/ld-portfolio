export interface UserProfile {
  userID: string
  email: string
  fullName: string
  title: string
  location: string
  bio: string
  image: string
  contact: {
    email: string
    linkedin: string
    website?: string
  }
  coverImage?: string
  skills?: string[]
  services?: { title: string; description: string }[]
  experience?: { company: string; role: string; period: string; description: string }[]
  certifications?: string[]
  portfolio?: { title: string; type: string; description: string; link: string }[]
  testimonials?: { text: string; author: string; role: string }[]
  createdAt: string
  updatedAt: string
}

import ContactForm from "@/components/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata = {
  title: "Contact Us | L&D Talent Hub",
  description:
    "Get in touch with the L&D Talent Hub team. We're here to help with any questions or feedback you may have.",
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg md:grid md:max-w-none md:grid-cols-2 md:gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Get in touch</h2>
            <p className="mt-4 text-lg text-gray-600">
              Have questions about L&D Talent Hub? We're here to help. Fill out the form and we'll get back to you as
              soon as possible.
            </p>
            <div className="mt-8 space-y-6">
  <div className="flex items-center">
    <Mail className="h-6 w-6 text-primary" />
    <span className="ml-3 text-base text-muted-foreground">chynablueink@gmail.com</span>
  </div>
  <div className="flex items-center">
    <Phone className="h-6 w-6 text-primary" />
    <span className="ml-3 text-base text-muted-foreground">WhatsApp +64 (27) 818-3098</span>
  </div>
  <div className="flex items-center">
    <MapPin className="h-6 w-6 text-primary" />
    <span className="ml-3 text-base text-muted-foreground">
      4 Byrd Street
      <br />
      Levin, Horowhenua, NZ 5510
    </span>
  </div>
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Send us a message</h2>
            <p className="mt-4 text-lg text-gray-600">
              Whether you're a business looking for talent or a professional wanting to join our platform, we'd love to
              hear from you.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

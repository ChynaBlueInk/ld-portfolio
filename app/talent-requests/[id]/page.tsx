// app/talent-requests/[id]/page.tsx  (SERVER)
import TalentRequestClient from "./TalentRequestClient"

export const metadata = {
  title: "Talent Request | L&D Talent Hub",
  description: "View a specific L&D talent request and get in touch.",
}

export default function Page({ params }: { params: { id: string } }) {
  return <TalentRequestClient id={params.id} />
}

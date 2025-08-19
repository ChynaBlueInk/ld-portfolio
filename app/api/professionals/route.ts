import { NextResponse } from "next/server"

// Temporary mock data — swap with DynamoDB later
const professionals = [
  {
    id: "1",
    fullName: "Sarah Johnson",
    title: "eLearning Specialist",
    region: "Auckland, NZ",
    bio: "10+ years experience creating engaging eLearning solutions for NZ government and corporate sectors.",
  },
  {
    id: "2",
    fullName: "Michael Chen",
    title: "Workshop Facilitator & Trainer",
    region: "Wellington, NZ",
    bio: "Certified facilitator specializing in leadership development and team dynamics.",
  },
  {
    id: "3",
    fullName: "Priya Patel",
    title: "Learning Experience Designer",
    region: "Christchurch, NZ",
    bio: "Combining UX principles with learning science to create effective learning experiences.",
  },
]

export async function GET() {
  return NextResponse.json(professionals)
}

import { Suspense } from "react"
import ConfirmClient from "./ConfirmClient"

export const metadata = {
  title: "Confirm your account | L&D Talent Hub",
  description: "Enter the code sent to your email to verify your account.",
}

// Make sure this page isn’t statically prerendered
export const dynamic = "force-dynamic"
export const revalidate = 0

export default function Page() {
  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Confirm your account</h1>
      <Suspense fallback={<p className="text-gray-600">Loading…</p>}>
        <ConfirmClient />
      </Suspense>
    </div>
  )
}

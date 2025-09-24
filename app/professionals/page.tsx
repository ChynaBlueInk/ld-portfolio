// app/professionals/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import dynamicClient from "next/dynamic";

// Disable SSR for this route; render the client component only
const ProsPageClient = dynamicClient(() => import("./ProsPageClient"), { ssr: false });

export default function Page() {
  return <ProsPageClient />;
}

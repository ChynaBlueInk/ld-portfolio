// app/professionals/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import dynamicClient from "next/dynamic";

// Render client content only on the client (no SSR for the heavy bit)
const ProsPageClient = dynamicClient(() => import("./ProsPageClient"), { ssr: false });

export default function Page() {
  // No hooks here, no Suspense here; the route-level "loading.tsx" will provide the boundary.
  return <ProsPageClient />;
}

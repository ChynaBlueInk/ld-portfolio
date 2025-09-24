// app/professionals/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import dynamicClient from "next/dynamic";
import { Suspense } from "react";

// Load the client component only on the client
const ProsPageClient = dynamicClient(() => import("./ProsPageClient"), {
  ssr: false,
  loading: () => null,
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProsPageClient />
    </Suspense>
  );
}

// app/professionals/page.tsx
import dynamic from "next/dynamic";

// Disable SSR entirely for this route to avoid prerendering + hooks warnings
const ProsPageClient = dynamic(() => import("./ProsPageClient"), { ssr: false });

export default function Page() {
  return <ProsPageClient />;
}

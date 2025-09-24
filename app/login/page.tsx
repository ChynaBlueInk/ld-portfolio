// app/login/page.tsx
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login (Temporarily Disabled)",
  description: "Authentication is temporarily disabled while we collect feedback.",
};

export default function Page() {
  // Public preview mode: send folks to professionals
  redirect("/professionals");
}

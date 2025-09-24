// app/signup/page.tsx
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign up (Temporarily Disabled)",
  description: "Authentication is temporarily disabled while we collect feedback.",
};

export default function Page() {
  redirect("/professionals");
}

import Link from "next/link";
import SignupClient from "./SignupClient";

export const metadata = {
  title: "Create Your Profile | L&D Talent Hub",
  description:
    "Create your professional profile on L&D Talent Hub. Showcase your skills, experience, and services to connect with businesses looking for L&D talent.",
};

export default function Page() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create Your Professional Profile
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Showcase your skills, experience, and services to connect with businesses looking for L&amp;D talent.
          </p>
          <p className="mx-auto max-w-xl text-sm text-gray-500">
            Tip: You can upload your resume to prefill fields. You’ll be able to edit everything before submitting.
          </p>
        </div>

        <div className="mt-12">
          <SignupClient />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import ResumeImporter from "@/components/ResumeImporter";

type Parsed = {
  fullName?: string; email?: string; phone?: string;
  headline?: string; location?: string; links?: string[];
  skills?: string[]; summary?: string;
  currentRole?: string; currentCompany?: string;
};

// ⬇️ Replace with your real IDs (client ID is safe on client)
const REGION = "ap-southeast-2";
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "YOUR_CLIENT_ID"; // e.g. 6bpvj6dq1kalujdu7mdieujtfl

const cognito = new CognitoIdentityProviderClient({ region: REGION });

export default function SignupClient() {
  const router = useRouter();

  // Auth basics
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Profile fields (prefill targets)
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [region, setRegion] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");

  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Prefill from resume
  const onPrefill = (d: Parsed) => {
    if (d.fullName && !fullName) setFullName(d.fullName);
    if (d.email && !email) setEmail(d.email);
    if (d.headline) setTitle(d.headline);
    if (!d.headline && d.currentRole) setTitle(d.currentRole);
    if (d.location) setLocation(d.location);
    if (d.summary) setBio(d.summary);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!CLIENT_ID || CLIENT_ID === "YOUR_CLIENT_ID") {
      setMsg("Cognito Client ID is missing. Set NEXT_PUBLIC_COGNITO_CLIENT_ID.");
      return;
    }
    if (!agree) {
      setMsg("Please accept the terms to continue.");
      return;
    }
    setBusy(true);

    try {
      // 1) Create the Cognito user
      const signup = new SignUpCommand({
        ClientId: CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
          { Name: "name", Value: fullName },
          { Name: "email", Value: email },
          // You can add custom attrs once defined in your pool, e.g. "custom:role"
        ],
      });

      const out = await cognito.send(signup);
      const userSub = out.UserSub || ""; // The unique Cognito user ID

      // 2) Try to save profile now (OK if your /api/users allows this pre-verification)
      // If it fails due to auth, we’ll save as a local draft.
      const profile = {
        userID: userSub || email, // fallback to email if sub unavailable
        email,
        fullName,
        role: "", // optional, set later if needed
        title,
        location,
        bio,
        image,
        region,
        linkedin,
        website,
      };

      let savedNow = false;
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        });
        savedNow = res.ok;
      } catch {
        savedNow = false;
      }

      if (!savedNow) {
        // Store draft; your /profile/create page can read and post it after login/verification
        localStorage.setItem("pendingProfileDraft", JSON.stringify(profile));
      }

      setMsg(
        "Sign-up successful! We’ve sent a verification code to your email. Please verify to continue."
      );
      // Route to a verify page (create one if you haven't) or to login
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: any) {
      const message =
        err?.name === "UsernameExistsException"
          ? "An account with this email already exists."
          : err?.message || "Sign-up failed. Please try again.";
      setMsg(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="mx-auto max-w-3xl space-y-8">
      {msg && (
        <div
          className={`rounded border p-3 text-sm ${
            msg.toLowerCase().includes("fail") || msg.toLowerCase().includes("missing") || msg.toLowerCase().includes("exists")
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {msg}
        </div>
      )}

      {/* Fast Prefill */}
      <section className="rounded-md border bg-gray-50 p-4">
        <h2 className="text-base font-semibold">Fast Prefill (optional)</h2>
        <p className="mb-3 text-sm text-gray-600">
          Upload your resume (PDF/DOCX). We’ll prefill profile fields—you can edit them.
        </p>
        <ResumeImporter onPrefill={onPrefill} />
      </section>

      {/* Account */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Account</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Alex Chen"
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="flex gap-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full rounded border p-2"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="shrink-0 rounded border px-3 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      </section>

      {/* Profile Basics (prefilled via resume, editable) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Profile basics</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title / Role</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Instructional Designer"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Wellington, NZ"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Short Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about your background…"
            className="w-full rounded border p-2"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/profile.jpg"
            className="w-full rounded border p-2"
          />
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt="Preview"
              className="mt-2 h-16 w-16 rounded-full border object-cover"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Region</label>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="e.g. New Zealand"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn (optional)</label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/yourname"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website (optional)</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full rounded border p-2"
          />
        </div>
      </section>

      {/* Consent + Submit */}
      <section className="space-y-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          I agree to the Terms & Privacy Policy.
        </label>

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded bg-green-600 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? "Creating your account…" : "Create account"}
        </button>
      </section>
    </form>
  );
}

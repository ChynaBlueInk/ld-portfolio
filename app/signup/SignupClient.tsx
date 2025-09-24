"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import ResumeImporter from "@/components/ResumeImporter";

type Parsed = {
  // Your page previously used this shape
  fullName?: string;
  email?: string;
  phone?: string;
  headline?: string;
  location?: string;
  links?: string[];
  skills?: string[];
  summary?: string;
  currentRole?: string;
  currentCompany?: string;

  // Back-compat in case ResumeImporter returns `name`
  name?: string;
};

const REGION =
  process.env.NEXT_PUBLIC_COGNITO_REGION || "ap-southeast-2";
const CLIENT_ID =
  process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
const AUTH_FLOW =
  process.env.NEXT_PUBLIC_COGNITO_AUTH_FLOW || "USER_PASSWORD_AUTH";

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

  const cognito = useMemo(
    () =>
      new CognitoIdentityProviderClient({
        region: REGION,
      }),
    []
  );

  // Prefill from resume (handles either `fullName` or `name`)
  const onPrefill = (d: Parsed) => {
    const nameFromResume = d.fullName || d.name;
    if (nameFromResume && !fullName) setFullName(nameFromResume);
    if (d.email && !email) setEmail(d.email);
    if (d.headline) setTitle(d.headline);
    if (!d.headline && d.currentRole) setTitle(d.currentRole);
    if (d.location) setLocation(d.location);
    if (d.summary) setBio(d.summary);
  };

  async function postProfileOrDraft(arg: {
    userID: string;
    email: string;
    fullName: string;
    role?: string;
    title?: string;
    location?: string;
    bio?: string;
    image?: string;
    region?: string;
    linkedin?: string;
    website?: string;
  }) {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
      });
      if (!res.ok) throw new Error(`POST /api/users -> ${res.status}`);
      return true;
    } catch {
      try {
        localStorage.setItem("pendingProfileDraft", JSON.stringify(arg));
      } catch {
        // ignore
      }
      return false;
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!CLIENT_ID) {
      setMsg(
        "Configuration error: NEXT_PUBLIC_COGNITO_CLIENT_ID is missing."
      );
      return;
    }
    if (!agree) {
      setMsg("Please accept the terms to continue.");
      return;
    }
    if (!email || !password) {
      setMsg("Please enter email and password.");
      return;
    }

    setBusy(true);
    try {
      // 1) Create user in Cognito
      const signup = new SignUpCommand({
        ClientId: CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
          { Name: "email", Value: email },
          ...(fullName ? [{ Name: "name", Value: fullName }] : []),
        ],
      });

      const out = await cognito.send(signup);
      const userSub = out.UserSub || "";

      // 2) Attempt to create basic profile now (ok if your /api/users requires auth; we'll stash instead)
      await postProfileOrDraft({
        userID: userSub || email, // fallback until we have tokens
        email,
        fullName,
        role: "Member", // default; your API treats role as optional
        title,
        location,
        bio,
        image,
        region,
        linkedin,
        website,
      });

      // 3) Routing: if code sent or user not confirmed, go to /verify; otherwise go to /login
      const needsConfirm =
        !!out.CodeDeliveryDetails || out.UserConfirmed === false;

      if (needsConfirm) {
        setMsg(
          "Sign-up successful! We’ve sent a verification code to your email."
        );
        router.push(`/verify?email=${encodeURIComponent(email)}`);
      } else {
        setMsg("Account created. You can now sign in.");
        router.push("/login");
      }
    } catch (err: any) {
      const code = err?.name || err?.__type || "";
      const message =
        code === "UsernameExistsException"
          ? "An account with this email already exists. Try signing in."
          : code === "InvalidPasswordException"
          ? "Password doesn’t meet the pool’s policy. Try a stronger password."
          : code === "InvalidParameterException" &&
            /SECRET_HASH/i.test(err?.message || "")
          ? "This app client requires a client secret. Create a Web app client with NO secret and update NEXT_PUBLIC_COGNITO_CLIENT_ID."
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
            /error|fail|missing|exist|secret/i.test(msg)
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
          Upload your resume (PDF/DOCX). We’ll prefill profile fields—you can
          edit them.
        </p>
        <ResumeImporter onPrefill={onPrefill} />
      </section>

      {/* Account */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Account</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
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
          <p className="mt-1 text-xs text-gray-500">
            Auth flow: <code>{AUTH_FLOW}</code> • Region: <code>{REGION}</code>
          </p>
        </div>
      </section>

      {/* Profile Basics (prefilled via resume, editable) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Profile basics</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title / Role
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Instructional Designer"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Wellington, NZ"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about your background…"
            className="w-full rounded border p-2"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image URL
          </label>
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
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Region
          </label>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="e.g. New Zealand"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn (optional)
          </label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/yourname"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website (optional)
          </label>
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
          I agree to the Terms &amp; Privacy Policy.
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

"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Public-preview version:
 * - Does NOT require sign-in
 * - If no identity tokens are present, loads/saves to localStorage as a draft
 *   (keeps your existing pendingProfileDraft convention)
 * - If identity exists, behaves as before and POSTs to /api/users
 */

// --- helpers ---------------------------------------------------------------

function decodeJwtSubFromLocal(): { sub?: string; email?: string } {
  try {
    const id = localStorage.getItem("idToken");
    const email = localStorage.getItem("email") || undefined;
    if (!id) return { email };
    const payload = id.split(".")[1];
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return { sub: json?.sub, email: json?.email || email };
  } catch {
    return { email: localStorage.getItem("email") || undefined };
  }
}

type Profile = {
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
};

// Merge only empty fields in `base` from `patch`
function mergeOnlyEmpty(base: Partial<Profile>, patch: Partial<Profile>) {
  const result: Partial<Profile> = { ...base };
  (Object.keys(patch) as (keyof Profile)[]).forEach((k) => {
    const current = result[k];
    const incoming = patch[k];
    const isEmpty =
      current === undefined ||
      current === null ||
      (typeof current === "string" && current.trim() === "");
    if (isEmpty && incoming !== undefined && incoming !== null) {
      result[k] = incoming;
    }
  });
  return result;
}

// --- page ------------------------------------------------------------------

export default function ProfileCreatePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // identity (if present)
  const identity = useMemo(decodeJwtSubFromLocal, []);
  const [userID, setUserID] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // form fields
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<string | undefined>("Member"); // default
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [region, setRegion] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");

  const isAuthed = Boolean(identity.sub || identity.email);

  // Load existing (if authed) + apply any pending draft
  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);

      try {
        // Resolve identity (or set preview placeholders)
        const sub = identity.sub || localStorage.getItem("userID") || undefined;
        const em = identity.email || localStorage.getItem("email") || undefined;

        if (sub || em) {
          const resolvedUserID = sub || (em as string);
          const resolvedEmail = em || "";
          setUserID(resolvedUserID);
          setEmail(resolvedEmail);

          // Try GET /api/users
          try {
            const res = await fetch(`/api/users?userID=${encodeURIComponent(resolvedUserID)}`, {
              method: "GET",
              cache: "no-store",
            });
            if (res.ok) {
              const existing = (await res.json()) as Partial<Profile>;
              if (!cancelled && existing) {
                setFullName(existing.fullName || "");
                setRole(existing.role || "Member");
                setTitle(existing.title || "");
                setLocation(existing.location || "");
                setBio(existing.bio || "");
                setImage(existing.image || "");
                setRegion(existing.region || "");
                setLinkedin(existing.linkedin || "");
                setWebsite(existing.website || "");
              }
            } else if (res.status !== 404) {
              setBanner(
                "Couldn’t load a saved profile yet — you may be new. Fill the form and Save."
              );
            }
          } catch {
            setBanner("Network issue loading your profile. You can still edit and Save.");
          }
        } else {
          // Preview mode (no auth): set placeholders
          setUserID("preview-user");
          setEmail("");
          setBanner(
            "Public Preview: you’re not signed in. You can edit fields and Save a local draft."
          );
        }

        // Apply pendingProfileDraft (only to empty fields), then remove it
        try {
          const raw = localStorage.getItem("pendingProfileDraft");
          if (raw) {
            const draft = JSON.parse(raw) as Partial<Profile>;
            // If authenticated, only apply if email matches or draft has no email
            const canApply =
              !isAuthed ||
              !draft.email ||
              !email ||
              draft.email.toLowerCase() === email.toLowerCase();

            if (canApply) {
              const merged = mergeOnlyEmpty(
                {
                  fullName,
                  role,
                  title,
                  location,
                  bio,
                  image,
                  region,
                  linkedin,
                  website,
                  email,
                  userID,
                },
                draft
              );

              if (!cancelled) {
                setFullName(merged.fullName || "");
                setRole(merged.role || "Member");
                setTitle(merged.title || "");
                setLocation(merged.location || "");
                setBio(merged.bio || "");
                setImage(merged.image || "");
                setRegion(merged.region || "");
                setLinkedin(merged.linkedin || "");
                setWebsite(merged.website || "");
                localStorage.removeItem("pendingProfileDraft");
                setBanner("Applied details from your draft. Review and Save.");
              }
            }
          }
        } catch {
          /* ignore */
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setBanner(null);

    try {
      const payload: Profile = {
        userID: userID || "preview-user",
        email: email || "",
        fullName,
        role: role || "Member",
        title,
        location,
        bio,
        image,
        region,
        linkedin,
        website,
      };

      if (!isAuthed) {
        // Preview mode: Save locally so you don't lose work
        localStorage.setItem("pendingProfileDraft", JSON.stringify(payload));
        setBanner("✅ Saved locally as a draft (Public Preview). Sign-in later to sync it.");
        return;
      }

      // Authenticated flow: POST to API
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Save failed (${res.status}). ${txt || "Please try again."}`);
      }

      setBanner("✅ Profile saved.");
    } catch (err: any) {
      setError(err?.message || "Couldn’t save your profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Create / Update your profile</h1>
        <p className="mb-6 text-sm text-gray-600">
          Public Preview is on — authentication is disabled. You can edit and save a local draft now,
          then sign in later to sync it to your account.
        </p>

        {(banner || error) && (
          <div
            className={`mb-5 rounded border p-3 text-sm ${
              error
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {error || banner}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-600">Loading…</p>
        ) : (
          <form onSubmit={onSave} className="space-y-6">
            {/* Identity (read-only) */}
            <section className="rounded-md border bg-gray-50 p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    User ID (preview shows placeholder)
                  </label>
                  <input
                    value={userID || "preview-user"}
                    readOnly
                    className="w-full rounded border bg-gray-100 p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Email</label>
                  <input
                    value={email || "(not signed in)"}
                    readOnly
                    className="w-full rounded border bg-gray-100 p-2 text-sm"
                  />
                </div>
              </div>
            </section>

            {/* Basics */}
            <section className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded border p-2"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role (optional — defaults to Member)
                </label>
                <input
                  type="text"
                  value={role || ""}
                  onChange={(e) => setRole(e.target.value || undefined)}
                  className="w-full rounded border p-2"
                  placeholder="Member"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Title / Position</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded border p-2"
                  placeholder="e.g., Instructional Designer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded border p-2"
                  placeholder="e.g., Wellington, NZ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Short bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded border p-2"
                  rows={4}
                  placeholder="Tell us about your background…"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Profile image URL</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full rounded border p-2"
                  placeholder="https://example.com/you.jpg"
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
                <label className="block text-sm font-medium text-gray-700">Region</label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full rounded border p-2"
                  placeholder="e.g., APAC"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn (optional)</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full rounded border p-2"
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Website (optional)</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full rounded border p-2"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </section>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {saving ? "Saving…" : isAuthed ? "Save profile" : "Save local draft"}
              </button>

              {!isAuthed && (
                <p className="text-xs text-gray-500 text-center">
                  You’re in Public Preview. This will save to your browser only. When sign-in is
                  re-enabled, your draft will auto-apply after login.
                </p>
              )}
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

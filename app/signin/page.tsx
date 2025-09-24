"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const REGION = process.env.NEXT_PUBLIC_COGNITO_REGION || "ap-southeast-2";
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
const AUTH_FLOW = (process.env.NEXT_PUBLIC_COGNITO_AUTH_FLOW || "USER_PASSWORD_AUTH").toUpperCase();

type PendingProfile = {
  userID?: string;
  email: string;
  fullName?: string;
  role?: string;
  title?: string;
  location?: string;
  bio?: string;
  image?: string;
  region?: string;
  linkedin?: string;
  website?: string;
};

function decodeJwtSub(idToken: string): string | undefined {
  try {
    const payload = idToken.split(".")[1];
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return json?.sub;
  } catch {
    return undefined;
  }
}

export default function SigninPage() {
  const router = useRouter();
  const params = useSearchParams();
  const prefillEmail = params.get("email") || "";

  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const cognito = useMemo(
    () =>
      new CognitoIdentityProviderClient({
        region: REGION,
      }),
    []
  );

  async function applyPendingProfileDraft(userID: string, email: string) {
    try {
      const raw = localStorage.getItem("pendingProfileDraft");
      if (!raw) return;
      const draft: PendingProfile = JSON.parse(raw);
      // only apply if emails match (or draft has no email)
      if (draft.email && draft.email.toLowerCase() !== email.toLowerCase()) return;

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          userID: draft.userID || userID,
          role: draft.role || "Member",
        }),
      });
      if (res.ok) localStorage.removeItem("pendingProfileDraft");
    } catch {
      // Non-fatal; user can finish profile later
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!CLIENT_ID) {
      setMsg("Configuration error: NEXT_PUBLIC_COGNITO_CLIENT_ID is missing.");
      return;
    }

    // We implement USER_PASSWORD_AUTH. If your pool/app client only allows SRP, enable USER_PASSWORD_AUTH in the client.
    const flow = "USER_PASSWORD_AUTH";

    setLoading(true);
    try {
      const cmd = new InitiateAuthCommand({
        ClientId: CLIENT_ID,
        AuthFlow: flow,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });

      const out = await cognito.send(cmd);
      const result = out.AuthenticationResult;
      if (!result?.IdToken || !result.AccessToken) {
        throw new Error("Login failed: missing tokens.");
      }

      // Persist tokens for AuthContext/guards
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = result.ExpiresIn ?? 3600;
      const expiresAt = now + expiresIn;

      localStorage.setItem("idToken", result.IdToken);
      localStorage.setItem("accessToken", result.AccessToken);
      if (result.RefreshToken) localStorage.setItem("refreshToken", result.RefreshToken);
      if (result.TokenType) localStorage.setItem("tokenType", result.TokenType);
      localStorage.setItem("expiresAt", String(expiresAt));
      localStorage.setItem("email", email);

      // Try to infer userID (sub) from id token for downstream pages
      const sub = decodeJwtSub(result.IdToken);
      if (sub) localStorage.setItem("userID", sub);

      // Apply any pending profile draft (saved during signup if /api/users was locked)
      await applyPendingProfileDraft(sub || email, email);

      // Optionally notify any AuthContext via a custom event
      try {
        window.dispatchEvent(new Event("auth:login"));
      } catch {
        /* noop */
      }

      router.push("/dashboard");
    } catch (err: any) {
      const code = err?.name || err?.__type || "";
      const text = err?.message || "";

      if (code === "UserNotConfirmedException") {
        setMsg("Your account isn’t verified yet. We’ll take you to verification.");
        router.push(`/verify?email=${encodeURIComponent(email)}`);
        return;
      }

      if (code === "NotAuthorizedException") {
        // Covers incorrect password, disabled user, etc.
        setMsg("Incorrect email or password.");
      } else if (code === "UserNotFoundException") {
        setMsg("No account found with that email.");
      } else if (code === "PasswordResetRequiredException") {
        setMsg("Password reset is required. Please reset your password.");
      } else if (code === "InvalidParameterException" && /SECRET_HASH/i.test(text)) {
        setMsg(
          "This app client requires a client secret. Use a Web app client with NO secret for browser sign-in."
        );
      } else if (/AuthFlow not enabled|SRP_A/i.test(text)) {
        setMsg(
          "Your app client does not allow USER_PASSWORD_AUTH. Enable it in Cognito (App client auth flows) or switch to that flow."
        );
      } else {
        setMsg(text || "Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-md px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Welcome back</h1>
        <p className="mb-6 text-sm text-gray-600">
          Sign in with your email and password.
        </p>

        {msg && (
          <div
            className={`mb-4 rounded border p-3 text-sm ${
              /error|fail|incorrect|no account|secret|not enabled|reset/i.test(msg)
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-yellow-200 bg-yellow-50 text-yellow-800"
            }`}
          >
            {msg}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded border border-gray-300 p-2 text-sm outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <div className="flex gap-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                autoComplete="current-password"
                className="w-full rounded border border-gray-300 p-2 text-sm outline-none focus:border-gray-400"
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

          <div className="flex items-center justify-between pt-2">
            <a href="/forgot-password" className="text-sm text-gray-600 underline">
              Forgot password?
            </a>
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New here?{" "}
          <a href="/signup" className="underline">
            Create an account
          </a>
        </p>

        <p className="mt-2 text-center text-xs text-gray-500">
          Region: <code>{REGION}</code> • Auth flow: <code>{AUTH_FLOW}</code>
        </p>
      </main>
    </div>
  );
}

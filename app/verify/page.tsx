"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const REGION = process.env.NEXT_PUBLIC_COGNITO_REGION || "ap-southeast-2";
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";

export default function VerifyPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const cognito = useMemo(
    () =>
      new CognitoIdentityProviderClient({
        region: REGION,
      }),
    []
  );

  useEffect(() => {
    const q = params.get("email");
    if (q) setEmail(q);
  }, [params]);

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!CLIENT_ID) {
      setMsg("Configuration error: NEXT_PUBLIC_COGNITO_CLIENT_ID is missing.");
      return;
    }
    if (!email || !code) {
      setMsg("Please enter your email and the 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      const cmd = new ConfirmSignUpCommand({
        ClientId: CLIENT_ID,
        Username: email,
        ConfirmationCode: code.trim(),
      });
      await cognito.send(cmd);

      setMsg("✅ Verified! You can now sign in.");
      router.push("/login");
    } catch (err: any) {
      const name = err?.name || err?.__type || "";
      const message =
        name === "CodeMismatchException"
          ? "That code is incorrect. Please try again."
          : name === "ExpiredCodeException"
          ? "That code has expired. Click “Resend code”."
          : name === "UserNotFoundException"
          ? "We couldn’t find an account with that email."
          : name === "NotAuthorizedException"
          ? "This account is already verified. Try signing in."
          : name === "LimitExceededException" || name === "TooManyRequestsException"
          ? "Too many attempts. Please wait a minute and try again."
          : err?.message || "Verification failed. Please try again.";
      setMsg(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setMsg(null);

    if (!CLIENT_ID) {
      setMsg("Configuration error: NEXT_PUBLIC_COGNITO_CLIENT_ID is missing.");
      return;
    }
    if (!email) {
      setMsg("Enter your email first, then click Resend.");
      return;
    }

    setLoading(true);
    try {
      const cmd = new ResendConfirmationCodeCommand({
        ClientId: CLIENT_ID,
        Username: email,
      });
      await cognito.send(cmd);
      setMsg("📩 A new verification code has been sent to your email.");
    } catch (err: any) {
      const name = err?.name || err?.__type || "";
      const message =
        name === "UserNotFoundException"
          ? "We couldn’t find an account with that email."
          : name === "NotAuthorizedException"
          ? "This account is already verified. Try signing in."
          : name === "LimitExceededException" || name === "TooManyRequestsException"
          ? "Too many requests. Please wait a minute and try again."
          : err?.message || "Couldn’t resend the code. Please try again.";
      setMsg(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-md px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Verify your email</h1>
        <p className="mb-6 text-sm text-gray-600">
          Enter the verification code we sent to your email to activate your account.
        </p>

        {msg && (
          <div
            className={`mb-4 rounded border p-3 text-sm ${
              /error|fail|expired|incorrect|couldn’t|missing|not found|requests/i.test(msg)
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleConfirm} className="space-y-4">
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
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Verification code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="6-digit code"
              inputMode="numeric"
              className="w-full rounded border border-gray-300 p-2 text-sm outline-none focus:border-gray-400"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Resend code
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Confirm"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already verified?{" "}
          <a href="/login" className="underline">
            Sign in
          </a>
        </p>

        <p className="mt-2 text-center text-xs text-gray-500">
          Region: <code>{REGION}</code>
        </p>
      </main>
    </div>
  );
}

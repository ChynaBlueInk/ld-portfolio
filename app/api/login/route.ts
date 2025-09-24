// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REGION =
  process.env.AWS_REGION ||
  process.env.NEXT_PUBLIC_COGNITO_REGION ||
  "ap-southeast-2";
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";

export async function POST(req: NextRequest) {
  try {
    if (!CLIENT_ID) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_COGNITO_CLIENT_ID missing." },
        { status: 500 }
      );
    }

    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const client = new CognitoIdentityProviderClient({ region: REGION });

    const cmd = new InitiateAuthCommand({
      ClientId: CLIENT_ID,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const out = await client.send(cmd);

    // Handle challenges if any (NEW_PASSWORD_REQUIRED etc.)
    if (out.ChallengeName) {
      return NextResponse.json(
        { challenge: out.ChallengeName, error: "Challenge required." },
        { status: 409 }
      );
    }

    const result = out.AuthenticationResult;
    if (!result?.IdToken || !result.AccessToken) {
      return NextResponse.json(
        { error: "Missing tokens from Cognito." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        idToken: result.IdToken,
        accessToken: result.AccessToken,
        refreshToken: result.RefreshToken ?? null,
        tokenType: result.TokenType ?? "Bearer",
        expiresIn: result.ExpiresIn ?? 3600,
        email,
      },
      { status: 200 }
    );
  } catch (err: any) {
    const code = err?.name || err?.__type || "";
    const msg = err?.message || "";

    if (code === "UserNotConfirmedException") {
      return NextResponse.json(
        { error: "UserNotConfirmed", email: err?.username || undefined },
        { status: 409 }
      );
    }
    if (code === "NotAuthorizedException") {
      return NextResponse.json(
        { error: "NotAuthorized", message: "Incorrect username or password." },
        { status: 401 }
      );
    }
    if (code === "UserNotFoundException") {
      return NextResponse.json(
        { error: "UserNotFound" },
        { status: 404 }
      );
    }
    if (code === "InvalidParameterException" && /SECRET_HASH/i.test(msg)) {
      return NextResponse.json(
        {
          error: "ClientSecretRequired",
          message:
            "Your app client has a secret. Use a web client with NO secret for browser sign-in.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: code || "AuthError", message: msg || "Authentication failed." },
      { status: 500 }
    );
  }
}

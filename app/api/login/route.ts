import { NextRequest, NextResponse } from "next/server"
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || "ap-southeast-2",
})

export async function POST(req: NextRequest) {
  let email = "" // ✅ default as string
  let password = ""

  try {
    const body = await req.json()
    email = body.email
    password = body.password

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const clientId =
      process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || process.env.COGNITO_CLIENT_ID

    if (!clientId) {
      throw new Error(
        "Cognito ClientId is missing. Check your .env.local file."
      )
    }

    const authCommand = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    })

    const response = await client.send(authCommand)

    if (response.ChallengeName === "NEW_PASSWORD_REQUIRED") {
      const challengeCommand = new RespondToAuthChallengeCommand({
        ClientId: clientId,
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        Session: response.Session,
        ChallengeResponses: {
          USERNAME: email,
          NEW_PASSWORD: password,
        },
      })

      const finalResponse = await client.send(challengeCommand)
      return NextResponse.json({
        idToken: finalResponse.AuthenticationResult?.IdToken,
        accessToken: finalResponse.AuthenticationResult?.AccessToken,
      })
    }

    const idToken = response.AuthenticationResult?.IdToken
    const accessToken = response.AuthenticationResult?.AccessToken

    if (!idToken || !accessToken) {
      return NextResponse.json(
        { error: "Missing token in response" },
        { status: 401 }
      )
    }

    return NextResponse.json({ idToken, accessToken })
  } catch (error: any) {
    console.error("Login error:", error)

    if (error.name === "UserNotConfirmedException" && email) {
      return NextResponse.json(
        { redirect: `/confirm?email=${encodeURIComponent(email)}` },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 500 }
    )
  }
}

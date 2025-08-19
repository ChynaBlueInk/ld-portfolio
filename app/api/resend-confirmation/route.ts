import { NextRequest, NextResponse } from "next/server"
import {
  CognitoIdentityProviderClient,
  ResendConfirmationCodeCommand,
} from "@aws-sdk/client-cognito-identity-provider"

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || "ap-southeast-2",
})

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const command = new ResendConfirmationCodeCommand({
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      Username: email,
    })

    await client.send(command)

    return NextResponse.json(
      { message: "A new confirmation code has been sent to your email." },
      { status: 200 }
    )
  } catch (err: any) {
    console.error("Resend code error:", err)
    return NextResponse.json(
      { error: err.message || "Failed to resend confirmation code" },
      { status: 500 }
    )
  }
}

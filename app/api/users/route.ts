// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server"
import { UserProfile } from "@/app/types/user"
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb"

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

// ✅ Create or update user
export async function POST(req: NextRequest) {
  try {
    const {
      userID,
      email,
      role,
      fullName,
      title,
      location,
      bio,
      image,
      linkedin,
      website,
    } = await req.json()

    if (!userID || !email || !role) {
      return NextResponse.json(
        { error: "Missing required fields: userID, email, or role" },
        { status: 400 }
      )
    }

    // First check if user exists
    const checkCommand = new GetItemCommand({
      TableName: "LnDUsers",
      Key: { userID: { S: userID } },
    })
    const existing = await client.send(checkCommand)

    if (existing.Item) {
      // ✅ Update existing profile
      const updateCommand = new UpdateItemCommand({
        TableName: "LnDUsers",
        Key: { userID: { S: userID } },
        UpdateExpression:
          "SET email = :email, role = :role, fullName = :fullName, title = :title, location = :location, bio = :bio, image = :image, linkedin = :linkedin, website = :website, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":email": { S: email },
          ":role": { S: role },
          ":fullName": { S: fullName || "" },
          ":title": { S: title || "" },
          ":location": { S: location || "" },
          ":bio": { S: bio || "" },
          ":image": { S: image || "" }, // optional
          ":linkedin": { S: linkedin || "" }, // optional
          ":website": { S: website || "" },
          ":updatedAt": { S: new Date().toISOString() },
        },
      })

      await client.send(updateCommand)

      return NextResponse.json(
        { message: "User profile updated successfully" },
        { status: 200 }
      )
    } else {
      // ✅ Create new profile with required + optional fields
      const putCommand = new PutItemCommand({
        TableName: "LnDUsers",
        Item: {
          userID: { S: userID },
          email: { S: email },
          role: { S: role },
          fullName: { S: fullName || "" },
          title: { S: title || "" },
          location: { S: location || "" },
          bio: { S: bio || "" },
          image: { S: image || "" }, // optional
          linkedin: { S: linkedin || "" }, // optional
          website: { S: website || "" },
          createdAt: { S: new Date().toISOString() },
          updatedAt: { S: new Date().toISOString() },
        },
      })

      await client.send(putCommand)

      return NextResponse.json(
        { message: "User profile created successfully" },
        { status: 200 }
      )
    }
  } catch (err: any) {
    console.error("DynamoDB POST error:", err)
    return NextResponse.json(
      { error: "Failed to save user", details: err.message },
      { status: 500 }
    )
  }
}

// ✅ Fetch user details by userID
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userID = searchParams.get("userID")

  if (!userID) {
    return NextResponse.json({ error: "Missing userID" }, { status: 400 })
  }

  try {
    const command = new GetItemCommand({
      TableName: "LnDUsers",
      Key: { userID: { S: userID } },
    })

    const response = await client.send(command)

    if (!response.Item) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Always return a safe contact object
    return NextResponse.json({
      role: response.Item.role?.S || "Employee",
      email: response.Item.email?.S || "",
      fullName: response.Item.fullName?.S || "",
      title: response.Item.title?.S || "",
      location: response.Item.location?.S || "",
      bio: response.Item.bio?.S || "",
      image: response.Item.image?.S || "",
      contact: {
        email: response.Item.email?.S || "",
        linkedin: response.Item.linkedin?.S || "",
        website: response.Item.website?.S || "",
      },
    })
  } catch (err: any) {
    console.error("DynamoDB GET error:", err)
    return NextResponse.json(
      { error: "Failed to fetch user", details: err.message },
      { status: 500 }
    )
  }
}

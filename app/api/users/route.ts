import { NextRequest, NextResponse } from "next/server";
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

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
      region,   // ⬅️ add region
    } = await req.json();

    if (!userID || !email) {
      return NextResponse.json(
        { error: "Missing required fields: userID or email" },
        { status: 400 }
      );
    }

    const safeRole = (role && String(role).trim()) || "Member";
    const now = new Date().toISOString();

    // Check if user exists
    const existing = await client.send(new GetItemCommand({
      TableName: "LnDUsers",
      Key: { userID: { S: userID } },
    }));

    if (existing.Item) {
      // ✅ Update existing
      const updateCommand = new UpdateItemCommand({
        TableName: "LnDUsers",
        Key: { userID: { S: userID } },
        UpdateExpression: `
          SET email = :email,
              role = :role,
              fullName = :fullName,
              title = :title,
              location = :location,
              bio = :bio,
              image = :image,
              linkedin = :linkedin,
              website = :website,
              region = :region,
              updatedAt = :updatedAt
        `,
        ExpressionAttributeValues: {
          ":email": { S: email },
          ":role": { S: safeRole },
          ":fullName": { S: fullName || "" },
          ":title": { S: title || "" },
          ":location": { S: location || "" },
          ":bio": { S: bio || "" },
          ":image": { S: image || "" },
          ":linkedin": { S: linkedin || "" },
          ":website": { S: website || "" },
          ":region": { S: region || "" },
          ":updatedAt": { S: now },
        },
      });

      await client.send(updateCommand);
      return NextResponse.json({ message: "User profile updated successfully" }, { status: 200 });
    } else {
      // ✅ Create new
      const putCommand = new PutItemCommand({
        TableName: "LnDUsers",
        Item: {
          userID: { S: userID },
          email: { S: email },
          role: { S: safeRole },
          fullName: { S: fullName || "" },
          title: { S: title || "" },
          location: { S: location || "" },
          bio: { S: bio || "" },
          image: { S: image || "" },
          linkedin: { S: linkedin || "" },
          website: { S: website || "" },
          region: { S: region || "" },
          createdAt: { S: now },
          updatedAt: { S: now },
        },
      });

      await client.send(putCommand);
      return NextResponse.json({ message: "User profile created successfully" }, { status: 200 });
    }
  } catch (err: any) {
    console.error("DynamoDB POST error:", err);
    return NextResponse.json(
      { error: "Failed to save user", details: err.message },
      { status: 500 }
    );
  }
}

// ✅ Fetch user details by userID
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get("userID");

  if (!userID) {
    return NextResponse.json({ error: "Missing userID" }, { status: 400 });
  }

  try {
    const response = await client.send(new GetItemCommand({
      TableName: "LnDUsers",
      Key: { userID: { S: userID } },
    }));

    if (!response.Item) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      role: response.Item.role?.S || "Member",
      email: response.Item.email?.S || "",
      fullName: response.Item.fullName?.S || "",
      title: response.Item.title?.S || "",
      location: response.Item.location?.S || "",
      bio: response.Item.bio?.S || "",
      image: response.Item.image?.S || "",
      region: response.Item.region?.S || "",
      contact: {
        email: response.Item.email?.S || "",
        linkedin: response.Item.linkedin?.S || "",
        website: response.Item.website?.S || "",
      },
    });
  } catch (err: any) {
    console.error("DynamoDB GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch user", details: err.message },
      { status: 500 }
    );
  }
}

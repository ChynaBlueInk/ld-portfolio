// app/api/favourites/route.ts
import { NextRequest, NextResponse } from "next/server"
import {
  DynamoDBClient,
  UpdateItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb"

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

// ✅ GET favourites for a user
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
      return NextResponse.json({ favourites: [] }, { status: 200 })
    }

    const favourites = JSON.parse(response.Item.favourites?.S ?? "[]")
    return NextResponse.json({ favourites })
  } catch (err: any) {
    console.error("GET favourites error:", err)
    return NextResponse.json(
      { error: "Failed to fetch favourites", details: err.message },
      { status: 500 }
    )
  }
}

// ✅ POST — add a new favourite
export async function POST(req: NextRequest) {
  try {
    const { userID, job } = await req.json()

    if (!userID || !job) {
      return NextResponse.json(
        { error: "Missing required fields: userID or job" },
        { status: 400 }
      )
    }

    // Get current favourites
    const getCommand = new GetItemCommand({
      TableName: "LnDUsers",
      Key: { userID: { S: userID } },
    })
    const response = await client.send(getCommand)

    let favourites: any[] = []
    if (response.Item) {
      favourites = JSON.parse(response.Item.favourites?.S ?? "[]")
    }

    // Add if not already present
    if (!favourites.some((f) => f.jobId === job.jobId)) {
      favourites.push(job)
    }

    // Save back
    const updateCommand = new UpdateItemCommand({
      TableName: "LnDUsers",
      Key: { userID: { S: userID } },
      UpdateExpression: "SET favourites = :favs",
      ExpressionAttributeValues: {
        ":favs": { S: JSON.stringify(favourites) },
      },
    })

    await client.send(updateCommand)

    return NextResponse.json({ favourites }, { status: 200 })
  } catch (err: any) {
    console.error("POST favourites error:", err)
    return NextResponse.json(
      { error: "Failed to add favourite", details: err.message },
      { status: 500 }
    )
  }
}

// ✅ DELETE — remove a favourite
export async function DELETE(req: NextRequest) {
  try {
    const { userID, jobId } = await req.json()

    if (!userID || !jobId) {
      return NextResponse.json(
        { error: "Missing required fields: userID or jobId" },
        { status: 400 }
      )
    }

    const getCommand = new GetItemCommand({
      TableName: "LnDUsers",
      Key: { userID: { S: userID } },
    })
    const response = await client.send(getCommand)

    let favourites: any[] = []
    if (response.Item) {
      favourites = JSON.parse(response.Item.favourites?.S ?? "[]")
    }

    // Remove the favourite
    favourites = favourites.filter((f) => f.jobId !== jobId)

    const updateCommand = new UpdateItemCommand({
      TableName: "LnDUsers",
      Key: { userID: { S: userID } },
      UpdateExpression: "SET favourites = :favs",
      ExpressionAttributeValues: {
        ":favs": { S: JSON.stringify(favourites) },
      },
    })

    await client.send(updateCommand)

    return NextResponse.json({ favourites }, { status: 200 })
  } catch (err: any) {
    console.error("DELETE favourites error:", err)
    return NextResponse.json(
      { error: "Failed to remove favourite", details: err.message },
      { status: 500 }
    )
  }
}

import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("[v0] Test connection API called")

    console.log("[v0] All environment variables starting with AIRTABLE:")
    Object.keys(process.env).forEach((key) => {
      if (key.includes("AIRTABLE") && !key.startsWith("NEXT_PUBLIC_")) {
        console.log(`[v0] ${key}:`, process.env[key] ? `${process.env[key]?.substring(0, 10)}...` : "undefined")
      }
    })

    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY

    console.log("[v0] Environment variables check:")
    console.log("[v0] AIRTABLE_BASE_ID exists:", !!AIRTABLE_BASE_ID)
    console.log("[v0] AIRTABLE_API_KEY exists:", !!AIRTABLE_API_KEY)
    console.log("[v0] AIRTABLE_BASE_ID length:", AIRTABLE_BASE_ID?.length || 0)
    console.log("[v0] AIRTABLE_API_KEY length:", AIRTABLE_API_KEY?.length || 0)

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.log("[v0] Missing environment variables, returning error")
      return NextResponse.json({
        connected: false,
        error: "Server-side environment variables AIRTABLE_API_KEY and AIRTABLE_BASE_ID are required",
        details: {
          hasApiKey: !!AIRTABLE_API_KEY,
          hasBaseId: !!AIRTABLE_BASE_ID,
          availableAirtableVars: Object.keys(process.env).filter(
            (key) => key.includes("AIRTABLE") && !key.startsWith("NEXT_PUBLIC_"),
          ),
        },
      })
    }

    const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`
    console.log("[v0] Airtable API URL:", AIRTABLE_API_URL)

    console.log("[v0] Making request to Airtable...")
    const response = await fetch(`${AIRTABLE_API_URL}/Trips?maxRecords=1`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    console.log("[v0] Airtable response status:", response.status)
    console.log("[v0] Airtable response ok:", response.ok)
    console.log("[v0] Airtable response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Airtable error response:", errorText)
      throw new Error(`Airtable API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log("[v0] Airtable response data:", JSON.stringify(data, null, 2))

    console.log("[v0] Connection test successful, returning success response")
    return NextResponse.json({
      connected: true,
      message: "Successfully connected to Airtable",
      recordCount: data.records?.length || 0,
    })
  } catch (error) {
    console.error("[v0] Airtable connection test failed:", error)
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")

    return NextResponse.json(
      {
        connected: false,
        error: "Failed to connect to Airtable",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

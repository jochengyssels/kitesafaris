import { type NextRequest, NextResponse } from "next/server"

interface LeadData {
  email: string
  source: string
  submissionDate: string
}

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json()

    // Validate required fields
    if (!email || !source) {
      return NextResponse.json({ success: false, error: "Email and source are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    // Check for required environment variables
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID

    if (!airtableApiKey || !airtableBaseId) {
      console.error("[v0] Airtable credentials not configured")
      return NextResponse.json({ success: false, error: "Service temporarily unavailable" }, { status: 503 })
    }

    // Prepare lead data
    const leadData: LeadData = {
      email: email.toLowerCase().trim(),
      source: source.trim(),
      submissionDate: new Date().toISOString(),
    }

    console.log("[v0] Creating lead record:", { email: leadData.email, source: leadData.source })

    // Create Airtable record
    const airtableResponse = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/ebook_leads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Email: leadData.email,
          Source: leadData.source,
          "Submission Date": leadData.submissionDate,
          Status: "New",
        },
      }),
    })

    if (!airtableResponse.ok) {
      const errorText = await airtableResponse.text()
      console.error("[v0] Airtable API error:", {
        status: airtableResponse.status,
        statusText: airtableResponse.statusText,
        error: errorText,
      })

      return NextResponse.json({ success: false, error: "Failed to save lead information" }, { status: 500 })
    }

    const airtableData = await airtableResponse.json()
    console.log("[v0] Lead record created successfully:", airtableData.id)

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      leadId: airtableData.id,
    })
  } catch (error) {
    console.error("[v0] Lead capture error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

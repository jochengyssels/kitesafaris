import { type NextRequest, NextResponse } from "next/server"

interface ApiStatusCheck {
  service: string
  name: string
  status: "active" | "inactive" | "error"
  responseTime: number
  lastCall: string
  requestsToday: number
  endpoints: string[]
}

export async function GET(request: NextRequest) {
  try {
    const apiChecks: ApiStatusCheck[] = []

    // Check Airtable API
    try {
      const airtableStart = Date.now()
      const airtableKey = process.env.AIRTABLE_API_KEY
      const airtableBase = process.env.AIRTABLE_BASE_ID

      if (airtableKey && airtableBase) {
        const response = await fetch(`https://api.airtable.com/v0/${airtableBase}/Trips?maxRecords=1`, {
          headers: {
            Authorization: `Bearer ${airtableKey}`,
          },
          signal: AbortSignal.timeout(5000),
        })

        apiChecks.push({
          service: "airtable",
          name: "Airtable",
          status: response.ok ? "active" : "error",
          responseTime: Date.now() - airtableStart,
          lastCall: new Date().toISOString(),
          requestsToday: Math.floor(Math.random() * 100) + 20, // Mock data
          endpoints: ["/api/trips", "/api/bookings", "/api/leads"],
        })
      } else {
        apiChecks.push({
          service: "airtable",
          name: "Airtable",
          status: "inactive",
          responseTime: 0,
          lastCall: "Never",
          requestsToday: 0,
          endpoints: ["/api/trips", "/api/bookings", "/api/leads"],
        })
      }
    } catch (error) {
      apiChecks.push({
        service: "airtable",
        name: "Airtable",
        status: "error",
        responseTime: 5000,
        lastCall: new Date().toISOString(),
        requestsToday: 0,
        endpoints: ["/api/trips", "/api/bookings", "/api/leads"],
      })
    }

    // Check Pixabay API
    try {
      const pixabayStart = Date.now()
      const pixabayKey = process.env.PIXABAY_API_KEY

      if (pixabayKey) {
        const response = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=test&per_page=3`, {
          signal: AbortSignal.timeout(5000),
        })

        apiChecks.push({
          service: "pixabay",
          name: "Pixabay",
          status: response.ok ? "active" : "error",
          responseTime: Date.now() - pixabayStart,
          lastCall: new Date().toISOString(),
          requestsToday: Math.floor(Math.random() * 50) + 10,
          endpoints: ["/api/pixabay/search"],
        })
      } else {
        apiChecks.push({
          service: "pixabay",
          name: "Pixabay",
          status: "inactive",
          responseTime: 0,
          lastCall: "Never",
          requestsToday: 0,
          endpoints: ["/api/pixabay/search"],
        })
      }
    } catch (error) {
      apiChecks.push({
        service: "pixabay",
        name: "Pixabay",
        status: "error",
        responseTime: 5000,
        lastCall: new Date().toISOString(),
        requestsToday: 0,
        endpoints: ["/api/pixabay/search"],
      })
    }

    // Mock other services
    apiChecks.push(
      {
        service: "email",
        name: "Email Service",
        status: "active",
        responseTime: 320,
        lastCall: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        requestsToday: Math.floor(Math.random() * 30) + 5,
        endpoints: ["/api/email/send", "/api/email/subscribe"],
      },
      {
        service: "webhooks",
        name: "Custom Webhooks",
        status: "inactive",
        responseTime: 0,
        lastCall: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        requestsToday: 0,
        endpoints: ["/api/webhooks/booking", "/api/webhooks/payment"],
      },
    )

    return NextResponse.json({
      success: true,
      data: apiChecks,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("API status check failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check API status",
      },
      { status: 500 },
    )
  }
}

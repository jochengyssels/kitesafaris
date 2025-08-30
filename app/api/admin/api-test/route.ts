import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { method, url, headers, body: requestBody, service } = body

    console.log(`[v0] API Test Request: ${method} ${url}`)

    const startTime = Date.now()
    let response: Response
    let responseData: any

    try {
      // Handle different API services
      if (service === "airtable" && url.startsWith("/api/")) {
        // Proxy to actual Airtable API
        const airtableKey = process.env.AIRTABLE_API_KEY
        const airtableBase = process.env.AIRTABLE_BASE_ID

        if (!airtableKey || !airtableBase) {
          throw new Error("Airtable credentials not configured")
        }

        const airtableUrl = url
          .replace("/api/trips", `https://api.airtable.com/v0/${airtableBase}/Trips`)
          .replace("/api/bookings", `https://api.airtable.com/v0/${airtableBase}/Bookings`)
          .replace("/api/leads", `https://api.airtable.com/v0/${airtableBase}/ebook_leads`)

        const requestHeaders: Record<string, string> = {
          Authorization: `Bearer ${airtableKey}`,
          "Content-Type": "application/json",
        }

        // Add custom headers from request
        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            if (key !== "Authorization" && typeof value === "string") {
              requestHeaders[key] = value
            }
          })
        }

        response = await fetch(airtableUrl, {
          method,
          headers: requestHeaders,
          body: method !== "GET" ? JSON.stringify(requestBody) : undefined,
          signal: AbortSignal.timeout(10000),
        })

        responseData = await response.json()
      } else if (service === "pixabay" && url.startsWith("/api/pixabay")) {
        // Proxy to Pixabay API
        const pixabayKey = process.env.PIXABAY_API_KEY

        if (!pixabayKey) {
          throw new Error("Pixabay API key not configured")
        }

        const searchParams = new URLSearchParams({
          key: pixabayKey,
          q: "kiteboarding",
          per_page: "12",
          safesearch: "true",
        })

        response = await fetch(`https://pixabay.com/api/?${searchParams}`, {
          signal: AbortSignal.timeout(10000),
        })

        responseData = await response.json()
      } else {
        // Mock response for other endpoints
        response = new Response(
          JSON.stringify({
            success: true,
            message: "Mock API response",
            data: {
              endpoint: url,
              method,
              timestamp: new Date().toISOString(),
            },
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        )

        responseData = await response.json()
      }

      const responseTime = Date.now() - startTime

      // Log the API call for monitoring
      console.log(`[v0] API Test Response: ${response.status} in ${responseTime}ms`)

      return NextResponse.json({
        success: true,
        response: {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          data: responseData,
          responseTime,
        },
      })
    } catch (error) {
      const responseTime = Date.now() - startTime
      console.error(`[v0] API Test Error:`, error)

      return NextResponse.json({
        success: false,
        response: {
          status: 500,
          statusText: "Internal Server Error",
          headers: {},
          data: { error: error instanceof Error ? error.message : "Unknown error" },
          responseTime,
        },
      })
    }
  } catch (error) {
    console.error("API test request failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request format",
      },
      { status: 400 },
    )
  }
}

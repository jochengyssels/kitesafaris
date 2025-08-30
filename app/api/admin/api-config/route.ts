import { type NextRequest, NextResponse } from "next/server"

interface ApiConfiguration {
  service: string
  name: string
  enabled: boolean
  rateLimit: {
    requestsPerMinute: number
    dailyQuota: number
    currentUsage: number
  }
  security: {
    keyRotationEnabled: boolean
    ipWhitelistEnabled: boolean
    requestLoggingEnabled: boolean
    errorNotificationsEnabled: boolean
  }
  endpoints: string[]
  lastUpdated: string
}

// Mock configuration data - in production, store in database
const apiConfigurations: Record<string, ApiConfiguration> = {
  airtable: {
    service: "airtable",
    name: "Airtable",
    enabled: true,
    rateLimit: {
      requestsPerMinute: 60,
      dailyQuota: 1000,
      currentUsage: 47,
    },
    security: {
      keyRotationEnabled: true,
      ipWhitelistEnabled: false,
      requestLoggingEnabled: true,
      errorNotificationsEnabled: true,
    },
    endpoints: ["/api/trips", "/api/bookings", "/api/leads"],
    lastUpdated: new Date().toISOString(),
  },
  pixabay: {
    service: "pixabay",
    name: "Pixabay",
    enabled: true,
    rateLimit: {
      requestsPerMinute: 100,
      dailyQuota: 5000,
      currentUsage: 23,
    },
    security: {
      keyRotationEnabled: false,
      ipWhitelistEnabled: false,
      requestLoggingEnabled: true,
      errorNotificationsEnabled: true,
    },
    endpoints: ["/api/pixabay/search"],
    lastUpdated: new Date().toISOString(),
  },
  email: {
    service: "email",
    name: "Email Service",
    enabled: true,
    rateLimit: {
      requestsPerMinute: 50,
      dailyQuota: 2000,
      currentUsage: 12,
    },
    security: {
      keyRotationEnabled: true,
      ipWhitelistEnabled: true,
      requestLoggingEnabled: true,
      errorNotificationsEnabled: true,
    },
    endpoints: ["/api/email/send", "/api/email/subscribe"],
    lastUpdated: new Date().toISOString(),
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const service = searchParams.get("service")

    if (service) {
      const config = apiConfigurations[service]
      if (!config) {
        return NextResponse.json(
          {
            success: false,
            error: "Service not found",
          },
          { status: 404 },
        )
      }

      return NextResponse.json({
        success: true,
        data: config,
      })
    }

    return NextResponse.json({
      success: true,
      data: Object.values(apiConfigurations),
    })
  } catch (error) {
    console.error("Failed to retrieve API configuration:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve API configuration",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, config } = body

    if (!service || !apiConfigurations[service]) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid service",
        },
        { status: 400 },
      )
    }

    // Update configuration
    apiConfigurations[service] = {
      ...apiConfigurations[service],
      ...config,
      lastUpdated: new Date().toISOString(),
    }

    console.log(`[v0] API configuration updated for ${service}:`, config)

    return NextResponse.json({
      success: true,
      data: apiConfigurations[service],
    })
  } catch (error) {
    console.error("Failed to update API configuration:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update API configuration",
      },
      { status: 500 },
    )
  }
}

import { type NextRequest, NextResponse } from "next/server"

interface SecurityEvent {
  id: string
  timestamp: string
  action: string
  service: string
  user: string
  severity: "low" | "medium" | "high"
  details: Record<string, any>
  ip?: string
  userAgent?: string
}

// Mock security events - in production, store in database
let securityEvents: SecurityEvent[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
    action: "API Key Viewed",
    service: "Airtable",
    user: "admin@kitesafaris.com",
    severity: "low",
    details: { keyId: "airtable_key_1" },
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0...",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
    action: "Rate Limit Updated",
    service: "Pixabay",
    user: "admin@kitesafaris.com",
    severity: "medium",
    details: { oldLimit: 50, newLimit: 100 },
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0...",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    action: "Failed Authentication",
    service: "Email Service",
    user: "unknown",
    severity: "high",
    details: { attempts: 5, endpoint: "/api/email/send" },
    ip: "203.0.113.1",
    userAgent: "curl/7.68.0",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    action: "Environment Switched",
    service: "System",
    user: "admin@kitesafaris.com",
    severity: "medium",
    details: { from: "staging", to: "production" },
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0...",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const severity = searchParams.get("severity") as "low" | "medium" | "high" | null
    const service = searchParams.get("service")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let filteredEvents = securityEvents

    if (severity) {
      filteredEvents = filteredEvents.filter((event) => event.severity === severity)
    }

    if (service) {
      filteredEvents = filteredEvents.filter((event) => event.service === service)
    }

    const paginatedEvents = filteredEvents.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: paginatedEvents,
      total: filteredEvents.length,
      limit,
      offset,
      summary: {
        total: securityEvents.length,
        high: securityEvents.filter((e) => e.severity === "high").length,
        medium: securityEvents.filter((e) => e.severity === "medium").length,
        low: securityEvents.filter((e) => e.severity === "low").length,
      },
    })
  } catch (error) {
    console.error("Failed to retrieve security audit logs:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve security audit logs",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, service, user, severity, details } = body

    const newEvent: SecurityEvent = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action,
      service,
      user,
      severity,
      details: details || {},
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || undefined,
    }

    securityEvents.unshift(newEvent) // Add to beginning

    // Keep only last 1000 events in memory
    if (securityEvents.length > 1000) {
      securityEvents = securityEvents.slice(0, 1000)
    }

    console.log(`[v0] Security event logged: ${action} for ${service} by ${user}`)

    return NextResponse.json({
      success: true,
      data: newEvent,
    })
  } catch (error) {
    console.error("Failed to log security event:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to log security event",
      },
      { status: 500 },
    )
  }
}

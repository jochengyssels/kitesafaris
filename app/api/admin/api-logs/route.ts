import { type NextRequest, NextResponse } from "next/server"

interface ApiCall {
  id: string
  timestamp: string
  method: string
  endpoint: string
  status: number
  responseTime: number
  service: string
  userAgent?: string
  ip?: string
}

// In-memory storage for demo - in production, use a database
let apiCallLogs: ApiCall[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
    method: "POST",
    endpoint: "/api/leads",
    status: 200,
    responseTime: 245,
    service: "airtable",
    userAgent: "Mozilla/5.0...",
    ip: "192.168.1.1",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    method: "GET",
    endpoint: "/api/pixabay/search",
    status: 200,
    responseTime: 180,
    service: "pixabay",
    userAgent: "Mozilla/5.0...",
    ip: "192.168.1.1",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    method: "POST",
    endpoint: "/api/trips",
    status: 201,
    responseTime: 312,
    service: "airtable",
    userAgent: "Mozilla/5.0...",
    ip: "192.168.1.1",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    method: "GET",
    endpoint: "/api/bookings",
    status: 500,
    responseTime: 5000,
    service: "airtable",
    userAgent: "Mozilla/5.0...",
    ip: "192.168.1.1",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const service = searchParams.get("service")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let filteredLogs = apiCallLogs

    if (service) {
      filteredLogs = apiCallLogs.filter((log) => log.service === service)
    }

    const paginatedLogs = filteredLogs.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: paginatedLogs,
      total: filteredLogs.length,
      limit,
      offset,
    })
  } catch (error) {
    console.error("Failed to retrieve API logs:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve API logs",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { method, endpoint, status, responseTime, service } = body

    const newLog: ApiCall = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      method,
      endpoint,
      status,
      responseTime,
      service,
      userAgent: request.headers.get("user-agent") || undefined,
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
    }

    apiCallLogs.unshift(newLog) // Add to beginning

    // Keep only last 1000 logs in memory
    if (apiCallLogs.length > 1000) {
      apiCallLogs = apiCallLogs.slice(0, 1000)
    }

    return NextResponse.json({
      success: true,
      data: newLog,
    })
  } catch (error) {
    console.error("Failed to log API call:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to log API call",
      },
      { status: 500 },
    )
  }
}

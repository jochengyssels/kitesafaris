import { type NextRequest, NextResponse } from "next/server"

interface MonitoringStats {
  period: string
  totalRequests: number
  successRate: number
  avgResponseTime: number
  errorCount: number
  topEndpoints: Array<{
    endpoint: string
    count: number
    avgTime: number
  }>
  hourlyData: Array<{
    hour: string
    requests: number
    errors: number
  }>
  serviceBreakdown: Record<
    string,
    {
      requests: number
      errors: number
      avgResponseTime: number
    }
  >
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "24h"

    // Mock data - in production, calculate from actual logs
    const stats: MonitoringStats = {
      period,
      totalRequests: 156,
      successRate: 98.7,
      avgResponseTime: 245,
      errorCount: 2,
      topEndpoints: [
        { endpoint: "/api/trips", count: 47, avgTime: 180 },
        { endpoint: "/api/pixabay/search", count: 23, avgTime: 320 },
        { endpoint: "/api/leads", count: 18, avgTime: 150 },
        { endpoint: "/api/bookings", count: 15, avgTime: 280 },
        { endpoint: "/api/email/send", count: 12, avgTime: 420 },
      ],
      hourlyData: Array.from({ length: 24 }, (_, i) => ({
        hour: String(i).padStart(2, "0") + ":00",
        requests: Math.floor(Math.random() * 30) + 5,
        errors: Math.random() > 0.9 ? 1 : 0,
      })),
      serviceBreakdown: {
        airtable: {
          requests: 80,
          errors: 1,
          avgResponseTime: 245,
        },
        pixabay: {
          requests: 23,
          errors: 0,
          avgResponseTime: 180,
        },
        email: {
          requests: 12,
          errors: 1,
          avgResponseTime: 320,
        },
        webhooks: {
          requests: 0,
          errors: 0,
          avgResponseTime: 0,
        },
      },
    }

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Failed to retrieve monitoring stats:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve monitoring stats",
      },
      { status: 500 },
    )
  }
}

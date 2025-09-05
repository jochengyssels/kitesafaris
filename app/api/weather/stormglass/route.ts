import { NextRequest, NextResponse } from "next/server"
import { stormglassService } from "@/lib/stormglass-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hours = parseInt(searchParams.get('hours') || '24')
    const lat = parseFloat(searchParams.get('lat') || '39.112133995367714')
    const lng = parseFloat(searchParams.get('lng') || '8.437520043416788')

    // Validate parameters
    if (hours < 1 || hours > 168) { // Max 7 days
      return NextResponse.json(
        { error: "Invalid hours parameter. Must be between 1 and 168." },
        { status: 400 }
      )
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return NextResponse.json(
        { error: "Invalid coordinates." },
        { status: 400 }
      )
    }

    const forecast = await stormglassService.getWindForecast(lat, lng, hours)

    return NextResponse.json({
      success: true,
      data: forecast,
      location: {
        lat,
        lng,
        name: "Punta Trettu, Sardinia"
      },
      requestedHours: hours,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=7200" // Cache for 1 hour, stale for 2 hours
      }
    })

  } catch (error: any) {
    console.error('Stormglass API route error:', error)

    // Check if it's an API key error
    if (error.message?.includes('API key not configured')) {
      return NextResponse.json(
        { 
          error: "Weather service not configured",
          message: "Stormglass API key is not configured. Please contact the administrator."
        },
        { status: 503 }
      )
    }

    // Check if it's an invalid API key error
    if (error.message?.includes('Invalid API key')) {
      return NextResponse.json(
        { 
          error: "Invalid API key",
          message: "The Stormglass API key is invalid. Please check your API key configuration."
        },
        { status: 503 }
      )
    }

    // Check if it's a rate limit or quota error
    if (error.message?.includes('quota') || error.message?.includes('limit')) {
      return NextResponse.json(
        { 
          error: "Weather service temporarily unavailable",
          message: "Weather forecast service is currently at capacity. Please try again later."
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { 
        error: "Weather forecast unavailable",
        message: "Unable to fetch weather forecast data. Please try again later."
      },
      { status: 503 }
    )
  }
}

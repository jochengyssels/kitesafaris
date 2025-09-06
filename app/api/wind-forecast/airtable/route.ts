import { NextRequest, NextResponse } from "next/server"
import { AirtableService } from "@/lib/airtable"

interface WindForecastData {
  time: string
  windSpeed: number
  windDirection: number
  windGust: number
  temperature: number
  humidity: number
  windDirectionCardinal: string
}

interface WindForecastResponse {
  success: boolean
  data: WindForecastData[]
  location: {
    lat: number
    lng: number
    name: string
  }
  requestedHours: number
  timestamp: string
  source: 'airtable' | 'fallback'
  message?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hours = parseInt(searchParams.get('hours') || '24')
    const lat = parseFloat(searchParams.get('lat') || '39.112133995367714')
    const lng = parseFloat(searchParams.get('lng') || '8.437520043416788')
    const locationName = searchParams.get('location') || 'Punta Trettu, Sardinia'

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

    const airtable = new AirtableService()
    
    // Calculate time range for the request
    const now = new Date()
    const startTime = new Date(now.getTime() - hours * 60 * 60 * 1000)
    
    console.log(`[Wind Forecast API] Fetching ${hours} hours of data from Airtable`)
    console.log(`[Wind Forecast API] Time range: ${startTime.toISOString()} to ${now.toISOString()}`)

    // Fetch records from Airtable
    const records = await airtable.getRecords('wind_forecasts', {
      maxRecords: 1000,
      filterByFormula: `AND(
        {location_name} = "${locationName}",
        {forecast_time} >= "${startTime.toISOString()}",
        {forecast_time} <= "${now.toISOString()}"
      )`,
      sort: [{ field: 'forecast_time', direction: 'asc' }]
    })

    if (!records.records || records.records.length === 0) {
      console.log('[Wind Forecast API] No data found in Airtable, falling back to Stormglass')
      
      // Fallback to direct Stormglass API call
      const { stormglassService } = await import('@/lib/stormglass-service')
      const fallbackData = await stormglassService.getWindForecast(lat, lng, hours)
      
      return NextResponse.json({
        success: true,
        data: fallbackData,
        location: {
          lat,
          lng,
          name: locationName
        },
        requestedHours: hours,
        timestamp: new Date().toISOString(),
        source: 'fallback',
        message: 'Using fallback data from Stormglass API'
      } as WindForecastResponse, {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=600" // Cache for 5 minutes
        }
      })
    }

    // Transform Airtable records to the expected format
    const forecastData: WindForecastData[] = records.records.map(record => ({
      time: record.fields.forecast_time as string,
      windSpeed: record.fields.wind_speed_knots as number,
      windDirection: record.fields.wind_direction_degrees as number,
      windGust: record.fields.wind_gust_knots as number,
      temperature: record.fields.temperature_celsius as number,
      humidity: record.fields.humidity_percent as number,
      windDirectionCardinal: record.fields.wind_direction_cardinal as string
    }))

    // Sort by time to ensure chronological order
    forecastData.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

    // Limit to requested hours (take the most recent data)
    const limitedData = forecastData.slice(-hours)

    console.log(`[Wind Forecast API] Returning ${limitedData.length} records from Airtable`)

    return NextResponse.json({
      success: true,
      data: limitedData,
      location: {
        lat,
        lng,
        name: locationName
      },
      requestedHours: hours,
      timestamp: new Date().toISOString(),
      source: 'airtable',
      message: `Retrieved ${limitedData.length} forecast points from Airtable`
    } as WindForecastResponse, {
      headers: {
        "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600" // Cache for 30 minutes
      }
    })

  } catch (error: any) {
    console.error('[Wind Forecast API] Error:', error)
    
    // Try fallback to Stormglass API
    try {
      console.log('[Wind Forecast API] Attempting fallback to Stormglass API')
      const { stormglassService } = await import('@/lib/stormglass-service')
      
      const { searchParams } = new URL(request.url)
      const hours = parseInt(searchParams.get('hours') || '24')
      const lat = parseFloat(searchParams.get('lat') || '39.112133995367714')
      const lng = parseFloat(searchParams.get('lng') || '8.437520043416788')
      const locationName = searchParams.get('location') || 'Punta Trettu, Sardinia'
      
      const fallbackData = await stormglassService.getWindForecast(lat, lng, hours)
      
      return NextResponse.json({
        success: true,
        data: fallbackData,
        location: {
          lat,
          lng,
          name: locationName
        },
        requestedHours: hours,
        timestamp: new Date().toISOString(),
        source: 'fallback',
        message: 'Using fallback data from Stormglass API due to Airtable error'
      } as WindForecastResponse, {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=600" // Cache for 5 minutes
        }
      })
    } catch (fallbackError: any) {
      console.error('[Wind Forecast API] Fallback also failed:', fallbackError)
      
      return NextResponse.json({
        success: false,
        message: 'Failed to retrieve wind forecast data from both Airtable and Stormglass',
        error: error.message,
        fallbackError: fallbackError.message,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
  }
}

// POST endpoint for manual data refresh (admin use)
export async function POST(request: NextRequest) {
  try {
    // Check if this is an admin request
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.ADMIN_API_SECRET
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized access'
      }, { status: 401 })
    }

    // Trigger the scheduler to fetch new data
    const schedulerResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/wind-forecast/scheduler`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WIND_SCHEDULER_SECRET || 'manual-trigger'}`,
        'Content-Type': 'application/json'
      }
    })

    const schedulerResult = await schedulerResponse.json()

    return NextResponse.json({
      success: true,
      message: 'Manual data refresh triggered',
      schedulerResult,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('[Wind Forecast API] Manual refresh error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to trigger manual data refresh',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

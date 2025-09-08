import { NextRequest, NextResponse } from 'next/server'
import { stormglassService } from '@/lib/stormglass-service'

// Simple in-memory cache (in production, use Redis or similar)
const weatherCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

interface WeatherRequest {
  destination: string
  coordinates?: {
    lat: number
    lng: number
  }
  hours?: number
}

interface WeatherResponse {
  success: boolean
  data?: {
    current: any
    forecast: any[]
    lastUpdated: string
  }
  error?: string
  cached?: boolean
}

// Destination coordinates mapping
const DESTINATION_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "Sardinia": { lat: 39.112133995367714, lng: 8.437520043416788 },
  "Antigua": { lat: 17.0608, lng: -61.7964 },
  "Barbados": { lat: 13.1939, lng: -59.5432 },
  "Grenada": { lat: 12.1165, lng: -61.6790 },
  "St. Lucia": { lat: 13.9094, lng: -60.9789 },
  "Dominica": { lat: 15.4150, lng: -61.3710 },
  "St. Vincent": { lat: 13.2528, lng: -61.1971 },
  "Tobago": { lat: 11.1800, lng: -60.7200 },
  "Trinidad": { lat: 10.6918, lng: -61.2225 }
}

export async function POST(request: NextRequest): Promise<NextResponse<WeatherResponse>> {
  try {
    const body: WeatherRequest = await request.json()
    
    // Validate required fields
    if (!body.destination) {
      return NextResponse.json({
        success: false,
        error: 'Destination is required'
      }, { status: 400 })
    }

    // Get coordinates for the destination
    const getDestinationCoordinates = () => {
      if (body.coordinates) return body.coordinates
      
      // Try to find coordinates by destination name
      const destKey = Object.keys(DESTINATION_COORDINATES).find(key => 
        body.destination.toLowerCase().includes(key.toLowerCase())
      )
      
      if (destKey) {
        return DESTINATION_COORDINATES[destKey]
      }
      
      // Default to Sardinia if no match found
      return DESTINATION_COORDINATES["Sardinia"]
    }

    const coords = getDestinationCoordinates()
    const cacheKey = `${coords.lat},${coords.lng},${body.hours || 6}`
    
    // Check cache first
    const cachedData = weatherCache.get(cacheKey)
    if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: {
          ...cachedData.data,
          cached: true
        },
        cached: true
      })
    }

    // Fetch fresh data from Stormglass
    const hours = body.hours || 6
    const [current, forecast] = await Promise.all([
      stormglassService.getCurrentWindConditions(),
      stormglassService.getWindForecast(coords.lat, coords.lng, hours)
    ])

    const weatherData = {
      current,
      forecast,
      lastUpdated: new Date().toISOString()
    }

    // Cache the data
    weatherCache.set(cacheKey, {
      data: weatherData,
      timestamp: Date.now()
    })

    // Clean up old cache entries (keep only last 100 entries)
    if (weatherCache.size > 100) {
      const entries = Array.from(weatherCache.entries())
      entries.sort((a, b) => b[1].timestamp - a[1].timestamp)
      weatherCache.clear()
      entries.slice(0, 100).forEach(([key, value]) => {
        weatherCache.set(key, value)
      })
    }

    return NextResponse.json({
      success: true,
      data: weatherData,
      cached: false
    })

  } catch (error) {
    console.error('Weather API error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch weather data'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest): Promise<NextResponse<WeatherResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const destination = searchParams.get('destination')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const hours = searchParams.get('hours')

    if (!destination) {
      return NextResponse.json({
        success: false,
        error: 'Destination parameter is required'
      }, { status: 400 })
    }

    // Convert to POST request format
    const requestBody: WeatherRequest = {
      destination,
      coordinates: lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : undefined,
      hours: hours ? parseInt(hours) : undefined
    }

    // Create a mock request object
    const mockRequest = {
      json: async () => requestBody
    } as NextRequest

    return POST(mockRequest)

  } catch (error) {
    console.error('Weather API GET error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch weather data'
    }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

console.log("[v0] Destinations API Route - Environment check:", {
  hasApiKey: !!AIRTABLE_API_KEY,
  hasBaseId: !!AIRTABLE_BASE_ID,
  apiUrl: AIRTABLE_API_URL,
})

interface AirtableDestination {
  id: string
  fields: {
    // New Airtable schema fields
    destination_id?: string
    destination_name?: string
    country?: string
    flag_emoji?: string
    hero_title?: string
    hero_description?: string
    short_description?: string
    best_months?: string
    wind_conditions?: string
    avg_wind_speed?: string
    water_temperature?: string
    air_temperature?: string
    skill_levels?: string
    kite_spots?: string
    price_from?: number
    airport_code?: string
    transfer_time?: string
    highlights?: string[]
    activities?: string[]
    accommodation_type?: string
    group_size_max?: number
    duration_options?: string
    gallery_keywords?: string
    latitude?: number
    longitude?: number
    seo_title?: string
    seo_description?: string
    is_active?: boolean
    featured_destination?: boolean
    sort_order?: number
    created_date?: string
    last_modified?: string
    // Legacy field names for backward compatibility
    name?: string
    location?: string
    headline?: string
    description?: string
    image?: string
    icon?: string
    available?: boolean
    basePrice?: number
    currency?: string
    windRating?: number
    difficulty?: string
    season?: string
    windSpeed?: string
    culture?: string
    coordinates?: {
      lat: number
      lng: number
    }
    intro?: string
    tripHighlights?: string[]
    itinerary?: Array<{
      day: number
      title: string
      description: string
      activities: string[]
    }>
    gallery?: string[]
  }
}

interface Destination {
  id: string
  name: string
  location: string
  headline: string
  description: string
  image: string
  icon: string
  available: boolean
  basePrice: number
  currency: string
  windRating: number
  difficulty: string
  season: string
  windSpeed: string
  culture: string
  highlights: string[]
  coordinates: {
    lat: number
    lng: number
  }
  intro: string
  tripHighlights: string[]
  itinerary: Array<{
    day: number
    title: string
    description: string
    activities: string[]
  }>
  gallery: string[]
}

const convertFromAirtable = (airtableDestination: AirtableDestination): Destination => {
  // Use the new destination_name field as primary, with fallbacks
  const destinationName = airtableDestination.fields.destination_name || 
                         airtableDestination.fields.name || 
                         "Destination Name Not Provided"
  
  // Map destination names to correct images
  const getDestinationImage = (name: string): string => {
    const normalizedName = name.toLowerCase()
    if (normalizedName.includes('antigua')) {
      return "/antigua-aerial-harbor-view.jpg"
    } else if (normalizedName.includes('greece')) {
      return "https://daggzx92agk0rfom.public.blob.vercel-storage.com/greece:img-catamaran-shore-heli.jpg"
    } else if (normalizedName.includes('sardinia')) {
      return "/sardinia-punta-trettu-kiteboarding-mediterranean-c.png"
    } else if (normalizedName.includes('caribbean')) {
      return "https://daggzx92agk0rfom.public.blob.vercel-storage.com/antigua:img-heli-kiters.jpg"
    }
    return "/antigua-aerial-harbor-view.jpg" // Default fallback
  }
  
  return {
    id: airtableDestination.id,
    name: destinationName,
    location: airtableDestination.fields.country || airtableDestination.fields.location || "Location Not Provided",
    headline: airtableDestination.fields.hero_title || airtableDestination.fields.headline || "Amazing Kiteboarding Destination",
    description: airtableDestination.fields.short_description || airtableDestination.fields.description || "Experience world-class kiteboarding in this incredible location.",
    image: getDestinationImage(destinationName),
    icon: airtableDestination.fields.flag_emoji || airtableDestination.fields.icon || "Anchor",
    available: (() => {
      const isActive = airtableDestination.fields.is_active
      const result = isActive === true || isActive === 'TRUE' || isActive === 'true'
      console.log("[v0] is_active conversion:", { 
        original: isActive, 
        type: typeof isActive, 
        result: result 
      })
      return result
    })(),
    basePrice: airtableDestination.fields.price_from || airtableDestination.fields.basePrice || 2700,
    currency: "EUR", // Default to EUR for all destinations
    windRating: 5, // Default wind rating
    difficulty: airtableDestination.fields.skill_levels || airtableDestination.fields.difficulty || "All Levels",
    season: airtableDestination.fields.best_months || airtableDestination.fields.season || "Year Round",
    windSpeed: airtableDestination.fields.avg_wind_speed || airtableDestination.fields.windSpeed || "15-25 knots",
    culture: airtableDestination.fields.country || airtableDestination.fields.culture || "Local culture and traditions",
    highlights: airtableDestination.fields.highlights || [],
    coordinates: {
      lat: airtableDestination.fields.latitude || 0,
      lng: airtableDestination.fields.longitude || 0
    },
    intro: airtableDestination.fields.hero_description || airtableDestination.fields.intro || "Welcome to this amazing kiteboarding destination.",
    tripHighlights: airtableDestination.fields.activities || airtableDestination.fields.tripHighlights || [],
    itinerary: airtableDestination.fields.itinerary || [],
    gallery: airtableDestination.fields.gallery || [],
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error("[v0] Missing environment variables for Airtable API")
      return NextResponse.json(
        { error: "Airtable API configuration missing" },
        { status: 500 }
      )
    }

    console.log("[v0] GET /api/destinations - Starting request")
    console.log("[v0] Request timestamp:", new Date().toISOString())
    console.log("[v0] Node.js version:", process.version)
    console.log("[v0] Environment:", process.env.NODE_ENV)

    const url = `${AIRTABLE_API_URL}/Destinations`
    console.log("[v0] Fetching from URL:", url)

    const headers = {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    }

    console.log("[v0] Request headers:", {
      Authorization: `Bearer ${AIRTABLE_API_KEY.substring(0, 10)}...`,
      "Content-Type": "application/json",
    })

    console.log("[v0] About to make fetch request...")
    const startTime = Date.now()
    const response = await fetch(url, { headers })
    const fetchTime = Date.now() - startTime
    console.log("[v0] Fetch completed in:", fetchTime, "ms")

    console.log("[v0] Response received - status:", response.status)
    console.log("[v0] Response statusText:", response.statusText)
    console.log("[v0] Response ok:", response.ok)
    console.log("[v0] Response type:", response.type)
    console.log("[v0] Response url:", response.url)

    const responseHeaders: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })
    console.log("[v0] Response headers:", responseHeaders)

    if (!response.ok) {
      console.error("[v0] Airtable API error:", response.status, response.statusText)
      return NextResponse.json(
        { error: `Airtable API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      )
    }

    const rawResponseBody = await response.text()
    console.log("[v0] Raw response body length:", rawResponseBody.length)
    console.log("[v0] Raw response body (first 500 chars):", rawResponseBody.substring(0, 500))

    console.log("[v0] Response content-type:", response.headers.get("content-type"))

    let data: any
    try {
      console.log("[v0] Attempting to parse JSON...")
      data = JSON.parse(rawResponseBody)
      console.log("[v0] JSON parsed successfully")
    } catch (parseError) {
      console.error("[v0] JSON parse error:", parseError)
      return NextResponse.json(
        { error: "Failed to parse Airtable response" },
        { status: 500 }
      )
    }

    console.log("[v0] Data structure:", {
      hasRecords: !!data.records,
      recordCount: data.records?.length || 0,
      keys: Object.keys(data),
    })

    if (!data.records || !Array.isArray(data.records)) {
      console.error("[v0] Invalid data structure from Airtable")
      return NextResponse.json(
        { error: "Invalid data structure from Airtable" },
        { status: 500 }
      )
    }

    console.log("[v0] Airtable data received:", { recordCount: data.records.length })

    console.log("[v0] Converting", data.records.length, "records...")
    const destinations: Destination[] = []

    data.records.forEach((record: AirtableDestination, index: number) => {
      console.log("[v0] Converting record", index + ":", {
        id: record.id,
        fieldsKeys: Object.keys(record.fields || {}),
        is_active_value: record.fields.is_active,
        is_active_type: typeof record.fields.is_active,
      })

      try {
        const destination = convertFromAirtable(record)
        destinations.push(destination)
      } catch (conversionError) {
        console.error("[v0] Error converting record", index + ":", conversionError)
      }
    })

    console.log("[v0] Converted destinations:", destinations.length)
    if (destinations.length > 0) {
      console.log("[v0] Sample destination:", {
        id: destinations[0].id,
        name: destinations[0].name,
        location: destinations[0].location,
        available: destinations[0].available,
        basePrice: destinations[0].basePrice,
      })
    }

    console.log("[v0] Returning result with", destinations.length, "destinations")
    return NextResponse.json({ destinations })
  } catch (error) {
    console.error("[v0] Destinations API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

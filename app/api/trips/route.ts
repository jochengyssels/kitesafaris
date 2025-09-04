import { type NextRequest, NextResponse } from "next/server"

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

console.log("[v0] API Route - Environment check:", {
  hasApiKey: !!AIRTABLE_API_KEY,
  hasBaseId: !!AIRTABLE_BASE_ID,
  apiUrl: AIRTABLE_API_URL,
})

interface AirtableTrip {
  id: string
  fields: {
    // New Airtable schema fields
    trip_id?: string
    destination_id?: string
    trip_name?: string
    start_date?: string
    end_date?: string
    duration_days?: string
    price_eur?: string
    max_guests?: string
    spots_available?: string
    trip_status?: string
    description?: string
    inclusions?: string
    exclusions?: string
    special_notes?: string
    early_bird_discount?: string
    group_discount?: string
    booking_deadline?: string
    difficulty_level?: string
    wind_forecast?: string
    created_date?: string
    last_modified?: string
    // Legacy field names for backward compatibility
    destination?: string
    startDate?: string
    endDate?: string
    price?: number
    discountPercentage?: number
    currency?: string
    totalSpots?: number
    availableSpots?: number
    status?: string
    createdAt?: string
    updatedAt?: string
    period_start?: string
    period_end?: string
    discount_percent?: number
    total_spots?: number
    available_spots?: number
  }
}

interface Trip {
  id: string
  destination: "caribbean" | "greece" | "sardinia"
  startDate: string
  endDate: string
  price: number
  discountPercentage?: number
  currency: "EUR" | "USD"
  totalSpots: number
  availableSpots: number
  status: "available" | "low" | "full"
  createdAt: string
  updatedAt: string
}

const convertEuropeanDate = (dateStr: string | undefined): string => {
  try {
    // Handle undefined/null values
    if (!dateStr) {
      return ""
    }

    // If it's already in ISO format, return as is
    if (dateStr.includes("T") || dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateStr
    }

    // Handle European format dd/mm/yyyy
    if (dateStr.includes("/")) {
      const [day, month, year] = dateStr.split("/")
      if (day && month && year) {
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      }
    }

    // Return original if can't parse
    return dateStr
  } catch (error) {
    console.log("[v0] Date conversion error:", error)
    return dateStr || ""
  }
}

const convertFromAirtable = (airtableTrip: AirtableTrip): Trip => {
  // Use new schema fields with fallbacks to legacy fields
  const destinationId = airtableTrip.fields.destination_id || airtableTrip.fields.destination || "caribbean"
  const startDate = airtableTrip.fields.start_date || airtableTrip.fields.period_start || airtableTrip.fields.startDate
  const endDate = airtableTrip.fields.end_date || airtableTrip.fields.period_end || airtableTrip.fields.endDate
  const price = airtableTrip.fields.price_eur ? parseInt(airtableTrip.fields.price_eur) : (airtableTrip.fields.price || 0)
  const maxGuests = airtableTrip.fields.max_guests ? parseInt(airtableTrip.fields.max_guests) : (airtableTrip.fields.total_spots || airtableTrip.fields.totalSpots || 6)
  const availableSpots = airtableTrip.fields.spots_available ? parseInt(airtableTrip.fields.spots_available) : (airtableTrip.fields.available_spots || airtableTrip.fields.availableSpots || 0)
  const status = airtableTrip.fields.trip_status || airtableTrip.fields.status || "available"
  
  return {
    id: airtableTrip.fields.trip_id || airtableTrip.id, // Use trip_id from Airtable, fallback to record ID
    destination: (destinationId as Trip["destination"]) || "caribbean",
    startDate: convertEuropeanDate(startDate),
    endDate: convertEuropeanDate(endDate),
    price: price,
    discountPercentage: airtableTrip.fields.early_bird_discount ? 
      parseInt(airtableTrip.fields.early_bird_discount.replace('%', '')) : 
      (airtableTrip.fields.discount_percent || airtableTrip.fields.discountPercentage || 0),
    currency: "EUR" as const, // Default to EUR for all trips
    totalSpots: maxGuests,
    availableSpots: availableSpots,
    status: (status as Trip["status"]) || "available",
    createdAt: convertEuropeanDate(airtableTrip.fields.created_date || airtableTrip.fields.createdAt),
    updatedAt: convertEuropeanDate(airtableTrip.fields.last_modified || airtableTrip.fields.updatedAt),
  }
}

const convertToAirtable = (trip: Partial<Trip>) => ({
  trip_id: trip.id, // Include trip_id when creating/updating
  destination_id: trip.destination,
  start_date: trip.startDate,
  end_date: trip.endDate,
  price_eur: trip.price?.toString(),
  early_bird_discount: trip.discountPercentage?.toString() || "0",
  max_guests: trip.totalSpots?.toString(),
  spots_available: trip.availableSpots?.toString(),
  trip_status: trip.status,
  created_date: trip.createdAt,
  last_modified: trip.updatedAt,
})

// GET /api/trips - Get all trips
export async function GET() {
  try {
    console.log("[v0] GET /api/trips - Starting request")
    console.log("[v0] Request timestamp:", new Date().toISOString())
    console.log("[v0] Node.js version:", process.version)
    console.log("[v0] Environment:", process.env.NODE_ENV)

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.log("[v0] Missing Airtable configuration")
      console.log("[v0] AIRTABLE_API_KEY length:", AIRTABLE_API_KEY?.length || 0)
      console.log("[v0] AIRTABLE_BASE_ID:", AIRTABLE_BASE_ID || "undefined")
      return NextResponse.json(
        {
          error: "Airtable configuration missing",
          debug: {
            hasApiKey: !!AIRTABLE_API_KEY,
            hasBaseId: !!AIRTABLE_BASE_ID,
            apiKeyLength: AIRTABLE_API_KEY?.length || 0,
            baseId: AIRTABLE_BASE_ID || "undefined",
          },
        },
        { status: 500 },
      )
    }

    const url = `${AIRTABLE_API_URL}/Trips`
    console.log("[v0] Fetching from URL:", url)
    console.log("[v0] Request headers:", {
      Authorization: `Bearer ${AIRTABLE_API_KEY?.substring(0, 10)}...`,
      "Content-Type": "application/json",
    })

    console.log("[v0] About to make fetch request...")
    const fetchStart = Date.now()

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    const fetchDuration = Date.now() - fetchStart
    console.log("[v0] Fetch completed in:", fetchDuration, "ms")
    console.log("[v0] Response received - status:", response.status)
    console.log("[v0] Response statusText:", response.statusText)
    console.log("[v0] Response ok:", response.ok)
    console.log("[v0] Response type:", response.type)
    console.log("[v0] Response url:", response.url)
    console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log("[v0] Raw response body length:", responseText.length)
    console.log("[v0] Raw response body (first 500 chars):", responseText.substring(0, 500))
    console.log("[v0] Response content-type:", response.headers.get("content-type"))

    if (!response.ok) {
      console.log("[v0] Airtable error response (full):", responseText)
      return NextResponse.json(
        {
          error: `Airtable API error: ${response.status}`,
          debug: {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            body: responseText,
            url: url,
          },
        },
        { status: response.status },
      )
    }

    let data
    try {
      console.log("[v0] Attempting to parse JSON...")
      data = JSON.parse(responseText)
      console.log("[v0] JSON parsed successfully")
      console.log("[v0] Data structure:", {
        hasRecords: !!data.records,
        recordCount: data.records?.length || 0,
        keys: Object.keys(data),
      })
    } catch (parseError) {
      console.log("[v0] JSON parse error:", parseError)
      console.log("[v0] Failed to parse response as JSON")
      return NextResponse.json(
        {
          error: "Invalid JSON response from Airtable",
          debug: {
            parseError: parseError instanceof Error ? parseError.message : String(parseError),
            responseBody: responseText,
            contentType: response.headers.get("content-type"),
          },
        },
        { status: 500 },
      )
    }

    console.log("[v0] Airtable data received:", { recordCount: data.records?.length })

    if (!data.records || !Array.isArray(data.records)) {
      console.log("[v0] Invalid data structure - no records array")
      return NextResponse.json(
        {
          error: "Invalid data structure from Airtable",
          debug: {
            dataKeys: Object.keys(data),
            hasRecords: !!data.records,
            recordsType: typeof data.records,
          },
        },
        { status: 500 },
      )
    }

    console.log("[v0] Converting", data.records.length, "records...")
    const trips = data.records.map((record: AirtableTrip, index: number) => {
      console.log(`[v0] Converting record ${index}:`, {
        id: record.id,
        fieldsKeys: Object.keys(record.fields || {}),
      })
      return convertFromAirtable(record)
    })

    console.log("[v0] Converted trips:", trips.length)
    console.log("[v0] All converted trips:")
    trips.forEach((trip, index) => {
      console.log(`[v0] Trip ${index + 1}:`, {
        id: trip.id,
        destination: trip.destination,
        price: trip.price,
        discountPercentage: trip.discountPercentage,
        status: trip.status
      })
    })

    const result = { trips }
    console.log("[v0] Returning result with", result.trips.length, "trips")

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Unhandled error in GET /api/trips:", error)
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")
    console.error("[v0] Error name:", error instanceof Error ? error.name : "Unknown")
    console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))

    return NextResponse.json(
      {
        error: "Internal server error",
        debug: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          name: error instanceof Error ? error.name : "Unknown",
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    )
  }
}

// POST /api/trips - Create new trip
export async function POST(request: NextRequest) {
  try {
    console.log("[v0] POST /api/trips - Starting request")

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json({ error: "Airtable configuration missing" }, { status: 500 })
    }

    const tripData = await request.json()
    console.log("[v0] Creating trip with data:", tripData)

    const response = await fetch(`${AIRTABLE_API_URL}/Trips`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: convertToAirtable({
          ...tripData,
          id: `trip-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Create trip error:", errorText)
      return NextResponse.json(
        {
          error: `Airtable API error: ${response.status}`,
          debug: errorText,
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    const trip = convertFromAirtable(data)

    return NextResponse.json({ trip })
  } catch (error) {
    console.error("[v0] Unhandled error in POST /api/trips:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        debug: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

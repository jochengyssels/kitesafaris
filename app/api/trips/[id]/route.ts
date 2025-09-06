import { type NextRequest, NextResponse } from "next/server"

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

interface AirtableTrip {
  id: string
  fields: {
    destination: string
    startDate: string
    endDate: string
    price: number
    discountPercentage?: number
    currency: string
    totalSpots: number
    availableSpots: number
    status: string
    createdAt: string
    updatedAt: string
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

const convertFromAirtable = (airtableTrip: AirtableTrip): Trip => ({
  id: airtableTrip.id,
  destination: airtableTrip.fields.destination as Trip["destination"],
  startDate: airtableTrip.fields.startDate,
  endDate: airtableTrip.fields.endDate,
  price: airtableTrip.fields.price,
  discountPercentage: airtableTrip.fields.discountPercentage,
  currency: airtableTrip.fields.currency as Trip["currency"],
  totalSpots: airtableTrip.fields.totalSpots,
  availableSpots: airtableTrip.fields.availableSpots,
  status: airtableTrip.fields.status as Trip["status"],
  createdAt: airtableTrip.fields.createdAt,
  updatedAt: airtableTrip.fields.updatedAt,
})

const convertToAirtable = (trip: Partial<Trip>) => ({
  destination: trip.destination,
  startDate: trip.startDate,
  endDate: trip.endDate,
  price: trip.price,
  discountPercentage: trip.discountPercentage,
  currency: trip.currency,
  totalSpots: trip.totalSpots,
  availableSpots: trip.availableSpots,
  status: trip.status,
  createdAt: trip.createdAt,
  updatedAt: trip.updatedAt,
})

// PUT /api/trips/[id] - Update trip
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json({ error: "Airtable configuration missing" }, { status: 500 })
    }

    const { id } = await params
    const updates = await request.json()

    const response = await fetch(`${AIRTABLE_API_URL}/Trips/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: convertToAirtable({
          ...updates,
          updatedAt: new Date().toISOString(),
        }),
      }),
    })

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`)
    }

    const data = await response.json()
    const trip = convertFromAirtable(data)

    return NextResponse.json({ trip })
  } catch (error) {
    console.error("Error updating trip:", error)
    return NextResponse.json({ error: "Failed to update trip" }, { status: 500 })
  }
}

// DELETE /api/trips/[id] - Delete trip
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json({ error: "Airtable configuration missing" }, { status: 500 })
    }

    const { id } = await params
    const response = await fetch(`${AIRTABLE_API_URL}/Trips/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting trip:", error)
    return NextResponse.json({ error: "Failed to delete trip" }, { status: 500 })
  }
}

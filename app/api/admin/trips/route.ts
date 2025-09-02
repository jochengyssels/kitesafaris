import { NextRequest, NextResponse } from 'next/server'

interface TripData {
  trip_id: string
  destination: string
  period_start: string
  period_end: string
  price: number
  available_spots: number
  discount_percent: number
  destination_id: string
  status?: 'active' | 'full' | 'cancelled' | 'draft'
}

interface TripResponse {
  success: boolean
  message: string
  trip?: any
  errors?: string[]
}

// Helper function to validate trip data
function validateTripData(data: Partial<TripData>): string[] {
  const errors: string[] = []
  
  if (!data.trip_id) errors.push('Trip ID is required')
  if (!data.destination) errors.push('Destination is required')
  if (!data.period_start) errors.push('Start date is required')
  if (!data.period_end) errors.push('End date is required')
  if (!data.price || data.price <= 0) errors.push('Valid price is required')
  if (!data.available_spots || data.available_spots < 0) errors.push('Valid available spots is required')
  if (!data.destination_id) errors.push('Destination ID is required')
  
  // Validate date format and logic
  if (data.period_start && data.period_end) {
    const startDate = new Date(data.period_start)
    const endDate = new Date(data.period_end)
    
    if (isNaN(startDate.getTime())) errors.push('Invalid start date format')
    if (isNaN(endDate.getTime())) errors.push('Invalid end date format')
    if (startDate >= endDate) errors.push('End date must be after start date')
  }
  
  return errors
}

export async function POST(request: NextRequest): Promise<NextResponse<TripResponse>> {
  try {
    const body: TripData = await request.json()
    
    console.log('[v0] Creating new trip:', body)
    
    // Validate trip data
    const errors = validateTripData(body)
    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors
      }, { status: 400 })
    }
    
    // Prepare Airtable record
    const airtableRecord = {
      fields: {
        trip_id: body.trip_id,
        destination: body.destination,
        period_start: body.period_start,
        period_end: body.period_end,
        price: body.price,
        available_spots: body.available_spots,
        discount_percent: body.discount_percent || 0,
        destination_id: body.destination_id,
        status: body.status || 'active'
      }
    }
    
    // Create record in Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Trips`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ records: [airtableRecord] })
      }
    )
    
    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.text()
      console.error('[v0] Airtable error:', errorData)
      throw new Error(`Airtable API error: ${airtableResponse.status}`)
    }
    
    const airtableData = await airtableResponse.json()
    const createdTrip = airtableData.records?.[0]
    
    console.log('[v0] Trip created successfully:', createdTrip)
    
    return NextResponse.json({
      success: true,
      message: 'Trip created successfully',
      trip: createdTrip
    })
    
  } catch (error) {
    console.error('[v0] Trip creation error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to create trip'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse<TripResponse>> {
  try {
    const body: { id: string } & Partial<TripData> = await request.json()
    
    console.log('[v0] Updating trip:', body.id)
    
    if (!body.id) {
      return NextResponse.json({
        success: false,
        message: 'Trip ID is required for updates'
      }, { status: 400 })
    }
    
    // Validate trip data (excluding required fields for updates)
    const errors = validateTripData(body)
    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors
      }, { status: 400 })
    }
    
    // Prepare Airtable record for update
    const airtableRecord = {
      id: body.id,
      fields: {
        ...(body.trip_id && { trip_id: body.trip_id }),
        ...(body.destination && { destination: body.destination }),
        ...(body.period_start && { period_start: body.period_start }),
        ...(body.period_end && { period_end: body.period_end }),
        ...(body.price && { price: body.price }),
        ...(body.available_spots !== undefined && { available_spots: body.available_spots }),
        ...(body.discount_percent !== undefined && { discount_percent: body.discount_percent }),
        ...(body.destination_id && { destination_id: body.destination_id }),
        ...(body.status && { status: body.status })
      }
    }
    
    // Update record in Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Trips`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ records: [airtableRecord] })
      }
    )
    
    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.text()
      console.error('[v0] Airtable update error:', errorData)
      throw new Error(`Airtable API error: ${airtableResponse.status}`)
    }
    
    const airtableData = await airtableResponse.json()
    const updatedTrip = airtableData.records?.[0]
    
    console.log('[v0] Trip updated successfully:', updatedTrip)
    
    return NextResponse.json({
      success: true,
      message: 'Trip updated successfully',
      trip: updatedTrip
    })
    
  } catch (error) {
    console.error('[v0] Trip update error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to update trip'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse<TripResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const tripId = searchParams.get('id')
    
    if (!tripId) {
      return NextResponse.json({
        success: false,
        message: 'Trip ID is required for deletion'
      }, { status: 400 })
    }
    
    console.log('[v0] Deleting trip:', tripId)
    
    // Delete record from Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Trips/${tripId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
        }
      }
    )
    
    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.text()
      console.error('[v0] Airtable deletion error:', errorData)
      throw new Error(`Airtable API error: ${airtableResponse.status}`)
    }
    
    console.log('[v0] Trip deleted successfully')
    
    return NextResponse.json({
      success: true,
      message: 'Trip deleted successfully'
    })
    
  } catch (error) {
    console.error('[v0] Trip deletion error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to delete trip'
    }, { status: 500 })
  }
}

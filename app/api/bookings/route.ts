import { NextRequest, NextResponse } from 'next/server'
import { calcCabinPricing } from '@/lib/booking/pricing'

interface BookingRequest {
  tripId: string
  groupSize: number
  destination: string
  yacht: string
  guests: Array<{
    name: string
    email: string
    phone: string
    dietary: string
  }>
  pricing: {
    total: number
    breakdown: Array<{ item: string; amount: number }>
    // Cabin-specific pricing fields
    cabinsRequired?: number
    cabinsAvailable?: number
    valid?: boolean
    errorMessage?: string
  }
  paymentMethod: 'card' | 'paypal'
}

interface BookingResponse {
  success: boolean
  bookingId?: string
  message: string
  errors?: string[]
}

export async function POST(request: NextRequest): Promise<NextResponse<BookingResponse>> {
  try {
    const body: BookingRequest = await request.json()
    
    console.log('[v0] Booking submission received:', {
      tripId: body.tripId,
      destination: body.destination,
      groupSize: body.groupSize,
      paymentMethod: body.paymentMethod,
      total: body.pricing.total
    })

    // Validate required fields
    const errors: string[] = []
    if (!body.tripId) errors.push('Trip ID is required')
    if (!body.destination) errors.push('Destination is required')
    if (body.groupSize < 1) errors.push('Group size must be at least 1')
    if (!body.guests || body.guests.length === 0) errors.push('Guest information is required')
    if (!body.pricing?.total || body.pricing.total <= 0) errors.push('Valid pricing is required')

    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors
      }, { status: 400 })
    }

    // Check trip availability
    const tripResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/trips`)
    if (!tripResponse.ok) {
      throw new Error('Failed to fetch trip data')
    }

    const tripsData = await tripResponse.json()
    const selectedTrip = tripsData.trips?.find((trip: any) => trip.id === body.tripId)

    if (!selectedTrip) {
      return NextResponse.json({
        success: false,
        message: 'Selected trip not found'
      }, { status: 404 })
    }

    // Validate per-cabin pricing and availability
    const pricingResult = calcCabinPricing({
      pricePerCabinEur: selectedTrip.price,
      numGuests: body.groupSize,
      spotsLeft: selectedTrip.availableSpots,
      cabinsTotal: 3
    })

    if (!pricingResult.valid) {
      return NextResponse.json({
        success: false,
        message: pricingResult.errorMessage || 'Not enough cabins available for this group size'
      }, { status: 409 })
    }

    // Apply trip-specific discount if available
    let finalTotal = pricingResult.total
    if (selectedTrip.discountPercentage && selectedTrip.discountPercentage > 0) {
      const discountAmount = pricingResult.total * (selectedTrip.discountPercentage / 100)
      finalTotal = pricingResult.total - discountAmount
    }

    // Verify the pricing matches what was sent from the client (including discounts)
    if (Math.abs(finalTotal - body.pricing.total) > 0.01) {
      return NextResponse.json({
        success: false,
        message: 'Pricing mismatch detected. Please refresh and try again.'
      }, { status: 409 })
    }

    // Generate booking ID
    const bookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // TODO: In a real implementation, you would:
    // 1. Create booking record in database
    // 2. Update trip availability in Airtable (atomic update: decrement spots_left by groupSize)
    //    - Use compare-and-swap to prevent race conditions
    //    - If update fails due to concurrent booking, return 409 to retry
    // 3. Send confirmation emails
    // 4. Process payment via Stripe/PayPal
    // 5. Log booking for admin review
    // 6. Store cabin-specific booking data:
    //    - pricing_model: 'per_cabin'
    //    - cabins_reserved: pricingResult.cabinsRequired
    //    - total_eur: pricingResult.total
    //    - guests: body.groupSize
    //    - price_per_person_hint_eur: pricingResult.pricePerPerson

    console.log('[v0] Booking would be created:', {
      bookingId,
      tripId: body.tripId,
      destination: body.destination,
      groupSize: body.groupSize,
      cabinsRequired: pricingResult.cabinsRequired,
      cabinsAvailable: pricingResult.cabinsAvailable,
      baseTotal: pricingResult.total,
      discountPercentage: selectedTrip.discountPercentage || 0,
      discountAmount: selectedTrip.discountPercentage ? pricingResult.total * (selectedTrip.discountPercentage / 100) : 0,
      finalTotal: body.pricing.total,
      pricePerPerson: finalTotal / body.groupSize,
      paymentMethod: body.paymentMethod,
      guests: body.guests.length
    })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Booking submitted successfully'
    })

  } catch (error) {
    console.error('[v0] Booking submission error:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}

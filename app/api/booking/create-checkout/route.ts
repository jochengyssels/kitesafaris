import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { calcCabinPricing } from '@/lib/booking/pricing'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export interface CheckoutRequest {
  name: string
  email: string
  phone?: string
  tripId: string
  destination: string
  startDate: string
  endDate: string
  guests: number
  cabinsRequired: number
  totalEur: number
  pricePerPerson: number
  tripTitle: string
  pricePerCabinEur: number
  spotsLeft: number
}

export interface CheckoutResponse {
  success: boolean
  message: string
  checkoutUrl?: string
  sessionId?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<CheckoutResponse>> {
  try {
    const body: CheckoutRequest = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.tripId || !body.destination) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: name, email, tripId, destination'
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email format'
      }, { status: 400 })
    }

    // Re-validate pricing and inventory on server side
    const pricingResult = calcCabinPricing({
      pricePerCabinEur: body.pricePerCabinEur,
      numGuests: body.guests,
      spotsLeft: body.spotsLeft,
      cabinsTotal: 3
    })

    if (!pricingResult.valid) {
      return NextResponse.json({
        success: false,
        message: pricingResult.errorMessage || 'Not enough spots or cabins available'
      }, { status: 409 })
    }

    // Verify the total matches what was calculated
    if (Math.abs(pricingResult.total - body.totalEur) > 0.01) {
      return NextResponse.json({
        success: false,
        message: 'Pricing mismatch detected. Please refresh and try again.'
      }, { status: 409 })
    }

    // Calculate deposit amount (25% of total)
    const depositRate = parseFloat(process.env.DEPOSIT_RATE || '0.25')
    const depositAmount = Math.round(pricingResult.total * depositRate)

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Cabin Deposit - ${body.tripTitle}`,
              description: `${body.destination} Trip (${new Date(body.startDate).toLocaleDateString()} - ${new Date(body.endDate).toLocaleDateString()}) - ${body.cabinsRequired} cabin${body.cabinsRequired > 1 ? 's' : ''}`,
            },
            unit_amount: depositAmount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking?step=3`,
      customer_email: body.email,
      metadata: {
        tripId: body.tripId,
        destination: body.destination,
        startDate: body.startDate,
        endDate: body.endDate,
        guests: body.guests.toString(),
        cabinsRequired: body.cabinsRequired.toString(),
        totalEur: pricingResult.total.toString(),
        depositEur: depositAmount.toString(),
        pricePerPerson: pricingResult.pricePerPerson.toString(),
        pricingModel: 'per_cabin',
        customerName: body.name,
        customerPhone: body.phone || '',
        tripTitle: body.tripTitle,
        pricePerCabinEur: body.pricePerCabinEur.toString(),
        spotsLeft: body.spotsLeft.toString(),
        depositRate: depositRate.toString()
      },
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
    })

    console.log(`[Checkout API] Created Stripe session ${session.id} for ${body.name} - Trip: ${body.tripId} - Deposit: €${depositAmount}`)

    return NextResponse.json({
      success: true,
      message: 'Checkout session created successfully',
      checkoutUrl: session.url!,
      sessionId: session.id
    })

  } catch (error) {
    console.error('[Checkout API] Error:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({
        success: false,
        message: `Payment processing error: ${error.message}`
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to create checkout session. Please try again.'
    }, { status: 500 })
  }
}

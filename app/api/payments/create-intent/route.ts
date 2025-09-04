import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, metadata } = body

    // Validate required fields
    if (!amount || !metadata) {
      return NextResponse.json(
        { error: 'Missing required fields: amount and metadata' },
        { status: 400 }
      )
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be a positive number.' },
        { status: 400 }
      )
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key not configured')
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        bookingId: metadata.bookingId,
        tripId: metadata.tripId,
        destination: metadata.destination,
        groupSize: metadata.groupSize.toString(),
        email: metadata.email,
        firstName: metadata.firstName,
        lastName: metadata.lastName,
        source: 'kitesafaris-booking',
      },
      description: `KiteSafaris Trip Booking - ${metadata.destination}`,
      receipt_email: metadata.email,
      statement_descriptor: 'KITESAFARIS',
      statement_descriptor_suffix: 'TRIP',
    })

    console.log(`[v0] Stripe payment intent created: ${paymentIntent.id} for booking: ${metadata.bookingId}`)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })

  } catch (error) {
    console.error('[v0] Stripe payment intent creation error:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}

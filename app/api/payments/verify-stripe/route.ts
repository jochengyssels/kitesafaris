import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session ID' },
        { status: 400 }
      )
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key not configured')
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      )
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'line_items'],
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Get payment intent details
    const paymentIntent = session.payment_intent as Stripe.PaymentIntent
    if (!paymentIntent) {
      return NextResponse.json(
        { error: 'Payment intent not found' },
        { status: 400 }
      )
    }

    // Extract metadata
    const metadata = paymentIntent.metadata
    const amount = paymentIntent.amount / 100 // Convert from cents

    console.log(`[v0] Stripe payment verified for session: ${sessionId}, amount: ${amount}`)

    // Create payment data object
    const paymentData = {
      orderID: session.id,
      paymentIntentId: paymentIntent.id,
      status: 'completed',
      amount,
      currency: paymentIntent.currency.toUpperCase(),
      paymentMethod: paymentIntent.payment_method_types?.[0] || 'card',
      timestamp: new Date().toISOString(),
      bookingId: metadata.bookingId,
      tripId: metadata.tripId,
      destination: metadata.destination,
      groupSize: parseInt(metadata.groupSize || '1'),
      email: metadata.email,
      firstName: metadata.firstName,
      lastName: metadata.lastName,
    }

    // TODO: Update booking status in Airtable/database
    // await updateBookingStatus(metadata.bookingId, 'confirmed', {
    //   paymentIntentId: paymentIntent.id,
    //   paymentStatus: 'succeeded',
    //   paymentMethod: paymentData.paymentMethod,
    //   amount,
    //   currency: paymentData.currency,
    //   timestamp: paymentData.timestamp,
    // })

    // TODO: Send confirmation email
    // await sendConfirmationEmail(paymentData)

    return NextResponse.json({
      success: true,
      paymentData,
      message: 'Stripe payment verified successfully',
    })

  } catch (error) {
    console.error('[v0] Stripe payment verification error:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe error: ${error.message}` },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('Stripe webhook secret not configured')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error('[v0] Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    console.log(`[v0] Webhook event received: ${event.type}`)

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentSuccess(paymentIntent)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        await handlePaymentFailure(failedPayment)
        break

      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutComplete(session)
        break

      default:
        console.log(`[v0] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('[v0] Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { bookingId, tripId, destination, groupSize, email, firstName, lastName } = paymentIntent.metadata

    console.log(`[v0] Payment successful for booking: ${bookingId}`)

    // TODO: Update booking status in Airtable/database
    // TODO: Send confirmation email
    // TODO: Log successful payment transaction

    // Example: Update booking status
    // await updateBookingStatus(bookingId, 'confirmed', {
    //   paymentIntentId: paymentIntent.id,
    //   paymentStatus: 'succeeded',
    //   paymentMethod: paymentIntent.payment_method_types?.[0] || 'unknown',
    //   amount: paymentIntent.amount / 100,
    //   currency: paymentIntent.currency,
    //   timestamp: new Date().toISOString(),
    // })

  } catch (error) {
    console.error('[v0] Error handling payment success:', error)
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { bookingId } = paymentIntent.metadata

    console.log(`[v0] Payment failed for booking: ${bookingId}`)

    // TODO: Update booking status in Airtable/database
    // TODO: Send failure notification email
    // TODO: Log failed payment transaction

    // Example: Update booking status
    // await updateBookingStatus(bookingId, 'payment_failed', {
    //   paymentIntentId: paymentIntent.id,
    //   paymentStatus: 'failed',
    //   failureReason: paymentIntent.last_payment_error?.message || 'Unknown error',
    //   timestamp: new Date().toISOString(),
    // })

  } catch (error) {
    console.error('[v0] Error handling payment failure:', error)
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  try {
    const { bookingId, tripId, destination, groupSize, email, firstName, lastName } = session.metadata || {}

    console.log(`[v0] Checkout completed for booking: ${bookingId}`)

    // TODO: Update booking status in Airtable/database
    // TODO: Send confirmation email
    // TODO: Log successful checkout

  } catch (error) {
    console.error('[v0] Error handling checkout complete:', error)
  }
}

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { AirtableService } from '@/lib/airtable'
import { calcCabinPricing } from '@/lib/booking/pricing'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    console.error('[Webhook] Missing stripe-signature header')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[Webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log(`[Webhook] Received event: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break
      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Webhook] Error processing event:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log(`[Webhook] Processing checkout session: ${session.id}`)

  const metadata = session.metadata
  if (!metadata) {
    console.error('[Webhook] No metadata found in session')
    return
  }

  const {
    tripId,
    destination,
    startDate,
    endDate,
    guests,
    cabinsRequired,
    totalEur,
    depositEur,
    pricePerPerson,
    customerName,
    customerPhone,
    tripTitle,
    pricePerCabinEur,
    spotsLeft,
    depositRate
  } = metadata

  try {
    // Re-fetch latest trip data to ensure we have current inventory
    const airtableService = new AirtableService()
    const trips = await airtableService.getRecords('Trips', {
      filterByFormula: `{trip_id} = "${tripId}"`
    })

    if (!trips || trips.length === 0) {
      throw new Error(`Trip ${tripId} not found`)
    }

    const currentTrip = trips[0]
    const currentSpotsLeft = currentTrip.fields['spots_available'] || 0
    const currentPricePerCabin = currentTrip.fields['price_eur'] || 0

    // Re-validate pricing and inventory with current data
    const pricingResult = calcCabinPricing({
      pricePerCabinEur: currentPricePerCabin,
      numGuests: parseInt(guests),
      spotsLeft: currentSpotsLeft,
      cabinsTotal: 3
    })

    if (!pricingResult.valid) {
      console.error(`[Webhook] Inventory check failed for trip ${tripId}: ${pricingResult.errorMessage}`)
      await handleInventoryConflict(session, {
        tripId,
        customerName: customerName || '',
        customerEmail: session.customer_email || '',
        depositAmount: parseInt(depositEur),
        reason: pricingResult.errorMessage || 'Not enough spots available'
      })
      return
    }

    // Verify pricing still matches
    if (Math.abs(pricingResult.total - parseFloat(totalEur)) > 0.01) {
      console.error(`[Webhook] Pricing mismatch for trip ${tripId}: expected ${totalEur}, got ${pricingResult.total}`)
      await handleInventoryConflict(session, {
        tripId,
        customerName: customerName || '',
        customerEmail: session.customer_email || '',
        depositAmount: parseInt(depositEur),
        reason: 'Pricing has changed since booking'
      })
      return
    }

    // Atomic update: decrement spots_left
    const newSpotsLeft = currentSpotsLeft - parseInt(guests)
    const updateResult = await airtableService.updateRecord('Trips', currentTrip.id, {
      'spots_available': newSpotsLeft
    })

    if (!updateResult) {
      throw new Error('Failed to update trip inventory')
    }

    // Create booking record
    const bookingData = {
      'Name': customerName || '',
      'Email': session.customer_email || '',
      'Phone': customerPhone || '',
      'Trip ID': tripId,
      'Destination': destination,
      'Start Date': startDate,
      'End Date': endDate,
      'Guests': parseInt(guests),
      'Cabins Required': parseInt(cabinsRequired),
      'Total EUR': parseFloat(totalEur),
      'Deposit EUR': parseInt(depositEur),
      'Price Per Person': parseFloat(pricePerPerson),
      'Status': 'deposit_paid',
      'Type': 'booking',
      'Stripe Session ID': session.id,
      'Payment Intent ID': session.payment_intent as string,
      'Source': 'website_booking',
      'Pricing Model': 'per_cabin',
      'Deposit Rate': parseFloat(depositRate || '0.25')
    }

    const bookingRecord = await airtableService.createRecord('Bookings', bookingData)

    if (!bookingRecord) {
      throw new Error('Failed to create booking record')
    }

    // Send confirmation email
    await sendDepositConfirmationEmail({
      name: customerName || '',
      email: session.customer_email || '',
      tripId,
      destination,
      startDate,
      endDate,
      guests: parseInt(guests),
      cabinsRequired: parseInt(cabinsRequired),
      totalEur: parseFloat(totalEur),
      depositEur: parseInt(depositEur),
      bookingId: bookingRecord.id
    })

    console.log(`[Webhook] Successfully processed booking for ${customerName} - Trip: ${tripId} - Booking ID: ${bookingRecord.id}`)

  } catch (error) {
    console.error(`[Webhook] Error processing booking for session ${session.id}:`, error)
    
    // If we can't process the booking, refund the deposit
    await handleInventoryConflict(session, {
      tripId,
      customerName: customerName || '',
      customerEmail: session.customer_email || '',
      depositAmount: parseInt(depositEur),
      reason: 'Processing error occurred'
    })
  }
}

async function handleInventoryConflict(session: Stripe.Checkout.Session, data: {
  tripId: string
  customerName: string
  customerEmail: string
  depositAmount: number
  reason: string
}) {
  try {
    console.log(`[Webhook] Handling inventory conflict for session ${session.id}: ${data.reason}`)

    // Refund the payment
    if (session.payment_intent) {
      const refund = await stripe.refunds.create({
        payment_intent: session.payment_intent as string,
        reason: 'requested_by_customer'
      })
      console.log(`[Webhook] Refunded payment: ${refund.id}`)
    }

    // Send apology email
    await sendRefundNotificationEmail({
      name: data.customerName,
      email: data.customerEmail,
      tripId: data.tripId,
      depositAmount: data.depositAmount,
      reason: data.reason
    })

    // Create a record of the failed booking
    const airtableService = new AirtableService()
    await airtableService.createRecord('Bookings', {
      'Name': data.customerName,
      'Email': data.customerEmail,
      'Trip ID': data.tripId,
      'Status': 'refunded',
      'Type': 'booking',
      'Stripe Session ID': session.id,
      'Deposit EUR': data.depositAmount,
      'Refund Reason': data.reason,
      'Source': 'website_booking'
    })

  } catch (error) {
    console.error('[Webhook] Error handling inventory conflict:', error)
  }
}

async function sendDepositConfirmationEmail(data: {
  name: string
  email: string
  tripId: string
  destination: string
  startDate: string
  endDate: string
  guests: number
  cabinsRequired: number
  totalEur: number
  depositEur: number
  bookingId: string
}) {
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const balanceDue = data.totalEur - data.depositEur
    const subject = `Deposit Confirmed - ${data.destination} Trip`
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Deposit Confirmed! 🎉</h2>
        
        <p>Hi ${data.name},</p>
        
        <p>Great news! We've received your deposit and your <strong>${data.cabinsRequired} cabin${data.cabinsRequired > 1 ? 's' : ''}</strong> are now reserved for our <strong>${data.destination}</strong> kitesurfing trip.</p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
          <h3 style="margin-top: 0; color: #059669;">Booking Confirmed</h3>
          <p><strong>Booking ID:</strong> ${data.bookingId}</p>
          <p><strong>Trip ID:</strong> ${data.tripId}</p>
          <p><strong>Destination:</strong> ${data.destination}</p>
          <p><strong>Dates:</strong> ${new Date(data.startDate).toLocaleDateString()} - ${new Date(data.endDate).toLocaleDateString()}</p>
          <p><strong>Guests:</strong> ${data.guests}</p>
          <p><strong>Cabins Reserved:</strong> ${data.cabinsRequired}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e40af;">Payment Summary</h3>
          <p><strong>Total Trip Cost:</strong> €${data.totalEur.toLocaleString()}</p>
          <p><strong>Deposit Paid:</strong> €${data.depositEur.toLocaleString()}</p>
          <p><strong>Balance Due:</strong> €${balanceDue.toLocaleString()}</p>
        </div>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #d97706;">Next Steps</h3>
          <p>We'll send you detailed trip information and balance payment instructions closer to your departure date.</p>
          <p><strong>Balance due:</strong> 30 days before departure</p>
        </div>
        
        <p>If you have any questions, just reply to this email.</p>
        
        <p>Welcome to the KiteSafaris family!<br>The KiteSafaris Team</p>
      </div>
    `

    await resend.emails.send({
      from: 'KiteSafaris <noreply@kitesafaris.com>',
      to: [data.email],
      subject,
      html
    })

    console.log(`[Email] Sent deposit confirmation to ${data.email}`)
  } catch (error) {
    console.error('[Email] Failed to send deposit confirmation:', error)
  }
}

async function sendRefundNotificationEmail(data: {
  name: string
  email: string
  tripId: string
  depositAmount: number
  reason: string
}) {
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const subject = `Booking Update - ${data.tripId}`
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Booking Update</h2>
        
        <p>Hi ${data.name},</p>
        
        <p>We're sorry, but we encountered an issue with your booking for trip <strong>${data.tripId}</strong>.</p>
        
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <h3 style="margin-top: 0; color: #dc2626;">What Happened</h3>
          <p>${data.reason}</p>
          <p>We've immediately refunded your deposit of <strong>€${data.depositAmount.toLocaleString()}</strong> back to your original payment method.</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e40af;">Alternative Options</h3>
          <p>We'd love to help you find alternative dates or destinations. Please reply to this email or call us directly.</p>
          <p>We apologize for any inconvenience and appreciate your understanding.</p>
        </div>
        
        <p>Best regards,<br>The KiteSafaris Team</p>
      </div>
    `

    await resend.emails.send({
      from: 'KiteSafaris <noreply@kitesafaris.com>',
      to: [data.email],
      subject,
      html
    })

    console.log(`[Email] Sent refund notification to ${data.email}`)
  } catch (error) {
    console.error('[Email] Failed to send refund notification:', error)
  }
}

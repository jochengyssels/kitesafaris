import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { printfulService } from '@/lib/printful-service'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    console.log("Webhook received checkout.session.completed:", {
      sessionId: session.id,
      orderType: session.metadata?.orderType,
      customerEmail: session.metadata?.customerEmail
    })

    try {
      // Only process shop orders
      if (session.metadata?.orderType !== 'shop') {
        console.log("Skipping non-shop order:", session.metadata?.orderType)
        return NextResponse.json({ received: true })
      }

      // Parse metadata
      const customerName = session.metadata.customerName
      const customerEmail = session.metadata.customerEmail
      const customerPhone = session.metadata.customerPhone
      const shippingAddress = JSON.parse(session.metadata.shippingAddress || '{}')
      const items = JSON.parse(session.metadata.items || '[]')
      const orderSummary = JSON.parse(session.metadata.orderSummary || '{}')

      // Validate required metadata
      if (!customerName || !customerEmail || !shippingAddress.address1 || items.length === 0) {
        console.error("Missing required metadata for shop order:", {
          hasCustomerName: !!customerName,
          hasCustomerEmail: !!customerEmail,
          hasShippingAddress: !!shippingAddress.address1,
          itemCount: items.length
        })
        return NextResponse.json({ error: 'Missing required order metadata' }, { status: 400 })
      }

      // Create order with Printful
      const orderData = {
        external_id: `KS-${Date.now()}`,
        shipping: "STANDARD",
        recipient: {
          name: customerName,
          address1: shippingAddress.address1,
          address2: shippingAddress.address2 || "",
          city: shippingAddress.city,
          state_code: shippingAddress.state,
          country_code: shippingAddress.country,
          zip: shippingAddress.zip,
          phone: customerPhone || "",
          email: customerEmail,
        },
        items: items.map((item: any) => ({
          variant_id: item.variantId || item.productId,
          quantity: item.quantity,
        })),
      }

      console.log("Creating Printful order:", orderData)

      // Create order with Printful directly
      try {
        const printfulResult = await printfulService.createOrder(orderData)
        console.log("Printful order created successfully:", printfulResult.result?.id)
        console.log("Full Printful response:", JSON.stringify(printfulResult, null, 2))
      } catch (error) {
        console.error("Printful order creation failed:", error)
        console.error("Order data that failed:", JSON.stringify(orderData, null, 2))
        console.error("Error details:", {
          message: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
          name: error instanceof Error ? error.name : undefined
        })
        // You might want to implement retry logic or alerting here
        // For now, we'll still return success to Stripe to avoid webhook retries
        // but log the error for manual investigation
      }

      // Store order information in your database if needed
      // You could save the order details, customer info, and Stripe session ID
      // to track orders and handle customer service requests

    } catch (error) {
      console.error('Error processing checkout session:', error)
      return NextResponse.json({ error: 'Failed to process order' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

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

    try {
      // Only process shop orders
      if (session.metadata?.orderType !== 'shop') {
        return NextResponse.json({ received: true })
      }

      // Parse metadata
      const customerName = session.metadata.customerName
      const customerEmail = session.metadata.customerEmail
      const customerPhone = session.metadata.customerPhone
      const shippingAddress = JSON.parse(session.metadata.shippingAddress)
      const items = JSON.parse(session.metadata.items)
      const orderSummary = JSON.parse(session.metadata.orderSummary)

      // Create order with Printful
      const orderData = {
        external_id: `KS-${Date.now()}-${session.id}`,
        shipping: "STANDARD",
        recipient: {
          name: customerName,
          address1: shippingAddress.address1,
          address2: shippingAddress.address2 || "",
          city: shippingAddress.city,
          state_code: shippingAddress.state,
          state_name: shippingAddress.state,
          country_code: shippingAddress.country,
          country_name: shippingAddress.country,
          zip: shippingAddress.zip,
          phone: customerPhone || "",
          email: customerEmail,
        },
        items: items.map((item: any) => ({
          sync_variant_id: item.variantId || item.productId,
          quantity: item.quantity,
          retail_price: item.price.toFixed(2),
        })),
        retail_costs: {
          currency: orderSummary.currency,
          subtotal: orderSummary.subtotal.toFixed(2),
          discount: "0.00",
          shipping: orderSummary.shipping.toFixed(2),
          tax: orderSummary.tax.toFixed(2),
          total: orderSummary.total.toFixed(2),
        },
      }

      console.log("Creating Printful order:", orderData)

      // Create order with Printful
      const printfulResponse = await fetch("/api/shop/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      const printfulResult = await printfulResponse.json()

      if (!printfulResponse.ok || !printfulResult.success) {
        console.error("Printful order creation failed:", printfulResult)
        // You might want to implement retry logic or alerting here
      } else {
        console.log("Printful order created successfully:", printfulResult)
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

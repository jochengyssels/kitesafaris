import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

export interface ShopCheckoutRequest {
  items: Array<{
    productId: string
    variantId?: string
    name: string
    quantity: number
    price: number
    currency: string
  }>
  shippingInfo: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    address1: string
    address2?: string
    city: string
    state: string
    zip: string
    country: string
  }
  orderSummary: {
    subtotal: number
    shipping: number
    tax: number
    total: number
    currency: string
  }
}

export interface ShopCheckoutResponse {
  success: boolean
  message: string
  checkoutUrl?: string
  sessionId?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<ShopCheckoutResponse>> {
  try {
    const body: ShopCheckoutRequest = await request.json()
    
    // Validate required fields
    if (!body.items || body.items.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No items in cart'
      }, { status: 400 })
    }

    if (!body.shippingInfo.email || !body.shippingInfo.firstName || !body.shippingInfo.lastName) {
      return NextResponse.json({
        success: false,
        message: 'Missing required shipping information'
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.shippingInfo.email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email format'
      }, { status: 400 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: body.shippingInfo.email,
      line_items: body.items.map(item => ({
        price_data: {
          currency: body.orderSummary.currency.toLowerCase(),
          product_data: {
            name: item.name,
            description: `Quantity: ${item.quantity}`,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      // Add shipping and tax as separate line items
      ...(body.orderSummary.shipping > 0 && {
        line_items: [
          ...body.items.map(item => ({
            price_data: {
              currency: body.orderSummary.currency.toLowerCase(),
              product_data: {
                name: item.name,
                description: `Quantity: ${item.quantity}`,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
          })),
          {
            price_data: {
              currency: body.orderSummary.currency.toLowerCase(),
              product_data: {
                name: 'Shipping',
              },
              unit_amount: Math.round(body.orderSummary.shipping * 100),
            },
            quantity: 1,
          },
          {
            price_data: {
              currency: body.orderSummary.currency.toLowerCase(),
              product_data: {
                name: 'Tax',
              },
              unit_amount: Math.round(body.orderSummary.tax * 100),
            },
            quantity: 1,
          },
        ],
      }),
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI'],
      },
      metadata: {
        orderType: 'shop',
        customerName: `${body.shippingInfo.firstName} ${body.shippingInfo.lastName}`,
        customerEmail: body.shippingInfo.email,
        customerPhone: body.shippingInfo.phone || '',
        shippingAddress: JSON.stringify({
          address1: body.shippingInfo.address1,
          address2: body.shippingInfo.address2 || '',
          city: body.shippingInfo.city,
          state: body.shippingInfo.state,
          zip: body.shippingInfo.zip,
          country: body.shippingInfo.country,
        }),
        items: JSON.stringify(body.items),
        orderSummary: JSON.stringify(body.orderSummary),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/checkout`,
    })

    return NextResponse.json({
      success: true,
      message: 'Checkout session created successfully',
      checkoutUrl: session.url!,
      sessionId: session.id,
    })

  } catch (error) {
    console.error('Shop checkout error:', error)
    
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create checkout session'
    }, { status: 500 })
  }
}

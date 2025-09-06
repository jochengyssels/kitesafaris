import { NextRequest, NextResponse } from 'next/server'
import { printfulService } from '@/lib/printful-service'

export async function POST(request: NextRequest) {
  try {
    console.log("=== DEBUG WEBHOOK PROCESSING ===")
    
    // Simulate the exact webhook data from your order
    const sessionData = {
      id: "cs_live_b1EBKKuwsQbKnKbCDoT8yDI2HiYnLERD2yqaTXucPf80VSSLMfYM6AHM0l",
      metadata: {
        orderType: "shop",
        shippingAddress: "{\"address1\":\"Via Regina Margherita 29C\",\"address2\":\"Sardegna\",\"city\":\"San Giovanni Suergiu\",\"state\":\"Sud Sardegna\",\"zip\":\"09010\",\"country\":\"IT\"}",
        items: "[{\"productId\":391211705,\"variantId\":4948370735,\"name\":\"Kite Cap Zebra\",\"quantity\":1,\"price\":17,\"currency\":\"EUR\"}]",
        orderSummary: "{\"subtotal\":17,\"shipping\":9.99,\"tax\":1.36,\"total\":28.35,\"currency\":\"EUR\"}",
        customerName: "Jochen Gyssels",
        customerEmail: "jochengyssels@gmail.com",
        customerPhone: "492576427"
      }
    }

    console.log("Session data:", sessionData)

    // Check if it's a shop order
    if (sessionData.metadata?.orderType !== 'shop') {
      console.log("Skipping non-shop order:", sessionData.metadata?.orderType)
      return NextResponse.json({ received: true })
    }

    // Parse metadata
    const customerName = sessionData.metadata.customerName
    const customerEmail = sessionData.metadata.customerEmail
    const customerPhone = sessionData.metadata.customerPhone
    const shippingAddress = JSON.parse(sessionData.metadata.shippingAddress || '{}')
    const items = JSON.parse(sessionData.metadata.items || '[]')
    const orderSummary = JSON.parse(sessionData.metadata.orderSummary || '{}')

    console.log("Parsed data:", {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      orderSummary
    })

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
      external_id: `KS-DEBUG-${Date.now()}-${sessionData.id}`,
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

    console.log("Creating Printful order with data:", orderData)

    // Create order with Printful directly
    try {
      const printfulResult = await printfulService.createOrder(orderData)
      console.log("Printful order created successfully:", printfulResult.result?.id)
      
      return NextResponse.json({ 
        success: true,
        orderId: printfulResult.result?.id,
        message: "Debug webhook processing completed successfully"
      })
    } catch (error) {
      console.error("Printful order creation failed:", error)
      return NextResponse.json({ 
        error: "Printful order creation failed",
        details: error instanceof Error ? error.message : "Unknown error"
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Error in debug webhook processing:', error)
    return NextResponse.json({ 
      error: 'Failed to process debug webhook',
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

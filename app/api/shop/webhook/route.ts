import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { printfulService } from '@/lib/printful-service'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Helper function to get the actual Printful variant_id from sync variant ID
async function getActualVariantId(syncVariantId: number): Promise<number> {
  try {
    // Get all products to find the one containing this sync variant ID
    const products = await printfulService.getProducts()
    
    for (const product of products) {
      const variants = await printfulService.getProductVariants(product.id)
      const variant = variants.find(v => v.id === syncVariantId)
      if (variant) {
        console.log(`Mapped sync variant ID ${syncVariantId} to actual variant ID ${variant.variant_id}`)
        return variant.variant_id
      }
    }
    
    console.warn(`Could not find actual variant ID for sync variant ID ${syncVariantId}`)
    return syncVariantId // Fallback to original ID
  } catch (error) {
    console.error(`Error mapping variant ID ${syncVariantId}:`, error)
    return syncVariantId // Fallback to original ID
  }
}

// Helper function to get print files for a variant
async function getPrintFilesForVariant(variantId: number): Promise<any[]> {
  try {
    // Get all products to find the one containing this variant
    const products = await printfulService.getProducts()
    
    for (const product of products) {
      const variants = await printfulService.getProductVariants(product.id)
      const variant = variants.find(v => v.variant_id === variantId)
      if (variant && variant.files) {
        // Return print files (exclude preview files)
        const printFiles = variant.files
          .filter((file: any) => file.type !== 'preview' && file.type !== 'back' && file.status === 'ok')
          .map((file: any) => ({
            id: file.id,
            type: file.type,
          }))
        
        console.log(`Found ${printFiles.length} print files for variant ${variantId}`)
        return printFiles
      }
    }
    
    console.warn(`Could not find print files for variant ID ${variantId}`)
    return [] // Return empty array if no files found
  } catch (error) {
    console.error(`Error getting print files for variant ID ${variantId}:`, error)
    return [] // Return empty array on error
  }
}

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
        items: await Promise.all(items.map(async (item: any) => {
          const actualVariantId = await getActualVariantId(item.variantId || item.productId)
          const printFiles = await getPrintFilesForVariant(actualVariantId)
          
          return {
            variant_id: actualVariantId,
            quantity: item.quantity,
            files: printFiles,
          }
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

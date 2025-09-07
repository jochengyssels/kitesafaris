import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { printfulService } from '@/lib/printful-service'
import { CartItem } from '@/lib/printful/types'
import { mapCartToPrintfulItems } from '@/lib/printful/mapCartToPrintful'
import { assertSyncVariantsHaveFiles, assertCatalogVariantHasValidFile } from '@/lib/printful/validate'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

/**
 * Converts Stripe session metadata items to CartItem format
 */
function parseCartItemsFromSession(items: any[]): CartItem[] {
  return items.map((item: any) => {
    // After fixing the shop page, variantId now contains the sync variant ID
    // We need to determine if this is a sync variant or catalog variant
    const hasSyncVariantId = item.syncVariantId || item.variantId
    const hasCatalogVariantId = item.catalogVariantId
    
    console.log(`[Webhook] Parsing cart item:`, {
      originalVariantId: item.variantId,
      syncVariantId: item.syncVariantId,
      catalogVariantId: item.catalogVariantId,
      hasSyncVariantId: !!hasSyncVariantId,
      hasCatalogVariantId: !!hasCatalogVariantId
    })
    
    return {
      qty: item.quantity || 1,
      // Use variantId as syncVariantId (since we fixed the shop page to use sync variant IDs)
      syncVariantId: hasSyncVariantId ? (item.syncVariantId || item.variantId) : undefined,
      catalogVariantId: hasCatalogVariantId ? item.catalogVariantId : undefined,
      printFileUrl: item.printFileUrl,
      name: item.name,
      price: item.price,
      sku: item.sku
    }
  })
}

/**
 * Preflight validation for cart items before sending to Printful
 */
async function validateCartItems(cartItems: CartItem[]): Promise<void> {
  console.log(`[Webhook] Preflight validation for ${cartItems.length} cart items`)
  
  const syncVariantIds: number[] = []
  const catalogItems: { catalogVariantId: number; printFileUrl: string }[] = []
  
  // Separate sync variants from catalog variants
  for (const item of cartItems) {
    if (item.syncVariantId) {
      syncVariantIds.push(item.syncVariantId)
      console.log(`[Webhook] Found sync variant: ${item.syncVariantId}`)
    } else if (item.catalogVariantId) {
      catalogItems.push({
        catalogVariantId: item.catalogVariantId,
        printFileUrl: item.printFileUrl || ''
      })
      console.log(`[Webhook] Found catalog variant: ${item.catalogVariantId}`)
    } else {
      console.warn(`[Webhook] Cart item has no valid variant ID:`, item)
    }
  }
  
  // Validate sync variants have print files
  if (syncVariantIds.length > 0) {
    console.log(`[Webhook] Validating ${syncVariantIds.length} sync variants`)
    await assertSyncVariantsHaveFiles(syncVariantIds)
  }
  
  // For catalog variants, we need print file URLs
  if (catalogItems.length > 0) {
    console.log(`[Webhook] Validating ${catalogItems.length} catalog variants`)
    for (const catalogItem of catalogItems) {
      if (!catalogItem.printFileUrl) {
        throw new Error(`Catalog variant ${catalogItem.catalogVariantId} requires a print file URL. This appears to be a catalog product that needs custom artwork.`)
      }
      assertCatalogVariantHasValidFile(catalogItem.catalogVariantId, catalogItem.printFileUrl)
    }
  }
  
  console.log(`[Webhook] ✅ Preflight validation passed for all ${cartItems.length} items`)
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

      // Parse cart items from session metadata
      const cartItems = parseCartItemsFromSession(items)
      console.log(`[Webhook] Parsed ${cartItems.length} cart items from session metadata`)

      // Preflight validation - fail fast if items are invalid
      let printfulItems: any[]
      try {
        await validateCartItems(cartItems)
        printfulItems = mapCartToPrintfulItems(cartItems)
        console.log(`[Webhook] Successfully mapped ${printfulItems.length} items to Printful format`)
      } catch (error) {
        console.error('[Webhook] Preflight validation failed:', error)
        // Mark order as requires manual review - DO NOT call Printful API
        // TODO: Implement order status tracking in your database
        console.error('[Webhook] Order marked for manual review due to preflight failure')
        return NextResponse.json({ 
          success: false, 
          error: 'Preflight validation failed', 
          details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 400 })
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
        items: printfulItems,
      }

      console.log("Creating Printful order:", orderData)

      // Create order with Printful directly
      try {
        const printfulResult = await printfulService.createOrder(orderData)
        console.log("[Webhook] ✅ Printful order created successfully:", printfulResult.result?.id)
        console.log("[Webhook] Full Printful response:", JSON.stringify(printfulResult, null, 2))
        
        // TODO: Update order status in your database to 'fulfilled' or 'processing'
        
      } catch (error) {
        console.error("[Webhook] ❌ Printful order creation failed:", error)
        console.error("[Webhook] Order data that failed:", JSON.stringify(orderData, null, 2))
        console.error("[Webhook] Error details:", {
          message: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
          name: error instanceof Error ? error.name : undefined
        })
        
        // Mark order as requires manual review due to Printful API error
        // TODO: Implement order status tracking in your database
        console.error("[Webhook] Order marked for manual review due to Printful API error")
        
        // Still return success to Stripe to avoid webhook retries
        // The order will be manually reviewed and processed
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

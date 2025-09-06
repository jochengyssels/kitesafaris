import { type NextRequest, NextResponse } from "next/server"
import { printfulService } from "@/lib/printful-service"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    console.log("[Shop API] Creating order:", {
      externalId: orderData.external_id,
      itemCount: orderData.items?.length,
      recipient: orderData.recipient?.name,
    })

    // Validate required fields
    if (!orderData.external_id || !orderData.recipient || !orderData.items?.length) {
      console.error("[Shop API] Missing required fields:", { 
        hasExternalId: !!orderData.external_id, 
        hasRecipient: !!orderData.recipient, 
        itemCount: orderData.items?.length 
      })
      return NextResponse.json({ 
        success: false,
        error: "Missing required order data" 
      }, { status: 400 })
    }

    // Validate recipient fields
    const requiredRecipientFields = ['name', 'address1', 'city', 'state_code', 'country_code', 'zip', 'email']
    const missingRecipientFields = requiredRecipientFields.filter(field => !orderData.recipient[field])
    
    if (missingRecipientFields.length > 0) {
      console.error("[Shop API] Missing recipient fields:", missingRecipientFields)
      return NextResponse.json({ 
        success: false,
        error: `Missing recipient fields: ${missingRecipientFields.join(', ')}` 
      }, { status: 400 })
    }

    // Validate items
    const invalidItems = orderData.items.filter((item: any) => !item.sync_variant_id || !item.quantity || !item.retail_price)
    if (invalidItems.length > 0) {
      console.error("[Shop API] Invalid items:", invalidItems)
      return NextResponse.json({ 
        success: false,
        error: "Some items are missing required data" 
      }, { status: 400 })
    }

    console.log("[Shop API] Order validation passed, creating order with Printful...")
    const order = await printfulService.createOrder(orderData)

    console.log("[Shop API] Order created successfully:", order.result?.id)

    return NextResponse.json({
      success: true,
      order: order.result,
    })
  } catch (error) {
    console.error("[Shop API] Error creating order:", error)
    
    // Provide more specific error messages
    let errorMessage = "Failed to create order"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}

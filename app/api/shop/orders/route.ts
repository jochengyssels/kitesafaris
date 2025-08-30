import { type NextRequest, NextResponse } from "next/server"
import { printfulService } from "@/lib/printful-service"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    console.log("[Shop API] Creating order:", {
      externalId: orderData.external_id,
      itemCount: orderData.items?.length,
    })

    // Validate required fields
    if (!orderData.external_id || !orderData.recipient || !orderData.items?.length) {
      return NextResponse.json({ error: "Missing required order data" }, { status: 400 })
    }

    const order = await printfulService.createOrder(orderData)

    return NextResponse.json({
      success: true,
      order: order.result,
    })
  } catch (error) {
    console.error("[Shop API] Error creating order:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 },
    )
  }
}

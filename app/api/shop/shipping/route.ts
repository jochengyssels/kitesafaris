import { type NextRequest, NextResponse } from "next/server"
import { printfulService } from "@/lib/printful-service"

export async function POST(request: NextRequest) {
  try {
    const { recipient, items } = await request.json()

    console.log("[Shop API] Getting shipping rates:", {
      country: recipient?.country_code,
      itemCount: items?.length,
    })

    if (!recipient || !items?.length) {
      return NextResponse.json({ error: "Missing recipient or items data" }, { status: 400 })
    }

    const shippingRates = await printfulService.getShippingRates(recipient, items)

    return NextResponse.json({
      success: true,
      rates: shippingRates.result,
    })
  } catch (error) {
    console.error("[Shop API] Error getting shipping rates:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get shipping rates",
      },
      { status: 500 },
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { printfulService } from '@/lib/printful-service'

export async function POST(request: NextRequest) {
  try {
    console.log("Testing webhook processing with sample data...")
    
    // Simulate the exact data from your webhook
    const sampleOrderData = {
      external_id: `KS-TEST-${Date.now()}`,
      shipping: "STANDARD",
      recipient: {
        name: "Jochen Gyssels",
        address1: "Via Regina Margherita 29C",
        address2: "Sardegna",
        city: "San Giovanni Suergiu",
        state_code: "SU",
        state_name: "Sud Sardegna",
        country_code: "IT",
        country_name: "Italy",
        zip: "09010",
        phone: "492576427",
        email: "jochengyssels@gmail.com",
      },
      items: [{
        sync_variant_id: 4948370735, // This is the variantId from your webhook
        quantity: 1,
        retail_price: "17.00",
      }],
      retail_costs: {
        currency: "EUR",
        subtotal: "17.00",
        discount: "0.00",
        shipping: "9.99",
        tax: "1.36",
        total: "28.35",
      },
    }

    console.log("Creating test order with data:", sampleOrderData)

    // Test creating the order
    const result = await printfulService.createOrder(sampleOrderData)
    
    console.log("Test order created successfully:", result.result?.id)
    
    return NextResponse.json({ 
      success: true,
      orderId: result.result?.id,
      message: "Test order created successfully"
    })
    
  } catch (error) {
    console.error("Test webhook failed:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Unknown error",
      details: error
    }, { status: 500 })
  }
}

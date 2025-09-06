import { NextRequest, NextResponse } from 'next/server'
import { printfulService } from '@/lib/printful-service'

export async function POST(request: NextRequest) {
  try {
    console.log("=== DEBUGGING PRINTFUL ERROR ===")
    
    // Test with minimal valid data first
    const minimalOrderData = {
      external_id: `KS-MINIMAL-${Date.now()}`,
      shipping: "STANDARD",
      recipient: {
        name: "Test Customer",
        address1: "123 Test Street",
        address2: "",
        city: "Test City",
        state_code: "CA",
        state_name: "California",
        country_code: "US",
        country_name: "United States",
        zip: "12345",
        phone: "1234567890",
        email: "test@example.com",
      },
      items: [{
        sync_variant_id: 4948370735,
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

    console.log("Testing with minimal data:", minimalOrderData)

    try {
      const result = await printfulService.createOrder(minimalOrderData)
      console.log("Minimal order succeeded:", result.result?.id)
      
      return NextResponse.json({ 
        success: true,
        orderId: result.result?.id,
        message: "Minimal order succeeded"
      })
    } catch (error) {
      console.error("Minimal order failed:", error)
      
      // Now test with your exact data
      const yourOrderData = {
        external_id: `KS-YOUR-DATA-${Date.now()}`,
        shipping: "STANDARD",
        recipient: {
          name: "Jochen Gyssels",
          address1: "Via Regina Margherita 29C",
          address2: "Sardegna",
          city: "San Giovanni Suergiu",
          state_code: "SU", // This might be the issue
          state_name: "Sud Sardegna",
          country_code: "IT",
          country_name: "Italy",
          zip: "09010",
          phone: "492576427",
          email: "jochengyssels@gmail.com",
        },
        items: [{
          sync_variant_id: 4948370735,
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

      console.log("Testing with your exact data:", yourOrderData)

      try {
        const result2 = await printfulService.createOrder(yourOrderData)
        console.log("Your data order succeeded:", result2.result?.id)
        
        return NextResponse.json({ 
          success: true,
          orderId: result2.result?.id,
          message: "Your data order succeeded"
        })
      } catch (error2) {
        console.error("Your data order failed:", error2)
        
        return NextResponse.json({ 
          error: "Both orders failed",
          minimalError: error instanceof Error ? error.message : "Unknown error",
          yourDataError: error2 instanceof Error ? error2.message : "Unknown error"
        }, { status: 500 })
      }
    }

  } catch (error) {
    console.error('Error in debug printful error:', error)
    return NextResponse.json({ 
      error: 'Failed to debug printful error',
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

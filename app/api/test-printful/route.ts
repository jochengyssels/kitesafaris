import { NextRequest, NextResponse } from 'next/server'
import { printfulService } from '@/lib/printful-service'

export async function GET(request: NextRequest) {
  try {
    // Test Printful connection
    console.log("Testing Printful connection...")
    
    // Check if API key is available
    const hasApiKey = !!process.env.PRINTFUL_API_KEY
    console.log("Has Printful API key:", hasApiKey)
    
    if (!hasApiKey) {
      return NextResponse.json({ 
        error: "Printful API key not configured",
        hasApiKey: false 
      }, { status: 500 })
    }
    
    // Test getting products
    const products = await printfulService.getProducts()
    console.log("Printful products count:", products.length)
    
    return NextResponse.json({ 
      success: true,
      hasApiKey: true,
      productCount: products.length,
      firstProduct: products[0] || null
    })
    
  } catch (error) {
    console.error("Printful test failed:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Unknown error",
      hasApiKey: !!process.env.PRINTFUL_API_KEY
    }, { status: 500 })
  }
}

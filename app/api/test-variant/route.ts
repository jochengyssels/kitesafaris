import { NextRequest, NextResponse } from 'next/server'
import { printfulService } from '@/lib/printful-service'

export async function GET(request: NextRequest) {
  try {
    console.log("Testing variant ID from webhook...")
    
    // Get the product details for the Kite Cap Zebra
    const productId = 391211705
    const variantId = 4948370735
    
    console.log(`Checking product ${productId} and variant ${variantId}`)
    
    // Get product details
    const product = await printfulService.getProduct(productId)
    console.log("Product:", product)
    
    // Get variants for this product
    const variants = await printfulService.getProductVariants(productId)
    console.log("Variants:", variants)
    
    // Check if our variant ID exists
    const targetVariant = variants.find(v => v.id === variantId)
    console.log("Target variant:", targetVariant)
    
    return NextResponse.json({ 
      success: true,
      product,
      variants,
      targetVariant,
      variantExists: !!targetVariant
    })
    
  } catch (error) {
    console.error("Variant test failed:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Unknown error",
      details: error
    }, { status: 500 })
  }
}

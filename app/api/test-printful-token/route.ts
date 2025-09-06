import { NextRequest, NextResponse } from 'next/server'
import { printfulService } from '@/lib/printful-service'

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.PRINTFUL_API_KEY
    const storeId = process.env.PRINTFUL_STORE_ID || "16713432"
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'PRINTFUL_API_KEY not configured',
        status: 'missing_config'
      }, { status: 500 })
    }

    // Test using the Printful service
    try {
      const products = await printfulService.getProducts()
      
      return NextResponse.json({
        status: 'success',
        apiKeyLength: apiKey.length,
        apiKeyPrefix: apiKey.substring(0, 10) + '...',
        storeId: storeId,
        productCount: products.length,
        firstProduct: products[0] ? {
          id: products[0].id,
          name: products[0].name,
          variants: products[0].variants
        } : null,
        message: 'Printful service is working correctly!'
      })
    } catch (serviceError) {
      return NextResponse.json({
        status: 'service_error',
        apiKeyLength: apiKey.length,
        apiKeyPrefix: apiKey.substring(0, 10) + '...',
        storeId: storeId,
        error: serviceError instanceof Error ? serviceError.message : 'Unknown service error',
        message: 'Printful service error occurred'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Printful token test error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 'error'
    }, { status: 500 })
  }
}

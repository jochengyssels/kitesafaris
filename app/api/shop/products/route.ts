import { type NextRequest, NextResponse } from "next/server"
import { printfulService } from "@/lib/printful-service"
import { getExternalProducts, getExternalProductById, getExternalProductsByCategory, formatExternalProductForFrontend } from "@/lib/external-products"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const productId = searchParams.get("id")

    console.log("[Shop API] Fetching products:", { category, productId })

    // Check if Printful API key is configured
    const printfulApiKey = process.env.PRINTFUL_API_KEY
    if (!printfulApiKey) {
      console.error("[Shop API] Printful API key not configured")
      return NextResponse.json(
        {
          success: false,
          error: "Shop is not configured. Please contact support.",
          products: [],
          total: 0,
        },
        { status: 503 }
      )
    }

    if (productId) {
      // Check if it's an external product first
      if (productId.startsWith('external-')) {
        const externalProductId = productId.replace('external-', '')
        const externalProduct = getExternalProductById(externalProductId)
        if (!externalProduct) {
          return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }
        
        const formattedProduct = formatExternalProductForFrontend(externalProduct)
        return NextResponse.json({
          success: true,
          product: formattedProduct,
        })
      }

      // Fetch specific Printful product with variants
      const product = await printfulService.getProduct(Number.parseInt(productId))
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }

      const variants = await printfulService.getProductVariants(Number.parseInt(productId))
      const formattedProduct = printfulService.formatProductForFrontend(product, variants)

      return NextResponse.json({
        success: true,
        product: formattedProduct,
      })
    }

    // Fetch products by category
    let printfulProducts: any[] = []
    let printfulProductsWithVariants: any[] = []
    
    try {
      printfulProducts = await printfulService.getProductsByCategory(category || undefined)
      
      // Get variants for each Printful product (limit to first few for performance)
      printfulProductsWithVariants = await Promise.all(
        printfulProducts.slice(0, 20).map(async (product) => {
          const variants = await printfulService.getProductVariants(product.id)
          return printfulService.formatProductForFrontend(product, variants)
        }),
      )
    } catch (error) {
      console.error("[Shop API] Failed to fetch Printful products:", error)
      // Continue with external products only if Printful fails
    }

    const externalProducts = getExternalProductsByCategory(category || undefined)

    // Format external products
    const externalProductsFormatted = externalProducts.map(product => formatExternalProductForFrontend(product))

    // Combine both product types
    const allProducts = [...printfulProductsWithVariants, ...externalProductsFormatted]

    return NextResponse.json({
      success: true,
      products: allProducts,
      total: printfulProducts.length + externalProducts.length,
      category: category || "all",
    })
  } catch (error) {
    console.error("[Shop API] Error fetching products:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products. Please try again later.",
        products: [],
        total: 0,
      },
      { status: 500 }
    )
  }
}

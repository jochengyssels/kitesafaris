import { type NextRequest, NextResponse } from "next/server"
import { printfulService } from "@/lib/printful-service"

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
      // Fetch specific product with variants
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
    const products = await printfulService.getProductsByCategory(category || undefined)

    // Get variants for each product (limit to first few for performance)
    const productsWithVariants = await Promise.all(
      products.slice(0, 20).map(async (product) => {
        const variants = await printfulService.getProductVariants(product.id)
        return printfulService.formatProductForFrontend(product, variants)
      }),
    )

    return NextResponse.json({
      success: true,
      products: productsWithVariants,
      total: products.length,
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

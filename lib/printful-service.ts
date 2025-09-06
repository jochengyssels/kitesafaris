interface PrintfulProduct {
  id: number
  external_id: string
  name: string
  variants: number
  synced: number
  thumbnail_url: string
  is_ignored: boolean
}

interface PrintfulVariant {
  id: number
  external_id: string
  sync_product_id: number
  name: string
  synced: boolean
  variant_id: number
  main_category_id: number
  warehouse_product_variant_id: number | null
  retail_price: string
  sku: string
  currency: string
  product: {
    variant_id: number
    product_id: number
    image: string
    name: string
  }
  files: Array<{
    id: number
    type: string
    hash: string
    url: string
    filename: string
    mime_type: string
    size: number
    width: number
    height: number
    x: number
    y: number
    scale: number
    visible: boolean
    resource: any
  }>
  options: Array<{
    id: string
    value: string
  }>
  is_ignored: boolean
}

interface PrintfulOrder {
  external_id: string
  shipping: string
  recipient: {
    name: string
    company?: string
    address1: string
    address2?: string
    city: string
    state_code: string
    state_name: string
    country_code: string
    country_name: string
    zip: string
    phone?: string
    email: string
  }
  items: Array<{
    sync_variant_id?: number
    external_variant_id?: string
    quantity: number
    retail_price?: string
  }>
  retail_costs?: {
    currency: string
    subtotal: string
    discount: string
    shipping: string
    tax: string
    total: string
  }
}

export class PrintfulService {
  private readonly baseUrl = "https://api.printful.com"
  private readonly apiKey: string
  private readonly storeId: string

  constructor() {
    this.apiKey = process.env.PRINTFUL_API_KEY || ""
    this.storeId = process.env.PRINTFUL_STORE_ID || "16713432" // Default to Kite Safaris Shop
    if (!this.apiKey) {
      console.warn("[PrintfulService] API key not configured")
    }
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error("Printful API key not configured")
    }

    // Add store_id parameter to all endpoints
    const separator = endpoint.includes('?') ? '&' : '?'
    const url = `${this.baseUrl}${endpoint}${separator}store_id=${this.storeId}`
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    }

    console.log(`[PrintfulService] Making request to: ${endpoint}`)

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`[PrintfulService] API error ${response.status}:`, errorText)
        
        // Parse error response for more details
        try {
          const errorData = JSON.parse(errorText)
          console.error(`[PrintfulService] Error details:`, errorData)
          
          // Check for specific authentication errors
          if (response.status === 401) {
            throw new Error(`Authentication failed: ${errorData.error?.message || 'Invalid API token or insufficient permissions'}`)
          } else if (response.status === 403) {
            throw new Error(`Access forbidden: ${errorData.error?.message || 'Token lacks required scopes'}`)
          } else if (response.status === 400) {
            throw new Error(`Bad request: ${errorData.error?.message || 'Invalid request data'}`)
          }
        } catch (parseError) {
          // If we can't parse the error, use the raw text
        }
        
        throw new Error(`Printful API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log(`[PrintfulService] Request successful:`, { endpoint, resultCount: data.result?.length || "N/A" })

      return data
    } catch (error) {
      console.error(`[PrintfulService] Request failed:`, error)
      throw error
    }
  }

  async getProducts(): Promise<PrintfulProduct[]> {
    try {
      const response = await this.makeRequest<{ code: number; result: PrintfulProduct[] }>("/store/products")
      return response.result || []
    } catch (error) {
      console.error("[PrintfulService] Failed to fetch products:", error)
      return []
    }
  }

  async getProduct(productId: number): Promise<PrintfulProduct | null> {
    try {
      const response = await this.makeRequest<{
        code: number
        result: { sync_product: PrintfulProduct; sync_variants: PrintfulVariant[] }
      }>(`/store/products/${productId}`)
      return response.result?.sync_product || null
    } catch (error) {
      console.error(`[PrintfulService] Failed to fetch product ${productId}:`, error)
      return null
    }
  }

  async getProductVariants(productId: number): Promise<PrintfulVariant[]> {
    try {
      const response = await this.makeRequest<{
        code: number
        result: { sync_product: PrintfulProduct; sync_variants: PrintfulVariant[] }
      }>(`/store/products/${productId}`)
      return response.result?.sync_variants || []
    } catch (error) {
      console.error(`[PrintfulService] Failed to fetch variants for product ${productId}:`, error)
      return []
    }
  }

  async getProductsByCategory(category?: string): Promise<PrintfulProduct[]> {
    const products = await this.getProducts()

    if (!category || category === "all") {
      return products
    }

    // Filter products based on category keywords in name
    const categoryKeywords: { [key: string]: string[] } = {
      apparel: ["shirt", "t-shirt", "hoodie", "sweatshirt", "tank", "polo"],
      accessories: ["hat", "cap", "bag", "tote", "backpack", "sticker", "mug", "bottle"],
      "kite-gear": ["kite", "board", "harness", "wetsuit"],
      lifestyle: ["mug", "bottle", "tumbler", "poster", "print", "canvas"],
    }

    const keywords = categoryKeywords[category.toLowerCase()] || []

    return products.filter((product) =>
      keywords.some((keyword) => product.name.toLowerCase().includes(keyword.toLowerCase())),
    )
  }

  async createOrder(orderData: PrintfulOrder): Promise<any> {
    try {
      console.log("[PrintfulService] Creating order with data:", {
        external_id: orderData.external_id,
        itemCount: orderData.items?.length,
        recipient: orderData.recipient?.name
      })

      const response = await this.makeRequest("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      })

      console.log("[PrintfulService] Order created successfully:", response.result?.id)
      return response
    } catch (error) {
      console.error("[PrintfulService] Failed to create order:", error)
      
      // Provide more specific error information
      if (error instanceof Error) {
        if (error.message.includes("401")) {
          throw new Error("Invalid Printful API key. Please check your configuration.")
        } else if (error.message.includes("400")) {
          throw new Error("Invalid order data. Please check your cart items.")
        } else if (error.message.includes("429")) {
          throw new Error("Rate limit exceeded. Please try again later.")
        } else {
          throw new Error(`Printful API error: ${error.message}`)
        }
      }
      
      throw new Error("Failed to create order with Printful")
    }
  }

  async getShippingRates(recipient: any, items: any[]): Promise<any> {
    try {
      const response = await this.makeRequest("/shipping/rates", {
        method: "POST",
        body: JSON.stringify({
          recipient,
          items,
        }),
      })
      return response
    } catch (error) {
      console.error("[PrintfulService] Failed to get shipping rates:", error)
      throw error
    }
  }

  // Helper method to format product data for frontend
  formatProductForFrontend(product: PrintfulProduct, variants: PrintfulVariant[] = []): any {
    const mainVariant = variants[0]

    return {
      id: product.id,
      name: product.name,
      thumbnail: product.thumbnail_url,
      price: mainVariant?.retail_price || "0.00",
      currency: mainVariant?.currency || "EUR",
      variants: variants.map((variant) => ({
        id: variant.id,
        name: variant.name,
        price: variant.retail_price,
        sku: variant.sku,
        image: variant.files.find((file) => file.type === "preview")?.url || variant.product.image,
        options: variant.options,
        available: variant.synced && !variant.is_ignored,
      })),
      category: this.categorizeProduct(product.name),
      available: product.synced > 0,
    }
  }

  private categorizeProduct(productName: string): string {
    const name = productName.toLowerCase()

    if (name.includes("shirt") || name.includes("hoodie") || name.includes("sweatshirt") || name.includes("tank")) {
      return "apparel"
    } else if (name.includes("hat") || name.includes("cap") || name.includes("bag") || name.includes("sticker")) {
      return "accessories"
    } else if (name.includes("kite") || name.includes("board")) {
      return "kite-gear"
    } else {
      return "lifestyle"
    }
  }
}

export const printfulService = new PrintfulService()

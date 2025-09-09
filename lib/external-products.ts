// External products data - products not managed through Printful
// These are affiliate products or products from other vendors

export interface ExternalProduct {
  id: string
  name: string
  description: string
  thumbnail: string
  price: string
  currency: string
  category: string
  vendor: string
  vendorUrl: string
  affiliateUrl: string
  variants: ExternalProductVariant[]
  available: boolean
  tags: string[]
  isAffiliateLink?: boolean // Simple affiliate link that redirects directly
}

export interface ExternalProductVariant {
  id: string
  name: string
  price: string
  image: string
  options: Array<{ id: string; value: string }>
  available: boolean
  sku?: string
}

// External products database
export const externalProducts: ExternalProduct[] = [
  {
    id: "awesome-maps-kitesurf-map",
    name: "Kitesurf Map",
    description: "The world's top 500 kitesurfing spots with icons on wind, level, temperature & more. Hand-illustrated & made in the EU.",
    thumbnail: "https://awesome-maps.com/cdn/shop/files/2.Artboard1copy_1.5x_491bc6fb-e9f2-4b9b-a33a-af5d3e3908ac.webp?v=1748073846",
    price: "69.90",
    currency: "USD",
    category: "lifestyle",
    vendor: "Awesome Maps",
    vendorUrl: "https://awesome-maps.com",
    affiliateUrl: "https://awesome-maps.com/collections/our-towels/products/kitesurf-map?ref=uqtcmmpp",
    available: true,
    tags: ["map", "kitesurfing", "travel", "decor", "gift"],
    isAffiliateLink: true,
    variants: [
      {
        id: "towel-colorful-61x37",
        name: "Towel / Colorful Illustrations / 61x37in / 155x95cm",
        price: "69.90",
        image: "https://awesome-maps.com/cdn/shop/files/2.Artboard1copy_1.5x_491bc6fb-e9f2-4b9b-a33a-af5d3e3908ac.webp?v=1748073846",
        options: [
          { id: "style", value: "Towel" },
          { id: "artwork", value: "Colorful Illustrations" },
          { id: "size", value: "61x37in / 155x95cm" }
        ],
        available: true,
        sku: "KIT-TOW-977"
      },
      {
        id: "towel-topography-61x37",
        name: "Towel / Topography & Line Art / 61x37in / 155x95cm",
        price: "69.90",
        image: "https://awesome-maps.com/cdn/shop/files/Artboard1copy18_1.5x_a387a1e5-9bdc-4704-b8d0-410dfac30308.webp?v=1748073846",
        options: [
          { id: "style", value: "Towel" },
          { id: "artwork", value: "Topography & Line Art" },
          { id: "size", value: "61x37in / 155x95cm" }
        ],
        available: true,
        sku: "KIT-TOW-TOP-890"
      },
      {
        id: "poster-colorful-36x24",
        name: "Poster / Colorful Illustrations / 36x24in / 90x60cm",
        price: "54.90",
        image: "https://awesome-maps.com/cdn/shop/files/2.Artboard1copy_1.5x_491bc6fb-e9f2-4b9b-a33a-af5d3e3908ac.webp?v=1748073846",
        options: [
          { id: "style", value: "Poster" },
          { id: "artwork", value: "Colorful Illustrations" },
          { id: "size", value: "36x24in / 90x60cm" }
        ],
        available: true,
        sku: "KIT-POS-977"
      },
      {
        id: "poster-colorful-46x33",
        name: "Poster / Colorful Illustrations / 46x33in / 118.8x84.1cm",
        price: "59.90",
        image: "https://awesome-maps.com/cdn/shop/files/2.Artboard1copy_1.5x_491bc6fb-e9f2-4b9b-a33a-af5d3e3908ac.webp?v=1748073846",
        options: [
          { id: "style", value: "Poster" },
          { id: "artwork", value: "Colorful Illustrations" },
          { id: "size", value: "46x33in / 118.8x84.1cm" }
        ],
        available: true,
        sku: "KIT-POS-977-L"
      },
      {
        id: "poster-topography-36x24",
        name: "Poster / Topography & Line Art / 36x24in / 90x60cm",
        price: "54.90",
        image: "https://awesome-maps.com/cdn/shop/files/Artboard1copy18_1.5x_a387a1e5-9bdc-4704-b8d0-410dfac30308.webp?v=1748073846",
        options: [
          { id: "style", value: "Poster" },
          { id: "artwork", value: "Topography & Line Art" },
          { id: "size", value: "36x24in / 90x60cm" }
        ],
        available: true,
        sku: "KIT-POS-TOP-890"
      },
      {
        id: "poster-topography-46x33",
        name: "Poster / Topography & Line Art / 46x33in / 118.8x84.1cm",
        price: "59.90",
        image: "https://awesome-maps.com/cdn/shop/files/Artboard1copy18_1.5x_a387a1e5-9bdc-4704-b8d0-410dfac30308.webp?v=1748073846",
        options: [
          { id: "style", value: "Poster" },
          { id: "artwork", value: "Topography & Line Art" },
          { id: "size", value: "46x33in / 118.8x84.1cm" }
        ],
        available: true,
        sku: "KIT-POS-TOP-890-L"
      },
      {
        id: "canvas-colorful-36x24",
        name: "Stretched Canvas / Colorful Illustrations / 36x24in / 90x60cm",
        price: "149.90",
        image: "https://awesome-maps.com/cdn/shop/files/2.Artboard1copy_1.5x_491bc6fb-e9f2-4b9b-a33a-af5d3e3908ac.webp?v=1748073846",
        options: [
          { id: "style", value: "Stretched Canvas" },
          { id: "artwork", value: "Colorful Illustrations" },
          { id: "size", value: "36x24in / 90x60cm" }
        ],
        available: true,
        sku: "KIT-CAN-977"
      },
      {
        id: "canvas-topography-36x24",
        name: "Stretched Canvas / Topography & Line Art / 36x24in / 90x60cm",
        price: "149.90",
        image: "https://awesome-maps.com/cdn/shop/files/Artboard1copy18_1.5x_a387a1e5-9bdc-4704-b8d0-410dfac30308.webp?v=1748073846",
        options: [
          { id: "style", value: "Stretched Canvas" },
          { id: "artwork", value: "Topography & Line Art" },
          { id: "size", value: "36x24in / 90x60cm" }
        ],
        available: true,
        sku: "KIT-CAN-TOP-890"
      },
      {
        id: "framed-colorful-36x24",
        name: "Poster Framed / Colorful Illustrations / 36x24in / 90x60cm",
        price: "169.90",
        image: "https://awesome-maps.com/cdn/shop/files/2.Artboard1copy_1.5x_491bc6fb-e9f2-4b9b-a33a-af5d3e3908ac.webp?v=1748073846",
        options: [
          { id: "style", value: "Poster Framed" },
          { id: "artwork", value: "Colorful Illustrations" },
          { id: "size", value: "36x24in / 90x60cm" }
        ],
        available: true,
        sku: "KIT-FRA-977"
      },
      {
        id: "framed-topography-36x24",
        name: "Poster Framed / Topography & Line Art / 36x24in / 90x60cm",
        price: "169.90",
        image: "https://awesome-maps.com/cdn/shop/files/Artboard1copy18_1.5x_a387a1e5-9bdc-4704-b8d0-410dfac30308.webp?v=1748073846",
        options: [
          { id: "style", value: "Poster Framed" },
          { id: "artwork", value: "Topography & Line Art" },
          { id: "size", value: "36x24in / 90x60cm" }
        ],
        available: true,
        sku: "KIT-FRA-TOP-890"
      },
      {
        id: "wood-colorful-36x24",
        name: "Wood / Colorful Illustrations / 36x24in / 90x60cm",
        price: "189.90",
        image: "https://awesome-maps.com/cdn/shop/files/2.Artboard1copy_1.5x_491bc6fb-e9f2-4b9b-a33a-af5d3e3908ac.webp?v=1748073846",
        options: [
          { id: "style", value: "Wood" },
          { id: "artwork", value: "Colorful Illustrations" },
          { id: "size", value: "36x24in / 90x60cm" }
        ],
        available: true,
        sku: "KIT-WOO-977"
      },
      {
        id: "wood-topography-36x24",
        name: "Wood / Topography & Line Art / 36x24in / 90x60cm",
        price: "189.90",
        image: "https://awesome-maps.com/cdn/shop/files/Artboard1copy18_1.5x_a387a1e5-9bdc-4704-b8d0-410dfac30308.webp?v=1748073846",
        options: [
          { id: "style", value: "Wood" },
          { id: "artwork", value: "Topography & Line Art" },
          { id: "size", value: "36x24in / 90x60cm" }
        ],
        available: true,
        sku: "KIT-WOO-TOP-890"
      }
    ]
  }
]

// Helper functions for external products
export function getExternalProducts(): ExternalProduct[] {
  return externalProducts.filter(product => product.available)
}

export function getExternalProductById(id: string): ExternalProduct | null {
  return externalProducts.find(product => product.id === id) || null
}

export function getExternalProductsByCategory(category?: string): ExternalProduct[] {
  const products = getExternalProducts()
  
  if (!category || category === "all") {
    return products
  }
  
  return products.filter(product => product.category === category)
}

export function formatExternalProductForFrontend(product: ExternalProduct): any {
  const mainVariant = product.variants[0]

  return {
    id: product.id,
    name: product.name,
    thumbnail: product.thumbnail,
    price: mainVariant?.price || product.price,
    currency: product.currency,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      variant_id: variant.id, // Use the same ID for external products
      name: variant.name,
      price: variant.price,
      sku: variant.sku,
      image: variant.image,
      options: variant.options,
      available: variant.available,
    })),
    category: product.category,
    available: product.available,
    // Add external product specific fields
    isExternal: true,
    vendor: product.vendor,
    vendorUrl: product.vendorUrl,
    affiliateUrl: product.affiliateUrl,
    description: product.description,
    tags: product.tags,
    isAffiliateLink: product.isAffiliateLink,
  }
}

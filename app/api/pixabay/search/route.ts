import { type NextRequest, NextResponse } from "next/server"

async function handlePixabayRequest(request: NextRequest) {
  try {
    let query: string | null = null
    let destination: string | null = null
    let perPage = 12

    if (request.method === "GET") {
      const { searchParams } = new URL(request.url)
      query = searchParams.get("query")
      destination = searchParams.get("destination")
      perPage = Number.parseInt(searchParams.get("per_page") || "12")
    } else if (request.method === "POST") {
      const body = await request.json()
      query = body.query || null
      destination = body.destination || null
      perPage = body.per_page || 12
    }

    console.log("[v0] Pixabay API request:", { query, destination, perPage })

    // Check for API key
    const apiKey = process.env.PIXABAY_API_KEY
    if (!apiKey) {
      console.log("[v0] Pixabay API key not configured")
      return NextResponse.json({
        success: false,
        error: "API key not configured",
        images: [],
      })
    }

    // Build search query
    let searchQuery = query || destination || "beach"
    if (destination && !query) {
      // Add kitesurfing/sailing context for destinations
      searchQuery = `${destination} kitesurfing beach sailing`
    }

    console.log("[v0] Pixabay search query:", searchQuery)

    // Make request to Pixabay API
    const pixabayUrl = new URL("https://pixabay.com/api/")
    pixabayUrl.searchParams.set("key", apiKey)
    pixabayUrl.searchParams.set("q", searchQuery)
    pixabayUrl.searchParams.set("image_type", "photo")
    pixabayUrl.searchParams.set("orientation", "all")
    pixabayUrl.searchParams.set("category", "places,nature,sports")
    pixabayUrl.searchParams.set("min_width", "1920")
    pixabayUrl.searchParams.set("min_height", "1080")
    pixabayUrl.searchParams.set("per_page", perPage.toString())
    pixabayUrl.searchParams.set("safesearch", "true")
    pixabayUrl.searchParams.set("order", "popular")

    console.log("[v0] Pixabay API URL:", pixabayUrl.toString().replace(apiKey, "[REDACTED]"))

    const response = await fetch(pixabayUrl.toString())

    if (!response.ok) {
      console.log("[v0] Pixabay API error:", response.status, response.statusText)
      return NextResponse.json({
        success: false,
        error: `Pixabay API error: ${response.status}`,
        images: [],
      })
    }

    const data = await response.json()
    console.log("[v0] Pixabay API response:", { totalHits: data.totalHits, hits: data.hits?.length })

    // Transform Pixabay data to our format
    const images =
      data.hits?.map((hit: any) => ({
        id: hit.id.toString(),
        url: hit.webformatURL,
        fullUrl: hit.largeImageURL,
        alt: hit.tags || searchQuery,
        title: hit.tags || searchQuery,
        photographer: hit.user,
        photographerUrl: `https://pixabay.com/users/${hit.user}-${hit.user_id}/`,
        source: "Pixabay",
        sourceUrl: hit.pageURL,
        width: hit.webformatWidth,
        height: hit.webformatHeight,
        downloads: hit.downloads,
        likes: hit.likes,
      })) || []

    return NextResponse.json({
      success: true,
      images,
      total: data.totalHits || 0,
      query: searchQuery,
    })
  } catch (error) {
    console.error("[v0] Pixabay API error:", error)
    return NextResponse.json({
      success: false,
      error: "Internal server error",
      images: [],
    })
  }
}

export async function GET(request: NextRequest) {
  return handlePixabayRequest(request)
}

export async function POST(request: NextRequest) {
  return handlePixabayRequest(request)
}

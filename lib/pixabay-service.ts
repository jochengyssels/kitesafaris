export interface PixabayImage {
  id: string
  url: string
  fullUrl: string
  alt: string
  title: string
  photographer: string
  photographerUrl: string
  source: string
  sourceUrl: string
  width: number
  height: number
  downloads: number
  likes: number
}

export interface PixabaySearchResult {
  success: boolean
  images: PixabayImage[]
  total: number
  query: string
  error?: string
}

export class PixabayService {
  private static instance: PixabayService
  private cache = new Map<string, { data: PixabaySearchResult; timestamp: number }>()
  private readonly CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

  static getInstance(): PixabayService {
    if (!PixabayService.instance) {
      PixabayService.instance = new PixabayService()
    }
    return PixabayService.instance
  }

  // Destination-specific keyword mapping
  private getDestinationKeywords(destination: string): string[] {
    const keywordMap: Record<string, string[]> = {
      antigua: ["antigua caribbean beach", "antigua kitesurfing", "caribbean sailing"],
      sardinia: ["sardinia beach italy", "sardinia kitesurfing", "mediterranean sailing"],
      greece: ["greek islands sailing", "greece kitesurfing", "aegean sea"],
      croatia: ["croatia sailing adriatic", "croatia kitesurfing", "dalmatian coast"],
      turkey: ["turkey sailing mediterranean", "turkey kitesurfing", "turkish coast"],
      spain: ["spain sailing mediterranean", "spain kitesurfing", "balearic islands"],
      italy: ["italy sailing mediterranean", "italy kitesurfing", "italian coast"],
      france: ["france sailing mediterranean", "france kitesurfing", "french riviera"],
    }

    const normalizedDestination = destination.toLowerCase()
    return (
      keywordMap[normalizedDestination] || [
        `${destination} sailing`,
        `${destination} kitesurfing`,
        `${destination} beach`,
      ]
    )
  }

  async searchImages(query: string, perPage = 12): Promise<PixabaySearchResult> {
    const cacheKey = `${query}-${perPage}`

    // Check cache first
    const cached = this.cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      console.log("[v0] Returning cached Pixabay results for:", query)
      return cached.data
    }

    try {
      const url = new URL("/api/pixabay/search", window.location.origin)
      url.searchParams.set("query", query)
      url.searchParams.set("per_page", perPage.toString())

      console.log("[v0] Fetching Pixabay images for query:", query)
      const response = await fetch(url.toString())

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const result: PixabaySearchResult = await response.json()

      // Cache successful results
      if (result.success) {
        this.cache.set(cacheKey, { data: result, timestamp: Date.now() })
      }

      return result
    } catch (error) {
      console.error("[v0] PixabayService error:", error)
      return {
        success: false,
        images: [],
        total: 0,
        query,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  async searchMultipleKeywords(destination: string, perPage = 12): Promise<PixabaySearchResult> {
    const keywords = this.getDestinationKeywords(destination)
    console.log("[v0] Searching Pixabay with multiple keywords for", destination, ":", keywords)

    // Try each keyword until we get results
    for (const keyword of keywords) {
      const result = await this.searchImages(keyword, perPage)
      if (result.success && result.images.length > 0) {
        console.log("[v0] Found", result.images.length, "images for keyword:", keyword)
        return result
      }
    }

    // If no keywords returned results, try the destination name alone
    console.log("[v0] No results from specific keywords, trying destination name:", destination)
    return await this.searchImages(destination, perPage)
  }

  clearCache(): void {
    this.cache.clear()
  }
}

export const pixabayService = PixabayService.getInstance()

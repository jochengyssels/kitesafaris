"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import type { ImageProps } from "next/image"

interface SmartImageProps extends Omit<ImageProps, "onError"> {
  destination?: string
  context?: string
  fallbackKeywords?: string[]
  onReplacement?: (newSrc: string) => void
}

export function SmartImage({
  src,
  alt,
  destination = "caribbean",
  context = "",
  fallbackKeywords = ["kiteboarding", "sailing", "ocean"],
  onReplacement,
  ...props
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleError = useCallback(async () => {
    if (hasError) return // Prevent infinite loops

    setHasError(true)
    setIsLoading(true)

    try {
      // Create search query from context and fallback keywords
      const searchTerms = [destination, context, ...fallbackKeywords].filter(Boolean).join(" ")

      const response = await fetch("/api/pixabay/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchTerms,
          per_page: 1,
          category: "sports",
          min_width: 800,
          min_height: 600,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.images && data.images.length > 0) {
          const newSrc = data.images[0].webformatURL
          setCurrentSrc(newSrc)
          onReplacement?.(newSrc)
          console.log(`[v0] Image replaced with Pixabay image: ${newSrc}`)
        }
      }
    } catch (error) {
      console.error("[v0] Failed to fetch replacement image:", error)
    } finally {
      setIsLoading(false)
    }
  }, [destination, context, fallbackKeywords, hasError, onReplacement])

  // Enhanced alt text when using replacement
  const enhancedAlt = hasError ? `${alt} (replacement image from Pixabay showing ${destination} ${context})` : alt

  return (
    <div className="relative">
      <Image {...props} src={currentSrc || "/placeholder.svg"} alt={enhancedAlt} onError={handleError} />
      {isLoading && (
        <div className="absolute inset-0 bg-turquoise/10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-turquoise"></div>
        </div>
      )}
    </div>
  )
}

export default SmartImage

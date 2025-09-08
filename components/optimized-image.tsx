"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  sizes?: string
  className?: string
}

export function OptimizedImage({
  src,
  alt,
  priority = false,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className = "",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Generate optimized src for WebP format when possible
  const getOptimizedSrc = (originalSrc: string) => {
    // If it's already a Vercel blob URL or external URL, return as is
    if (originalSrc.includes('blob.vercel-storage.com') || originalSrc.startsWith('http')) {
      return originalSrc
    }
    
    // For local images, we'll keep them as is for now
    // In production, you'd want to convert these to WebP
    return originalSrc
  }

  const optimizedSrc = getOptimizedSrc(src as string)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        {...props}
        src={hasError ? "/placeholder.svg" : optimizedSrc}
        alt={alt}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${props.className || ""}`}
      />
      
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
    </div>
  )
}

export default OptimizedImage

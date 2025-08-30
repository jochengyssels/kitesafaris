"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ExternalLink, Camera } from "lucide-react"
import { pixabayService, type PixabayImage } from "@/lib/pixabay-service"

interface PixabayGalleryProps {
  destination: string
  title?: string
  perPage?: number
  className?: string
}

export function PixabayGallery({ destination, title, perPage = 12, className = "" }: PixabayGalleryProps) {
  const [images, setImages] = useState<PixabayImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<PixabayImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [apiKeyMissing, setApiKeyMissing] = useState(false)

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const focusTrapRef = useRef<HTMLDivElement>(null)

  const minSwipeDistance = 50

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.touches[0].clientX)
  }, [])

  const onTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!touchStart || !touchEnd) return

      const distance = touchStart - touchEnd
      if (distance > minSwipeDistance) {
        navigateModal("next")
      } else if (distance < -minSwipeDistance) {
        navigateModal("prev")
      }
    },
    [touchStart, touchEnd, minSwipeDistance],
  )

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true)
        setError(null)
        setApiKeyMissing(false)
        console.log("[v0] Loading Pixabay gallery for destination:", destination)

        const result = await pixabayService.searchMultipleKeywords(destination, perPage)

        if (!result.success || result.images.length === 0) {
          if (result.error === "API key not configured") {
            setApiKeyMissing(true)
            setError(null)
          } else {
            setError("No images found for this destination")
          }
        } else {
          setImages(result.images)
          console.log("[v0] Loaded", result.images.length, "images for gallery")
        }
      } catch (err) {
        console.error("[v0] Gallery loading error:", err)
        if (err instanceof Error && err.message.includes("API key not configured")) {
          setApiKeyMissing(true)
          setError(null)
        } else {
          setError("Failed to load gallery images")
        }
      } finally {
        setLoading(false)
      }
    }

    if (destination) {
      loadImages()
    }
  }, [destination, perPage])

  const openModal = useCallback((image: PixabayImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
    document.body.style.overflow = "hidden"

    setTimeout(() => {
      focusTrapRef.current?.focus()
    }, 100)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedImage(null)
    document.body.style.overflow = "unset"

    const triggerElement = document.querySelector(`[data-image-id="${selectedImage?.id}"]`) as HTMLElement
    triggerElement?.focus()
  }, [selectedImage])

  const navigateModal = useCallback(
    (direction: "prev" | "next") => {
      if (!images.length) return

      const newIndex =
        direction === "next" ? (currentIndex + 1) % images.length : (currentIndex - 1 + images.length) % images.length

      setCurrentIndex(newIndex)
      setSelectedImage(images[newIndex])
    },
    [currentIndex, images],
  )

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {title && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full" />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: perPage }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="sr-only" aria-live="polite">
          Loading gallery images for {destination}
        </div>
      </div>
    )
  }

  if (apiKeyMissing) {
    return null
  }

  if (error || images.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        {title && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full" />
          </div>
        )}
        <div className="text-center py-12 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
          <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-slate-700 mb-2">Gallery Coming Soon</h4>
          <p className="text-slate-500">We're curating beautiful images of {destination} for you. Check back soon!</p>
        </div>
        <div className="sr-only" aria-live="assertive">
          {error || `No images available for ${destination} at this time`}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`space-y-6 ${className}`}>
        {title && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full" />
          </div>
        )}

        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4"
          role="grid"
          aria-label={`Photo gallery of ${destination} with ${images.length} images`}
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg sm:rounded-xl bg-slate-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer touch-manipulation"
              onClick={() => openModal(image, index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  openModal(image, index)
                }
              }}
              tabIndex={0}
              role="gridcell"
              aria-label={`View image: ${image.alt}. Photo by ${image.photographer}`}
              data-image-id={image.id}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                loading={index < 8 ? "eager" : "lazy"}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                  <p className="text-white text-xs sm:text-sm font-medium truncate">Photo by {image.photographer}</p>
                  <p className="text-white/80 text-xs">Pixabay</p>
                </div>
              </div>

              <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-teal-400/50 group-focus:border-teal-400 transition-colors duration-300" />
            </div>
          ))}
        </div>

        <div className="sr-only" aria-live="polite">
          Gallery loaded with {images.length} images of {destination}. Use arrow keys to navigate when an image is
          selected.
        </div>
      </div>

      {selectedImage && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            className="relative max-w-7xl max-h-[90vh] mx-2 sm:mx-4"
            onClick={(e) => e.stopPropagation()}
            ref={focusTrapRef}
            tabIndex={-1}
          >
            <button
              onClick={closeModal}
              className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-teal-400 focus:text-teal-400 transition-colors z-10 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
              aria-label="Close gallery modal"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={() => navigateModal("prev")}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-teal-400 focus:text-teal-400 transition-colors z-10 bg-black/20 rounded-full p-2 sm:p-3 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 touch-manipulation"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={() => navigateModal("next")}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-teal-400 focus:text-teal-400 transition-colors z-10 bg-black/20 rounded-full p-2 sm:p-3 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-400 touch-manipulation"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            <div className="relative">
              <Image
                src={selectedImage.fullUrl || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg"
                priority
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-6 rounded-b-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-white gap-3 sm:gap-0">
                <div>
                  <h4 id="modal-title" className="font-semibold text-base sm:text-lg mb-1">
                    {selectedImage.title}
                  </h4>
                  <p className="text-white/80 text-sm">Photo by {selectedImage.photographer}</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <a
                    href={selectedImage.photographerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-teal-400 focus:text-teal-400 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded px-1"
                  >
                    {selectedImage.photographer}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={selectedImage.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-teal-400 focus:text-teal-400 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded px-1"
                  >
                    Pixabay
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {images.length > 1 && (
                <div className="text-center mt-3">
                  <span className="text-white/60 text-sm" id="modal-description">
                    Image {currentIndex + 1} of {images.length}. Swipe or use arrow keys to navigate.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

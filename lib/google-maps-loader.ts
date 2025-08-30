"use client"

import { useEffect } from "react"

import { useState } from "react"

let isLoading = false
let isLoaded = false
let loadPromise: Promise<void> | null = null

const API_KEY = "AIzaSyDXWfTjvQk-A_jHNMRJrH4KODSdf5pp07M"

export function loadGoogleMapsAPI(): Promise<void> {
  // Return existing promise if already loading
  if (loadPromise) {
    return loadPromise
  }

  // Return resolved promise if already loaded
  if (isLoaded && window.google?.maps) {
    return Promise.resolve()
  }

  // Create new loading promise
  loadPromise = new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.google?.maps) {
      isLoaded = true
      resolve()
      return
    }

    // Prevent multiple script injections
    if (isLoading) {
      return
    }

    isLoading = true

    // Create callback function
    const callbackName = `googleMapsCallback_${Date.now()}`
    ;(window as any)[callbackName] = () => {
      isLoaded = true
      isLoading = false
      delete (window as any)[callbackName]
      resolve()
    }

    // Create and inject script
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${callbackName}`
    script.async = true
    script.defer = true
    script.onerror = () => {
      isLoading = false
      delete (window as any)[callbackName]
      reject(new Error("Failed to load Google Maps API"))
    }

    document.head.appendChild(script)
  })

  return loadPromise
}

// Hook for React components
export function useGoogleMaps() {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadGoogleMapsAPI()
      .then(() => setIsReady(true))
      .catch((err) => setError(err.message))
  }, [])

  return { isReady, error }
}

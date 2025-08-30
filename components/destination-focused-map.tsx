"use client"

import { useEffect, useRef } from "react"
import { loadGoogleMapsAPI } from "@/lib/google-maps-loader"
import type { google } from "google-maps"

interface DestinationFocusedMapProps {
  destination: {
    id: string
    name: string
    coordinates: { lat: number; lng: number }
    zoom?: number
  }
  className?: string
}

export function DestinationFocusedMap({ destination, className = "" }: DestinationFocusedMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const initMap = () => {
      if (!window.google || !mapRef.current) return

      const map = new window.google.maps.Map(mapRef.current, {
        center: destination.coordinates,
        zoom: destination.zoom || 10,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#4ECDC4" }],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#F8E9D2" }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      })

      // Add marker for the destination
      new window.google.maps.Marker({
        position: destination.coordinates,
        map: map,
        title: destination.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#FF6B47",
          fillOpacity: 1,
          strokeColor: "#013A63",
          strokeWeight: 2,
        },
      })

      mapInstanceRef.current = map
    }

    loadGoogleMapsAPI()
      .then(() => {
        initMap()
      })
      .catch((error) => {
        console.error("Failed to load Google Maps:", error)
      })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null
      }
    }
  }, [destination])

  return (
    <div className={`bg-sand-beige rounded-2xl overflow-hidden ${className}`}>
      <div className="p-6">
        <h3 className="font-montserrat font-bold text-deep-navy text-lg">{destination.name} Location</h3>
        <p className="font-open-sans text-gray-600 text-sm mt-1 mb-4">
          Explore the kitesurfing area and surrounding region
        </p>
        <div
          ref={mapRef}
          className="w-full h-80 rounded-lg overflow-hidden"
          role="img"
          aria-label={`Map showing ${destination.name} kitesurfing location`}
        />
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { loadGoogleMapsAPI } from "@/lib/google-maps-loader"
import type { google } from "google-maps"

interface RouteMapProps {
  title: string
  description: string
  waypoints: Array<{
    name: string
    coordinates: { lat: number; lng: number }
    description: string
  }>
  className?: string
}

export function RouteMap({ title, description, waypoints, className = "" }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const initMap = () => {
      if (!window.google || !mapRef.current) return

      // Calculate bounds to fit all waypoints
      const bounds = new window.google.maps.LatLngBounds()
      waypoints.forEach((waypoint) => bounds.extend(waypoint.coordinates))

      const map = new window.google.maps.Map(mapRef.current, {
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

      map.fitBounds(bounds)

      // Add markers for each waypoint
      waypoints.forEach((waypoint, index) => {
        const marker = new window.google.maps.Marker({
          position: waypoint.coordinates,
          map: map,
          title: waypoint.name,
          label: {
            text: (index + 1).toString(),
            color: "white",
            fontWeight: "bold",
          },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "#FF6B47",
            fillOpacity: 1,
            strokeColor: "#013A63",
            strokeWeight: 2,
          },
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h4 class="font-bold text-deep-navy">${waypoint.name}</h4>
              <p class="text-sm text-gray-600 mt-1">${waypoint.description}</p>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })
      })

      // Draw route line if more than one waypoint
      if (waypoints.length > 1) {
        const routePath = new window.google.maps.Polyline({
          path: waypoints.map((wp) => wp.coordinates),
          geodesic: true,
          strokeColor: "#013A63",
          strokeOpacity: 0.8,
          strokeWeight: 3,
        })
        routePath.setMap(map)
      }

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
  }, [waypoints])

  return (
    <div className={`bg-sand-beige rounded-2xl overflow-hidden ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-montserrat font-bold text-deep-navy text-lg">{title}</h3>
        <p className="font-open-sans text-gray-600 text-sm mt-1">{description}</p>
      </div>
      <div ref={mapRef} className="w-full h-96" role="img" aria-label={`Route map showing ${title}`} />
    </div>
  )
}

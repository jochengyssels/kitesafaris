"use client"

import { useState, useEffect, useRef } from "react"
import { Wind, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { loadGoogleMapsAPI } from "@/lib/google-maps-loader"

interface Destination {
  id: string
  name: string
  country: string
  position: { lat: number; lng: number }
  windRating: number
  season: string
  image: string
  description: string
  price: string
}

const destinations: Destination[] = [
  {
    id: "antigua",
    name: "Antigua & Barbuda",
    country: "Caribbean",
    position: { lat: 17.0608, lng: -61.7964 }, // Updated to real coordinates for Antigua
    windRating: 5,
    season: "Dec - Apr",
    image: "/antigua-aerial-harbor-view.jpg", // Updated to use the new aerial harbor view image of Antigua
    description: "7-day luxury catamaran kitesafari with consistent trade winds",
    price: "€1,900",
  },
  {
    id: "greece",
    name: "Aegean Islands",
    country: "Greece",
    position: { lat: 37.4419, lng: 25.3667 }, // Updated to real coordinates for Cyclades
    windRating: 5,
    season: "Jun - Sep",
    image: "/greek-aegean-islands-kiteboarding-destination.png", // Using existing Greek islands image instead of removed Red Sea image
    description: "Meltemi winds and pristine island hopping adventure",
    price: "Coming Soon",
  },
  {
    id: "sardinia",
    name: "Punta Trettu",
    country: "Sardinia",
    position: { lat: 39.0458, lng: 8.8983 }, // Updated to real coordinates for Punta Trettu
    windRating: 4,
    season: "All Year",
    image: "/sardinia-punta-trettu-kiteboarding-mediterranean-c.png", // Using existing Sardinia image instead of removed Jericoacoara image
    description: "Year-round kitesurfing from our home base location",
    price: "Coming Soon",
  },
]

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

function DestinationsMap() {
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const infoWindowRef = useRef<any>(null)

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current || !window.google) return

      // Initialize map centered on Mediterranean/Atlantic
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 3,
        center: { lat: 35, lng: 10 },
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#0ea5e9" }, { lightness: 17 }],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      })

      mapInstanceRef.current = map

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow()
      infoWindowRef.current = infoWindow

      // Add markers for each destination
      destinations.forEach((destination) => {
        const marker = new window.google.maps.Marker({
          position: destination.position,
          map: map,
          title: destination.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#ff6b47", // coral-orange
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        })

        // Create info window content
        const infoContent = `
          <div class="p-3 max-w-xs">
            <h3 class="font-semibold text-slate-800 mb-2">${destination.name}, ${destination.country}</h3>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-sm text-slate-600">Wind Rating:</span>
                <span class="text-sm font-medium">${destination.windRating}/5</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-slate-600">Best Season:</span>
                <span class="text-sm font-medium">${destination.season}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-slate-600">From:</span>
                <span class="text-sm font-bold text-orange-500">${destination.price}</span>
              </div>
              <p class="text-sm text-slate-500 mt-2">${destination.description}</p>
              <a href="/destinations/${destination.id}" class="inline-block mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                Explore Safari
              </a>
            </div>
          </div>
        `

        marker.addListener("click", () => {
          infoWindow.setContent(infoContent)
          infoWindow.open(map, marker)
          setSelectedDestination(destination.id)
        })

        markersRef.current.push(marker)
      })
    }

    loadGoogleMapsAPI()
      .then(() => {
        initializeMap()
      })
      .catch((error) => {
        console.error("Failed to load Google Maps:", error)
      })

    return () => {
      // Cleanup
      markersRef.current.forEach((marker) => marker.setMap(null))
      markersRef.current = []
    }
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Wind key={i} className={`w-3 h-3 ${i < rating ? "text-coral-orange fill-coral-orange" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-navy mb-4 font-sans">Our Three Destinations</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Caribbean winter adventures, Greek summer sailing, and year-round Sardinian experiences
          </p>
        </div>

        {/* Desktop Google Maps View */}
        <div className="hidden lg:block relative">
          <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-turquoise/20 shadow-lg">
            <div ref={mapRef} className="w-full h-full" />
          </div>
        </div>

        {/* Mobile List View */}
        <div className="lg:hidden grid gap-4 sm:grid-cols-2">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-32">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={`${destination.name} kiteboarding destination with luxury catamaran and perfect wind conditions`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-coral-orange text-white px-2 py-1 rounded-full text-xs font-medium">
                  {destination.windRating}/5 <Wind className="inline w-3 h-3 ml-1" />
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-deep-navy mb-1">{destination.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{destination.country}</p>

                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-turquoise" />
                  <span className="text-sm text-slate-600">{destination.season}</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-slate-600">From:</span>
                  <span className="text-sm font-bold text-coral-orange">{destination.price}</span>
                </div>

                <p className="text-xs text-slate-500 mb-3">{destination.description}</p>

                <Link href={`/destinations/${destination.id}`}>
                  <button className="w-full bg-turquoise text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-turquoise/90 transition-colors duration-200">
                    Explore Safari
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { DestinationsMap }
export default DestinationsMap

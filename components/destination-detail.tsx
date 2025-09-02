"use client"

import Image from "next/image"
import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Wind,
  Waves,
  Star,
  Calendar,
  MapPin,
  Users,
  Anchor,
  Camera,
  Sunset,
  Fish,
  Mountain,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import { PixabayGallery } from "./pixabay-gallery"
import { SardinianAwakeningCTA } from "./sardinian-awakening-cta"

interface Destination {
  id: string
  name: string
  region: string
  bannerImage: string
  windRating: number
  difficulty: string
  tideRating: number
  season: string
  windSpeed: string
  culture: string
  intro: string
  highlights: string[]
  itinerary: Array<{
    day: number
    activity: string
    description: string
  }>
  gallery: string[]
}

interface DestinationDetailProps {
  destination: Destination
}

export function DestinationDetail({ destination }: DestinationDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [expandedDay, setExpandedDay] = useState<number | null>(null)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + destination.gallery.length) % destination.gallery.length)
  }

  const otherDestinations = [
    { id: "greece", name: "Aegean Islands, Greece" },
    { id: "sardinia", name: "Punta Trettu, Sardinia" },
  ].filter((dest) => dest.id !== destination.id)

  const getActivityIcon = (activity: string) => {
    const activityLower = activity.toLowerCase()
    if (activityLower.includes("arrival") || activityLower.includes("orientation")) return Anchor
    if (activityLower.includes("bay") || activityLower.includes("session")) return Wind
    if (activityLower.includes("exploration") || activityLower.includes("adventure")) return Mountain
    if (activityLower.includes("island") || activityLower.includes("wildlife")) return Fish
    if (activityLower.includes("expedition") || activityLower.includes("lagoon")) return Waves
    if (activityLower.includes("harbor") || activityLower.includes("farewell")) return Sunset
    return Camera
  }

  const getLocationCoordinates = (destinationId: string) => {
    const coordinates = {
      antigua: { lat: 17.0608, lng: -61.7964, zoom: 11 },
      greece: { lat: 37.0902, lng: 25.1535, zoom: 10 },
      sardinia: { lat: 39.0458, lng: 8.4983, zoom: 11 },
    }
    return coordinates[destinationId as keyof typeof coordinates] || coordinates.antigua
  }

  const getDayName = (dayNumber: number) => {
    const dayNames = ["", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    return dayNames[dayNumber] || `Day ${dayNumber}`
  }

  const locationData = getLocationCoordinates(destination.id)

  return (
    <div className="pt-16">
      {/* Full-width banner */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src={
            destination.bannerImage ||
            "/placeholder.svg?height=600&width=1200&query=tropical kiteboarding destination with turquoise water and luxury catamaran" ||
            "/placeholder.svg" ||
            "/placeholder.svg" ||
            "/placeholder.svg" ||
            "/placeholder.svg"
          }
          alt={`Kiteboarding scene in ${destination.name}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl text-white mb-4 text-balance">
              {destination.name}
            </h1>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <Wind className="w-6 h-6 text-coral-orange" />
                <span className="font-open-sans">
                  {Array.from({ length: destination.windRating }, (_, i) => "★").join("")} Wind
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-6 h-6 text-coral-orange" />
                <span className="font-open-sans">
                  {Array.from({ length: destination.tideRating }, (_, i) => "★").join("")} Tides
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-coral-orange" />
                <span className="font-open-sans">{destination.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <p className="font-open-sans text-lg text-gray-700 leading-relaxed">{destination.intro}</p>
          </section>

          <section>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
              <div className="p-4 bg-sand-beige border-b border-gray-200">
                <h2 className="font-montserrat font-bold text-2xl text-deep-navy flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-turquoise" />
                  {destination.name} Location
                </h2>
              </div>
              <div className="relative h-64 w-full bg-gradient-to-br from-turquoise/20 to-deep-navy/20 flex items-center justify-center">
                {/* Static location display */}
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-turquoise mx-auto mb-3" />
                  <h3 className="font-montserrat font-semibold text-deep-navy text-lg mb-1">{destination.name}</h3>
                  <p className="font-open-sans text-gray-600 text-sm">
                    Coordinates: {locationData.lat}°, {locationData.lng}°
                  </p>
                  <p className="font-open-sans text-xs text-gray-500 mt-2">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-sand-beige rounded-lg p-8 shadow-lg">
              <h2 className="font-montserrat font-bold text-2xl text-deep-navy mb-6">Quick Facts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-turquoise" />
                  <div>
                    <div className="font-open-sans font-medium text-gray-800">Best Season</div>
                    <div className="font-open-sans text-gray-600">{destination.season}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="w-6 h-6 text-turquoise" />
                  <div>
                    <div className="font-open-sans font-medium text-gray-800">Wind Speed</div>
                    <div className="font-open-sans text-gray-600">{destination.windSpeed}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-turquoise" />
                  <div>
                    <div className="font-open-sans font-medium text-gray-800">Local Culture</div>
                    <div className="font-open-sans text-gray-600">{destination.culture}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SardinianAwakeningCTA variant="destinations" />

          {/* Trip highlights */}
          <section>
            <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-6">Trip Highlights</h2>
            <ul className="space-y-3">
              {destination.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-turquoise flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-open-sans text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Sample itinerary */}
          <section>
            <h2 className="font-montserrat font-bold text-3xl text-deep-navy mb-8">Sample Itinerary</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-turquoise via-coral-orange to-turquoise"></div>

              <div className="space-y-6">
                {destination.itinerary.map((item, index) => {
                  const IconComponent = getActivityIcon(item.activity)
                  const isExpanded = expandedDay === index

                  return (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute left-6 w-4 h-4 bg-white border-4 border-turquoise rounded-full z-10"></div>

                      {/* Card */}
                      <div className="ml-16 bg-white rounded-xl shadow-lg border border-sand-beige/30 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div
                          className="p-6 cursor-pointer"
                          onClick={() => setExpandedDay(isExpanded ? null : index)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              setExpandedDay(isExpanded ? null : index)
                            }
                          }}
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? "Collapse" : "Expand"} details for ${item.day}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              {/* Activity icon */}
                              <div className="w-12 h-12 bg-gradient-to-br from-coral-orange to-coral-orange/80 rounded-full flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-6 h-6 text-white stroke-2" />
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-montserrat font-bold text-xl text-coral-orange">{getDayName(item.day)}</h3>
                                  <div className="h-px bg-gradient-to-r from-coral-orange/30 to-transparent flex-1"></div>
                                </div>

                                <h4 className="font-montserrat font-semibold text-lg text-deep-navy mb-2">
                                  {item.activity}
                                </h4>

                                <p className="font-open-sans text-gray-700 leading-relaxed">{item.description}</p>
                              </div>
                            </div>

                            {/* Expand/collapse button */}
                            <button
                              className="ml-4 p-2 rounded-full hover:bg-sand-beige/50 transition-colors duration-200"
                              aria-label={isExpanded ? "Collapse details" : "Expand details"}
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-turquoise" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-turquoise" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Expandable content */}
                        {isExpanded && (
                          <div className="px-6 pb-6 border-t border-sand-beige/30 bg-gradient-to-r from-sand-beige/20 to-transparent">
                            <div className="pt-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-montserrat font-semibold text-deep-navy mb-2">What to Expect</h5>
                                  <ul className="space-y-1 text-sm text-gray-600">
                                    <li className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-turquoise rounded-full"></div>
                                      Perfect conditions for all skill levels
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-turquoise rounded-full"></div>
                                      Professional coaching available
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-turquoise rounded-full"></div>
                                      All equipment provided
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-montserrat font-semibold text-deep-navy mb-2">Highlights</h5>
                                  <div className="text-sm text-gray-600">
                                    Experience the magic of Caribbean kitesurfing in pristine conditions with expert
                                    guidance and luxury comfort.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          <section>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
              <h2 className="font-montserrat font-bold text-2xl text-deep-navy mb-6">Other Destinations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherDestinations.map((dest) => (
                  <Link
                    key={dest.id}
                    href={`/destinations/${dest.id}`}
                    className="block p-4 rounded-lg hover:bg-sand-beige transition-colors duration-200 border border-sand-beige/30"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-turquoise" />
                      <span className="font-open-sans text-gray-700 hover:text-deep-navy font-medium">{dest.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Photo gallery */}
        <section className="mt-16">
          <PixabayGallery
            destination={destination.id}
            title={`${destination.name} Gallery`}
            perPage={16}
            className="mb-8"
          />

          {/* Keep original gallery as fallback/additional content */}
          <div className="mt-12 pt-8 border-t border-sand-beige/30">
            <h3 className="font-montserrat font-semibold text-xl text-deep-navy mb-6 text-center">Featured Images</h3>
            <div className="relative">
              <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                <Image
                  src={destination.gallery[currentImageIndex] || "/placeholder.svg"}
                  alt={`${destination.name} gallery image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-deep-navy" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-deep-navy" />
              </button>

              {/* Image indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {destination.gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentImageIndex ? "bg-turquoise" : "bg-gray-300"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-turquoise to-deep-navy rounded-lg p-8 text-white">
            <h2 className="font-montserrat font-bold text-3xl mb-4">Ready for Your Adventure?</h2>
            <p className="font-open-sans text-lg mb-6 max-w-2xl mx-auto">
              Book your kiteboarding safari to {destination.name} and experience the adventure of a lifetime.
            </p>
            <Link 
              href="/booking" 
              className="inline-block bg-coral-orange hover:bg-coral-orange/90 text-white font-montserrat font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200"
            >
              Book This Safari
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

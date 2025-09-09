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
import { DestinationFocusedMap } from "./destination-focused-map"
import PuntaTrettuWebcam from "./webcam/PuntaTrettuWebcam"
import WindForecastCard from "./weather/WindForecastCard"
import { AntiguaWeatherWidget } from "./antigua-weather-widget"
import { AntiguaBookingCalculator } from "./antigua-booking-calculator"

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
  coordinates?: {
    lat: number
    lng: number
  }
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
    <div>
      {/* Full-width banner */}
      {destination.id === "sardinia" ? (
        /* Live webcam hero for Sardinia */
        <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <PuntaTrettuWebcam
              className="w-full h-full object-cover"
              ariaLabel="Live webcam stream: Punta Trettu, Sardinia - Current kitesurfing conditions"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Live indicator */}
          <div className="absolute top-6 right-6 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>

          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-montserrat font-bold text-4xl md:text-6xl text-white mb-4 text-balance">
                {destination.name}
              </h1>
              <p className="font-open-sans text-lg md:text-xl text-white/90 mb-6">
                Watch live conditions at Sardinia's premier kitesurfing destination
              </p>

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
      ) : (
        /* Static image hero for other destinations */
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
            alt={`${destination.name} kitesurfing spot aerial view luxury catamaran kitesurfing kite safari`}
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
              <div className="flex flex-wrap gap-6 text-white mb-6">
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

              {/* Enhanced CTA Section for Antigua */}
              {destination.id === "antigua" && (
                <div className="space-y-4">
                  {/* Key Benefits */}
                  <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-coral-orange rounded-full"></div>
                      <span>All-Inclusive Luxury</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-coral-orange rounded-full"></div>
                      <span>Expert IKO Coaching</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-coral-orange rounded-full"></div>
                      <span>365 Beaches to Explore</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-coral-orange rounded-full"></div>
                      <span>Max 6 Guests</span>
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/booking">
                      <button className="bg-gradient-to-r from-coral-orange to-orange-500 hover:from-coral-orange/90 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                        <Calendar className="w-6 h-6" />
                        <span>View Trip Calendar</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </Link>
                    <Link href="/booking">
                      <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-full text-lg border border-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-3">
                        <Anchor className="w-6 h-6" />
                        <span>Book Your Safari</span>
                      </button>
                    </Link>
                  </div>
                  
                  {/* Price & Availability */}
                  <div className="flex items-center gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-coral-orange">€1,900</span>
                      <span className="text-sm">per cabin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">Limited Spots Available</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <p className="font-open-sans text-lg text-gray-700 leading-relaxed">{destination.intro}</p>
            {destination.id === "sardinia" && (
              <div className="mt-4 p-4 bg-turquoise/10 border border-turquoise/20 rounded-lg">
                <p className="font-open-sans text-sm text-deep-navy">
                  <strong>Live Conditions:</strong> The hero video above shows real-time conditions at Punta Trettu. 
                  Watch the live stream to see current wind, water conditions, and kitesurfing activity at Sardinia's premier kitesurfing destination.
                </p>
              </div>
            )}
          </section>

          {/* Live Wind Conditions - Sardinia only */}
          {destination.id === "sardinia" && (
            <section>
              <WindForecastCard hours={6} showCurrent={true} />
            </section>
          )}

          <section>
            <DestinationFocusedMap
              destination={{
                id: destination.id,
                name: destination.name,
                coordinates: destination.coordinates || locationData,
                zoom: 9,
              }}
            />
          </section>

          <section>
            <div className={`rounded-lg p-8 shadow-lg ${destination.id === "antigua" ? "bg-gradient-to-br from-deep-navy to-turquoise text-white" : "bg-sand-beige"}`}>
              <h2 className={`font-montserrat font-bold text-2xl mb-6 ${destination.id === "antigua" ? "text-white" : "text-deep-navy"}`}>
                {destination.id === "antigua" ? "Caribbean Paradise Facts" : "Quick Facts"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className={`w-6 h-6 ${destination.id === "antigua" ? "text-coral-orange" : "text-turquoise"}`} />
                  <div>
                    <div className={`font-open-sans font-medium ${destination.id === "antigua" ? "text-white" : "text-gray-800"}`}>
                      {destination.id === "antigua" ? "Prime Season" : "Best Season"}
                    </div>
                    <div className={`font-open-sans ${destination.id === "antigua" ? "text-white/80" : "text-gray-600"}`}>
                      {destination.id === "antigua" ? "Dec - Apr (Trade Winds)" : destination.season}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className={`w-6 h-6 ${destination.id === "antigua" ? "text-coral-orange" : "text-turquoise"}`} />
                  <div>
                    <div className={`font-open-sans font-medium ${destination.id === "antigua" ? "text-white" : "text-gray-800"}`}>
                      {destination.id === "antigua" ? "Consistent Winds" : "Wind Speed"}
                    </div>
                    <div className={`font-open-sans ${destination.id === "antigua" ? "text-white/80" : "text-gray-600"}`}>
                      {destination.id === "antigua" ? "15-25 knots (Daily)" : destination.windSpeed}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className={`w-6 h-6 ${destination.id === "antigua" ? "text-coral-orange" : "text-turquoise"}`} />
                  <div>
                    <div className={`font-open-sans font-medium ${destination.id === "antigua" ? "text-white" : "text-gray-800"}`}>
                      {destination.id === "antigua" ? "Group Size" : "Local Culture"}
                    </div>
                    <div className={`font-open-sans ${destination.id === "antigua" ? "text-white/80" : "text-gray-600"}`}>
                      {destination.id === "antigua" ? "Max 6 Guests" : destination.culture}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional Antigua-specific facts */}
              {destination.id === "antigua" && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-coral-orange">365</div>
                      <div className="text-sm text-white/80">Beaches to Explore</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-coral-orange">7</div>
                      <div className="text-sm text-white/80">Days Adventure</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-coral-orange">5</div>
                      <div className="text-sm text-white/80">World-Class Spots</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-coral-orange">100%</div>
                      <div className="text-sm text-white/80">All-Inclusive</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <SardinianAwakeningCTA variant="destinations" />

          {/* Antigua-specific interactive features */}
          {destination.id === "antigua" && (
            <section className="space-y-8">
              {/* Weather Widget */}
              <div>
                <AntiguaWeatherWidget />
              </div>
              
              {/* Booking Calculator */}
              <div>
                <AntiguaBookingCalculator />
              </div>
            </section>
          )}

          {/* Antigua-specific resources section */}
          {destination.id === "antigua" && (
            <section>
              <div className="bg-gradient-to-br from-deep-navy to-turquoise rounded-lg p-8 text-white">
                <h2 className="font-montserrat font-bold text-3xl mb-6">Complete Antigua Kitesafari Guide</h2>
                <p className="font-open-sans text-lg mb-8 leading-relaxed">
                  Everything you need to know for your Antigua kitesafari adventure. From comprehensive packing guides to flight information, 
                  we've got you covered for the ultimate Caribbean kitesurfing experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Link
                    href="/blog/antigua-kitesafari-packing-guide"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Anchor className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Packing List Antigua</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Complete packing guide for Antigua kitesafari adventure with expert tips for tropical climate and sun protection.
                    </p>
                  </Link>
                  
                  <Link
                    href="/blog/best-flights-europe-antigua-kite-safaris"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Best Flights to Antigua</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Top flight routes from Europe to Antigua for your kite safari adventure with airlines, schedules, and pricing.
                    </p>
                  </Link>
                  
                  <Link
                    href="/blog/caribbean-kiteboarding-wind-patterns"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Wind className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Caribbean Wind Patterns</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Learn about trade winds, seasonal variations, and best times to kiteboard in the Caribbean.
                    </p>
                  </Link>
                  
                  <Link
                    href="/blog/kiteboarding-safety-tips-tropical-destinations"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Safety Tips</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Essential safety tips for kiteboarding in tropical destinations with weather and equipment guidance.
                    </p>
                  </Link>
                  
                  <Link
                    href="/blog/photography-tips-kiteboarding-adventure"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Camera className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Photography Tips</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Professional photography tips for capturing your kiteboarding adventure with equipment recommendations.
                    </p>
                  </Link>
                  
                  <Link
                    href="/destinations/antigua/itinerary"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Detailed Itinerary</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Day-by-day breakdown of your Antigua kitesafari adventure with all activities and locations.
                    </p>
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Sardinia-specific resources section */}
          {destination.id === "sardinia" && (
            <section>
              <div className="bg-gradient-to-br from-deep-navy to-turquoise rounded-lg p-8 text-white">
                <h2 className="font-montserrat font-bold text-3xl mb-6">Complete Sardinia Kitesurfing Guide</h2>
                <p className="font-open-sans text-lg mb-8 leading-relaxed">
                  Explore our comprehensive resources for kitesurfing in Sardinia. From detailed spot information to beginner guides, 
                  find everything you need to plan your perfect kitesurfing adventure.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Link
                    href="/destinations/sardinia/punta-trettu"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Punta Trettu</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Discover Sardinia's premier kitesurfing destination with flat shallow lagoons perfect for beginners.
                    </p>
                  </Link>
                  
                  <Link
                    href="/destinations/sardinia/kitesurf-schools"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Kitesurf Schools</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Professional kitesurfing schools with certified instructors and exclusive KiteSafaris discounts.
                    </p>
                  </Link>
                  
                  <Link
                    href="/destinations/sardinia/kitesurf-sardinia"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Wind className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Kitesurf Sardinia</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Complete overview of Sardinia as Italy's premier kitesurfing destination with multiple world-class spots.
                    </p>
                  </Link>
                  
                  <Link
                    href="/destinations/sardinia/beginner-guide"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Beginner's Guide</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Step-by-step guide to learning kitesurfing in Sardinia with safety tips and progression timeline.
                    </p>
                  </Link>
                  
                  <Link
                    href="/destinations/sardinia/wind-conditions"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Wind Conditions</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Detailed wind patterns, seasonal conditions, and forecast resources for optimal kitesurfing.
                    </p>
                  </Link>
                  
                  <Link
                    href="/destinations/sardinia/punta-trettu"
                    className="block bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Anchor className="w-6 h-6 text-coral-orange" />
                      <h3 className="font-montserrat font-bold text-xl">Live Webcam</h3>
                    </div>
                    <p className="font-open-sans text-gray-200 text-sm leading-relaxed">
                      Watch live conditions at Punta Trettu with our embedded webcam feed from partner schools.
                    </p>
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Trip highlights */}
          <section>
            <h2 className={`font-montserrat font-bold text-3xl mb-6 ${destination.id === "antigua" ? "text-deep-navy" : "text-deep-navy"}`}>
              {destination.id === "antigua" ? "Caribbean Adventure Highlights" : "Trip Highlights"}
            </h2>
            <div className={`rounded-lg p-8 ${destination.id === "antigua" ? "bg-gradient-to-br from-white to-turquoise/5 border border-turquoise/20" : "bg-white border border-gray-200"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors duration-200">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      destination.id === "antigua" 
                        ? "bg-gradient-to-br from-coral-orange to-orange-500" 
                        : "bg-turquoise"
                    }`}>
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className={`font-open-sans leading-relaxed ${
                        destination.id === "antigua" ? "text-deep-navy" : "text-gray-700"
                      }`}>
                        {highlight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sample itinerary */}
          <section>
            <h2 className={`font-montserrat font-bold text-3xl mb-8 ${destination.id === "antigua" ? "text-deep-navy" : "text-deep-navy"}`}>
              {destination.id === "antigua" ? "7-Day Caribbean Adventure Itinerary" : "Sample Itinerary"}
            </h2>
            <div className={`rounded-lg p-8 ${destination.id === "antigua" ? "bg-gradient-to-br from-white to-turquoise/5 border border-turquoise/20" : "bg-white border border-gray-200"}`}>
              <div className="relative">
                {/* Timeline line */}
                <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
                  destination.id === "antigua" 
                    ? "bg-gradient-to-b from-coral-orange via-turquoise to-coral-orange" 
                    : "bg-gradient-to-b from-turquoise via-coral-orange to-turquoise"
                }`}></div>

              <div className="space-y-6">
                {destination.itinerary.map((item, index) => {
                  const IconComponent = getActivityIcon(item.activity)
                  const isExpanded = expandedDay === index

                  return (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <div className={`absolute left-6 w-4 h-4 bg-white border-4 rounded-full z-10 ${
                        destination.id === "antigua" ? "border-coral-orange" : "border-turquoise"
                      }`}></div>

                      {/* Card */}
                      <div className={`ml-16 rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                        destination.id === "antigua" 
                          ? "bg-white border-coral-orange/20" 
                          : "bg-white border-sand-beige/30"
                      }`}>
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
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                destination.id === "antigua" 
                                  ? "bg-gradient-to-br from-coral-orange to-orange-500" 
                                  : "bg-gradient-to-br from-coral-orange to-coral-orange/80"
                              }`}>
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
            </div>
          </section>

          {/* Related Content Section */}
          <section className="mb-16">
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
              <h2 className="font-montserrat font-bold text-2xl text-deep-navy mb-6">Plan Your {destination.name} Adventure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Link href="/booking" className="group p-4 rounded-lg hover:bg-sand-beige transition-colors duration-200 border border-sand-beige/30">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-coral-orange/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-coral-orange/20 transition-colors">
                      <span className="text-xl">📅</span>
                    </div>
                    <h3 className="font-montserrat font-semibold text-deep-navy mb-1">Book Now</h3>
                    <p className="text-sm text-gray-600">Secure your spot</p>
                  </div>
                </Link>
                <Link href="/packages" className="group p-4 rounded-lg hover:bg-sand-beige transition-colors duration-200 border border-sand-beige/30">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-turquoise/20 transition-colors">
                      <span className="text-xl">📦</span>
                    </div>
                    <h3 className="font-montserrat font-semibold text-deep-navy mb-1">Packages</h3>
                    <p className="text-sm text-gray-600">All-inclusive options</p>
                  </div>
                </Link>
                <Link href="/guides" className="group p-4 rounded-lg hover:bg-sand-beige transition-colors duration-200 border border-sand-beige/30">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-200 transition-colors">
                      <span className="text-xl">👨‍🏫</span>
                    </div>
                    <h3 className="font-montserrat font-semibold text-deep-navy mb-1">Expert Guides</h3>
                    <p className="text-sm text-gray-600">IKO certified instructors</p>
                  </div>
                </Link>
                <Link href="/faq" className="group p-4 rounded-lg hover:bg-sand-beige transition-colors duration-200 border border-sand-beige/30">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                      <span className="text-xl">❓</span>
                    </div>
                    <h3 className="font-montserrat font-semibold text-deep-navy mb-1">FAQ</h3>
                    <p className="text-sm text-gray-600">Common questions</p>
                  </div>
                </Link>
              </div>
              
              <div className="border-t border-sand-beige/30 pt-6">
                <h3 className="font-montserrat font-bold text-xl text-deep-navy mb-4">Other Destinations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {otherDestinations.map((dest) => (
                    <Link
                      key={dest.id}
                      href={`/destinations/${dest.id}`}
                      className="block p-4 rounded-lg hover:bg-sand-beige transition-colors duration-200 border border-sand-beige/30"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-turquoise" />
                        <span className="font-open-sans text-gray-700 hover:text-deep-navy font-medium">
                          {dest.id === 'greece' ? 'Professional kitesurfing in Greece' : 
                           dest.id === 'sardinia' ? 'Small group catamaran experience in Sardinia' : 
                           dest.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Photo gallery */}
        <section className="mt-16">
          {destination.id === "antigua" ? (
            /* Local gallery for Antigua */
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{destination.name} Gallery</h3>
                <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full" />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {destination.gallery.map((imageSrc, index) => (
                  <div
                    key={index}
                    className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={imageSrc}
                      alt={`${destination.name} gallery image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Pixabay gallery for other destinations */
            <PixabayGallery
              destination={destination.id}
              title={`${destination.name} Gallery`}
              perPage={16}
              className="mb-8"
            />
          )}

          {/* Featured Images section for Antigua */}
          {destination.id === "antigua" && (
            <div className="mt-12 pt-8 border-t border-sand-beige/30">
              <h3 className="font-montserrat font-semibold text-xl text-deep-navy mb-6 text-center">Featured Image</h3>
              <div className="relative">
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                  <Image
                    src={destination.gallery[currentImageIndex] || "/placeholder.svg"}
                    alt={`${destination.name} kitesurfing spot aerial view luxury catamaran kitesurfing kite safari gallery`}
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
          )}
        </section>

        {/* CTA section */}
        <section className="mt-16 text-center">
          <div className={`rounded-lg p-8 text-white ${
            destination.id === "antigua" 
              ? "bg-gradient-to-r from-coral-orange to-orange-500" 
              : "bg-gradient-to-r from-turquoise to-deep-navy"
          }`}>
            <h2 className="font-montserrat font-bold text-3xl mb-4">
              {destination.id === "antigua" ? "Ready for Your Caribbean Adventure?" : "Ready for Your Adventure?"}
            </h2>
            <p className="font-open-sans text-lg mb-6 max-w-2xl mx-auto">
              {destination.id === "antigua" 
                ? "Join our exclusive 7-day luxury catamaran safari to Antigua & Barbuda. Experience world-class kitesurfing, gourmet cuisine, and 365 beaches of paradise."
                : `Book your kiteboarding safari to ${destination.name} and experience the adventure of a lifetime.`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/booking" 
                className={`inline-block font-montserrat font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 ${
                  destination.id === "antigua"
                    ? "bg-white text-coral-orange hover:bg-white/90"
                    : "bg-coral-orange hover:bg-coral-orange/90 text-white"
                }`}
              >
                {destination.id === "antigua" ? "Book Your Caribbean Safari" : "Book This Safari"}
              </Link>
              {destination.id === "antigua" && (
                <Link 
                  href="/booking" 
                  className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-montserrat font-semibold px-8 py-4 rounded-lg text-lg border border-white/30 hover:border-white/50 transition-all duration-200"
                >
                  View Trip Calendar
                </Link>
              )}
            </div>
            
            {/* Additional Antigua-specific CTA info */}
            {destination.id === "antigua" && (
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>From €1,900 per cabin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>All-inclusive luxury</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Max 6 guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Dec - Apr departures</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

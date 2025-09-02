"use client"

import { useState, useEffect } from "react"
import { Calendar, Users, MapPin, ChevronLeft, ChevronRight, Anchor, Loader2, Clock, Star, CheckCircle, AlertCircle } from "lucide-react"

interface TripDate {
  id: string
  startDate: Date
  endDate: Date
  availableSpots: number
  totalSpots: number
  price: number
  tripId: string
  discountPercentage: number
  currency: string
  status: string
}

interface AirtableTrip {
  id: string
  destination: string
  startDate: string
  endDate: string
  price: number
  discountPercentage: number
  currency: string
  totalSpots: number
  availableSpots: number
  status: string
  tripId: string
}

export function AntiguaTripCalendar() {
  const [selectedTrip, setSelectedTrip] = useState<TripDate | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)) // December 2025
  const [trips, setTrips] = useState<TripDate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch real trips from Airtable
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch("/api/trips")
        if (!response.ok) {
          throw new Error(`Failed to fetch trips: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (!data.trips || !Array.isArray(data.trips)) {
          throw new Error("Invalid trips data structure")
        }

        // Filter for Antigua/Caribbean trips and convert to TripDate format
        const antiguaTrips: TripDate[] = data.trips
          .filter((trip: AirtableTrip) => 
            trip.destination?.toLowerCase().includes("caribbean") || 
            trip.destination?.toLowerCase().includes("antigua")
          )
          .map((trip: AirtableTrip) => ({
            id: trip.id,
            startDate: trip.startDate ? new Date(trip.startDate) : new Date(),
            endDate: trip.endDate ? new Date(trip.endDate) : new Date(),
            availableSpots: trip.availableSpots || 0,
            totalSpots: trip.totalSpots || 6, // Default to 6 spots for Antigua trips
            price: trip.price || 0,
            tripId: trip.tripId || "",
            discountPercentage: trip.discountPercentage || 0,
            currency: trip.currency || "EUR",
            status: trip.status || "available"
          }))
          .filter(trip => trip.status === "available") // Only show available trips
          .sort((a, b) => a.startDate.getTime() - b.startDate.getTime()) // Sort by start date

        console.log("Fetched Antigua trips:", antiguaTrips)
        setTrips(antiguaTrips)
        
      } catch (err) {
        console.error("Error fetching trips:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch trips")
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getTripsForMonth = (month: Date) => {
    return trips.filter(
      (trip) => trip.startDate.getMonth() === month.getMonth() && trip.startDate.getFullYear() === month.getFullYear(),
    )
  }

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const getAvailabilityStatus = (availableSpots: number, totalSpots: number) => {
    if (availableSpots === 0) return { status: "Fully Booked", color: "text-red-600", bgColor: "bg-red-100", icon: AlertCircle }
    if (availableSpots <= 2) return { status: "Limited Spots", color: "text-orange-600", bgColor: "bg-orange-100", icon: AlertCircle }
    return { status: "Available", color: "text-green-600", bgColor: "bg-green-100", icon: CheckCircle }
  }

  const monthTrips = getTripsForMonth(currentMonth)
  const canGoPrev = currentMonth > new Date(2025, 11)
  const canGoNext = currentMonth < new Date(2026, 3)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-turquoise mx-auto mb-4" />
          <div className="text-xl font-semibold text-deep-navy font-montserrat mb-2">Loading Trip Schedule</div>
          <div className="text-deep-navy/60 font-open-sans">Fetching real-time availability from our database...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl p-8 border border-red-200">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <div className="text-xl font-semibold text-red-700 font-montserrat mb-2">Error Loading Trips</div>
          <div className="text-red-600 font-open-sans mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={prevMonth}
            disabled={!canGoPrev}
            className={`p-3 rounded-xl transition-all duration-300 ${
              canGoPrev 
                ? "hover:bg-gray-100 text-deep-navy hover:shadow-md" 
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <div className="text-2xl font-bold text-deep-navy font-montserrat">
              {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </div>
            <div className="text-sm text-gray-500 font-open-sans">
              {monthTrips.length} trip{monthTrips.length !== 1 ? 's' : ''} available
            </div>
          </div>
          <button
            onClick={nextMonth}
            disabled={!canGoNext}
            className={`p-3 rounded-xl transition-all duration-300 ${
              canGoNext 
                ? "hover:bg-gray-100 text-deep-navy hover:shadow-md" 
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Quick Stats */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="bg-turquoise/10 text-turquoise px-4 py-2 rounded-lg">
            <div className="text-sm font-semibold">{trips.length}</div>
            <div className="text-xs">Total Trips</div>
          </div>
          <div className="bg-coral-orange/10 text-coral-orange px-4 py-2 rounded-lg">
            <div className="text-sm font-semibold">€{Math.min(...trips.map(t => t.price)).toLocaleString()}</div>
            <div className="text-xs">Starting Price</div>
          </div>
        </div>
      </div>

      {/* Trips Grid */}
      {monthTrips.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {monthTrips.map((trip) => {
            const availability = getAvailabilityStatus(trip.availableSpots, trip.totalSpots)
            const isSelected = selectedTrip?.id === trip.id
            
            return (
              <div
                key={trip.id}
                className={`relative rounded-xl p-6 cursor-pointer transition-all duration-300 border-2 ${
                  isSelected
                    ? "border-coral-orange bg-gradient-to-br from-coral-orange/5 to-white shadow-lg scale-[1.02]"
                    : "border-gray-200 bg-white hover:border-turquoise/50 hover:shadow-lg hover:scale-[1.01]"
                }`}
                onClick={() => setSelectedTrip(trip)}
              >
                {/* Discount Badge */}
                {trip.discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-coral-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                    {trip.discountPercentage}% OFF
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-turquoise to-turquoise/80 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-deep-navy font-montserrat text-lg">
                        {formatDate(trip.startDate)} - {formatShortDate(trip.endDate)}
                      </div>
                      <div className="text-sm text-gray-600 font-open-sans">
                        {trip.tripId || "7-day luxury catamaran safari"}
                      </div>
                    </div>
                  </div>
                  
                  {/* Availability Status */}
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${availability.bgColor} ${availability.color}`}>
                    <div className="flex items-center space-x-1">
                      <availability.icon className="w-3 h-3" />
                      <span>{availability.status}</span>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-turquoise" />
                    <span className="text-sm text-gray-600">
                      {trip.availableSpots}/{trip.totalSpots} spots
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-turquoise" />
                    <span className="text-sm text-gray-600">7 days</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center py-3 bg-gradient-to-r from-gray-50 to-white rounded-lg mb-4">
                  <div className="text-2xl font-bold text-coral-orange font-montserrat">
                    {trip.currency === "EUR" ? "€" : trip.currency}{trip.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">per person</div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2">
                  <button 
                    className="flex-1 bg-turquoise text-white py-2 rounded-lg font-semibold hover:bg-turquoise/90 transition-colors text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Add booking logic here
                    }}
                  >
                    Book Now
                  </button>
                  <button 
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedTrip(trip)
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <div className="text-xl font-semibold text-gray-500 font-montserrat mb-2">No Trips This Month</div>
          <div className="text-gray-400 font-open-sans">Check other months for available departures</div>
        </div>
      )}

      {/* Selected Trip Details */}
      {selectedTrip && (
        <div className="bg-gradient-to-br from-white to-turquoise/5 rounded-xl p-6 border-2 border-coral-orange/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-deep-navy font-montserrat">Trip Details</h4>
            <button 
              onClick={() => setSelectedTrip(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-turquoise/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-turquoise" />
                </div>
                <div>
                  <div className="font-semibold text-deep-navy">Duration</div>
                  <div className="text-sm text-gray-600">7-day luxury catamaran safari</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-coral-orange/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-coral-orange" />
                </div>
                <div>
                  <div className="font-semibold text-deep-navy">Capacity</div>
                  <div className="text-sm text-gray-600">Max {selectedTrip.totalSpots} guests</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-deep-navy/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-deep-navy" />
                </div>
                <div>
                  <div className="font-semibold text-deep-navy">Destination</div>
                  <div className="text-sm text-gray-600">Antigua & Barbuda waters</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Anchor className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="font-semibold text-deep-navy">Availability</div>
                  <div className="text-sm text-gray-600">{selectedTrip.availableSpots} spots available</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <p className="text-sm text-deep-navy/70 font-open-sans leading-relaxed">
              Each Antigua safari features luxury catamaran accommodation for up to {selectedTrip.totalSpots} guests, 
              with departures based on availability from our Airtable schedule. Experience the perfect blend of 
              adventure and relaxation with expert guidance and top-quality equipment.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 bg-coral-orange text-white py-3 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors">
              Book This Trip
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

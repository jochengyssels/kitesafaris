"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Users, Calendar as CalendarIcon, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TripCalendarMonthly } from "@/components/trip-calendar-monthly"
import Link from "next/link"

interface Trip {
  id: string
  destination: string
  startDate: string
  endDate: string
  price: number
  currency: string
  totalSpots: number
  availableSpots: number
  status: string
  tripName?: string
}

interface Destination {
  id: string
  name: string
  flag: string
  color: string
}

export function TripCalendarView() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Debug state changes
  useEffect(() => {
    console.log("Trips updated:", trips.length)
  }, [trips])

  useEffect(() => {
    console.log("Destinations updated:", destinations.length)
  }, [destinations])

  useEffect(() => {
    console.log("Loading state:", loading)
  }, [loading])

  // Default destination colors for fallback
  const getDestinationColor = (destinationId: string): string => {
    const colorMap: Record<string, string> = {
      "antigua": "from-cyan-500 to-teal-500",
      "antigua & barbuda": "from-cyan-500 to-teal-500",
      "sardinia": "from-orange-500 to-red-500", 
      "greece": "from-blue-500 to-indigo-500",
      "greek islands": "from-blue-500 to-indigo-500",
      "caribbean": "from-turquoise-500 to-cyan-500",
      "mediterranean": "from-purple-500 to-pink-500",
    }
    return colorMap[destinationId.toLowerCase()] || "from-gray-500 to-slate-500"
  }

  // Default destination flags for fallback
  const getDestinationFlag = (destinationName: string): string => {
    const flagMap: Record<string, string> = {
      "antigua": "🏝️",
      "antigua & barbuda": "🇦🇬",
      "sardinia": "🇮🇹",
      "greece": "🇬🇷",
      "greek islands": "🇬🇷", 
      "caribbean": "🌊",
      "mediterranean": "🌊",
    }
    return flagMap[destinationName.toLowerCase()] || "📍"
  }

  useEffect(() => {
    console.log("Component mounted, loading data...")
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      console.log("Starting data load...")
      await loadTrips()
      await loadDestinations()
      console.log("Data loaded successfully")
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      console.log("Setting loading to false")
      setLoading(false)
    }
  }

  const loadTrips = async () => {
    try {
      const response = await fetch("/api/trips")
      if (response.ok) {
        const data = await response.json()
        console.log("Loaded trips:", data.trips?.length || 0)
        setTrips(data.trips || [])
        return data.trips || []
      } else {
        console.error("Failed to fetch trips:", response.status)
        setTrips([])
        return []
      }
    } catch (error) {
      console.error("Failed to load trips:", error)
      setTrips([])
      return []
    }
  }

  const loadDestinations = async () => {
    try {
      const response = await fetch("/api/destinations")
      if (response.ok) {
        const data = await response.json()
        const destinationsFromAPI = data.destinations || []
        
        console.log("Raw destinations from API:", destinationsFromAPI)
        
        // Convert API destinations to our format
        const formattedDestinations: Destination[] = destinationsFromAPI
          .filter((dest: any) => dest.available === true) // Only show active destinations
          .map((dest: any) => {
            // Use the destination name for both ID and display
            const destinationId = dest.name?.toLowerCase() || "unknown"
            const destinationName = dest.name || "Unknown Destination"
            
            console.log("Processing destination:", { 
              destinationId, 
              destinationName, 
              airtableId: dest.id,
              available: dest.available
            })
            
            return {
              id: destinationId,
              name: destinationName,
              flag: dest.icon || getDestinationFlag(destinationName),
              color: getDestinationColor(destinationId)
            }
          })
        
        setDestinations(formattedDestinations)
        console.log("Formatted destinations:", formattedDestinations)
        return formattedDestinations
      } else {
        console.error("Failed to fetch destinations:", response.status)
        setDestinations([])
        return []
      }
    } catch (error) {
      console.error("Failed to load destinations:", error)
      // Fallback to empty array if API fails
      setDestinations([])
      return []
    }
  }

  // Filter trips based on available destinations and selected filters
  const filteredTrips = trips.filter(trip => {
    // First, check if the trip's destination matches any available destination
    const tripDestination = destinations.find(dest => {
      const tripDestId = trip.destination?.toLowerCase()
      const destName = dest.name?.toLowerCase()
      const destId = dest.id?.toLowerCase()

      // Exact match with destination name
      if (tripDestId === destName) return true

      // Exact match with destination ID
      if (tripDestId === destId) return true

      // Partial match (e.g., "antigua" matches "antigua & barbuda")
      if (tripDestId && destName &&
          (tripDestId.includes(destName) || destName.includes(tripDestId))) {
        return true
      }

      // Special case mappings
      const specialMappings: Record<string, string[]> = {
        'antigua & barbuda': ['antigua', 'barbuda'],
        'antigua': ['antigua & barbuda'],
        'greek islands': ['greece'],
        'greece': ['greek islands']
      }

      const tripMappings = specialMappings[tripDestId] || []
      const destMappings = specialMappings[destName] || []

      if (tripMappings.includes(destName) || destMappings.includes(tripDestId)) {
        return true
      }

      return false
    })

    // Only include trips whose destination is available
    if (!tripDestination) return false

    // If a destination is selected, filter by it
    if (selectedDestinations.length > 0) {
      return selectedDestinations.some(selectedDestId => {
        const tripDestId = trip.destination?.toLowerCase()
        const selectedDestIdLower = selectedDestId.toLowerCase()

        // Exact match
        if (tripDestId === selectedDestIdLower) return true

        // Partial match (e.g., "antigua" matches "antigua & barbuda")
        if (tripDestId && selectedDestIdLower &&
            (tripDestId.includes(selectedDestIdLower) || selectedDestIdLower.includes(tripDestId))) {
          return true
        }

        // Special case mappings
        const specialMappings: Record<string, string[]> = {
          'antigua & barbuda': ['antigua', 'barbuda'],
          'antigua': ['antigua & barbuda'],
          'greek islands': ['greece'],
          'greece': ['greek islands']
        }

        const tripMappings = specialMappings[tripDestId] || []
        const selectedDestMappings = specialMappings[selectedDestIdLower] || []

        if (tripMappings.includes(selectedDestIdLower) || selectedDestMappings.includes(tripDestId)) {
          return true
        }

        return false
      })
    }
    return true // If no specific destination is selected, show all available ones
  })

  const toggleDestination = (destinationId: string) => {
    setSelectedDestinations(prev => 
      prev.includes(destinationId)
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    )
  }

  const clearFilters = () => {
    setSelectedDestinations([])
  }

  const getOccupancyPercentage = (trip: Trip) => {
    return ((trip.totalSpots - trip.availableSpots) / trip.totalSpots) * 100
  }

  const getOccupancyColor = (percentage: number) => {
    if (percentage < 50) return "from-green-400 to-green-600"
    if (percentage < 80) return "from-yellow-400 to-orange-500"
    return "from-red-400 to-red-600"
  }

  const getStatusBadge = (trip: Trip) => {
    const occupancy = getOccupancyPercentage(trip)
    if (trip.availableSpots === 0) return { text: "FULL", color: "bg-red-500 text-white" }
    if (trip.availableSpots <= 2) return { text: "LIMITED", color: "bg-orange-500 text-white" }
    if (occupancy > 70) return { text: "POPULAR", color: "bg-blue-500 text-white" }
    return { text: "AVAILABLE", color: "bg-green-500 text-white" }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const startFormatted = start.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    const endFormatted = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    return `${startFormatted}–${endFormatted}`
  }

  const getDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-cyan-50 to-teal-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-deep-navy mb-4">
              Trip Calendar
            </h1>
            <p className="font-open-sans text-xl text-gray-600 max-w-3xl mx-auto">
              Browse all upcoming kiteboarding safaris, filter by destination, and see real-time availability
            </p>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center justify-center text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-cyan-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">›</span>
            <span className="text-deep-navy font-medium">Trip Calendar</span>
          </nav>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Location Filter Chips */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-700">Filter by Destination</h3>
              {selectedDestinations.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto text-xs"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              {destinations.length > 0 ? (
                destinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => toggleDestination(destination.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      selectedDestinations.includes(destination.id)
                        ? `bg-gradient-to-r ${destination.color} text-white shadow-lg transform scale-105`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    aria-label={`Filter by ${destination.name}`}
                    title={`Filter trips for ${destination.name}`}
                  >
                    <span className="text-lg">{destination.flag}</span>
                    <span>{destination.name}</span>
                  </button>
                ))
              ) : (
                <div className="text-gray-500 text-sm">Loading destinations...</div>
              )}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">View:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: "calendar", label: "Calendar" },
                  { key: "list", label: "List" }
                ].map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => setViewMode(mode.key as any)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      viewMode === mode.key
                        ? "bg-white text-deep-navy shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-500">
              {filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''} available
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading trips...</p>
            </div>
          ) : filteredTrips.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No trips found</h3>
              <p className="text-gray-500 mb-6">
                {selectedDestinations.length > 0 
                  ? "No trips available for the selected destinations."
                  : "No upcoming trips available at the moment."
                }
              </p>
              {selectedDestinations.length > 0 && (
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Calendar View */}
              {viewMode === "calendar" && (
                <TripCalendarMonthly trips={filteredTrips} destinations={destinations} />
              )}

              {/* List View */}
              {viewMode === "list" && (
                <div className="grid gap-6">
                  {filteredTrips.map((trip) => {
                    const destination = destinations.find(d => 
                      d.id === trip.destination || 
                      d.id === trip.destination?.toLowerCase()
                    ) || {
                      id: trip.destination,
                      name: trip.destination || "Unknown Destination",
                      flag: getDestinationFlag(trip.destination || ""),
                      color: getDestinationColor(trip.destination || "")
                    }
                    const occupancyPercentage = getOccupancyPercentage(trip)
                    const statusBadge = getStatusBadge(trip)
                    const duration = getDuration(trip.startDate, trip.endDate)

                    return (
                      <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            {/* Trip Info */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-montserrat text-xl font-bold text-deep-navy mb-1">
                                    {trip.tripName || `${destination?.name} Adventure`}
                                  </h3>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      <span>{destination?.flag} {destination?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Users className="w-4 h-4" />
                                      <span>{duration} days</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}>
                                    {statusBadge.text}
                                  </span>
                                  <div className="text-right">
                                    <div className="text-2xl font-bold text-deep-navy">
                                      €{trip.price.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-500">per person</div>
                                  </div>
                                </div>
                              </div>

                              {/* Occupancy Bar */}
                              <div className="mb-4">
                                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                  <span>Availability</span>
                                  <span>{trip.availableSpots} of {trip.totalSpots} spots left</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                  <div
                                    className={`h-full bg-gradient-to-r ${getOccupancyColor(occupancyPercentage)} transition-all duration-500 ease-out`}
                                    style={{ width: `${occupancyPercentage}%` }}
                                    aria-label={`${occupancyPercentage.toFixed(0)}% booked`}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <div className="lg:flex-shrink-0">
                              <Link href={`/booking?trip=${trip.id}`}>
                                <Button 
                                  className={`w-full lg:w-auto bg-gradient-to-r ${destination?.color} hover:opacity-90 text-white font-semibold`}
                                  disabled={trip.availableSpots === 0}
                                >
                                  {trip.availableSpots === 0 ? "Fully Booked" : "Book Now"}
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Legend */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <h3 className="font-semibold text-gray-700 mb-4">Legend</h3>
          <div className="flex flex-wrap gap-4">
            {destinations.length > 0 ? (
              destinations.map((destination) => (
                <div key={destination.id} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${destination.color}`} />
                  <span className="text-sm text-gray-600">{destination.flag} {destination.name}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm">No destinations available</div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

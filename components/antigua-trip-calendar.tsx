"use client"

import { useState, useEffect } from "react"
import { Calendar, Users, MapPin, ChevronLeft, ChevronRight, Anchor } from "lucide-react"

interface TripDate {
  startDate: Date
  endDate: Date
  availableCabins: number
  totalCabins: number
  price: number
}

export function AntiguaTripCalendar() {
  const [selectedTrip, setSelectedTrip] = useState<TripDate | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)) // December 2025
  const [trips, setTrips] = useState<TripDate[]>([])

  // Generate all Saturday-to-Saturday trips from Dec 6, 2025 to April 2026
  useEffect(() => {
    const generateTrips = () => {
      const tripList: TripDate[] = []
      const startDate = new Date(2025, 11, 6) // December 6, 2025 (Saturday)
      const endDate = new Date(2026, 3, 30) // End of April 2026

      const currentTripStart = new Date(startDate)

      while (currentTripStart <= endDate) {
        const tripEnd = new Date(currentTripStart)
        tripEnd.setDate(tripEnd.getDate() + 7) // 7 days later

        tripList.push({
          startDate: new Date(currentTripStart),
          endDate: new Date(tripEnd),
          availableCabins: Math.floor(Math.random() * 3) + 1, // Random 1-3 available cabins
          totalCabins: 3,
          price: 1900,
        })

        // Move to next Saturday
        currentTripStart.setDate(currentTripStart.getDate() + 7)
      }

      return tripList
    }

    setTrips(generateTrips())
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

  const monthTrips = getTripsForMonth(currentMonth)
  const canGoPrev = currentMonth > new Date(2025, 11)
  const canGoNext = currentMonth < new Date(2026, 3)

  return (
    <div className="bg-sand-beige rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-deep-navy font-montserrat">Antigua Safari Schedule</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            disabled={!canGoPrev}
            className={`p-2 rounded-lg transition-colors ${
              canGoPrev ? "hover:bg-white/50 text-deep-navy" : "text-deep-navy/30 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold text-deep-navy font-montserrat min-w-[140px] text-center">
            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={nextMonth}
            disabled={!canGoNext}
            className={`p-2 rounded-lg transition-colors ${
              canGoNext ? "hover:bg-white/50 text-deep-navy" : "text-deep-navy/30 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {monthTrips.length > 0 ? (
          monthTrips.map((trip, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedTrip === trip
                  ? "border-coral-orange bg-white shadow-md"
                  : "border-white/50 bg-white/30 hover:border-coral-orange/50 hover:bg-white/50"
              }`}
              onClick={() => setSelectedTrip(trip)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-turquoise" />
                  <div>
                    <div className="font-semibold text-deep-navy font-montserrat">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </div>
                    <div className="text-sm text-deep-navy/70 font-open-sans">Saturday to Saturday • 7 days</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <Anchor className="w-4 h-4 text-turquoise" />
                    <span className="text-sm font-semibold text-deep-navy">
                      {trip.availableCabins}/{trip.totalCabins} cabins
                    </span>
                  </div>
                  <div className="text-lg font-bold text-coral-orange">€{trip.price.toLocaleString()}</div>
                  <div className="text-xs text-deep-navy/60">per person</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-deep-navy/60 font-open-sans">No trips available this month</div>
        )}
      </div>

      {selectedTrip && (
        <div className="bg-white rounded-lg p-4 border border-coral-orange/20">
          <h4 className="font-semibold text-deep-navy font-montserrat mb-3">Trip Details</h4>
          <div className="grid grid-cols-2 gap-4 text-sm font-open-sans">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-turquoise" />
              <span>7-day luxury catamaran safari</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-turquoise" />
              <span>Max 6 guests (3 double cabins)</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-turquoise" />
              <span>Antigua & Barbuda waters</span>
            </div>
            <div className="flex items-center space-x-2">
              <Anchor className="w-4 h-4 text-turquoise" />
              <span>{selectedTrip.availableCabins * 2} spots available</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-deep-navy/70 font-open-sans">
              Each Antigua safari features 3 double cabins for up to 6 guests, with departures every Saturday from
              December 6, 2025 through April 2026.
            </p>
          </div>
          <button className="w-full mt-4 bg-coral-orange text-white py-3 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors">
            Book This Trip
          </button>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MapPin, Users, Calendar as CalendarIcon } from "lucide-react"
import Link from "next/link"

// Set up moment localizer
const localizer = momentLocalizer(moment)

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

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resource: {
    trip: Trip
    availabilityColor: string
    spotsLeft: number
  }
}

interface TripCalendarMonthlyProps {
  trips: Trip[]
  destinations: Array<{
    id: string
    name: string
    flag: string
    color: string
  }>
}

const getAvailabilityColor = (availableSpots: number, totalSpots: number): string => {
  if (availableSpots === 0) return "#ef4444" // Red - sold out
  if (availableSpots <= 3) return "#f97316" // Orange - limited spots
  return "#22c55e" // Green - plenty of space
}

const getAvailabilityText = (availableSpots: number): string => {
  if (availableSpots === 0) return "Sold Out"
  if (availableSpots <= 3) return "Limited"
  return "Available"
}

const eventStyleGetter = (event: CalendarEvent) => {
  return {
    style: {
      backgroundColor: event.resource.availabilityColor,
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "12px",
      padding: "2px 4px",
      fontWeight: "500",
    },
  }
}

const CustomEvent = ({ event }: { event: CalendarEvent }) => {
  const { trip, spotsLeft } = event.resource
  const destination = trip.destination?.charAt(0).toUpperCase() + trip.destination?.slice(1) || "Unknown"
  
  return (
    <div className="text-xs">
      <div className="font-semibold truncate">{trip.tripName || `${destination} Adventure`}</div>
      <div className="opacity-90">
        {spotsLeft === 0 ? "Sold Out" : `${spotsLeft} spots left`}
      </div>
    </div>
  )
}

export function TripCalendarMonthly({ trips, destinations }: TripCalendarMonthlyProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<Views>(Views.MONTH)

  // Transform trips into calendar events
  const events: CalendarEvent[] = useMemo(() => {
    return trips.map((trip) => {
      const startDate = new Date(trip.startDate)
      const endDate = new Date(trip.endDate)
      
      // Add one day to end date to make it inclusive
      endDate.setDate(endDate.getDate() + 1)
      
      const availabilityColor = getAvailabilityColor(trip.availableSpots, trip.totalSpots)
      const destination = destinations.find(d => 
        d.id === trip.destination || 
        d.id === trip.destination?.toLowerCase()
      )
      
      return {
        id: trip.id,
        title: `${trip.tripName || `${destination?.name || trip.destination} Adventure`} (${trip.availableSpots} left)`,
        start: startDate,
        end: endDate,
        resource: {
          trip,
          availabilityColor,
          spotsLeft: trip.availableSpots,
        },
      }
    })
  }, [trips, destinations])

  const handleSelectEvent = (event: CalendarEvent) => {
    // Navigate to trip detail page or booking page
    if (event && event.resource && event.resource.trip && event.resource.trip.id) {
      window.location.href = `/booking?trip=${event.resource.trip.id}`
    } else {
      console.error('Invalid event object:', event)
    }
  }

  const navigateToDate = (date: Date) => {
    setCurrentDate(date)
  }

  const CustomToolbar = ({ label, onNavigate }: any) => {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('PREV')}
            className="p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('TODAY')}
            className="px-3"
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('NEXT')}
            className="p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <h2 className="text-xl font-bold text-deep-navy">{label}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={view === Views.MONTH ? "default" : "outline"}
            size="sm"
            onClick={() => setView(Views.MONTH)}
          >
            Month
          </Button>
          <Button
            variant={view === Views.AGENDA ? "default" : "outline"}
            size="sm"
            onClick={() => setView(Views.AGENDA)}
          >
            List
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Color Legend */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#22c55e" }}></div>
              <span className="text-sm font-medium">Available (4+ spots)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#f97316" }}></div>
              <span className="text-sm font-medium">Limited (1-3 spots)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#ef4444" }}></div>
              <span className="text-sm font-medium">Sold Out</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardContent className="p-6">
          <div className="h-[600px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              view={view}
              views={[Views.MONTH, Views.AGENDA]}
              date={currentDate}
              onNavigate={navigateToDate}
              onView={setView}
              onSelectEvent={handleSelectEvent}
              components={{
                toolbar: CustomToolbar,
                event: CustomEvent,
              }}
              eventPropGetter={eventStyleGetter}
              popup
              showMultiDayTimes
              step={60}
              timeslots={1}
              className="trip-calendar"
            />
          </div>
        </CardContent>
      </Card>

      {/* Mobile-friendly summary */}
      <div className="mt-6 lg:hidden">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-700 mb-3">Upcoming Trips</h3>
            <div className="space-y-3">
              {events.slice(0, 5).map((event) => {
                const { trip, spotsLeft } = event.resource
                const destination = destinations.find(d => 
                  d.id === trip.destination || 
                  d.id === trip.destination?.toLowerCase()
                )
                
                return (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {trip.tripName || `${destination?.name || trip.destination} Adventure`}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{moment(event.start).format("MMM DD")} - {moment(event.end).format("MMM DD")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{destination?.flag} {destination?.name || trip.destination}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">€{trip.price.toLocaleString()}</div>
                      <div 
                        className="text-xs px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: event.resource.availabilityColor }}
                      >
                        {getAvailabilityText(spotsLeft)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

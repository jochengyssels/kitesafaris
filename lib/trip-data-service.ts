"use client"

// Shared trip data service for both admin and booking systems
export interface Trip {
  id: string
  destination: "caribbean" | "greece" | "sardinia"
  startDate: string
  endDate: string
  price: number
  discountPercentage?: number
  currency: "EUR" | "USD"
  totalSpots: number
  availableSpots: number
  status: "available" | "low" | "full"
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  tripId: string
  guestCount: number
  guestNames: string[]
  contactEmail: string
  contactPhone: string
  totalAmount: number
  bookingDate: string
  status: "confirmed" | "pending" | "cancelled"
}

export interface AuditLog {
  id: string
  timestamp: string
  action: "trip_created" | "trip_updated" | "trip_deleted" | "booking_created" | "booking_cancelled" | "system_event"
  entityType: "trip" | "booking" | "system"
  entityId: string
  userId: string
  userEmail: string
  description: string
  beforeState?: any
  afterState?: any
  metadata?: Record<string, any>
  ipAddress?: string
  userAgent?: string
}

let tripsCache: Trip[] = []
let bookingsCache: Booking[] = []
let auditLogs: AuditLog[] = []
let isOnline = true

// Event listeners for real-time updates
type TripUpdateListener = (trips: Trip[]) => void
type AuditLogListener = (logs: AuditLog[]) => void

const tripUpdateListeners: TripUpdateListener[] = []
const auditLogListeners: AuditLogListener[] = []

const initializeDefaultData = () => {
  tripsCache = [
    {
      id: "CAR-2025-12-06",
      destination: "caribbean",
      startDate: "2025-12-06",
      endDate: "2025-12-13",
      price: 2700,
      discountPercentage: 0,
      currency: "EUR",
      totalSpots: 6,
      availableSpots: 6,
      status: "available",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "CAR-2025-12-27",
      destination: "caribbean",
      startDate: "2025-12-27",
      endDate: "2026-01-03",
      price: 2700,
      discountPercentage: 15,
      currency: "EUR",
      totalSpots: 6,
      availableSpots: 6,
      status: "available",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
}

const createAuditLog = (
  action: AuditLog["action"],
  entityType: AuditLog["entityType"],
  entityId: string,
  description: string,
  beforeState?: any,
  afterState?: any,
  metadata?: Record<string, any>,
): AuditLog => {
  const auditLog: AuditLog = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    action,
    entityType,
    entityId,
    userId: "admin-user",
    userEmail: "admin@kitesafaris.com",
    description,
    beforeState,
    afterState,
    metadata,
    ipAddress: "127.0.0.1",
    userAgent: navigator?.userAgent || "Unknown",
  }

  auditLogs.unshift(auditLog)
  if (auditLogs.length > 1000) {
    auditLogs = auditLogs.slice(0, 1000)
  }

  auditLogListeners.forEach((listener) => listener([...auditLogs]))
  console.log(`[AUDIT] ${action}: ${description}`, { entityId, beforeState, afterState })

  return auditLog
}

const calculateTripStatus = (trip: Trip): Trip["status"] => {
  if (trip.availableSpots === 0) return "full"
  if (trip.availableSpots <= Math.ceil(trip.totalSpots * 0.3)) return "low"
  return "available"
}

const notifyTripUpdate = () => {
  tripUpdateListeners.forEach((listener) => listener([...tripsCache]))
}

export const calculateDiscountedPrice = (trip: Trip): number => {
  if (!trip.discountPercentage || trip.discountPercentage === 0) {
    return trip.price
  }
  return Math.round(trip.price * (1 - trip.discountPercentage / 100))
}

export const calculateSavings = (trip: Trip): number => {
  if (!trip.discountPercentage || trip.discountPercentage === 0) {
    return 0
  }
  return trip.price - calculateDiscountedPrice(trip)
}

export const hasDiscount = (trip: Trip): boolean => {
  return Boolean(trip.discountPercentage && trip.discountPercentage > 0)
}

export const tripDataService = {
  // Initialize data from Airtable via secure API
  async initialize(): Promise<void> {
    try {
      console.log("[v0] Initializing trip data service with secure API...")
      console.log("[v0] Current timestamp:", new Date().toISOString())
      console.log("[v0] Window location:", typeof window !== "undefined" ? window.location.href : "Server-side")
      console.log("[v0] User agent:", typeof navigator !== "undefined" ? navigator.userAgent : "Server-side")

      console.log("[v0] Making connection test request to /api/trips/test-connection...")
      const connectionTestStart = Date.now()
      const connectionTest = await fetch("/api/trips/test-connection")
      const connectionTestDuration = Date.now() - connectionTestStart

      console.log("[v0] Connection test completed in:", connectionTestDuration, "ms")
      console.log("[v0] Connection test status:", connectionTest.status)
      console.log("[v0] Connection test statusText:", connectionTest.statusText)
      console.log("[v0] Connection test headers:", Object.fromEntries(connectionTest.headers.entries()))

      // Check if response is actually JSON before parsing
      const contentType = connectionTest.headers.get("content-type")
      console.log("[v0] Connection test content-type:", contentType)

      if (!contentType || !contentType.includes("application/json")) {
        console.warn("[v0] API returned non-JSON response, using default data")
        console.warn("[v0] Response content-type was:", contentType)

        const responseText = await connectionTest.text()
        console.warn("[v0] Non-JSON response body (first 1000 chars):", responseText.substring(0, 1000))
        console.warn("[v0] Response body length:", responseText.length)

        initializeDefaultData()
        isOnline = false
        return
      }

      let connectionResult
      try {
        const connectionResponseText = await connectionTest.text()
        console.log("[v0] Connection test raw response:", connectionResponseText)
        connectionResult = JSON.parse(connectionResponseText)
        console.log("[v0] Connection test parsed result:", connectionResult)
      } catch (parseError) {
        console.error("[v0] Failed to parse connection test response:", parseError)
        initializeDefaultData()
        isOnline = false
        return
      }

      if (connectionResult.connected) {
        console.log("[v0] Connection test successful, fetching trips...")

        console.log("[v0] Making trips request to /api/trips...")
        const tripsStart = Date.now()
        const tripsResponse = await fetch("/api/trips")
        const tripsDuration = Date.now() - tripsStart

        console.log("[v0] Trips request completed in:", tripsDuration, "ms")
        console.log("[v0] Trips response status:", tripsResponse.status)
        console.log("[v0] Trips response statusText:", tripsResponse.statusText)
        console.log("[v0] Trips response headers:", Object.fromEntries(tripsResponse.headers.entries()))

        // Check if trips response is actually JSON before parsing
        const tripsContentType = tripsResponse.headers.get("content-type")
        console.log("[v0] Trips response content-type:", tripsContentType)

        if (!tripsContentType || !tripsContentType.includes("application/json")) {
          console.warn("[v0] Trips API returned non-JSON response, using default data")
          console.warn("[v0] Trips response content-type was:", tripsContentType)

          const tripsResponseText = await tripsResponse.text()
          console.warn("[v0] Non-JSON trips response body (first 1000 chars):", tripsResponseText.substring(0, 1000))
          console.warn("[v0] Trips response body length:", tripsResponseText.length)
          console.warn("[v0] Is HTML response?", tripsResponseText.includes("<!DOCTYPE"))

          initializeDefaultData()
          isOnline = false
          return
        }

        let tripsData
        try {
          const tripsResponseText = await tripsResponse.text()
          console.log("[v0] Trips raw response length:", tripsResponseText.length)
          console.log("[v0] Trips raw response (first 500 chars):", tripsResponseText.substring(0, 500))

          tripsData = JSON.parse(tripsResponseText)
          console.log("[v0] Trips data parsed successfully")
          console.log("[v0] Trips data structure:", {
            hasTrips: !!tripsData.trips,
            tripsCount: tripsData.trips?.length || 0,
            keys: Object.keys(tripsData),
          })
        } catch (parseError) {
          console.error("[v0] Failed to parse trips response:", parseError)
          initializeDefaultData()
          isOnline = false
          return
        }

        if (tripsResponse.ok && tripsData.trips) {
          console.log("[v0] Setting trips cache with", tripsData.trips.length, "trips")
          tripsCache = tripsData.trips
          bookingsCache = [] // Bookings will be handled separately
          isOnline = true
          console.log("[v0] Successfully loaded data from API:", tripsData.trips.length, "trips")
          console.log("[v0] Sample trip data:", tripsData.trips[0])
        } else {
          console.error("[v0] Trips response not ok or no trips data")
          console.error("[v0] Response ok:", tripsResponse.ok)
          console.error("[v0] Has trips:", !!tripsData.trips)
          throw new Error("Failed to fetch trips from API")
        }
      } else {
        console.warn("[v0] API connection failed, using default data")
        console.warn("[v0] Connection result:", connectionResult)
        initializeDefaultData()
        isOnline = false
      }
    } catch (error) {
      console.error("[v0] Error initializing from API:", error)
      console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")
      console.error("[v0] Error name:", error instanceof Error ? error.name : "Unknown")
      console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
      initializeDefaultData()
      isOnline = false
    }
  },

  // Get all trips (sync for compatibility)
  getAllTrips: (): Trip[] => {
    return [...tripsCache]
  },

  // Subscribe to trip updates
  onTripsUpdate: (listener: TripUpdateListener): (() => void) => {
    tripUpdateListeners.push(listener)
    return () => {
      const index = tripUpdateListeners.indexOf(listener)
      if (index > -1) {
        tripUpdateListeners.splice(index, 1)
      }
    }
  },

  // Get trips by destination
  getTripsByDestination: (destination: string): Trip[] => {
    return tripsCache.filter((trip) => trip.destination === destination)
  },

  // Get trip by ID
  getTripById: (id: string): Trip | undefined => {
    return tripsCache.find((trip) => trip.id === id)
  },

  addTrip: async (tripData: Omit<Trip, "id" | "createdAt" | "updatedAt" | "status">): Promise<Trip> => {
    const newTripData = {
      ...tripData,
      status: calculateTripStatus({ ...tripData } as Trip),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      if (isOnline) {
        const response = await fetch("/api/trips", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTripData),
        })

        if (response.ok) {
          const data = await response.json()
          const apiTrip = data.trip
          tripsCache.push(apiTrip)
          notifyTripUpdate()

          createAuditLog(
            "trip_created",
            "trip",
            apiTrip.id,
            `New trip created: ${apiTrip.destination} from ${apiTrip.startDate} to ${apiTrip.endDate}`,
            null,
            apiTrip,
          )

          return apiTrip
        } else {
          throw new Error("Failed to create trip via API")
        }
      } else {
        // Fallback to local storage
        const localTrip = {
          ...newTripData,
          id: `trip-${Date.now()}`,
        }
        tripsCache.push(localTrip)
        notifyTripUpdate()
        return localTrip
      }
    } catch (error) {
      console.error("[v0] Error creating trip via API:", error)
      // Fallback to local storage
      const localTrip = {
        ...newTripData,
        id: `trip-${Date.now()}`,
      }
      tripsCache.push(localTrip)
      notifyTripUpdate()
      return localTrip
    }
  },

  updateTrip: async (id: string, updates: Partial<Omit<Trip, "id" | "createdAt">>): Promise<Trip | null> => {
    const tripIndex = tripsCache.findIndex((trip) => trip.id === id)
    if (tripIndex === -1) return null

    const originalTrip = { ...tripsCache[tripIndex] }
    const updatedTripData = {
      ...updates,
      status: calculateTripStatus({ ...tripsCache[tripIndex], ...updates } as Trip),
      updatedAt: new Date().toISOString(),
    }

    try {
      if (isOnline) {
        const response = await fetch(`/api/trips/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTripData),
        })

        if (response.ok) {
          const data = await response.json()
          const updatedTrip = data.trip
          tripsCache[tripIndex] = updatedTrip
          notifyTripUpdate()

          createAuditLog(
            "trip_updated",
            "trip",
            id,
            `Trip updated: ${Object.keys(updates).join(", ")} changed`,
            originalTrip,
            updatedTrip,
          )

          return updatedTrip
        } else {
          throw new Error("Failed to update trip via API")
        }
      } else {
        // Fallback to local storage
        const localUpdatedTrip = { ...tripsCache[tripIndex], ...updatedTripData }
        tripsCache[tripIndex] = localUpdatedTrip
        notifyTripUpdate()
        return localUpdatedTrip
      }
    } catch (error) {
      console.error("[v0] Error updating trip via API:", error)
      // Fallback to local storage
      const localUpdatedTrip = { ...tripsCache[tripIndex], ...updatedTripData }
      tripsCache[tripIndex] = localUpdatedTrip
      notifyTripUpdate()
      return localUpdatedTrip
    }
  },

  deleteTrip: async (id: string): Promise<boolean> => {
    const tripIndex = tripsCache.findIndex((trip) => trip.id === id)
    if (tripIndex === -1) return false

    const deletedTrip = tripsCache[tripIndex]

    try {
      if (isOnline) {
        const response = await fetch(`/api/trips/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          tripsCache.splice(tripIndex, 1)
          notifyTripUpdate()

          createAuditLog(
            "trip_deleted",
            "trip",
            id,
            `Trip deleted: ${deletedTrip.destination} ${deletedTrip.startDate} - ${deletedTrip.endDate}`,
            deletedTrip,
            null,
          )

          return true
        } else {
          throw new Error("Failed to delete trip via API")
        }
      } else {
        // Fallback to local storage
        tripsCache.splice(tripIndex, 1)
        notifyTripUpdate()
        return true
      }
    } catch (error) {
      console.error("[v0] Error deleting trip via API:", error)
      // Fallback to local storage
      tripsCache.splice(tripIndex, 1)
      notifyTripUpdate()
      return true
    }

    return false
  },

  // Book trip (booking system)
  bookTrip: (
    tripId: string,
    guestCount: number,
    guestData: { names: string[]; email: string; phone: string },
  ): { success: boolean; booking?: Booking; error?: string } => {
    const trip = tripsCache.find((t) => t.id === tripId)
    if (!trip) {
      return { success: false, error: "Trip not found" }
    }

    if (trip.availableSpots < guestCount) {
      return { success: false, error: "Not enough spots available" }
    }

    const booking: Booking = {
      id: `booking-${Date.now()}`,
      tripId,
      guestCount,
      guestNames: guestData.names,
      contactEmail: guestData.email,
      contactPhone: guestData.phone,
      totalAmount: calculateDiscountedPrice(trip) * guestCount,
      bookingDate: new Date().toISOString(),
      status: "confirmed",
    }

    bookingsCache.push(booking)

    const tripIndex = tripsCache.findIndex((t) => t.id === tripId)
    tripsCache[tripIndex] = {
      ...trip,
      availableSpots: trip.availableSpots - guestCount,
      status: calculateTripStatus({ ...trip, availableSpots: trip.availableSpots - guestCount }),
      updatedAt: new Date().toISOString(),
    }

    notifyTripUpdate()
    return { success: true, booking }
  },

  // Cancel booking
  cancelBooking: (bookingId: string): boolean => {
    const bookingIndex = bookingsCache.findIndex((b) => b.id === bookingId)
    if (bookingIndex === -1) return false

    const booking = bookingsCache[bookingIndex]
    const trip = tripsCache.find((t) => t.id === booking.tripId)

    if (trip) {
      const tripIndex = tripsCache.findIndex((t) => t.id === booking.tripId)
      tripsCache[tripIndex] = {
        ...trip,
        availableSpots: trip.availableSpots + booking.guestCount,
        status: calculateTripStatus({ ...trip, availableSpots: trip.availableSpots + booking.guestCount }),
        updatedAt: new Date().toISOString(),
      }
    }

    bookingsCache[bookingIndex].status = "cancelled"
    notifyTripUpdate()
    return true
  },

  // Get all bookings
  getAllBookings: (): Booking[] => [...bookingsCache],

  // Get bookings for a trip
  getBookingsForTrip: (tripId: string): Booking[] =>
    bookingsCache.filter((booking) => booking.tripId === tripId && booking.status !== "cancelled"),

  // Get all audit logs
  getAllAuditLogs: (): AuditLog[] => [...auditLogs],

  // Subscribe to audit log updates
  onAuditLogsUpdate: (listener: AuditLogListener): (() => void) => {
    auditLogListeners.push(listener)
    return () => {
      const index = auditLogListeners.indexOf(listener)
      if (index > -1) {
        auditLogListeners.splice(index, 1)
      }
    }
  },

  // Get connection status
  isConnectedToAirtable: (): boolean => isOnline,

  // Manual sync with Airtable via secure API
  syncWithAirtable: async (): Promise<boolean> => {
    try {
      console.log("[v0] Starting manual sync with Airtable...")
      const syncStart = Date.now()

      const tripsResponse = await fetch("/api/trips")
      const syncDuration = Date.now() - syncStart

      console.log("[v0] Sync request completed in:", syncDuration, "ms")
      console.log("[v0] Sync response status:", tripsResponse.status)
      console.log("[v0] Sync response headers:", Object.fromEntries(tripsResponse.headers.entries()))

      // Check if response is actually JSON before parsing
      const contentType = tripsResponse.headers.get("content-type")
      console.log("[v0] Sync response content-type:", contentType)

      if (!contentType || !contentType.includes("application/json")) {
        console.warn("[v0] Sync API returned non-JSON response")
        console.warn("[v0] Sync content-type was:", contentType)

        const syncResponseText = await tripsResponse.text()
        console.warn("[v0] Non-JSON sync response body (first 1000 chars):", syncResponseText.substring(0, 1000))

        isOnline = false
        return false
      }

      let tripsData
      try {
        const syncResponseText = await tripsResponse.text()
        console.log("[v0] Sync raw response:", syncResponseText)
        tripsData = JSON.parse(syncResponseText)
        console.log("[v0] Sync data parsed successfully:", tripsData)
      } catch (parseError) {
        console.error("[v0] Failed to parse sync response:", parseError)
        isOnline = false
        return false
      }

      if (tripsResponse.ok && tripsData.trips) {
        console.log("[v0] Sync successful, updating cache with", tripsData.trips.length, "trips")
        tripsCache = tripsData.trips
        bookingsCache = [] // Bookings handled separately
        isOnline = true
        notifyTripUpdate()

        console.log("[v0] Successfully synced with API")
        return true
      } else {
        console.error("[v0] Sync failed - response not ok or no trips data")
        throw new Error("Failed to sync with API")
      }
    } catch (error) {
      console.error("[v0] Error syncing with API:", error)
      console.error("[v0] Sync error stack:", error instanceof Error ? error.stack : "No stack trace")
      isOnline = false
      return false
    }
  },

  // Convert legacy trip format to new format (for booking form compatibility)
  convertToLegacyFormat: (destination: string) => {
    const destTrips = tripsCache.filter((trip) => trip.destination === destination)
    return destTrips.map((trip, index) => ({
      id: index + 1,
      startDate: trip.startDate,
      endDate: trip.endDate,
      availableSpots: trip.availableSpots,
      maxCapacity: trip.totalSpots,
      status: trip.status,
      price: trip.price,
      discountPercentage: trip.discountPercentage || 0,
      discountedPrice: calculateDiscountedPrice(trip),
      savings: calculateSavings(trip),
      hasDiscount: hasDiscount(trip),
      currency: trip.currency,
    }))
  },

  // Get trip statistics
  getStatistics: () => {
    const totalTrips = tripsCache.length
    const availableTrips = tripsCache.filter((t) => t.status === "available").length
    const lowAvailabilityTrips = tripsCache.filter((t) => t.status === "low").length
    const fullTrips = tripsCache.filter((t) => t.status === "full").length
    const totalBookings = bookingsCache.filter((b) => b.status === "confirmed").length
    const totalRevenue = bookingsCache
      .filter((b) => b.status === "confirmed")
      .reduce((sum, b) => sum + b.totalAmount, 0)

    return {
      totalTrips,
      availableTrips,
      lowAvailabilityTrips,
      fullTrips,
      totalBookings,
      totalRevenue,
    }
  },
}

if (typeof window !== "undefined") {
  tripDataService.initialize().catch(console.error)
}

"use client"

import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { tripDataService, type Trip, type Booking, type AuditLog } from "@/lib/trip-data-service"

interface TripDataContextType {
  trips: Trip[]
  bookings: Booking[]
  auditLogs: AuditLog[]
  isLoading: boolean
  error: string | null
  isConnectedToAirtable: boolean

  // Trip operations (now async)
  getAllTrips: () => Trip[]
  getTripsByDestination: (destination: string) => Trip[]
  getTripById: (id: string) => Trip | undefined
  addTrip: (tripData: Omit<Trip, "id" | "createdAt" | "updatedAt" | "status">) => Promise<Trip>
  updateTrip: (id: string, updates: Partial<Omit<Trip, "id" | "createdAt">>) => Promise<Trip | null>
  deleteTrip: (id: string) => Promise<boolean>

  // Booking operations
  bookTrip: (
    tripId: string,
    guestCount: number,
    guestData: { names: string[]; email: string; phone: string },
  ) => { success: boolean; booking?: Booking; error?: string }
  cancelBooking: (bookingId: string) => boolean
  getAllBookings: () => Booking[]
  getBookingsForTrip: (tripId: string) => Booking[]

  // Utility functions
  convertToLegacyFormat: (destination: string) => any[]
  getStatistics: () => any

  // Real-time updates
  refreshData: () => Promise<void>
  syncWithAirtable: () => Promise<boolean>
}

const TripDataContext = createContext<TripDataContextType | undefined>(undefined)

interface TripDataProviderProps {
  children: ReactNode
}

export function TripDataProvider({ children }: TripDataProviderProps) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnectedToAirtable, setIsConnectedToAirtable] = useState(false)

  useEffect(() => {
    const initializeData = async () => {
      try {
        console.log("[v0] Initializing trip data context...")

        await tripDataService.initialize()

        // Load initial data
        setTrips(tripDataService.getAllTrips())
        setBookings(tripDataService.getAllBookings())
        setAuditLogs(tripDataService.getAllAuditLogs())
        setIsConnectedToAirtable(tripDataService.isConnectedToAirtable())
        setIsLoading(false)

        console.log("[v0] Trip data context initialized successfully")

        // Subscribe to real-time updates
        const unsubscribeTrips = tripDataService.onTripsUpdate((updatedTrips) => {
          console.log("[v0] Trip data updated, refreshing context", updatedTrips.length)
          setTrips(updatedTrips)
          setBookings(tripDataService.getAllBookings())
        })

        const unsubscribeAuditLogs = tripDataService.onAuditLogsUpdate((updatedLogs) => {
          console.log("[v0] Audit logs updated, refreshing context", updatedLogs.length)
          setAuditLogs(updatedLogs)
        })

        return () => {
          unsubscribeTrips()
          unsubscribeAuditLogs()
        }
      } catch (err) {
        console.error("[v0] Error initializing trip data context:", err)
        setError(err instanceof Error ? err.message : "Failed to load trip data")
        setIsLoading(false)
      }
    }

    initializeData()
  }, [])

  const refreshData = async () => {
    try {
      setIsLoading(true)
      const syncSuccess = await tripDataService.syncWithAirtable()

      setTrips(tripDataService.getAllTrips())
      setBookings(tripDataService.getAllBookings())
      setAuditLogs(tripDataService.getAllAuditLogs())
      setIsConnectedToAirtable(tripDataService.isConnectedToAirtable())

      if (!syncSuccess) {
        setError("Failed to sync with Airtable, using cached data")
      } else {
        setError(null)
      }

      console.log("[v0] Trip data manually refreshed")
    } catch (err) {
      console.error("[v0] Error refreshing trip data:", err)
      setError(err instanceof Error ? err.message : "Failed to refresh trip data")
    } finally {
      setIsLoading(false)
    }
  }

  const contextValue: TripDataContextType = {
    trips,
    bookings,
    auditLogs,
    isLoading,
    error,
    isConnectedToAirtable,

    // Trip operations (now async)
    getAllTrips: () => trips,
    getTripsByDestination: (destination: string) => trips.filter((trip) => trip.destination === destination),
    getTripById: (id: string) => trips.find((trip) => trip.id === id),

    addTrip: async (tripData) => {
      const newTrip = await tripDataService.addTrip(tripData)
      return newTrip
    },

    updateTrip: async (id, updates) => {
      const updatedTrip = await tripDataService.updateTrip(id, updates)
      return updatedTrip
    },

    deleteTrip: async (id) => {
      const success = await tripDataService.deleteTrip(id)
      return success
    },

    // Booking operations (keeping sync for now)
    bookTrip: (tripId, guestCount, guestData) => {
      const result = tripDataService.bookTrip(tripId, guestCount, guestData)
      return result
    },

    cancelBooking: (bookingId) => {
      const success = tripDataService.cancelBooking(bookingId)
      return success
    },

    getAllBookings: () => bookings,
    getBookingsForTrip: (tripId) =>
      bookings.filter((booking) => booking.tripId === tripId && booking.status !== "cancelled"),

    // Utility functions
    convertToLegacyFormat: tripDataService.convertToLegacyFormat,
    getStatistics: tripDataService.getStatistics,

    refreshData,
    syncWithAirtable: tripDataService.syncWithAirtable,
  }

  return <TripDataContext.Provider value={contextValue}>{children}</TripDataContext.Provider>
}

export function useTripData() {
  const context = useContext(TripDataContext)
  if (context === undefined) {
    throw new Error("useTripData must be used within a TripDataProvider")
  }
  return context
}

export function useDestinationTrips(destination: string) {
  const { trips, isLoading, error } = useTripData()

  const destinationTrips = React.useMemo(() => {
    return trips.filter((trip) => trip.destination === destination)
  }, [trips, destination])

  return { trips: destinationTrips, isLoading, error }
}

export function useTripAvailability(destination?: string) {
  const { trips, isLoading, error, convertToLegacyFormat } = useTripData()

  const availability = React.useMemo(() => {
    if (destination) {
      return convertToLegacyFormat(destination)
    }
    return trips
  }, [trips, destination, convertToLegacyFormat])

  return { availability, isLoading, error }
}

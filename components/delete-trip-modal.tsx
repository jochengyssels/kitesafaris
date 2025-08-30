"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Calendar, MapPin, Users, Euro } from "lucide-react"

interface Trip {
  id: string
  destination: "caribbean" | "greece" | "sardinia"
  startDate: string
  endDate: string
  price: number
  currency: "EUR" | "USD"
  totalSpots: number
  availableSpots: number
  status: "available" | "low" | "full"
  createdAt: string
  updatedAt: string
}

interface DeleteTripModalProps {
  trip: Trip
  open: boolean
  onClose: () => void
  onDelete: () => void
}

export function DeleteTripModal({ trip, open, onClose, onDelete }: DeleteTripModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDestinationName = (destination: string) => {
    switch (destination) {
      case "caribbean":
        return "Caribbean (Antigua)"
      case "greece":
        return "Greece"
      case "sardinia":
        return "Sardinia"
      default:
        return destination
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onDelete()
    } catch (error) {
      console.error("Error deleting trip:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const bookedSpots = trip.totalSpots - trip.availableSpots
  const hasBookings = bookedSpots > 0

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-montserrat text-xl text-red-600 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Delete Trip
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="font-open-sans text-red-800 mb-3">
              Are you sure you want to delete this trip? This action cannot be undone.
            </p>

            {hasBookings && (
              <div className="bg-red-100 border border-red-300 rounded-md p-3 mb-3">
                <p className="font-semibold text-red-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Warning: This trip has active bookings
                </p>
                <p className="text-sm text-red-800 mt-1">
                  {bookedSpots} guest{bookedSpots !== 1 ? "s" : ""} currently booked. Deleting this trip will affect
                  existing reservations.
                </p>
              </div>
            )}
          </div>

          <div className="bg-sand-beige-50 border border-sand-beige-200 rounded-lg p-4">
            <h4 className="font-montserrat font-semibold text-navy-900 mb-3">Trip Details</h4>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Destination:</span>
                <span className="capitalize">{getDestinationName(trip.destination)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Dates:</span>
                <span>
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Euro className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Price:</span>
                <span>
                  {trip.price.toLocaleString()} {trip.currency}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Capacity:</span>
                <span>
                  {trip.availableSpots}/{trip.totalSpots} spots available
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-sand-beige-300 bg-transparent"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700 text-white">
              {isDeleting ? "Deleting..." : "Delete Trip"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

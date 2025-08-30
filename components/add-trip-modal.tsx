"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Euro, AlertCircle } from "lucide-react"

interface TripData {
  destination: "caribbean" | "greece" | "sardinia"
  startDate: string
  endDate: string
  price: number
  currency: "EUR" | "USD"
  totalSpots: number
  availableSpots: number
}

interface AddTripModalProps {
  open: boolean
  onClose: () => void
  onAdd: (trip: TripData) => void
}

export function AddTripModal({ open, onClose, onAdd }: AddTripModalProps) {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    price: "",
    currency: "EUR" as const,
    totalSpots: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.destination) {
      newErrors.destination = "Destination is required"
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required"
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate)
      const endDate = new Date(formData.endDate)

      if (endDate <= startDate) {
        newErrors.endDate = "End date must be after start date"
      }

      const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      if (daysDiff !== 7) {
        newErrors.endDate = "Trip must be exactly 7 days (Saturday to Saturday)"
      }

      if (startDate.getDay() !== 6) {
        newErrors.startDate = "Trip must start on Saturday"
      }
    }

    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
    }

    if (!formData.totalSpots || Number.parseInt(formData.totalSpots) <= 0) {
      newErrors.totalSpots = "Total spots must be a positive number"
    }

    if (Number.parseInt(formData.totalSpots) > 12) {
      newErrors.totalSpots = "Maximum 12 spots allowed per trip"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const totalSpots = Number.parseInt(formData.totalSpots)
      const availableSpots = totalSpots

      const newTrip: TripData = {
        destination: formData.destination as "caribbean" | "greece" | "sardinia",
        startDate: formData.startDate,
        endDate: formData.endDate,
        price: Number.parseFloat(formData.price),
        currency: formData.currency,
        totalSpots,
        availableSpots,
      }

      onAdd(newTrip)

      // Reset form
      setFormData({
        destination: "",
        startDate: "",
        endDate: "",
        price: "",
        currency: "EUR",
        totalSpots: "",
      })
      setErrors({})
    } catch (error) {
      console.error("Error adding trip:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      destination: "",
      startDate: "",
      endDate: "",
      price: "",
      currency: "EUR",
      totalSpots: "",
    })
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-montserrat text-xl text-navy-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-turquoise-600" />
            Add New Trip
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination" className="font-open-sans font-medium text-navy-900">
              Destination *
            </Label>
            <Select
              value={formData.destination}
              onValueChange={(value) => setFormData({ ...formData, destination: value })}
            >
              <SelectTrigger className="border-sand-beige-300">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="caribbean">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Caribbean (Antigua)
                  </div>
                </SelectItem>
                <SelectItem value="greece">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Greece
                  </div>
                </SelectItem>
                <SelectItem value="sardinia">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Sardinia
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.destination && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.destination}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="font-open-sans font-medium text-navy-900">
                Start Date *
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="border-sand-beige-300"
              />
              {errors.startDate && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.startDate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="font-open-sans font-medium text-navy-900">
                End Date *
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="border-sand-beige-300"
              />
              {errors.endDate && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="font-open-sans font-medium text-navy-900">
                Price *
              </Label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="2890.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="pl-10 border-sand-beige-300"
                />
              </div>
              {errors.price && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.price}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency" className="font-open-sans font-medium text-navy-900">
                Currency
              </Label>
              <Select
                value={formData.currency}
                onValueChange={(value: "EUR" | "USD") => setFormData({ ...formData, currency: value })}
              >
                <SelectTrigger className="border-sand-beige-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalSpots" className="font-open-sans font-medium text-navy-900">
              Total Spots *
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="totalSpots"
                type="number"
                min="1"
                max="12"
                placeholder="8"
                value={formData.totalSpots}
                onChange={(e) => setFormData({ ...formData, totalSpots: e.target.value })}
                className="pl-10 border-sand-beige-300"
              />
            </div>
            {errors.totalSpots && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.totalSpots}
              </p>
            )}
            <p className="text-sm text-gray-600">Maximum 12 spots per trip</p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-sand-beige-300 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-turquoise-600 hover:bg-turquoise-700">
              {isSubmitting ? "Adding..." : "Add Trip"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Users, Euro, AlertCircle, Edit, Check, X, AlertTriangle } from "lucide-react"

interface Trip {
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

interface EditTripModalProps {
  trip: Trip
  open: boolean
  onClose: () => void
  onSave: (trip: Trip) => void
}

export function EditTripModal({ trip, open, onClose, onSave }: EditTripModalProps) {
  const [formData, setFormData] = useState({
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate,
    price: (trip.price ?? 0).toString(),
    discountPercentage: (trip.discountPercentage ?? 0).toString(),
    currency: trip.currency,
    totalSpots: (trip.totalSpots ?? 0).toString(),
    availableSpots: (trip.availableSpots ?? 0).toString(),
  })
  const [originalData, setOriginalData] = useState(formData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false)
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (trip) {
      const newFormData = {
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        price: (trip.price ?? 0).toString(),
        discountPercentage: (trip.discountPercentage ?? 0).toString(),
        currency: trip.currency,
        totalSpots: (trip.totalSpots ?? 0).toString(),
        availableSpots: (trip.availableSpots ?? 0).toString(),
      }
      setFormData(newFormData)
      setOriginalData(newFormData)
      setHasUnsavedChanges(false)
    }
  }, [trip])

  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData)
    setHasUnsavedChanges(hasChanges)

    if (autoSaveEnabled && hasChanges && validateForm(true)) {
      // Clear existing timeout
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }

      // Set new timeout for autosave
      autoSaveTimeoutRef.current = setTimeout(() => {
        handleSave(true)
      }, 3000) // Autosave after 3 seconds of inactivity
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [formData, originalData, autoSaveEnabled])

  const validateForm = (silent = false) => {
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

    if (formData.discountPercentage) {
      const discount = Number.parseFloat(formData.discountPercentage)
      if (isNaN(discount) || discount < 0 || discount > 100) {
        newErrors.discountPercentage = "Discount must be between 0 and 100"
      }
    }

    if (!formData.totalSpots || Number.parseInt(formData.totalSpots) <= 0) {
      newErrors.totalSpots = "Total spots must be a positive number"
    }

    if (Number.parseInt(formData.totalSpots) > 12) {
      newErrors.totalSpots = "Maximum 12 spots allowed per trip"
    }

    if (!formData.availableSpots || Number.parseInt(formData.availableSpots) < 0) {
      newErrors.availableSpots = "Available spots must be 0 or more"
    }

    if (Number.parseInt(formData.availableSpots) > Number.parseInt(formData.totalSpots)) {
      newErrors.availableSpots = "Available spots cannot exceed total spots"
    }

    if (!silent) {
      setErrors(newErrors)
    }
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async (isAutoSave = false) => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const totalSpots = Number.parseInt(formData.totalSpots) || 0
      const availableSpots = Number.parseInt(formData.availableSpots) || 0

      let status: "available" | "low" | "full"
      if (availableSpots === 0) {
        status = "full"
      } else if (availableSpots <= Math.ceil(totalSpots * 0.3)) {
        status = "low"
      } else {
        status = "available"
      }

      const updatedTrip: Trip = {
        ...trip,
        destination: formData.destination as "caribbean" | "greece" | "sardinia",
        startDate: formData.startDate,
        endDate: formData.endDate,
        price: Number.parseFloat(formData.price) || 0,
        discountPercentage: formData.discountPercentage ? Number.parseFloat(formData.discountPercentage) : 0,
        currency: formData.currency as "EUR" | "USD",
        totalSpots,
        availableSpots,
        status,
      }

      onSave(updatedTrip)

      if (isAutoSave) {
        // Update original data to reflect autosave
        setOriginalData(formData)
        setHasUnsavedChanges(false)
      }
    } catch (error) {
      console.error("Error updating trip:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSave(false)
  }

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedWarning(true)
    } else {
      resetAndClose()
    }
  }

  const resetAndClose = () => {
    setErrors({})
    setHasUnsavedChanges(false)
    setShowUnsavedWarning(false)
    setAutoSaveEnabled(false)
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }
    onClose()
  }

  const handleDiscardChanges = () => {
    setFormData(originalData)
    resetAndClose()
  }

  const handleReset = () => {
    setFormData(originalData)
    setErrors({})
    setHasUnsavedChanges(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-montserrat text-xl text-navy-900 flex items-center gap-2">
              <Edit className="w-5 h-5 text-turquoise-600" />
              Edit Trip
              {hasUnsavedChanges && (
                <span className="text-sm font-normal text-coral-orange-600 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  Unsaved changes
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-between p-3 bg-sand-beige-50 rounded-lg">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autosave"
                checked={autoSaveEnabled}
                onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                className="rounded border-sand-beige-300"
              />
              <Label htmlFor="autosave" className="text-sm text-gray-700">
                Enable autosave
              </Label>
            </div>
            {autoSaveEnabled && hasUnsavedChanges && <span className="text-xs text-gray-500">Saving in 3s...</span>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="destination" className="font-open-sans font-medium text-navy-900">
                Destination *
              </Label>
              <Select
                value={formData.destination}
                onValueChange={(value) => setFormData({ ...formData, destination: value as "caribbean" | "greece" | "sardinia" })}
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
                <Label htmlFor="discountPercentage" className="font-open-sans font-medium text-navy-900">
                  Discount %
                </Label>
                <Input
                  id="discountPercentage"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={formData.discountPercentage}
                  onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                  className="border-sand-beige-300"
                />
                {errors.discountPercentage && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.discountPercentage}
                  </p>
                )}
              </div>
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

            <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="availableSpots" className="font-open-sans font-medium text-navy-900">
                  Available Spots *
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="availableSpots"
                    type="number"
                    min="0"
                    max={formData.totalSpots}
                    placeholder="3"
                    value={formData.availableSpots}
                    onChange={(e) => setFormData({ ...formData, availableSpots: e.target.value })}
                    className="pl-10 border-sand-beige-300"
                  />
                </div>
                {errors.availableSpots && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.availableSpots}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleReset}
                disabled={!hasUnsavedChanges}
                className="text-gray-500 hover:text-gray-700"
              >
                Reset Changes
              </Button>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="font-montserrat font-bold border-sand-beige-300 bg-transparent hover:bg-sand-beige-50 text-navy-900 px-6 py-2"
                  aria-label="Cancel editing and close modal"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !hasUnsavedChanges}
                  variant="outline"
                  className="font-montserrat font-bold border-sand-beige-300 bg-transparent hover:bg-sand-beige-50 text-navy-900 px-6 py-2 shadow-lg focus:ring-2 focus:ring-sand-beige-500 focus:ring-offset-2 min-w-[140px] flex items-center justify-center"
                  aria-label="Save all changes to this trip"
                >
                  <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="font-montserrat font-bold text-navy-900">
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </span>
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {showUnsavedWarning && (
        <Dialog open={showUnsavedWarning} onOpenChange={setShowUnsavedWarning}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-montserrat text-xl text-navy-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-coral-orange-600" />
                Unsaved Changes
              </DialogTitle>
            </DialogHeader>
            <Alert className="border-coral-orange-200 bg-coral-orange-50">
              <AlertTriangle className="w-4 h-4 text-coral-orange-600" />
              <AlertDescription>
                You have unsaved changes that will be lost if you close this dialog. What would you like to do?
              </AlertDescription>
            </Alert>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowUnsavedWarning(false)}
                className="font-montserrat border-sand-beige-300 bg-transparent hover:bg-sand-beige-50"
                aria-label="Continue editing without saving"
              >
                Continue Editing
              </Button>
              <Button
                variant="outline"
                onClick={handleDiscardChanges}
                className="font-montserrat border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                aria-label="Discard all unsaved changes"
              >
                Discard Changes
              </Button>
              <Button
                onClick={() => {
                  setShowUnsavedWarning(false)
                  handleSave(false)
                }}
                className="font-montserrat font-bold bg-coral-orange-600 hover:bg-coral-orange-700 text-white shadow-lg focus:ring-2 focus:ring-coral-orange-500 focus:ring-offset-2"
                aria-label="Save changes and close modal"
              >
                <Check className="w-4 h-4 mr-2" />
                Save & Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

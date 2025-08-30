"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Users,
  MapPin,
  Anchor,
  User,
  CreditCard,
  Check,
  ChevronLeft,
  ChevronRight,
  Shield,
  AlertTriangle,
  CheckCircle,
  Tag,
} from "lucide-react"
import { tripDataService, calculateDiscountedPrice, calculateSavings, hasDiscount } from "@/lib/trip-data-service"

interface BookingData {
  dates: { start: string; end: string }
  groupSize: number
  destination: string
  yacht: string
  guests: Array<{
    name: string
    email: string
    phone: string
    dietary: string
  }>
  pricing: {
    basePrice: number
    perPerson: number
    perNight: number
    total: number
    breakdown: Array<{ item: string; amount: number }>
  }
}

const destinations = [
  { id: "caribbean", name: "Caribbean", basePrice: 2700 },
  { id: "antigua", name: "Antigua & Barbuda", basePrice: 2700 },
  { id: "greece", name: "Greece (Coming Soon)", basePrice: 0 },
  { id: "sardinia", name: "Sardinia (Coming Soon)", basePrice: 0 },
]

const yachts = [{ id: "catamaran", name: "Luxury Catamaran", multiplier: 1.0, capacity: 6, cabins: 3 }]

const normalizeDestinationId = (destinationId: string): string => {
  // Treat both 'caribbean' and 'antigua' as equivalent, mapping to 'caribbean' for trip data
  if (destinationId === "antigua" || destinationId === "caribbean") {
    return "caribbean"
  }
  return destinationId
}

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [availableTrips, setAvailableTrips] = useState<Record<string, any[]>>({})

  const [bookingData, setBookingData] = useState<BookingData>({
    dates: { start: "", end: "" },
    groupSize: 2,
    destination: "",
    yacht: "",
    guests: [
      { name: "", email: "", phone: "", dietary: "" },
      { name: "", email: "", phone: "", dietary: "" },
    ],
    pricing: {
      basePrice: 0,
      perPerson: 0,
      perNight: 0,
      total: 0,
      breakdown: [],
    },
  })

  // Load available trips on component mount
  useEffect(() => {
    const loadTrips = () => {
      const trips = tripDataService.getAllTrips()
      const tripsByDestination: Record<string, any[]> = {}

      destinations.forEach((dest) => {
        const normalizedDestId = normalizeDestinationId(dest.id)
        const destTrips = trips
          .filter((trip) => trip.destination === normalizedDestId)
          .map((trip) => ({
            id: trip.id,
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
          .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

        tripsByDestination[dest.id] = destTrips
      })

      setAvailableTrips(tripsByDestination)
    }

    loadTrips()

    // Subscribe to trip updates
    const unsubscribe = tripDataService.onTripsUpdate(() => {
      loadTrips()
    })

    return unsubscribe
  }, [])

  // Update guests array when group size changes
  useEffect(() => {
    const currentGuestCount = bookingData.guests.length
    if (bookingData.groupSize !== currentGuestCount) {
      const newGuests = [...bookingData.guests]

      if (bookingData.groupSize > currentGuestCount) {
        // Add empty guest objects
        for (let i = currentGuestCount; i < bookingData.groupSize; i++) {
          newGuests.push({ name: "", email: "", phone: "", dietary: "" })
        }
      } else {
        // Remove excess guests
        newGuests.splice(bookingData.groupSize)
      }

      setBookingData((prev) => ({ ...prev, guests: newGuests }))
    }
  }, [bookingData.groupSize])

  // Recalculate pricing when relevant data changes
  useEffect(() => {
    calculatePricing()
  }, [bookingData.destination, bookingData.yacht, bookingData.dates, bookingData.groupSize])

  // Calculate pricing based on current selections
  const calculatePricing = () => {
    if (!bookingData.destination || !bookingData.yacht || !bookingData.dates.start || !bookingData.dates.end) {
      return
    }

    const normalizedDestination = normalizeDestinationId(bookingData.destination)
    const selectedTrip = tripDataService
      .getAllTrips()
      .find(
        (trip) =>
          trip.startDate === bookingData.dates.start &&
          trip.endDate === bookingData.dates.end &&
          trip.destination === normalizedDestination,
      )

    const destination = destinations.find((d) => d.id === bookingData.destination)
    const yacht = yachts.find((y) => y.id === bookingData.yacht)

    if (!destination || !yacht) return

    const startDate = new Date(bookingData.dates.start)
    const endDate = new Date(bookingData.dates.end)
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    // Use trip-specific pricing if available, otherwise fall back to destination base price
    let basePrice = destination.basePrice * yacht.multiplier
    let tripDiscount = 0
    let tripDiscountAmount = 0

    if (selectedTrip) {
      basePrice = selectedTrip.price * yacht.multiplier
      if (selectedTrip.discountPercentage && selectedTrip.discountPercentage > 0) {
        tripDiscount = selectedTrip.discountPercentage / 100
        tripDiscountAmount = basePrice * tripDiscount
      }
    }

    const perPerson = basePrice / bookingData.groupSize
    const perNight = basePrice / nights
    let total = basePrice * nights

    // Apply trip-specific discount first
    if (tripDiscountAmount > 0) {
      total = total - tripDiscountAmount * nights
    }

    // Group discounts (applied after trip discount)
    let groupDiscount = 0
    if (bookingData.groupSize >= 6) groupDiscount = 0.15
    else if (bookingData.groupSize >= 4) groupDiscount = 0.1

    const groupDiscountAmount = total * groupDiscount
    const finalTotal = total - groupDiscountAmount

    const breakdown = [
      { item: `${destination.name} (${nights} nights)`, amount: basePrice * nights },
      { item: `${yacht.name} upgrade`, amount: basePrice * nights * (yacht.multiplier - 1) },
      ...(tripDiscountAmount > 0
        ? [{ item: `Trip discount (${Math.round(tripDiscount * 100)}%)`, amount: -(tripDiscountAmount * nights) }]
        : []),
      ...(groupDiscount > 0
        ? [{ item: `Group discount (${Math.round(groupDiscount * 100)}%)`, amount: -groupDiscountAmount }]
        : []),
    ]

    setBookingData((prev) => ({
      ...prev,
      pricing: {
        basePrice,
        perPerson,
        perNight,
        total: finalTotal,
        breakdown,
      },
    }))
  }

  // Validation functions
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!bookingData.dates.start) newErrors.startDate = "Start date is required"
      if (!bookingData.dates.end) newErrors.endDate = "End date is required"
      if (!bookingData.destination) newErrors.destination = "Destination is required"
      if (!bookingData.yacht) newErrors.yacht = "Yacht selection is required"
      if (bookingData.groupSize < 1 || bookingData.groupSize > 6) {
        newErrors.groupSize = "Group size must be between 1 and 6"
      }
    }

    if (step === 2) {
      bookingData.guests.forEach((guest, index) => {
        if (!guest.name.trim()) newErrors[`guest${index}Name`] = "Name is required"
        if (!guest.email.trim()) newErrors[`guest${index}Email`] = "Email is required"
        if (!guest.phone.trim()) newErrors[`guest${index}Phone`] = "Phone is required"
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1) calculatePricing()
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(2)) return

    setIsSubmitting(true)

    try {
      const leadEmail = bookingData.guests[0]?.email
      if (leadEmail) {
        try {
          await fetch("/api/leads", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: leadEmail,
              source: "Booking Form",
            }),
          })
        } catch (error) {
          console.error("[v0] Booking form lead capture error:", error)
        }
      }

      const normalizedDestination = normalizeDestinationId(bookingData.destination)
      const selectedTrip = tripDataService
        .getAllTrips()
        .find(
          (trip) =>
            trip.startDate === bookingData.dates.start &&
            trip.endDate === bookingData.dates.end &&
            trip.destination === normalizedDestination,
        )

      if (selectedTrip) {
        const guestNames = bookingData.guests.map((guest) => guest.name).filter((name) => name.trim())
        const result = tripDataService.bookTrip(selectedTrip.id, bookingData.groupSize, {
          names: guestNames,
          email: bookingData.guests[0]?.email || "",
          phone: bookingData.guests[0]?.phone || "",
        })

        if (!result.success) {
          setErrors({ booking: result.error || "Booking failed" })
          setIsSubmitting(false)
          return
        }

        console.log("[v0] Booking created successfully:", result.booking)
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSubmitting(false)
      setIsConfirmed(true)
      setCurrentStep(4)
    } catch (error) {
      console.error("[v0] Booking error:", error)
      setErrors({ booking: "An error occurred while processing your booking" })
      setIsSubmitting(false)
    }
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
  }

  if (isConfirmed && currentStep === 4) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-coral-orange rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="font-montserrat font-bold text-2xl text-deep-navy mb-4">Booking Confirmed!</h2>
        <p className="font-open-sans text-gray-600 mb-6">
          Thank you for booking your kiteboarding safari. You'll receive a confirmation email shortly with all the
          details.
        </p>
        <div className="bg-sand-beige rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span>Destination:</span>
              <span className="font-semibold">{destinations.find((d) => d.id === bookingData.destination)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Guests:</span>
              <span className="font-semibold">{bookingData.groupSize}</span>
            </div>
            <div className="flex justify-between">
              <span>Dates:</span>
              <span>
                {bookingData.dates.start} - {bookingData.dates.end}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-bold text-coral-orange">€{bookingData.pricing.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-turquoise/10 border border-turquoise/20 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-turquoise mb-2">Refer Friends & Save €200!</h4>
          <p className="text-sm text-gray-600">
            Share your experience and both you and your friend get €200 off your next safari.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button className="bg-deep-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-deep-navy/90 transition-colors">
            Download Itinerary
          </button>
          <button className="border border-deep-navy text-deep-navy px-6 py-3 rounded-lg font-semibold hover:bg-deep-navy/5 transition-colors">
            Share Experience
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-sand-beige px-8 py-4">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step ? "bg-coral-orange text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              <span className={`ml-2 text-sm font-medium ${currentStep >= step ? "text-deep-navy" : "text-gray-500"}`}>
                {step === 1 ? "Trip Details" : step === 2 ? "Guest Info" : "Payment"}
              </span>
              {step < 3 && <ChevronRight className="w-4 h-4 text-gray-400 mx-4" />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8">
        {/* Step 1: Trip Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-montserrat font-bold text-2xl text-deep-navy mb-2">Plan Your Safari</h2>
              <p className="font-open-sans text-gray-600">
                Choose your destination, dates, and group size for the ultimate kiteboarding adventure.
              </p>
            </div>

            {/* Destination Selection */}
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Destination
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {destinations.map((dest) => (
                  <div
                    key={dest.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      dest.basePrice === 0
                        ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                        : bookingData.destination === dest.id
                          ? "border-coral-orange bg-coral-orange/5"
                          : "border-gray-200 hover:border-coral-orange/50"
                    }`}
                    onClick={() => {
                      if (dest.basePrice > 0) {
                        setBookingData((prev) => ({ ...prev, destination: dest.id }))
                      }
                    }}
                  >
                    <h3 className="font-semibold text-deep-navy">{dest.name}</h3>
                    {dest.basePrice > 0 ? (
                      <p className="text-sm text-coral-orange font-semibold">From €{dest.basePrice.toLocaleString()}</p>
                    ) : (
                      <p className="text-sm text-gray-500">Coming Soon</p>
                    )}
                  </div>
                ))}
              </div>
              {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
            </div>

            {/* Available Trips Display */}
            {bookingData.destination && availableTrips[bookingData.destination]?.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-deep-navy mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Available Trips
                </label>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {availableTrips[bookingData.destination].map((trip: any) => {
                    const isSelected =
                      bookingData.dates.start === trip.startDate && bookingData.dates.end === trip.endDate

                    return (
                      <div
                        key={trip.id}
                        className={`border rounded-lg p-4 transition-colors ${
                          trip.availableSpots === 0
                            ? "border-gray-200 bg-gray-50 opacity-60"
                            : isSelected
                              ? "border-coral-orange bg-coral-orange/5"
                              : "border-gray-200 hover:border-coral-orange/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-deep-navy">
                                {formatDateRange(trip.startDate, trip.endDate)}
                              </span>
                              {trip.hasDiscount && (
                                <div className="flex items-center gap-1 bg-coral-orange-100 text-coral-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                                  <Tag className="w-3 h-3" />
                                  {trip.discountPercentage}% OFF
                                </div>
                              )}
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  trip.status === "available"
                                    ? "bg-turquoise-100 text-turquoise-800"
                                    : trip.status === "low"
                                      ? "bg-coral-orange-100 text-coral-orange-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {trip.availableSpots > 0 ? (
                                  <>
                                    {trip.availableSpots} spot{trip.availableSpots !== 1 ? "s" : ""} left
                                  </>
                                ) : (
                                  "Fully Booked"
                                )}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <span className="text-deep-navy/80 font-open-sans">
                                  {trip.hasDiscount ? (
                                    <div className="flex items-center gap-2">
                                      <span className="line-through text-gray-500">€{trip.price.toLocaleString()}</span>
                                      <span className="font-bold text-coral-orange">
                                        €{trip.discountedPrice.toLocaleString()}
                                      </span>
                                      <span className="text-green-600 text-xs font-semibold">
                                        Save €{trip.savings.toLocaleString()}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="font-bold">€{trip.price.toLocaleString()}</span>
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Anchor className="w-4 h-4 text-deep-navy/60" aria-hidden="true" />
                                <span className="text-deep-navy/80 font-open-sans text-xs">
                                  Max {trip.maxCapacity} guests
                                </span>
                              </div>
                            </div>
                          </div>

                          {trip.availableSpots > 0 && (
                            <button
                              onClick={() => {
                                setBookingData((prev) => ({
                                  ...prev,
                                  dates: {
                                    start: trip.startDate,
                                    end: trip.endDate,
                                  },
                                }))
                              }}
                              className="bg-coral-orange text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-coral-orange/90 transition-colors focus:outline-none focus:ring-2 focus:ring-coral-orange focus:ring-offset-2"
                              aria-label={`Select trip from ${formatDateRange(trip.startDate, trip.endDate)}`}
                            >
                              Select
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 p-3 bg-turquoise/10 border border-turquoise/20 rounded-lg">
                  <p className="text-sm text-turquoise font-open-sans">
                    <strong>Tip:</strong> You can select a trip above or use the date picker below to choose your
                    preferred dates.
                  </p>
                </div>
              </div>
            )}

            {/* Date Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-deep-navy mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={bookingData.dates.start}
                  onChange={(e) =>
                    setBookingData((prev) => ({ ...prev, dates: { ...prev.dates, start: e.target.value } }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-deep-navy mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  End Date
                </label>
                <input
                  type="date"
                  value={bookingData.dates.end}
                  onChange={(e) =>
                    setBookingData((prev) => ({ ...prev, dates: { ...prev.dates, end: e.target.value } }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>

            {/* Group Size */}
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Group Size: {bookingData.groupSize} guest{bookingData.groupSize !== 1 ? "s" : ""}
              </label>
              <div className="flex items-center gap-4">
                <div className="bg-coral-orange text-white px-4 py-2 rounded-lg font-semibold min-w-[60px] text-center">
                  1
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={bookingData.groupSize}
                  onChange={(e) => setBookingData((prev) => ({ ...prev, groupSize: Number.parseInt(e.target.value) }))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="bg-coral-orange text-white px-4 py-2 rounded-lg font-semibold min-w-[60px] text-center">
                  {bookingData.groupSize}
                </div>
              </div>

              <div className="mt-2 text-sm">
                {bookingData.groupSize >= 6 && (
                  <div className="text-green-600 font-medium">🎉 15% group discount applied!</div>
                )}
                {bookingData.groupSize >= 4 && bookingData.groupSize < 6 && (
                  <div className="text-turquoise font-medium">💰 10% group discount applied!</div>
                )}
                {bookingData.groupSize < 4 && (
                  <div className="text-gray-600">💡 Book 4+ guests for 10% discount, 6 guests for 15% discount</div>
                )}
              </div>

              <p className="text-xs text-deep-navy/60 mt-1 font-open-sans">
                Each Antigua safari features 3 double cabins for up to 6 guests, with departures every Saturday from
                December 6, 2025 through April 2026.
              </p>
              {errors.groupSize && <p className="text-red-500 text-sm mt-1">{errors.groupSize}</p>}
            </div>

            {/* Yacht Selection */}
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-2">
                <Anchor className="w-4 h-4 inline mr-2" />
                Catamaran Details
              </label>
              <div className="grid md:grid-cols-1 gap-4">
                {yachts.map((yacht) => (
                  <div
                    key={yacht.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      bookingData.yacht === yacht.id
                        ? "border-coral-orange bg-coral-orange/5"
                        : "border-gray-200 hover:border-coral-orange/50"
                    }`}
                    onClick={() => setBookingData((prev) => ({ ...prev, yacht: yacht.id }))}
                  >
                    <h3 className="font-semibold text-deep-navy">{yacht.name}</h3>
                    <p className="text-sm text-deep-navy/70">
                      {yacht.cabins} double cabins • Up to {yacht.capacity} guests
                    </p>
                    <p className="text-sm text-coral-orange font-semibold">Saturday to Saturday departures</p>
                  </div>
                ))}
              </div>
              {errors.yacht && <p className="text-red-500 text-sm mt-1">{errors.yacht}</p>}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (validateStep(1)) setCurrentStep(2)
                }}
                className="bg-coral-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors"
              >
                Continue to Guest Details
                <ChevronRight className="w-4 h-4 inline ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Guest Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-montserrat font-bold text-2xl text-deep-navy mb-2">Guest Information</h2>
                <p className="font-open-sans text-gray-600">
                  Please provide details for all {bookingData.groupSize} guest{bookingData.groupSize !== 1 ? "s" : ""}.
                </p>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-coral-orange hover:text-coral-orange/80 font-semibold"
              >
                <ChevronLeft className="w-4 h-4 inline mr-1" />
                Back
              </button>
            </div>

            <div className="grid gap-6">
              {bookingData.guests.map((guest, index) => (
                <div key={index} className="bg-sand-beige/30 rounded-lg p-6">
                  <h3 className="font-semibold text-deep-navy mb-4">
                    <User className="w-4 h-4 inline mr-2" />
                    Guest {index + 1} {index === 0 && "(Lead Guest)"}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-deep-navy mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={guest.name}
                        onChange={(e) => {
                          const newGuests = [...bookingData.guests]
                          newGuests[index].name = e.target.value
                          setBookingData((prev) => ({ ...prev, guests: newGuests }))
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                        placeholder="Enter full name"
                      />
                      {errors[`guest${index}Name`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`guest${index}Name`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-deep-navy mb-1">Email *</label>
                      <input
                        type="email"
                        value={guest.email}
                        onChange={(e) => {
                          const newGuests = [...bookingData.guests]
                          newGuests[index].email = e.target.value
                          setBookingData((prev) => ({ ...prev, guests: newGuests }))
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                        placeholder="Enter email address"
                      />
                      {errors[`guest${index}Email`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`guest${index}Email`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-deep-navy mb-1">Phone *</label>
                      <input
                        type="tel"
                        value={guest.phone}
                        onChange={(e) => {
                          const newGuests = [...bookingData.guests]
                          newGuests[index].phone = e.target.value
                          setBookingData((prev) => ({ ...prev, guests: newGuests }))
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                      {errors[`guest${index}Phone`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`guest${index}Phone`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-deep-navy mb-1">Dietary Requirements</label>
                      <input
                        type="text"
                        value={guest.dietary}
                        onChange={(e) => {
                          const newGuests = [...bookingData.guests]
                          newGuests[index].dietary = e.target.value
                          setBookingData((prev) => ({ ...prev, guests: newGuests }))
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                        placeholder="Any dietary restrictions or preferences"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 inline mr-2" />
                Back to Trip Details
              </button>
              <button
                onClick={() => {
                  if (validateStep(2)) setCurrentStep(3)
                }}
                className="bg-coral-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors"
              >
                Continue to Payment
                <ChevronRight className="w-4 h-4 inline ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment & Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-montserrat font-bold text-2xl text-deep-navy mb-2">Review & Book</h2>
                <p className="font-open-sans text-gray-600">
                  Review your booking details and complete your reservation.
                </p>
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                className="text-coral-orange hover:text-coral-orange/80 font-semibold"
              >
                <ChevronLeft className="w-4 h-4 inline mr-1" />
                Back
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Booking Summary */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-deep-navy mb-4">Booking Summary</h3>
                  <div className="space-y-3 text-sm font-open-sans">
                    <div className="flex justify-between">
                      <span>Destination:</span>
                      <span className="font-semibold">
                        {destinations.find((d) => d.id === bookingData.destination)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dates:</span>
                      <span className="font-semibold">
                        {bookingData.dates.start} - {bookingData.dates.end}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span className="font-semibold">{bookingData.groupSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yacht:</span>
                      <span className="font-semibold">{yachts.find((y) => y.id === bookingData.yacht)?.name}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-deep-navy mb-4">Pricing Breakdown</h3>
                  <div className="space-y-2 text-sm font-open-sans">
                    {bookingData.pricing.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.item}</span>
                        <span className={item.amount < 0 ? "text-green-600" : ""}>
                          {item.amount < 0 ? "-" : ""}€{Math.abs(item.amount).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span className="text-coral-orange">€{bookingData.pricing.total.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-deep-navy/60 mt-1">
                        €{Math.round(bookingData.pricing.total / bookingData.groupSize).toLocaleString()} per person
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-turquoise/10 border border-turquoise/20 rounded-lg p-4">
                  <h4 className="font-semibold text-turquoise mb-2">Flexible Payment Plan Available</h4>
                  <p className="text-sm text-gray-600">
                    Pay just 30% now to secure your booking, with the remaining balance due 60 days before departure.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Payment Method */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-deep-navy mb-4">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Payment Method
                  </h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4 bg-coral-orange/5 border-coral-orange">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input type="radio" name="payment" defaultChecked className="mr-3" />
                          <div>
                            <div className="font-semibold">Credit/Debit Card</div>
                            <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-turquoise" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-orange focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-deep-navy mb-4">Terms & Conditions</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <label className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span>
                        I agree to the{" "}
                        <a href="#" className="text-coral-orange hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-coral-orange hover:underline">
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    <label className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span>
                        I understand the{" "}
                        <a href="#" className="text-coral-orange hover:underline">
                          cancellation policy
                        </a>{" "}
                        and booking conditions
                      </span>
                    </label>
                    <label className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" />
                      <span>I'd like to receive updates about future kiteboarding safaris and special offers</span>
                    </label>
                  </div>
                </div>

                {errors.booking && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                      <span className="text-red-600 font-semibold">Booking Error</span>
                    </div>
                    <p className="text-red-600 text-sm mt-1">{errors.booking}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-coral-orange text-white py-4 rounded-lg font-semibold text-lg hover:bg-coral-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Booking...
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 inline mr-2" />
                      Complete Booking - €{bookingData.pricing.total.toLocaleString()}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-1" />
                  Secure payment powered by Stripe
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

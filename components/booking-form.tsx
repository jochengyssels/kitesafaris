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
  Loader2,
  Star,
  Clock,
  Users as UsersIcon,
  Wind,
} from "lucide-react"
import { tripDataService, calculateDiscountedPrice, calculateSavings, hasDiscount } from "@/lib/trip-data-service"
import { BookingSummarySticky } from "@/components/booking-summary-sticky"

interface Destination {
  id: string
  name: string
  location: string
  headline: string
  description: string
  image: string
  icon: string
  available: boolean
  basePrice: number
  currency: string
  windRating: number
  difficulty: string
  season: string
  windSpeed: string
  culture: string
  highlights: string[]
  coordinates: {
    lat: number
    lng: number
  }
  intro: string
  tripHighlights: string[]
  itinerary: Array<{
    day: number
    title: string
    description: string
    activities: string[]
  }>
  gallery: string[]
}

interface BookingData {
  selectedTripId: string | null
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

// Fallback destinations in case API fails
const fallbackDestinations: Destination[] = [
  {
    id: "caribbean",
    name: "Caribbean",
    location: "Caribbean Sea",
    headline: "Trade Wind Paradise",
    description: "Experience consistent trade winds and crystal-clear turquoise waters in the heart of the Caribbean.",
    image: "/antigua-caribbean-sunset-kiteboarding.png",
    icon: "Anchor",
    available: true,
    basePrice: 2700,
    currency: "EUR",
    windRating: 5,
    difficulty: "All Levels",
    season: "Dec - Apr",
    windSpeed: "15-25 knots",
    culture: "Caribbean island culture",
    highlights: ["Consistent winds", "Crystal clear waters", "Luxury catamaran"],
    coordinates: { lat: 17.0608, lng: -61.7964 },
    intro: "Welcome to the Caribbean kiteboarding paradise.",
    tripHighlights: ["7-day luxury catamaran experience", "Professional kiteboarding instruction", "Island exploration"],
    itinerary: [],
    gallery: []
  },
  {
    id: "antigua",
    name: "Antigua & Barbuda",
    location: "Antigua & Barbuda",
    headline: "Trade Wind Paradise",
    description: "Experience consistent 15-25 knot trade winds, crystal-clear turquoise waters, and luxury catamaran living.",
    image: "/antigua-aerial-harbor-view.jpg",
    icon: "Anchor",
    available: true,
    basePrice: 2700,
    currency: "EUR",
    windRating: 5,
    difficulty: "All Levels",
    season: "Dec - Apr",
    windSpeed: "15-25 knots",
    culture: "Caribbean island culture",
    highlights: ["Consistent winds", "Crystal clear waters", "Luxury catamaran"],
    coordinates: { lat: 17.0608, lng: -61.7964 },
    intro: "Welcome to Antigua & Barbuda kiteboarding paradise.",
    tripHighlights: ["7-day luxury catamaran experience", "Professional kiteboarding instruction", "Island exploration"],
    itinerary: [],
    gallery: []
  },
  {
    id: "greece",
    name: "Greece (Coming Soon)",
    location: "Aegean Islands",
    headline: "Meltemi Wind Magic",
    description: "Sail through ancient waters with powerful Meltemi winds and explore hidden coves.",
    image: "/greek-aegean-islands-kiteboarding-destination.png",
    icon: "MapPin",
    available: false,
    basePrice: 0,
    currency: "EUR",
    windRating: 4,
    difficulty: "Intermediate+",
    season: "Jun - Sep",
    windSpeed: "20-35 knots",
    culture: "Ancient Greek culture",
    highlights: ["Powerful winds", "Ancient history", "Hidden coves"],
    coordinates: { lat: 37.9838, lng: 23.7275 },
    intro: "Greece kiteboarding adventures coming soon.",
    tripHighlights: [],
    itinerary: [],
    gallery: []
  },
  {
    id: "sardinia",
    name: "Sardinia (Coming Soon)",
    location: "Mediterranean Coast",
    headline: "Mistral Wind Adventure",
    description: "Ride the legendary Mistral winds along pristine Mediterranean coastlines.",
    image: "/sardinia-punta-trettu-kiteboarding-mediterranean-c.png",
    icon: "Waves",
    available: false,
    basePrice: 0,
    currency: "EUR",
    windRating: 4,
    difficulty: "Intermediate+",
    season: "Apr - Oct",
    windSpeed: "18-30 knots",
    culture: "Mediterranean culture",
    highlights: ["Legendary winds", "Dramatic landscapes", "Mediterranean charm"],
    coordinates: { lat: 40.1209, lng: 9.0129 },
    intro: "Sardinia kiteboarding adventures coming soon.",
    tripHighlights: [],
    itinerary: [],
    gallery: []
  }
]

const yachts = [{ id: "catamaran", name: "Luxury Catamaran", multiplier: 1.0, capacity: 6, cabins: 3 }]

const normalizeDestinationId = (destinationId: string, destinationName?: string): string => {
  // If we have a destination name, use that for mapping
  if (destinationName) {
    const normalizedName = destinationName.toLowerCase()
    
    // Map destination names to match what the trips API returns
    if (normalizedName.includes('antigua') || normalizedName.includes('caribbean')) {
      return "antigua" // Trips API uses "antigua" (lowercase)
    }
    if (normalizedName.includes('greece') || normalizedName.includes('greek')) {
      return "greece" // Trips API would use "greece"
    }
    if (normalizedName.includes('sardinia')) {
      return "sardinia" // Trips API would use "sardinia"
    }
  }
  
  // Handle Airtable record IDs by mapping them to expected destination names
  let normalizedId = destinationId.toLowerCase()
  
  // If it's an Airtable record ID, we need to map it based on the destination name
  if (destinationId.startsWith('rec')) {
    // This is an Airtable record ID, we'll need to map it based on the destination name
    // For now, let's assume all destinations map to "antigua" since that's where our trips are
    return "antigua"
  }
  
  // Handle known destination mappings
  if (normalizedId === "antigua" || normalizedId === "caribbean" || normalizedId === "antigua & barbuda") {
    return "antigua"
  }
  if (normalizedId === "greece" || normalizedId === "greek islands") {
    return "greece"
  }
  if (normalizedId === "sardinia") {
    return "sardinia"
  }
  
  // Default fallback
  return "antigua"
}

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card')
  const [availableTrips, setAvailableTrips] = useState<Record<string, any[]>>({})
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [destinationsLoading, setDestinationsLoading] = useState(true)
  const [destinationsError, setDestinationsError] = useState<string | null>(null)
  const [tripsLoading, setTripsLoading] = useState(false)

  const [bookingData, setBookingData] = useState<BookingData>({
    selectedTripId: null,
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

  // Load destinations from API on component mount
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setDestinationsLoading(true)
        setDestinationsError(null)
        
        console.log("[v0] Loading destinations from API...")
        const response = await fetch("/api/destinations")
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log("[v0] Destinations API response:", data)
        
        if (data.destinations && Array.isArray(data.destinations)) {
          console.log("[v0] Setting destinations:", data.destinations.length, data.destinations)
          setDestinations(data.destinations)
        } else {
          console.error("[v0] Invalid destinations data structure:", data)
          setDestinations(fallbackDestinations)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch destinations:", error)
        setDestinationsError("Failed to load destinations. Using fallback data.")
        setDestinations(fallbackDestinations)
      } finally {
        setDestinationsLoading(false)
      }
    }

    loadDestinations()
  }, [])

  // Load available trips on component mount
  useEffect(() => {
    const loadTrips = async () => {
      if (destinations.length === 0) return
      
      setTripsLoading(true)
      
      try {
        // Initialize trip data service from API first
        await tripDataService.initialize()
        
        console.log("[v0] Loading trips for destinations:", destinations.map((d: any) => ({ id: d.id, name: d.name })))
        const trips = tripDataService.getAllTrips()
        console.log("[v0] All available trips:", trips)
        
        const tripsByDestination: Record<string, any[]> = {}

        destinations.forEach((dest: any) => {
          // Try multiple mapping strategies
          let destTrips: any[] = []
          
          // Strategy 1: Try normalized ID mapping
          const normalizedDestId = normalizeDestinationId(dest.id, dest.name)
          console.log("[v0] Mapping destination", dest.id, "to normalized ID:", normalizedDestId)
          
          destTrips = trips
            .filter((trip: any) => {
              console.log("[v0] Checking trip", trip.id, "destination:", trip.destination, "against normalized:", normalizedDestId)
              return trip.destination === normalizedDestId
            })
            .map((trip: any) => ({
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

          // Strategy 2: If no trips found, try mapping by destination name
          if (destTrips.length === 0) {
            const normalizedName = dest.name.toLowerCase()
            console.log("[v0] No trips found by ID, trying name mapping:", normalizedName)
            
            if (normalizedName.includes('antigua') || normalizedName.includes('caribbean')) {
              destTrips = trips
                .filter((trip: any) => trip.destination === "antigua")
                .map((trip: any) => ({
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
            }
          }

          // Strategy 3: If still no trips, show empty array (no fallback to all trips)
          if (destTrips.length === 0) {
            console.log("[v0] No specific trips found for destination", dest.name, "- showing empty array")
            destTrips = []
          }

          console.log("[v0] Found", destTrips.length, "trips for destination", dest.id, "(", dest.name, ")")
          tripsByDestination[dest.name] = destTrips
        })

        console.log("[v0] Final tripsByDestination:", tripsByDestination)
        setAvailableTrips(tripsByDestination)
      } catch (error) {
        console.error("[v0] Error loading trips:", error)
      } finally {
        setTripsLoading(false)
      }
    }

    if (destinations.length > 0) {
      loadTrips()
    }

    // Subscribe to trip updates
    const unsubscribe = tripDataService.onTripsUpdate(() => {
      if (destinations.length > 0) {
        loadTrips()
      }
    })

    return unsubscribe
  }, [destinations])

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
  }, [bookingData.selectedTripId, bookingData.groupSize])

  // Calculate pricing based on current selections
  const calculatePricing = () => {
    console.log("[v0] calculatePricing called with:", {
      destination: bookingData.destination,
      yacht: bookingData.yacht,
      selectedTripId: bookingData.selectedTripId,
      groupSize: bookingData.groupSize
    })

    if (!bookingData.destination || !bookingData.yacht) {
      console.log("[v0] Missing destination or yacht, returning")
      return
    }

    const destination = destinations.find((d) => d.name === bookingData.destination)
    const yacht = yachts.find((y) => y.id === bookingData.yacht)

    if (!destination || !yacht) {
      console.log("[v0] Destination or yacht not found:", { destination, yacht })
      return
    }

    // Use trip-specific pricing if available, otherwise use destination base pricing
    let basePrice = destination.basePrice * yacht.multiplier
    let tripDiscount = 0
    let tripDiscountAmount = 0
    let nights = 7 // Default to 7 nights if no specific trip selected

    if (bookingData.selectedTripId) {
      const selectedTrip = tripDataService.getTripById(bookingData.selectedTripId)
      if (selectedTrip) {
        // Trip price is the total price for the entire trip, not per night
        basePrice = selectedTrip.price
        if (selectedTrip.discountPercentage && selectedTrip.discountPercentage > 0) {
          tripDiscount = selectedTrip.discountPercentage / 100
          tripDiscountAmount = basePrice * tripDiscount
        }
        
        const startDate = new Date(selectedTrip.startDate)
        const endDate = new Date(selectedTrip.endDate)
        nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      }
    }

    // Calculate pricing for the entire trip (not per night)
    const totalTripPrice = basePrice // This is the total price for the entire trip
    const perPerson = totalTripPrice / bookingData.groupSize // Price per person for the entire trip
    const perNight = totalTripPrice / nights // Average per night (for display purposes only)
    let total = totalTripPrice

    // Apply trip-specific discount first
    if (tripDiscountAmount > 0) {
      total = total - tripDiscountAmount
    }

    // Group discounts (applied after trip discount)
    let groupDiscount = 0
    if (bookingData.groupSize >= 6) groupDiscount = 0.15
    else if (bookingData.groupSize >= 4) groupDiscount = 0.1

    const groupDiscountAmount = total * groupDiscount
    const finalTotal = total - groupDiscountAmount

    const breakdown = [
      { item: `${destination.name} Trip (${nights} nights)`, amount: totalTripPrice },
      ...(tripDiscountAmount > 0
        ? [{ item: `Trip discount (${Math.round(tripDiscount * 100)}%)`, amount: -tripDiscountAmount }]
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

    if (step === 3) {
      if (!bookingData.selectedTripId) newErrors.trip = "Please select a trip"
      if (bookingData.pricing.total <= 0) newErrors.pricing = "Invalid pricing calculation"
      if (!paymentMethod) newErrors.payment = "Please select a payment method"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1) calculatePricing()
      setCurrentStep((prev) => Math.min(prev + 1, 4))
      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsSubmitting(true)

    try {
      // Validate that a trip is selected
      if (!bookingData.selectedTripId) {
        setErrors({ booking: "Please select a trip before proceeding" })
        setIsSubmitting(false)
        return
      }

      // Capture lead (if email provided)
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

      // Prepare booking payload for new API
      const bookingPayload = {
        tripId: bookingData.selectedTripId,
        groupSize: bookingData.groupSize,
        destination: bookingData.destination,
        yacht: bookingData.yacht,
        guests: bookingData.guests,
        pricing: bookingData.pricing,
        paymentMethod: paymentMethod
      }

      console.log("[v0] Submitting booking:", bookingPayload)

      // Submit booking to new API endpoint
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit booking')
      }

      if (!result.success) {
        throw new Error(result.message || 'Booking submission failed')
      }

      console.log("[v0] Booking submitted successfully:", result)

      // Show success state
      setIsSubmitting(false)
      setIsConfirmed(true)
      setCurrentStep(4)
    } catch (error) {
      console.error("[v0] Booking error:", error)
      setErrors({ booking: error instanceof Error ? error.message : "An error occurred while processing your booking" })
      setIsSubmitting(false)
    }
  }

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100'
      case 'low': return 'text-orange-600 bg-orange-100'
      case 'full': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available'
      case 'low': return 'Limited'
      case 'full': return 'Full'
      default: return 'Unknown'
    }
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
              <span className="font-semibold">{destinations.find((d) => d.name === bookingData.destination)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Guests:</span>
              <span className="font-semibold">{bookingData.groupSize}</span>
            </div>
            <div className="flex justify-between">
              <span>Dates:</span>
              <span>
                {bookingData.selectedTripId ? (() => {
                  const trip = tripDataService.getTripById(bookingData.selectedTripId);
                  return trip ? formatDateRange(trip.startDate, trip.endDate) : "N/A";
                })() : "N/A"}
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
      {/* Sticky Booking Summary for Mobile */}
      <BookingSummarySticky
        destination={bookingData.destination}
        selectedTripId={bookingData.selectedTripId}
        groupSize={bookingData.groupSize}
        pricing={bookingData.pricing}
        tripDataService={tripDataService}
        isVisible={currentStep === 1 && bookingData.destination !== ""}
      />
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
          <div className="space-y-8">
            <div>
              <h2 className="font-montserrat font-bold text-2xl text-deep-navy mb-2">Plan Your Safari</h2>
              <p className="font-open-sans text-gray-600">
                Choose your destination, dates, and group size for the ultimate kiteboarding adventure.
              </p>
            </div>

            {/* Destination Selection Cards */}
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-4">
                <MapPin className="w-4 h-4 inline mr-2" />
                Select Your Destination
              </label>
              
              {destinationsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-coral-orange mr-2" />
                  <span className="text-gray-600">Loading destinations...</span>
                </div>
              ) : destinationsError ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2 inline" />
                  <span className="text-red-600">Error loading destinations</span>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destinations.map((dest) => (
                    <div
                      key={dest.id}
                      className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        bookingData.destination === dest.name
                          ? "border-coral-orange bg-coral-orange/5 shadow-lg"
                          : "border-gray-200 hover:border-coral-orange/50"
                      } ${dest.basePrice === 0 ? "opacity-60 cursor-not-allowed" : ""}`}
                      onClick={() => {
                        if (dest.basePrice > 0) {
                          setBookingData((prev) => ({ ...prev, destination: dest.name, selectedTripId: null }))
                        }
                      }}
                    >
                      {dest.basePrice === 0 && (
                        <div className="absolute top-3 right-3 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                          Coming Soon
                        </div>
                      )}
                      
                                             <div className="h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                         <img 
                           src={dest.image} 
                           alt={dest.name}
                           className="w-full h-full object-cover"
                           onError={(e) => {
                             e.currentTarget.src = "/antigua-aerial-harbor-view.jpg"
                           }}
                         />
                       </div>
                      
                      <h3 className="font-semibold text-deep-navy text-lg mb-2">{dest.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dest.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Wind className="w-4 h-4 mr-1" />
                          {dest.windSpeed}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {dest.season}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-coral-orange font-bold text-lg">
                          {dest.basePrice > 0 ? `From €${dest.basePrice.toLocaleString()}` : "Coming Soon"}
                        </div>
                        {bookingData.destination === dest.name && (
                          <Check className="w-5 h-5 text-coral-orange" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {errors.destination && <p className="text-red-500 text-sm mt-2">{errors.destination}</p>}
            </div>

            {/* Trip Selection Cards */}
            {bookingData.destination && (
              <>
                {tripsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-orange mx-auto mb-4"></div>
                      <p className="text-gray-600 font-open-sans">Loading available trips...</p>
                    </div>
                  </div>
                ) : availableTrips[bookingData.destination]?.length > 0 ? (
              <div>
                <label className="block text-sm font-semibold text-deep-navy mb-4">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Choose Your Trip Dates
                </label>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableTrips[bookingData.destination]
                    .filter((trip: any) => {
                      // Smart filtering: only show future trips with availability
                      const startDate = new Date(trip.startDate)
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return startDate >= today && trip.availableSpots > 0
                    })
                    .map((trip: any) => {
                      const startDate = new Date(trip.startDate)
                      const endDate = new Date(trip.endDate)
                      const today = new Date()
                      const daysUntilDeparture = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                      const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
                      const priceDisplay = trip.hasDiscount ? `€${trip.discountedPrice.toLocaleString()}` : `€${trip.price.toLocaleString()}`
                      const originalPrice = trip.hasDiscount ? `€${trip.price.toLocaleString()}` : null
                      
                      // Enhanced visual indicators
                      const isAlmostFull = trip.availableSpots < 3 && trip.availableSpots > 0
                      const isEarlyBird = daysUntilDeparture > 90
                      const isLastChance = daysUntilDeparture <= 30 && daysUntilDeparture > 0
                      const isExceedingCapacity = bookingData.groupSize > trip.availableSpots
                      
                      return (
                        <div
                          key={trip.id}
                          className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            bookingData.selectedTripId === trip.id
                              ? "border-coral-orange bg-coral-orange/5 shadow-lg"
                              : "border-gray-200 hover:border-coral-orange/50"
                          } ${isExceedingCapacity ? "opacity-60 cursor-not-allowed" : ""}`}
                          onClick={() => {
                            if (!isExceedingCapacity) {
                              console.log("[v0] Trip selected:", trip.id, trip)
                              setBookingData((prev) => ({ ...prev, selectedTripId: trip.id }))
                              // Recalculate pricing when trip is selected
                              setTimeout(() => calculatePricing(), 0)
                            }
                          }}
                        >
                          {/* Radio button indicator */}
                          <div className="absolute top-3 left-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              bookingData.selectedTripId === trip.id 
                                ? "border-coral-orange bg-coral-orange" 
                                : "border-gray-300"
                            }`}>
                              {bookingData.selectedTripId === trip.id && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                              )}
                            </div>
                          </div>
                          
                          {/* Status badges */}
                          <div className="absolute top-2 right-2 flex flex-col gap-1">
                            {isAlmostFull && (
                              <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                Almost Full
                              </div>
                            )}
                            {isEarlyBird && (
                              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                Early Bird
                              </div>
                            )}
                            {isLastChance && (
                              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                Last Chance
                              </div>
                            )}
                          </div>
                          
                          {/* Trip dates with calendar preview */}
                          <div className="mt-6 mb-3">
                            <div className="text-sm font-semibold text-deep-navy mb-2">
                              {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            
                            {/* Mini calendar preview */}
                            <div className="bg-gray-50 rounded-lg p-2 mb-3">
                              <div className="text-xs text-gray-600 mb-1">
                                {startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                              </div>
                              <div className="grid grid-cols-7 gap-1 text-xs">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                                  <div key={`${day}-${index}`} className="text-center text-gray-400 font-semibold">{day}</div>
                                ))}
                                {Array.from({ length: startDate.getDay() }, (_, i) => (
                                  <div key={`empty-${i}`} className="h-4"></div>
                                ))}
                                {Array.from({ length: nights }, (_, i) => {
                                  const date = new Date(startDate)
                                  date.setDate(startDate.getDate() + i)
                                  return (
                                    <div key={i} className={`h-4 rounded text-center text-xs font-semibold ${
                                      i === 0 || i === nights - 1 
                                        ? "bg-coral-orange text-white" 
                                        : "bg-coral-orange/20 text-coral-orange"
                                    }`}>
                                      {date.getDate()}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                          
                          {/* Trip details */}
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center text-gray-600">
                                <Clock className="w-4 h-4 mr-1" />
                                {nights} days
                              </div>
                              <div className="flex items-center text-gray-600">
                                <UsersIcon className="w-4 h-4 mr-1" />
                                {trip.availableSpots} spots left
                              </div>
                            </div>
                            
                            {/* Days until departure */}
                            <div className="text-xs text-gray-500">
                              {daysUntilDeparture > 0 
                                ? `${daysUntilDeparture} days until departure`
                                : "Departing today"
                              }
                            </div>
                            
                            {/* Capacity warning */}
                            {isExceedingCapacity && (
                              <div className="text-xs text-red-600 font-semibold">
                                ⚠️ Only {trip.availableSpots} spots available for {bookingData.groupSize} guests
                              </div>
                            )}
                          </div>
                          
                          {/* Pricing */}
                          <div className="text-center border-t pt-3">
                            {trip.hasDiscount && (
                              <div className="text-sm text-gray-500 line-through mb-1">{originalPrice}</div>
                            )}
                            <div className="text-coral-orange font-bold text-lg">{priceDisplay}</div>
                            {trip.hasDiscount && (
                              <div className="text-green-600 text-sm font-semibold">{trip.discountPercentage}% off</div>
                            )}
                            <div className="text-xs text-gray-500 mt-1">
                              €{Math.round((trip.hasDiscount ? trip.discountedPrice : trip.price) / bookingData.groupSize).toLocaleString()} per person
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
                
                <div className="mt-4 p-3 bg-turquoise/10 border border-turquoise/20 rounded-lg">
                  <p className="text-sm text-turquoise font-open-sans">
                    <strong>Smart Filtering:</strong> Only showing future trips with availability. Select a specific trip for exact pricing and guaranteed spots.
                  </p>
                </div>
              </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 rounded-lg p-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-semibold text-deep-navy mb-2">No Trips Available</h3>
                      <p className="text-gray-600 mb-4">
                        No trips are currently available for {bookingData.destination}. 
                        Check back soon or contact us for custom arrangements.
                      </p>
                      <div className="space-y-3">
                        <button className="bg-coral-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors">
                          Join Waitlist
                        </button>
                        <div className="text-sm text-gray-500">
                          Get notified when new trips become available
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

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
                  if (validateStep(1)) {
                    setCurrentStep(2)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
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
                onClick={() => {
                  setCurrentStep(1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
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
                onClick={() => {
                  setCurrentStep(1)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 inline mr-2" />
                Back to Trip Details
              </button>
              <button
                onClick={() => {
                  if (validateStep(2)) {
                    setCurrentStep(3)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
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
                onClick={() => {
                  setCurrentStep(2)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
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
                        {destinations.find((d) => d.name === bookingData.destination)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dates:</span>
                      <span className="font-semibold">
                        {bookingData.selectedTripId ? (() => {
                          const trip = tripDataService.getTripById(bookingData.selectedTripId);
                          return trip ? formatDateRange(trip.startDate, trip.endDate) : "N/A";
                        })() : "N/A"}
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
                    {/* Credit/Debit Card Option */}
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'card' 
                          ? 'border-coral-orange bg-coral-orange/5' 
                          : 'border-gray-200 hover:border-coral-orange/50'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="mr-3" 
                          />
                          <div>
                            <div className="font-semibold">Credit/Debit Card</div>
                            <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
                          </div>
                        </div>
                        <Shield className="w-5 h-5 text-turquoise" />
                      </div>
                    </div>

                    {/* PayPal Option */}
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'paypal' 
                          ? 'border-coral-orange bg-coral-orange/5' 
                          : 'border-gray-200 hover:border-coral-orange/50'
                      }`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={paymentMethod === 'paypal'}
                            onChange={() => setPaymentMethod('paypal')}
                            className="mr-3" 
                          />
                          <div>
                            <div className="font-semibold">PayPal</div>
                            <div className="text-sm text-gray-600">Pay with PayPal account or card</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold mr-2">
                            PayPal
                          </div>
                          <Shield className="w-5 h-5 text-turquoise" />
                        </div>
                      </div>
                    </div>

                    {/* Payment Form Fields - Only show for card payment */}
                    {paymentMethod === 'card' && (
                      <>
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
                      </>
                    )}

                    {/* PayPal Info - Only show for PayPal payment */}
                    {paymentMethod === 'paypal' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold mr-2">
                            PayPal
                          </div>
                          <span className="text-sm font-semibold text-blue-800">Secure Payment</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          You'll be redirected to PayPal to complete your payment securely. 
                          No card details will be stored on our servers.
                        </p>
                      </div>
                    )}
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
                      {paymentMethod === 'paypal' ? 'Continue to PayPal' : 'Complete Booking'} - €{bookingData.pricing.total.toLocaleString()}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-1" />
                  Secure payment powered by {paymentMethod === 'paypal' ? 'PayPal' : 'Stripe'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

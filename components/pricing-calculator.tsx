"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Users, Anchor } from "lucide-react"

interface PricingData {
  destination: string
  groupSize: number
  yachtType: string
  startDate: string
  endDate: string
}

const destinations = [
  { value: "antigua", label: "Antigua & Barbuda", basePrice: 1900 },
  { value: "greece", label: "Greece (Coming Soon)", basePrice: 0 },
  { value: "sardinia", label: "Sardinia (Coming Soon)", basePrice: 0 },
]

const yachtTypes = [{ value: "luxury-catamaran", label: "Luxury Catamaran", multiplier: 1.0 }]

export function PricingCalculator() {
  const [formData, setFormData] = useState<PricingData>({
    destination: "",
    groupSize: 4,
    yachtType: "",
    startDate: "",
    endDate: "",
  })

  const [pricing, setPricing] = useState({
    perPerson: 0,
    perNight: 0,
    total: 0,
    nights: 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    calculatePricing()
  }, [formData])

  const calculatePricing = () => {
    if (!formData.destination || !formData.yachtType || !formData.startDate || !formData.endDate) {
      setPricing({ perPerson: 0, perNight: 0, total: 0, nights: 0 })
      return
    }

    const destination = destinations.find((d) => d.value === formData.destination)
    const yacht = yachtTypes.find((y) => y.value === formData.yachtType)

    if (!destination || !yacht || destination.basePrice === 0) {
      setPricing({ perPerson: 0, perNight: 0, total: 0, nights: 0 })
      return
    }

    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    if (nights <= 0) return

    const perPerson = destination.basePrice
    const total = perPerson * Math.min(formData.groupSize, 6) // Max 6 people
    const perNight = Math.round(perPerson / 7) // 7-day packages

    setPricing({
      perPerson: Math.round(perPerson),
      perNight: Math.round(perNight),
      total: Math.round(total),
      nights: 7, // Fixed 7-day packages
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.destination) newErrors.destination = "Please select a destination"
    if (!formData.yachtType) newErrors.yachtType = "Please select a yacht type"
    if (!formData.startDate) newErrors.startDate = "Please select a start date"
    if (!formData.endDate) newErrors.endDate = "Please select an end date"

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      if (end <= start) newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle quote request
      console.log("Quote requested:", formData, pricing)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="bg-sand-beige rounded-2xl p-6 md:p-8 shadow-lg">
      <div className="bg-deep-navy text-white p-4 rounded-xl mb-6">
        <h3 className="font-montserrat font-bold text-xl md:text-2xl text-center">Pricing Calculator</h3>
        <p className="font-open-sans text-center mt-2 opacity-90">
          Get an instant estimate for your 7-day kite safari adventure
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Selection */}
        <div>
          <label
            htmlFor="destination"
            className="flex items-center gap-2 font-montserrat font-semibold text-deep-navy mb-2"
          >
            <MapPin className="w-5 h-5" />
            Destination
          </label>
          <select
            id="destination"
            value={formData.destination}
            onChange={(e) => setFormData((prev) => ({ ...prev, destination: e.target.value }))}
            className={`w-full p-3 border-2 rounded-lg font-open-sans focus:outline-none focus:ring-2 focus:ring-turquoise ${
              errors.destination ? "border-red-500" : "border-gray-300 focus:border-turquoise"
            }`}
            aria-describedby={errors.destination ? "destination-error" : undefined}
          >
            <option value="">Select a destination</option>
            {destinations.map((dest) => (
              <option key={dest.value} value={dest.value}>
                {dest.label}
              </option>
            ))}
          </select>
          {errors.destination && (
            <p id="destination-error" className="text-red-500 text-sm mt-1 font-open-sans">
              {errors.destination}
            </p>
          )}
        </div>

        {/* Date Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="flex items-center gap-2 font-montserrat font-semibold text-deep-navy mb-2"
            >
              <Calendar className="w-5 h-5" />
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full p-3 border-2 rounded-lg font-open-sans focus:outline-none focus:ring-2 focus:ring-turquoise ${
                errors.startDate ? "border-red-500" : "border-gray-300 focus:border-turquoise"
              }`}
              aria-describedby={errors.startDate ? "start-date-error" : undefined}
            />
            {errors.startDate && (
              <p id="start-date-error" className="text-red-500 text-sm mt-1 font-open-sans">
                {errors.startDate}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="flex items-center gap-2 font-montserrat font-semibold text-deep-navy mb-2"
            >
              <Calendar className="w-5 h-5" />
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
              min={formData.startDate || new Date().toISOString().split("T")[0]}
              className={`w-full p-3 border-2 rounded-lg font-open-sans focus:outline-none focus:ring-2 focus:ring-turquoise ${
                errors.endDate ? "border-red-500" : "border-gray-300 focus:border-turquoise"
              }`}
              aria-describedby={errors.endDate ? "end-date-error" : undefined}
            />
            {errors.endDate && (
              <p id="end-date-error" className="text-red-500 text-sm mt-1 font-open-sans">
                {errors.endDate}
              </p>
            )}
          </div>
        </div>

        {/* Group Size Slider */}
        <div>
          <label
            htmlFor="groupSize"
            className="flex items-center gap-2 font-montserrat font-semibold text-deep-navy mb-2"
          >
            <Users className="w-5 h-5" />
            Group Size: {formData.groupSize} {formData.groupSize === 1 ? "person" : "people"} (Max 6)
          </label>
          <div className="px-2">
            <input
              type="range"
              id="groupSize"
              min="1"
              max="6"
              value={Math.min(formData.groupSize, 6)}
              onChange={(e) => setFormData((prev) => ({ ...prev, groupSize: Number.parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #20B2AA 0%, #20B2AA ${((Math.min(formData.groupSize, 6) - 1) / 5) * 100}%, #e5e7eb ${((Math.min(formData.groupSize, 6) - 1) / 5) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between text-sm font-open-sans text-gray-600 mt-1">
              <span>1</span>
              <span>3</span>
              <span>6</span>
            </div>
          </div>
          <p className="text-turquoise text-sm mt-2 font-open-sans">
            Limited to 6 spots maximum for personalized attention and safety
          </p>
        </div>

        {/* Yacht Selection */}
        <div>
          <label
            htmlFor="yachtType"
            className="flex items-center gap-2 font-montserrat font-semibold text-deep-navy mb-2"
          >
            <Anchor className="w-5 h-5" />
            Yacht Type
          </label>
          <select
            id="yachtType"
            value={formData.yachtType}
            onChange={(e) => setFormData((prev) => ({ ...prev, yachtType: e.target.value }))}
            className={`w-full p-3 border-2 rounded-lg font-open-sans focus:outline-none focus:ring-2 focus:ring-turquoise ${
              errors.yachtType ? "border-red-500" : "border-gray-300 focus:border-turquoise"
            }`}
            aria-describedby={errors.yachtType ? "yacht-error" : undefined}
          >
            <option value="">Select yacht type</option>
            {yachtTypes.map((yacht) => (
              <option key={yacht.value} value={yacht.value}>
                {yacht.label}
              </option>
            ))}
          </select>
          {errors.yachtType && (
            <p id="yacht-error" className="text-red-500 text-sm mt-1 font-open-sans">
              {errors.yachtType}
            </p>
          )}
        </div>

        {/* Pricing Display */}
        {pricing.total > 0 && (
          <div className="bg-white rounded-xl p-6 border-2 border-turquoise">
            <h4 className="font-montserrat font-bold text-deep-navy text-lg mb-4">Estimated Pricing</h4>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="font-open-sans text-gray-600 text-sm">Per Person</p>
                <p className="font-montserrat font-bold text-xl text-deep-navy">
                  €{pricing.perPerson.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="font-open-sans text-gray-600 text-sm">Per Night</p>
                <p className="font-montserrat font-bold text-xl text-deep-navy">€{pricing.perNight.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="font-open-sans text-gray-600 text-sm">Total (7 days)</p>
                <p className="font-montserrat font-bold text-2xl text-turquoise">€{pricing.total.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-center text-sm font-open-sans text-gray-600">
              <p>7-day luxury catamaran kitesafari • Limited to 6 spots</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-coral-orange hover:bg-coral-orange/90 text-white font-montserrat font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-coral-orange/30"
          disabled={pricing.total === 0}
        >
          Get Detailed Quote
        </button>
      </form>

      <p className="text-center text-sm font-open-sans text-gray-600 mt-4">
        * Prices shown for Antigua kitesafari. Greece and Sardinia coming soon - contact us for details.
      </p>
    </div>
  )
}

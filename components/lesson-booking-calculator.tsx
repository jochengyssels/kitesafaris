"use client"

import { useState } from "react"
import Link from "next/link"

interface LessonOption {
  id: string
  name: string
  price: number
  description: string
  duration: string
}

interface Destination {
  id: string
  name: string
  multiplier: number
  description: string
}

const lessonTypes: LessonOption[] = [
  {
    id: "discovery",
    name: "Discovery Lesson",
    price: 120,
    description: "2-hour minimum private instruction",
    duration: "2 hours"
  },
  {
    id: "beginner-package",
    name: "Beginner Package",
    price: 490,
    description: "6 hours + 3 days equipment rental",
    duration: "6 hours"
  },
  {
    id: "complete-course",
    name: "Complete Course",
    price: 790,
    description: "9 hours + accommodation + meals",
    duration: "9 hours"
  },
  {
    id: "private-coaching",
    name: "Private Coaching",
    price: 150,
    description: "Per hour with video analysis",
    duration: "1 hour"
  }
]

const destinations: Destination[] = [
  {
    id: "antigua",
    name: "Antigua & Barbuda",
    multiplier: 1.2,
    description: "Premium Caribbean destination with consistent trade winds"
  },
  {
    id: "sardinia",
    name: "Sardinia (Punta Trettu)",
    multiplier: 1.0,
    description: "Year-round flat water conditions"
  },
  {
    id: "greece",
    name: "Greece (Aegean Islands)",
    multiplier: 1.1,
    description: "Summer Meltemi winds and cultural experiences"
  }
]

export default function LessonBookingCalculator() {
  const [selectedLesson, setSelectedLesson] = useState<LessonOption>(lessonTypes[0])
  const [selectedDestination, setSelectedDestination] = useState<Destination>(destinations[1])
  const [hours, setHours] = useState(1)

  const calculatePrice = () => {
    const basePrice = selectedLesson.id === "private-coaching" 
      ? selectedLesson.price * hours 
      : selectedLesson.price
    return Math.round(basePrice * selectedDestination.multiplier)
  }

  const totalPrice = calculatePrice()

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-deep-navy mb-6 text-center">
        Lesson Pricing Calculator
      </h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Selection Panel */}
        <div className="space-y-6">
          {/* Lesson Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-deep-navy mb-3">
              Lesson Type
            </label>
            <div className="space-y-2">
              {lessonTypes.map((lesson) => (
                <label
                  key={lesson.id}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedLesson.id === lesson.id
                      ? "border-coral-orange bg-coral-orange/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="lessonType"
                    value={lesson.id}
                    checked={selectedLesson.id === lesson.id}
                    onChange={() => setSelectedLesson(lesson)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-deep-navy">{lesson.name}</div>
                    <div className="text-sm text-gray-600">{lesson.description}</div>
                    <div className="text-sm text-coral-orange font-semibold">
                      Base: €{lesson.price}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Destination Selection */}
          <div>
            <label className="block text-sm font-semibold text-deep-navy mb-3">
              Destination
            </label>
            <div className="space-y-2">
              {destinations.map((destination) => (
                <label
                  key={destination.id}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedDestination.id === destination.id
                      ? "border-turquoise-500 bg-turquoise-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="destination"
                    value={destination.id}
                    checked={selectedDestination.id === destination.id}
                    onChange={() => setSelectedDestination(destination)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-deep-navy">{destination.name}</div>
                    <div className="text-sm text-gray-600">{destination.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Hours Selection for Private Coaching */}
          {selectedLesson.id === "private-coaching" && (
            <div>
              <label className="block text-sm font-semibold text-deep-navy mb-3">
                Number of Hours
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setHours(Math.max(1, hours - 1))}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-deep-navy min-w-[3rem] text-center">
                  {hours}
                </span>
                <button
                  onClick={() => setHours(hours + 1)}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Price Display */}
        <div className="bg-gradient-to-br from-turquoise-50 to-sand-beige-50 rounded-xl p-6">
          <h4 className="text-lg font-bold text-deep-navy mb-4">Your Quote</h4>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Lesson Type:</span>
              <span className="font-semibold text-deep-navy">{selectedLesson.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Destination:</span>
              <span className="font-semibold text-deep-navy">{selectedDestination.name}</span>
            </div>
            {selectedLesson.id === "private-coaching" && (
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold text-deep-navy">{hours} hour{hours > 1 ? 's' : ''}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-semibold text-deep-navy">
                €{selectedLesson.id === "private-coaching" ? selectedLesson.price * hours : selectedLesson.price}
              </span>
            </div>
            {selectedDestination.multiplier !== 1.0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Destination Premium:</span>
                <span className="font-semibold text-deep-navy">
                  +{Math.round((selectedDestination.multiplier - 1) * 100)}%
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-deep-navy">Total Price:</span>
              <span className="text-3xl font-bold text-coral-orange">€{totalPrice}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href="/booking"
              className="w-full bg-coral-orange hover:bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center block"
            >
              Book This Lesson
            </Link>
            <Link
              href="/contact"
              className="w-full bg-white border-2 border-coral-orange text-coral-orange hover:bg-coral-orange hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center block"
            >
              Ask Questions
            </Link>
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            * Prices include equipment rental and safety gear. 
            Accommodation and meals included in Complete Course packages.
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
        <div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">✓</span>
          </div>
          <h5 className="font-semibold text-deep-navy mb-2">IKO Certified</h5>
          <p className="text-sm text-gray-600">All instructors are IKO certified with proven safety records</p>
        </div>
        <div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">🛡️</span>
          </div>
          <h5 className="font-semibold text-deep-navy mb-2">Safety First</h5>
          <p className="text-sm text-gray-600">Rescue boat support and comprehensive insurance included</p>
        </div>
        <div>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">📞</span>
          </div>
          <h5 className="font-semibold text-deep-navy mb-2">Easy Booking</h5>
          <p className="text-sm text-gray-600">Flexible scheduling and easy rescheduling options available</p>
        </div>
      </div>
    </div>
  )
}

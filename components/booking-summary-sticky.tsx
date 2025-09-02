"use client"

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, Euro, ChevronUp, ChevronDown } from 'lucide-react'

interface BookingSummaryStickyProps {
  destination: string
  selectedTripId: string | null
  groupSize: number
  pricing: {
    total: number
    breakdown: Array<{ item: string; amount: number }>
  }
  tripDataService: any
  isVisible: boolean
}

export function BookingSummarySticky({
  destination,
  selectedTripId,
  groupSize,
  pricing,
  tripDataService,
  isVisible
}: BookingSummaryStickyProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<any>(null)

  useEffect(() => {
    if (selectedTripId) {
      const trip = tripDataService.getTripById(selectedTripId)
      setSelectedTrip(trip)
    } else {
      setSelectedTrip(null)
    }
  }, [selectedTripId, tripDataService])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="p-4">
        {/* Summary Header */}
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-deep-navy">
              <MapPin className="w-4 h-4 text-coral-orange" />
              {destination}
            </div>
            {selectedTrip && (
              <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                <Calendar className="w-3 h-3" />
                {new Date(selectedTrip.startDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })} - {new Date(selectedTrip.endDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-lg font-bold text-coral-orange">
                €{pricing.total.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">
                {groupSize} guest{groupSize !== 1 ? 's' : ''}
              </div>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="space-y-3">
              {/* Trip Details */}
              {selectedTrip && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Trip Duration:</span>
                    <span className="font-semibold">
                      {Math.ceil((new Date(selectedTrip.endDate).getTime() - new Date(selectedTrip.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Available Spots:</span>
                    <span className="font-semibold text-green-600">
                      {selectedTrip.availableSpots} left
                    </span>
                  </div>
                </div>
              )}

              {/* Pricing Breakdown */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-deep-navy">Pricing Breakdown:</div>
                {pricing.breakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 truncate">{item.item}</span>
                    <span className={`font-semibold ${item.amount < 0 ? 'text-green-600' : ''}`}>
                      {item.amount < 0 ? '-' : ''}€{Math.abs(item.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span>Total:</span>
                    <span className="text-coral-orange">€{pricing.total.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    €{Math.round(pricing.total / groupSize).toLocaleString()} per person
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

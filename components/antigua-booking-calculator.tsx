"use client"

import { useState } from "react"
import Link from "next/link"
import { Calculator, Users, Calendar, Euro, CheckCircle, Star, Anchor, Wind } from "lucide-react"

interface BookingOptions {
  guests: number
  season: string
  duration: number
  addOns: string[]
}

export function AntiguaBookingCalculator() {
  const [options, setOptions] = useState<BookingOptions>({
    guests: 2,
    season: "peak",
    duration: 7,
    addOns: []
  })

  const [showResults, setShowResults] = useState(false)

  const pricing = {
    basePrice: 1900,
    seasons: {
      peak: { multiplier: 1.0, name: "Peak Season (Dec-Mar)", description: "Best wind conditions" },
      shoulder: { multiplier: 0.9, name: "Shoulder Season (Apr)", description: "Good conditions, slightly better value" }
    },
    addOns: {
      "photography": { price: 200, name: "Professional Photography", description: "Capture your adventure" },
      "equipment": { price: 150, name: "Premium Equipment", description: "Latest gear upgrade" },
      "lessons": { price: 300, name: "Private Lessons", description: "1-on-1 coaching sessions" }
    }
  }

  const calculatePrice = () => {
    const basePrice = pricing.basePrice
    const seasonMultiplier = pricing.seasons[options.season as keyof typeof pricing.seasons].multiplier
    const addOnPrice = options.addOns.reduce((total, addOn) => {
      return total + (pricing.addOns[addOn as keyof typeof pricing.addOns]?.price || 0)
    }, 0)
    
    return Math.round((basePrice * seasonMultiplier) + addOnPrice)
  }

  const calculateTotalPrice = () => {
    const pricePerCabin = calculatePrice()
    const numberOfCabins = Math.ceil(options.guests / 2) // 2 guests per cabin
    return pricePerCabin * numberOfCabins
  }

  const handleAddOnChange = (addOn: string, checked: boolean) => {
    setOptions(prev => ({
      ...prev,
      addOns: checked 
        ? [...prev.addOns, addOn]
        : prev.addOns.filter(item => item !== addOn)
    }))
  }

  const pricePerCabin = calculatePrice()
  const totalPrice = calculateTotalPrice()
  const numberOfCabins = Math.ceil(options.guests / 2)
  const savings = pricing.basePrice - pricePerCabin

  return (
    <div className="bg-gradient-to-br from-white to-turquoise/5 rounded-xl p-8 border border-turquoise/20 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-coral-orange to-orange-500 rounded-full flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-deep-navy font-montserrat">Antigua Safari Calculator</h3>
          <p className="text-gray-600 font-open-sans">Customize your Caribbean adventure</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Number of Guests */}
          <div>
            <label className="block text-sm font-semibold text-deep-navy mb-3">
              <Users className="w-4 h-4 inline mr-2" />
              Number of Guests
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setOptions(prev => ({ ...prev, guests: num }))}
                  className={`p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 text-sm sm:text-base ${
                    options.guests === num
                      ? "border-coral-orange bg-coral-orange/10 text-coral-orange"
                      : "border-gray-200 hover:border-turquoise/50"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Price is per cabin (up to 2 guests). Max 6 guests total.</p>
          </div>

          {/* Season Selection */}
          <div>
            <label className="block text-sm font-semibold text-deep-navy mb-3">
              <Calendar className="w-4 h-4 inline mr-2" />
              Travel Season
            </label>
            <div className="space-y-2">
              {Object.entries(pricing.seasons).map(([key, season]) => (
                <button
                  key={key}
                  onClick={() => setOptions(prev => ({ ...prev, season: key }))}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    options.season === key
                      ? "border-coral-orange bg-coral-orange/10"
                      : "border-gray-200 hover:border-turquoise/50"
                  }`}
                >
                  <div className="font-semibold text-deep-navy">{season.name}</div>
                  <div className="text-sm text-gray-600">{season.description}</div>
                  <div className="text-sm font-semibold text-coral-orange">
                    {season.multiplier === 1 ? "Standard Price" : 
                     season.multiplier < 1 ? `${Math.round((1 - season.multiplier) * 100)}% Discount` : 
                     `${Math.round((season.multiplier - 1) * 100)}% Premium`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration - Fixed to 7 days */}
          <div>
            <label className="block text-sm font-semibold text-deep-navy mb-3">
              <Anchor className="w-4 h-4 inline mr-2" />
              Trip Duration
            </label>
            <div className="p-4 rounded-lg border-2 border-coral-orange bg-coral-orange/10 text-coral-orange">
              <div className="font-semibold text-lg">7 Days</div>
              <div className="text-sm text-gray-600">Standard Antigua Safari</div>
              <div className="text-xs text-gray-500 mt-1">Only 7-day trips available for Antigua</div>
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block text-sm font-semibold text-deep-navy mb-3">
              <Star className="w-4 h-4 inline mr-2" />
              Premium Add-ons
            </label>
            <div className="space-y-2">
              {Object.entries(pricing.addOns).map(([key, addOn]) => (
                <label key={key} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-turquoise/50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.addOns.includes(key)}
                    onChange={(e) => handleAddOnChange(key, e.target.checked)}
                    className="mt-1 w-4 h-4 text-coral-orange border-gray-300 rounded focus:ring-coral-orange"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-deep-navy">{addOn.name}</div>
                    <div className="text-sm text-gray-600">{addOn.description}</div>
                    <div className="text-sm font-semibold text-coral-orange">+€{addOn.price}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-gradient-to-br from-deep-navy to-turquoise rounded-xl p-6 text-white">
          <h4 className="text-xl font-bold mb-4 font-montserrat">Your Safari Quote</h4>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Base Price (per cabin)</span>
              <span className="font-semibold">€{pricing.basePrice}</span>
            </div>
            
            {options.season !== "peak" && (
              <div className="flex justify-between items-center text-green-300">
                <span>Season Discount</span>
                <span>-€{Math.abs(savings)}</span>
              </div>
            )}
            
            {options.addOns.map((addOn) => (
              <div key={addOn} className="flex justify-between items-center">
                <span className="text-white/80">{pricing.addOns[addOn as keyof typeof pricing.addOns].name}</span>
                <span className="font-semibold">+€{pricing.addOns[addOn as keyof typeof pricing.addOns].price}</span>
              </div>
            ))}
            
            <div className="border-t border-white/20 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Price per cabin</span>
                <span className="font-semibold">€{pricePerCabin}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Number of cabins</span>
                <span className="font-semibold">{numberOfCabins}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t border-white/20 pt-2 mt-2">
                <span>Total Price</span>
                <span className="text-coral-orange">€{totalPrice}</span>
              </div>
              <div className="text-sm text-white/80">for {options.guests} guest{options.guests !== 1 ? 's' : ''} • 7 days</div>
            </div>
          </div>

          {/* What's Included */}
          <div className="mb-6">
            <h5 className="font-semibold mb-3">What's Included:</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Luxury catamaran accommodation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>All meals & beverages</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Professional kitesurfing instruction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>All kitesurfing equipment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Transportation between spots</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => setShowResults(true)}
              className="w-full bg-coral-orange hover:bg-coral-orange/90 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
            >
              Book This Safari
            </button>
            <Link href="/contact">
              <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg border border-white/30 transition-colors duration-200 text-sm sm:text-base">
                Contact Us for Details
              </button>
            </Link>
          </div>

          {/* Special Offer */}
          <div className="mt-4 p-3 bg-coral-orange/20 rounded-lg border border-coral-orange/30">
            <div className="text-sm font-semibold text-coral-orange">Antigua Season</div>
            <div className="text-xs text-white/80">Available December 1 - April 30 only</div>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-deep-navy mb-2">Quote Generated!</h3>
              <p className="text-gray-600 mb-6">
                Your personalized Antigua safari quote has been calculated. 
                Ready to book your Caribbean adventure?
              </p>
              <div className="space-y-3">
                <Link href="/booking">
                  <button className="w-full bg-coral-orange hover:bg-coral-orange/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    Proceed to Booking
                  </button>
                </Link>
                <button 
                  onClick={() => setShowResults(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Continue Customizing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

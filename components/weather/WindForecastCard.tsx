"use client"

import { useEffect, useState } from "react"
import { Wind, Clock, Thermometer, Droplets, Navigation } from "lucide-react"

interface WindForecastData {
  time: string;
  windSpeed: number; // in knots
  windDirection: number; // in degrees
  windGust: number; // in knots
  temperature: number; // in Celsius
  humidity: number; // percentage
  windDirectionCardinal: string; // N, NE, E, etc.
}

interface WindForecastResponse {
  success: boolean;
  data: WindForecastData[];
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  requestedHours: number;
  timestamp: string;
}

export default function WindForecastCard({ 
  hours = 6,
  showCurrent = true,
  className = ""
}: { 
  hours?: number;
  showCurrent?: boolean;
  className?: string;
}) {
  const [forecast, setForecast] = useState<WindForecastData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadForecast() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/weather/stormglass?hours=${hours}`)
        const data: WindForecastResponse = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load forecast')
        }

        if (active) {
          setForecast(data.data)
        }
      } catch (e: any) {
        if (active) {
          setError(e.message || 'Failed to load wind forecast')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadForecast()
    return () => { active = false }
  }, [hours])

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <Wind className="w-6 h-6 text-turquoise" />
          <h3 className="text-xl font-montserrat font-bold text-deep-navy">
            Wind Forecast
          </h3>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-turquoise mx-auto mb-3"></div>
          <p className="text-gray-600">Loading forecast...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <Wind className="w-6 h-6 text-turquoise" />
          <h3 className="text-xl font-montserrat font-bold text-deep-navy">
            Wind Forecast
          </h3>
        </div>
        <div className="text-center py-8">
          <div className="text-red-500 mb-3">
            <Wind className="w-12 h-12 mx-auto opacity-50" />
          </div>
          <p className="text-gray-600 mb-2">Forecast temporarily unavailable</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    )
  }

  const currentForecast = forecast[0]
  const upcomingForecast = showCurrent ? forecast.slice(1, 4) : forecast.slice(0, 3)

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <Wind className="w-6 h-6 text-turquoise" />
        <h3 className="text-xl font-montserrat font-bold text-deep-navy">
          Wind Forecast - Punta Trettu
        </h3>
      </div>

      {/* Current Conditions */}
      {showCurrent && currentForecast && (
        <div className="mb-6 p-4 bg-gradient-to-r from-turquoise/10 to-deep-navy/10 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-turquoise" />
            <span className="text-sm font-medium text-deep-navy">Current Conditions</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-deep-navy">{currentForecast.windSpeed}</div>
              <div className="text-xs text-gray-600">knots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-deep-navy">{currentForecast.windGust}</div>
              <div className="text-xs text-gray-600">gust</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-deep-navy">{currentForecast.windDirectionCardinal}</div>
              <div className="text-xs text-gray-600">direction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-deep-navy">{Math.round(currentForecast.temperature)}°</div>
              <div className="text-xs text-gray-600">temp</div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Forecast */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-deep-navy mb-3">Next {upcomingForecast.length} Hours</h4>
        {upcomingForecast.map((hour, index) => (
          <div key={hour.time} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-deep-navy">
                {formatTime(hour.time)}
              </div>
              <div className="flex items-center gap-1">
                <Navigation 
                  className="w-4 h-4 text-gray-600" 
                  style={{ transform: `rotate(${hour.windDirection}deg)` }}
                />
                <span className="text-sm text-gray-600">{hour.windDirectionCardinal}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Wind className="w-4 h-4 text-turquoise" />
                <span className="font-medium">{hour.windSpeed}</span>
                <span className="text-gray-500">kn</span>
              </div>
              <div className="flex items-center gap-1">
                <Thermometer className="w-4 h-4 text-orange-500" />
                <span className="font-medium">{Math.round(hour.temperature)}°</span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{Math.round(hour.humidity)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Wind Quality Indicator */}
      {currentForecast && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-deep-navy">Kitesurfing Conditions</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              getWindQuality(currentForecast.windSpeed).color
            }`}>
              {getWindQuality(currentForecast.windSpeed).label}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function formatTime(timeString: string): string {
  const date = new Date(timeString)
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
}

function getWindQuality(windSpeed: number): { label: string; color: string } {
  if (windSpeed < 8) {
    return { label: "Light", color: "bg-yellow-100 text-yellow-800" }
  } else if (windSpeed < 15) {
    return { label: "Good", color: "bg-green-100 text-green-800" }
  } else if (windSpeed < 25) {
    return { label: "Excellent", color: "bg-blue-100 text-blue-800" }
  } else {
    return { label: "Strong", color: "bg-red-100 text-red-800" }
  }
}

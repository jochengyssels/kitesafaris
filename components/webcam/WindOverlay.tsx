"use client"

import { useEffect, useState } from "react"
import { Wind, Navigation, Thermometer, Droplets } from "lucide-react"

interface WindData {
  time: string;
  windSpeed: number; // in knots
  windDirection: number; // in degrees
  windGust: number; // in knots
  temperature: number; // in Celsius
  humidity: number; // percentage
  windDirectionCardinal: string; // N, NE, E, etc.
}

interface WindOverlayResponse {
  success: boolean;
  data: WindData[];
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  requestedHours: number;
  timestamp: string;
}

export default function WindOverlay() {
  const [currentWind, setCurrentWind] = useState<WindData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadCurrentWind() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/weather/stormglass?hours=1')
        const data: WindOverlayResponse = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load wind data')
        }

        if (active && data.data.length > 0) {
          setCurrentWind(data.data[0])
        }
      } catch (e: any) {
        if (active) {
          setError(e.message || 'Failed to load wind data')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadCurrentWind()
    
    // Refresh every 5 minutes
    const interval = setInterval(loadCurrentWind, 5 * 60 * 1000)
    
    return () => { 
      active = false
      clearInterval(interval)
    }
  }, [])

  if (loading) {
    return (
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span className="text-sm">Loading wind...</span>
        </div>
      </div>
    )
  }

  if (error || !currentWind) {
    return (
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-300">Wind data unavailable</span>
        </div>
      </div>
    )
  }

  const getWindQuality = (windSpeed: number): { label: string; color: string } => {
    if (windSpeed < 8) {
      return { label: "Light", color: "text-yellow-400" }
    } else if (windSpeed < 15) {
      return { label: "Good", color: "text-green-400" }
    } else if (windSpeed < 25) {
      return { label: "Excellent", color: "text-blue-400" }
    } else {
      return { label: "Strong", color: "text-red-400" }
    }
  }

  const windQuality = getWindQuality(currentWind.windSpeed)

  return (
    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white min-w-[200px]">
      <div className="flex items-center gap-2 mb-3">
        <Wind className="w-5 h-5 text-turquoise" />
        <span className="text-sm font-medium">Live Wind Conditions</span>
      </div>
      
      <div className="space-y-2">
        {/* Wind Speed */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation 
              className="w-4 h-4 text-white" 
              style={{ transform: `rotate(${currentWind.windDirection}deg)` }}
            />
            <span className="text-sm">{currentWind.windDirectionCardinal}</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{currentWind.windSpeed}</div>
            <div className="text-xs text-gray-300">knots</div>
          </div>
        </div>

        {/* Wind Gust */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Gust</span>
          <span className="text-sm font-medium">{currentWind.windGust} kn</span>
        </div>

        {/* Wind Quality */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Conditions</span>
          <span className={`text-sm font-medium ${windQuality.color}`}>
            {windQuality.label}
          </span>
        </div>

        {/* Temperature */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-orange-400" />
            <span className="text-sm text-gray-300">Temp</span>
          </div>
          <span className="text-sm font-medium">{Math.round(currentWind.temperature)}°C</span>
        </div>

        {/* Humidity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3 text-blue-400" />
            <span className="text-sm text-gray-300">Humidity</span>
          </div>
          <span className="text-sm font-medium">{Math.round(currentWind.humidity)}%</span>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-3 pt-2 border-t border-white/20">
        <div className="text-xs text-gray-400 text-center">
          Updated {new Date(currentWind.time).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  )
}

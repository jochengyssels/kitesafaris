"use client"

import { useState, useEffect } from "react"
import { Wind, Thermometer, Droplets, Clock, AlertTriangle, Loader2, RefreshCw } from "lucide-react"
import { WindForecastData } from "@/lib/stormglass-service"

interface WeatherConditionsProps {
  destination: string
  coordinates?: {
    lat: number
    lng: number
  }
  tripStartDate?: string
  tripEndDate?: string
}

interface WeatherData {
  current: WindForecastData | null
  forecast: WindForecastData[]
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

// Destination coordinates mapping
const DESTINATION_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "Sardinia": { lat: 39.112133995367714, lng: 8.437520043416788 },
  "Antigua": { lat: 17.0608, lng: -61.7964 },
  "Barbados": { lat: 13.1939, lng: -59.5432 },
  "Grenada": { lat: 12.1165, lng: -61.6790 },
  "St. Lucia": { lat: 13.9094, lng: -60.9789 },
  "Dominica": { lat: 15.4150, lng: -61.3710 },
  "St. Vincent": { lat: 13.2528, lng: -61.1971 },
  "Tobago": { lat: 11.1800, lng: -60.7200 },
  "Trinidad": { lat: 10.6918, lng: -61.2225 }
}

export function WeatherConditions({ destination, coordinates, tripStartDate, tripEndDate }: WeatherConditionsProps) {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: null,
    forecast: [],
    loading: false,
    error: null,
    lastUpdated: null
  })

  const [isExpanded, setIsExpanded] = useState(false)

  // Get coordinates for the destination
  const getDestinationCoordinates = () => {
    if (coordinates) return coordinates
    
    // Try to find coordinates by destination name
    const destKey = Object.keys(DESTINATION_COORDINATES).find(key => 
      destination.toLowerCase().includes(key.toLowerCase())
    )
    
    if (destKey) {
      return DESTINATION_COORDINATES[destKey]
    }
    
    // Default to Sardinia if no match found
    return DESTINATION_COORDINATES["Sardinia"]
  }

  const fetchWeatherData = async () => {
    const coords = getDestinationCoordinates()
    
    setWeatherData(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          coordinates: coords,
          hours: 6
        })
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch weather data')
      }

      setWeatherData({
        current: result.data.current,
        forecast: result.data.forecast,
        loading: false,
        error: null,
        lastUpdated: new Date(result.data.lastUpdated)
      })
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setWeatherData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch weather data'
      }))
    }
  }

  // Fetch weather data when component mounts or destination changes
  useEffect(() => {
    if (destination) {
      fetchWeatherData()
    }
  }, [destination])

  const getWindCondition = (windSpeed: number) => {
    if (windSpeed < 8) return { label: "Light", color: "text-gray-500", bg: "bg-gray-100" }
    if (windSpeed < 15) return { label: "Moderate", color: "text-blue-600", bg: "bg-blue-100" }
    if (windSpeed < 25) return { label: "Good", color: "text-green-600", bg: "bg-green-100" }
    if (windSpeed < 35) return { label: "Strong", color: "text-orange-600", bg: "bg-orange-100" }
    return { label: "Very Strong", color: "text-red-600", bg: "bg-red-100" }
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (weatherData.loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-coral-orange mr-2" />
          <span className="text-gray-600">Loading weather conditions...</span>
        </div>
      </div>
    )
  }

  if (weatherData.error) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-deep-navy flex items-center">
            <Wind className="w-4 h-4 mr-2" />
            Weather Conditions
          </h3>
          <button
            onClick={fetchWeatherData}
            className="text-coral-orange hover:text-coral-orange/80 text-sm flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Retry
          </button>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <div>
              <p className="text-red-800 font-medium">Unable to load weather data</p>
              <p className="text-red-600 text-sm mt-1">{weatherData.error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-deep-navy flex items-center">
          <Wind className="w-4 h-4 mr-2" />
          Weather Conditions
        </h3>
        <div className="flex items-center space-x-2">
          {weatherData.lastUpdated && (
            <span className="text-xs text-gray-500">
              Updated {weatherData.lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchWeatherData}
            className="text-coral-orange hover:text-coral-orange/80 text-sm flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </button>
        </div>
      </div>

      {/* Current Conditions */}
      {weatherData.current && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Current Conditions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Wind className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-xs text-gray-500">Wind</span>
              </div>
              <div className="text-lg font-semibold text-deep-navy">
                {weatherData.current.windSpeed} kts
              </div>
              <div className="text-xs text-gray-600">
                {weatherData.current.windDirectionCardinal}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Thermometer className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-xs text-gray-500">Temp</span>
              </div>
              <div className="text-lg font-semibold text-deep-navy">
                {Math.round(weatherData.current.temperature)}°C
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Droplets className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-xs text-gray-500">Humidity</span>
              </div>
              <div className="text-lg font-semibold text-deep-navy">
                {Math.round(weatherData.current.humidity)}%
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Wind className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-xs text-gray-500">Gusts</span>
              </div>
              <div className="text-lg font-semibold text-deep-navy">
                {weatherData.current.windGust} kts
              </div>
            </div>
          </div>
          
          {/* Wind Condition Assessment */}
          <div className="mt-4 p-3 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Kiteboarding Conditions:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWindCondition(weatherData.current.windSpeed).bg} ${getWindCondition(weatherData.current.windSpeed).color}`}>
                {getWindCondition(weatherData.current.windSpeed).label}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {weatherData.current.windSpeed < 8 && "Light winds - may need larger kites"}
              {weatherData.current.windSpeed >= 8 && weatherData.current.windSpeed < 15 && "Moderate winds - good for intermediate riders"}
              {weatherData.current.windSpeed >= 15 && weatherData.current.windSpeed < 25 && "Great conditions - perfect for kitesurfing"}
              {weatherData.current.windSpeed >= 25 && weatherData.current.windSpeed < 35 && "Strong winds - experienced riders only"}
              {weatherData.current.windSpeed >= 35 && "Very strong winds - consider postponing"}
            </p>
          </div>
        </div>
      )}

      {/* 6-Hour Forecast */}
      {weatherData.forecast.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">6-Hour Forecast</h4>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-coral-orange hover:text-coral-orange/80 text-sm flex items-center"
            >
              <Clock className="w-4 h-4 mr-1" />
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          
          <div className={`grid gap-2 ${isExpanded ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {weatherData.forecast.slice(0, isExpanded ? 6 : 3).map((hour, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-700">
                    {isExpanded ? `${formatDate(hour.time)} ${formatTime(hour.time)}` : formatTime(hour.time)}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWindCondition(hour.windSpeed).bg} ${getWindCondition(hour.windSpeed).color}`}>
                    {hour.windSpeed} kts
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{hour.windDirectionCardinal}</span>
                  <span>{Math.round(hour.temperature)}°C</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trip Date Context */}
      {tripStartDate && tripEndDate && (
        <div className="mt-4 p-3 bg-turquoise/10 rounded-lg">
          <p className="text-sm text-deep-navy">
            <strong>Trip Dates:</strong> {new Date(tripStartDate).toLocaleDateString()} - {new Date(tripEndDate).toLocaleDateString()}
          </p>
          <p className="text-xs text-deep-navy/70 mt-1">
            Weather conditions may change. This forecast is for planning purposes only.
          </p>
        </div>
      )}
    </div>
  )
}

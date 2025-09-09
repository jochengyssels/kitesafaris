"use client"

import { useState, useEffect } from "react"
import { Wind, Thermometer, Droplets, Sun, Cloud, CloudRain, AlertCircle, Loader2 } from "lucide-react"

interface WeatherData {
  temperature: number
  windSpeed: number
  windDirection: string
  humidity: number
  condition: string
  icon: string
  forecast: Array<{
    day: string
    temp: number
    wind: number
    condition: string
    icon: string
  }>
}

export function AntiguaWeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simulate API call - replace with actual weather API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock weather data for Antigua
        const mockWeather: WeatherData = {
          temperature: 28,
          windSpeed: 18,
          windDirection: "ESE",
          humidity: 75,
          condition: "Perfect Kiting Conditions",
          icon: "sun",
          forecast: [
            { day: "Today", temp: 28, wind: 18, condition: "Perfect", icon: "sun" },
            { day: "Tomorrow", temp: 29, wind: 20, condition: "Excellent", icon: "sun" },
            { day: "Day 3", temp: 27, wind: 16, condition: "Good", icon: "cloud" },
            { day: "Day 4", temp: 30, wind: 22, condition: "Perfect", icon: "sun" },
            { day: "Day 5", temp: 28, wind: 19, condition: "Excellent", icon: "sun" },
          ]
        }
        
        setWeather(mockWeather)
      } catch (err) {
        setError("Failed to load weather data")
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWindIcon = (speed: number) => {
    if (speed >= 20) return "🌪️"
    if (speed >= 15) return "💨"
    return "🌬️"
  }

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "perfect":
      case "excellent":
        return <Sun className="w-6 h-6 text-yellow-500" />
      case "good":
        return <Cloud className="w-6 h-6 text-gray-500" />
      case "rain":
        return <CloudRain className="w-6 h-6 text-blue-500" />
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />
    }
  }

  const getWindQuality = (speed: number) => {
    if (speed >= 20) return { quality: "Strong", color: "text-green-600", bg: "bg-green-100" }
    if (speed >= 15) return { quality: "Perfect", color: "text-green-600", bg: "bg-green-100" }
    if (speed >= 10) return { quality: "Good", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { quality: "Light", color: "text-orange-600", bg: "bg-orange-100" }
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-turquoise to-deep-navy rounded-xl p-6 text-white">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-white mr-3" />
          <span className="text-lg font-semibold">Loading Weather Data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-center py-8">
          <AlertCircle className="w-8 h-8 text-white mr-3" />
          <span className="text-lg font-semibold">{error}</span>
        </div>
      </div>
    )
  }

  if (!weather) return null

  const windQuality = getWindQuality(weather.windSpeed)

  return (
    <div className="bg-gradient-to-br from-turquoise to-deep-navy rounded-xl p-6 text-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold font-montserrat">Antigua Weather</h3>
          <p className="text-white/80 font-open-sans">Current Kiting Conditions</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{weather.temperature}°C</div>
          <div className="text-sm text-white/80">Dec - Apr Season</div>
        </div>
      </div>

      {/* Current Conditions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center">
          <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-coral-orange mx-auto mb-2" />
          <div className="text-xl sm:text-2xl font-bold">{weather.windSpeed}</div>
          <div className="text-xs text-white/80">knots {weather.windDirection}</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center">
          <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-coral-orange mx-auto mb-2" />
          <div className="text-xl sm:text-2xl font-bold">{weather.temperature}°</div>
          <div className="text-xs text-white/80">Water Temp</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center">
          <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-coral-orange mx-auto mb-2" />
          <div className="text-xl sm:text-2xl font-bold">{weather.humidity}%</div>
          <div className="text-xs text-white/80">Humidity</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center">
          {getConditionIcon(weather.condition)}
          <div className="text-sm font-semibold mt-2">Perfect</div>
          <div className="text-xs text-white/80">Kiting</div>
        </div>
      </div>

      {/* Wind Quality Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Wind Quality</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${windQuality.bg} ${windQuality.color}`}>
            {windQuality.quality} for Kiting
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-coral-orange h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((weather.windSpeed / 25) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div>
        <h4 className="font-semibold mb-4 text-lg">5-Day Kiting Forecast</h4>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {weather.forecast.map((day, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
              <div className="text-xs font-semibold mb-1">{day.day}</div>
              <div className="scale-75 sm:scale-100">
                {getConditionIcon(day.condition)}
              </div>
              <div className="text-sm font-bold mt-1">{day.temp}°</div>
              <div className="text-xs text-white/80">{day.wind}kt</div>
              <div className="text-xs text-coral-orange font-semibold hidden sm:block">{day.condition}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Kiting Recommendation */}
      <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-coral-orange rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🏄‍♂️</span>
          </div>
          <div>
            <div className="font-semibold">Perfect Kiting Conditions!</div>
            <div className="text-sm text-white/80">
              {weather.windSpeed >= 15 
                ? "Excellent wind conditions for all skill levels. Great day for progression!"
                : "Good conditions for beginners. Advanced riders may want stronger winds."
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

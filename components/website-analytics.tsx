"use client"

import { useState } from "react"
import { 
  Eye, 
  Users, 
  MousePointer, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Search,
  ExternalLink
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface WebsiteAnalyticsProps {
  data: any
  dateRange: string
  apiError?: string
}

export function WebsiteAnalytics({ data, dateRange, apiError }: WebsiteAnalyticsProps) {
  const [selectedMetric, setSelectedMetric] = useState("visitors")
  const [selectedPeriod, setSelectedPeriod] = useState("daily")

  // Error state component
  const ErrorState = ({ title, message }: { title: string, message: string }) => (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-sand-beige-200 text-center">
      <div className="flex flex-col items-center">
        <div className="p-4 bg-red-100 rounded-full mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-navy-900 mb-2">{title}</h3>
        <p className="text-gray-600 max-w-md">{message}</p>
      </div>
    </div>
  )

  // No data state component
  const NoDataState = ({ title, message }: { title: string, message: string }) => (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-sand-beige-200 text-center">
      <div className="flex flex-col items-center">
        <div className="p-4 bg-gray-100 rounded-full mb-4">
          <AlertTriangle className="h-8 w-8 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-navy-900 mb-2">{title}</h3>
        <p className="text-gray-600 max-w-md">{message}</p>
      </div>
    </div>
  )

  // Check if we have real data
  const hasData = data && !apiError

  // If no data is available, show error state
  if (!hasData) {
    return (
      <div className="space-y-6">
        <ErrorState 
          title="Website Analytics Data Unavailable"
          message={apiError || "We're currently unable to retrieve website analytics data. This could be due to API connectivity issues, missing data sources, or service unavailability."}
        />
      </div>
    )
  }

  // Use real data from API
  const currentData = selectedPeriod === "daily" ? (data.dailyData || []) : (data.weeklyData || [])
  const topPages = data.topPages || []
  const trafficSources = data.trafficSourcesArray || []
  const deviceData = data.deviceData || []

  const metrics = [
    { key: "visitors", label: "Visitors", icon: Users, color: "text-turquoise-600" },
    { key: "pageViews", label: "Page Views", icon: Eye, color: "text-coral-orange-600" },
    { key: "sessions", label: "Sessions", icon: MousePointer, color: "text-gold-600" },
    { key: "bounceRate", label: "Bounce Rate", icon: TrendingDown, color: "text-red-600" },
    { key: "avgDuration", label: "Avg Duration", icon: Clock, color: "text-emerald-600" },
  ]

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const currentValue = currentData[currentData.length - 1]?.[metric.key] || 0
          const previousValue = currentData[currentData.length - 2]?.[metric.key] || 0
          const change = previousValue > 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0
          
          return (
            <div key={metric.key} className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  {currentData.length > 0 ? (
                    <p className="text-2xl font-bold text-navy-900">
                      {metric.key === "avgDuration" 
                        ? `${Math.floor(currentValue / 60)}:${(currentValue % 60).toString().padStart(2, '0')}`
                        : metric.key === "bounceRate"
                        ? `${currentValue}%`
                        : (currentValue || 0).toLocaleString()
                      }
                    </p>
                  ) : (
                    <p className="text-2xl font-bold text-gray-400">--</p>
                  )}
                  {currentData.length > 1 && (
                    <div className="flex items-center mt-1">
                      {change >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {Math.abs(change).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
                <Icon className={`h-8 w-8 ${currentData.length > 0 ? metric.color : 'text-gray-400'}`} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart Controls */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="text-lg font-semibold text-navy-900 mb-2 sm:mb-0">Traffic Analytics</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Period:</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-sand-beige-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Metric:</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="border border-sand-beige-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
              >
                <option value="visitors">Visitors</option>
                <option value="pageViews">Page Views</option>
                <option value="sessions">Sessions</option>
                <option value="bounceRate">Bounce Rate</option>
                <option value="avgDuration">Avg Duration</option>
              </select>
            </div>
          </div>
        </div>

        <div className="h-80 overflow-hidden">
          {currentData.length > 0 ? (
            <ChartContainer
              config={{
                [selectedMetric]: {
                  label: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
                  color: "hsl(var(--color-turquoise))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={selectedPeriod === "daily" ? "date" : "week"} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke="var(--color-turquoise)"
                    fill="var(--color-turquoise)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <NoDataState 
                title="No Traffic Data Available"
                message="Traffic analytics data is not available for the selected period."
              />
            </div>
          )}
        </div>
      </div>

      {/* Top Pages and Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Top Pages</h3>
            {topPages.length > 0 && <ExternalLink className="h-5 w-5 text-gray-400" />}
          </div>
          <div className="space-y-3">
            {topPages.length > 0 ? (
              topPages.map((page: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-sand-beige-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-navy-900 truncate">{page.page}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{(page.visitors || 0).toLocaleString()} visitors</span>
                      <span>{page.bounceRate}% bounce</span>
                      <span>{page.avgTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-turquoise-600">#{index + 1}</div>
                  </div>
                </div>
              ))
            ) : (
              <NoDataState 
                title="No Page Data Available"
                message="Top pages data is not available at this time."
              />
            )}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Traffic Sources</h3>
            {trafficSources.length > 0 && <Globe className="h-5 w-5 text-gray-400" />}
          </div>
          <div className="space-y-4">
            {trafficSources.length > 0 ? (
              trafficSources.map((source: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-navy-900">{source.source}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{(source.visitors || 0).toLocaleString()}</span>
                      <span className="text-sm font-bold text-turquoise-600">{source.percentage || 0}%</span>
                      {source.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-sand-beige-200 rounded-full h-2">
                    <div
                      className="bg-turquoise-500 h-2 rounded-full"
                      style={{ width: `${source.percentage || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <NoDataState 
                title="No Traffic Source Data"
                message="Traffic source data is not available at this time."
              />
            )}
          </div>
        </div>
      </div>

      {/* Device Analytics */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-navy-900">Device Analytics</h3>
          {deviceData.length > 0 && (
            <div className="flex items-center space-x-2">
              <Monitor className="h-5 w-5 text-gray-400" />
              <Smartphone className="h-5 w-5 text-gray-400" />
              <Tablet className="h-5 w-5 text-gray-400" />
            </div>
          )}
        </div>
        
        {deviceData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Device Distribution Chart */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-navy-900">Device Distribution</h4>
              <div className="h-64 flex items-center justify-center">
                <ChartContainer
                  config={{
                    desktop: { label: "Desktop", color: "hsl(var(--color-turquoise))" },
                    mobile: { label: "Mobile", color: "hsl(var(--color-coral-orange))" },
                    tablet: { label: "Tablet", color: "hsl(var(--color-gold))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="percentage"
                      >
                        {deviceData.map((entry: any, index: number) => {
                          const colors = ['#0D9488', '#F97316', '#EAB308']
                          return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        })}
                      </Pie>
                      <ChartTooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 border border-sand-beige-200 rounded-lg shadow-sm">
                                <p className="font-semibold text-navy-900">{data.device}</p>
                                <p className="text-sm text-gray-600">{data.percentage}% of traffic</p>
                                <p className="text-sm text-gray-600">{(data.visitors || 0).toLocaleString()} visitors</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>

            {/* Device Performance Metrics */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-navy-900">Performance by Device</h4>
              <div className="space-y-4">
                {deviceData.map((device: any, index: number) => {
                  const getDeviceIcon = (deviceType: string) => {
                    switch (deviceType.toLowerCase()) {
                      case 'desktop': return <Monitor className="h-5 w-5 text-turquoise-600" />
                      case 'mobile': return <Smartphone className="h-5 w-5 text-coral-orange-600" />
                      case 'tablet': return <Tablet className="h-5 w-5 text-gold-600" />
                      default: return <Monitor className="h-5 w-5 text-gray-600" />
                    }
                  }
                  
                  const getDeviceColor = (deviceType: string) => {
                    switch (deviceType.toLowerCase()) {
                      case 'desktop': return 'border-turquoise-200 bg-turquoise-50'
                      case 'mobile': return 'border-coral-orange-200 bg-coral-orange-50'
                      case 'tablet': return 'border-gold-200 bg-gold-50'
                      default: return 'border-gray-200 bg-gray-50'
                    }
                  }

                  return (
                    <div key={index} className={`p-4 rounded-lg border ${getDeviceColor(device.device)}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getDeviceIcon(device.device)}
                          <div>
                            <h5 className="font-semibold text-navy-900">{device.device}</h5>
                            <p className="text-sm text-gray-600">{(device.visitors || 0).toLocaleString()} visitors</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-navy-900">{device.percentage}%</div>
                          <div className="text-xs text-gray-500">of total traffic</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Avg. Duration</div>
                          <div className="font-semibold text-navy-900">{device.avgDuration}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Bounce Rate</div>
                          <div className="font-semibold text-navy-900">{device.bounceRate}%</div>
                        </div>
                      </div>
                      
                      {/* Progress bar for device percentage */}
                      <div className="mt-3">
                        <div className="w-full bg-white rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              device.device.toLowerCase() === 'desktop' ? 'bg-turquoise-500' :
                              device.device.toLowerCase() === 'mobile' ? 'bg-coral-orange-500' :
                              'bg-gold-500'
                            }`}
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-full">
            <NoDataState 
              title="No Device Data Available"
              message="Device analytics data is not available at this time."
            />
          </div>
        )}
      </div>

      {/* Geographic Data */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-navy-900">Geographic Distribution</h3>
          {data.geographicData && data.geographicData.length > 0 && (
            <Globe className="h-5 w-5 text-gray-400" />
          )}
        </div>
        
        {data.geographicData && data.geographicData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Geographic Chart */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-navy-900">Top Countries by Traffic</h4>
              <div className="h-80">
                <ChartContainer
                  config={{
                    visitors: { label: "Visitors", color: "hsl(var(--color-turquoise))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.geographicData.slice(0, 8)} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="country" 
                        type="category" 
                        width={100}
                        tick={{ fontSize: 12 }}
                      />
                      <ChartTooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 border border-sand-beige-200 rounded-lg shadow-sm">
                                <p className="font-semibold text-navy-900">{data.country}</p>
                                <p className="text-sm text-gray-600">{data.visitors} visitors</p>
                                <p className="text-sm text-gray-600">{data.percentage}% of total traffic</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar 
                        dataKey="visitors" 
                        fill="var(--color-turquoise)"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>

            {/* Country List with Details */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-navy-900">Country Breakdown</h4>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {data.geographicData.map((country: any, index: number) => {
                  const getCountryFlag = (countryName: string) => {
                    // Simple flag emoji mapping for major countries
                    const flags: { [key: string]: string } = {
                      'Italy': '🇮🇹',
                      'Belgium': '🇧🇪',
                      'United States': '🇺🇸',
                      'France': '🇫🇷',
                      'Greece': '🇬🇷',
                      'India': '🇮🇳',
                      'Sri Lanka': '🇱🇰',
                      'Vietnam': '🇻🇳',
                      '(not set)': '🌍'
                    }
                    return flags[countryName] || '🌍'
                  }

                  const getCountryColor = (index: number) => {
                    const colors = [
                      'border-turquoise-200 bg-turquoise-50',
                      'border-coral-orange-200 bg-coral-orange-50',
                      'border-gold-200 bg-gold-50',
                      'border-emerald-200 bg-emerald-50',
                      'border-purple-200 bg-purple-50'
                    ]
                    return colors[index % colors.length]
                  }

                  return (
                    <div key={index} className={`p-4 rounded-lg border ${getCountryColor(index)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getCountryFlag(country.country)}</span>
                          <div>
                            <h5 className="font-semibold text-navy-900">
                              {country.country === '(not set)' ? 'Unknown Location' : country.country}
                            </h5>
                            <p className="text-sm text-gray-600">{country.visitors} visitors</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-navy-900">{country.percentage}%</div>
                          <div className="text-xs text-gray-500">of traffic</div>
                        </div>
                      </div>
                      
                      {/* Progress bar for country percentage */}
                      <div className="mt-3">
                        <div className="w-full bg-white rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-turquoise-500' :
                              index === 1 ? 'bg-coral-orange-500' :
                              index === 2 ? 'bg-gold-500' :
                              index === 3 ? 'bg-emerald-500' :
                              'bg-purple-500'
                            }`}
                            style={{ width: `${country.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center bg-sand-beige-50 rounded-lg">
            <div className="text-center">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No Geographic Data Available</p>
              <p className="text-sm text-gray-500">Geographic distribution data is not available at this time</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

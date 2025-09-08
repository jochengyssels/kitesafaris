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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, AreaChart, Area, ResponsiveContainer } from "recharts"

interface WebsiteAnalyticsProps {
  data: any
  dateRange: string
}

export function WebsiteAnalytics({ data, dateRange }: WebsiteAnalyticsProps) {
  const [selectedMetric, setSelectedMetric] = useState("visitors")
  const [selectedPeriod, setSelectedPeriod] = useState("daily")

  // Mock data for demonstration
  const dailyData = [
    { date: "2024-01-01", visitors: 1200, pageViews: 3400, sessions: 1100, bounceRate: 45, avgDuration: 165 },
    { date: "2024-01-02", visitors: 1350, pageViews: 3800, sessions: 1250, bounceRate: 42, avgDuration: 172 },
    { date: "2024-01-03", visitors: 1100, pageViews: 3200, sessions: 1000, bounceRate: 48, avgDuration: 158 },
    { date: "2024-01-04", visitors: 1500, pageViews: 4200, sessions: 1400, bounceRate: 40, avgDuration: 185 },
    { date: "2024-01-05", visitors: 1800, pageViews: 5100, sessions: 1700, bounceRate: 38, avgDuration: 195 },
    { date: "2024-01-06", visitors: 1600, pageViews: 4600, sessions: 1500, bounceRate: 41, avgDuration: 182 },
    { date: "2024-01-07", visitors: 1400, pageViews: 3900, sessions: 1300, bounceRate: 44, avgDuration: 175 },
  ]

  const weeklyData = [
    { week: "Week 1", visitors: 8400, pageViews: 23800, sessions: 7800, bounceRate: 43, avgDuration: 170 },
    { week: "Week 2", visitors: 9200, pageViews: 26100, sessions: 8500, bounceRate: 41, avgDuration: 175 },
    { week: "Week 3", visitors: 8800, pageViews: 24900, sessions: 8100, bounceRate: 44, avgDuration: 168 },
    { week: "Week 4", visitors: 9600, pageViews: 27200, sessions: 8900, bounceRate: 39, avgDuration: 180 },
  ]

  const topPages = [
    { page: "/", visitors: 2400, pageViews: 3400, bounceRate: 35, avgTime: "2:45", exitRate: 25 },
    { page: "/destinations/antigua", visitors: 1800, pageViews: 2200, bounceRate: 28, avgTime: "3:20", exitRate: 20 },
    { page: "/booking", visitors: 1200, pageViews: 1800, bounceRate: 45, avgTime: "4:15", exitRate: 35 },
    { page: "/destinations/sardinia", visitors: 900, pageViews: 1200, bounceRate: 32, avgTime: "2:55", exitRate: 22 },
    { page: "/blog", visitors: 750, pageViews: 1100, bounceRate: 55, avgTime: "1:45", exitRate: 40 },
    { page: "/destinations/greece", visitors: 650, pageViews: 900, bounceRate: 38, avgTime: "2:30", exitRate: 28 },
    { page: "/contact", visitors: 500, pageViews: 700, bounceRate: 42, avgTime: "2:10", exitRate: 30 },
    { page: "/fleet", visitors: 400, pageViews: 600, bounceRate: 48, avgTime: "1:55", exitRate: 35 },
  ]

  const trafficSources = [
    { source: "Organic Search", visitors: 5200, percentage: 42, trend: "up" },
    { source: "Direct", visitors: 3100, percentage: 25, trend: "up" },
    { source: "Social Media", visitors: 1800, percentage: 15, trend: "up" },
    { source: "Referral", visitors: 1200, percentage: 10, trend: "down" },
    { source: "Email", visitors: 800, percentage: 6, trend: "up" },
    { source: "Paid Search", visitors: 300, percentage: 2, trend: "down" },
  ]

  const deviceData = [
    { device: "Desktop", visitors: 8060, percentage: 65, avgDuration: "3:15", bounceRate: 38 },
    { device: "Mobile", visitors: 3472, percentage: 28, avgDuration: "1:45", bounceRate: 52 },
    { device: "Tablet", visitors: 868, percentage: 7, avgDuration: "2:30", bounceRate: 45 },
  ]

  const currentData = selectedPeriod === "daily" ? dailyData : weeklyData

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
                  <p className="text-2xl font-bold text-navy-900">
                    {metric.key === "avgDuration" 
                      ? `${Math.floor(currentValue / 60)}:${(currentValue % 60).toString().padStart(2, '0')}`
                      : metric.key === "bounceRate"
                      ? `${currentValue}%`
                      : currentValue.toLocaleString()
                    }
                  </p>
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
                </div>
                <Icon className={`h-8 w-8 ${metric.color}`} />
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

        <div className="h-80">
          <ChartContainer
            config={{
              [selectedMetric]: {
                label: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
                color: "hsl(var(--color-turquoise))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
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
        </div>
      </div>

      {/* Top Pages and Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Top Pages</h3>
            <ExternalLink className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-sand-beige-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-navy-900 truncate">{page.page}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>{page.visitors.toLocaleString()} visitors</span>
                    <span>{page.bounceRate}% bounce</span>
                    <span>{page.avgTime}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-turquoise-600">#{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Traffic Sources</h3>
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy-900">{source.source}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{source.visitors.toLocaleString()}</span>
                    <span className="text-sm font-bold text-turquoise-600">{source.percentage}%</span>
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
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Analytics */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-navy-900">Device Analytics</h3>
          <div className="flex items-center space-x-2">
            <Monitor className="h-5 w-5 text-gray-400" />
            <Smartphone className="h-5 w-5 text-gray-400" />
            <Tablet className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deviceData.map((device, index) => (
            <div key={index} className="text-center p-4 bg-sand-beige-50 rounded-lg">
              <div className="text-3xl font-bold text-navy-900 mb-2">{device.percentage}%</div>
              <div className="text-lg font-medium text-gray-700 mb-2">{device.device}</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>{device.visitors.toLocaleString()} visitors</div>
                <div>Avg: {device.avgDuration}</div>
                <div>Bounce: {device.bounceRate}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Data Placeholder */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-navy-900">Geographic Distribution</h3>
          <Globe className="h-5 w-5 text-gray-400" />
        </div>
        <div className="h-64 flex items-center justify-center bg-sand-beige-50 rounded-lg">
          <div className="text-center">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Geographic data visualization</p>
            <p className="text-sm text-gray-500">Map showing visitor locations would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Search,
  Users,
  Calendar,
  Download,
  Filter,
  BarChart3,
  LineChart,
} from "lucide-react"

interface SEOMetric {
  name: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ComponentType<{ className?: string }>
}

interface KeywordData {
  keyword: string
  position: number
  previousPosition: number
  searchVolume: number
  clicks: number
  impressions: number
  ctr: number
}

export function SEOReportingDashboard() {
  const [dateRange, setDateRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("organic-traffic")

  const metrics: SEOMetric[] = [
    {
      name: "Organic Traffic",
      value: "12,847",
      change: "+23.5%",
      trend: "up",
      icon: Users,
    },
    {
      name: "Avg. Position",
      value: "8.2",
      change: "-2.1",
      trend: "up",
      icon: TrendingUp,
    },
    {
      name: "Click-through Rate",
      value: "4.8%",
      change: "+0.7%",
      trend: "up",
      icon: MousePointer,
    },
    {
      name: "Impressions",
      value: "267,432",
      change: "+18.2%",
      trend: "up",
      icon: Eye,
    },
  ]

  const topKeywords: KeywordData[] = [
    {
      keyword: "caribbean kite safari",
      position: 3,
      previousPosition: 7,
      searchVolume: 2400,
      clicks: 1247,
      impressions: 8934,
      ctr: 13.9,
    },
    {
      keyword: "antigua kiteboarding",
      position: 5,
      previousPosition: 8,
      searchVolume: 1800,
      clicks: 892,
      impressions: 6721,
      ctr: 13.3,
    },
    {
      keyword: "luxury catamaran kite trip",
      position: 2,
      previousPosition: 2,
      searchVolume: 890,
      clicks: 567,
      impressions: 3245,
      ctr: 17.5,
    },
    {
      keyword: "caribbean kitesurfing vacation",
      position: 6,
      previousPosition: 12,
      searchVolume: 1200,
      clicks: 423,
      impressions: 4892,
      ctr: 8.6,
    },
  ]

  const recentOptimizations = [
    {
      date: "2024-01-15",
      page: "/destinations/antigua",
      change: "Meta title optimization",
      impact: "+15% CTR",
      status: "positive",
    },
    {
      date: "2024-01-14",
      page: "/packages",
      change: "Added structured data",
      impact: "+8% impressions",
      status: "positive",
    },
    {
      date: "2024-01-13",
      page: "/booking",
      change: "Image alt text optimization",
      impact: "+3% organic traffic",
      status: "positive",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const getPositionChange = (current: number, previous: number) => {
    const change = previous - current
    if (change > 0) {
      return { value: `+${change}`, color: "text-green-600", icon: TrendingUp }
    } else if (change < 0) {
      return { value: `${change}`, color: "text-red-600", icon: TrendingDown }
    }
    return { value: "0", color: "text-gray-600", icon: null }
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-montserrat font-bold text-2xl text-navy-900">SEO Performance Report</h2>
          <p className="text-gray-600 mt-1">Track your Caribbean kite safari SEO performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-sand-beige-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center space-x-2 bg-turquoise-500 hover:bg-turquoise-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{metric.name}</span>
              {metric.icon && <metric.icon className="h-5 w-5 text-gray-400" />}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-navy-900">{metric.value}</div>
                <div className="flex items-center space-x-1 mt-1">
                  {getTrendIcon(metric.trend)}
                  <span
                    className={`text-sm font-medium ${
                      metric.trend === "up"
                        ? "text-green-600"
                        : metric.trend === "down"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-montserrat font-semibold text-lg text-navy-900">Traffic Trends</h3>
            <div className="flex items-center space-x-2">
              <LineChart className="h-5 w-5 text-gray-400" />
              <select className="text-sm border border-sand-beige-300 rounded px-2 py-1">
                <option>Organic Traffic</option>
                <option>Impressions</option>
                <option>Click-through Rate</option>
              </select>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-sand-beige-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Traffic trend chart would be displayed here</p>
              <p className="text-sm text-gray-500">Showing {dateRange} data</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-montserrat font-semibold text-lg text-navy-900">Keyword Performance</h3>
            <button className="flex items-center space-x-2 text-turquoise-600 hover:text-turquoise-700 text-sm">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
          <div className="space-y-3">
            {topKeywords.slice(0, 5).map((keyword, index) => {
              const change = getPositionChange(keyword.position, keyword.previousPosition)
              const ChangeIcon = change.icon
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-sand-beige-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-navy-900">{keyword.keyword}</div>
                    <div className="text-sm text-gray-600">
                      {keyword.clicks.toLocaleString()} clicks • {keyword.ctr}% CTR
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-navy-900">#{keyword.position}</span>
                      {ChangeIcon && (
                        <div className="flex items-center space-x-1">
                          <ChangeIcon className={`h-3 w-3 ${change.color}`} />
                          <span className={`text-xs ${change.color}`}>{Math.abs(Number.parseInt(change.value))}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{keyword.searchVolume.toLocaleString()} vol.</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Optimizations */}
      <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
        <h3 className="font-montserrat font-semibold text-lg text-navy-900 mb-4">Recent Optimization Impact</h3>
        <div className="space-y-3">
          {recentOptimizations.map((opt, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-sand-beige-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{opt.date}</span>
                </div>
                <div>
                  <div className="font-medium text-navy-900">{opt.page}</div>
                  <div className="text-sm text-gray-600">{opt.change}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-green-600">{opt.impact}</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Keywords Table */}
      <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-montserrat font-semibold text-lg text-navy-900">Top Keywords Performance</h3>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search keywords..."
              className="border border-sand-beige-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-beige-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Keyword</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Position</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Change</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Clicks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Impressions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">CTR</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Volume</th>
              </tr>
            </thead>
            <tbody>
              {topKeywords.map((keyword, index) => {
                const change = getPositionChange(keyword.position, keyword.previousPosition)
                const ChangeIcon = change.icon
                return (
                  <tr key={index} className="border-b border-sand-beige-100 hover:bg-sand-beige-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-navy-900">{keyword.keyword}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-navy-900">#{keyword.position}</span>
                    </td>
                    <td className="py-3 px-4">
                      {ChangeIcon && (
                        <div className="flex items-center space-x-1">
                          <ChangeIcon className={`h-4 w-4 ${change.color}`} />
                          <span className={`text-sm ${change.color}`}>{change.value}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">{keyword.clicks.toLocaleString()}</td>
                    <td className="py-3 px-4">{keyword.impressions.toLocaleString()}</td>
                    <td className="py-3 px-4">{keyword.ctr}%</td>
                    <td className="py-3 px-4">{keyword.searchVolume.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Minus, Calendar, Search, MousePointer } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface SEOProgressionData {
  date: string
  seoScore: number
  totalKeywords: number
  organicTraffic: number
  avgPosition: number
  dataSource: string
}

interface SEOProgressionProps {
  dateRange?: string
}

export function SEOScoreProgression({ dateRange = "30d" }: SEOProgressionProps) {
  const [data, setData] = useState<SEOProgressionData[]>([])
  const [trends, setTrends] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90
      const response = await fetch(`/api/analytics/seo-progression?days=${days}`)
      const result = await response.json()
      
      if (result.success) {
        setData(result.data.chartData)
        setTrends(result.data.trends)
      } else {
        setError(result.error || 'Failed to fetch SEO progression data')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [dateRange])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-turquoise-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading SEO progression data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <div className="text-center">
          <div className="p-4 bg-red-100 rounded-full mb-4 inline-flex">
            <Search className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-navy-900 mb-2">Error Loading SEO Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-turquoise-600 text-white px-4 py-2 rounded-lg hover:bg-turquoise-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <div className="text-center">
          <div className="p-4 bg-gray-100 rounded-full mb-4 inline-flex">
            <Search className="h-8 w-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-navy-900 mb-2">No SEO Data Available</h3>
          <p className="text-gray-600">
            No historical SEO data found for the selected time period. 
            Data will appear here once analytics are collected over time.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-navy-900 mb-1">SEO Score Progression</h3>
          <p className="text-sm text-gray-600">
            Daily SEO performance over the last {dateRange}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{data.length} data points</span>
        </div>
      </div>

      {/* Trend Summary */}
      {trends && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">SEO Score</span>
              {getTrendIcon(trends.seoScore.trend)}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-navy-900">
                {trends.seoScore.current}
              </span>
              <span className={`text-sm font-medium ${getTrendColor(trends.seoScore.trend)}`}>
                {trends.seoScore.change > 0 ? '+' : ''}{trends.seoScore.change.toFixed(1)}
                ({trends.seoScore.changePercent > 0 ? '+' : ''}{trends.seoScore.changePercent.toFixed(1)}%)
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Total Keywords</span>
              {getTrendIcon(trends.keywords.trend)}
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-navy-900">
                {trends.keywords.current}
              </span>
              <span className={`text-sm font-medium ${getTrendColor(trends.keywords.trend)}`}>
                {trends.keywords.change > 0 ? '+' : ''}{trends.keywords.change}
                ({trends.keywords.changePercent > 0 ? '+' : ''}{trends.keywords.changePercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-64">
        <ChartContainer
          config={{
            seoScore: {
              label: "SEO Score",
              color: "hsl(var(--chart-1))",
            },
            totalKeywords: {
              label: "Keywords",
              color: "hsl(var(--chart-2))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#666"
                fontSize={12}
              />
              <YAxis 
                yAxisId="seo"
                orientation="left"
                stroke="#666"
                fontSize={12}
              />
              <YAxis 
                yAxisId="keywords"
                orientation="right"
                stroke="#666"
                fontSize={12}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [
                      name === 'seoScore' ? `${value} points` : `${value} keywords`,
                      name === 'seoScore' ? 'SEO Score' : 'Keywords'
                    ]}
                    labelFormatter={(label) => `Date: ${formatDate(label)}`}
                  />
                }
              />
              <Line
                yAxisId="seo"
                type="monotone"
                dataKey="seoScore"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ fill: "#0ea5e9", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#0ea5e9", strokeWidth: 2 }}
              />
              <Line
                yAxisId="keywords"
                type="monotone"
                dataKey="totalKeywords"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: "#10b981", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Data Source Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>SEO Score</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Keywords</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <MousePointer className="h-3 w-3" />
            <span>Hover for details</span>
          </div>
        </div>
      </div>
    </div>
  )
}

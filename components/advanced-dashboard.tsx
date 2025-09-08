"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { WebsiteAnalytics } from "@/components/website-analytics"
import { BusinessMetrics } from "@/components/business-metrics"
import { SEOInsights } from "@/components/seo-insights"
import { AutomatedAlerts } from "@/components/automated-alerts"
import { ExportReports } from "@/components/export-reports"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Search,
  AlertTriangle,
  Download,
  RefreshCw,
  Calendar,
  Filter
} from "lucide-react"

interface DashboardData {
  websiteMetrics: any
  businessMetrics: any
  seoInsights: any
  alerts: any[]
  lastUpdated: string
}

export function AdvancedDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("overview")
  const [refreshing, setRefreshing] = useState(false)

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "analytics", label: "Website Analytics", icon: TrendingUp },
    { id: "business", label: "Business Metrics", icon: DollarSign },
    { id: "seo", label: "SEO Insights", icon: Search },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
  ]

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true)
      const [websiteRes, businessRes, seoRes, alertsRes] = await Promise.all([
        fetch(`/api/analytics/website?range=${dateRange}`),
        fetch(`/api/analytics/business?range=${dateRange}`),
        fetch(`/api/analytics/seo?range=${dateRange}`),
        fetch(`/api/analytics/alerts?range=${dateRange}`)
      ])

      // Check if responses are ok before parsing JSON
      const responses = [
        { res: websiteRes, name: 'website' },
        { res: businessRes, name: 'business' },
        { res: seoRes, name: 'seo' },
        { res: alertsRes, name: 'alerts' }
      ]

      const parsedData = await Promise.all(
        responses.map(async ({ res, name }) => {
          try {
            if (!res.ok) {
              console.error(`${name} API error:`, res.status, res.statusText)
              return { success: false, data: null, error: `${res.status} ${res.statusText}` }
            }
            
            const text = await res.text()
            if (!text) {
              console.error(`${name} API returned empty response`)
              return { success: false, data: null, error: 'Empty response' }
            }
            
            const data = JSON.parse(text)
            return { success: true, data: data.data, source: data.source, note: data.note }
          } catch (parseError) {
            console.error(`Failed to parse ${name} API response:`, parseError)
            return { success: false, data: null, error: 'JSON parse error' }
          }
        })
      )

      const [websiteData, businessData, seoData, alertsData] = parsedData

      setDashboardData({
        websiteMetrics: websiteData.data,
        businessMetrics: businessData.data,
        seoInsights: seoData.data,
        alerts: alertsData.data || [],
        lastUpdated: new Date().toISOString()
      })
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [dateRange])

  const handleRefresh = () => {
    fetchDashboardData()
  }

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      const response = await fetch(`/api/analytics/export?format=${format}&range=${dateRange}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dashboardData)
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `kitesafaris-dashboard-${dateRange}-${new Date().toISOString().split('T')[0]}.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-turquoise-50 to-sand-beige-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-turquoise-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading dashboard data...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise-50 to-sand-beige-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-4xl text-navy-900 mb-2">
                Advanced Analytics Dashboard
              </h1>
              <p className="font-open-sans text-gray-600 text-sm sm:text-base">
                Comprehensive insights for data-driven decision making
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Date Range Selector */}
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-sand-beige-300 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-turquoise-500 focus:border-transparent w-full sm:w-auto"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-turquoise-600 text-white rounded-lg hover:bg-turquoise-700 disabled:opacity-50 transition-colors text-xs sm:text-sm"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              {/* Export Button */}
              <div className="relative group">
                <button className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors text-xs sm:text-sm w-full sm:w-auto">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-sand-beige-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <button
                    onClick={() => handleExport('csv')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sand-beige-50 rounded-t-lg"
                  >
                    Export CSV
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sand-beige-50 rounded-b-lg"
                  >
                    Export PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          {dashboardData && (
            <div className="text-sm text-gray-500">
              Last updated: {new Date(dashboardData.lastUpdated).toLocaleString()}
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-sand-beige-200">
            <nav className="-mb-px flex space-x-2 sm:space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1 sm:space-x-2 py-2 px-1 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-turquoise-500 text-turquoise-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && dashboardData && (
            <DashboardMetrics 
              websiteMetrics={dashboardData.websiteMetrics}
              businessMetrics={dashboardData.businessMetrics}
              seoInsights={dashboardData.seoInsights}
              alerts={dashboardData.alerts}
            />
          )}
          
          {activeTab === "analytics" && dashboardData && (
            <WebsiteAnalytics 
              data={dashboardData.websiteMetrics}
              dateRange={dateRange}
            />
          )}
          
          {activeTab === "business" && dashboardData && (
            <BusinessMetrics 
              data={dashboardData.businessMetrics}
              dateRange={dateRange}
            />
          )}
          
          {activeTab === "seo" && dashboardData && (
            <SEOInsights 
              data={dashboardData.seoInsights}
              dateRange={dateRange}
            />
          )}
          
          {activeTab === "alerts" && dashboardData && (
            <AutomatedAlerts 
              alerts={dashboardData.alerts}
              dateRange={dateRange}
            />
          )}
        </div>
      </main>
    </div>
  )
}

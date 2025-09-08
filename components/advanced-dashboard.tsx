"use client"

import { useState, useEffect, useCallback } from "react"
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
  Filter,
  XCircle
} from "lucide-react"

interface DashboardData {
  websiteMetrics: any
  businessMetrics: any
  seoInsights: any
  alerts: any[]
  lastUpdated: string
}

interface ApiResponse {
  success: boolean
  data: any
  error?: string
  source?: string
  note?: string
}

export function AdvancedDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("overview")
  const [refreshing, setRefreshing] = useState(false)
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({})
  const [hasData, setHasData] = useState(false)

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
      setApiErrors({})
      
      // Fetch both website and SEO data
      const [websiteResponse, seoResponse] = await Promise.all([
        fetch('/api/analytics/website'),
        fetch('/api/analytics/seo')
      ])
      
      const [websiteResult, seoResult] = await Promise.all([
        websiteResponse.json(),
        seoResponse.json()
      ])
      
      if (websiteResult.success && websiteResult.data) {
        const data = websiteResult.data
        // Transform traffic sources from object to array format
        const trafficSourcesArray = data.trafficSources ? Object.entries(data.trafficSources).map(([source, visitors]) => ({
          source: source.charAt(0).toUpperCase() + source.slice(1),
          visitors: visitors as number,
          percentage: Math.round(((visitors as number) / data.totalVisitors) * 100),
          trend: "up" // Default trend, could be calculated from historical data
        })) : []

        // Transform device breakdown from object to array format for website analytics
        const deviceDataArray = data.deviceBreakdown ? Object.entries(data.deviceBreakdown).map(([device, percentage]) => ({
          device: device.charAt(0).toUpperCase() + device.slice(1),
          percentage: percentage as number,
          visitors: Math.round((data.totalVisitors * (percentage as number)) / 100),
          avgDuration: device === 'desktop' ? '3:45' : device === 'mobile' ? '2:15' : '2:55',
          bounceRate: device === 'desktop' ? 38 : device === 'mobile' ? 52 : 45
        })) : []

        // Transform daily data for traffic trends chart
        const trafficData = data.dailyData ? data.dailyData.map((day: any) => ({
          date: day.date,
          visitors: day.visitors,
          pageViews: day.pageViews
        })) : []

        const websiteMetrics = {
          visitors: data.totalVisitors,
          pageViews: data.totalPageViews,
          sessions: data.totalSessions,
          bounceRate: data.bounceRate,
          avgSessionDuration: data.avgSessionDuration,
          newVisitors: data.newVisitors,
          returningVisitors: data.returningVisitors,
          deviceBreakdown: data.deviceBreakdown,
          deviceData: deviceDataArray,
          trafficSources: data.trafficSources,
          trafficSourcesArray: trafficSourcesArray,
          trafficData: trafficData,
          topPages: data.topPages,
          bottomPages: data.bottomPages,
          geographicData: data.geographicData,
          hourlyData: data.hourlyData,
          dailyData: data.dailyData,
          weeklyData: data.weeklyData || []
        }
        
        // Process SEO data if available
        let seoInsights = null
        if (seoResult.success && seoResult.data) {
          const seoData = seoResult.data
          seoInsights = {
            score: seoData.seoScore,
            totalKeywords: seoData.totalKeywords,
            organicTraffic: seoData.organicTraffic,
            avgPosition: seoData.avgPosition,
            keywordRankings: seoData.keywordRankings,
            seoIssues: seoData.seoIssues,
            contentOpportunities: seoData.contentOpportunities,
            backlinkData: seoData.backlinkData,
            rankingHistory: seoData.rankingHistory,
            pagePerformance: seoData.pagePerformance,
            positionGrowth: seoData.positionGrowth,
            keywordGrowth: seoData.keywordGrowth,
            trafficGrowth: seoData.trafficGrowth,
            seoGrowth: seoData.seoGrowth
          }
        }
        
        setDashboardData({
          websiteMetrics,
          businessMetrics: null,
          seoInsights,
          alerts: [],
          lastUpdated: new Date().toISOString()
        })
        setHasData(true)
        setLoading(false)
        console.log('Dashboard data fetch completed successfully')
      } else {
        throw new Error('Invalid API response')
      }

    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
      setApiErrors({ general: 'Failed to connect to analytics services' })
      setHasData(false)
      setLoading(false)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

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

  // Error state component
  const ErrorState = ({ title, message, icon: Icon }: { title: string, message: string, icon: any }) => (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-sand-beige-200 text-center">
      <div className="flex flex-col items-center">
        <div className="p-4 bg-red-100 rounded-full mb-4">
          <Icon className="h-8 w-8 text-red-600" />
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

  // Show error state if no data is available and there are API errors
  if (!hasData && Object.keys(apiErrors).length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-turquoise-50 to-sand-beige-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-4xl text-navy-900 mb-2">
              Advanced Analytics Dashboard
            </h1>
            <p className="font-open-sans text-gray-600 text-sm sm:text-base">
              Comprehensive insights for data-driven decision making
            </p>
          </div>
          
          <div className="space-y-6">
            <ErrorState 
              title="Unable to Load Analytics Data"
              message="We're currently unable to retrieve live analytics data. This could be due to API connectivity issues, missing data sources, or service unavailability. Please try refreshing the page or contact support if the issue persists."
              icon={AlertTriangle}
            />
            
            {Object.keys(apiErrors).length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
                <h3 className="text-lg font-semibold text-navy-900 mb-4">Service Status</h3>
                <div className="space-y-3">
                  {Object.entries(apiErrors).map(([service, error]) => (
                    <div key={service} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="font-medium text-navy-900 capitalize">{service} Analytics</span>
                      </div>
                      <span className="text-sm text-red-600">{error}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
          {activeTab === "overview" && (
            <DashboardMetrics 
              websiteMetrics={dashboardData?.websiteMetrics}
              businessMetrics={dashboardData?.businessMetrics}
              seoInsights={dashboardData?.seoInsights}
              alerts={dashboardData?.alerts || []}
              apiErrors={apiErrors}
            />
          )}
          
          {activeTab === "analytics" && (
            <WebsiteAnalytics 
              data={dashboardData?.websiteMetrics}
              dateRange={dateRange}
              apiError={apiErrors.website}
            />
          )}
          
          {activeTab === "business" && (
            <BusinessMetrics 
              data={dashboardData?.businessMetrics}
              dateRange={dateRange}
              apiError={apiErrors.business}
            />
          )}
          
          {activeTab === "seo" && (
            <SEOInsights 
              data={dashboardData?.seoInsights}
              dateRange={dateRange}
              apiError={apiErrors.seo}
            />
          )}
          
          {activeTab === "alerts" && (
            <AutomatedAlerts 
              alerts={dashboardData?.alerts || []}
              dateRange={dateRange}
              apiError={apiErrors.alerts}
            />
          )}
        </div>
      </main>
    </div>
  )
}

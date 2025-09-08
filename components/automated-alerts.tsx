"use client"

import { useState } from "react"
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  Globe,
  Users,
  DollarSign,
  Search,
  Eye,
  MousePointer,
  Calendar,
  Filter,
  Bell,
  BellOff
} from "lucide-react"

interface AutomatedAlertsProps {
  alerts: any[]
  dateRange: string
}

export function AutomatedAlerts({ alerts, dateRange }: AutomatedAlertsProps) {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")

  // Mock data for demonstration
  const mockAlerts = [
    {
      id: "alert-001",
      type: "traffic_spike",
      severity: "high",
      title: "Traffic Spike Detected",
      description: "Website traffic increased by 150% compared to yesterday",
      timestamp: "2024-01-15T10:30:00Z",
      status: "active",
      category: "performance",
      details: {
        currentTraffic: 2400,
        previousTraffic: 960,
        change: 150,
        source: "Organic Search"
      },
      recommendations: [
        "Monitor server performance to handle increased load",
        "Check if this is due to viral content or external promotion",
        "Consider scaling resources if traffic continues"
      ]
    },
    {
      id: "alert-002",
      type: "ranking_drop",
      severity: "medium",
      title: "Keyword Ranking Drop",
      description: "Main keyword 'kite safari antigua' dropped from position 3 to 8",
      timestamp: "2024-01-14T15:45:00Z",
      status: "active",
      category: "seo",
      details: {
        keyword: "kite safari antigua",
        previousPosition: 3,
        currentPosition: 8,
        change: -5,
        estimatedTrafficLoss: 400
      },
      recommendations: [
        "Check for recent algorithm updates",
        "Review page content and technical SEO",
        "Analyze competitor changes",
        "Consider content updates or link building"
      ]
    },
    {
      id: "alert-003",
      type: "conversion_drop",
      severity: "high",
      title: "Booking Conversion Rate Drop",
      description: "Booking conversion rate dropped from 3.2% to 2.1% this week",
      timestamp: "2024-01-13T09:15:00Z",
      status: "resolved",
      category: "business",
      details: {
        previousRate: 3.2,
        currentRate: 2.1,
        change: -1.1,
        estimatedRevenueLoss: 8500
      },
      recommendations: [
        "Review booking flow for technical issues",
        "Check for changes in traffic quality",
        "Analyze user behavior on booking pages",
        "Test booking form functionality"
      ]
    },
    {
      id: "alert-004",
      type: "page_speed",
      severity: "medium",
      title: "Page Speed Degradation",
      description: "Homepage loading time increased from 2.1s to 4.3s",
      timestamp: "2024-01-12T14:20:00Z",
      status: "active",
      category: "technical",
      details: {
        page: "/",
        previousSpeed: 2.1,
        currentSpeed: 4.3,
        change: 2.2,
        impact: "High bounce rate increase expected"
      },
      recommendations: [
        "Optimize images and media files",
        "Check for new third-party scripts",
        "Review server response times",
        "Consider CDN implementation"
      ]
    },
    {
      id: "alert-005",
      type: "backlink_lost",
      severity: "low",
      title: "High-Value Backlink Lost",
      description: "Lost backlink from kiteboarding.com (DR: 85)",
      timestamp: "2024-01-11T11:30:00Z",
      status: "active",
      category: "seo",
      details: {
        domain: "kiteboarding.com",
        domainRating: 85,
        linkType: "dofollow",
        estimatedImpact: "Minor ranking impact"
      },
      recommendations: [
        "Reach out to site owner to restore link",
        "Create new content to attract similar links",
        "Focus on building relationships with industry sites"
      ]
    },
    {
      id: "alert-006",
      type: "error_rate",
      severity: "high",
      title: "High Error Rate Detected",
      description: "404 error rate increased to 8.2% (normal: <2%)",
      timestamp: "2024-01-10T16:45:00Z",
      status: "resolved",
      category: "technical",
      details: {
        errorRate: 8.2,
        normalRate: 2.0,
        change: 6.2,
        affectedPages: ["/old-booking", "/legacy-trips"]
      },
      recommendations: [
        "Set up proper redirects for moved pages",
        "Update internal links",
        "Monitor error logs regularly",
        "Implement 404 page improvements"
      ]
    },
    {
      id: "alert-007",
      type: "competitor_activity",
      severity: "medium",
      title: "Competitor Content Activity",
      description: "Competitor published new kiteboarding guide targeting your keywords",
      timestamp: "2024-01-09T13:15:00Z",
      status: "active",
      category: "competitive",
      details: {
        competitor: "KiteAdventures.com",
        content: "Complete Kiteboarding Guide 2024",
        keywords: ["kiteboarding guide", "kiteboarding tips"],
        estimatedImpact: "Potential traffic competition"
      },
      recommendations: [
        "Analyze competitor content strategy",
        "Create superior content on same topics",
        "Monitor their ranking progress",
        "Consider content partnerships"
      ]
    },
    {
      id: "alert-008",
      type: "seasonal_trend",
      severity: "low",
      title: "Seasonal Traffic Pattern",
      description: "Antigua destination page traffic up 40% (seasonal trend)",
      timestamp: "2024-01-08T10:00:00Z",
      status: "active",
      category: "trend",
      details: {
        page: "/destinations/antigua",
        trafficIncrease: 40,
        season: "Winter",
        expectedDuration: "3 months"
      },
      recommendations: [
        "Optimize content for winter season",
        "Increase marketing budget for this destination",
        "Prepare for increased booking inquiries",
        "Update seasonal pricing if needed"
      ]
    }
  ]

  const alertTypes = [
    { value: "all", label: "All Alerts", icon: Bell },
    { value: "performance", label: "Performance", icon: Zap },
    { value: "seo", label: "SEO", icon: Search },
    { value: "business", label: "Business", icon: DollarSign },
    { value: "technical", label: "Technical", icon: Globe },
    { value: "competitive", label: "Competitive", icon: Users },
    { value: "trend", label: "Trends", icon: TrendingUp },
  ]

  const severityLevels = [
    { value: "all", label: "All Severities", color: "gray" },
    { value: "high", label: "High", color: "red" },
    { value: "medium", label: "Medium", color: "yellow" },
    { value: "low", label: "Low", color: "green" },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-100 border-red-200"
      case "medium": return "text-yellow-600 bg-yellow-100 border-yellow-200"
      case "low": return "text-green-600 bg-green-100 border-green-200"
      default: return "text-gray-600 bg-gray-100 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-red-600 bg-red-100"
      case "resolved": return "text-green-600 bg-green-100"
      case "acknowledged": return "text-blue-600 bg-blue-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "performance": return Zap
      case "seo": return Search
      case "business": return DollarSign
      case "technical": return Globe
      case "competitive": return Users
      case "trend": return TrendingUp
      default: return AlertTriangle
    }
  }

  const filteredAlerts = mockAlerts.filter(alert => {
    const typeMatch = selectedFilter === "all" || alert.category === selectedFilter
    const severityMatch = selectedSeverity === "all" || alert.severity === selectedSeverity
    return typeMatch && severityMatch
  })

  const alertStats = {
    total: mockAlerts.length,
    active: mockAlerts.filter(a => a.status === "active").length,
    resolved: mockAlerts.filter(a => a.status === "resolved").length,
    high: mockAlerts.filter(a => a.severity === "high").length,
    medium: mockAlerts.filter(a => a.severity === "medium").length,
    low: mockAlerts.filter(a => a.severity === "low").length,
  }

  return (
    <div className="space-y-6">
      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold text-navy-900">{alertStats.total}</p>
            </div>
            <Bell className="h-6 w-6 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-red-600">{alertStats.active}</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{alertStats.resolved}</p>
            </div>
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">{alertStats.high}</p>
            </div>
            <XCircle className="h-6 w-6 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medium</p>
              <p className="text-2xl font-bold text-yellow-600">{alertStats.medium}</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low</p>
              <p className="text-2xl font-bold text-green-600">{alertStats.low}</p>
            </div>
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-sand-beige-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-sand-beige-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
            >
              {alertTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="border border-sand-beige-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
            >
              {severityLevels.map((level) => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-500">
            Showing {filteredAlerts.length} of {mockAlerts.length} alerts
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const CategoryIcon = getCategoryIcon(alert.category)
          
          return (
            <div key={alert.id} className="bg-white rounded-lg p-6 shadow-sm border border-sand-beige-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-sand-beige-100 rounded-lg">
                    <CategoryIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-navy-900">{alert.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{alert.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Details */}
              <div className="bg-sand-beige-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-navy-900 mb-3">Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(alert.details).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="font-medium text-navy-900">
                        {typeof value === 'number' && key.includes('change') 
                          ? (value > 0 ? `+${value}` : value)
                          : typeof value === 'number' && key.includes('Rate')
                          ? `${value}%`
                          : typeof value === 'number' && key.includes('Traffic')
                          ? value.toLocaleString()
                          : typeof value === 'number' && key.includes('Loss')
                          ? `€${value.toLocaleString()}`
                          : typeof value === 'number' && key.includes('Speed')
                          ? `${value}s`
                          : String(value)
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-medium text-navy-900 mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {alert.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-sand-beige-200">
                {alert.status === "active" && (
                  <>
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                      Acknowledge
                    </button>
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                      Mark Resolved
                    </button>
                  </>
                )}
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* No Alerts State */}
      {filteredAlerts.length === 0 && (
        <div className="bg-white rounded-lg p-12 shadow-sm border border-sand-beige-200 text-center">
          <BellOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-navy-900 mb-2">No Alerts Found</h3>
          <p className="text-gray-600">No alerts match your current filters. Try adjusting your filter criteria.</p>
        </div>
      )}
    </div>
  )
}

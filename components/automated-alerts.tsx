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
  apiError?: string
}

export function AutomatedAlerts({ alerts, dateRange, apiError }: AutomatedAlertsProps) {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")

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

  // Check if we have real data
  const hasData = !apiError

  // If no data is available, show error state
  if (!hasData) {
    return (
      <div className="space-y-6">
        <ErrorState 
          title="Alerts Data Unavailable"
          message={apiError || "We're currently unable to retrieve alerts data. This could be due to API connectivity issues, missing data sources, or service unavailability."}
        />
      </div>
    )
  }

  // Use real alerts data from API
  const realAlerts = alerts || []

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

  const filteredAlerts = realAlerts.filter(alert => {
    const typeMatch = selectedFilter === "all" || alert.category === selectedFilter
    const severityMatch = selectedSeverity === "all" || alert.severity === selectedSeverity
    return typeMatch && severityMatch
  })

  const alertStats = {
    total: realAlerts.length,
    active: realAlerts.filter(a => a.status === "active").length,
    resolved: realAlerts.filter(a => a.status === "resolved").length,
    high: realAlerts.filter(a => a.severity === "high").length,
    medium: realAlerts.filter(a => a.severity === "medium").length,
    low: realAlerts.filter(a => a.severity === "low").length,
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
            Showing {filteredAlerts.length} of {realAlerts.length} alerts
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

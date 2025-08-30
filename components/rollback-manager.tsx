"use client"

import { useState } from "react"
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Search,
  Calendar,
  TrendingDown,
  TrendingUp,
  FileText,
  ImageIcon,
  BarChart3,
} from "lucide-react"

interface RollbackItem {
  id: string
  changeId: string
  type: "meta" | "image" | "schema" | "link" | "content"
  page: string
  description: string
  appliedAt: string
  appliedBy: string
  beforeValue: string
  afterValue: string
  performanceImpact: {
    metric: string
    change: string
    trend: "positive" | "negative" | "neutral"
  }
  canRollback: boolean
  rollbackReason?: string
}

export function RollbackManager() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [filterType, setFilterType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const rollbackItems: RollbackItem[] = [
    {
      id: "rb_001",
      changeId: "change_001",
      type: "meta",
      page: "/destinations/antigua",
      description: 'Updated meta title to target "Caribbean Kite Safari Antigua"',
      appliedAt: "2024-01-15T10:30:00Z",
      appliedBy: "SEO Agent",
      beforeValue: "Antigua Destination - KiteSafaris",
      afterValue: "Caribbean Kite Safari Antigua | 7-Day Luxury Catamaran Trip | KiteSafaris",
      performanceImpact: {
        metric: "CTR",
        change: "+15.2%",
        trend: "positive",
      },
      canRollback: true,
    },
    {
      id: "rb_002",
      changeId: "change_002",
      type: "schema",
      page: "/packages",
      description: "Added structured data for travel events and booking actions",
      appliedAt: "2024-01-14T14:20:00Z",
      appliedBy: "SEO Agent",
      beforeValue: "No structured data",
      afterValue: "JSON-LD schema for TravelEvent and BookingAction",
      performanceImpact: {
        metric: "Impressions",
        change: "+8.7%",
        trend: "positive",
      },
      canRollback: true,
    },
    {
      id: "rb_003",
      changeId: "change_003",
      type: "image",
      page: "/booking",
      description: "Optimized alt text for hero image with target keywords",
      appliedAt: "2024-01-13T09:15:00Z",
      appliedBy: "SEO Agent",
      beforeValue: "Catamaran sailing",
      afterValue: "Luxury catamaran Caribbean kite safari Antigua kiteboarding adventure",
      performanceImpact: {
        metric: "Organic Traffic",
        change: "+3.1%",
        trend: "positive",
      },
      canRollback: true,
    },
    {
      id: "rb_004",
      changeId: "change_004",
      type: "content",
      page: "/why-us",
      description: "Updated heading structure for better keyword targeting",
      appliedAt: "2024-01-12T16:45:00Z",
      appliedBy: "SEO Agent",
      beforeValue: "Why Choose Us",
      afterValue: "Why Choose Our Caribbean Kite Safari Experience",
      performanceImpact: {
        metric: "Position",
        change: "-2.3",
        trend: "negative",
      },
      canRollback: true,
      rollbackReason: "Negative impact on search rankings",
    },
  ]

  const filteredItems = rollbackItems.filter((item) => {
    const matchesType = filterType === "all" || item.type === filterType
    const matchesSearch =
      item.page.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item.id))
    }
  }

  const handleBulkRollback = () => {
    setShowConfirmDialog(true)
  }

  const confirmRollback = () => {
    // Simulate rollback process
    console.log("Rolling back items:", selectedItems)
    setSelectedItems([])
    setShowConfirmDialog(false)
    // In real implementation, this would call the rollback API
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meta":
        return FileText
      case "image":
        return ImageIcon
      case "schema":
        return BarChart3
      case "content":
        return FileText
      default:
        return FileText
    }
  }

  const getPerformanceIcon = (trend: string) => {
    switch (trend) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const getPerformanceColor = (trend: string) => {
    switch (trend) {
      case "positive":
        return "text-green-600 bg-green-50"
      case "negative":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-montserrat font-bold text-2xl text-navy-900">Rollback Manager</h2>
          <p className="text-gray-600 mt-1">Manage and rollback SEO optimizations</p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedItems.length > 0 && (
            <button
              onClick={handleBulkRollback}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Rollback Selected ({selectedItems.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-sand-beige-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="meta">Meta Tags</option>
                <option value="image">Images</option>
                <option value="schema">Schema</option>
                <option value="content">Content</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search changes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-sand-beige-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
              onChange={handleSelectAll}
              className="rounded border-sand-beige-300 text-turquoise-500 focus:ring-turquoise-500"
            />
            <span className="text-sm text-gray-600">Select All</span>
          </div>
        </div>
      </div>

      {/* Rollback Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const TypeIcon = getTypeIcon(item.type)
          const isSelected = selectedItems.includes(item.id)

          return (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-sm border transition-all ${
                isSelected ? "border-turquoise-500 ring-2 ring-turquoise-100" : "border-sand-beige-200"
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectItem(item.id)}
                      className="mt-1 rounded border-sand-beige-300 text-turquoise-500 focus:ring-turquoise-500"
                    />
                    <TypeIcon className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-navy-900">{item.page}</h3>
                        <span className="px-2 py-1 bg-sand-beige-100 text-sand-beige-800 rounded text-xs font-medium">
                          {item.type}
                        </span>
                        {item.rollbackReason && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium flex items-center space-x-1">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Recommended</span>
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{item.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Before:</span>
                          <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded text-sm text-gray-800">
                            {item.beforeValue}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">After:</span>
                          <div className="mt-1 p-2 bg-green-50 border border-green-200 rounded text-sm text-gray-800">
                            {item.afterValue}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(item.appliedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(item.appliedAt).toLocaleTimeString()}</span>
                          </div>
                          <span>by {item.appliedBy}</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div
                            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(item.performanceImpact.trend)}`}
                          >
                            {getPerformanceIcon(item.performanceImpact.trend)}
                            <span>
                              {item.performanceImpact.metric}: {item.performanceImpact.change}
                            </span>
                          </div>

                          <button
                            className="p-2 text-turquoise-600 hover:bg-turquoise-50 rounded transition-colors"
                            title="Preview change"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleSelectItem(item.id)}
                            disabled={!item.canRollback}
                            className="flex items-center space-x-2 px-3 py-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white rounded text-sm transition-colors"
                          >
                            <RotateCcw className="h-4 w-4" />
                            <span>Rollback</span>
                          </button>
                        </div>
                      </div>

                      {item.rollbackReason && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <span className="text-sm font-medium text-amber-800">Rollback Recommended:</span>
                          </div>
                          <p className="text-sm text-amber-700 mt-1">{item.rollbackReason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-montserrat font-semibold text-lg text-navy-900">Confirm Rollback</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to rollback {selectedItems.length} selected change
                {selectedItems.length !== 1 ? "s" : ""}? This action will restore the previous values and cannot be
                undone.
              </p>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRollback}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Confirm Rollback</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Changes</p>
              <p className="text-2xl font-bold text-navy-900">{rollbackItems.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-turquoise-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Positive Impact</p>
              <p className="text-2xl font-bold text-green-600">
                {rollbackItems.filter((item) => item.performanceImpact.trend === "positive").length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Needs Review</p>
              <p className="text-2xl font-bold text-red-600">
                {rollbackItems.filter((item) => item.rollbackReason).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

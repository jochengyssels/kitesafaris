"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Filter, Search, ChevronDown } from "lucide-react"
import type { OptimizationChange } from "@/lib/seo-optimization-service"

interface BulkApprovalPanelProps {
  changes: OptimizationChange[]
  onBulkApprove: (changeIds: string[]) => void
  onBulkReject: (changeIds: string[]) => void
  onFilterChange: (filters: ChangeFilters) => void
}

interface ChangeFilters {
  type?: string
  impact?: string
  status?: string
  page?: string
  searchTerm?: string
}

export function BulkApprovalPanel({ changes, onBulkApprove, onBulkReject, onFilterChange }: BulkApprovalPanelProps) {
  const [selectedChanges, setSelectedChanges] = useState<string[]>([])
  const [filters, setFilters] = useState<ChangeFilters>({})
  const [showFilters, setShowFilters] = useState(false)

  const handleSelectAll = () => {
    if (selectedChanges.length === filteredChanges.length) {
      setSelectedChanges([])
    } else {
      setSelectedChanges(filteredChanges.map((c) => c.id))
    }
  }

  const handleSelectChange = (changeId: string) => {
    setSelectedChanges((prev) => (prev.includes(changeId) ? prev.filter((id) => id !== changeId) : [...prev, changeId]))
  }

  const handleFilterUpdate = (newFilters: Partial<ChangeFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const filteredChanges = changes.filter((change) => {
    if (filters.type && change.type !== filters.type) return false
    if (filters.impact && change.impact !== filters.impact) return false
    if (filters.status && change.status !== filters.status) return false
    if (filters.page && !change.page.includes(filters.page)) return false
    if (filters.searchTerm && !change.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false
    return true
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-coral-orange-600 bg-coral-orange-50"
      case "medium":
        return "text-gold-600 bg-gold-50"
      case "low":
        return "text-turquoise-600 bg-turquoise-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50"
      case "rejected":
        return "text-red-600 bg-red-50"
      case "applied":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200">
      {/* Header */}
      <div className="p-4 border-b border-sand-beige-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-montserrat font-semibold text-lg text-navy-900">
            Bulk Change Management ({filteredChanges.length})
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-turquoise-600 hover:text-turquoise-700 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filters</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-sand-beige-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search changes..."
                  value={filters.searchTerm || ""}
                  onChange={(e) => handleFilterUpdate({ searchTerm: e.target.value })}
                  className="pl-10 pr-3 py-2 border border-sand-beige-300 rounded text-sm w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={filters.type || ""}
                onChange={(e) => handleFilterUpdate({ type: e.target.value || undefined })}
                className="w-full p-2 border border-sand-beige-300 rounded text-sm"
              >
                <option value="">All Types</option>
                <option value="meta">Meta Tags</option>
                <option value="image">Images</option>
                <option value="schema">Schema</option>
                <option value="content">Content</option>
                <option value="link">Links</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
              <select
                value={filters.impact || ""}
                onChange={(e) => handleFilterUpdate({ impact: e.target.value || undefined })}
                className="w-full p-2 border border-sand-beige-300 rounded text-sm"
              >
                <option value="">All Impact</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status || ""}
                onChange={(e) => handleFilterUpdate({ status: e.target.value || undefined })}
                className="w-full p-2 border border-sand-beige-300 rounded text-sm"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="applied">Applied</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page</label>
              <input
                type="text"
                placeholder="Filter by page..."
                value={filters.page || ""}
                onChange={(e) => handleFilterUpdate({ page: e.target.value })}
                className="w-full p-2 border border-sand-beige-300 rounded text-sm"
              />
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedChanges.length > 0 && (
          <div className="flex items-center justify-between mt-4 p-3 bg-turquoise-50 border border-turquoise-200 rounded">
            <span className="text-sm font-medium text-turquoise-800">
              {selectedChanges.length} change{selectedChanges.length !== 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onBulkReject(selectedChanges)}
                className="flex items-center space-x-1 px-3 py-1 text-red-600 border border-red-300 rounded text-sm hover:bg-red-50 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                <span>Reject Selected</span>
              </button>
              <button
                onClick={() => onBulkApprove(selectedChanges)}
                className="flex items-center space-x-1 px-3 py-1 bg-coral-orange-500 text-white rounded text-sm hover:bg-coral-orange-600 transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Approve Selected</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Changes List */}
      <div className="max-h-96 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-sand-beige-50 sticky top-0">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedChanges.length === filteredChanges.length && filteredChanges.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-sand-beige-300"
                />
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Change</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Page</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Type</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Impact</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredChanges.map((change) => (
              <tr key={change.id} className="border-b border-sand-beige-100 hover:bg-sand-beige-25">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedChanges.includes(change.id)}
                    onChange={() => handleSelectChange(change.id)}
                    className="rounded border-sand-beige-300"
                  />
                </td>
                <td className="p-3">
                  <div className="text-sm font-medium text-navy-900">{change.description}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {change.before.length > 50 ? change.before.substring(0, 50) + "..." : change.before} →{" "}
                    {change.after.length > 50 ? change.after.substring(0, 50) + "..." : change.after}
                  </div>
                </td>
                <td className="p-3 text-sm text-gray-700">{change.page}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">{change.type}</span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(change.impact)}`}>
                    {change.impact}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(change.status)}`}>
                    {change.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredChanges.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No changes match the current filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

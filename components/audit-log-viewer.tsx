"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Search,
  Filter,
  Calendar,
  User,
  Activity,
  Eye,
  Download,
  RefreshCw,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Plus,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { tripDataService, type AuditLog } from "@/lib/trip-data-service"

interface AuditFilters {
  action: string
  entityType: string
  entityId: string
  userId: string
  dateFrom: string
  dateTo: string
  searchQuery: string
}

export function AuditLogViewer() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [filters, setFilters] = useState<AuditFilters>({
    action: "all",
    entityType: "all",
    entityId: "",
    userId: "",
    dateFrom: "",
    dateTo: "",
    searchQuery: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load initial audit logs
    setAuditLogs(tripDataService.getAllAuditLogs())

    // Subscribe to real-time updates
    const unsubscribe = tripDataService.onAuditLogsUpdate((updatedLogs) => {
      setAuditLogs(updatedLogs)
    })

    return unsubscribe
  }, [])

  const filteredLogs = useMemo(() => {
    let filtered = auditLogs

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (log) =>
          log.description.toLowerCase().includes(query) ||
          log.entityId.toLowerCase().includes(query) ||
          log.userId.toLowerCase().includes(query) ||
          log.userEmail.toLowerCase().includes(query),
      )
    }

    if (filters.action !== "all") {
      filtered = filtered.filter((log) => log.action === filters.action)
    }

    if (filters.entityType !== "all") {
      filtered = filtered.filter((log) => log.entityType === filters.entityType)
    }

    if (filters.entityId) {
      filtered = filtered.filter((log) => log.entityId.includes(filters.entityId))
    }

    if (filters.userId) {
      filtered = filtered.filter((log) => log.userId.includes(filters.userId))
    }

    if (filters.dateFrom) {
      filtered = filtered.filter((log) => new Date(log.timestamp) >= new Date(filters.dateFrom))
    }

    if (filters.dateTo) {
      filtered = filtered.filter((log) => new Date(log.timestamp) <= new Date(filters.dateTo))
    }

    return filtered
  }, [auditLogs, filters])

  const getActionIcon = (action: AuditLog["action"]) => {
    switch (action) {
      case "trip_created":
        return <Plus className="w-4 h-4 text-green-600" />
      case "trip_updated":
        return <Edit className="w-4 h-4 text-blue-600" />
      case "trip_deleted":
        return <Trash2 className="w-4 h-4 text-red-600" />
      case "booking_created":
        return <CheckCircle className="w-4 h-4 text-turquoise-600" />
      case "booking_cancelled":
        return <AlertTriangle className="w-4 h-4 text-coral-orange-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getActionBadge = (action: AuditLog["action"]) => {
    const configs = {
      trip_created: { color: "bg-green-100 text-green-800 border-green-200", label: "Trip Created" },
      trip_updated: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Trip Updated" },
      trip_deleted: { color: "bg-red-100 text-red-800 border-red-200", label: "Trip Deleted" },
      booking_created: { color: "bg-turquoise-100 text-turquoise-800 border-turquoise-200", label: "Booking Created" },
      booking_cancelled: {
        color: "bg-coral-orange-100 text-coral-orange-800 border-coral-orange-200",
        label: "Booking Cancelled",
      },
      system_event: { color: "bg-gray-100 text-gray-800 border-gray-200", label: "System Event" },
    }

    const config = configs[action] || configs.system_event
    return (
      <Badge className={config.color}>
        {getActionIcon(action)}
        <span className="ml-1">{config.label}</span>
      </Badge>
    )
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const exportAuditLogs = () => {
    const csvHeaders = ["Timestamp", "Action", "Entity Type", "Entity ID", "User", "Description", "IP Address"]

    const csvData = filteredLogs.map((log) => [
      log.timestamp,
      log.action,
      log.entityType,
      log.entityId,
      log.userEmail,
      log.description,
      log.ipAddress || "",
    ])

    const csvContent = [csvHeaders, ...csvData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const refreshLogs = () => {
    setIsLoading(true)
    setTimeout(() => {
      setAuditLogs(tripDataService.getAllAuditLogs())
      setIsLoading(false)
    }, 500)
  }

  const resetFilters = () => {
    setFilters({
      action: "all",
      entityType: "all",
      entityId: "",
      userId: "",
      dateFrom: "",
      dateTo: "",
      searchQuery: "",
    })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.action !== "all") count++
    if (filters.entityType !== "all") count++
    if (filters.entityId) count++
    if (filters.userId) count++
    if (filters.dateFrom) count++
    if (filters.dateTo) count++
    if (filters.searchQuery) count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()
  const statistics = tripDataService.getStatistics()

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="font-montserrat font-bold text-2xl text-navy-900">Audit Log</h2>
          <p className="font-open-sans text-gray-600">Track all system activities and changes</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={refreshLogs}
            disabled={isLoading}
            className="border-sand-beige-300 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportAuditLogs} className="border-sand-beige-300 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export ({filteredLogs.length})
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-sand-beige-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-navy-900">{statistics.totalTrips}</p>
              </div>
              <Activity className="w-8 h-8 text-turquoise-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-sand-beige-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last 24 Hours</p>
                <p className="text-2xl font-bold text-navy-900">{statistics.last24Hours}</p>
              </div>
              <Clock className="w-8 h-8 text-coral-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-sand-beige-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last 7 Days</p>
                <p className="text-2xl font-bold text-navy-900">{statistics.last7Days}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-sand-beige-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Level</p>
                <p className="text-2xl font-bold text-green-600">High</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-sand-beige-200">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by description, entity ID, or user..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    className="pl-10 border-sand-beige-300"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="border-sand-beige-300 bg-transparent">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                      {activeFilterCount > 0 && (
                        <Badge className="ml-2 bg-turquoise-100 text-turquoise-800 text-xs">{activeFilterCount}</Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-montserrat font-semibold text-navy-900">Filter Audit Logs</h4>
                        {activeFilterCount > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            Reset
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm font-medium">Action</Label>
                          <Select
                            value={filters.action}
                            onValueChange={(value) => setFilters({ ...filters, action: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Actions</SelectItem>
                              <SelectItem value="trip_created">Trip Created</SelectItem>
                              <SelectItem value="trip_updated">Trip Updated</SelectItem>
                              <SelectItem value="trip_deleted">Trip Deleted</SelectItem>
                              <SelectItem value="booking_created">Booking Created</SelectItem>
                              <SelectItem value="booking_cancelled">Booking Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Entity Type</Label>
                          <Select
                            value={filters.entityType}
                            onValueChange={(value) => setFilters({ ...filters, entityType: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="trip">Trip</SelectItem>
                              <SelectItem value="booking">Booking</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Date Range</Label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <Input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                            className="h-8 text-sm"
                          />
                          <Input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                            className="h-8 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Entity ID</Label>
                        <Input
                          placeholder="Filter by entity ID"
                          value={filters.entityId}
                          onChange={(e) => setFilters({ ...filters, entityId: e.target.value })}
                          className="h-8 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card className="border-sand-beige-200">
        <CardHeader>
          <CardTitle className="font-montserrat flex items-center gap-2">
            <Activity className="w-5 h-5 text-turquoise-600" />
            Audit Events ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No audit logs found matching your criteria</p>
                {activeFilterCount > 0 && (
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="mt-3 border-sand-beige-300 bg-transparent"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="border border-sand-beige-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => setSelectedLog(log)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getActionBadge(log.action)}
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                      <p className="font-medium text-navy-900 mb-1">{log.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {log.userEmail}
                        </span>
                        <span>Entity: {log.entityId}</span>
                        {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Detail Modal */}
      {selectedLog && (
        <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-montserrat text-xl text-navy-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-turquoise-600" />
                Audit Log Details
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Action</Label>
                  <div className="mt-1">{getActionBadge(selectedLog.action)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Timestamp</Label>
                  <p className="mt-1 text-sm">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">User</Label>
                  <p className="mt-1 text-sm">{selectedLog.userEmail}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Entity</Label>
                  <p className="mt-1 text-sm">
                    {selectedLog.entityType}: {selectedLog.entityId}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Description</Label>
                <p className="mt-1 text-sm bg-gray-50 p-3 rounded-lg">{selectedLog.description}</p>
              </div>

              {selectedLog.beforeState && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Before State</Label>
                  <pre className="mt-1 text-xs bg-red-50 p-3 rounded-lg overflow-auto max-h-40">
                    {JSON.stringify(selectedLog.beforeState, null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.afterState && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">After State</Label>
                  <pre className="mt-1 text-xs bg-green-50 p-3 rounded-lg overflow-auto max-h-40">
                    {JSON.stringify(selectedLog.afterState, null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.metadata && Object.keys(selectedLog.metadata).length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Metadata</Label>
                  <pre className="mt-1 text-xs bg-blue-50 p-3 rounded-lg overflow-auto max-h-40">
                    {JSON.stringify(selectedLog.metadata, null, 2)}
                  </pre>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                <div>
                  <Label className="text-sm font-medium text-gray-600">IP Address</Label>
                  <p className="mt-1">{selectedLog.ipAddress || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">User Agent</Label>
                  <p className="mt-1 truncate" title={selectedLog.userAgent}>
                    {selectedLog.userAgent || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

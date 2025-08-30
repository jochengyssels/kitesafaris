"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Users,
  Euro,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  Download,
  Upload,
  Filter,
  X,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { AddTripModal } from "@/components/add-trip-modal"
import { EditTripModal } from "@/components/edit-trip-modal"
import { DeleteTripModal } from "@/components/delete-trip-modal"
import { CSVImportModal } from "@/components/csv-import-modal"
import { AirtableSetupGuide } from "@/components/airtable-setup-guide"
import { tripDataService, calculateDiscountedPrice, type Trip } from "@/lib/trip-data-service"

interface FilterState {
  destination: string
  status: string
  priceMin: string
  priceMax: string
  dateFrom: string
  dateTo: string
  spotsMin: string
  spotsMax: string
}

const filterPresets = [
  {
    name: "Available Trips",
    filters: {
      destination: "all",
      status: "available",
      priceMin: "",
      priceMax: "",
      dateFrom: "",
      dateTo: "",
      spotsMin: "",
      spotsMax: "",
    },
  },
  {
    name: "Low Availability",
    filters: {
      destination: "all",
      status: "low",
      priceMin: "",
      priceMax: "",
      dateFrom: "",
      dateTo: "",
      spotsMin: "",
      spotsMax: "",
    },
  },
  {
    name: "Caribbean Only",
    filters: {
      destination: "caribbean",
      status: "all",
      priceMin: "",
      priceMax: "",
      dateFrom: "",
      dateTo: "",
      spotsMin: "",
      spotsMax: "",
    },
  },
  {
    name: "Premium Trips",
    filters: {
      destination: "all",
      status: "all",
      priceMin: "2500",
      priceMax: "",
      dateFrom: "",
      dateTo: "",
      spotsMin: "",
      spotsMax: "",
    },
  },
]

export function TripManagementDashboard() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("startDate")
  const [filters, setFilters] = useState<FilterState>({
    destination: "all",
    status: "all",
    priceMin: "",
    priceMax: "",
    dateFrom: "",
    dateTo: "",
    spotsMin: "",
    spotsMax: "",
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null)
  const [deletingTrip, setDeletingTrip] = useState<Trip | null>(null)

  useEffect(() => {
    setTrips(tripDataService.getAllTrips())

    const unsubscribe = tripDataService.onTripsUpdate((updatedTrips) => {
      setTrips(updatedTrips)
    })

    return unsubscribe
  }, [])

  const filteredTrips = useMemo(() => {
    let filtered = trips

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (trip) =>
          trip.destination.toLowerCase().includes(query) ||
          trip.startDate.includes(query) ||
          trip.endDate.includes(query) ||
          (trip.price ?? 0).toString().includes(query) ||
          trip.status.toLowerCase().includes(query) ||
          getDestinationName(trip.destination).toLowerCase().includes(query),
      )
    }

    if (filters.destination !== "all") {
      filtered = filtered.filter((trip) => trip.destination === filters.destination)
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((trip) => trip.status === filters.status)
    }

    if (filters.priceMin) {
      filtered = filtered.filter((trip) => trip.price >= Number.parseFloat(filters.priceMin))
    }

    if (filters.priceMax) {
      filtered = filtered.filter((trip) => trip.price <= Number.parseFloat(filters.priceMax))
    }

    if (filters.dateFrom) {
      filtered = filtered.filter((trip) => new Date(trip.startDate) >= new Date(filters.dateFrom))
    }

    if (filters.dateTo) {
      filtered = filtered.filter((trip) => new Date(trip.endDate) <= new Date(filters.dateTo))
    }

    if (filters.spotsMin) {
      filtered = filtered.filter((trip) => trip.availableSpots >= Number.parseInt(filters.spotsMin))
    }

    if (filters.spotsMax) {
      filtered = filtered.filter((trip) => trip.availableSpots <= Number.parseInt(filters.spotsMax))
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "startDate":
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        case "price":
          return a.price - b.price
        case "availableSpots":
          return a.availableSpots - b.availableSpots
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })
  }, [trips, searchQuery, filters, sortBy])

  const getDestinationStats = (destination: string) => {
    const destTrips = trips.filter((trip) => trip.destination === destination)
    return {
      total: destTrips.length,
      available: destTrips.filter((trip) => trip.status === "available").length,
      low: destTrips.filter((trip) => trip.status === "low").length,
      full: destTrips.filter((trip) => trip.status === "full").length,
    }
  }

  const destinations = [
    { id: "caribbean", name: "Caribbean", stats: getDestinationStats("caribbean") },
    { id: "greece", name: "Greece", stats: getDestinationStats("greece") },
    { id: "sardinia", name: "Sardinia", stats: getDestinationStats("sardinia") },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDestinationName = (destination: string) => {
    switch (destination) {
      case "caribbean":
        return "Caribbean (Antigua)"
      case "greece":
        return "Greece"
      case "sardinia":
        return "Sardinia"
      default:
        return destination
    }
  }

  const getStatusBadge = (trip: Trip) => {
    switch (trip.status) {
      case "available":
        return (
          <Badge className="bg-turquoise-100 text-turquoise-800 border-turquoise-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Available
          </Badge>
        )
      case "low":
        return (
          <Badge className="bg-coral-orange-100 text-coral-orange-800 border-coral-orange-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Low Spots
          </Badge>
        )
      case "full":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Full</Badge>
      default:
        return null
    }
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.destination !== "all") count++
    if (filters.status !== "all") count++
    if (filters.priceMin) count++
    if (filters.priceMax) count++
    if (filters.dateFrom) count++
    if (filters.dateTo) count++
    if (filters.spotsMin) count++
    if (filters.spotsMax) count++
    return count
  }

  const resetFilters = () => {
    setFilters({
      destination: "all",
      status: "all",
      priceMin: "",
      priceMax: "",
      dateFrom: "",
      dateTo: "",
      spotsMin: "",
      spotsMax: "",
    })
    setSearchQuery("")
  }

  const applyFilterPreset = (preset: (typeof filterPresets)[0]) => {
    setFilters(preset.filters)
    setSearchQuery("")
  }

  const exportFilteredTrips = () => {
    const csvHeaders = [
      "ID",
      "Destination",
      "Start Date",
      "End Date",
      "Price",
      "Currency",
      "Discount %",
      "Final Price",
      "Total Spots",
      "Available Spots",
      "Status",
    ]
    const csvData = filteredTrips.map((trip) => [
      trip.id,
      getDestinationName(trip.destination),
      trip.startDate,
      trip.endDate,
      trip.price,
      trip.currency,
      trip.discountPercentage || 0,
      calculateDiscountedPrice(trip),
      trip.totalSpots,
      trip.availableSpots,
      trip.status,
    ])

    const csvContent = [csvHeaders, ...csvData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `kitesafaris-trips-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <div className="space-y-6">
      <AirtableSetupGuide />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="font-montserrat font-bold text-2xl text-navy-900">Trip Management</h2>
          <p className="font-open-sans text-gray-600">Organize and manage available trips across all destinations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-sand-beige-300 bg-transparent"
            onClick={() => setShowImportModal(true)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline" className="border-sand-beige-300 bg-transparent" onClick={exportFilteredTrips}>
            <Download className="w-4 h-4 mr-2" />
            Export Filtered ({filteredTrips.length})
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="bg-turquoise-600 hover:bg-turquoise-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Trip
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {destinations.map((dest) => (
          <Card key={dest.id} className="border-sand-beige-200">
            <CardHeader className="pb-3">
              <CardTitle className="font-montserrat text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-turquoise-600" />
                {dest.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-navy-900">{dest.stats.total}</div>
                  <div className="text-gray-600">Total Trips</div>
                </div>
                <div>
                  <div className="font-semibold text-turquoise-600">{dest.stats.available}</div>
                  <div className="text-gray-600">Available</div>
                </div>
                <div>
                  <div className="font-semibold text-coral-orange-600">{dest.stats.low}</div>
                  <div className="text-gray-600">Low Spots</div>
                </div>
                <div>
                  <div className="font-semibold text-red-600">{dest.stats.full}</div>
                  <div className="text-gray-600">Full</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-sand-beige-200">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search trips by destination, date, price, or status..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-sand-beige-300"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="border-sand-beige-300 bg-transparent">
                      <Filter className="w-4 h-4 mr-2" />
                      Advanced Filters
                      {activeFilterCount > 0 && (
                        <Badge className="ml-2 bg-turquoise-100 text-turquoise-800 text-xs">{activeFilterCount}</Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-montserrat font-semibold text-navy-900">Advanced Filters</h4>
                        {activeFilterCount > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Reset
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm font-medium">Destination</Label>
                          <Select
                            value={filters.destination}
                            onValueChange={(value) => setFilters({ ...filters, destination: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Destinations</SelectItem>
                              <SelectItem value="caribbean">Caribbean</SelectItem>
                              <SelectItem value="greece">Greece</SelectItem>
                              <SelectItem value="sardinia">Sardinia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Status</Label>
                          <Select
                            value={filters.status}
                            onValueChange={(value) => setFilters({ ...filters, status: value })}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="low">Low Spots</SelectItem>
                              <SelectItem value="full">Full</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Price Range (EUR)</Label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={filters.priceMin}
                            onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                            className="h-8 text-sm"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={filters.priceMax}
                            onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                            className="h-8 text-sm"
                          />
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
                        <Label className="text-sm font-medium">Available Spots</Label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={filters.spotsMin}
                            onChange={(e) => setFilters({ ...filters, spotsMin: e.target.value })}
                            className="h-8 text-sm"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={filters.spotsMax}
                            onChange={(e) => setFilters({ ...filters, spotsMax: e.target.value })}
                            className="h-8 text-sm"
                          />
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <Label className="text-sm font-medium mb-2 block">Quick Presets</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {filterPresets.map((preset) => (
                            <Button
                              key={preset.name}
                              variant="outline"
                              size="sm"
                              onClick={() => applyFilterPreset(preset)}
                              className="text-xs h-7 border-sand-beige-300"
                            >
                              {preset.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-sand-beige-300">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startDate">Start Date</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="availableSpots">Available Spots</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(activeFilterCount > 0 || searchQuery) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="bg-turquoise-100 text-turquoise-800">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 hover:bg-turquoise-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.destination !== "all" && (
                  <Badge variant="secondary" className="bg-turquoise-100 text-turquoise-800">
                    Destination: {getDestinationName(filters.destination)}
                    <button
                      onClick={() => setFilters({ ...filters, destination: "all" })}
                      className="ml-1 hover:bg-turquoise-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {filters.status !== "all" && (
                  <Badge variant="secondary" className="bg-turquoise-100 text-turquoise-800">
                    Status: {filters.status}
                    <button
                      onClick={() => setFilters({ ...filters, status: "all" })}
                      className="ml-1 hover:bg-turquoise-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {(filters.priceMin || filters.priceMax) && (
                  <Badge variant="secondary" className="bg-turquoise-100 text-turquoise-800">
                    Price: {filters.priceMin || "0"} - {filters.priceMax || "∞"}
                    <button
                      onClick={() => setFilters({ ...filters, priceMin: "", priceMax: "" })}
                      className="ml-1 hover:bg-turquoise-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-gray-500 hover:text-gray-700 h-6 px-2"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-sand-beige-200">
        <CardHeader>
          <CardTitle className="font-montserrat flex items-center gap-2">
            <Calendar className="w-5 h-5 text-turquoise-600" />
            Trips ({filteredTrips.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTrips.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No trips found matching your criteria</p>
                {(activeFilterCount > 0 || searchQuery) && (
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="mt-3 border-sand-beige-300 bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              filteredTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="border border-sand-beige-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="font-semibold text-navy-900 capitalize">{trip.destination}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {getDestinationName(trip.destination)}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-navy-900">
                          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />7 days
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-navy-900 flex items-center gap-1">
                          <Euro className="w-4 h-4" />
                          {trip.discountPercentage ? (
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="line-through text-gray-500 text-sm">
                                  {trip.price.toLocaleString()}
                                </span>
                                <Badge className="bg-coral-orange-100 text-coral-orange-800 text-xs px-1 py-0">
                                  -{trip.discountPercentage}%
                                </Badge>
                              </div>
                              <span className="text-coral-orange-600 font-bold">
                                {calculateDiscountedPrice(trip).toLocaleString()} {trip.currency}
                              </span>
                            </div>
                          ) : (
                            <span>
                              {trip.price.toLocaleString()} {trip.currency}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {trip.availableSpots}/{trip.totalSpots} spots
                        </div>
                      </div>
                      <div>{getStatusBadge(trip)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingTrip(trip)}
                        className="border-sand-beige-300"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeletingTrip(trip)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <AddTripModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(newTripData) => {
          tripDataService.addTrip(newTripData)
          setShowAddModal(false)
        }}
      />

      {editingTrip && (
        <EditTripModal
          trip={editingTrip}
          open={!!editingTrip}
          onClose={() => setEditingTrip(null)}
          onSave={(updatedTrip) => {
            tripDataService.updateTrip(updatedTrip.id, updatedTrip)
            setEditingTrip(null)
          }}
        />
      )}

      {deletingTrip && (
        <DeleteTripModal
          trip={deletingTrip}
          open={!!deletingTrip}
          onClose={() => setDeletingTrip(null)}
          onDelete={() => {
            tripDataService.deleteTrip(deletingTrip.id)
            setDeletingTrip(null)
          }}
        />
      )}

      <CSVImportModal
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={(importedTrips) => {
          // Trips are already added to the service, just close modal
          setShowImportModal(false)
        }}
      />
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, AlertTriangle, CheckCircle, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { tripDataService, type Trip } from "@/lib/trip-data-service"

interface CSVImportModalProps {
  open: boolean
  onClose: () => void
  onImport: (trips: Trip[]) => void
}

interface ParsedTrip {
  destination: string
  startDate: string
  endDate: string
  price: number
  discountPercentage?: number
  currency: string
  totalSpots: number
  availableSpots: number
  errors: string[]
  warnings: string[]
  isValid: boolean
}

interface ValidationResult {
  trips: ParsedTrip[]
  totalRows: number
  validRows: number
  errorRows: number
  warningRows: number
  globalErrors: string[]
}

export function CSVImportModal({ open, onClose, onImport }: CSVImportModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setValidationResult(null)
      validateCSV(selectedFile)
    }
  }

  const validateCSV = async (csvFile: File) => {
    setIsValidating(true)

    try {
      const text = await csvFile.text()
      const lines = text.split("\n").filter((line) => line.trim())

      if (lines.length === 0) {
        setValidationResult({
          trips: [],
          totalRows: 0,
          validRows: 0,
          errorRows: 0,
          warningRows: 0,
          globalErrors: ["CSV file is empty"],
        })
        return
      }

      // Parse header
      const header = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
      const expectedHeaders = [
        "destination",
        "startDate",
        "endDate",
        "price",
        "discountPercentage",
        "currency",
        "totalSpots",
        "availableSpots",
      ]
      const requiredHeaders = [
        "destination",
        "startDate",
        "endDate",
        "price",
        "currency",
        "totalSpots",
        "availableSpots",
      ]

      const globalErrors: string[] = []
      const missingHeaders = requiredHeaders.filter((h) => !header.includes(h))
      if (missingHeaders.length > 0) {
        globalErrors.push(`Missing required columns: ${missingHeaders.join(", ")}`)
      }

      if (globalErrors.length > 0) {
        setValidationResult({
          trips: [],
          totalRows: lines.length - 1,
          validRows: 0,
          errorRows: lines.length - 1,
          warningRows: 0,
          globalErrors,
        })
        return
      }

      // Parse data rows
      const trips: ParsedTrip[] = []
      const existingTrips = tripDataService.getAllTrips()

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",").map((cell) => cell.trim().replace(/"/g, ""))
        const trip: ParsedTrip = {
          destination: "",
          startDate: "",
          endDate: "",
          price: 0,
          discountPercentage: 0,
          currency: "EUR",
          totalSpots: 0,
          availableSpots: 0,
          errors: [],
          warnings: [],
          isValid: true,
        }

        // Map CSV columns to trip properties
        header.forEach((col, index) => {
          const value = row[index] || ""

          switch (col) {
            case "destination":
              if (!value) {
                trip.errors.push("Destination is required")
              } else if (!["caribbean", "greece", "sardinia"].includes(value.toLowerCase())) {
                trip.errors.push("Destination must be: caribbean, greece, or sardinia")
              } else {
                trip.destination = value.toLowerCase()
              }
              break

            case "startDate":
              if (!value) {
                trip.errors.push("Start date is required")
              } else {
                const date = new Date(value)
                if (isNaN(date.getTime())) {
                  trip.errors.push("Invalid start date format (use YYYY-MM-DD)")
                } else {
                  trip.startDate = date.toISOString().split("T")[0]

                  // Check if it's a Saturday
                  if (date.getDay() !== 6) {
                    trip.warnings.push("Start date should be a Saturday for KiteSafaris trips")
                  }
                }
              }
              break

            case "endDate":
              if (!value) {
                trip.errors.push("End date is required")
              } else {
                const date = new Date(value)
                if (isNaN(date.getTime())) {
                  trip.errors.push("Invalid end date format (use YYYY-MM-DD)")
                } else {
                  trip.endDate = date.toISOString().split("T")[0]

                  // Check if it's a Saturday
                  if (date.getDay() !== 6) {
                    trip.warnings.push("End date should be a Saturday for KiteSafaris trips")
                  }
                }
              }
              break

            case "price":
              const price = Number.parseFloat(value)
              if (!value || isNaN(price)) {
                trip.errors.push("Price is required and must be a number")
              } else if (price <= 0) {
                trip.errors.push("Price must be greater than 0")
              } else {
                trip.price = price
              }
              break

            case "discountPercentage":
              if (value) {
                const discount = Number.parseFloat(value)
                if (isNaN(discount)) {
                  trip.errors.push("Discount percentage must be a number")
                } else if (discount < 0 || discount > 100) {
                  trip.errors.push("Discount percentage must be between 0 and 100")
                } else {
                  trip.discountPercentage = discount
                }
              }
              break

            case "currency":
              if (!value) {
                trip.errors.push("Currency is required")
              } else if (!["EUR", "USD"].includes(value.toUpperCase())) {
                trip.errors.push("Currency must be EUR or USD")
              } else {
                trip.currency = value.toUpperCase() as "EUR" | "USD"
              }
              break

            case "totalSpots":
              const totalSpots = Number.parseInt(value)
              if (!value || isNaN(totalSpots)) {
                trip.errors.push("Total spots is required and must be a number")
              } else if (totalSpots <= 0) {
                trip.errors.push("Total spots must be greater than 0")
              } else {
                trip.totalSpots = totalSpots
              }
              break

            case "availableSpots":
              const availableSpots = Number.parseInt(value)
              if (!value || isNaN(availableSpots)) {
                trip.errors.push("Available spots is required and must be a number")
              } else if (availableSpots < 0) {
                trip.errors.push("Available spots cannot be negative")
              } else {
                trip.availableSpots = availableSpots
              }
              break
          }
        })

        // Cross-field validation
        if (trip.startDate && trip.endDate) {
          const startDate = new Date(trip.startDate)
          const endDate = new Date(trip.endDate)

          if (endDate <= startDate) {
            trip.errors.push("End date must be after start date")
          }

          const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
          if (daysDiff !== 7) {
            trip.warnings.push(`Trip duration is ${daysDiff} days, KiteSafaris typically runs 7-day trips`)
          }
        }

        if (trip.availableSpots > trip.totalSpots) {
          trip.errors.push("Available spots cannot exceed total spots")
        }

        // Check for duplicate trips
        const tripId = `${trip.destination.toUpperCase()}-${trip.startDate}`
        const existingTrip = existingTrips.find(
          (t) => t.destination === trip.destination && t.startDate === trip.startDate,
        )
        if (existingTrip) {
          trip.warnings.push("A trip with this destination and start date already exists")
        }

        trip.isValid = trip.errors.length === 0
        trips.push(trip)
      }

      const validRows = trips.filter((t) => t.isValid).length
      const errorRows = trips.filter((t) => t.errors.length > 0).length
      const warningRows = trips.filter((t) => t.warnings.length > 0 && t.errors.length === 0).length

      setValidationResult({
        trips,
        totalRows: trips.length,
        validRows,
        errorRows,
        warningRows,
        globalErrors,
      })
    } catch (error) {
      setValidationResult({
        trips: [],
        totalRows: 0,
        validRows: 0,
        errorRows: 0,
        warningRows: 0,
        globalErrors: ["Failed to parse CSV file. Please check the file format."],
      })
    } finally {
      setIsValidating(false)
    }
  }

  const handleImport = async () => {
    if (!validationResult || validationResult.validRows === 0) return

    setIsImporting(true)

    try {
      const validTrips = validationResult.trips.filter((t) => t.isValid)
      const newTrips: Trip[] = []

      for (const tripData of validTrips) {
        const newTrip = await tripDataService.addTrip({
          destination: tripData.destination as "caribbean" | "greece" | "sardinia",
          startDate: tripData.startDate,
          endDate: tripData.endDate,
          price: tripData.price,
          discountPercentage: tripData.discountPercentage,
          currency: tripData.currency as "EUR" | "USD",
          totalSpots: tripData.totalSpots,
          availableSpots: tripData.availableSpots,
        })
        newTrips.push(newTrip)
      }

      onImport(newTrips)
      handleClose()
    } catch (error) {
      console.error("Import failed:", error)
    } finally {
      setIsImporting(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setValidationResult(null)
    setIsValidating(false)
    setIsImporting(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onClose()
  }

  const downloadTemplate = () => {
    const template = [
      "destination,startDate,endDate,price,discountPercentage,currency,totalSpots,availableSpots",
      "caribbean,2026-06-06,2026-06-13,2700,0,EUR,6,6",
      "greece,2026-07-05,2026-07-12,2500,10,EUR,8,8",
      "sardinia,2026-08-02,2026-08-09,2400,0,EUR,6,6",
    ].join("\n")

    const blob = new Blob([template], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "kitesafaris-import-template.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-sand-beige-200">
          <div>
            <h2 className="font-montserrat font-bold text-xl text-navy-900">Import Trips from CSV</h2>
            <p className="font-open-sans text-gray-600 mt-1">Upload and validate trip data before importing</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={downloadTemplate} className="border-sand-beige-300 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {!file ? (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-sand-beige-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <div className="space-y-2">
                  <h3 className="font-montserrat font-semibold text-lg">Upload CSV File</h3>
                  <p className="text-gray-600">Select a CSV file containing trip data to import</p>
                </div>
                <div className="mt-4">
                  <Input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-turquoise-600 hover:bg-turquoise-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose CSV File
                  </Button>
                </div>
              </div>

              <Alert>
                <FileText className="w-4 h-4" />
                <AlertDescription>
                  <strong>CSV Format Requirements:</strong>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>
                      • Required columns: destination, startDate, endDate, price, currency, totalSpots, availableSpots
                    </li>
                    <li>• Optional columns: discountPercentage</li>
                    <li>• Dates in YYYY-MM-DD format (Saturdays recommended)</li>
                    <li>• Destinations: caribbean, greece, or sardinia</li>
                    <li>• Currency: EUR or USD</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-turquoise-600" />
                <div>
                  <div className="font-semibold">{file.name}</div>
                  <div className="text-sm text-gray-600">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {isValidating && (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-turquoise-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Validating CSV data...</p>
                </div>
              )}

              {validationResult && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="border-sand-beige-200">
                      <CardContent className="pt-4">
                        <div className="text-2xl font-bold text-navy-900">{validationResult.totalRows}</div>
                        <div className="text-sm text-gray-600">Total Rows</div>
                      </CardContent>
                    </Card>
                    <Card className="border-turquoise-200">
                      <CardContent className="pt-4">
                        <div className="text-2xl font-bold text-turquoise-600">{validationResult.validRows}</div>
                        <div className="text-sm text-gray-600">Valid</div>
                      </CardContent>
                    </Card>
                    <Card className="border-coral-orange-200">
                      <CardContent className="pt-4">
                        <div className="text-2xl font-bold text-coral-orange-600">{validationResult.warningRows}</div>
                        <div className="text-sm text-gray-600">Warnings</div>
                      </CardContent>
                    </Card>
                    <Card className="border-red-200">
                      <CardContent className="pt-4">
                        <div className="text-2xl font-bold text-red-600">{validationResult.errorRows}</div>
                        <div className="text-sm text-gray-600">Errors</div>
                      </CardContent>
                    </Card>
                  </div>

                  {validationResult.globalErrors.length > 0 && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <AlertDescription>
                        <strong>File Errors:</strong>
                        <ul className="mt-1">
                          {validationResult.globalErrors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {validationResult.trips.length > 0 && (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {validationResult.trips.map((trip, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 ${
                            trip.errors.length > 0
                              ? "border-red-200 bg-red-50"
                              : trip.warnings.length > 0
                                ? "border-coral-orange-200 bg-coral-orange-50"
                                : "border-turquoise-200 bg-turquoise-50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold capitalize">{trip.destination}</span>
                                <span className="text-gray-600">
                                  {trip.startDate} → {trip.endDate}
                                </span>
                                <span className="font-semibold">
                                  €{trip.price} {trip.currency}
                                </span>
                                <span className="text-sm text-gray-600">
                                  {trip.availableSpots}/{trip.totalSpots} spots
                                </span>
                                {trip.discountPercentage && trip.discountPercentage > 0 && (
                                  <Badge className="bg-coral-orange-100 text-coral-orange-800">
                                    {trip.discountPercentage}% off
                                  </Badge>
                                )}
                              </div>

                              {trip.errors.length > 0 && (
                                <div className="space-y-1">
                                  {trip.errors.map((error, errorIndex) => (
                                    <div key={errorIndex} className="flex items-center gap-2 text-sm text-red-600">
                                      <AlertTriangle className="w-3 h-3" />
                                      {error}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {trip.warnings.length > 0 && (
                                <div className="space-y-1">
                                  {trip.warnings.map((warning, warningIndex) => (
                                    <div
                                      key={warningIndex}
                                      className="flex items-center gap-2 text-sm text-coral-orange-600"
                                    >
                                      <AlertTriangle className="w-3 h-3" />
                                      {warning}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="ml-4">
                              {trip.isValid ? (
                                <CheckCircle className="w-5 h-5 text-turquoise-600" />
                              ) : (
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {validationResult && validationResult.validRows > 0 && (
          <div className="flex items-center justify-between p-6 border-t border-sand-beige-200 bg-sand-beige-50">
            <div className="text-sm text-gray-600">
              Ready to import {validationResult.validRows} valid trip{validationResult.validRows !== 1 ? "s" : ""}
              {validationResult.errorRows > 0 && (
                <span className="text-red-600 ml-2">
                  ({validationResult.errorRows} row{validationResult.errorRows !== 1 ? "s" : ""} will be skipped due to
                  errors)
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleClose} disabled={isImporting}>
                Cancel
              </Button>
              <Button
                onClick={handleImport}
                disabled={isImporting || validationResult.validRows === 0}
                className="bg-turquoise-600 hover:bg-turquoise-700"
              >
                {isImporting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Import {validationResult.validRows} Trip{validationResult.validRows !== 1 ? "s" : ""}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

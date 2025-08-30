"use client"

import { useState, useEffect } from "react"
import { Camera, Settings, TestTube, RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { PixabayGallery } from "./pixabay-gallery"

interface GalleryTestResult {
  destination: string
  imageCount: number
  loadTime: number
  success: boolean
  error?: string
}

interface GalleryConfig {
  destination: string
  keywords: string[]
  perPage: number
  enabled: boolean
}

const DEFAULT_DESTINATIONS = [
  { id: "antigua", name: "Antigua", keywords: ["antigua kiteboarding", "antigua beach", "caribbean kitesurfing"] },
  {
    id: "sardinia",
    name: "Sardinia",
    keywords: ["sardinia kiteboarding", "sardinia beach", "mediterranean kitesurfing"],
  },
  { id: "greece", name: "Greece", keywords: ["greek islands kiteboarding", "greece beach", "aegean sea kitesurfing"] },
  { id: "egypt", name: "Egypt", keywords: ["red sea kiteboarding", "egypt beach", "red sea kitesurfing"] },
  { id: "brazil", name: "Brazil", keywords: ["brazil kiteboarding", "jericoacoara", "brazilian beach"] },
  { id: "cape-verde", name: "Cape Verde", keywords: ["cape verde kiteboarding", "sal island", "cape verde beach"] },
  {
    id: "mauritius",
    name: "Mauritius",
    keywords: ["mauritius kiteboarding", "mauritius beach", "indian ocean kitesurfing"],
  },
  { id: "zanzibar", name: "Zanzibar", keywords: ["zanzibar kiteboarding", "zanzibar beach", "paje beach"] },
]

export function PixabayGalleryAdmin() {
  const [testResults, setTestResults] = useState<GalleryTestResult[]>([])
  const [testing, setTesting] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState("antigua")
  const [customKeywords, setCustomKeywords] = useState("")
  const [perPage, setPerPage] = useState(12)
  const [apiStatus, setApiStatus] = useState<"unknown" | "connected" | "error">("unknown")
  const [previewMode, setPreviewMode] = useState(false)

  const testApiConnection = async () => {
    try {
      const response = await fetch("/api/pixabay/search?query=test&per_page=1")
      const data = await response.json()
      if (response.ok && data.success) {
        setApiStatus("connected")
      } else {
        setApiStatus("error")
      }
    } catch (error) {
      console.error("[v0] API connection test failed:", error)
      setApiStatus("error")
    }
  }

  const testAllDestinations = async () => {
    setTesting(true)
    setTestResults([])

    for (const destination of DEFAULT_DESTINATIONS) {
      const startTime = Date.now()
      try {
        console.log(`[v0] Testing gallery for ${destination.name}`)
        const response = await fetch(
          `/api/pixabay/search?query=${encodeURIComponent(destination.keywords[0])}&per_page=${perPage}`,
        )

        const loadTime = Date.now() - startTime
        const data = await response.json()

        const result: GalleryTestResult = {
          destination: destination.name,
          imageCount: data.images?.length || 0,
          loadTime,
          success: response.ok && data.success && data.images?.length > 0,
          error: response.ok ? (data.success ? undefined : data.error) : `HTTP ${response.status}`,
        }

        setTestResults((prev) => [...prev, result])
      } catch (error) {
        const loadTime = Date.now() - startTime
        setTestResults((prev) => [
          ...prev,
          {
            destination: destination.name,
            imageCount: 0,
            loadTime,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          },
        ])
      }

      // Small delay between requests to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setTesting(false)
  }

  // Test custom keywords
  const testCustomKeywords = async () => {
    if (!customKeywords.trim()) return

    const keywords = customKeywords.split(",").map((k) => k.trim())
    console.log("[v0] Testing custom keywords:", keywords)

    // This would trigger a test search - implementation depends on your needs
    alert(`Testing keywords: ${keywords.join(", ")}`)
  }

  // Check API status on component mount
  useEffect(() => {
    testApiConnection()
  }, [])

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Pixabay Gallery Configuration</h1>
          <p className="text-slate-600">Test and configure the royalty-free image gallery integration</p>
        </div>

        {/* API Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <Settings className="w-5 h-5 text-teal-600" />
              API Connection Status
            </h2>
            <button
              onClick={testApiConnection}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Test Connection
            </button>
          </div>

          <div className="flex items-center gap-3">
            {apiStatus === "connected" && (
              <>
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-green-700 font-medium">Connected to Pixabay API</span>
              </>
            )}
            {apiStatus === "error" && (
              <>
                <XCircle className="w-6 h-6 text-red-500" />
                <span className="text-red-700 font-medium">API Connection Failed</span>
              </>
            )}
            {apiStatus === "unknown" && (
              <>
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                <span className="text-yellow-700 font-medium">Testing Connection...</span>
              </>
            )}
          </div>

          {apiStatus === "error" && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">
                Make sure your PIXABAY_API_KEY environment variable is set correctly in your project settings.
              </p>
            </div>
          )}
        </div>

        {/* Gallery Testing */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <TestTube className="w-5 h-5 text-blue-600" />
              Gallery Testing
            </h2>
            <button
              onClick={testAllDestinations}
              disabled={testing || apiStatus !== "connected"}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {testing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4" />
                  Test All Destinations
                </>
              )}
            </button>
          </div>

          {testResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-slate-700 mb-3">Test Results:</h3>
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-medium">{result.destination}</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      {result.success ? (
                        <>
                          {result.imageCount} images • {result.loadTime}ms
                        </>
                      ) : (
                        <>Failed • {result.error}</>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Testing */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <Camera className="w-5 h-5 text-purple-600" />
            Custom Testing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Test Destination</label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {DEFAULT_DESTINATIONS.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Images Per Page</label>
              <input
                type="number"
                min="4"
                max="30"
                value={perPage}
                onChange={(e) => setPerPage(Number.parseInt(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Custom Keywords (comma-separated)</label>
              <input
                type="text"
                value={customKeywords}
                onChange={(e) => setCustomKeywords(e.target.value)}
                placeholder="e.g., antigua kiteboarding, caribbean beach, turquoise water"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {previewMode ? "Hide Preview" : "Show Preview"}
            </button>
            <button
              onClick={testCustomKeywords}
              disabled={!customKeywords.trim()}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Test Keywords
            </button>
          </div>
        </div>

        {/* Live Preview */}
        {previewMode && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Live Gallery Preview</h2>
            <PixabayGallery
              destination={selectedDestination}
              title={`${DEFAULT_DESTINATIONS.find((d) => d.id === selectedDestination)?.name} Gallery Preview`}
              perPage={perPage}
            />
          </div>
        )}

        {/* Configuration Guide */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Configuration Guide</h2>
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <h3 className="font-medium text-slate-800 mb-2">Environment Variables Required:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <code className="bg-slate-100 px-2 py-1 rounded">PIXABAY_API_KEY</code> - Your Pixabay API key (free
                  registration required)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-slate-800 mb-2">Gallery Features:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Automatic keyword-based search for royalty-free images</li>
                <li>High-resolution images (minimum 1920x1080)</li>
                <li>Responsive grid layout with modal lightbox</li>
                <li>Mobile-optimized with touch gestures</li>
                <li>Accessibility features and keyboard navigation</li>
                <li>Photographer attribution and Pixabay credits</li>
                <li>Intelligent caching and deduplication</li>
                <li>Safe search enabled by default</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-slate-800 mb-2">Usage Guidelines:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Test regularly to ensure API connectivity</li>
                <li>Monitor image quality and relevance</li>
                <li>Adjust keywords if results are not satisfactory</li>
                <li>Free Pixabay API: 5,000 requests/hour, 20,000/day</li>
                <li>All images are royalty-free under Pixabay License</li>
                <li>Attribution appreciated but not required</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-slate-800 mb-2">Getting Started:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  1. Register for free at{" "}
                  <a
                    href="https://pixabay.com/accounts/register/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    pixabay.com
                  </a>
                </li>
                <li>
                  2. Get your API key from{" "}
                  <a
                    href="https://pixabay.com/api/docs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    API documentation
                  </a>
                </li>
                <li>3. Add PIXABAY_API_KEY to your environment variables</li>
                <li>4. Test the connection using the button above</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
